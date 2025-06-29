import { useSectorStore } from "../../store/useSectorStore";
import styles from "./FilterContainer.module.scss";

export const SectorFilter = () => {
  const { filter, setFilter } = useSectorStore(); // use seu hook ou store de setores

  return (
    <div className={styles.filtersContainer}>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filtrar setores"
      />
    </div>
  );
};
