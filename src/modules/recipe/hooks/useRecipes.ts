import type { Recipe } from "../../../interfaces";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";

export function useRecipes() {
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>("recipes", []);

  const addRecipe = (recipe: Recipe) => setRecipes((prev) => [...prev, recipe]);

  return { recipes, addRecipe };
}
