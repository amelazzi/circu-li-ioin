import { useState } from "react";
import {
  StepType,
  TakeImageType,
  UnscrewingType,
} from "../../../constants/enums";
import type { Step } from "../../../interfaces";
import { Modal } from "../../../shared/components/modal/Modal";
import type { Coordinates } from "../../../interfaces/coordinates";
import { CoordInputs } from "../../step/components/CoordsInput";
import { useRecipesContext } from "../../recipe/context/RecipesContext";
import { validateCoords } from "../../step/utils/validation";

type StepModalProps = {
  isOpen: boolean;
  recipeId: number;
  onClose: () => void;
};

export const StepModal = ({ isOpen, recipeId, onClose }: StepModalProps) => {
  const { addStepToRecipe } = useRecipesContext();
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

  const handleSave = () => {
    let newStep: Step | null = null;

    if (!validateCoords(coords)) {
      alert("Coordinates cannot be negative");
      return;
    }

    if (selectedStepType === StepType.TakeImage) {
      newStep = {
        id: Date.now(),
        order: 0,
        type: StepType.TakeImage,
        pointCloud: false,
        coords: coords,
        takeImageType: selectedImageType || TakeImageType.FullImage,
      };
    }
    if (selectedStepType === StepType.Unscrewing) {
      newStep = {
        id: Date.now(),
        order: 0,
        type: StepType.Unscrewing,
        coords: coords,
        unscrewingType: selectedUnscrewingType || UnscrewingType.Automatic,
      };
    }

    if (newStep) addStepToRecipe(recipeId, newStep);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal title="Add a new step" onClose={onClose} onSave={handleSave}>
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
