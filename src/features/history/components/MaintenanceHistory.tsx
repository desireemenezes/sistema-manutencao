import Pagination from "@/components/Pagination/Pagination";
import { useMaintenanceHistory } from "../hooks/useMaintenanceHistory";
import { MaintenanceFilter } from "./MaintenanceFilter/MaintenanceFilter";
import styles from "./MaintenanceHistory.module.scss";
import MaintenanceHistorySkeleton from "./Skeleton/MaintenanceHistorySkeleton";
import { useMaintenanceFormatters } from "../hooks/useMaintenanceFormatters";

const MaintenanceHistory = () => {
  const {
    maintenances,
    totalMaintenances,
    isLoading,
    currentPage,
    maintenancesPerPage,
    paginate,
  } = useMaintenanceHistory();

  const { formatDate, getStatusLabel, getTypeLabel, exportCSV } =
    useMaintenanceFormatters(maintenances);

  if (isLoading) return <MaintenanceHistorySkeleton />;

  const renderMobileList = () => (
    <div
      className={styles.mobileList}
      role="list"
      aria-label="Lista de manutenções em formato mobile"
    >
      {maintenances.map((maintenance) => (
        <div
          key={maintenance.id}
          className={styles.mobileListItem}
          role="listitem"
          aria-label={`Manutenção ${maintenance.id}`}
        >
          <p>
            <strong>ID:</strong> {maintenance.id}
          </p>
          <p>
            <strong>Descrição:</strong> {maintenance.description}
          </p>
          <p>
            <strong>Tipo:</strong> {getTypeLabel(maintenance.type)}
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
        {maintenances.length === 0 && (
          <p role="status">Nenhuma manutenção encontrada</p>
        )}

        <table
          className={styles.desktopTable}
          aria-label="Tabela de histórico de manutenções"
        >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Descrição</th>
              <th scope="col">Tipo</th>
              <th scope="col">Data Conclusão</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {maintenances.map((maintenance) => (
              <tr key={maintenance.id}>
                <td>{maintenance.id}</td>
                <td>{maintenance.description}</td>
                <td>{getTypeLabel(maintenance.type)}</td>
                <td>{formatDate(maintenance.completionDate)}</td>
                <td>{getStatusLabel(maintenance.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {renderMobileList()}

        <Pagination
          currentPage={currentPage}
          itemsPerPage={maintenancesPerPage}
          totalItems={totalMaintenances}
          paginate={paginate}
        />
      </div>
    </>
  );
};

export default MaintenanceHistory;
