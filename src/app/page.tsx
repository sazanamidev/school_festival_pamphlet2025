import Image from "next/image";
import { Map } from "../components/Map";
import { ExhibitionInfo } from "../components/ExhibitionInfo";
import { EventInfo } from "../components/EventInfo"

export default function Home() {
  return (
    <>
      <Map/>
      <ExhibitionInfo/>
      <EventInfo/>
    </>
  );
}
