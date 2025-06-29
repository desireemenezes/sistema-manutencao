import { useMaintenanceHistory } from "../hooks/useMaintenanceHistory";
import { MaintenanceFilter } from "./MaintenanceFilter/MaintenanceFilter";
import styles from "./MaintenanceHistory.module.scss";
import MaintenancePagination from "./Pagination/Pagination";
import MaintenanceHistorySkeleton from "./Skeleton/MaintenanceHistorySkeleton";

const statusLabels: Record<string, string> = {
  open: "Aberto",
  in_progress: "Em progresso",
  completed: "Concluído",
};

const MaintenanceHistory = () => {
  const {
    maintenances,
    totalMaintenances,
    isLoading,
    currentPage,
    maintenancesPerPage,
    paginate,
  } = useMaintenanceHistory();

  if (isLoading) return <MaintenanceHistorySkeleton />;

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR");
  };

  const getStatusLabel = (status: string) => statusLabels[status] || status;

  // Função para exportar CSV com dados filtrados atualmente
  const exportCSV = () => {
    if (maintenances.length === 0) {
      alert("Nenhuma manutenção para exportar.");
      return;
    }

    const headers = ["ID", "Descrição", "Tipo", "Data Conclusão", "Status"];
    const rows = maintenances.map((m) => [
      m.id,
      m.description,
      m.type,
      formatDate(m.completionDate),
      getStatusLabel(m.status),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((row) =>
          row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "historico_manutencoes.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderMobileList = () => (
    <div className={styles.mobileList}>
      {maintenances.map((maintenance) => (
        <div key={maintenance.id} className={styles.mobileListItem}>
          <p>
            <strong>ID:</strong> {maintenance.id}
          </p>
          <p>
            <strong>Descrição:</strong> {maintenance.description}
          </p>
          <p>
            <strong>Tipo:</strong> {maintenance.type}
          </p>
          <p>
            <strong>Data Conclusão:</strong>{" "}
            {formatDate(maintenance.completionDate)}
          </p>
          <p>
            <strong>Status:</strong> {getStatusLabel(maintenance.status)}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <MaintenanceFilter onExport={exportCSV} />

      <div className={styles.content_maintenances}>
        {maintenances.length === 0 && <p>Nenhuma manutenção encontrada</p>}

        <table className={styles.desktopTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Tipo</th>
              <th>Data Conclusão</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {maintenances.map((maintenance) => (
              <tr key={maintenance.id}>
                <td>{maintenance.id}</td>
                <td>{maintenance.description}</td>
                <td>{maintenance.type}</td>
                <td>{formatDate(maintenance.completionDate)}</td>
                <td>{getStatusLabel(maintenance.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {renderMobileList()}

        <MaintenancePagination
          currentPage={currentPage}
          maintenancesPerPage={maintenancesPerPage}
          totalMaintenances={totalMaintenances}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default MaintenanceHistory;
