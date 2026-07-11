"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";
import { useToast } from "./ToastProvider";
import { wedding, type AccountInfo } from "@/config/wedding";

function AccountRow({ account }: { account: AccountInfo }) {
  const { showToast } = useToast();

  if (!account.name && !account.number) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(account.number);
      showToast("계좌번호가 복사되었습니다");
    } catch {
      showToast("복사에 실패했습니다");
    }
  };

  return (
    <div className="flex items-center justify-between border-b border-black/10 py-3 last:border-b-0">
      <div>
        <p className="font-mono text-[10px] tracking-widest opacity-70">{account.role}</p>
        <p className="mt-0.5 text-sm">
          {account.bank} {account.number}
        </p>
        <p className="text-xs opacity-70">예금주 {account.name}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        className="shrink-0 rounded-full bg-[#2c2c2c] px-3 py-1.5 text-xs text-white"
      >
        복사
      </button>
    </div>
  );
}

function SideGroup({ side }: { side: "신랑측" | "신부측" }) {
  const [open, setOpen] = useState(false);
  const accounts = wedding.accounts.filter((a) => a.side === side && (a.name || a.number));

  if (accounts.length === 0) return null;

  return (
    <div className="mt-4 rounded-2xl bg-white/40 p-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between"
      >
        <span className="font-serif text-lg">{side}</span>
        <span className="font-mono text-xs">{open ? "접기 ▲" : "펼치기 ▼"}</span>
      </button>
      {open && (
        <div className="mt-2">
          {accounts.map((a, i) => (
            <AccountRow key={i} account={a} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function AccountSection() {
  return (
    <section className="bg-accent px-6 py-16 text-[#2c2c2c]">
      <FadeIn>
        <p className="text-center font-mono text-xs tracking-[0.3em]">ACCOUNT</p>
        <h2 className="mt-2 text-center font-serif text-2xl">마음 전하실 곳</h2>
        <p className="mt-3 text-center text-sm leading-relaxed opacity-80">
          직접 축하의 마음을 전하지 못하는 분들을 위해
          <br />
          계좌번호를 안내드립니다.
        </p>
      </FadeIn>

      <FadeIn delay={100}>
        <SideGroup side="신랑측" />
        <SideGroup side="신부측" />
      </FadeIn>
    </section>
  );
}
