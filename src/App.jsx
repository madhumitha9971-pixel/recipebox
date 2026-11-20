import { useState, useEffect } from "react";
import Header from "./components/Header";
import SmartKitchenTools from "./components/SmartKitchenTools";
import RecipeCard from "./components/RecipeCard";
import IngredientList from "./components/IngredientList";
import { recipes } from "./data/recipes";
import "./App.css";

const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Dessert"];

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("EN");

  // Week 2 Required State: search, category, favourites, favouritesOnly, maxTime
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [favourites, setFavourites] = useState([1, 3]);
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);
  const [dietFilter, setDietFilter] = useState("ALL");
  const [selectedPantry, setSelectedPantry] = useState([]);
  const [maxTime, setMaxTime] = useState(60);
  const [maxBudget, setMaxBudget] = useState(200);

  // Guided Kitchen Mode, Serving Scaler, Remix & Grocery List State
  const [cookingRecipe, setCookingRecipe] = useState(null);
  const [servings, setServings] = useState(1);
  const [remixMode, setRemixMode] = useState("original");
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // Countdown Timer Effect
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

  // Toggle favourite ID in state (Week 2 requirement)
  const toggleFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const togglePantry = (key) => {
    setSelectedPantry((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const openCookMode = (recipe) => {
    setCookingRecipe(recipe);
    setServings(1);
    setRemixMode("original");
    setCheckedIngredients([]);
    setCompletedSteps([]);
    setSecondsLeft(recipe.time * 60);
    setTimerRunning(false);
  };

  const closeCookMode = () => {
    setTimerRunning(false);
    setCookingRecipe(null);
    setCompletedSteps([]);
  };

  const handleSelectRemix = (mode, recipe) => {
    setRemixMode(mode);
    setTimerRunning(false);
    const activeTime =
      mode === "original" ? recipe.time : recipe.remixes[mode].time;
    setSecondsLeft(activeTime * 60);
  };

  const toggleIngredientCheck = (item) => {
    setCheckedIngredients((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const toggleStepDone = (idx) => {
    setCompletedSteps((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const addAllToShoppingList = (items) => {
    setShoppingList((prev) => [...new Set([...prev, ...items])]);
  };

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // Derive visibleRecipes during render using .filter(...) (Week 2 best practice)
  const visibleRecipes = recipes
    .map((recipe) => {
      if (selectedPantry.length === 0) {
        return { ...recipe, matchScore: 0 };
      }
      const matchedCount = selectedPantry.filter((tag) =>
        recipe.pantryTags.includes(tag)
      ).length;
      const matchScore = Math.round(
        (matchedCount / selectedPantry.length) * 100
      );
      return { ...recipe, matchScore };
    })
    .filter((recipe) => {
      const matchesSearch =
        recipe.name.toLowerCase().includes(search.toLowerCase()) ||
        (recipe.tamilName && recipe.tamilName.includes(search)) ||
        recipe.ingredients.some((ing) =>
          ing.toLowerCase().includes(search.toLowerCase())
        );

      const matchesCategory =
        category === "All" || recipe.category === category;

      const matchesFavourites =
        !showFavouritesOnly || favourites.includes(recipe.id);

      const matchesDiet =
        dietFilter === "ALL" ||
        (dietFilter === "VEG" && recipe.veg) ||
        (dietFilter === "NONVEG" && !recipe.veg);

      const matchesTime = recipe.time <= maxTime;
      const matchesBudget = recipe.costInr <= maxBudget;
      const matchesPantry =
        selectedPantry.length === 0 || recipe.matchScore > 0;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesFavourites &&
        matchesDiet &&
        matchesTime &&
        matchesBudget &&
        matchesPantry
      );
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  const resetAllFilters = () => {
    setSearch("");
    setCategory("All");
    setShowFavouritesOnly(false);
    setDietFilter("ALL");
    setSelectedPantry([]);
    setMaxTime(60);
    setMaxBudget(200);
  };

  const activeRemixData =
    cookingRecipe && remixMode !== "original"
      ? cookingRecipe.remixes[remixMode]
      : null;

  const activeSteps = cookingRecipe
    ? language === "TA" && cookingRecipe.tamilSteps
      ? cookingRecipe.tamilSteps
      : cookingRecipe.steps
    : [];

  return (
    <div className={`app-shell ${darkMode ? "dark" : "light"}`}>
      <Header
        recipes={recipes}
        totalCount={recipes.length}
        savedCount={favourites.length}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
      />

      <main className="main-content">
        {/* Fridge Rescue, Max Cooking Time Slider & Max Budget Slider */}
        <SmartKitchenTools
          selectedPantry={selectedPantry}
          onTogglePantry={togglePantry}
          onClearPantry={() => setSelectedPantry([])}
          maxTime={maxTime}
          onTimeChange={setMaxTime}
          maxBudget={maxBudget}
          onBudgetChange={setMaxBudget}
          language={language}
          onToggleLanguage={setLanguage}
        />

        {/* Week 2 Interactive Search, Category & Favourites Toolbar */}
        <section className="toolbar" aria-label="Search and filter recipes">
          <div className="search-row">
            <div className="search-wrap">
              <span className="search-glyph">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search recipes by name or ingredient..."
                className="search-field"
                aria-label="Search recipes"
              />
              {search && (
                <button
                  type="button"
                  className="clear-btn"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dedicated Week 2 'Show Favourites Only' Toggle */}
            <button
              type="button"
              className={`fav-toggle-btn ${showFavouritesOnly ? "active" : ""}`}
              onClick={() => setShowFavouritesOnly(!showFavouritesOnly)}
              aria-pressed={showFavouritesOnly}
            >
              {showFavouritesOnly ? "❤️ Showing Favourites" : "🤍 Show Favourites Only"} (
              {favourites.length})
            </button>
          </div>

          <div className="filters-wrap">
            {/* Required Week 2 Category Buttons: All, Breakfast, Lunch, Dinner, Dessert */}
            <div className="pill-group" role="group" aria-label="Meal categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`cat-pill ${category === cat ? "active" : ""}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Veg / Non-Veg Dietary Filter */}
            <div className="pill-group" role="group" aria-label="Dietary preference">
              <button
                type="button"
                className={`filter-pill ${dietFilter === "ALL" ? "active" : ""}`}
                onClick={() => setDietFilter("ALL")}
              >
                All Diets ({visibleRecipes.length})
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
            </div>
          </div>

          {/* Live Grocery List Bar (Appears when items are added) */}
          {shoppingList.length > 0 && (
            <div className="grocery-bar">
              <div className="grocery-bar-top">
                <span className="panel-title">
                  🛒 Grocery List ({shoppingList.length} items)
                </span>
                <button
                  type="button"
                  className="clear-pantry-btn"
                  onClick={() => setShoppingList([])}
                >
                  Clear List
                </button>
              </div>
              <div className="grocery-tags">
                {shoppingList.map((item) => (
                  <span key={item} className="grocery-tag">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Responsive Recipe Grid or Friendly 'No recipes found' State */}
        {visibleRecipes.length > 0 ? (
          <section className="recipe-grid" aria-label="Recipe collection">
            {visibleRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                matchScore={recipe.matchScore}
                language={language}
                isSaved={favourites.includes(recipe.id)}
                onToggleSave={toggleFavourite}
                onOpenCookMode={openCookMode}
              />
            ))}
          </section>
        ) : (
          <div className="empty-box" role="status">
            <span className="empty-emoji">🍽️</span>
            <h3 className="empty-title">No recipes found</h3>
            <p className="empty-desc">
              No dishes match your current search, category, favourites, or{" "}
              {maxTime}-minute limit.
            </p>
            <button
              type="button"
              className="reset-btn"
              onClick={resetAllFilters}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      {/* Guided Cooking Mode Modal */}
      {cookingRecipe && (
        <div className="kitchen-backdrop" onClick={closeCookMode}>
          <div className="kitchen-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="close-modal-btn"
              onClick={closeCookMode}
              aria-label="Close cooking guide"
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
                <span className="time-tag">
                  🔥{" "}
                  {activeRemixData
                    ? activeRemixData.calories
                    : cookingRecipe.calories}
                </span>
                <span className="time-tag">
                  💰 ~₹{cookingRecipe.costInr * servings} ({servings}x)
                </span>
              </div>

              <div className="modal-title-row">
                <h2 className="kitchen-title">
                  {language === "TA" && cookingRecipe.tamilName
                    ? cookingRecipe.tamilName
                    : cookingRecipe.name}
                </h2>

                {/* Serving Size Scaler */}
                <div className="servings-scaler" aria-label="Servings multiplier">
                  {[1, 2, 4].map((mult) => (
                    <button
                      key={mult}
                      type="button"
                      className={`serving-btn ${servings === mult ? "active" : ""}`}
                      onClick={() => setServings(mult)}
                    >
                      {mult}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipe Remix Mode */}
              <div className="remix-box">
                <span className="remix-label">🎛️ Recipe Remix Mode</span>
                <div className="remix-pills">
                  <button
                    type="button"
                    className={`remix-pill ${
                      remixMode === "original" ? "active" : ""
                    }`}
                    onClick={() => handleSelectRemix("original", cookingRecipe)}
                  >
                    Classic
                  </button>
                  <button
                    type="button"
                    className={`remix-pill ${
                      remixMode === "healthy" ? "active" : ""
                    }`}
                    onClick={() => handleSelectRemix("healthy", cookingRecipe)}
                  >
                    🥗 Healthy
                  </button>
                  <button
                    type="button"
                    className={`remix-pill ${
                      remixMode === "protein" ? "active" : ""
                    }`}
                    onClick={() => handleSelectRemix("protein", cookingRecipe)}
                  >
                    💪 High-Protein
                  </button>
                  <button
                    type="button"
                    className={`remix-pill ${
                      remixMode === "quick" ? "active" : ""
                    }`}
                    onClick={() => handleSelectRemix("quick", cookingRecipe)}
                  >
                    ⚡ Quick Version
                  </button>
                </div>

                {activeRemixData && (
                  <div className="remix-note">
                    <strong>{activeRemixData.label}:</strong>{" "}
                    {activeRemixData.swapNote}
                  </div>
                )}
              </div>

              {/* Kitchen Countdown Timer */}
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
                      const baseMins = activeRemixData
                        ? activeRemixData.time
                        : cookingRecipe.time;
                      setSecondsLeft(baseMins * 60);
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="prep-header-row">
                <p className="prep-hint">Tap ingredients as you prep them:</p>
                <button
                  type="button"
                  className="clear-pantry-btn"
                  onClick={() => addAllToShoppingList(cookingRecipe.ingredients)}
                >
                  + Add to Grocery List
                </button>
              </div>

              <IngredientList
                ingredients={cookingRecipe.ingredients}
                showAll={true}
                checkedItems={checkedIngredients}
                onToggleItem={toggleIngredientCheck}
              />

              <div className="steps-section">
                <div className="steps-header-row">
                  <h3 className="steps-heading">
                    {language === "TA" ? "செய்முறை படிகள்" : "Preparation Steps"}
                  </h3>
                  <span className="cal-text">
                    {completedSteps.length}/{activeSteps.length} Done
                  </span>
                </div>

                <ol className="steps-list">
                  {activeSteps.map((step, idx) => {
                    const isDone = completedSteps.includes(idx);
                    return (
                      <li
                        key={idx}
                        onClick={() => toggleStepDone(idx)}
                        style={{
                          cursor: "pointer",
                          opacity: isDone ? 0.55 : 1,
                          textDecoration: isDone ? "line-through" : "none"
                        }}
                        className={`step-item ${isDone ? "speaking-step" : ""}`}
                      >
                        <span className="step-num">
                          {isDone ? "✓" : idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    );
                  })}
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
