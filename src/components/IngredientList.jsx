function IngredientList({
  ingredients,
  showAll = false,
  checkedItems = [],
  onToggleItem
}) {
  const visibleIngredients = showAll ? ingredients : ingredients.slice(0, 3);
  const remainingCount = ingredients.length - 3;

  return (
    <div className="ingredients-block">
      <div className="ingredients-top">
        <span className="ingredients-label">Key Ingredients</span>
        <span className="ingredients-total">{ingredients.length} items</span>
      </div>

      <ul className="ingredient-ul">
        {visibleIngredients.map((item, index) => {
          const isChecked = checkedItems.includes(item);
          return (
            <li
              key={`${item}-${index}`}
              onClick={
                onToggleItem
                  ? (e) => {
                      e.stopPropagation();
                      onToggleItem(item);
                    }
                  : undefined
              }
              className={`ingredient-li ${onToggleItem ? "is-clickable" : ""} ${
                isChecked ? "is-checked" : ""
              }`}
            >
              <span className="ingredient-marker">
                {onToggleItem ? (isChecked ? "☑" : "☐") : "•"}
              </span>
              <span>{item}</span>
            </li>
          );
        })}

        {!showAll && remainingCount > 0 && (
          <li className="ingredient-more">+{remainingCount} more...</li>
        )}
      </ul>
    </div>
  );
}

export default IngredientList;
