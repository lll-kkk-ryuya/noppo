import type { ReactNode } from "react";

type StateProps = {
  title: string;
  body: string;
  action?: ReactNode;
};

export function StateCard({ title, body, action }: StateProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
      <div className="mx-auto h-2 w-20 rounded-full bg-emerald-300/40" />
      <div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-slate-300">{body}</p>
      </div>
      {action ? <div className="mx-auto">{action}</div> : null}
    </div>
  );
}

export function LoadingState() {
  return (
    <StateCard
      title="観測中…"
      body="ステータスを読み込み中です。"
      action={
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-emerald-200/80">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
          Sync
        </div>
      }
    />
  );
}

export function EmptyState() {
  return (
    <StateCard
      title="まだ観測データがありません"
      body="次のセッションで数値化します。"
    />
  );
}

export function ErrorState({ message }: { message: string }) {
  return (
    <StateCard
      title="観測中に通信が途切れました"
      body={message}
      action={
        <span className="rounded-full border border-rose-200/40 px-3 py-1 text-xs text-rose-100">
          再試行してください
        </span>
      }
    />
  );
}
