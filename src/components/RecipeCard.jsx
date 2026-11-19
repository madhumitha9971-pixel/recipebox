import { useState } from "react";
import IngredientList from "./IngredientList";

function RecipeCard({ recipe, onSelect }) {
  const { name, category, time, image, ingredients, veg, calories, difficulty } =
    recipe;

  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 10;
    const rotateX = ((centerY - y) / centerY) * 10;

    setTilt({
      rotateX: rotateX.toFixed(2),
      rotateY: rotateY.toFixed(2),
      glareX: ((x / rect.width) * 100).toFixed(1),
      glareY: ((y / rect.height) * 100).toFixed(1)
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  return (
    <div className="card-perspective-shell">
      <article
        className="recipe-card-3d"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={() => onSelect && onSelect(recipe)}
        style={{
          transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`
        }}
      >
        {/* Dynamic 3D Specular Light Glare */}
        <div
          className="card-glare"
          style={{
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.28), transparent 60%)`
          }}
        />

        <div className="card-image-box">
          <img src={image} alt={name} className="card-img" loading="lazy" />

          <div className="card-top-badges">
            <span className="badge-category">{category}</span>
            <span className={`badge-diet ${veg ? "veg" : "nonveg"}`}>
              <span className="fssai-box">
                <span className="fssai-dot"></span>
              </span>
              {veg ? "Veg" : "Non-veg"}
            </span>
          </div>

          <div className="card-bottom-badges">
            <span className="badge-glass">⏱ {time}m</span>
            <span className="badge-glass">🔥 {calories}</span>
          </div>
        </div>

        <div className="card-body">
          <div className="card-meta-row">
            <span className="difficulty-tag">{difficulty}</span>
            <span className="inspect-hint">Tap for 3D view ↗</span>
          </div>

          <h2 className="card-title">{name}</h2>

          <IngredientList ingredients={ingredients} />
        </div>
      </article>
    </div>
  );
}

export default RecipeCard;
