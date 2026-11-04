import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUp, Pause, Play, RotateCcw, X } from "lucide-react";

type Props = { gameId: string; onClose: () => void };
type Point = { x: number; y: number };
const W = 640, H = 420;

const TITLES: Record<string, string> = {
  pong: "Pong", "brick-breaker": "Brick Breaker", "memory-match": "Memory Match",
  "number-merge": "Number Merge", starfall: "Starfall", "space-shooter": "Space Shooter", "neon-drift": "Neon Drift",
};
const HELP: Record<string, string> = {
  pong: "Player 1: W / S · Player 2: ↑ / ↓",
  "brick-breaker": "Move with ← → or A / D. Keep the ball alive.",
  "memory-match": "Flip two cards at a time and find every pair.",
  "number-merge": "Use arrow keys to slide equal tiles together. Reach 2048!",
  starfall: "Move with ← → or A / D. Dodge the falling stars.",
  "space-shooter": "Move with ← → and fire with Space.",
  "neon-drift": "Switch lanes with ← →. Avoid the traffic.",
};

function newTiles() {
  const board = Array(16).fill(0);
  const place = (arr: number[]) => {
    const empty = arr.map((v, i) => v === 0 ? i : -1).filter(i => i >= 0);
    if (empty.length) arr[empty[Math.floor(Math.random() * empty.length)]] = Math.random() < .9 ? 2 : 4;
  };
  place(board); place(board); return board;
}

export default function ArcadeGame({ gameId, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const stateRef = useRef<any>({});
  const keysRef = useRef<Record<string, boolean>>({});
  const [status, setStatus] = useState<"ready" | "playing" | "paused" | "over">("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem(`arcade-${gameId}-best`) || 0));
  const [tiles, setTiles] = useState<number[]>(() => newTiles());
  const [cards, setCards] = useState<number[]>(() => Array.from({length:16},(_,i)=>Math.floor(i/2)+1).sort(()=>Math.random()-.5));
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [message, setMessage] = useState("");

  const finish = useCallback(() => setStatus("over"), []);
  const resetArcade = useCallback(() => {
    stateRef.current = { paddle: W/2, paddle2: W/2, ball:{x:W/2,y:H/2,vx:3,vy:3}, bricks: Array.from({length:5},(_,r)=>Array.from({length:10},(_,c)=>({x:32+c*58,y:48+r*25,alive:true}))).flat(), objects:[], lane:1, player:{x:W/2,y:H-55}, cooldown:0, frame:0, score:0 };
    setScore(0); setStatus("playing");
  }, []);

  const updateBest = useCallback((value:number) => {
    setScore(value);
    setBest(old => {
      const next = Math.max(old,value);
      if (next > old) localStorage.setItem(`arcade-${gameId}-best`, String(next));
      return next;
    });
  }, [gameId]);

  const move2048 = useCallback((dir:string) => {
    setTiles(current => {
      const b = [...current];
      const lines = Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>dir==="left"?i*4+j:dir==="right"?i*4+3-j:dir==="up"?j*4+i:(3-j)*4+i));
      let gained=0;
      for(const line of lines){
        const values=line.map(i=>b[i]).filter(Boolean);
        for(let k=0;k<values.length-1;k++) if(values[k]===values[k+1]) { values[k]*=2; gained+=values[k]; values.splice(k+1,1); }
        while(values.length<4) values.push(0);
        line.forEach((idx,k)=>b[idx]=values[k]);
      }
      if(b.every((v,i)=>v===current[i])) return current;
      const empty=b.map((v,i)=>v===0?i:-1).filter(i=>i>=0);
      if(empty.length) b[empty[Math.floor(Math.random()*empty.length)]]=Math.random()<.9?2:4;
      setScore(s=>{const n=s+gained; updateBest(n); return n;});
      return b;
    });
  }, [updateBest]);

  useEffect(() => {
    const down=(e:KeyboardEvent)=>{
      const key=e.key.toLowerCase();
      if(["arrowup","arrowdown","arrowleft","arrowright"," "].includes(key)) e.preventDefault();
      keysRef.current[key]=true;
      if(gameId==="number-merge" && status==="playing" && key.startsWith("arrow")) move2048(key.slice(5));
      if(key==="escape") onClose();
      if(key===" " && gameId!=="memory-match" && status!=="over") setStatus(s=>s==="playing"?"paused":"playing");
    };
    const up=(e:KeyboardEvent)=>{keysRef.current[e.key.toLowerCase()]=false;};
    window.addEventListener("keydown",down); window.addEventListener("keyup",up);
    return()=>{window.removeEventListener("keydown",down);window.removeEventListener("keyup",up);};
  },[gameId,status,move2048,onClose]);

  useEffect(() => {
    if(gameId==="memory-match" || gameId==="number-merge" || status!=="playing") return;
    const canvas=canvasRef.current; const ctx=canvas?.getContext("2d"); if(!canvas||!ctx)return;
    let raf=0; let last=0;
    const draw=(time:number)=>{
      if(time-last<16){raf=requestAnimationFrame(draw);return;} last=time;
      const s=stateRef.current; s.frame++;
      ctx.clearRect(0,0,W,H); ctx.fillStyle="#111a28";ctx.fillRect(0,0,W,H);
      ctx.strokeStyle="#ffffff0c";ctx.lineWidth=1;
      for(let x=0;x<W;x+=32){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for(let y=0;y<H;y+=32){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
      const left=keysRef.current.arrowleft||keysRef.current.a, right=keysRef.current.arrowright||keysRef.current.d;
      const up=keysRef.current.arrowup||keysRef.current.w, down=keysRef.current.arrowdown||keysRef.current.s;
      const rect=(x:number,y:number,w:number,h:number,color:string,r=5)=>{ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();};
      const circle=(x:number,y:number,r:number,color:string)=>{ctx.fillStyle=color;ctx.shadowColor=color;ctx.shadowBlur=14;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;};
      if(gameId==="pong"){
        s.paddle+=((down?1:0)-(up?1:0))*5;
        s.paddle2+=((keysRef.current.s?1:0)-(keysRef.current.w?1:0))*5;
        s.paddle=Math.max(40,Math.min(H-40,s.paddle));s.paddle2=Math.max(40,Math.min(H-40,s.paddle2));
        s.ball.x+=s.ball.vx;s.ball.y+=s.ball.vy;
        if(s.ball.y<10||s.ball.y>H-10)s.ball.vy*=-1;
        if(s.ball.x<45&&Math.abs(s.ball.y-s.paddle2)<55){s.ball.vx=Math.abs(s.ball.vx)*1.05;s.ball.vy+=(s.ball.y-s.paddle2)*.04;}
        if(s.ball.x>W-45&&Math.abs(s.ball.y-s.paddle)<55){s.ball.vx=-Math.abs(s.ball.vx)*1.05;s.ball.vy+=(s.ball.y-s.paddle)*.04;}
        if(s.ball.x<0||s.ball.x>W){updateBest(score+1);s.ball={x:W/2,y:H/2,vx:(s.ball.x<0?3:-3),vy:Math.random()*4-2};}
        rect(25,s.paddle2-42,9,84,"#c4a7ed",5);rect(W-34,s.paddle-42,9,84,"#f5d58a",5);circle(s.ball.x,s.ball.y,9,"#fff0c8");
        ctx.fillStyle="#ffffff55";ctx.font="18px sans-serif";ctx.fillText(String(score),W/2-20,32);
      } else if(gameId==="brick-breaker"){
        s.paddle=Math.max(45,Math.min(W-45,s.paddle+(right?7:left?-7:0)));
        s.ball.x+=s.ball.vx;s.ball.y+=s.ball.vy;
        if(s.ball.x<8||s.ball.x>W-8)s.ball.vx*=-1;if(s.ball.y<8)s.ball.vy=Math.abs(s.ball.vy);
        if(s.ball.y>H-42&&s.ball.y<H-20&&Math.abs(s.ball.x-s.paddle)<55)s.ball.vy=-Math.abs(s.ball.vy);
        for(const b of s.bricks)if(b.alive&&s.ball.x>b.x&&s.ball.x<b.x+50&&s.ball.y>b.y&&s.ball.y<b.y+17){b.alive=false;s.ball.vy*=-1;updateBest(score+10);break;}
        if(s.ball.y>H){finish();}
        if(s.bricks.every((b:any)=>!b.alive)){s.bricks=Array.from({length:50},(_,i)=>({x:32+(i%10)*58,y:48+Math.floor(i/10)*25,alive:true}));}
        s.bricks.forEach((b:any,i:number)=>b.alive&&rect(b.x,b.y,50,16,["#f5d58a","#b6d4be","#c4a7ed"][Math.floor(i/10)]));
        rect(s.paddle-48,H-28,96,10,"#f5d58a");circle(s.ball.x,s.ball.y,7,"#fff0c8");
      } else {
        const drift=gameId==="neon-drift";
        const speed=drift?5:4;
        s.player.x=Math.max(28,Math.min(W-28,s.player.x+(right?speed:left?-speed:0)));
        if(gameId==="space-shooter" && keysRef.current[" "] && s.cooldown<=0){s.objects.push({x:s.player.x,y:H-60,vy:-8,type:"shot"});s.cooldown=12;}
        s.cooldown--;
        if(s.frame%42===0)s.objects.push({x:drift?W/2+(Math.floor(Math.random()*3)-1)*110:Math.random()*(W-50)+25,y:-20,vy:drift?5:3+Math.random()*2,type:drift?"car":"hazard"});
        if(gameId==="starfall"&&s.frame%22===0)s.objects.push({x:Math.random()*W,y:-10,vy:2+Math.random()*3,type:"star"});
        s.objects=s.objects.filter((o:any)=>o.y<H+30);
        for(const o of s.objects){o.y+=o.vy;if(o.type==="shot"){circle(o.x,o.y,4,"#f5d58a");continue;}circle(o.x,o.y,drift?14:8,drift?"#ed8e8e":gameId==="starfall"?"#f5d58a":"#a8dce8");if(Math.abs(o.x-s.player.x)<(drift?28:18)&&Math.abs(o.y-(H-55))<24)finish();}
        if(gameId==="space-shooter"){
          s.objects=s.objects.filter((o:any)=>{if(o.type==="shot"){const target=s.objects.find((t:any)=>t.type!=="shot"&&Math.abs(t.x-o.x)<20&&Math.abs(t.y-o.y)<20);if(target){target.y=H+50;updateBest(score+10);return false;}}return true;});
        }
        if(s.frame%30===0)updateBest(score+1);
        if(drift){rect(s.player.x-22,H-75,44,58,"#f28f91",10);rect(s.player.x-13,H-68,26,15,"#f8d8b5",4);}
        else if(gameId==="space-shooter"){ctx.fillStyle="#b9e8ed";ctx.beginPath();ctx.moveTo(s.player.x,H-85);ctx.lineTo(s.player.x-25,H-35);ctx.lineTo(s.player.x+25,H-35);ctx.fill();}
        else {circle(s.player.x,H-55,13,"#f5d58a");}
      }
      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);return()=>cancelAnimationFrame(raf);
  },[gameId,status,finish,score,updateBest]);

  const start = () => {
    if(gameId==="memory-match"){setCards(Array.from({length:16},(_,i)=>Math.floor(i/2)+1).sort(()=>Math.random()-.5));setFlipped([]);setMatched([]);setMoves(0);}
    if(gameId==="number-merge")setTiles(newTiles());
    resetArcade();
  };
  const flip=(i:number)=>{
    if(flipped.length===2||flipped.includes(i)||matched.includes(i))return;
    const next=[...flipped,i];setFlipped(next);
    if(next.length===2){setMoves(m=>m+1);if(cards[next[0]]===cards[next[1]]){setMatched(m=>[...m,...next]);setFlipped([]);if(matched.length+2===16){updateBest(Math.max(0,100-moves));setStatus("over");}}else setTimeout(()=>setFlipped([]),750);}
    if(status==="ready")setStatus("playing");
  };
  const title=TITLES[gameId]||"ARCADE Game";
  return <div className="arcade-game-overlay" role="dialog" aria-modal="true" aria-label={title}>
    <section className="arcade-game-panel">
      <header className="arcade-game-header"><div><span className="eyebrow">ARCADE GAME PACK 01</span><h2>{title}<i>.</i></h2></div><button className="snake-close" onClick={onClose} aria-label="Close game"><X/></button></header>
      <div className="arcade-game-score"><span>SCORE <b>{score}</b></span><span>BEST <b>{best}</b></span><span className="arcade-live">{status==="playing"?"● PLAYING":status.toUpperCase()}</span></div>
      {gameId==="memory-match" ? <div className="memory-board">{cards.map((v,i)=><button key={i} className={`memory-card ${flipped.includes(i)||matched.includes(i)?"revealed":""} ${matched.includes(i)?"matched":""}`} onClick={()=>flip(i)} disabled={status==="over"||matched.includes(i)}>{flipped.includes(i)||matched.includes(i)?["✦","◈","●","▲","✿","⬟","☾","✧"][v-1]:"?"}</button>)}</div>
      : gameId==="number-merge" ? <div className="merge-board">{tiles.map((v,i)=><div key={i} className={`merge-tile tile-${v}`}>{v||""}</div>)}</div>
      : <canvas ref={canvasRef} width={W} height={H} className="arcade-canvas" aria-label={title+" playfield"}/>}
      <div className="arcade-game-help">{gameId==="memory-match"?`MOVES ${moves} · MATCH ALL PAIRS`:HELP[gameId]}</div>
      {status!=="playing"&&<div className="arcade-game-curtain"><div className="curtain-star">✦</div><h3>{status==="over"?"Nice game!":status==="paused"?"Paused":"Ready to play?"}</h3><p>{status==="over"?"Great session. Want another round?":"A quick game, whenever you're ready."}</p><button className="button button-primary" onClick={start}><Play size={16}/>{status==="over"?"Play again":"Start game"}</button></div>}
      <footer className="arcade-game-footer"><span>{HELP[gameId]}</span><div><button onClick={()=>setStatus(s=>s==="playing"?"paused":"playing")} aria-label="Pause or resume"><Pause size={17}/></button><button onClick={start} aria-label="Restart"><RotateCcw size={17}/></button></div></footer>
    </section>
  </div>;
}
