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
  const [formData, setFormData] = useState<Sector>(sector);

  useEffect(() => {
    setFormData(sector);
  }, [sector]);

  // Fecha modal com ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("O nome do setor é obrigatório.");
      return;
    }

    onSave(formData);
  };

  return (
    <div
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-sector-title"
    >
      <div className={styles.modalContent}>
        <h3 id="edit-sector-title">Editar Setor</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="sector-name">
            Nome do Setor:
            <input
              id="sector-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoFocus
            />
          </label>

          <label htmlFor="sector-category">
            Categoria:
            <input
              id="sector-category"
              name="category"
              value={formData.category || ""}
              onChange={handleChange}
            />
          </label>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={onClose}
              aria-label="Cancelar edição"
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
