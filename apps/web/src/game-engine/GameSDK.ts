export type GameRuntimeStatus = "ready" | "playing" | "paused" | "game-over";

export interface GameResult {
  score: number;
  bestScore: number;
}

export interface GameSDK {
  start(): void;
  pause(): void;
  resume(): void;
  restart(): void;
  destroy(): void;
  getStatus(): GameRuntimeStatus;
  getScore(): number;
}
