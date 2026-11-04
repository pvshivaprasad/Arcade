export interface GameModule {
  id: string;
  title: string;
  description: string;
  component: () => Promise<{ default: React.ComponentType<{ onClose: () => void }> }>;
}

export const gameRegistry: Record<string, GameModule> = {
  snake: {
    id: "snake",
    title: "Snake",
    description: "Eat, grow, and see how long you can survive.",
    component: () => import("../games/snake/SnakeGame"),
  },
};

export function getGameModule(gameId: string): GameModule | undefined {
  return gameRegistry[gameId];
}

export function getAvailableGameIds(): string[] {
  return Object.keys(gameRegistry);
}
