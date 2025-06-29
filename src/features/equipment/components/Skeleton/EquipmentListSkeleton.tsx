import styles from "./EquipmentListSkeleton.module.scss";

const EquipmentListSkeleton = () => {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <table className={styles.skeletonTable}>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Código</th>
          <th>Modelo</th>
          <th>Próxima Preventiva</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {skeletonRows.map((_, idx) => (
          <tr key={idx}>
            <td>
              <div className={styles.skeletonBox} style={{ width: "120px" }} />
            </td>
            <td>
              <div className={styles.skeletonBox} style={{ width: "80px" }} />
            </td>
            <td>
              <div className={styles.skeletonBox} style={{ width: "100px" }} />
            </td>
            <td>
              <div className={styles.skeletonBox} style={{ width: "140px" }} />
            </td>
            <td>
              <div
                className={styles.skeletonBox}
                style={{ width: "80px", height: "24px" }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EquipmentListSkeleton;
