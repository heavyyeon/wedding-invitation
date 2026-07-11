"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/config/wedding";

export function useDday() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weddingDay = new Date(wedding.date.year, wedding.date.month - 1, wedding.date.day);
    const diff = Math.round((weddingDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diff > 0) setLabel(`D-${diff}`);
    else if (diff === 0) setLabel("D-Day");
    else setLabel(`D+${Math.abs(diff)}`);
  }, []);

  return label;
}
