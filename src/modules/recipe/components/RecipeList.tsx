import { RecipeItem } from "./RecipeItem";
import { useRecipesContext } from "../RecipesContext";
import "./RecipeList.css";
import type { Recipe } from "../../../interfaces";
import { validateRecipe } from "../validation";
import { useRef } from "react";
import { useAlert } from "../../alert/useAlert";
import { AlertType } from "../../../constants/enums";
import { useTranslation } from "react-i18next";

export const RecipeList = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { recipes, addRecipe } = useRecipesContext();
  const { showAlert } = useAlert();
  const { t } = useTranslation();

  const recipeExists = (recipe: Recipe, recipes: Recipe[]) => {
    const duplicateId = recipes.some((r) => r.id === recipe.id && r !== recipe);
    if (duplicateId) return true;
    return false;
  };

  const importRecipe = (file: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const recipe: Recipe = JSON.parse(event.target?.result as string);

        if (!validateRecipe(recipe)) {
          showAlert(
            `${t("home.recipeList.invalidImportedRecipe")}`,
            AlertType.Error
          );
          return;
        }

        if (recipeExists(recipe, recipes)) {
          showAlert(`${t("home.recipeList.existingRecipe")}`, AlertType.Error);
          return;
        }

        addRecipe(recipe);
        showAlert(`${t("home.recipeList.importSuccess")}`, AlertType.Success);
      } catch (err) {
        showAlert(`${t("home.recipeList.parseJsonFailed")}`, AlertType.Error);
      }
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    importRecipe(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="recipe-list">
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};
