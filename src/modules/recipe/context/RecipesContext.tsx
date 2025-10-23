import { createContext, useContext } from "react";
import type { Recipe, Step } from "../../../interfaces";
import { useRecipes } from "../hooks/useRecipes";

type RecipesContextType = {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  addStepToRecipe: (recipeId: number, step: Step) => void;
};

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const RecipesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { recipes, addRecipe, addStepToRecipe } = useRecipes();
  return (
    <RecipesContext.Provider value={{ recipes, addRecipe, addStepToRecipe }}>
      {children}
    </RecipesContext.Provider>
  );
};

export function useRecipesContext() {
  const context = useContext(RecipesContext);
  if (!context)
    throw new Error("useRecipesContext must be used inside RecipesProvider");
  return context;
}
