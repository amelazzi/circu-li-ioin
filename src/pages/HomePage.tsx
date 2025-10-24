import { RecipeList } from "../modules/recipe/components/RecipeList";
import "./HomePage.css";

export const HomePage = () => {
  return (
    <div className="section">
      <h1> Recipe List </h1>
      <div className="recipes-container">
        <RecipeList />
        <button className="primary-button"> Add Recipe</button>
      </div>
    </div>
  );
};
