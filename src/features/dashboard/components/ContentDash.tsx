import { useMaintenanceStats } from "../hooks/useMaintenanceStats";
import { useMaintenanceTypesChartData } from "../hooks/useMaintenanceTypesChartData";
import { useAgentRequestsChartData } from "../hooks/useAgentRequestsChartData";

import styles from "./ContentDash.module.scss";
import { Skeleton } from "./Skeleton/Skeleton";
import { BarChartComponent } from "./BarChartComponent/BarChartComponent";

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
    <section
      className={styles.content_dash}
      aria-label="Dashboard de Manutenção"
    >
      <div className={styles.charts_container}>
        <article
          className={styles.chart_wrapper}
          aria-label="Gráfico de Tipos de Manutenção"
        >
          <BarChartComponent
            data={maintenanceTypesChartData}
            dataKey="count"
            xAxisDataKey="type"
            title="Tipos de Manutenção"
            color={COLORS[0]}
          />
        </article>

        <article
          className={styles.chart_wrapper}
          aria-label="Gráfico de Chamados por Agentes"
        >
          <BarChartComponent
            data={agentRequestsChartData}
            dataKey="count"
            xAxisDataKey="agent"
            title="Agentes"
            color={COLORS[1]}
          />
        </article>
      </div>

      <section
        className={styles.counters}
        aria-live="polite"
        aria-atomic="true"
      >
        <h3>Contadores de chamados</h3>
        <p>Abertos: {openRequests?.length ?? 0}</p>
        <p>Em andamento: {inProgressRequests?.length ?? 0}</p>
        <p>Concluídos: {completedRequests?.length ?? 0}</p>
      </section>
    </section>
  );
};
