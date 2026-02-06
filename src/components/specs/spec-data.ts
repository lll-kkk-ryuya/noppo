export type SpecItem = {
  id: string;
  title: string;
  score: number;
  description: string;
  highlight?: string;
};

export const profile = {
  name: "のっぽくん",
  subtitle: "Almost capped status",
  tag: "Friend / Lv.99",
  summary:
    "ほぼカンストしてる友人のステータスを、観測ベースで可視化。",
};

export const specItems: SpecItem[] = [
  {
    id: "memory",
    title: "記憶力",
    score: 5.0,
    description:
      "会話の細部まで覚えていて、友人から“ChatGPT”と呼ばれることがある。",
    highlight: "Memory: MAX",
  },
  {
    id: "sports",
    title: "スポーツ",
    score: 4.5,
    description:
      "身体の使い方が上手く、初見の競技でもすぐに形にできるタイプ。",
  },
  {
    id: "study",
    title: "勉学",
    score: 4.5,
    description:
      "理解が速く、要点を自分の言葉で再構築するのが得意。",
  },
  {
    id: "visual",
    title: "ビジュアル",
    score: 4.5,
    description:
      "清潔感と雰囲気づくりが上手で、写真写りも安定している。",
  },
  {
    id: "personality",
    title: "性格",
    score: 4.0,
    description:
      "落ち着いていて面倒見が良く、周囲のテンションを整える役。",
  },
  {
    id: "romance",
    title: "恋愛コミュ力",
    score: 3.0,
    description:
      "相手に誠実すぎて考え込みがち。好意があるほど慎重で、質問が深掘り方向に寄ることがある。",
  },
];

export type FetchMode = "auto" | "success" | "empty" | "error";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fetchSpecs = async (mode: FetchMode) => {
  await delay(500);

  if (mode === "error") {
    throw new Error("観測中に通信が途切れました");
  }

  if (mode === "empty") {
    return [] as SpecItem[];
  }

  if (mode === "auto" && Math.random() < 0.25) {
    throw new Error("観測中に通信が途切れました");
  }

  return specItems;
};

export const scoreToRank = (score: number) => {
  if (score >= 4.5) return "S";
  if (score >= 4.0) return "A";
  if (score >= 3.0) return "B";
  if (score >= 2.0) return "C";
  return "D";
};

export const scoreToLabel = (score: number) => {
  if (score >= 4.5) return "Almost capped";
  if (score >= 4.0) return "High";
  if (score >= 3.0) return "Stable";
  if (score >= 2.0) return "Emerging";
  return "Developing";
};
