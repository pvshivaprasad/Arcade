import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Pause, Play, RotateCcw, X } from "lucide-react";
import "./snake.css";

type Point = { x: number; y: number };
type Direction = "up" | "down" | "left" | "right";
type Status = "ready" | "playing" | "paused" | "over";
const SIZE = 20;
const START: Point[] = [{ x: 9, y: 10 }, { x: 8, y: 10 }, { x: 7, y: 10 }];

function randomFood(snake: Point[]): Point {
  const free: Point[] = [];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (!snake.some((part) => part.x === x && part.y === y)) free.push({ x, y });
    }
  }
  return free.length ? free[Math.floor(Math.random() * free.length)] : { x: -1, y: -1 };
}

const opposite: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

export default function SnakeGame({ onClose }: { onClose: () => void }) {
  const [snake, setSnake] = useState<Point[]>(START);
  const [food, setFood] = useState<Point>(() => randomFood(START));
  const [status, setStatus] = useState<Status>("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem("arcade-snake-best") ?? 0));

  // Refs keep rapid key presses and the game tick in sync, without restarting the timer.
  const directionRef = useRef<Direction>("right");
  const queuedDirectionRef = useRef<Direction>("right");
  const turnLockedRef = useRef(false);

  const changeDirection = useCallback((next: Direction) => {
    if (turnLockedRef.current) return;
    const current = directionRef.current;
    if (next === opposite[current]) return;
    queuedDirectionRef.current = next;
    turnLockedRef.current = true;
  }, []);

  const restart = useCallback(() => {
    directionRef.current = "right";
    queuedDirectionRef.current = "right";
    turnLockedRef.current = false;
    setSnake(START);
    setFood(randomFood(START));
    setScore(0);
    setStatus("playing");
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return;
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      const keys: Record<string, Direction> = {
        ArrowUp: "up", w: "up",
        ArrowDown: "down", s: "down",
        ArrowLeft: "left", a: "left",
        ArrowRight: "right", d: "right",
      };
      const next = keys[key];
      if (next && status === "playing") {
        event.preventDefault();
        changeDirection(next);
      }
      if (key === " " && status !== "over") {
        event.preventDefault();
        setStatus((current) => current === "playing" ? "paused" : "playing");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [changeDirection, status]);

  useEffect(() => {
    if (status !== "playing") return;
    const timer = window.setInterval(() => {
      const nextDirection = queuedDirectionRef.current;
      directionRef.current = nextDirection;
      turnLockedRef.current = false;

      setSnake((current) => {
        const head = current[0];
        const next: Point = {
          x: head.x + (nextDirection === "right" ? 1 : nextDirection === "left" ? -1 : 0),
          y: head.y + (nextDirection === "down" ? 1 : nextDirection === "up" ? -1 : 0),
        };
        const eating = next.x === food.x && next.y === food.y;
        // Moving into the current tail cell is legal when the tail moves away.
        const body = eating ? current : current.slice(0, -1);
        const hitWall = next.x < 0 || next.x >= SIZE || next.y < 0 || next.y >= SIZE;
        const hitSelf = body.some((part) => part.x === next.x && part.y === next.y);

        if (hitWall || hitSelf) {
          setStatus("over");
          return current;
        }

        const updated = [next, ...body];
        if (eating) {
          setScore((value) => {
            const nextScore = value + 10;
            setBest((old) => {
              const record = Math.max(old, nextScore);
              localStorage.setItem("arcade-snake-best", String(record));
              return record;
            });
            return nextScore;
          });
          const nextFood = randomFood(updated);
          if (nextFood.x === -1) {
            setStatus("over");
          } else {
            setFood(nextFood);
          }
        }
        return updated;
      });
    }, Math.max(75, 145 - Math.floor(score / 50) * 8));
    return () => window.clearInterval(timer);
  }, [food, score, status]);

  const cells = useMemo(() => Array.from({ length: SIZE * SIZE }, (_, index) => {
    const point = { x: index % SIZE, y: Math.floor(index / SIZE) };
    const snakeIndex = snake.findIndex((part) => part.x === point.x && part.y === point.y);
    return { ...point, snakeIndex, isFood: food.x === point.x && food.y === point.y };
  }), [snake, food]);

  return (
    <div className="snake-overlay" role="dialog" aria-modal="true" aria-label="Snake game">
      <section className="snake-panel">
        <header className="snake-header">
          <div><span className="snake-kicker">ARCADE CLASSICS</span><h2>Snake<span>.</span></h2></div>
          <button className="snake-close" onClick={onClose} aria-label="Close game"><X /></button>
        </header>
        <div className="snake-scorebar">
          <div><small>SCORE</small><strong>{String(score).padStart(3, "0")}</strong></div>
          <div><small>BEST</small><strong>{String(best).padStart(3, "0")}</strong></div>
          <div className="snake-status"><span className={status === "playing" ? "status-live" : ""} />{status === "playing" ? "PLAYING" : status === "paused" ? "PAUSED" : status === "over" ? "GAME OVER" : "READY"}</div>
        </div>
        <div className="snake-board-wrap">
          <div className="snake-board" style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}>
            {cells.map((cell) => <div key={`${cell.x}-${cell.y}`} className={`snake-cell ${cell.snakeIndex === 0 ? "snake-head" : cell.snakeIndex > 0 ? "snake-body" : ""} ${cell.isFood ? "snake-food" : ""}`} />)}
          </div>
          {status !== "playing" && (
            <div className="snake-curtain">
              <div className="snake-curtain-icon">{status === "over" ? "↻" : "✦"}</div>
              <h3>{status === "over" ? "Nice run!" : status === "paused" ? "Take a breath" : "Ready to play?"}</h3>
              <p>{status === "over" ? `You scored ${score} points. Give it another go.` : status === "paused" ? "Your game is paused." : "Collect the gold, avoid the walls, and don't bite your tail."}</p>
              <button className="snake-primary" onClick={status === "over" ? restart : () => setStatus("playing")}><Play size={16} />{status === "over" ? "Play again" : status === "paused" ? "Resume game" : "Start game"}</button>
            </div>
          )}
        </div>
        <div className="snake-controls">
          <div className="snake-help">MOVE <b>WASD</b> / <b>ARROW KEYS</b><span>SPACE TO PAUSE</span></div>
          <div className="snake-actions">
            <button onClick={() => setStatus((current) => current === "playing" ? "paused" : current === "paused" ? "playing" : current)} aria-label="Pause or resume"><Pause size={17} /></button>
            <button onClick={restart} aria-label="Restart game"><RotateCcw size={17} /></button>
          </div>
        </div>
        <div className="snake-touch" aria-label="Touch controls">
          <button onClick={() => changeDirection("up")}><ArrowUp /></button>
          <div><button onClick={() => changeDirection("left")}><ArrowLeft /></button><button onClick={() => changeDirection("down")}><ArrowDown /></button><button onClick={() => changeDirection("right")}><ArrowRight /></button></div>
        </div>
      </section>
    </div>
  );
}
