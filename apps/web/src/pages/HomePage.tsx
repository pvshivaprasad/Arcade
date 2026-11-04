import { ArrowRight, Flame, Sparkles, Trophy } from "lucide-react";
import type { Game } from "../types/game";
import { games } from "../data/games";
import GameCard from "../components/GameCard";

interface Props {
  onExplore: () => void;
  onPlay: (game: Game) => void;
}

export default function HomePage({ onExplore, onPlay }: Props) {
  const featured = games.filter((game) => game.featured);
  const popular = games.filter((game) => !game.featured).slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> YOUR NEXT BREAK STARTS HERE</div>
          <h1>Small games.<br /><span>Big fun.</span></h1>
          <p>Jump into timeless classics and discover original games. No downloads, no waiting. Just play.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={onExplore}>Explore games <ArrowRight size={17} /></button>
            <span className="hero-note"><Sparkles size={14} /> Free to play</span>
          </div>
        </div>
        <div className="hero-art" aria-label="Abstract arcade game artwork">
          <div className="hero-glow" />
          <div className="hero-ring ring-a" />
          <div className="hero-ring ring-b" />
          <div className="hero-orb orb-a">✦</div>
          <div className="hero-orb orb-b">◒</div>
          <div className="hero-orb orb-c">↗</div>
          <div className="hero-center"><span>PRESS</span><strong>PLAY</strong><span>TO BEGIN</span></div>
          <div className="hero-art-caption">THE ARCADE UNIVERSE <span>01 / 08</span></div>
        </div>
      </section>

      <section className="quick-stats">
        <div><span className="stat-icon"><Gamepad2Icon /></span><span><strong>08</strong><small>Games in the universe</small></span></div>
        <div><span className="stat-icon"><Flame size={18} /></span><span><strong>01</strong><small>Game prototype built</small></span></div>
        <div><span className="stat-icon"><Trophy size={18} /></span><span><strong>∞</strong><small>High scores to chase</small></span></div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div><div className="eyebrow">HANDPICKED FOR YOU</div><h2>Featured games<span>.</span></h2></div>
          <button className="text-button" onClick={onExplore}>View all games <ArrowRight size={16} /></button>
        </div>
        <div className="featured-grid">
          {featured.map((game) => <GameCard key={game.id} game={game} onPlay={onPlay} />)}
        </div>
      </section>

      <section className="section-block popular-block">
        <div className="section-heading">
          <div><div className="eyebrow">PICK UP AND PLAY</div><h2>Explore the arcade<span>.</span></h2></div>
          <button className="text-button" onClick={onExplore}>Explore all <ArrowRight size={16} /></button>
        </div>
        <div className="game-grid">
          {popular.map((game) => <GameCard key={game.id} game={game} onPlay={onPlay} />)}
        </div>
      </section>
    </>
  );
}

function Gamepad2Icon() {
  return <span className="gamepad-glyph">⌘</span>;
}
