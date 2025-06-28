import styles from "./Skeleton.module.scss";

export const Skeleton = () => {
  return (
    <div className={styles.full_screen_skeleton}>
      <div className={styles.line} />
      <div className={styles.line} />
      <div className={styles.line} />
    </div>
  );
};
