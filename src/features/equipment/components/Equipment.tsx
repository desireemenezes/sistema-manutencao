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

  const { filter, setFilter } = useEquipmentStore();
  const navigate = useNavigate();

  if (isLoading) return <EquipmentListSkeleton />;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR");
  };

  const renderMobileList = () => (
    <div className={styles.mobileList}>
      {equipments.map((equipment) => (
        <div key={equipment.id} className={styles.mobileListItem}>
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
            <strong>Próxima Preventiva:</strong>{" "}
            {formatDate(equipment.nextPreventiveDate)}
          </p>
          <div className={styles.mobileActions}>
            <button
              className={styles.editBtn}
              onClick={() => openEdit(equipment)}
              aria-label={`Editar equipamento ${equipment.name}`}
            >
              <FaEdit />
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => openDelete(equipment)}
              aria-label={`Excluir equipamento ${equipment.name}`}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <GenericFilterBar
        value={filter}
        onChange={setFilter}
        placeholder="Filtrar equipamentos"
      >
        <button onClick={() => navigate("/equipamentos/novo")}>
          + Novo Equipamento
        </button>
      </GenericFilterBar>
      <div className={styles.content_equipments}>
        {equipments.length === 0 && <p>Nenhum equipamento encontrado</p>}

        <table className={styles.desktopTable}>
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
            {equipments.map((equipment) => (
              <tr key={equipment.id}>
                <td>{equipment.name}</td>
                <td>{equipment.code}</td>
                <td>{equipment.model || "-"}</td>
                <td>{formatDate(equipment.nextPreventiveDate)}</td>
                <td className={styles.actions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => openEdit(equipment)}
                    aria-label={`Editar equipamento ${equipment.name}`}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => openDelete(equipment)}
                    aria-label={`Excluir equipamento ${equipment.name}`}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {renderMobileList()}

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
        />
      </div>
    </>
  );
};

export default Equipments;
