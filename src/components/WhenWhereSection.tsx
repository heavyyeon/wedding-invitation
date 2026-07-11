"use client";

import FadeIn from "./FadeIn";
import { useDday } from "@/hooks/useDday";
import { wedding } from "@/config/wedding";

export default function WhenWhereSection() {
  const dday = useDday();

  return (
    <section className="bg-accent px-6 py-20 text-[#2c2c2c]">
      <FadeIn className="flex flex-col items-center text-center">
        <p className="font-mono text-xs tracking-[0.3em]">WHEN &amp; WHERE</p>

        <div className="mt-6 min-h-[2.5rem] font-serif text-4xl tracking-wide">
          {dday ?? " "}
        </div>

        <div className="mt-8 space-y-1">
          <p className="font-serif text-xl">{wedding.date.displayDate}</p>
          <p className="font-mono text-sm">{wedding.date.displayTime}</p>
        </div>

        <div className="mt-8 space-y-1">
          <p className="font-serif text-lg">{wedding.venue.name}</p>
          <p className="font-mono text-xs opacity-80">{wedding.venue.address}</p>
        </div>
      </FadeIn>
    </section>
  );
}
