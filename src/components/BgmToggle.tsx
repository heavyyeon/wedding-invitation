"use client";

import { useEffect, useRef, useState } from "react";

export default function BgmToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryAutoplay = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          // 자동재생이 막힌 경우, 사용자가 버튼을 눌러 재생하도록 둡니다.
          startedRef.current = false;
        });
    };

    const events: (keyof DocumentEventMap)[] = ["click", "touchstart"];
    events.forEach((evt) => document.addEventListener(evt, tryAutoplay, { once: true }));

    return () => {
      events.forEach((evt) => document.removeEventListener(evt, tryAutoplay));
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/bgm.mp3" loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "배경음악 끄기" : "배경음악 켜기"}
        className="fixed bottom-5 right-5 z-[9998] flex h-11 w-11 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur transition active:scale-95"
      >
        <span
          className={`block h-5 w-5 rounded-full border-2 border-[#2c2c2c] transition ${
            playing ? "" : "opacity-40"
          }`}
        >
          {playing ? (
            <svg viewBox="0 0 20 20" className="h-full w-full p-0.5">
              <circle cx="10" cy="10" r="3.2" fill="#2c2c2c" className="animate-pulse" />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" className="h-full w-full p-0.5">
              <line x1="4" y1="4" x2="16" y2="16" stroke="#2c2c2c" strokeWidth="1.5" />
            </svg>
          )}
        </span>
      </button>
    </>
  );
}
