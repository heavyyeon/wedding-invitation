import FadeIn from "./FadeIn";
import { wedding } from "@/config/wedding";

function InfoBlock({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="border-t border-[#e3ecd8] py-5 first:border-t-0">
      <p className="font-mono text-xs tracking-[0.2em] text-[#7a8c68]">{title}</p>
      <div className="mt-2 space-y-1.5">
        {lines.map((line, i) => (
          <p key={i} className="text-sm leading-relaxed text-[#4a4a4a]">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function DirectionsSection() {
  const query = encodeURIComponent(wedding.venue.mapQuery);
  const kakaoMapUrl = `https://map.kakao.com/?q=${query}`;
  const naverMapUrl = `https://map.naver.com/p/search/${query}`;

  return (
    <section className="bg-base px-6 py-16">
      <FadeIn>
        <p className="text-center font-mono text-xs tracking-[0.3em] text-[#7a8c68]">DIRECTIONS</p>
        <h2 className="mt-2 text-center font-serif text-2xl text-[#2c2c2c]">오시는 길</h2>
        <p className="mt-3 text-center text-sm text-[#4a4a4a]">{wedding.venue.name}</p>
        <p className="mt-1 text-center font-mono text-xs text-[#7a8c68]">{wedding.venue.address}</p>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="mt-6 flex gap-2">
          <a
            href={kakaoMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-lg bg-[#2c2c2c] py-2.5 text-center text-sm text-white"
          >
            카카오맵으로 보기
          </a>
          <a
            href={naverMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-lg border border-[#2c2c2c] py-2.5 text-center text-sm text-[#2c2c2c]"
          >
            네이버맵으로 보기
          </a>
        </div>
      </FadeIn>

      <FadeIn delay={150}>
        <div className="mt-8">
          <InfoBlock title="🚇 지하철" lines={wedding.directions.subway} />
          <InfoBlock title="🚌 버스" lines={wedding.directions.bus} />
          <InfoBlock title="🚗 자가용" lines={wedding.directions.car} />
        </div>
      </FadeIn>
    </section>
  );
}
