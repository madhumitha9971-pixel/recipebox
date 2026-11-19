import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import SmartKitchenTools from "./components/SmartKitchenTools";
import RecipeCard from "./components/RecipeCard";
import IngredientList from "./components/IngredientList";
import { recipes } from "./data/recipes";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [language, setLanguage] = useState("EN");
  const [dietFilter, setDietFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPantry, setSelectedPantry] = useState([]);
  const [maxBudget, setMaxBudget] = useState(200);
  const [savedIds, setSavedIds] = useState([1, 2]);

  // Guided Kitchen Mode, Remix & Voice State
  const [cookingRecipe, setCookingRecipe] = useState(null);
  const [remixMode, setRemixMode] = useState("original");
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(null);
  const keepAliveRef = useRef(null);

  const categories = ["All", ...new Set(recipes.map((r) => r.category))];

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

  const stopSpeech = () => {
    if (keepAliveRef.current) {
      clearInterval(keepAliveRef.current);
      keepAliveRef.current = null;
    }
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setActiveStepIndex(null);
  };

  const togglePantry = (key) => {
    setSelectedPantry((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const openCookMode = (recipe) => {
    stopSpeech();
    setCookingRecipe(recipe);
    setRemixMode("original");
    setCheckedIngredients([]);
    setSecondsLeft(recipe.time * 60);
    setTimerRunning(false);
  };

  const closeCookMode = () => {
    setTimerRunning(false);
    setCookingRecipe(null);
    stopSpeech();
  };

  const handleSelectRemix = (mode, recipe) => {
    setRemixMode(mode);
    setTimerRunning(false);
    const activeTime =
      mode === "original" ? recipe.time : recipe.remixes[mode].time;
    setSecondsLeft(activeTime * 60);
  };

  // Speak a single step directly on tap (100% mobile browser compatible)
  const speakSingleStep = (stepText, index) => {
    if (!("speechSynthesis" in window)) {
      alert("Voice readout is not supported in this browser.");
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();

    const prefix =
      language === "TA" ? `படி ${index + 1}. ` : `Step ${index + 1}. `;
    const utterance = new SpeechSynthesisUtterance(prefix + stepText);
    utterance.lang = language === "TA" ? "ta-IN" : "en-US";
    utterance.rate = 0.95;
    utterance.volume = 1;

    setIsSpeaking(true);
    setActiveStepIndex(index);

    utterance.onend = () => {
      setIsSpeaking(false);
      setActiveStepIndex(null);
    };

    utterance.onerror = () => {
      // Fallback to en-US if ta-IN voice pack is not installed on device
      if (utterance.lang === "ta-IN") {
        const fallback = new SpeechSynthesisUtterance(
          `Step ${index + 1}. ${cookingRecipe.steps[index]}`
        );
        fallback.lang = "en-US";
        fallback.onend = () => {
          setIsSpeaking(false);
          setActiveStepIndex(null);
        };
        synth.speak(fallback);
      } else {
        setIsSpeaking(false);
        setActiveStepIndex(null);
      }
    };

    synth.speak(utterance);
  };

  // Read all steps queued immediately inside the click gesture
  const toggleVoiceGuide = (recipe) => {
    if (!("speechSynthesis" in window)) {
      alert("Voice readout is not supported in this browser.");
      return;
    }

    const synth = window.speechSynthesis;

    if (isSpeaking) {
      stopSpeech();
      return;
    }

    synth.cancel();

    const stepsToRead =
      language === "TA" && recipe.tamilSteps ? recipe.tamilSteps : recipe.steps;

    setIsSpeaking(true);
    setActiveStepIndex(0);

    // Queue all utterances synchronously inside the user tap so mobile Chrome allows all of them
    stepsToRead.forEach((step, idx) => {
      const prefix =
        language === "TA" ? `படி ${idx + 1}. ` : `Step ${idx + 1}. `;
      const utterance = new SpeechSynthesisUtterance(prefix + step);
      utterance.lang = language === "TA" ? "ta-IN" : "en-US";
      utterance.rate = 0.95;
      utterance.volume = 1;

      utterance.onstart = () => {
        setActiveStepIndex(idx);
      };

      if (idx === stepsToRead.length - 1) {
        utterance.onend = () => {
          stopSpeech();
        };
      }

      utterance.onerror = () => {
        if (idx === 0 && language === "TA") {
          synth.cancel();
          recipe.steps.forEach((enStep, enIdx) => {
            const fb = new SpeechSynthesisUtterance(
              `Step ${enIdx + 1}. ${enStep}`
            );
            fb.lang = "en-US";
            fb.onstart = () => setActiveStepIndex(enIdx);
            if (enIdx === recipe.steps.length - 1) {
              fb.onend = () => stopSpeech();
            }
            synth.speak(fb);
          });
        } else {
          stopSpeech();
        }
      };

      synth.speak(utterance);
    });

    // Prevent Android Chrome from pausing speech after 15 seconds
    keepAliveRef.current = setInterval(() => {
      if (synth.speaking && !synth.paused) {
        synth.pause();
        synth.resume();
      }
    }, 10000);
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

  const processedRecipes = recipes
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
      const matchesDiet =
        dietFilter === "ALL" ||
        (dietFilter === "VEG" && recipe.veg) ||
        (dietFilter === "NONVEG" && !recipe.veg) ||
        (dietFilter === "SAVED" && savedIds.includes(recipe.id));

      const matchesCategory =
        categoryFilter === "All" || recipe.category === categoryFilter;

      const matchesBudget = recipe.costInr <= maxBudget;

      const matchesPantry =
        selectedPantry.length === 0 || recipe.matchScore > 0;

      const matchesSearch =
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (recipe.tamilName && recipe.tamilName.includes(searchQuery)) ||
        recipe.ingredients.some((ing) =>
          ing.toLowerCase().includes(searchQuery.toLowerCase())
        );

      return (
        matchesDiet &&
        matchesCategory &&
        matchesBudget &&
        matchesPantry &&
        matchesSearch
      );
    })
    .sort((a, b) => b.matchScore - a.matchScore);

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
        savedCount={savedIds.length}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
      />

      <main className="main-content">
        <SmartKitchenTools
          selectedPantry={selectedPantry}
          onTogglePantry={togglePantry}
          onClearPantry={() => setSelectedPantry([])}
          maxBudget={maxBudget}
          onBudgetChange={setMaxBudget}
          language={language}
          onToggleLanguage={setLanguage}
        />

        <section className="toolbar" aria-label="Search and filter recipes">
          <div className="search-wrap">
            <span className="search-glyph">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, Tamil names, or ingredients..."
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
                All ({processedRecipes.length})
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

        {processedRecipes.length > 0 ? (
          <section className="recipe-grid" aria-label="Recipe collection">
            {processedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                matchScore={recipe.matchScore}
                language={language}
                isSaved={savedIds.includes(recipe.id)}
                onToggleSave={toggleSave}
                onOpenCookMode={openCookMode}
              />
            ))}
          </section>
        ) : (
          <div className="empty-box">
            <p>
              No dishes match your current fridge items or ₹{maxBudget} budget.
            </p>
            <button
              type="button"
              className="reset-btn"
              onClick={() => {
                setSearchQuery("");
                setDietFilter("ALL");
                setCategoryFilter("All");
                setSelectedPantry([]);
                setMaxBudget(200);
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      {cookingRecipe && (
        <div className="kitchen-backdrop" onClick={closeCookMode}>
          <div className="kitchen-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="close-modal-btn"
              onClick={closeCookMode}
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
                  💰 ~₹{cookingRecipe.costInr}/serving
                </span>
              </div>

              <h2 className="kitchen-title">
                {language === "TA" && cookingRecipe.tamilName
                  ? cookingRecipe.tamilName
                  : cookingRecipe.name}
              </h2>

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

              <p className="prep-hint">Tap ingredients below as you prep them:</p>
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
                  <button
                    type="button"
                    className={`voice-btn ${isSpeaking ? "speaking" : ""}`}
                    onClick={() => toggleVoiceGuide(cookingRecipe)}
                  >
                    {isSpeaking ? "⏹ Stop Voice" : "🔊 Read All Steps"}
                  </button>
                </div>

                <ol className="steps-list">
                  {activeSteps.map((step, idx) => (
                    <li
                      key={idx}
                      onClick={() => speakSingleStep(step, idx)}
                      style={{ cursor: "pointer" }}
                      className={`step-item ${
                        activeStepIndex === idx ? "speaking-step" : ""
                      }`}
                    >
                      <span className="step-num">{idx + 1}</span>
                      <span style={{ flex: 1 }}>{step}</span>
                      <span style={{ fontSize: "0.85rem", opacity: 0.75 }}>
                        🔊
                      </span>
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
