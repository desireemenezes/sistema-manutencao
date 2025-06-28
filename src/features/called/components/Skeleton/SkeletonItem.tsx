import styles from "./SkeletonItem.module.scss";

export const SkeletonItem = () => {
  return (
    <li className={styles.skeletonItem}>
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonTitle} />
        <div className={styles.skeletonBadge} />
      </div>
      <div className={styles.skeletonLine} />
      <div className={styles.skeletonLineShort} />
    </li>
  );
};
