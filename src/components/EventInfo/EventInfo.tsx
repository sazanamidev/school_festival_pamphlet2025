"use client";
import { useEffect, useState, useRef, useMemo } from "react";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, useDisclosure, Card, CardBody,
} from "@heroui/react";

const EVENT_DATE_STRING = process.env.NEXT_PUBLIC_BASE_DATE || "2025-11-15";

type EventItem = {
  eventName: string;
  startTime: string; // "HH:mm"
  endTime: string;   // "HH:mm"
  eventContent?: string;
};

// JSTの絶対時刻(UTCエポックms)を生成（端末TZに依存しない）
function toMsJST(date: string, time: string) {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  // JST=UTC+9 → UTCで(hh-9)として確定
  return Date.UTC(y, (m ?? 1) - 1, d ?? 1, (hh ?? 0) - 9, mm ?? 0, 0);
}

export const EventInfo = () => {
  const [nowTime, setNowTime] = useState(Date.now());
  const [eventdata, setEventData] = useState<EventItem[]>([]);
  const intervalRef = useRef<number | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  const fetchEvents = (reason: string) => {
    const url = `/data/Event.json?ts=${Date.now()}`;
    fetch(url, { cache: "no-store" })
      .then(r => r.json())
      .then((data: EventItem[]) => {
        setEventData(data);
      })
      .catch(e => console.error("[EventInfo] fetch error:", e));
  };

  // 初回取得
  useEffect(() => {
    fetchEvents("initial");
  }, []);

  // 開発時のみ 1分ごと再取得
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const refetchId = window.setInterval(() => fetchEvents("dev-interval"), 1 * 60 * 1000);
    return () => clearInterval(refetchId);
  }, []);

  // 自動更新（30秒）
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      setNowTime(Date.now());
    }, 30000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // フィルタ（JST固定で評価）
  const filteredEvents = useMemo(() => {
    const result = eventdata.filter(item => {
      if (!item.startTime || !item.endTime) return false;
      if (!/^\d{2}:\d{2}$/.test(item.startTime) || !/^\d{2}:\d{2}$/.test(item.endTime)) {
        return false;
      }
      const startMs = toMsJST(EVENT_DATE_STRING, item.startTime);
      const endMs   = toMsJST(EVENT_DATE_STRING, item.endTime);
      const showFrom = startMs - 30 * 60 * 1000;
      return nowTime >= showFrom && nowTime < endMs;
    });
    return result;
  }, [eventdata, nowTime]);

  return (
    <div className="eventinfo">
      {filteredEvents.length > 0 ? (
        <ul>
          {filteredEvents.map((item, idx) => {
            const startMs = toMsJST(EVENT_DATE_STRING, item.startTime);
            const endMs   = toMsJST(EVENT_DATE_STRING, item.endTime);
            const status =
              nowTime < startMs ? "まもなく" : nowTime < endMs ? "開催中" : "終了";

            return (
              <Card key={`${item.eventName}-${item.startTime}-${idx}`} className="m-2">
                <CardBody>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800 line-clamp-2">{item.eventName}</span>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="inline-flex rounded-full bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5">開始 {item.startTime}</span>
                      <span className="inline-flex rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold px-2 py-0.5">終了 {item.endTime}</span>
                      <span className={`inline-flex rounded-full text-xs font-semibold px-2 py-0.5 ${
                        status === "開催中" ? "bg-green-100 text-green-700"
                        : status === "まもなく" ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-600"
                      }`}>{status}</span>
                      <Button size="sm" isIconOnly variant="light" radius="full" className="ml-auto"
                        onPress={() => { setSelectedEvent(item); onOpen(); }}>
                        <span className="material-symbols-outlined">info</span>
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </ul>
      ) : (
        <Card className="m-2 border border-dashed border-gray-300 bg-gray-50/60">
          <CardBody className="py-6 flex flex-col items-center text-center gap-2">
            <p className="text-sm font-medium text-gray-700">直近で開催のイベントはありません</p>
          </CardBody>
        </Card>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>イベント詳細</ModalHeader>
              <ModalBody>
                <div>{selectedEvent?.eventContent}</div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
