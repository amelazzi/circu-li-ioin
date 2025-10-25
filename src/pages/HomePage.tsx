import { useState } from "react";
import { RecipeList } from "../modules/recipe/components/RecipeList";
import "./HomePage.css";
import { RecipeModal } from "../modules/recipe/components/RecipeModal";
import { useRecipesContext } from "../modules/recipe/RecipesContext";
import { useTranslation } from "react-i18next";

export const HomePage = () => {
  const [openModal, setOpenModal] = useState(false);
  const { addRecipe } = useRecipesContext();
  const { t } = useTranslation();

  return (
    <div className="section">
      <h1> {t("home.recipeList.title")} </h1>
      <div className="recipes-container">
        <RecipeList />
        <button className="primary-button" onClick={() => setOpenModal(true)}>
          {t("home.recipeList.addRecipe")}
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
