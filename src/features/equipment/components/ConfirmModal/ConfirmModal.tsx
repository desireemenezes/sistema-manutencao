import { useEffect, useRef } from "react";
import styles from "./ConfirmModal.module.scss";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  isOpen,
  title = "Confirmação",
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  // Foco no botão cancelar ao abrir o modal
  useEffect(() => {
    if (isOpen) {
      cancelButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Fechar com ESC
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
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-message"
      tabIndex={-1}
    >
      <div className={styles.modal}>
        <h3 id="confirm-modal-title">{title}</h3>
        <p id="confirm-modal-message">{message}</p>
        <div className={styles.actions}>
          <button
            onClick={onCancel}
            className={styles.cancel}
            ref={cancelButtonRef}
            aria-label="Cancelar operação"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className={styles.confirm}
            aria-label="Confirmar operação"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
