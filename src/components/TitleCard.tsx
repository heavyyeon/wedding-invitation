import Image from "next/image";
import { wedding } from "@/config/wedding";

export default function TitleCard() {
  return (
    <section className="relative aspect-[3/4] w-full overflow-hidden bg-base">
      <Image
        src="/main-photo.jpg"
        alt={`${wedding.groom.name}, ${wedding.bride.name} 메인 사진`}
        fill
        priority
        sizes="(max-width: 480px) 100vw, 480px"
        className="object-cover"
      />
    </section>
  );
}
