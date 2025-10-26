import { useTranslation } from "react-i18next";
import type { ActionResult, Recipe, Step } from "../../interfaces";
import { useLocalStorage } from "../../shared/hooks/useLocalStorage";

export function useRecipes() {
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>("recipes", []);
  const { t } = useTranslation();

  const addRecipe = (recipe: Recipe): ActionResult => {
    try {
      setRecipes((prev) => [...prev, recipe]);
      return { success: true, message: `${t("home.recipeModal.successSave")}` };
    } catch (err) {
      return { success: false, message: "Failed to add recipe" };
    }
  };

  const addStepToRecipe = (recipeId: number, step: Step): ActionResult => {
    try {
      setRecipes((prev) =>
        prev.map((r) => {
          if (r.id === recipeId) {
            const nextOrder = r.steps.length + 1;
            return { ...r, steps: [...r.steps, { ...step, order: nextOrder }] };
          }
          return r;
        })
      );
      return { success: true, message: "Step added successfully" };
    } catch (err) {
      return { success: false, message: "Failed to add step" };
    }
  };

  const removeStep = (recipeId: number, stepId: number): ActionResult => {
    try {
      setRecipes((prev) =>
        prev.map((recipe) =>
          recipe.id === recipeId
            ? { ...recipe, steps: recipe.steps.filter((s) => s.id !== stepId) }
            : recipe
        )
      );
      return { success: true, message: "Step removed successfully" };
    } catch (err) {
      return { success: false, message: "Failed to remove step" };
    }
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
