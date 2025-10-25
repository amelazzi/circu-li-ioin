import { ToggleSwitch } from "./ToggleSwitch";
import "./header.css";

type HeaderProps = {
  isDark: boolean;
  toggleTheme: () => void;
};

export const Header = ({ isDark, toggleTheme }: HeaderProps) => {
  return (
    <div className="header-container">
      <div>
        <h1> Circu Li-ion assesment </h1>
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
