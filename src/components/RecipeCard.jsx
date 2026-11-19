import IngredientList from "./IngredientList";

function RecipeCard({ recipe }) {
  const { name, category, time, image, ingredients, veg } = recipe;

  return (
    <article className="recipe-card">
      <div className="card-media">
        <img
          src={image}
          alt={name}
          className="card-img"
          loading="lazy"
        />
        <div className="card-overlay-top">
          <span className="category-pill">{category}</span>
          <span className={`diet-pill ${veg ? "is-veg" : "is-nonveg"}`}>
            <span className="diet-square">
              <span className="diet-circle"></span>
            </span>
            {veg ? "Veg" : "Non-veg"}
          </span>
        </div>
        <div className="time-pill">
          ⏱ {time} mins
        </div>
      </div>

      <div className="card-body">
        <h2 className="card-heading">{name}</h2>
        <IngredientList ingredients={ingredients} />
      </div>
    </article>
  );
}

export default RecipeCard;
