import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import GameCard from "../components/GameCard";
import { categories, games } from "../data/games";
import type { Game } from "../types/game";

interface Props { onPlay: (game: Game) => void; }

export default function ExplorePage({ onPlay }: Props) {
  const [category, setCategory] = useState<string>("All games");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => games.filter((game) => {
    const matchesCategory = category === "All games" || game.category === category;
    const search = query.trim().toLowerCase();
    const matchesSearch = !search || `${game.title} ${game.description} ${game.category}`.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  }), [category, query]);

  return (
    <section className="explore-page">
      <div className="eyebrow">FIND YOUR NEXT FAVOURITE</div>
      <div className="explore-title-row"><div><h1>Explore games<span>.</span></h1><p>Something for every mood and every kind of player.</p></div><span className="catalog-count">{games.length} GAMES</span></div>
      <div className="explore-tools">
        <label className="search-box"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search games..." /></label>
        <span className="filter-label"><SlidersHorizontal size={15} /> FILTER</span>
      </div>
      <div className="category-tabs">
        {categories.map((item) => <button key={item} className={category === item ? "category-active" : ""} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <div className="results-line">{filtered.length} {filtered.length === 1 ? "GAME" : "GAMES"} FOUND</div>
      {filtered.length ? <div className="game-grid">{filtered.map((game) => <GameCard key={game.id} game={game} onPlay={onPlay} />)}</div> : <div className="empty-state"><span>⌕</span><h3>No games found</h3><p>Try another search or category.</p><button className="button button-secondary" onClick={() => {setQuery("");setCategory("All games");}}>Clear filters</button></div>}
    </section>
  );
}
