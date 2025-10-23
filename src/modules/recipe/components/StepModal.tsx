import { useState } from "react";
import {
  StepType,
  TakeImageType,
  UnscrewingType,
} from "../../../constants/enums";
import { Modal } from "../../../shared/components/modal/Modal";
import type { Coordinates } from "../../../interfaces/coordinates";
import { CoordInputs } from "../../step/components/CoordsInput";

type StepModalProps = {
  isOpen: boolean;
  recipeId: number;
  onClose: () => void;
};

export const StepModal = ({ isOpen, recipeId, onClose }: StepModalProps) => {
  const [selectedStepType, setSelectedStepType] = useState<StepType | "">("");
  const [selectedImageType, setSelectedImageType] = useState<
    TakeImageType | ""
  >("");
  const [selectedUnscrewingType, setSelectedUnscrewingType] = useState<
    UnscrewingType | ""
  >("");
  const [coords, setCoords] = useState<Coordinates>({ x: 0, y: 0 });

  const handleStepType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStepType(e.target.value as StepType);
  };

  const handleImageType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedImageType(e.target.value as TakeImageType);
  };

  const handleUnscrewingType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUnscrewingType(e.target.value as UnscrewingType);
  };

  const handleCoordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCoords((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <Modal
      title="Add a new step"
      onClose={onClose}
      onSave={() => console.log("onSave")}
    >
      <select
        className="select-input"
        name="step-types"
        onChange={handleStepType}
      >
        <option value="">Select a step type</option>
        <option value={StepType.TakeImage}>Take Image</option>
        <option value={StepType.Unscrewing}>Unscrewing</option>
      </select>
      {selectedStepType === StepType.TakeImage && (
        <>
          <select
            className="select-input"
            name="image-types"
            onChange={handleImageType}
          >
            <option value="">Select image type</option>
            <option value={TakeImageType.FullImage}>Full Image</option>
            <option value={TakeImageType.SectionImage}>Section Image</option>
          </select>
          {selectedImageType === TakeImageType.SectionImage && (
            <CoordInputs coords={coords} onChange={handleCoordChange} />
          )}
        </>
      )}
      {selectedStepType === StepType.Unscrewing && (
        <>
          <select
            className="select-input"
            name="unscrewing-types"
            onChange={handleUnscrewingType}
          >
            <option value="">Select unscrewing type</option>
            <option value={UnscrewingType.Automatic}>Automatic</option>
            <option value={UnscrewingType.Specific}>Specific</option>
          </select>
          {selectedUnscrewingType === UnscrewingType.Specific && (
            <CoordInputs coords={coords} onChange={handleCoordChange} />
          )}
        </>
      )}
    </Modal>
  );
};
