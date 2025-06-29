import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import styles from "./EditEquipmentModal.module.scss";

export interface Equipment {
  id?: number;
  name: string;
  code: string;
  model?: string;
  sectorId: number;
  nextPreventiveDate?: string; // YYYY-MM-DD
  notes?: string;
}

interface EditEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipment: Equipment | null;
  onSave: (updatedEquipment: Equipment) => void;
}

function EditEquipmentModal(props: EditEquipmentModalProps) {
  const { isOpen, onClose, equipment, onSave } = props;

  const [formData, setFormData] = useState<Equipment>({
    id: undefined,
    name: "",
    code: "",
    model: "",
    sectorId: 0,
    nextPreventiveDate: "",
    notes: "",
  });

  useEffect(() => {
    if (equipment) setFormData(equipment);
  }, [equipment]);

  if (!isOpen) return null;

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    // For sectorId, convert to number
    if (name === "sectorId") {
      setFormData({ ...formData, [name]: Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Validações simples (exemplo)
    if (!formData.name.trim() || !formData.code.trim() || !formData.sectorId) {
      alert(
        "Por favor, preencha os campos obrigatórios: Nome, Código e Setor."
      );
      return;
    }

    onSave({ ...formData, id: formData.id });
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Editar Equipamento</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Código:
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Modelo:
            <input
              type="text"
              name="model"
              value={formData.model || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Setor (ID):
            <input
              type="number"
              name="sectorId"
              value={formData.sectorId}
              onChange={handleChange}
              required
              min={1}
            />
          </label>

          <label>
            Próxima Preventiva:
            <input
              type="date"
              name="nextPreventiveDate"
              value={formData.nextPreventiveDate || ""}
              onChange={handleChange}
            />
          </label>

          <label>
            Observações:
            <textarea
              name="notes"
              value={formData.notes || ""}
              onChange={handleChange}
              rows={3}
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
}

export default EditEquipmentModal;
