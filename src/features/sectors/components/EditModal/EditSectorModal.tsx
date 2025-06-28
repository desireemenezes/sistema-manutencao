import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import styles from "./EditSectorModal.module.scss";
import type { Sector } from "../../types/Sector";

interface EditSectorModalProps {
  sector: Sector;
  onClose: () => void;
  onSave: (updatedSector: Sector) => void;
}

export const EditSectorModal = ({
  sector,
  onClose,
  onSave,
}: EditSectorModalProps) => {
  const [formData, setFormData] = useState<Sector>({
    id: 0,
    name: "",
    category: "",
  });

  useEffect(() => {
    if (sector) {
      setFormData(sector);
    }
  }, [sector]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <form onSubmit={handleSubmit}>
          <label>
            Nome do Setor:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Categoria:
            <input
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
            />
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
};
