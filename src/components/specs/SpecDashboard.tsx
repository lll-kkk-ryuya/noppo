"use client";

import Link from "next/link";
import { useState } from "react";
import SpecCard from "./SpecCard";
import SpecControls from "./SpecControls";
import { EmptyState, ErrorState, LoadingState } from "./SpecStates";
import { profile, type FetchMode } from "./spec-data";
import { useSpecs } from "./useSpecs";

export default function SpecDashboard() {
  const [mode, setMode] = useState<FetchMode>("auto");
  const state = useSpecs(mode);

  return (
    <div className="min-h-screen px-6 pb-16 pt-12 sm:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-emerald-200/70">
                Spec Console
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
                {profile.name}
              </h1>
              <p className="mt-2 text-sm text-slate-300">{profile.summary}</p>
            </div>
            <div className="flex flex-col items-end gap-3 text-right">
              <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-slate-200">
                {profile.tag}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-slate-400">
                Repo: noppo
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-emerald-200/80">
                {profile.subtitle}
              </span>
              <Link
                className="text-xs uppercase tracking-[0.32em] text-emerald-200/80 hover:text-emerald-100"
                href="/analysis"
              >
                View analysis →
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SpecControls mode={mode} onChange={setMode} />
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(94,230,181,0.7)]" />
              Loading / Empty / Error included
            </div>
          </div>
        </header>

        {state.status === "loading" ? (
          <LoadingState />
        ) : state.status === "error" ? (
          <ErrorState message={state.message} />
        ) : state.status === "empty" ? (
          <EmptyState />
        ) : (
          <section className="grid gap-6 md:grid-cols-2">
            {state.items.map((item) => (
              <SpecCard key={item.id} item={item} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
