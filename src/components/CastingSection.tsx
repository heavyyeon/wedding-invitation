import Image from "next/image";
import FadeIn from "./FadeIn";
import { wedding } from "@/config/wedding";

function PersonCard({
  role,
  name,
  photo,
  delay,
}: {
  role: string;
  name: string;
  photo: string;
  delay: number;
}) {
  return (
    <FadeIn delay={delay} className="flex flex-1 flex-col items-center gap-3">
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-white/50">
        <Image
          src={photo}
          alt={`${role} ${name}`}
          fill
          sizes="(max-width: 480px) 45vw, 220px"
          className="object-cover"
        />
      </div>
      <div className="text-center">
        <p className="font-mono text-[11px] tracking-[0.2em] text-[#7a8c68]">{role}</p>
        <p className="mt-1 font-serif text-xl text-[#2c2c2c]">{name}</p>
      </div>
    </FadeIn>
  );
}

export default function CastingSection() {
  return (
    <section className="bg-base px-6 py-16">
      <FadeIn>
        <p className="text-center font-mono text-xs tracking-[0.3em] text-[#7a8c68]">CASTING</p>
        <h2 className="mt-2 text-center font-serif text-2xl text-[#2c2c2c]">신랑 &amp; 신부</h2>
      </FadeIn>

      <div className="mt-8 flex gap-4">
        <PersonCard role="GROOM 신랑" name={wedding.groom.name} photo="/groom.jpg" delay={0} />
        <PersonCard role="BRIDE 신부" name={wedding.bride.name} photo="/bride.jpg" delay={150} />
      </div>
    </section>
  );
}
