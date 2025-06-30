import { FiSearch } from "react-icons/fi";
import styles from "./GenericFilterBar.module.scss";

interface GenericFilterBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void; // opcional, se quiser tratar o enter
  placeholder?: string;
  children?: React.ReactNode;
  id?: string;
  ariaLabel?: string;
}

export const GenericFilterBar = ({
  value,
  onChange,
  onSubmit,
  placeholder = "Filtrar...",
  children,
  id,
  ariaLabel = "Filtro de busca",
}: GenericFilterBarProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <form className={styles.filtersContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
      {children}
    </form>
  );
};
