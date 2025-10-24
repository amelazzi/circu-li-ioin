import { RecipeItem } from "./RecipeItem";
import "./RecipeList.css";

export const RecipeList = () => {
  return (
    <div className="recipe-list">
      <RecipeItem />
      <RecipeItem />
    </div>
  );
};
