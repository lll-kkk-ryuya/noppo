"use client";

import Link from "next/link";
import { useState } from "react";
import SpecControls from "./SpecControls";
import { EmptyState, ErrorState, LoadingState } from "./SpecStates";
import { profile, type FetchMode } from "./spec-data";
import { useSpecs } from "./useSpecs";

export default function SpecAnalysis() {
  const [mode, setMode] = useState<FetchMode>("auto");
  const state = useSpecs(mode);

  return (
    <div className="min-h-screen px-6 pb-16 pt-12 sm:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-6">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-emerald-200/70">
                Analysis
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
                根拠コメント
              </h1>
              <p className="mt-2 text-sm text-slate-300">
                {profile.name}の数値は観測ベースで記録しています。
              </p>
            </div>
            <div className="flex flex-col items-end gap-3 text-right">
              <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-slate-200">
                Notes Archive
              </span>
              <Link
                className="text-xs uppercase tracking-[0.32em] text-emerald-200/80 hover:text-emerald-100"
                href="/"
              >
                ← Back to dashboard
              </Link>
            </div>
          </div>
          <SpecControls mode={mode} onChange={setMode} />
        </header>

        {state.status === "loading" ? (
          <LoadingState />
        ) : state.status === "error" ? (
          <ErrorState message={state.message} />
        ) : state.status === "empty" ? (
          <EmptyState />
        ) : (
          <section className="grid gap-6 lg:grid-cols-2">
            {state.items.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">
                    {item.title}
                  </h2>
                  <span className="font-mono text-sm text-emerald-200/80">
                    {item.score.toFixed(1)}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {item.description}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.28em] text-slate-500">
                  Evidence log
                </p>
              </article>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
