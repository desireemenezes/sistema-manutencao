import { useQuery } from "react-query";
import { api } from "@/lib/api";
import { useMaintenanceStore } from "../store/useMaintenanceStore";
import styles from "./Maintenance.module.scss";
import { SkeletonItem } from "./Skeleton/SkeletonItem";

export const MaintenanceList = () => {
  const { typeFilter, statusFilter, assignedToFilter } = useMaintenanceStore();

  const { data: maintenanceRequests, isLoading } = useQuery({
    queryKey: ["maintenanceRequests"],
    queryFn: async () => {
      const response = await api.get("/maintenanceRequests");
      return response.data;
    },
  });

  const filteredRequests = maintenanceRequests?.filter((item: any) => {
    return (
      (!typeFilter || item.type === typeFilter) &&
      (!statusFilter || item.status === statusFilter) &&
      (!assignedToFilter || item.assignedTo === assignedToFilter)
    );
  });

  if (isLoading) {
    return (
      <div className={styles.listContainer}>
        <ul>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonItem key={i} />
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className={styles.listContainer}>
      {filteredRequests.length === 0 ? (
        <p>Nenhum chamado encontrado com os filtros atuais.</p>
      ) : (
        <ul>
          {filteredRequests?.map((item: any) => (
            <li
              key={item.id}
              className={`
              ${styles.item} 
              ${
                item.type === "corrective"
                  ? styles.corrective
                  : styles.preventive
              } 
              ${
                item.status === "open"
                  ? styles.borderOpen
                  : item.status === "in_progress"
                  ? styles.borderInProgress
                  : styles.borderCompleted
              }
            `}
            >
              <div className={styles.header}>
                <strong>{item.description}</strong>
                <span
                  className={`${styles.badge} ${
                    item.status === "open"
                      ? styles.open
                      : item.status === "in_progress"
                      ? styles.inProgress
                      : styles.completed
                  }`}
                >
                  {item.status === "open"
                    ? "Aberto"
                    : item.status === "in_progress"
                    ? "Em progresso"
                    : "Concluído"}
                </span>
              </div>
              <p>
                Prioridade:{" "}
                <strong>{item.priority === "high" ? "Alta" : "Média"}</strong>
              </p>
              <em>
                Tipo: {item.type === "corrective" ? "Corretiva" : "Preventiva"}
              </em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
