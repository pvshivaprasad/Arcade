import type { Game } from "../types/game";

export const games: Game[] = [
  { id:"snake", slug:"snake", title:"Snake", description:"Eat, grow, and see how long you can survive.", category:"Classic", difficulty:"Easy", players:"1 Player", status:"available", accent:"lime", symbol:"〰", featured:true },
  { id:"pong", slug:"pong", title:"Pong", description:"A timeless paddle duel. Keep the ball in play.", category:"Classic", difficulty:"Easy", players:"2 Players", status:"available", accent:"violet", symbol:"◒" },
  { id:"brick-breaker", slug:"brick-breaker", title:"Brick Breaker", description:"Bounce, break, and clear every level.", category:"Arcade", difficulty:"Medium", players:"1 Player", status:"available", accent:"orange", symbol:"▦" },
  { id:"memory-match", slug:"memory-match", title:"Memory Match", description:"Flip the cards and find every matching pair.", category:"Puzzle", difficulty:"Easy", players:"1 Player", status:"available", accent:"pink", symbol:"▧" },
  { id:"number-merge", slug:"number-merge", title:"Number Merge", description:"Combine matching numbers to reach a new high.", category:"Puzzle", difficulty:"Medium", players:"1 Player", status:"available", accent:"blue", symbol:"2048" },
  { id:"starfall", slug:"starfall", title:"Starfall", description:"An original space survival challenge.", category:"Original", difficulty:"Medium", players:"1 Player", status:"available", accent:"gold", symbol:"✦", featured:true },
  { id:"space-shooter", slug:"space-shooter", title:"Space Shooter", description:"Dodge incoming threats and defend your sector.", category:"Arcade", difficulty:"Hard", players:"1 Player", status:"available", accent:"cyan", symbol:"✧" },
  { id:"neon-drift", slug:"neon-drift", title:"Neon Drift", description:"An original score-chasing driving challenge.", category:"Original", difficulty:"Hard", players:"1 Player", status:"available", accent:"red", symbol:"↗" },
];

export const categories = ["All games", "Classic", "Puzzle", "Arcade", "Original"] as const;
