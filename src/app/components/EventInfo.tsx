export const EventInfo = () =>{

function showCurrentTime(){
let now =new Date();

//時、分の数値を取り出す
let hour =now.getHours();
let minute=now.getMinutes();

let time="現在時刻"+hour+":"+minute;

setInterval('showCurrentTime',10000);//1分ごとに時刻を取得する関数を実行

switch(true){
    case(hour===9&&minute===30):
   



}
}
}