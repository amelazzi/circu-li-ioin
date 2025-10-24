import { RecipesProvider } from "./modules/recipe/context/RecipesContext";
import { HomePage } from "./pages/HomePage";

export const App = () => {
  return (
    <RecipesProvider>
      <HomePage />
    </RecipesProvider>
  );
};
