import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

const EVENT_DATE_STRING = process.env.NEXT_PUBLIC_BASE_DATE || "2025-11-15";
export const EventInfo = () => {
  const [nowTime, setNowTime] = useState<number>(Date.now());

  const [eventdata, setEventData] = useState<any[]>([]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    fetch("/data/Event.json")
      .then((res) => res.json())
      .then((data) => setEventData(data))
      .catch((err) => console.error("JSON読み込み失敗:", err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setNowTime(Date.now());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const filteredEvents = eventdata.filter((item) => {
    const timeParts = item.startTime.match(/(\d{2}):(\d{2})/);

    if (!timeParts) {
      console.error(
        `Inva;id startTime format for event:${item.eventName}.Expected"HH:mm".`
      );
      return false;
    }

    // ✅ 開始時刻を Date 化
    const eventStart = new Date(`${EVENT_DATE_STRING}T${item.startTime}:00`);
    const eventStartMs = eventStart.getTime();

    // ✅ 終了時刻を Date 化（追加部分）
    const eventEnd = new Date(`${EVENT_DATE_STRING}T${item.endTime}:00`);
    const eventEndMs = eventEnd.getTime();

    // ✅ 30分前
    const thirtyMinutesBefore = eventStartMs - 30 * 60 * 1000;

    // ✅ 表示条件 = 30分前〜終了時刻まで
    return nowTime >= thirtyMinutesBefore && nowTime < eventEndMs;
  });

  return (
    <div className="eventinfo">
      {filteredEvents.length > 0 ? (
        <ul>
          {filteredEvents.map((item) => {
            const startMs = new Date(`${EVENT_DATE_STRING}T${item.startTime}:00`).getTime();
            const endMs = new Date(`${EVENT_DATE_STRING}T${item.endTime}:00`).getTime();
            const status =
              nowTime < startMs
                ? 'まもなく'
                : nowTime < endMs
                  ? '開催中'
                  : '終了';
            return (
              <li
                key={item.eventName}
                className="flex items-center gap-4 py-3 border-b last:border-b-0"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-gray-800">
                    {item.eventName}
                  </span>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5">
                      開始 {item.startTime}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold px-2 py-0.5">
                      終了 {item.endTime}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-full text-xs font-semibold px-2 py-0.5 ${
                        status === '開催中'
                          ? 'bg-green-100 text-green-700'
                          : status === 'まもなく'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                </div>
                <Button size="sm" onPress={onOpen} className="ml-auto">
                  詳細
                </Button>
                <Modal
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  placement="center"
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          イベント詳細
                        </ModalHeader>
                        <ModalBody>
                          <div>{item.eventContent}</div>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="light"
                            onPress={onClose}
                          >
                            Close
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>
          現在、表示すべきイベントはありません。 (本日の基準日:{" "}
          {EVENT_DATE_STRING})
        </p>
      )}
    </div>
  );
};
