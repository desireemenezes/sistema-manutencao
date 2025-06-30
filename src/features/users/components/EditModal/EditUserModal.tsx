import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import styles from "./EditUserModal.module.scss";
import type { User, UserRole } from "@/types/Auth";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (updatedUser: User) => void;
}

const userRoles: UserRole[] = ["manager", "technician", "researcher"];

const roleLabels: Record<UserRole, string> = {
  manager: "Administrador",
  technician: "Técnico",
  researcher: "Pesquisador",
};

function EditUserModal({ isOpen, onClose, user, onSave }: EditUserModalProps) {
  const [formData, setFormData] = useState<User>({
    id: 0,
    fullName: "",
    email: "",
    role: "manager",
  });

  useEffect(() => {
    if (isOpen && user) {
      setFormData(user);
    }
  }, [user, isOpen]);

  if (!isOpen) return null;

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSave(formData);
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Editar Usuário</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">Nome:</label>
          <input
            id="fullName"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="role">Perfil:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            {userRoles.map((role) => (
              <option key={role} value={role}>
                {roleLabels[role]}
              </option>
            ))}
          </select>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.confirm}
              disabled={!formData.fullName || !formData.email}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;
