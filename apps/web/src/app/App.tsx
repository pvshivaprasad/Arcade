import { useState } from "react";
import { Gamepad2, Menu, Search, UserRound, X } from "lucide-react";
import Logo from "../components/Logo";
import HomePage from "../pages/HomePage";
import ExplorePage from "../pages/ExplorePage";
import type { Game } from "../types/game";

type Page = "home" | "explore";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");

  function playGame(game: Game) {
    if (game.status === "available") {
      setNotice(`${game.title} is ready for integration. The shared game launcher is Phase 2.`);
    } else {
      setNotice(`${game.title} is on the roadmap. Stay tuned!`);
    }
  }

  function navigate(next: Page) {
    setPage(next);
    setMobileMenu(false);
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <Logo />
          <nav className={`main-nav ${mobileMenu ? "nav-open" : ""}`} aria-label="Main navigation">
            <button className={page === "home" ? "nav-active" : ""} onClick={() => navigate("home")}>Home</button>
            <button className={page === "explore" ? "nav-active" : ""} onClick={() => navigate("explore")}>Explore games</button>
            <button onClick={() => setNotice("Leaderboards arrive after player scores are connected.")}>Leaderboards <span className="nav-soon">SOON</span></button>
          </nav>
          <div className="topbar-actions">
            <button className="header-icon" aria-label="Search games" onClick={() => navigate("explore")}><Search size={18} /></button>
            <button className="profile-button" onClick={() => setNotice("Player accounts are planned for a later phase.")}><UserRound size={16} /><span>Guest</span></button>
            <button className="mobile-menu" aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {notice && <div className="notice" role="status"><span>{notice}</span><button aria-label="Dismiss" onClick={() => setNotice("")}><X size={15} /></button></div>}
        {page === "home" ? <HomePage onExplore={() => navigate("explore")} onPlay={playGame} /> : <ExplorePage onPlay={playGame} />}
      </main>

      <footer className="footer">
        <div className="footer-top"><Logo /><span>Every game. One destination.</span><div className="footer-links"><button onClick={() => navigate("home")}>Home</button><button onClick={() => navigate("explore")}>Games</button><button onClick={() => setNotice("Contact information will be added before launch.")}>Contact</button></div></div>
        <div className="footer-bottom"><span>© 2026 ARCADE. Built for play.</span><span>MADE FOR YOUR FIVE-MINUTE BREAKS <Gamepad2 size={13} /></span></div>
      </footer>
    </div>
  );
}
