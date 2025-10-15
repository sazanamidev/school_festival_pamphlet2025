import Image from "next/image";
import { Map } from "../components/Map/Map";
import { ExhibitionInfo } from "../components/ExhibitionInfo/ExhibitionInfo";
import { EventInfo } from "../components/EventInfo/EventInfo"

export default function Home() {
  return (
    <>
      <Map/>
      <ExhibitionInfo/>
      <EventInfo/>
    </>
  );
}
