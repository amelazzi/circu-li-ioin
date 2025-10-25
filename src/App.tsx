import { RecipesProvider } from "./modules/recipe/context/RecipesContext";
import { HomePage } from "./pages/HomePage";
import { Header } from "./shared/components/Header";

export const App = () => {
  return (
    <RecipesProvider>
      <div className="app-container">
        <Header />
        <div className="page-container ">
          <HomePage />
        </div>
      </div>
    </RecipesProvider>
  );
};
