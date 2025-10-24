import { useState } from "react";
import type { Recipe } from "../../../interfaces";
import { Modal } from "../../../shared/components/modal/Modal";

type RecipeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipe: Recipe) => void;
};

export const RecipeModal = ({ isOpen, onClose, onSave }: RecipeModalProps) => {
  const [name, setName] = useState("");

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
    <Modal title="Create New Recipe" onClose={handleCancel} onSave={handleSave}>
      <input
        type="text"
        placeholder="Recipe name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="modal-input"
      />
    </Modal>
  );
};
