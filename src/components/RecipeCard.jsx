import { useState } from "react";
import IngredientList from "./IngredientList";

function RecipeCard({
  recipe,
  matchScore,
  language,
  isSaved,
  onToggleSave,
  onOpenCookMode
}) {
  const {
    id,
    name,
    tamilName,
    category,
    time,
    image,
    ingredients,
    veg,
    calories,
    costInr,
    macros,
    steps,
    tamilSteps
  } = recipe;

  const [isFlipped, setIsFlipped] = useState(false);

  const displayTitle = language === "TA" && tamilName ? tamilName : name;
  const previewStep =
    language === "TA" && tamilSteps?.[0] ? tamilSteps[0] : steps?.[0];

  return (
    <div className="flip-scene">
      <article className={`flip-card ${isFlipped ? "is-flipped" : ""}`}>
        {/* FRONT FACE */}
        <div
          className="flip-face flip-front"
          onClick={() => onOpenCookMode(recipe)}
        >
          <div className="card-media">
            <img src={image} alt={name} className="card-img" loading="lazy" />

            <div className="media-top">
              <div className="left-badges">
                <span className="cat-badge">{category}</span>
                {matchScore > 0 && (
                  <span className="match-badge">✨ {matchScore}% Match</span>
                )}
              </div>

              <div className="card-actions-top">
                <button
                  type="button"
                  className="flip-trigger-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFlipped(true);
                  }}
                >
                  ↻ Flip
                </button>

                <button
                  type="button"
                  className={`save-btn ${isSaved ? "saved" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(id);
                  }}
                  aria-label={isSaved ? "Remove from saved" : "Save recipe"}
                >
                  {isSaved ? "❤️" : "🤍"}
                </button>
              </div>
            </div>

            <div className="media-bottom">
              <span className={`diet-tag ${veg ? "veg" : "nonveg"}`}>
                <span className="diet-box">
                  <span className="diet-dot"></span>
                </span>
                {veg ? "Veg" : "Non-veg"}
              </span>

              <div className="right-meta-pills">
                <span className="cost-tag">~₹{costInr}</span>
                <span className="time-tag">⏱ {time}m</span>
              </div>
            </div>
          </div>

          <div className="card-body">
            <div className="card-subrow">
              <span className="cal-text">
                🔥 {calories} • P: {macros.protein}
              </span>
              <span className="cook-link">Cook & Remix →</span>
            </div>

            <h2 className="card-title">{displayTitle}</h2>

            <IngredientList ingredients={ingredients} />
          </div>
        </div>

        {/* BACK FACE (Nutrition Macros + First Step) */}
        <div className="flip-face flip-back">
          <div className="back-header">
            <span className="cat-badge">{category}</span>
            <button
              type="button"
              className="flip-trigger-btn"
              onClick={() => setIsFlipped(false)}
            >
              ↺ Front
            </button>
          </div>

          <h3 className="back-title">{displayTitle}</h3>

          <div className="back-stats-grid">
            <div className="back-stat">
              <span className="stat-num">{macros.protein}</span>
              <span className="stat-lbl">Protein</span>
            </div>
            <div className="back-stat">
              <span className="stat-num">{macros.carbs}</span>
              <span className="stat-lbl">Carbs</span>
            </div>
            <div className="back-stat">
              <span className="stat-num">{macros.fat}</span>
              <span className="stat-lbl">Fat</span>
            </div>
          </div>

          <div className="back-preview">
            <p className="back-preview-label">
              {language === "TA" ? "செய்முறை சுருக்கம்" : "Step 1 Preview"}
            </p>
            <p className="back-preview-text">{previewStep}</p>
          </div>

          <button
            type="button"
            className="back-cook-btn"
            onClick={() => onOpenCookMode(recipe)}
          >
            Open Kitchen & Remix →
          </button>
        </div>
      </article>
    </div>
  );
}

export default RecipeCard;
