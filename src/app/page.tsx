"use client";
import { Map } from "../components/Map/Map";
import { ExhibitionInfo } from "../components/ExhibitionInfo/ExhibitionInfo";
import { EventInfo } from "../components/EventInfo/EventInfo";
import { useState } from "react";
import { Divider } from "@heroui/react";

export default function Home() {
  const [floor, setFloor] = useState<number>(1);
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        <EventInfo />
        <Map setFloor={setFloor} />
        <div className="mx-2">
          <ExhibitionInfo floor={floor} />
        </div>
      </main>
      <footer className="mt-auto bg-white/80">
      <Divider />
        <a href="https://sazanami.dev" target="_blank" rel="noopener noreferrer">
          <div className="mx-auto flex max-w-[760px] items-center justify-center px-4 py-4">
            <img
              src="/sazanami_dev.svg"
              alt="sazanami logo"
              className="h-6 w-auto opacity-80"
            />
          </div>
        </a>
      </footer>
    </div>
  );
}
