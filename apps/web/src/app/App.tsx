import { useState } from "react";
import { Menu, Search, UserRound, X } from "lucide-react";
import Logo from "../components/Logo";
import HomePage from "../pages/HomePage";
import ExplorePage from "../pages/ExplorePage";
import type { Game } from "../types/game";
import SnakeGame from "../games/snake/SnakeGame";
import ArcadeGame from "../games/ArcadeGame";
import GamePreview from "../components/GamePreview";

type Page = "home" | "explore";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [activeGame, setActiveGame] = useState<string | null>(null);

  function openPreview(game: Game) { setNotice(""); setSelectedGame(game); }
  function launchGame(game: Game) { setSelectedGame(null); setActiveGame(game.id); }
  function navigate(next: Page) {
    setPage(next); setMobileMenu(false); setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return <div className="app-shell">
    <header className="topbar"><div className="topbar-inner">
      <Logo />
      <nav className={`main-nav ${mobileMenu ? "nav-open" : ""}`} aria-label="Main navigation">
        <button className={page === "home" ? "nav-active" : ""} onClick={() => navigate("home")}>Home</button>
        <button className={page === "explore" ? "nav-active" : ""} onClick={() => navigate("explore")}>Explore games</button>
        <button onClick={() => setNotice("Leaderboards are planned for a future update.")}>Leaderboards <span className="nav-soon">SOON</span></button>
      </nav>
      <div className="topbar-actions">
        <button className="header-icon" aria-label="Search games" onClick={() => navigate("explore")}><Search size={18}/></button>
        <span className="profile-button"><UserRound size={16}/><span>Guest · Free</span></span>
        <button className="mobile-menu" aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu?<X/>:<Menu/>}</button>
      </div>
    </div></header>
    {selectedGame&&<GamePreview game={selectedGame} onClose={()=>setSelectedGame(null)} onPlay={launchGame}/>}
    {activeGame==="snake"&&<SnakeGame onClose={()=>setActiveGame(null)}/>}
    {activeGame&&activeGame!=="snake"&&<ArcadeGame gameId={activeGame} onClose={()=>setActiveGame(null)}/>}
    <main className="main-content">
      {notice&&<div className="notice" role="status"><span>{notice}</span><button aria-label="Dismiss" onClick={()=>setNotice("")}><X size={15}/></button></div>}
      {page==="home"?<HomePage onExplore={()=>navigate("explore")} onPlay={openPreview}/>:<ExplorePage onPlay={openPreview}/>}
    </main>
    <footer className="footer"><div className="footer-top"><Logo/><span>Every game. One destination.</span><div className="footer-links"><button onClick={()=>navigate("home")}>Home</button><button onClick={()=>navigate("explore")}>Games</button><button onClick={()=>setNotice("Contact information will be added before launch.")}>Contact</button></div></div><div className="footer-bottom"><span>© 2026 ARCADE. Built for play.</span><span>MADE FOR YOUR FIVE-MINUTE BREAKS <span aria-hidden="true">✦</span></span></div></footer>
  </div>;
}
