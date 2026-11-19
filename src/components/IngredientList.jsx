function IngredientList({
  ingredients,
  showAll = false,
  checkedItems = [],
  onToggleItem
}) {
  const MAX_VISIBLE = 4;
  const visibleItems = showAll ? ingredients : ingredients.slice(0, MAX_VISIBLE);
  const remaining = ingredients.length - MAX_VISIBLE;

  return (
    <div className="ingredients-block">
      <div className="ingredients-top">
        <span className="ingredients-label">Ingredients</span>
        <span className="ingredients-total">{ingredients.length} items</span>
      </div>

      <ul className="ingredient-ul">
        {visibleItems.map((item, index) => {
          const isChecked = checkedItems.includes(item);
          return (
            <li
              key={`${item}-${index}`}
              className={`ingredient-li ${isChecked ? "is-checked" : ""} ${
                onToggleItem ? "is-clickable" : ""
              }`}
              onClick={
                onToggleItem
                  ? (e) => {
                      e.stopPropagation();
                      onToggleItem(item);
                    }
                  : undefined
              }
            >
              <span className="ingredient-marker" aria-hidden="true">
                {onToggleItem ? (isChecked ? "✓" : "○") : "•"}
              </span>
              <span>{item}</span>
            </li>
          );
        })}

        {!showAll && remaining > 0 && (
          <li className="ingredient-more">
            +{remaining} more...
          </li>
        )}
      </ul>
    </div>
  );
}

export default IngredientList;
