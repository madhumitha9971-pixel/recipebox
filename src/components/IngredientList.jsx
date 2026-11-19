function IngredientList({ ingredients, showAll = false }) {
  const MAX_VISIBLE = 4;
  const displayed = showAll ? ingredients : ingredients.slice(0, MAX_VISIBLE);
  const extraCount = ingredients.length - MAX_VISIBLE;

  return (
    <div className="ingredients-wrapper">
      <div className="ingredients-header">
        <span className="ingredients-title">Key Ingredients</span>
        <span className="ingredients-count">{ingredients.length} items</span>
      </div>

      <ul className="ingredient-ul">
        {displayed.map((item, index) => (
          <li key={`${item}-${index}`} className="ingredient-li">
            <span className="ingredient-dot" aria-hidden="true"></span>
            <span>{item}</span>
          </li>
        ))}

        {!showAll && extraCount > 0 && (
          <li className="ingredient-more">
            +{extraCount} more ingredient{extraCount > 1 ? "s" : ""}...
          </li>
        )}
      </ul>
    </div>
  );
}

export default IngredientList;
