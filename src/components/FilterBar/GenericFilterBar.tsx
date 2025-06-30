// src/components/FilterBar/GenericFilterBar.tsx

import styles from "./GenericFilterBar.module.scss";

interface GenericFilterBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  children?: React.ReactNode;
}

export const GenericFilterBar = ({
  value,
  onChange,
  placeholder = "Filtrar...",
  children,
}: GenericFilterBarProps) => {
  return (
    <div className={styles.filtersContainer}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {children}
    </div>
  );
};
