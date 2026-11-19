import { useState, useEffect } from "react";
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
  const [savedIds, setSavedIds] = useState([1, 2]);

  // Guided Kitchen Mode State
  const [cookingRecipe, setCookingRecipe] = useState(null);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const categories = ["All", ...new Set(recipes.map((r) => r.category))];

  useEffect(() => {
    if (!timerRunning || secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerRunning, secondsLeft]);

  const openCookMode = (recipe) => {
    setCookingRecipe(recipe);
    setCheckedIngredients([]);
    setSecondsLeft(recipe.time * 60);
    setTimerRunning(false);
  };

  const toggleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleIngredientCheck = (item) => {
    setCheckedIngredients((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesDiet =
      dietFilter === "ALL" ||
      (dietFilter === "VEG" && recipe.veg) ||
      (dietFilter === "NONVEG" && !recipe.veg) ||
      (dietFilter === "SAVED" && savedIds.includes(recipe.id));

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
    <div className={`app-shell ${darkMode ? "dark" : "light"}`}>
      <Header
        totalCount={recipes.length}
        savedCount={savedIds.length}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
      />

      <main className="main-content">
        <section className="toolbar" aria-label="Search and filter recipes">
          <div className="search-wrap">
            <span className="search-glyph">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes or ingredients..."
              className="search-field"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-btn"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>

          <div className="filters-wrap">
            <div className="pill-group">
              <button
                type="button"
                className={`filter-pill ${dietFilter === "ALL" ? "active" : ""}`}
                onClick={() => setDietFilter("ALL")}
              >
                All ({recipes.length})
              </button>
              <button
                type="button"
                className={`filter-pill ${
                  dietFilter === "VEG" ? "active-veg" : ""
                }`}
                onClick={() => setDietFilter("VEG")}
              >
                🟢 Veg
              </button>
              <button
                type="button"
                className={`filter-pill ${
                  dietFilter === "NONVEG" ? "active-nonveg" : ""
                }`}
                onClick={() => setDietFilter("NONVEG")}
              >
                🔴 Non-Veg
              </button>
              <button
                type="button"
                className={`filter-pill ${
                  dietFilter === "SAVED" ? "active" : ""
                }`}
                onClick={() => setDietFilter("SAVED")}
              >
                ❤️ Saved ({savedIds.length})
              </button>
            </div>

            <div className="pill-group">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`cat-pill ${
                    categoryFilter === cat ? "active" : ""
                  }`}
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {filteredRecipes.length > 0 ? (
          <section className="recipe-grid" aria-label="Recipe collection">
            {filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isSaved={savedIds.includes(recipe.id)}
                onToggleSave={toggleSave}
                onOpenCookMode={openCookMode}
              />
            ))}
          </section>
        ) : (
          <div className="empty-box">
            <p>No dishes found matching your filter.</p>
            <button
              type="button"
              className="reset-btn"
              onClick={() => {
                setSearchQuery("");
                setDietFilter("ALL");
                setCategoryFilter("All");
              }}
            >
              Show All Dishes
            </button>
          </div>
        )}
      </main>

      {/* Guided Kitchen Mode Drawer/Modal */}
      {cookingRecipe && (
        <div
          className="kitchen-backdrop"
          onClick={() => {
            setTimerRunning(false);
            setCookingRecipe(null);
          }}
        >
          <div className="kitchen-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="close-modal-btn"
              onClick={() => {
                setTimerRunning(false);
                setCookingRecipe(null);
              }}
            >
              ✕
            </button>

            <img
              src={cookingRecipe.image}
              alt={cookingRecipe.name}
              className="kitchen-banner"
            />

            <div className="kitchen-body">
              <div className="kitchen-tags">
                <span className="cat-badge">{cookingRecipe.category}</span>
                <span
                  className={`diet-tag ${
                    cookingRecipe.veg ? "veg" : "nonveg"
                  }`}
                >
                  {cookingRecipe.veg ? "🟢 Veg" : "🔴 Non-veg"}
                </span>
                <span className="time-tag">🔥 {cookingRecipe.calories}</span>
              </div>

              <h2 className="kitchen-title">{cookingRecipe.name}</h2>

              {/* Live Kitchen Countdown Timer */}
              <div className="timer-card">
                <div>
                  <span className="timer-label">Kitchen Timer</span>
                  <div className="timer-readout">
                    {formatTimer(secondsLeft)}
                  </div>
                </div>
                <div className="timer-controls">
                  <button
                    type="button"
                    className="timer-btn primary"
                    onClick={() => setTimerRunning(!timerRunning)}
                  >
                    {timerRunning ? "Pause" : "Start"}
                  </button>
                  <button
                    type="button"
                    className="timer-btn"
                    onClick={() => {
                      setTimerRunning(false);
                      setSecondsLeft(cookingRecipe.time * 60);
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Interactive Prep Checklist */}
              <p className="prep-hint">Tap ingredients below as you prep them:</p>
              <IngredientList
                ingredients={cookingRecipe.ingredients}
                showAll={true}
                checkedItems={checkedIngredients}
                onToggleItem={toggleIngredientCheck}
              />

              {/* Step-by-Step Method */}
              <div className="steps-section">
                <h3 className="steps-heading">Preparation Steps</h3>
                <ol className="steps-list">
                  {cookingRecipe.steps.map((step, idx) => (
                    <li key={idx} className="step-item">
                      <span className="step-num">{idx + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="site-footer">
        <p>RecipeBox • Crafted with React & Vite by Madhu Mitha</p>
      </footer>
    </div>
  );
}

export default App;
