import { FaEdit, FaTrash } from "react-icons/fa";
import styles from "./SectorList.module.scss";
import useSectors from "../store/useSectors";
import { useSectorActions } from "../store/useSectorActions";
import type { Sector } from "../types/Sector";
import { EditSectorModal } from "./EditModal/EditSectorModal";
import DeleteSectorModal from "./DeleteModal/DeleteSectorModal";
import CreateSectorForm from "./CreateForm/CreateSectorForm";
import SectorListSkeleton from "./Skeleton/Skeleton";
import { useSectorStore } from "../store/useSectorStore";
import { GenericFilterBar } from "@/components/FilterBar/GenericFilterBar";
import Pagination from "@/components/Pagination/Pagination";

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
            >
              <FaEdit aria-hidden="true" />
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => openDelete(sector)}
              aria-label={`Excluir setor ${sector.name}`}
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
        <CreateSectorForm onCreate={createSector} />

        {sectors.length === 0 ? (
          renderEmptyMessage
        ) : (
          <>
            {/* Tabela Desktop */}
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
                      >
                        <FaEdit aria-hidden="true" />
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => openDelete(sector)}
                        aria-label={`Excluir setor ${sector.name}`}
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
            />
          </>
        )}

        {isEditOpen && selectedSector && (
          <EditSectorModal
            sector={selectedSector}
            onClose={closeEdit}
            onSave={confirmEdit}
          />
        )}

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
