import { useEquipmentStore } from "../../store/useEquipmentStore";
import styles from "./FilterContainer.module.scss";
import { useNavigate } from "react-router-dom";

export const EquipmentFilter = () => {
  const { filter, setFilter } = useEquipmentStore();
  const navigate = useNavigate();

  return (
    <div className={styles.filtersContainer}>
      <button type="button" onClick={() => navigate("/equipamentos/novo")}>
        + Novo equipamento
      </button>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filtrar equipamentos"
      />
    </div>
  );
};
