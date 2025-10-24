import type React from "react";
import "./Modal.css";

type ModalProps = {
  title: string;
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
};

export const Modal = ({ title, onClose, onSave, children }: ModalProps) => {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{title}</h2>
        <div className="form-container">{children}</div>
        <div className="modal-buttons">
          <button className="secondary-button" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-button" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
