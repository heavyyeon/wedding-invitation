import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { wedding } from "@/config/wedding";
import GrainOverlay from "@/components/GrainOverlay";

const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-project.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: wedding.kakao.title,
  description: wedding.kakao.description,
  openGraph: {
    title: wedding.kakao.title,
    description: wedding.kakao.description,
    images: [
      {
        url: "/kakao.jpg",
        width: 800,
        height: 800,
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  other: {
    // 카카오톡은 og:image가 절대경로여야 정상적으로 썸네일을 가져옵니다.
    "og:image": `${siteUrl}/kakao.jpg`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f2f8ed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${cormorant.variable} ${spaceMono.variable}`}
    >
      <body>
        <div id="app-root">{children}</div>
        <GrainOverlay />
      </body>
    </html>
  );
}
