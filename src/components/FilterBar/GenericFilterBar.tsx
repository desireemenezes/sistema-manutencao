import styles from "./GenericFilterBar.module.scss";

interface GenericFilterBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  children?: React.ReactNode;
  id?: string; // para conectar label se quiser adicionar depois
  ariaLabel?: string; // para acessibilidade no input
}

export const GenericFilterBar = ({
  value,
  onChange,
  placeholder = "Filtrar...",
  children,
  id,
  ariaLabel = "Filtro de busca",
}: GenericFilterBarProps) => {
  return (
    <div className={styles.filtersContainer}>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
      {children}
    </div>
  );
};
