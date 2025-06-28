import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useMaintenanceList, useUpdateMaintenance } from "@/api/maintenanceApi";
import { useTechnicians } from "@/api/useTechnicians";
import { toast } from "react-toastify";
import styles from "../Maintenance.module.scss";
import { SkeletonItem } from "../Skeleton/SkeletonItem";
import { MaintenanceAgentEditModal } from "../MaintenanceAgentEditModal/MaintenanceAgentEditModal";

export const MyCalled = () => {
  const user = useAuthStore((state) => state.user);
  const { data: maintenanceRequests, isLoading } = useMaintenanceList();
  const { data: technicians = [] } = useTechnicians();
  const updateMaintenance = useUpdateMaintenance();

  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtra chamados criados pelo usuário pesquisador logado
  const filteredRequests = maintenanceRequests?.filter(
    (item) => item.requesterId === user?.id
  );

  const openModal = (request: any) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleSave = (updatedRequest: any) => {
    updateMaintenance.mutate(updatedRequest, {
      onSuccess: () => {
        toast.success("Chamado atualizado com sucesso!");
        closeModal();
      },
      onError: () => {
        toast.error("Erro ao atualizar o chamado.");
      },
    });
  };

  const getTechnicianName = (id: number | null | undefined) => {
    if (!id) return "Não atribuído";
    const tech = technicians.find((t) => t.id === id);
    return tech ? tech.fullName : "Desconhecido";
  };

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

  if (!filteredRequests || filteredRequests.length === 0) {
    return <p>Nenhum chamado encontrado para você.</p>;
  }

  return (
    <div className={styles.listContainer}>
      <ul>
        {filteredRequests.map((item: any) => (
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
            onClick={() => openModal(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                openModal(item);
              }
            }}
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
            <p>
              Agente: <strong>{getTechnicianName(item.assignedTo)}</strong>
            </p>
            {item.status === "completed" && item.completionDate && (
              <p>
                Concluído em:{" "}
                <strong>
                  {new Date(item.completionDate).toLocaleDateString("pt-BR")}
                </strong>
              </p>
            )}
          </li>
        ))}
      </ul>

      {isModalOpen && selectedRequest && (
        <MaintenanceAgentEditModal
          maintenance={selectedRequest}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
