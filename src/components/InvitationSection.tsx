import Image from "next/image";
import FadeIn from "./FadeIn";
import { wedding } from "@/config/wedding";

export default function InvitationSection() {
  return (
    <section className="bg-white px-6 py-20">
      <FadeIn className="flex flex-col items-center">
        <p className="font-mono text-xs tracking-[0.3em] text-[#7a8c68]">INVITATION</p>

        <div className="relative mt-8 h-40 w-full max-w-[280px]">
          <Image
            src="/invitation.png"
            alt="초대 손글씨"
            fill
            sizes="280px"
            className="object-contain"
          />
        </div>

        <div className="mt-8 space-y-1.5 text-center font-serif text-[15px] leading-relaxed text-[#3a3a3a]">
          {wedding.invitationMessage.map((line, i) =>
            line === "" ? <br key={i} /> : <p key={i}>{line}</p>
          )}
        </div>

        <div className="mt-10 flex items-center gap-3 text-sm text-[#5a5a5a]">
          <span className="font-serif text-lg text-[#2c2c2c]">{wedding.groom.name}</span>
          <span className="text-accent">&amp;</span>
          <span className="font-serif text-lg text-[#2c2c2c]">{wedding.bride.name}</span>
        </div>
        <p className="mt-2 font-mono text-[11px] tracking-widest text-[#9a9a9a]">
          부모님 성함이 있다면 src/config/wedding.ts 에 추가해 이 위에 표시할 수 있습니다.
        </p>
      </FadeIn>
    </section>
  );
}
