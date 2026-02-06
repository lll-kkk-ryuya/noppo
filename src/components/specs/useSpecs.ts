"use client";

import { useEffect, useState } from "react";
import { fetchSpecs, type FetchMode, type SpecItem } from "./spec-data";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "empty" }
  | { status: "success"; items: SpecItem[] };

export const useSpecs = (mode: FetchMode) => {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let active = true;

    const load = async () => {
      setState({ status: "loading" });
      try {
        const items = await fetchSpecs(mode);
        if (!active) return;
        if (items.length === 0) {
          setState({ status: "empty" });
          return;
        }
        setState({ status: "success", items });
      } catch (error) {
        if (!active) return;
        const message =
          error instanceof Error ? error.message : "データ取得に失敗しました";
        setState({ status: "error", message });
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [mode]);

  return state;
};
