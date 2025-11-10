    // function EventInfo(){
    //     return(
    //         <h1>Hello World!</h1>
    //     );
    // }
    // export default EventInfo;
    import { useEffect, useState } from 'react';

    const EVENT_DATE_STRING='2025-11-10';
    export const EventInfo=()=>{

        const [nowTime, setNowTime] = useState<number>(Date.now());

        const [eventdata, setEventData] = useState<any[]>([]);

        useEffect(() => {
        fetch("/data/ivent.json")
            .then(res => res.json())
            .then(data => setEventData(data))
            .catch((err) => console.error("JSON読み込み失敗:", err));
        }, []);

        useEffect(() => {
            const timer = setInterval(() => {
                setNowTime(Date.now());
            }, 60000);

            return () => clearInterval(timer);
        }, []);

        const filteredEvents =eventdata.filter(item=>{
            const timeParts=item.startTime.match(/(\d{2}):(\d{2})/);

            if(!timeParts){
                console.error(`Inva;id startTime format for event:${item.eventName}.Expected"HH:mm".`)
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

        return(
            <div className="eventinfo">
                {filteredEvents.length>0?(
                    <ul>
                    {filteredEvents.map(item =>(
                    <li key={item.eventName}>
                    {item.eventName}【{item.startTime}】
                    <div>{item.eventContent}</div>
                    </li>
                        ))}
                </ul>
                ):(
                    <p>現在、表示すべきイベントはありません。 (本日の基準日: {EVENT_DATE_STRING})</p>
                )}
            </div>
        );
    }

        // <ul>
            //      <li>オープニングセレモニー【10:15~10:30】</li>
            //       <li>  CGスペシャリスト学科　TCコンペ表彰式【10:30~11:00】</li>
            //       <li>コスプレコンテスト　アピールタイム【11:00~11:45】</li> 
            // </ul>

    // import {useState, useEffect } from "react";

    // export interface Event{
    //     eventName:string;
    //     eventTime:string;
    //     eventContent:string;
    // }
    // const JSON_URL='/data/ivent.json';//参照する


    // // function update(){
    // //     EventInfo.minute = new Date().toLocaleTimeString();
    // //     setTimeout(update,60000);
    // // }
    // // export const EventInfo = () =>{
    // //     const[eventData,setEventData]=useState<EventDate|null>(null);
    // // let now =new Date();
    // // let hour =now.getHours();
    // // let minute=now.getMinutes();

    // // if(hour===9&&minute===minute1){//9:30の時にやるやつ
    // //   //jsonファイルから時刻・名前・内容を表示
    // //   console.log(`[$hour]:$[minute]イベント情報をお知らせします`)

    // // }

    // }