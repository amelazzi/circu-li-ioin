import { RecipeItem } from "./RecipeItem";
import type { Recipe } from "../../../interfaces";
import "./RecipeList.css";

type RecipeListProps = {
  recipes: Recipe[];
};

export const RecipeList = ({ recipes }: RecipeListProps) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};
