import { ArrowUpRight, Gamepad2, Lock } from "lucide-react";
import type { Game } from "../types/game";

interface Props {
  game: Game;
  onPlay: (game: Game) => void;
}

export default function GameCard({ game, onPlay }: Props) {
  const ready = game.status === "available";

  return (
    <article className={`game-card art-${game.accent}`}>
      <div className="game-art">
        <span className="art-orbit orbit-one" />
        <span className="art-orbit orbit-two" />
        <span className="art-symbol">{game.symbol}</span>
        <span className="art-category">{game.category}</span>
        {!ready && <span className="coming-tag"><Lock size={11} /> Coming soon</span>}
      </div>
      <div className="game-info">
        <div className="game-title-row">
          <div>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
          </div>
          <button
            className={`icon-button ${ready ? "icon-button-ready" : ""}`}
            onClick={() => onPlay(game)}
            aria-label={`${ready ? "Play" : "View"} ${game.title}`}
          >
            {ready ? <ArrowUpRight size={18} /> : <Lock size={15} />}
          </button>
        </div>
        <div className="game-meta">
          <span><Gamepad2 size={13} /> {game.players}</span>
          <span>{game.difficulty}</span>
        </div>
      </div>
    </article>
  );
}
