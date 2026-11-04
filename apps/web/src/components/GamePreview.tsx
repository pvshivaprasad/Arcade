import { ArrowRight, Gamepad2, Lock, Sparkles, X } from "lucide-react";
import { useEffect } from "react";
import type { Game } from "../types/game";

interface Props {
  game: Game;
  onClose: () => void;
  onPlay: (game: Game) => void;
}

export default function GamePreview({ game, onClose, onPlay }: Props) {
  const ready = game.status === "available";

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="game-preview-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className={`game-preview art-${game.accent} game-${game.id}`} role="dialog" aria-modal="true" aria-labelledby="game-preview-title">
        <button className="preview-close" onClick={onClose} aria-label="Close preview"><X size={19} /></button>
        <div className="preview-art game-art">
          <span className="art-orbit orbit-one" />
          <span className="art-orbit orbit-two" />
          <span className="art-scene scene-front" />
          <span className="art-symbol">{game.symbol}</span>
          <span className="art-category">{game.category}</span>
          <span className="art-index">ARCADE / {game.id.toUpperCase()}</span>
        </div>
        <div className="preview-content">
          <div className="eyebrow">{ready ? "READY WHEN YOU ARE" : "COMING TO THE ARCADE"}</div>
          <h2 id="game-preview-title">{game.title}<span>.</span></h2>
          <p className="preview-description">{game.description}</p>
          <div className="preview-facts">
            <div><Gamepad2 size={17} /><span><small>PLAYERS</small><strong>{game.players}</strong></span></div>
            <div><Sparkles size={17} /><span><small>DIFFICULTY</small><strong>{game.difficulty}</strong></span></div>
            <div><span className={`preview-status-dot ${ready ? "is-ready" : ""}`} /><span><small>AVAILABILITY</small><strong>{ready ? "Playable now" : "In development"}</strong></span></div>
          </div>
          <div className="preview-how">
            <strong>THE ARCADE EXPERIENCE</strong>
            <p>{ready
              ? "Jump straight into a quick session. Your best score is saved on this device, so you can come back and beat it."
              : "This game is part of the ARCADE collection. We're building it for a future update; you can explore the rest of the collection in the meantime."}</p>
          </div>
          <div className="preview-actions">
            <button className="button button-primary" disabled={!ready} onClick={() => onPlay(game)}>
              {ready ? <>Play now <ArrowRight size={17} /></> : <><Lock size={15} /> Coming soon</>}
            </button>
            <button className="preview-back" onClick={onClose}>Back to games</button>
          </div>
        </div>
      </section>
    </div>
  );
}
