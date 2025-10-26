import { useState } from "react";
import {
  AlertType,
  StepType,
  TakeImageType,
  UnscrewingType,
} from "../../../constants/enums";
import type { Step } from "../../../interfaces";
import { Modal } from "../../../shared/components/Modal";
import type { Coordinates } from "../../../interfaces/coordinates";
import { CoordInputs } from "../../step/components/CoordsInput";
import { useRecipesContext } from "../../recipe/RecipesContext";
import { validateCoords } from "../../step/validation";
import { useTranslation } from "react-i18next";
import { useAlert } from "../../alert/useAlert";

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
  const [coords, setCoords] = useState<Coordinates>();
  const { t } = useTranslation();
  const { showAlert } = useAlert();

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
    setCoords((prev) => ({
      x: name === "x" ? Number(value) : prev?.x ?? 0,
      y: name === "y" ? Number(value) : prev?.y ?? 0,
    }));
  };

  const clearForm = () => {
    setSelectedStepType("");
    setSelectedImageType("");
    setSelectedUnscrewingType("");
    setCoords(undefined);
  };

  const handleSave = () => {
    let newStep: Step | null = null;

    if (coords && !validateCoords(coords)) {
      showAlert(`${t("home.stepModal.negativeCoords")}`, AlertType.Error);
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

    if (newStep) {
      const result = addStepToRecipe(recipeId, newStep);
      showAlert(
        result.message,
        result.success ? AlertType.Success : AlertType.Error
      );
    }
    clearForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      title={t("home.stepModal.title")}
      onClose={onClose}
      onSave={handleSave}
    >
      <select
        className="select-input"
        name="step-types"
        onChange={handleStepType}
      >
        <option value="">{t("home.stepModal.selectStepType")}</option>
        <option value={StepType.TakeImage}>
          {t("home.stepModal.takeImage")}
        </option>
        <option value={StepType.Unscrewing}>
          {t("home.stepModal.unscrewing")}
        </option>
      </select>
      {selectedStepType === StepType.TakeImage && (
        <>
          <select
            className="select-input"
            name="image-types"
            onChange={handleImageType}
          >
            <option value="">{t("home.stepModal.selectImageType")}</option>
            <option value={TakeImageType.FullImage}>
              {t("home.stepModal.fullImage")}
            </option>
            <option value={TakeImageType.SectionImage}>
              {t("home.stepModal.sectionImage")}
            </option>
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
            <option value="">{t("home.stepModal.selectUnscrewingType")}</option>
            <option value={UnscrewingType.Automatic}>
              {t("home.stepModal.automaticUnscrewing")}
            </option>
            <option value={UnscrewingType.Specific}>
              {t("home.stepModal.specificUnscrewing")}
            </option>
          </select>
          {selectedUnscrewingType === UnscrewingType.Specific && (
            <CoordInputs coords={coords} onChange={handleCoordChange} />
          )}
        </>
      )}
    </Modal>
  );
};
