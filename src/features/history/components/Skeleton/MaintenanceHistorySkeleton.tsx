import styles from "./MaintenanceHistorySkeleton.module.scss";

const MaintenanceHistorySkeleton = () => {
  // Cria um array com 5 linhas placeholders para simular o carregamento da tabela
  const rows = Array.from({ length: 5 });

  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.filtersSkeleton}></div>

      <table className={styles.desktopTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Descrição</th>
            <th>Tipo</th>
            <th>Agente</th>
            <th>Data Conclusão</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, index) => (
            <tr key={index}>
              {Array.from({ length: 6 }).map((__, i) => (
                <td key={i}>
                  <div className={styles.skeletonBox}></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceHistorySkeleton;
