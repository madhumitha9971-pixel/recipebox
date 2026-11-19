function Header({ totalCount, showingCount, darkMode, onToggleTheme }) {
  return (
    <header className="hero-section">
      <nav className="top-nav">
        <div className="logo-mark">
          <span className="logo-cube">🧊</span>
          <span className="logo-text">
            Recipe<span>Box</span> 3D
          </span>
        </div>

        <button
          type="button"
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          aria-label="Toggle color theme"
        >
          {darkMode ? "☀️ Light Studio" : "🌙 Dark Studio"}
        </button>
      </nav>

      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-pill">
            <span className="pulse-dot"></span>
            Interactive Culinary Showcase
          </div>

          <h1 className="hero-title">
            Cook Smarter with <span>3D Spatial</span> Recipe Cards
          </h1>

          <p className="hero-subtitle">
            Tilt, explore, and inspect handcrafted recipes built with modular
            React components, real-time filters, and interactive quick-view cards.
          </p>

          <div className="hero-metrics">
            <div className="metric-card">
              <span className="metric-value">{showingCount}/{totalCount}</span>
              <span className="metric-label">Active Recipes</span>
            </div>
            <div className="metric-card">
              <span className="metric-value">3D Tilt</span>
              <span className="metric-label">Touch & Cursor Physics</span>
            </div>
            <div className="metric-card">
              <span className="metric-value">100%</span>
              <span className="metric-label">Prop-Driven UI</span>
            </div>
          </div>
        </div>

        {/* 3D Floating Spatial Dish Stage */}
        <div className="hero-3d-stage" aria-hidden="true">
          <div className="floating-orb orb-1"></div>
          <div className="floating-orb orb-2"></div>
          <div className="spatial-showcase-card">
            <img
              src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80"
              alt=""
              className="spatial-img"
            />
            <div className="spatial-float-tag tag-top">🔥 Trending Today</div>
            <div className="spatial-float-tag tag-bottom">
              ⏱ 30m • 🟢 Pure Veg
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
