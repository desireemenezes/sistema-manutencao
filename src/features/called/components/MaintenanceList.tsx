import { useState, useEffect } from "react";
import { SkeletonItem } from "./Skeleton/SkeletonItem";
import { useMaintenanceStore } from "../store/useMaintenanceStore";
import { MaintenanceAgentEditModal } from "./MaintenanceAgentEditModal/MaintenanceAgentEditModal";
import styles from "./Maintenance.module.scss";

import { toast } from "react-toastify";

import { useAuthStore } from "@/store/authStore";
import { useTechnicians } from "@/api/useTechnicians";
import useEquipments from "@/features/equipment/store/useEquipments";

// Import do hook React Query para carregar dados da API uma vez
import { useMaintenanceList } from "@/api/maintenanceApi";
import { useUpdateMaintenance } from "@/api/maintenanceApi";
import { useSectorsHook } from "@/features/sectors/hooks/useSectorsHook";

export const MaintenanceList = () => {
  const user = useAuthStore((state) => state.user);
  const isReadOnly = user?.role === "researcher";

  const { data: technicians = [] } = useTechnicians();
  const { equipments = [] } = useEquipments();
  const { data: sectors = [] } = useSectorsHook();

  // Pegando filtros da store Zustand
  const {
    typeFilter,
    statusFilter,
    assignedToFilter: assignedToFilterFromStore,
    maintenanceRequests,
    setMaintenanceRequests,
  } = useMaintenanceStore();

  // React Query hook para carregar dados da API, usado APENAS para carregar na montagem
  const { data: maintenanceApiData, isLoading } = useMaintenanceList();

  const updateMaintenance = useUpdateMaintenance();

  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const assignedToFilter =
    user?.role === "technician" ? user.id : assignedToFilterFromStore;

  // Ao montar o componente, popula a store com dados da API (uma vez só)
  useEffect(() => {
    if (maintenanceApiData && maintenanceApiData.length > 0) {
      setMaintenanceRequests(maintenanceApiData);
    }
  }, [maintenanceApiData, setMaintenanceRequests]);

  // Aplica filtros na lista da store
  const filteredRequests = maintenanceRequests.filter((item) => {
    return (
      (!typeFilter || item.type === typeFilter) &&
      (!statusFilter || item.status === statusFilter) &&
      (assignedToFilter === null || item.assignedTo === assignedToFilter)
    );
  });

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

  const getEquipmentName = (id: number | null | undefined) => {
    if (!id) return "-";
    const eq = equipments.find((e) => e.id === id);
    return eq ? `${eq.name} (${eq.code})` : "Desconhecido";
  };

  const getSectorName = (id: number | null | undefined) => {
    if (!id) return "-";
    const sector = sectors.find((s) => s.id === id);
    return sector ? sector.name : "Desconhecido";
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

  return (
    <div className={styles.listContainer}>
      {filteredRequests.length === 0 ? (
        <p>Nenhum chamado encontrado com os filtros atuais.</p>
      ) : (
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
              onClick={() => {
                if (!isReadOnly) openModal(item);
              }}
              role={isReadOnly ? undefined : "button"}
              tabIndex={isReadOnly ? -1 : 0}
              onKeyDown={(e) => {
                if (!isReadOnly && (e.key === "Enter" || e.key === " ")) {
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
                <strong>
                  {item.priority === "high"
                    ? "Alta"
                    : item.priority === "medium"
                    ? "Média"
                    : "Baixa"}
                </strong>
              </p>

              <p>
                Tipo:{" "}
                <strong>
                  {item.type === "corrective" ? "Corretiva" : "Preventiva"}
                </strong>
              </p>

              <p>
                Setor: <strong>{getSectorName(item.sectorId)}</strong>
              </p>

              {item.relatedTo === "equipment" && (
                <p>
                  Equipamento:{" "}
                  <strong>{getEquipmentName(item.equipmentId)}</strong>
                </p>
              )}

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
      )}

      {!isReadOnly && isModalOpen && selectedRequest && (
        <MaintenanceAgentEditModal
          maintenance={selectedRequest}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
