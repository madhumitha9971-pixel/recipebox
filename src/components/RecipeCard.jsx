import { useState } from "react";
import IngredientList from "./IngredientList";

function RecipeCard({ recipe, isSaved, onToggleSave, onOpenCookMode }) {
  const { id, name, category, time, image, ingredients, veg, calories } = recipe;
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const updateTilt = (clientX, clientY, target) => {
    const rect = target.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const ry = ((x - rect.width / 2) / (rect.width / 2)) * 9;
    const rx = ((rect.height / 2 - y) / (rect.height / 2)) * 9;

    setTilt({
      rx: rx.toFixed(1),
      ry: ry.toFixed(1),
      gx: ((x / rect.width) * 100).toFixed(0),
      gy: ((y / rect.height) * 100).toFixed(0)
    });
  };

  const resetTilt = () => setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });

  return (
    <div className="card-stage">
      <article
        className="recipe-card"
        onPointerMove={(e) => updateTilt(e.clientX, e.clientY, e.currentTarget)}
        onPointerLeave={resetTilt}
        onTouchMove={(e) => {
          if (e.touches[0]) {
            updateTilt(
              e.touches[0].clientX,
              e.touches[0].clientY,
              e.currentTarget
            );
          }
        }}
        onTouchEnd={resetTilt}
        onClick={() => onOpenCookMode(recipe)}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
        }}
      >
        <div
          className="card-sheen"
          style={{
            background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.22), transparent 60%)`
          }}
        />

        <div className="card-media">
          <img src={image} alt={name} className="card-img" loading="lazy" />

          <div className="media-top">
            <span className="cat-badge">{category}</span>

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

          <div className="media-bottom">
            <span className={`diet-tag ${veg ? "veg" : "nonveg"}`}>
              <span className="diet-box">
                <span className="diet-dot"></span>
              </span>
              {veg ? "Veg" : "Non-veg"}
            </span>

            <span className="time-tag">⏱ {time} mins</span>
          </div>
        </div>

        <div className="card-body">
          <div className="card-subrow">
            <span className="cal-text">🔥 {calories}</span>
            <span className="cook-link">Cook This →</span>
          </div>

          <h2 className="card-title">{name}</h2>

          <IngredientList ingredients={ingredients} />
        </div>
      </article>
    </div>
  );
}

export default RecipeCard;
