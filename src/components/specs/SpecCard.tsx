import SpecGauge from "./SpecGauge";
import type { SpecItem } from "./spec-data";

type SpecCardProps = {
  item: SpecItem;
};

export default function SpecCard({ item }: SpecCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-emerald-200/80">
            Status
          </p>
          <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
        </div>
        {item.highlight ? (
          <span className="rounded-full border border-emerald-200/40 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-emerald-100">
            {item.highlight}
          </span>
        ) : null}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-300">
        {item.description}
      </p>
      <div className="mt-6">
        <SpecGauge score={item.score} />
      </div>
    </article>
  );
}
