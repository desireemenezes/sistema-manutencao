import { useMaintenanceStats } from "../hooks/useMaintenanceStats";
import { useMaintenanceTypesChartData } from "../hooks/useMaintenanceTypesChartData";
import { useAgentRequestsChartData } from "../hooks/useAgentRequestsChartData";
import { BarChartComponent } from "./BarChartComponent";
import styles from "@/features/dashboard/components/contentDash.module.scss";
import { Skeleton } from "./Skeleton/Skeleton";

const COLORS = ["#0052cc", "#43a047"];

export const ContentDash = () => {
  const { openRequests, inProgressRequests, completedRequests, isLoading } =
    useMaintenanceStats();
  const maintenanceTypesChartData = useMaintenanceTypesChartData();
  const agentRequestsChartData = useAgentRequestsChartData();

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <div className={styles.content_dash}>
      <div className={styles.charts_container}>
        <div className={styles.chart_wrapper}>
          <BarChartComponent
            data={maintenanceTypesChartData}
            dataKey="count"
            xAxisDataKey="type"
            title="Tipos de Manutenção"
            color={COLORS[0]}
          />
        </div>

        <div className={styles.chart_wrapper}>
          <BarChartComponent
            data={agentRequestsChartData}
            dataKey="count"
            xAxisDataKey="agent"
            title="Agentes"
            color={COLORS[1]}
          />
        </div>
      </div>
      <div className={styles.counters}>
        <h3>Contadores de chamados</h3>
        <p>Abertos: {openRequests?.length}</p>
        <p>Em andamento: {inProgressRequests?.length}</p>
        <p>Concluídos: {completedRequests?.length}</p>
      </div>
    </div>
  );
};
