import { RecipeItem } from "./RecipeItem";
import { useRecipesContext } from "../RecipesContext";
import "./RecipeList.css";
import type { Recipe } from "../../../interfaces";
import { validateRecipe } from "../validation";
import { useRef } from "react";

export const RecipeList = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { recipes, addRecipe } = useRecipesContext();

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
          alert("Imported recipe is invalid.");
          return;
        }

        if (recipeExists(recipe, recipes)) {
          alert("A recipe with same id already exists.");
          return;
        }

        addRecipe(recipe);
      } catch (err) {
        alert("Failed to parse JSON");
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
