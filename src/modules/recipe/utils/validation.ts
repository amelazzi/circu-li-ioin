import type { Recipe } from "../../../interfaces";
import { validateStep } from "../../step/utils/validation";

export function validateRecipe(recipe: Recipe): boolean {
  if (!recipe.name) return false;
  return recipe.steps.every(validateStep);
}
