import { useState } from "react";
import Header from "./components/Header";
import RecipeCard from "./components/RecipeCard";
import IngredientList from "./components/IngredientList";
import { recipes } from "./data/recipes";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [dietFilter, setDietFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeRecipe, setActiveRecipe] = useState(null);

  const categories = ["All", ...new Set(recipes.map((r) => r.category))];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesDiet =
      dietFilter === "ALL" ||
      (dietFilter === "VEG" && recipe.veg) ||
      (dietFilter === "NONVEG" && !recipe.veg);

    const matchesCategory =
      categoryFilter === "All" || recipe.category === categoryFilter;

    const matchesSearch =
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some((ing) =>
        ing.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesDiet && matchesCategory && matchesSearch;
  });

  return (
    <div className={`app-root ${darkMode ? "theme-dark" : "theme-light"}`}>
      <Header
        totalCount={recipes.length}
        showingCount={filteredRecipes.length}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
      />

      <main className="main-stage">
        {/* Interactive Control Dock */}
        <section className="control-dock" aria-label="Filter and search recipes">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search recipe or ingredient (e.g., Paneer, Avocado)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>

          <div className="filter-row">
            <div className="diet-pills">
              <button
                type="button"
                className={`pill-btn ${dietFilter === "ALL" ? "active" : ""}`}
                onClick={() => setDietFilter("ALL")}
              >
                All ({recipes.length})
              </button>
              <button
                type="button"
                className={`pill-btn ${dietFilter === "VEG" ? "active-veg" : ""}`}
                onClick={() => setDietFilter("VEG")}
              >
                🟢 Veg
              </button>
              <button
                type="button"
                className={`pill-btn ${dietFilter === "NONVEG" ? "active-nonveg" : ""}`}
                onClick={() => setDietFilter("NONVEG")}
              >
                🔴 Non-Veg
              </button>
            </div>

            <div className="category-pills">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`cat-btn ${categoryFilter === cat ? "active" : ""}`}
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Responsive 3D Card Grid */}
        {filteredRecipes.length > 0 ? (
          <section className="recipe-grid-3d" aria-label="Recipes">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSelect={setActiveRecipe}
              />
            ))}
          </section>
        ) : (
          <div className="empty-state">
            <p>No recipes match "{searchQuery}".</p>
            <button
              type="button"
              className="reset-btn"
              onClick={() => {
                setSearchQuery("");
                setDietFilter("ALL");
                setCategoryFilter("All");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Interactive Quick-View Recipe Modal */}
      {activeRecipe && (
        <div
          className="modal-backdrop"
          onClick={() => setActiveRecipe(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close"
              onClick={() => setActiveRecipe(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <img
              src={activeRecipe.image}
              alt={activeRecipe.name}
              className="modal-hero-img"
            />

            <div className="modal-content">
              <div className="modal-badges">
                <span className="badge-category">{activeRecipe.category}</span>
                <span
                  className={`badge-diet ${
                    activeRecipe.veg ? "veg" : "nonveg"
                  }`}
                >
                  {activeRecipe.veg ? "🟢 Veg" : "🔴 Non-veg"}
                </span>
                <span className="badge-glass">⏱ {activeRecipe.time} mins</span>
                <span className="badge-glass">🔥 {activeRecipe.calories}</span>
              </div>

              <h2 className="modal-title">{activeRecipe.name}</h2>

              <IngredientList
                ingredients={activeRecipe.ingredients}
                showAll={true}
              />

              <div className="chef-tip-box">
                <strong>👨‍🍳 Chef's Pro Tip:</strong> {activeRecipe.tip}
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="app-footer">
        <p>RecipeBox 3D • Built with React & Vite by Madhu Mitha</p>
      </footer>
    </div>
  );
}

export default App;
