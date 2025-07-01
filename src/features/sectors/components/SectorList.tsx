import { FaEdit, FaTrash } from "react-icons/fa";
import styles from "./SectorList.module.scss";

import { EditSectorModal } from "./EditModal/EditSectorModal";
import DeleteSectorModal from "./DeleteModal/DeleteSectorModal";
import CreateSectorForm from "./CreateForm/CreateSectorForm";
import SectorListSkeleton from "./Skeleton/Skeleton";
import { useSectorStore } from "../store/useSectorStore";
import { GenericFilterBar } from "@/components/FilterBar/GenericFilterBar";
import Pagination from "@/components/Pagination/Pagination";
import type { Sector } from "../types/Sector";
import useSectors from "../hooks/useSectors";
import { useSectorActions } from "../hooks/useSectorActions";

const SectorList = () => {
  const {
    sectors,
    totalSectors,
    isLoading,
    currentPage,
    sectorsPerPage,
    paginate,
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
    confirmCreate, // Agora, confirmCreate é acessado aqui
  } = useSectorActions();

  const { filter, setFilter } = useSectorStore();

  if (isLoading) return <SectorListSkeleton />;

  const renderEmptyMessage = (
    <p className={styles.emptyMessage}>Nenhum setor encontrado.</p>
  );

  const renderMobileList = () => (
    <div className={styles.mobileList} role="list">
      {sectors.map((sector: Sector) => (
        <div key={sector.id} className={styles.mobileListItem} role="listitem">
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
              role="button"
            >
              <FaEdit aria-hidden="true" />
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => openDelete(sector)}
              aria-label={`Excluir setor ${sector.name}`}
              role="button"
            >
              <FaTrash aria-hidden="true" />
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
        placeholder="Filtrar setores"
        aria-label="Filtro de setores"
      />

      <div className={styles.content_sectors}>
        <CreateSectorForm onCreate={confirmCreate} />
        {sectors.length === 0 ? (
          renderEmptyMessage
        ) : (
          <>
            <table
              className={styles.desktopTable}
              aria-label="Lista de setores"
            >
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {sectors.map((sector: Sector) => (
                  <tr key={sector.id}>
                    <td>{sector.name}</td>
                    <td>{sector.category || "-"}</td>
                    <td className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => openEdit(sector)}
                        aria-label={`Editar setor ${sector.name}`}
                        role="button"
                      >
                        <FaEdit aria-hidden="true" />
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => openDelete(sector)}
                        aria-label={`Excluir setor ${sector.name}`}
                        role="button"
                      >
                        <FaTrash aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {renderMobileList()}

            <Pagination
              currentPage={currentPage}
              itemsPerPage={sectorsPerPage}
              totalItems={totalSectors}
              paginate={paginate}
              aria-label="Paginação de setores"
            />
          </>
        )}
        {isEditOpen && selectedSector && (
          <EditSectorModal
            sector={selectedSector}
            onClose={closeEdit}
            onSave={confirmEdit}
            aria-label={`Editar setor ${selectedSector.name}`}
          />
        )}
        {isDeleteOpen && selectedSector && (
          <DeleteSectorModal
            isOpen={isDeleteOpen}
            title="Excluir Setor"
            message={`Tem certeza que deseja excluir o setor "${selectedSector.name}"?`}
            onConfirm={confirmDelete}
            onCancel={closeDelete}
            aria-label="Modal de confirmação para excluir setor"
          />
        )}
      </div>
    </>
  );
};

export default SectorList;
