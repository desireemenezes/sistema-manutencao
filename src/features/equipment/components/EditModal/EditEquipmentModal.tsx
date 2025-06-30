import {
  useState,
  useEffect,
  useCallback,
  type ChangeEvent,
  type FormEvent,
} from "react";
import styles from "./EditEquipmentModal.module.scss";

export interface Equipment {
  id?: number;
  name: string;
  code: string;
  model?: string;
  sectorId: number;
  nextPreventiveDate?: string;
  notes?: string;
}

export interface Sector {
  id: number;
  name: string;
}

interface EditEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipment: Equipment | null;
  onSave: (updatedEquipment: Equipment) => void;
  sectors: Sector[];
}

function EditEquipmentModal({
  isOpen,
  onClose,
  equipment,
  onSave,
  sectors,
}: EditEquipmentModalProps) {
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
    else
      setFormData({
        id: undefined,
        name: "",
        code: "",
        model: "",
        sectorId: 0,
        nextPreventiveDate: "",
        notes: "",
      });
  }, [equipment]);

  // Fecha modal com ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }
  }, [isOpen, onClose]);

  const handleChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === "sectorId" ? Number(value) : value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (
        !formData.name.trim() ||
        !formData.code.trim() ||
        !formData.sectorId
      ) {
        alert(
          "Por favor, preencha os campos obrigatórios: Nome, Código e Setor."
        );
        return;
      }

      onSave({ ...formData, id: formData.id });
    },
    [formData, onSave]
  );

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-equipment-title"
      tabIndex={-1} // para receber foco e facilitar navegação teclado
    >
      <div className={styles.modalContent}>
        <h3 id="edit-equipment-title">Editar Equipamento</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Nome:
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoFocus
            />
          </label>

          <label htmlFor="code">
            Código:
            <input
              id="code"
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </label>

          <label htmlFor="model">
            Modelo:
            <input
              id="model"
              type="text"
              name="model"
              value={formData.model || ""}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="sectorId">
            Setor:
            <select
              id="sectorId"
              name="sectorId"
              value={formData.sectorId}
              onChange={handleChange}
              required
            >
              {sectors.map((sector) => (
                <option key={sector.id} value={sector.id}>
                  {sector.name}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="nextPreventiveDate">
            Próxima Preventiva:
            <input
              id="nextPreventiveDate"
              type="date"
              name="nextPreventiveDate"
              value={formData.nextPreventiveDate || ""}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="notes">
            Observações:
            <textarea
              id="notes"
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
}

export default EditEquipmentModal;
