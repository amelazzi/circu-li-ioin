import type { Coordinates } from "../../../interfaces/coordinates";

type CoordInputsProps = {
  coords: Coordinates | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CoordInputs = ({ coords, onChange }: CoordInputsProps) => (
  <div className="h-inputs">
    <input
      type="number"
      placeholder="x coord"
      name="x"
      value={coords?.x}
      onChange={onChange}
    />
    <input
      type="number"
      placeholder="y coord"
      name="y"
      value={coords?.y}
      onChange={onChange}
    />
  </div>
);
