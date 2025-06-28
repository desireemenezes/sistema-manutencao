import styles from "./maintenanceAgentEditModal.module.scss";
import { useEditMaintenanceForm } from "../../hooks/useEditMaintenanceForm";
import type { MaintenanceRequest } from "@/types/Maintenance";

type Props = {
  maintenance: MaintenanceRequest;
  onClose: () => void;
  onSave: (updated: MaintenanceRequest) => void;
};

export function MaintenanceAgentEditModal({
  maintenance,
  onClose,
  onSave,
}: Props) {
  const {
    status,
    setStatus,
    completionDate,
    setCompletionDate,
    completionNotes,
    setCompletionNotes,
    partsUsed,
    addPart,
    removePart,
    updatePartName,
    updatePartQuantity,
    validate,
    errors,
  } = useEditMaintenanceForm(maintenance);

  const handleSave = () => {
    if (!validate()) return;

    onSave({
      ...maintenance,
      status,
      completionDate: status === "completed" ? completionDate : null,
      completionNotes: status === "completed" ? completionNotes : null,
      partsUsed: status === "completed" ? partsUsed : [],
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Editar Chamado #{maintenance.id}</h3>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Fechar modal"
          >
            &times;
          </button>
        </div>

        <div className={styles.modalBody}>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
          >
            <option value="open">Aberto</option>
            <option value="in_progress">Em progresso</option>
            <option value="completed">Concluído</option>
          </select>

          {status === "completed" && (
            <>
              <label>Data de execução:</label>
              <input
                type="date"
                value={completionDate}
                onChange={(e) => setCompletionDate(e.target.value)}
              />
              {errors.completionDate && (
                <span className={styles.error}>{errors.completionDate}</span>
              )}

              <label>Descrição do serviço:</label>
              <textarea
                value={completionNotes}
                onChange={(e) => setCompletionNotes(e.target.value)}
              />
              {errors.completionNotes && (
                <span className={styles.error}>{errors.completionNotes}</span>
              )}

              <label>Peças usadas:</label>
              {partsUsed.map((part, i) => (
                <div key={i} className={styles.partRow}>
                  <input
                    type="text"
                    placeholder="Nome da peça"
                    value={part.name}
                    onChange={(e) => updatePartName(i, e.target.value)}
                  />
                  <input
                    type="number"
                    min={1}
                    placeholder="Quantidade"
                    value={part.quantity}
                    onChange={(e) =>
                      updatePartQuantity(i, Number(e.target.value))
                    }
                  />
                  {partsUsed.length > 1 && (
                    <button type="button" onClick={() => removePart(i)}>
                      Remover
                    </button>
                  )}
                </div>
              ))}
              {errors.parts && (
                <span className={styles.error}>{errors.parts}</span>
              )}

              <button
                type="button"
                className={styles.addPartButton}
                onClick={addPart}
              >
                Adicionar peça
              </button>
            </>
          )}
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.cancel} type="button" onClick={onClose}>
            Cancelar
          </button>
          <button className={styles.save} type="button" onClick={handleSave}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
