"use client";

import { useEffect, useMemo, useState } from "react";
import { wedding } from "@/config/wedding";

const PETAL_COUNT = 14;

export default function IntroAnimation() {
  const [phase, setPhase] = useState<"playing" | "exiting" | "done">("playing");

  const petals = useMemo(
    () =>
      Array.from({ length: PETAL_COUNT }).map((_, i) => ({
        left: Math.round(Math.random() * 100),
        delay: (Math.random() * 1.2).toFixed(2),
        duration: (2.4 + Math.random() * 1.6).toFixed(2),
        size: Math.round(8 + Math.random() * 10),
      })),
    []
  );

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase("exiting"), 2600);
    const doneTimer = setTimeout(() => setPhase("done"), 3300);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9997] flex flex-col items-center justify-center overflow-hidden bg-base transition-opacity duration-700 ${
        phase === "exiting" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      onClick={() => setPhase("exiting")}
    >
      {/* 꽃잎 스트립 */}
      <div className="pointer-events-none absolute inset-0">
        {petals.map((p, i) => (
          <span
            key={i}
            className="absolute top-0 rounded-full bg-accent/70 animate-petalFall"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.3,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              borderRadius: "60% 40% 60% 40%",
            }}
          />
        ))}
      </div>

      {/* 리본 */}
      <div className="relative flex flex-col items-center">
        <div
          className="h-32 w-[3px] origin-top bg-[#2c2c2c] animate-ribbonUnfurl"
          style={{ animationDelay: "0.2s" }}
        />
        <p className="mt-6 animate-fadeInUp font-serif text-sm tracking-[0.3em] text-[#5a5a5a] opacity-0" style={{ animationDelay: "0.9s" }}>
          INVITATION
        </p>
        <p
          className="mt-2 animate-fadeInUp font-serif text-2xl tracking-wide text-[#2c2c2c] opacity-0"
          style={{ animationDelay: "1.2s" }}
        >
          {wedding.groom.name} · {wedding.bride.name}
        </p>
      </div>
    </div>
  );
}
