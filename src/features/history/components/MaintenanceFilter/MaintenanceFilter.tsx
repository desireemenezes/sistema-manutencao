import { useMaintenanceStore } from "../../store/useMaintenance";
import styles from "./MaintenanceFilter.module.scss";
import { FiDownload } from "react-icons/fi";

interface MaintenanceFilterProps {
  onExport: () => void;
}

export const MaintenanceFilter = ({ onExport }: MaintenanceFilterProps) => {
  const { filter, setFilter } = useMaintenanceStore();

  return (
    <div className={styles.filtersContainer}>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filtrar manutenções"
      />
      <button type="button" onClick={onExport} aria-label="Exportar histórico">
        <FiDownload size={18} style={{ marginRight: "6px" }} />
        Exportar Histórico
      </button>
    </div>
  );
};
