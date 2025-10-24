import { useState } from "react";
import { RecipeList } from "../modules/recipe/components/RecipeList";
import "./HomePage.css";
import { RecipeModal } from "../modules/recipe/components/RecipeModal";
import { useRecipes } from "../modules/recipe/hooks/useRecipes";

export const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const { recipes, addRecipe } = useRecipes();

  return (
    <div className="section">
      <h1> Recipe List </h1>
      <div className="recipes-container">
        <RecipeList recipes={recipes} />
        <button className="primary-button" onClick={() => setOpenModal(true)}>
          Add Recipe
        </button>
      </div>
      <RecipeModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSave={addRecipe}
      />
    </div>
  );
};
