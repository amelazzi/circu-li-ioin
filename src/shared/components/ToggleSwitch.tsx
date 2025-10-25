import "./ToggleSwitch.css";

export type ToggleSwitchProps = {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const ToggleSwitch = ({
  label,
  checked,
  onChange,
}: ToggleSwitchProps) => {
  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label>{label}</label>
    </div>
  );
};
