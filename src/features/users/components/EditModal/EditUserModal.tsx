import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import styles from "./EditUserModal.module.scss";
import type { User, UserRole } from "@/types/Auth";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (updatedUser: User) => void;
}

// Lista de perfis válidos
const userRoles: UserRole[] = ["manager", "technician", "researcher"];

// Mapeamento dos roles para labels em português
const roleLabels: Record<UserRole, string> = {
  manager: "Administrador",
  technician: "Técnico",
  researcher: "Pesquisador",
};

function EditUserModal(props: EditUserModalProps) {
  const { isOpen, onClose, user, onSave } = props;

  const [formData, setFormData] = useState<User>({
    id: 0,
    fullName: "",
    email: "",
    role: "manager", // valor padrão
  });

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  if (!isOpen) return null;

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSave({ ...formData, id: Number(formData.id) });
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Editar Usuário</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            E-mail:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Perfil:
            <select
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
          </label>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.confirm}>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUserModal;
