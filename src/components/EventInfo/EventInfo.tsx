// function EventInfo(){
//     return(
//         <h1>Hello World!</h1>
//     );
// }
// export default EventInfo;
import eventdata from '../../../public/data/ivent.json'//eventdataという変数にjson1の中身が入る

const EVENT_DATE_STRING="2025-11-14";
export const EventInfo=()=>{

    const nowTime = new Date().getTime();

    const filteredEvents =eventdata.filter(item=>{
        const timeParts=item.startTime.match(/(\d{2}):(\d{2})/);

        if(!timeParts){
            console.error(`Inva;id startTime format for event:${item.eventName}.Expected"HH:mm".`)
            return false;
        }
        const hours = parseInt(timeParts[1], 10);
        const minutes = parseInt(timeParts[2], 10);

        const eventDateTimeString = `${EVENT_DATE_STRING}T${item.startTime}:00`;
        const eventStartTime = new Date(eventDateTimeString)

        const eventStartTimeMs=eventStartTime.getTime();

        const thirtyMinutesBeforeEvent = eventStartTimeMs -30*60*1000;
        return nowTime >=thirtyMinutesBeforeEvent && nowTime < eventStartTimeMs;
    });

    return(
         <div className="eventinfo">
            {filteredEvents.length>0?(
                 <ul>
                {filteredEvents.map(item =>(
                  <li key={item.eventName}>
                   {item.eventName}【{item.startTime}】
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