import { useMaintenanceStore } from "../../store/useMaintenance";
import styles from "./MaintenanceFilter.module.scss";
import { FiDownload } from "react-icons/fi";

interface MaintenanceFilterProps {
  onExport: () => void;
}

export const MaintenanceFilter = ({ onExport }: MaintenanceFilterProps) => {
  const { filter, setFilter } = useMaintenanceStore();

  const handleSubmit = (e: React.FormEvent) => e.preventDefault();

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.filtersContainer}
      role="search"
      aria-label="Filtro de manutenções"
    >
      <input
        id="maintenance-filter"
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filtrar manutenções"
        aria-label="Filtrar manutenções por descrição ou status"
        autoComplete="off"
      />
      <button
        type="button"
        onClick={onExport}
        aria-label="Exportar histórico de manutenções"
      >
        <FiDownload
          size={18}
          aria-hidden="true"
          style={{ marginRight: "6px" }}
        />
        Exportar Histórico
      </button>
    </form>
  );
};
