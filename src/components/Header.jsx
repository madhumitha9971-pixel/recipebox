import Dish3DViewer from "./Dish3DViewer";

function Header({ recipes, totalCount, savedCount, darkMode, onToggleTheme }) {
  return (
    <header className="site-header">
      <div className="container">
        <nav className="nav-bar">
          <div className="brand">
            <span className="brand-icon">🍳</span>
            <span className="brand-name">
              Recipe<span>Box</span>
            </span>
          </div>

          <button
            type="button"
            className="theme-btn"
            onClick={onToggleTheme}
            aria-label="Switch color theme"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </nav>

        <div className="hero-grid">
          <div className="hero-text">
            <span className="hero-kicker">Everyday Home Kitchen</span>
            <h1 className="hero-title">
              Simple, Soulful Recipes for <span>Every Table</span>
            </h1>
            <p className="hero-subtitle">
              Match ingredients from your fridge, plan meals within your
              budget, and cook step-by-step with a built-in kitchen timer.
            </p>

            <div className="hero-pills">
              <span className="hero-pill">📖 {totalCount} Curated Dishes</span>
              <span className="hero-pill">❤️ {savedCount} Saved</span>
              <span className="hero-pill">⏱ Kitchen Timer</span>
            </div>
          </div>

          <Dish3DViewer recipes={recipes} />
        </div>
      </div>
    </header>
  );
}

export default Header;
