import { useEffect, useRef } from "react";
import styles from "./DeleteModal.module.scss";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal = ({
  isOpen,
  title = "Confirmação",
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  // Foco no botão cancelar ao abrir
  useEffect(() => {
    if (isOpen && cancelButtonRef.current) {
      cancelButtonRef.current.focus();
    }
  }, [isOpen]);

  // ESC fecha o modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
    >
      <div className={styles.modal}>
        <h3 id="delete-modal-title">{title}</h3>
        <p id="delete-modal-description">{message}</p>
        <div className={styles.actions}>
          <button
            onClick={onCancel}
            className={styles.cancel}
            ref={cancelButtonRef}
            aria-label="Cancelar exclusão"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={styles.confirm}
            aria-label="Confirmar exclusão"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
