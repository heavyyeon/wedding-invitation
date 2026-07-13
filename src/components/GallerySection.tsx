"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import FadeIn from "./FadeIn";
import { wedding } from "@/config/wedding";

export default function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = wedding.gallery.count;
  const photos = Array.from({ length: total }, (_, i) => i + 1);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i - 2 + total) % total + 1)),
    [total]
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i === null ? i : (i % total) + 1)),
    [total]
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, prev, next]);

  return (
    <section className="bg-base px-6 py-16">
      <FadeIn>
        <p className="text-center font-mono text-xs tracking-[0.3em] text-[#7a8c68]">GALLERY</p>
        <h2 className="mt-2 text-center font-serif text-2xl text-[#2c2c2c]">우리의 순간들</h2>
      </FadeIn>

      <div className="mt-8 grid grid-cols-3 gap-0">
        {photos.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setActiveIndex(n)}
            className="relative aspect-[3/4] overflow-hidden bg-white/50"
          >
            <Image
              src={`/gallery/${n}.jpg`}
              alt={`갤러리 사진 ${n}`}
              fill
              sizes="160px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[9996] flex items-center justify-center bg-black/90"
          onClick={close}
        >
          <button
            type="button"
            aria-label="닫기"
            onClick={close}
            className="absolute right-5 top-5 text-2xl text-white"
          >
            ✕
          </button>

          <button
            type="button"
            aria-label="이전 사진"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-6 text-2xl text-white"
          >
            ‹
          </button>

          <div
            className="relative h-[70vh] w-full max-w-mobile"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/gallery/${activeIndex}.jpg`}
              alt={`갤러리 사진 ${activeIndex} 확대`}
              fill
              sizes="480px"
              className="object-contain"
            />
          </div>

          <button
            type="button"
            aria-label="다음 사진"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-6 text-2xl text-white"
          >
            ›
          </button>

          <p className="absolute bottom-6 font-mono text-xs text-white/70">
            {activeIndex} / {total}
          </p>
        </div>
      )}
    </section>
  );
}
