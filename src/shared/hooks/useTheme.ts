import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark" | null>(
    "theme",
    null
  );

  useEffect(() => {
    if (!theme) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const systemTheme: "light" | "dark" = prefersDark ? "dark" : "light";
      setTheme(systemTheme);
    }
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (!prev) return "light";
      return prev === "light" ? "dark" : "light";
    });
  };

  return { theme: theme || "light", toggleTheme, isDark: theme === "dark" };
}
