import type { SpecItem } from "./spec-data";

const MAX_SCORE = 5;
const COUNT = 6;
const CENTER = 100;
const RADIUS = 70;
const LABEL_OFFSET = 24;

const toPoint = (angle: number, radius: number) => ({
  x: CENTER + Math.cos(angle) * radius,
  y: CENTER + Math.sin(angle) * radius,
});

const toPercent = (value: number) => `${(value / 200) * 100}%`;

const buildAngles = (count: number) =>
  Array.from({ length: count }, (_, index) =>
    ((-90 + (360 / count) * index) * Math.PI) / 180
  );

const toPointsString = (points: { x: number; y: number }[]) =>
  points.map((point) => `${point.x.toFixed(2)},${point.y.toFixed(2)}`).join(" ");

type SpecHexagonProps = {
  items: SpecItem[];
};

export default function SpecHexagon({ items }: SpecHexagonProps) {
  const limitedItems = items.slice(0, COUNT);
  const angles = buildAngles(COUNT);

  const gridRings = [1, 2 / 3, 1 / 3].map((scale) =>
    toPointsString(angles.map((angle) => toPoint(angle, RADIUS * scale)))
  );

  const valuePoints = toPointsString(
    angles.map((angle, index) => {
      const score = limitedItems[index]?.score ?? 0;
      const ratio = Math.min(Math.max(score / MAX_SCORE, 0), 1);
      return toPoint(angle, RADIUS * ratio);
    })
  );

  const labelPositions = angles.map((angle) =>
    toPoint(angle, RADIUS + LABEL_OFFSET)
  );

  return (
    <article className="relative flex h-full flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.32em] text-emerald-200/80">
          Skill Hexagon
        </p>
        <h2 className="mt-2 text-xl font-semibold text-white">
          のっぽくんのスキル
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          6項目を正六角形で可視化。
        </p>
      </div>

      <div className="relative mx-auto w-full max-w-[420px]">
        <div className="relative aspect-square w-full">
          <svg
            viewBox="0 0 200 200"
            className="h-full w-full"
            aria-hidden="true"
          >
            <polygon
              points={gridRings[0]}
              fill="none"
              stroke="rgba(148,163,184,0.4)"
              strokeWidth="1"
            />
            <polygon
              points={gridRings[1]}
              fill="none"
              stroke="rgba(148,163,184,0.25)"
              strokeWidth="1"
            />
            <polygon
              points={gridRings[2]}
              fill="none"
              stroke="rgba(148,163,184,0.2)"
              strokeWidth="1"
            />
            {angles.map((angle) => {
              const end = toPoint(angle, RADIUS);
              return (
                <line
                  key={`axis-${angle}`}
                  x1={CENTER}
                  y1={CENTER}
                  x2={end.x}
                  y2={end.y}
                  stroke="rgba(148,163,184,0.25)"
                  strokeWidth="1"
                />
              );
            })}
            <polygon
              points={valuePoints}
              fill="rgba(94,230,181,0.25)"
              stroke="rgba(94,230,181,0.9)"
              strokeWidth="2"
            />
            {angles.map((angle, index) => {
              const score = limitedItems[index]?.score ?? 0;
              const ratio = Math.min(Math.max(score / MAX_SCORE, 0), 1);
              const point = toPoint(angle, RADIUS * ratio);
              return (
                <circle
                  key={`dot-${angle}`}
                  cx={point.x}
                  cy={point.y}
                  r="3"
                  fill="rgba(94,230,181,0.9)"
                />
              );
            })}
          </svg>

          {labelPositions.map((pos, index) => (
            <div
              key={`label-${index}`}
              className="absolute w-24 -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ left: toPercent(pos.x), top: toPercent(pos.y) }}
            >
              <p className="text-xs font-semibold text-white">
                {limitedItems[index]?.title ?? "-"}
              </p>
              <p className="text-[10px] uppercase tracking-[0.24em] text-emerald-200/80">
                {(limitedItems[index]?.score ?? 0).toFixed(1)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
        <span className="font-mono uppercase tracking-[0.2em]">Scale 0 - 5</span>
        <span className="text-emerald-200/80">観測ベース</span>
      </div>
    </article>
  );
}
