import React from "react";
import styles from "./Spinner.module.scss";

interface SpinnerProps {
  size?: number; // tamanho em px, opcional, padrão 24
  ariaLabel?: string; // label para acessibilidade, padrão "Carregando"
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 24,
  ariaLabel = "Carregando",
}) => {
  return (
    <div
      className={styles.spinner}
      style={{ width: size, height: size }}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      <svg
        className={styles.spinnerSvg}
        viewBox="0 0 50 50"
        aria-hidden="true"
        focusable="false"
      >
        <circle
          className={styles.path}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        />
      </svg>
    </div>
  );
};

export default Spinner;
