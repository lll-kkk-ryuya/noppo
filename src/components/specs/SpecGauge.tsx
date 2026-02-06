import { scoreToLabel, scoreToRank } from "./spec-data";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

type SpecGaugeProps = {
  score: number;
};

export default function SpecGauge({ score }: SpecGaugeProps) {
  const safeScore = clamp(score, 0, 5);
  const width = `${(safeScore / 5) * 100}%`;
  const rank = scoreToRank(safeScore);
  const label = scoreToLabel(safeScore);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-300">
        <span className="font-mono">{label}</span>
        <span className="rounded-full border border-white/15 px-2 py-1 text-[10px]">
          Rank {rank}
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-300 shadow-[0_0_12px_rgba(94,230,181,0.6)]"
          style={{ width }}
        />
      </div>
      <div className="flex items-baseline justify-between text-sm text-slate-200">
        <span className="font-mono text-lg">{safeScore.toFixed(1)}</span>
        <span className="text-xs text-slate-400">/ 5.0</span>
      </div>
    </div>
  );
}
