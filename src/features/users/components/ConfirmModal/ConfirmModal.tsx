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
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    // Focar botão Cancelar para navegação por teclado
    cancelBtnRef.current?.focus();

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
    >
      <div className={styles.modal}>
        <h3 id="confirm-modal-title">{title}</h3>
        <p id="confirm-modal-description">{message}</p>
        <div className={styles.actions}>
          <button
            onClick={onCancel}
            className={styles.cancel}
            ref={cancelBtnRef}
          >
            Cancelar
          </button>
          <button onClick={onConfirm} className={styles.confirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
