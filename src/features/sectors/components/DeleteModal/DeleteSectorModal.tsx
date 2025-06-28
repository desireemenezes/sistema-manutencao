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
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className={styles.actions}>
          <button onClick={onCancel} className={styles.cancel}>
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

export default DeleteModal;
