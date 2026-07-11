import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getDb } from "./firebase";

export type GuestBookEntry = {
  id: string;
  name: string;
  message: string;
  passwordHash: string; // 평문 비밀번호는 저장하지 않고 SHA-256 해시만 저장합니다.
  createdAt: Timestamp | null;
};

const COLLECTION = "guestbook";

async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function subscribeGuestBook(
  onData: (entries: GuestBookEntry[]) => void,
  onError?: (err: unknown) => void
) {
  const db = getDb();
  if (!db) {
    onData([]);
    return () => {};
  }

  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"), limit(100));

  return onSnapshot(
    q,
    (snapshot) => {
      const entries = snapshot.docs.map((d) => {
        const data = d.data() as Omit<GuestBookEntry, "id">;
        return { id: d.id, ...data };
      });
      onData(entries);
    },
    (err) => onError?.(err)
  );
}

export async function addGuestBookEntry(input: {
  name: string;
  message: string;
  password: string;
}) {
  const db = getDb();
  if (!db) {
    throw new Error(
      "Firebase가 설정되어 있지 않습니다. .env.local에 Firebase 설정값을 입력해주세요."
    );
  }
  await addDoc(collection(db, COLLECTION), {
    name: input.name.trim(),
    message: input.message.trim(),
    passwordHash: await hashPassword(input.password),
    createdAt: serverTimestamp(),
  });
}

export async function verifyGuestBookPassword(entry: GuestBookEntry, password: string) {
  return (await hashPassword(password)) === entry.passwordHash;
}

export async function deleteGuestBookEntry(id: string) {
  const db = getDb();
  if (!db) return;
  await deleteDoc(doc(db, COLLECTION, id));
}
