"use client";

import { useEffect, useState, type FormEvent } from "react";
import FadeIn from "./FadeIn";
import { useToast } from "./ToastProvider";
import {
  addGuestBookEntry,
  deleteGuestBookEntry,
  subscribeGuestBook,
  verifyGuestBookPassword,
  type GuestBookEntry,
} from "@/lib/guestbook";

export default function GuestBookSection() {
  const { showToast } = useToast();
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const [firebaseReady, setFirebaseReady] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<GuestBookEntry | null>(null);
  const [deletePassword, setDeletePassword] = useState("");

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeGuestBook(setEntries, () => setFirebaseReady(false));
    return unsubscribe;
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || !password.trim()) {
      showToast("이름, 메시지, 비밀번호를 모두 입력해주세요.");
      return;
    }
    setSubmitting(true);
    try {
      await addGuestBookEntry({ name, message, password });
      setName("");
      setMessage("");
      setPassword("");
      showToast("방명록이 등록되었습니다 💌");
    } catch (err) {
      console.error(err);
      showToast("등록에 실패했습니다. Firebase 설정을 확인해주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const valid = await verifyGuestBookPassword(deleteTarget, deletePassword);
    if (!valid) {
      showToast("비밀번호가 일치하지 않습니다.");
      return;
    }
    await deleteGuestBookEntry(deleteTarget.id);
    setDeleteTarget(null);
    setDeletePassword("");
    showToast("삭제되었습니다.");
  };

  return (
    <section className="bg-base px-6 py-16">
      <FadeIn>
        <p className="text-center font-mono text-xs tracking-[0.3em] text-[#7a8c68]">GUEST BOOK</p>
        <h2 className="mt-2 text-center font-serif text-2xl text-[#2c2c2c]">방명록</h2>
      </FadeIn>

      {!firebaseReady && (
        <p className="mt-6 text-center font-mono text-xs text-red-500">
          Firebase 연결에 문제가 있습니다. .env.local 설정값을 확인해주세요.
        </p>
      )}

      <FadeIn delay={100}>
        <form onSubmit={handleSubmit} className="mt-8 space-y-3 rounded-2xl bg-white/60 p-5">
          <div className="flex gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
              maxLength={20}
              className="w-1/2 rounded-lg border border-[#d8e5c8] bg-white px-3 py-2 text-sm outline-none focus:border-accent"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호(삭제용)"
              type="password"
              maxLength={20}
              className="w-1/2 rounded-lg border border-[#d8e5c8] bg-white px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="축하 메시지를 남겨주세요"
            rows={3}
            maxLength={300}
            className="w-full resize-none rounded-lg border border-[#d8e5c8] bg-white px-3 py-2 text-sm outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-accent py-2.5 text-sm font-medium text-[#2c2c2c] transition active:scale-[0.98] disabled:opacity-50"
          >
            {submitting ? "등록 중..." : "방명록 남기기"}
          </button>
        </form>
      </FadeIn>

      <div className="mt-6 space-y-3">
        {entries.length === 0 && (
          <p className="text-center font-mono text-xs text-[#9a9a9a]">
            아직 남겨진 메시지가 없습니다. 첫 번째 축하 메시지를 남겨보세요!
          </p>
        )}
        {entries.map((entry) => (
          <FadeIn key={entry.id}>
            <div className="rounded-xl bg-white/70 p-4">
              <div className="flex items-center justify-between">
                <p className="font-serif text-[15px] text-[#2c2c2c]">{entry.name}</p>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(entry)}
                  className="font-mono text-[10px] text-[#9a9a9a] underline"
                >
                  삭제
                </button>
              </div>
              <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-[#4a4a4a]">
                {entry.message}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      {deleteTarget && (
        <div
          className="fixed inset-0 z-[9995] flex items-center justify-center bg-black/40 px-8"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            className="w-full max-w-xs rounded-2xl bg-white p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-serif text-base text-[#2c2c2c]">메시지를 삭제할까요?</p>
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="작성 시 입력한 비밀번호"
              className="mt-3 w-full rounded-lg border border-[#e0e0e0] px-3 py-2 text-sm outline-none focus:border-accent"
            />
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-lg bg-[#f0f0f0] py-2 text-sm"
              >
                취소
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 rounded-lg bg-accent py-2 text-sm font-medium"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
