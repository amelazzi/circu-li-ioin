import { RecipesProvider } from "./modules/recipe/context/RecipesContext";
import { HomePage } from "./pages/HomePage";
import { Header } from "./shared/components/Header";
import { useTheme } from "./shared/hooks/useTheme";

export const App = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <RecipesProvider>
      <div className="app-container">
        <Header isDark={isDark} toggleTheme={toggleTheme} />
        <div className="page-container ">
          <HomePage />
        </div>
      </div>
    </RecipesProvider>
  );
};
