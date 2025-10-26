import "./ToggleSwitch.css";

export type TogglePosition = "left" | "right";

export type ToggleSwitchProps = {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  position?: TogglePosition;
};

export const ToggleSwitch = ({
  label,
  checked,
  onChange,
  position = "right",
}: ToggleSwitchProps) => {
  return (
    <div className="toggle-container">
      {position === "right" && <label>{label}</label>}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      {position === "left" && <label>{label}</label>}
    </div>
  );
};
