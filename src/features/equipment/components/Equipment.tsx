import React, { useMemo, useCallback } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEquipmentActions } from "../store/useEquipmentActions";
import useEquipments from "../store/useEquipments";
import styles from "./EquipmentList.module.scss";
import EditEquipmentModal from "./EditModal/EditEquipmentModal";
import ConfirmModal from "./ConfirmModal/ConfirmModal";
import EquipmentListSkeleton from "./Skeleton/EquipmentListSkeleton";
import { useEquipmentStore } from "../store/useEquipmentStore";
import { useNavigate } from "react-router-dom";
import { GenericFilterBar } from "@/components/FilterBar/GenericFilterBar";
import Pagination from "@/components/Pagination/Pagination";
import type { Equipment } from "../types/Equipment";
import { useSectorsHook } from "@/features/sectors/hooks/useSectorsHook";

const Equipments = () => {
  const {
    equipments,
    totalEquipments,
    isLoading,
    currentPage,
    equipmentsPerPage,
    paginate,
  } = useEquipments();

  const {
    selectedEquipment,
    isEditOpen,
    isDeleteOpen,
    openEdit,
    closeEdit,
    openDelete,
    closeDelete,
    confirmEdit,
    confirmDelete,
  } = useEquipmentActions();

  const { data: sectors = [] } = useSectorsHook();

  const { filter, setFilter } = useEquipmentStore();
  const navigate = useNavigate();

  const formatDate = useCallback((dateStr?: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR");
  }, []);

  const sectorsMap = useMemo(() => {
    const map = new Map<number, string>();
    sectors.forEach(({ id, name }) => {
      map.set(id, name);
    });
    return map;
  }, [sectors]);

  const handleEditClick = useCallback(
    (equipment: Equipment) => () => openEdit(equipment),
    [openEdit]
  );

  const handleDeleteClick = useCallback(
    (equipment: Equipment) => () => openDelete(equipment),
    [openDelete]
  );

  const renderMobileList = useMemo(
    () => (
      <div className={styles.mobileList} role="list">
        {equipments.map((equipment) => (
          <div
            key={equipment.id}
            className={styles.mobileListItem}
            role="listitem"
            tabIndex={0} // permite foco via teclado, se fizer sentido
          >
            <p>
              <strong>Nome:</strong> {equipment.name}
            </p>
            <p>
              <strong>Código:</strong> {equipment.code}
            </p>
            <p>
              <strong>Modelo:</strong> {equipment.model || "-"}
            </p>
            <p>
              <strong>Setor:</strong>{" "}
              {sectorsMap.get(equipment.sectorId) || "-"}
            </p>
            <p>
              <strong>Próxima Preventiva:</strong>{" "}
              {formatDate(equipment.nextPreventiveDate)}
            </p>
            <div className={styles.mobileActions}>
              <button
                type="button"
                className={styles.editBtn}
                onClick={handleEditClick(equipment)}
                aria-label={`Editar equipamento ${equipment.name}`}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={handleDeleteClick(equipment)}
                aria-label={`Excluir equipamento ${equipment.name}`}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    ),
    [equipments, formatDate, handleEditClick, handleDeleteClick, sectorsMap]
  );

  if (isLoading) return <EquipmentListSkeleton />;

  return (
    <>
      <GenericFilterBar
        value={filter}
        onChange={setFilter}
        placeholder="Filtrar equipamentos"
        aria-label="Filtro para equipamentos"
      >
        <button
          type="button"
          onClick={() => navigate("/equipamentos/novo")}
          aria-label="Criar novo equipamento"
          title="Criar novo equipamento"
        >
          + Novo Equipamento
        </button>
      </GenericFilterBar>
      <div className={styles.content_equipments}>
        {equipments.length === 0 && <p>Nenhum equipamento encontrado</p>}

        <table
          className={styles.desktopTable}
          aria-label="Lista de equipamentos"
        >
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Código</th>
              <th scope="col">Modelo</th>
              <th scope="col">Setor</th>
              <th scope="col">Próxima Preventiva</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {equipments.map((equipment) => (
              <tr key={equipment.id}>
                <td>{equipment.name}</td>
                <td>{equipment.code}</td>
                <td>{equipment.model || "-"}</td>
                <td>{sectorsMap.get(equipment.sectorId) || "-"}</td>
                <td>{formatDate(equipment.nextPreventiveDate)}</td>
                <td className={styles.actions}>
                  <button
                    type="button"
                    className={styles.editBtn}
                    onClick={handleEditClick(equipment)}
                    aria-label={`Editar equipamento ${equipment.name}`}
                  >
                    <FaEdit />
                  </button>
                  <button
                    type="button"
                    className={styles.deleteBtn}
                    onClick={handleDeleteClick(equipment)}
                    aria-label={`Excluir equipamento ${equipment.name}`}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {renderMobileList}

        <Pagination
          currentPage={currentPage}
          itemsPerPage={equipmentsPerPage}
          totalItems={totalEquipments}
          paginate={paginate}
        />

        <ConfirmModal
          isOpen={isDeleteOpen}
          title="Excluir Equipamento"
          message={`Tem certeza que deseja excluir o equipamento "${selectedEquipment?.name}"?`}
          onConfirm={confirmDelete}
          onCancel={closeDelete}
        />

        <EditEquipmentModal
          isOpen={isEditOpen}
          onClose={closeEdit}
          equipment={selectedEquipment}
          onSave={confirmEdit}
          sectors={sectors}
        />
      </div>
    </>
  );
};

export default React.memo(Equipments);
