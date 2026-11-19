function Header({ totalCount, showingCount }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-pill">
          <span className="pill-dot"></span>
          Home Kitchen Collection
        </div>

        <h1 className="header-title">
          Recipe<span>Box</span>
        </h1>

        <p className="header-tagline">
          Everyday home-cooked favorites crafted into clean, modular recipe cards.
        </p>

        <div className="header-stats">
          <div className="stat-chip">
            <strong>{showingCount}</strong> of <strong>{totalCount}</strong> Recipes Shown
          </div>
          <div className="stat-chip">React + Vite Props Architecture</div>
        </div>
      </div>
    </header>
  );
}

export default Header;
