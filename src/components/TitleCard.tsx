import Image from "next/image";
import mainPhoto from "../../public/main-photo.jpg";
import { wedding } from "@/config/wedding";

export default function TitleCard() {
  return (
    <section className="relative w-full overflow-hidden bg-base">
      <Image
        src={mainPhoto}
        alt={`${wedding.groom.name}, ${wedding.bride.name} 메인 사진`}
        priority
        sizes="(max-width: 480px) 100vw, 480px"
        className="block h-auto w-full"
      />
    </section>
  );
}
