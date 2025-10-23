import type { Recipe, Step } from "../../../interfaces";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";

export function useRecipes() {
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>("recipes", []);

  const addRecipe = (recipe: Recipe) => setRecipes((prev) => [...prev, recipe]);

  const addStepToRecipe = (recipeId: number, step: Step) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === recipeId
          ? { ...recipe, steps: [...recipe.steps, step] }
          : recipe
      )
    );
  };

  return { recipes, addRecipe, addStepToRecipe };
}
