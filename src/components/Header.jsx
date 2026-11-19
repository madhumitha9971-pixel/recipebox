function Header({ totalCount, savedCount, darkMode, onToggleTheme }) {
  return (
    <header className="site-header">
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
          aria-label="Switch theme"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </nav>

      <div className="hero-content">
        <span className="hero-kicker">Everyday Home Kitchen</span>
        <h1 className="hero-heading">
          Simple, Soulful Recipes for <span>Every Table</span>
        </h1>
        <p className="hero-description">
          Browse curated home favorites, check off ingredients as you prep, and
          cook along with a built-in kitchen timer.
        </p>

        <div className="hero-badges">
          <span className="info-pill">📖 {totalCount} Curated Dishes</span>
          <span className="info-pill">❤️ {savedCount} Saved</span>
          <span className="info-pill">⏱ Built-in Kitchen Timer</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
