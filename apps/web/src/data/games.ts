import type { Game } from "../types/game";

export const games: Game[] = [
  { id:"snake", slug:"snake", title:"Snake", description:"The Nokia-era classic. Eat, grow, and survive.", category:"Classic", difficulty:"Easy", players:"1 Player", status:"available", accent:"lime", symbol:"〰", featured:true },
  { id:"bounce", slug:"bounce", title:"Bounce: Lost Dimensions", description:"A physics platform adventure. Jump across handcrafted stages, collect rings and dodge deadly traps.", category:"Original", difficulty:"Medium", players:"1 Player", status:"available", accent:"red", symbol:"●", featured:true },
  { id:"pong", slug:"pong", title:"Pong", description:"A timeless two-player paddle duel.", category:"Classic", difficulty:"Easy", players:"2 Players", status:"available", accent:"violet", symbol:"◒" },
  { id:"brick-breaker", slug:"brick-breaker", title:"Brick Breaker", description:"Clear the brick field, keep your lives and beat each level.", category:"Classic", difficulty:"Medium", players:"1 Player", status:"available", accent:"orange", symbol:"▦" },
  { id:"memory-match", slug:"memory-match", title:"Memory Match", description:"A focused memory challenge. Find all eight pairs in as few moves as possible.", category:"Puzzle", difficulty:"Easy", players:"1 Player", status:"available", accent:"pink", symbol:"▧" },
  { id:"number-merge", slug:"number-merge", title:"Number Merge", description:"Slide and combine matching tiles. Can you reach 2048?", category:"Puzzle", difficulty:"Medium", players:"1 Player", status:"available", accent:"blue", symbol:"2048" },
  { id:"starfall", slug:"starfall", title:"Starfall", description:"A survival challenge: read the falling patterns and stay alive.", category:"Arcade", difficulty:"Medium", players:"1 Player", status:"available", accent:"gold", symbol:"✦" },
  { id:"space-shooter", slug:"space-shooter", title:"Space Shooter", description:"Pilot your ship, destroy incoming threats and defend your sector.", category:"Arcade", difficulty:"Hard", players:"1 Player", status:"available", accent:"cyan", symbol:"✧" },
  { id:"neon-drift", slug:"neon-drift", title:"Neon Drift", description:"A three-lane traffic dodger. Read the road and survive the rush.", category:"Arcade", difficulty:"Hard", players:"1 Player", status:"available", accent:"red", symbol:"↗" },
];

export const categories = ["All games", "Classic", "Puzzle", "Arcade", "Original"] as const;
