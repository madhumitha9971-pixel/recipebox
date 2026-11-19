function IngredientList({ ingredients }) {
  const MAX_ITEMS = 4;
  const displayed = ingredients.slice(0, MAX_ITEMS);
  const extraCount = ingredients.length - MAX_ITEMS;

  return (
    <div className="ingredient-box">
      <p className="ingredient-label">Ingredients</p>
      <ul className="ingredient-ul">
        {displayed.map((item, index) => (
          <li key={`${item}-${index}`} className="ingredient-li">
            <span className="check-icon" aria-hidden="true">•</span>
            <span>{item}</span>
          </li>
        ))}
        {extraCount > 0 && (
          <li className="ingredient-more">
            +{extraCount} more...
          </li>
        )}
      </ul>
    </div>
  );
}

export default IngredientList;
