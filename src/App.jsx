import { useState } from "react";
import Header from "./components/Header";
import RecipeCard from "./components/RecipeCard";
import { recipes } from "./data/recipes";
import "./App.css";

function App() {
  const [dietFilter, setDietFilter] = useState("ALL");

  const filteredRecipes = recipes.filter((recipe) => {
    if (dietFilter === "VEG") return recipe.veg === true;
    if (dietFilter === "NONVEG") return recipe.veg === false;
    return true;
  });

  return (
    <div className="app-wrapper">
      <Header totalCount={recipes.length} showingCount={filteredRecipes.length} />

      <main className="content-area">
        <div className="filter-bar" role="group" aria-label="Filter recipes by diet">
          <button
            type="button"
            className={`filter-btn ${dietFilter === "ALL" ? "active" : ""}`}
            onClick={() => setDietFilter("ALL")}
          >
            All Recipes ({recipes.length})
          </button>
          <button
            type="button"
            className={`filter-btn ${dietFilter === "VEG" ? "active-veg" : ""}`}
            onClick={() => setDietFilter("VEG")}
          >
            🟢 Pure Veg ({recipes.filter((r) => r.veg).length})
          </button>
          <button
            type="button"
            className={`filter-btn ${dietFilter === "NONVEG" ? "active-nonveg" : ""}`}
            onClick={() => setDietFilter("NONVEG")}
          >
            🔴 Non-Veg ({recipes.filter((r) => !r.veg).length})
          </button>
        </div>

        <section className="recipes-grid" aria-label="Recipe Cards">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </section>
      </main>

      <footer className="footer">
        <p>RecipeBox • Built with React & Vite by Madhu Mitha</p>
      </footer>
    </div>
  );
}

export default App;
