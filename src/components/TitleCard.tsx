import Image from "next/image";
import { wedding } from "@/config/wedding";

export default function TitleCard() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-base">
      <Image
        src="/main-photo.jpg"
        alt={`${wedding.groom.name}, ${wedding.bride.name} 메인 사진`}
        fill
        priority
        sizes="(max-width: 480px) 100vw, 480px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-black/20" />

      <div className="absolute inset-x-0 top-10 flex flex-col items-center text-white">
        <p className="font-serif text-xs tracking-[0.4em]">WE ARE GETTING MARRIED</p>
      </div>

      <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-2 text-white">
        <p className="font-serif text-3xl tracking-wide">
          {wedding.groom.name} <span className="mx-2 font-mono text-xl">&amp;</span> {wedding.bride.name}
        </p>
        <p className="font-mono text-xs tracking-widest opacity-90">
          {wedding.date.displayDate.toUpperCase()}
        </p>
      </div>
    </section>
  );
}
