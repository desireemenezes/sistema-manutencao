import styles from "./Spinner.module.scss";

interface SpinnerProps {
  size?: number; // tamanho em px
  color?: string; // cor do spinner
}

export function Spinner({ size = 40, color = "#0052cc" }: SpinnerProps) {
  return (
    <div
      className={styles.spinner}
      style={{ width: size, height: size, borderColor: color }}
      aria-label="Carregando"
      role="status"
    />
  );
}
