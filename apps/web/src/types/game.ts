export type GameCategory = "Classic" | "Puzzle" | "Arcade" | "Original";
export type GameStatus = "available" | "coming-soon";

export interface Game {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: GameCategory;
  difficulty: "Easy" | "Medium" | "Hard";
  players: "1 Player" | "2 Players" | "1–2 Players";
  status: GameStatus;
  accent: string;
  symbol: string;
  featured?: boolean;
}
