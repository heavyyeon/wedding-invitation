import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#f2f8ed",
        accent: "#a8d96c",
        cream: "#fffdf9",
      },
      fontFamily: {
        sans: ["var(--font-pretendard)", "sans-serif"],
        serif: ["var(--font-cormorant)", "serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      maxWidth: {
        mobile: "480px",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        petalFall: {
          "0%": { transform: "translateY(-10vh) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(360deg)", opacity: "0.8" },
        },
        ribbonUnfurl: {
          "0%": { transform: "scaleY(0)", opacity: "0" },
          "100%": { transform: "scaleY(1)", opacity: "1" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.9s ease forwards",
        petalFall: "petalFall linear forwards",
        ribbonUnfurl: "ribbonUnfurl 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
