'use client'
import { Map } from "../components/Map/Map";
import { ExhibitionInfo } from "../components/ExhibitionInfo/ExhibitionInfo";
import { EventInfo } from "../components/EventInfo/EventInfo"
import { useState } from "react";

export default function Home() {
  const [floor,setFloor] = useState<number>(1);
  return (
    <>
      <EventInfo/>
      <Map setFloor={setFloor}/>
      <ExhibitionInfo floor={floor}/>
    </>
  );
}
