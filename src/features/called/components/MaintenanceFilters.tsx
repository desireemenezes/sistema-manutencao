import { useMaintenanceStore } from "../store/useMaintenanceStore";
import styles from "./maintenance.module.scss";
import { useNavigate } from "react-router-dom";

export const MaintenanceFilters = () => {
  const {
    typeFilter,
    statusFilter,
    setTypeFilter,
    setStatusFilter,
    resetFilters,
  } = useMaintenanceStore();

  const navigate = useNavigate();

  const handleNewRequest = () => {
    navigate("/chamados/novo"); // Ajuste para sua rota do formulário de abertura
  };

  return (
    <div className={styles.filtersContainer}>
      <select
        value={typeFilter ?? ""}
        onChange={(e) => setTypeFilter(e.target.value || null)}
      >
        <option value="">Todos os tipos</option>
        <option value="corrective">Corretiva</option>
        <option value="preventive">Preventiva</option>
      </select>

      <select
        value={statusFilter ?? ""}
        onChange={(e) => setStatusFilter(e.target.value || null)}
      >
        <option value="">Todos os status</option>
        <option value="open">Aberto</option>
        <option value="in_progress">Em progresso</option>
        <option value="completed">Concluído</option>
      </select>

      <button onClick={resetFilters}>Limpar filtros</button>

      <button
        className={styles.newRequestButton}
        type="button"
        onClick={handleNewRequest}
      >
        + Novo Chamado
      </button>
    </div>
  );
};
