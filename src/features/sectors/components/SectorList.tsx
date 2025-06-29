import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import styles from "./SectorList.module.scss"; // importe o módulo CSS
import useSectors from "../store/useSectors";
import { useSectorActions } from "../store/useSectorActions";
import type { Sector } from "../types/Sector";
import { EditSectorModal } from "./EditModal/EditSectorModal";
import { SectorFilter } from "./FilterContainer/SectorFilter";
import Pagination from "./Pagination/Pagination";
import DeleteSectorModal from "./DeleteModal/DeleteSectorModal";
import CreateSectorForm from "./CreateForm/CreateSectorForm";
import SectorListSkeleton from "./Skeleton/Skeleton";

const SectorList = () => {
  const {
    sectors,
    totalSectors,
    isLoading,
    currentPage,
    sectorsPerPage,
    paginate,
    createSector,
  } = useSectors();

  const {
    selectedSector,
    isEditOpen,
    isDeleteOpen,
    openEdit,
    closeEdit,
    openDelete,
    closeDelete,
    confirmEdit,
    confirmDelete,
  } = useSectorActions();

  if (isLoading) return <SectorListSkeleton />;

  // Função para renderizar lista mobile
  const renderMobileList = () => (
    <div className={styles.mobileList}>
      {sectors.map((sector: Sector) => (
        <div key={sector.id} className={styles.mobileListItem}>
          <p>
            <strong>Nome:</strong> {sector.name}
          </p>
          <p>
            <strong>Categoria:</strong> {sector.category || "-"}
          </p>
          <div className={styles.mobileActions}>
            <button
              className={styles.editBtn}
              onClick={() => openEdit(sector)}
              aria-label={`Editar setor ${sector.name}`}
            >
              <FaEdit />
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => openDelete(sector)}
              aria-label={`Excluir setor ${sector.name}`}
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
      <SectorFilter />
      <div className={styles.content_sectors}>
        {/* Criar setor */}
        <CreateSectorForm onCreate={createSector} />

        {/* Tabela desktop */}
        <table className={styles.desktopTable}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {sectors.length === 0 && (
              <tr>
                <td colSpan={3} style={{ textAlign: "center" }}>
                  Nenhum setor encontrado.
                </td>
              </tr>
            )}
            {sectors.map((sector: Sector) => (
              <tr key={sector.id}>
                <td>{sector.name}</td>
                <td>{sector.category || "-"}</td>
                <td className={styles.actions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => openEdit(sector)}
                    aria-label={`Editar setor ${sector.name}`}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => openDelete(sector)}
                    aria-label={`Excluir setor ${sector.name}`}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Lista mobile */}
        {renderMobileList()}

        {/* Paginação */}
        <Pagination
          currentPage={currentPage}
          itemsPerPage={sectorsPerPage}
          totalItems={totalSectors}
          paginate={paginate}
        />

        {/* Modal de edição */}
        {isEditOpen && selectedSector && (
          <EditSectorModal
            sector={selectedSector}
            onClose={closeEdit}
            onSave={confirmEdit}
          />
        )}

        {/* Modal de exclusão */}
        {isDeleteOpen && selectedSector && (
          <DeleteSectorModal
            isOpen={isDeleteOpen}
            title="Excluir Setor"
            message={`Tem certeza que deseja excluir o setor "${selectedSector.name}"?`}
            onConfirm={confirmDelete}
            onCancel={closeDelete}
          />
        )}
      </div>
    </>
  );
};

export default SectorList;
