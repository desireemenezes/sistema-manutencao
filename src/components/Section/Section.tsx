import styles from "./Section.module.scss";

interface SectionProps {
  title: string;
  description?: string;
  id?: string;
  children?: React.ReactNode;
}

export function Section({
  title,
  description,
  id = "section-title",
  children,
}: SectionProps) {
  return (
    <section className={styles.section} aria-labelledby={id}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </section>
  );
}
