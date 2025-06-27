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
      <h1 id={id} className={styles.title}>
        {title}
      </h1>
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </section>
  );
}
