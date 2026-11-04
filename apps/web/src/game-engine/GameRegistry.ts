import type { ComponentType } from "react";

export interface GameModule {
  id: string;
  title: string;
  description: string;
  component: () => Promise<{ default: ComponentType<{ onClose: () => void }> }>;
}

export const gameRegistry: Record<string, GameModule> = {
  snake: { id:"snake", title:"Snake", description:"Eat, grow, and see how long you can survive.", component:()=>import("../games/snake/SnakeGame") },
  pong: { id:"pong", title:"Pong", description:"A timeless paddle duel.", component:()=>import("../games/ArcadeGame").then(m=>({default: m.default as ComponentType<{onClose:()=>void}>})) },
  "brick-breaker": { id:"brick-breaker", title:"Brick Breaker", description:"Bounce, break, and clear every level.", component:()=>import("../games/ArcadeGame").then(m=>({default: m.default as ComponentType<{onClose:()=>void}>})) },
  "memory-match": { id:"memory-match", title:"Memory Match", description:"Find every matching pair.", component:()=>import("../games/ArcadeGame").then(m=>({default: m.default as ComponentType<{onClose:()=>void}>})) },
  "number-merge": { id:"number-merge", title:"Number Merge", description:"Combine matching numbers.", component:()=>import("../games/ArcadeGame").then(m=>({default: m.default as ComponentType<{onClose:()=>void}>})) },
  starfall: { id:"starfall", title:"Starfall", description:"An original space survival challenge.", component:()=>import("../games/ArcadeGame").then(m=>({default: m.default as ComponentType<{onClose:()=>void}>})) },
  "space-shooter": { id:"space-shooter", title:"Space Shooter", description:"Defend your sector.", component:()=>import("../games/ArcadeGame").then(m=>({default: m.default as ComponentType<{onClose:()=>void}>})) },
  "neon-drift": { id:"neon-drift", title:"Neon Drift", description:"An original score-chasing driving challenge.", component:()=>import("../games/ArcadeGame").then(m=>({default: m.default as ComponentType<{onClose:()=>void}>})) },
};

export function getGameModule(gameId:string){return gameRegistry[gameId];}
export function getAvailableGameIds(){return Object.keys(gameRegistry);}
