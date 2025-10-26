import { useState } from "react";
import type { ActionResult, Recipe } from "../../../interfaces";
import { Modal } from "../../../shared/components/Modal";
import { useTranslation } from "react-i18next";
import { useAlert } from "../../alert/useAlert";
import { AlertType } from "../../../constants/enums";

type RecipeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipe: Recipe) => ActionResult;
};

export const RecipeModal = ({ isOpen, onClose, onSave }: RecipeModalProps) => {
  const [name, setName] = useState("");
  const { t } = useTranslation();
  const { showAlert } = useAlert();

  if (!isOpen) return null;

  const handleCancel = () => {
    setName("");
    onClose();
  };

  const handleSave = () => {
    if (!name.trim()) {
      showAlert(
        `${t("home.recipeModal.emptyRecipeNameError")}`,
        AlertType.Error
      );
      return;
    }

    // onSave returns a result object { success, message }
    const result = onSave({ id: Date.now(), name, steps: [] });
    showAlert(
      result.message,
      result.success ? AlertType.Success : AlertType.Error
    );

    setName("");
    onClose();
  };

  return (
    <Modal
      title={t("home.recipeModal.title")}
      onClose={handleCancel}
      onSave={handleSave}
    >
      <input
        type="text"
        placeholder={t("home.recipeModal.nameInputPlaceholder")}
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="modal-input"
      />
    </Modal>
  );
};
