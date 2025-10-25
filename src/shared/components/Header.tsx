import { useState } from "react";
import { ToggleSwitch } from "./ToggleSwitch";
import "./header.css";

export const Header = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleTheme = (checked: boolean) => {
    setIsChecked(checked);
    const newTheme = checked ? "dark" : "light";
    document.documentElement.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="header-container">
      <div>
        <h1> Circu Li-ion assesment </h1>
      </div>
      <div>
        <ToggleSwitch
          label="Dark mode"
          checked={isChecked}
          onChange={handleTheme}
        />
      </div>
    </div>
  );
};
