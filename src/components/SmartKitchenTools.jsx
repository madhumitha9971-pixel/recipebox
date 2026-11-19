const PANTRY_ITEMS = [
  { key: "rice", label: "🍚 Rice" },
  { key: "potato", label: "🥔 Potato" },
  { key: "tomato", label: "🍅 Tomato" },
  { key: "onion", label: "🧅 Onion" },
  { key: "paneer", label: "🧀 Paneer" },
  { key: "egg", label: "🥚 Egg" },
  { key: "chicken", label: "🍗 Chicken" },
  { key: "coconut", label: "🥥 Coconut" },
  { key: "chickpeas", label: "🫘 Chickpeas" },
  { key: "coffee", label: "☕ Coffee" }
];

function SmartKitchenTools({
  selectedPantry,
  onTogglePantry,
  onClearPantry,
  maxBudget,
  onBudgetChange,
  language,
  onToggleLanguage
}) {
  return (
    <section className="smart-studio" aria-label="Smart Kitchen Assistant">
      <div className="studio-top-row">
        <div>
          <span className="studio-badge">✨ Kitchen Assistant</span>
          <h2 className="studio-heading">
            Fridge Rescue & Budget Planner
          </h2>
        </div>

        {/* Regional Tamil / English Language Toggle */}
        <div className="lang-switch" role="group" aria-label="Recipe Language">
          <button
            type="button"
            className={`lang-btn ${language === "EN" ? "active" : ""}`}
            onClick={() => onToggleLanguage("EN")}
          >
            English
          </button>
          <button
            type="button"
            className={`lang-btn ${language === "TA" ? "active" : ""}`}
            onClick={() => onToggleLanguage("TA")}
          >
            தமிழ் (Tamil)
          </button>
        </div>
      </div>

      <div className="studio-grid">
        {/* Left: Fridge-to-Recipe Ingredient Picker */}
        <div className="studio-panel">
          <div className="panel-head">
            <span className="panel-title">
              🧊 What’s in your fridge? (Tap to match)
            </span>
            {selectedPantry.length > 0 && (
              <button
                type="button"
                className="clear-pantry-btn"
                onClick={onClearPantry}
              >
                Clear ({selectedPantry.length})
              </button>
            )}
          </div>

          <div className="pantry-chips">
            {PANTRY_ITEMS.map((item) => {
              const active = selectedPantry.includes(item.key);
              return (
                <button
                  key={item.key}
                  type="button"
                  className={`pantry-chip ${active ? "selected" : ""}`}
                  onClick={() => onTogglePantry(item.key)}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Smart Budget Chef Slider */}
        <div className="studio-panel budget-panel">
          <div className="panel-head">
            <span className="panel-title">💰 Max Budget per Serving</span>
            <span className="budget-readout">₹{maxBudget} (est.)</span>
          </div>

          <input
            type="range"
            min="45"
            max="200"
            step="5"
            value={maxBudget}
            onChange={(e) => onBudgetChange(Number(e.target.value))}
            className="budget-slider"
            aria-label="Maximum budget per serving in rupees"
          />

          <div className="budget-scale">
            <span>₹45 Street/Home</span>
            <span>₹100 Balanced</span>
            <span>₹200 Feast</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SmartKitchenTools;
