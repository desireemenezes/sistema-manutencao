import { useUserStore } from "../../store/userStore";
import styles from "./FilterContainer.module.scss";
import { useNavigate } from "react-router-dom";

export const UserFilter = () => {
  const { filter, setFilter } = useUserStore();
  const navigate = useNavigate();

  return (
    <div className={styles.filtersContainer}>
      <button type="button" onClick={() => navigate("/usuarios/novo")}>
        + Novo usuário
      </button>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filtrar usuários"
      />
    </div>
  );
};
