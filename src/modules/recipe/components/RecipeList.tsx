import { RecipeItem } from "./RecipeItem";
import { useRecipesContext } from "../context/RecipesContext";
import "./RecipeList.css";

export const RecipeList = () => {
  const { recipes } = useRecipesContext();
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeItem key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};
