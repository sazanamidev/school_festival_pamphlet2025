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
          {filteredEvents.map((item) => (
            <li key={item.eventName}>
              {item.eventName}【{item.startTime}】
              <Button onPress={onOpen}>詳細</Button>
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
          ))}
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
