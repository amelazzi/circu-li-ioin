import { RecipeItem } from "./RecipeItem";
import type { Recipe } from "../../../interfaces";
import "./RecipeList.css";

export const RecipeList = ({ recipes }: { recipes: Recipe[] }) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};
