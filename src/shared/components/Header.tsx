import { useTranslation } from "react-i18next";
import { ToggleSwitch } from "./ToggleSwitch";
import "./header.css";

type HeaderProps = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const Header = ({ isDark, toggleTheme }: HeaderProps) => {
  const { t } = useTranslation();
  return (
    <div className="header-container">
      <div>
        <h1> {t("appTitle")} </h1>
      </div>
      <div>
        <ToggleSwitch
          label="Dark mode"
          checked={isDark}
          onChange={toggleTheme}
        />
      </div>
    </div>
  );
};
