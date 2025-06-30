import { useMaintenanceStore } from "../../store/useMaintenanceStore";
import styles from "./MaintenanceFilters.module.scss";
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
    <form className={styles.filtersContainer} aria-label="Filtros de chamados">
      <label htmlFor="type-filter" className="sr-only">
        Filtrar por tipo
      </label>
      <select
        id="type-filter"
        value={typeFilter ?? ""}
        onChange={(e) => setTypeFilter(e.target.value || null)}
      >
        <option value="">Todos os tipos</option>
        <option value="corrective">Corretiva</option>
        <option value="preventive">Preventiva</option>
      </select>

      <label htmlFor="status-filter" className="sr-only">
        Filtrar por status
      </label>
      <select
        id="status-filter"
        value={statusFilter ?? ""}
        onChange={(e) => setStatusFilter(e.target.value || null)}
      >
        <option value="">Todos os status</option>
        <option value="open">Aberto</option>
        <option value="in_progress">Em progresso</option>
        <option value="completed">Concluído</option>
      </select>

      <button type="button" onClick={resetFilters} aria-label="Limpar filtros">
        Limpar Filtros
      </button>

      <button
        className={styles.newRequestButton}
        type="button"
        onClick={handleNewRequest}
        aria-label="Abrir formulário para novo chamado"
      >
        + Novo Chamado
      </button>
    </form>
  );
};
