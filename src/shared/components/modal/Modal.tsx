import type React from "react";
import "./Modal.css";
import { useTranslation } from "react-i18next";

type ModalProps = {
  title: string;
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
};

export const Modal = ({ title, onClose, onSave, children }: ModalProps) => {
  const { t } = useTranslation();
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{title}</h2>
        <div className="form-container">{children}</div>
        <div className="modal-buttons">
          <button className="secondary-button" onClick={onClose}>
            {t("cancel")}
          </button>
          <button className="primary-button" onClick={onSave}>
            {t("save")}
          </button>
        </div>
      </div>
    </div>
  );
};
