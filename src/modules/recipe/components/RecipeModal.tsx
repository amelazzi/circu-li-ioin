import { useState } from "react";
import type { Recipe } from "../../../interfaces";
import { Modal } from "../../../shared/components/Modal";
import { useTranslation } from "react-i18next";

type RecipeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipe: Recipe) => void;
};

export const RecipeModal = ({ isOpen, onClose, onSave }: RecipeModalProps) => {
  const [name, setName] = useState("");
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleCancel = () => {
    setName("");
    onClose();
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ id: Date.now(), name, steps: [] });
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
