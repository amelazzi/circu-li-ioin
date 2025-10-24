import type { Recipe, Step } from "../../../interfaces";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";

export function useRecipes() {
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>("recipes", []);

  const addRecipe = (recipe: Recipe) => setRecipes((prev) => [...prev, recipe]);

  const addStepToRecipe = (recipeId: number, step: Step) => {
    setRecipes((prev) =>
      prev.map((r) => {
        if (r.id === recipeId) {
          const nextOrder = r.steps.length + 1;
          return { ...r, steps: [...r.steps, { ...step, order: nextOrder }] };
        }
        return r;
      })
    );
  };

  const removeStep = (recipeId: number, stepId: number) => {
    setRecipes((prev) =>
      prev.map((recipe) =>
        recipe.id === recipeId
          ? {
              ...recipe,
              steps: recipe.steps.filter((step) => step.id !== stepId),
            }
          : recipe
      )
    );
  };

  const reorderSteps = (recipeId: number, newSteps: Step[]) => {
    setRecipes((prev) =>
      prev.map((r) => {
        if (r.id === recipeId) {
          const updatedSteps = newSteps.map((step, index) => ({
            ...step,
            order: index + 1,
          }));
          return { ...r, steps: updatedSteps };
        }
        return r;
      })
    );
  };

  return { recipes, addRecipe, addStepToRecipe, removeStep, reorderSteps };
}
