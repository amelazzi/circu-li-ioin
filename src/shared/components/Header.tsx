import { ToggleSwitch } from "./ToggleSwitch";
import "./header.css";

export const Header = () => {
  return (
    <div className="header-container">
      <div>
        <h1> Circu Li-ion assesment </h1>
      </div>
      <div>
        <ToggleSwitch
          label="Dark mode"
          checked={false}
          onChange={() => console.log("checked")}
        />
      </div>
    </div>
  );
};
