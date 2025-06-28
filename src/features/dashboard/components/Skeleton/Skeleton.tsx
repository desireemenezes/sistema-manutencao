import styles from "./skeleton.module.scss";

export const Skeleton = () => {
  return (
    <div className={styles.full_screen_skeleton}>
      <div className={styles.line} />
      <div className={styles.line} />
      <div className={styles.line} />
    </div>
  );
};
