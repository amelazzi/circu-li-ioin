import { useState } from "react";
import { RecipeList } from "../modules/recipe/components/RecipeList";
import "./HomePage.css";
import { RecipeModal } from "../modules/recipe/components/RecipeModal";
import { useRecipesContext } from "../modules/recipe/context/RecipesContext";

export const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const { addRecipe } = useRecipesContext();

  return (
    <div className="section">
      <h1> Recipe List </h1>
      <div className="recipes-container">
        <RecipeList />
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
