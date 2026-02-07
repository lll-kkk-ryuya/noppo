# Project Instructions

## 技術前提
- Next.js(App Router) / TypeScript
- UIはTailwindのみ（追加UIライブラリ禁止）

## 実装ルール
- loading / empty / error の3状態を必ず実装する
- 変更範囲は `src/app/` `src/components/` `src/lib/` のみ
- コードは読みやすく、型を付け、最小差分で

## フォルダー構成
```
src/
  app/
    analysis/
      page.tsx      // 解析ページ
    favicon.ico     // サイトのファビコン
    globals.css     // グローバルCSS
    layout.tsx      // ルートレイアウト
    page.tsx        // トップページ
  components/
    specs/
      SpecAnalysis.tsx  // 解析セクションの表示
      SpecCard.tsx      // スペックカード表示
      SpecControls.tsx  // フィルター/操作UI
      SpecDashboard.tsx // ダッシュボード表示
      SpecGauge.tsx     // ゲージ表示
      SpecStates.tsx    // 状態表示（loading/empty/error）
      spec-data.ts      // スペックの静的データ
      useSpecs.ts       // スペック用のフック
```

## 実行
- 必要に応じて `pnpm lint` `pnpm test`
