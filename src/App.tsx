import { AlertProvider } from "./modules/alert/AlertContext";
import { AlertList } from "./modules/alert/components/AlertList";
import { RecipesProvider } from "./modules/recipe/RecipesContext";
import { HomePage } from "./pages/HomePage";
import { Header } from "./shared/components/Header";
import { useTheme } from "./shared/hooks/useTheme";

export const App = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <RecipesProvider>
      <AlertProvider>
        <div className="app-container">
          <Header isDark={isDark} toggleTheme={toggleTheme} />
          <div className="page-container ">
            <HomePage />
            <AlertList />
          </div>
        </div>
      </AlertProvider>
    </RecipesProvider>
  );
};
