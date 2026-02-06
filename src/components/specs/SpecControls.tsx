"use client";

import type { FetchMode } from "./spec-data";

type SpecControlsProps = {
  mode: FetchMode;
  onChange: (mode: FetchMode) => void;
};

const modes: { id: FetchMode; label: string }[] = [
  { id: "auto", label: "Auto" },
  { id: "success", label: "Success" },
  { id: "empty", label: "Empty" },
  { id: "error", label: "Error" },
];

export default function SpecControls({ mode, onChange }: SpecControlsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
        Dev mode
      </span>
      {modes.map((item) => {
        const active = item.id === mode;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] transition ${
              active
                ? "border-emerald-300/60 bg-emerald-300/20 text-emerald-100"
                : "border-white/15 text-slate-300 hover:border-white/30 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
