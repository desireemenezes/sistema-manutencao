import styles from "./UserList.module.scss";
import useUsers from "../../hooks/useUsers";
import { useUserActions } from "../../hooks/useUserActions";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import EditUserModal from "../EditModal/EditUserModal";
import UserListSkeleton from "../Skeleton/UserListSkeleton";
import { useUserStore } from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import { GenericFilterBar } from "@/components/FilterBar/GenericFilterBar";
import Pagination from "@/components/Pagination/Pagination";

// Mapeamento para nomes amigáveis dos perfis
const roleLabels: Record<string, string> = {
  manager: "Admin",
  technician: "Técnico",
  researcher: "Pesquisador",
};

const Users = () => {
  const { users, totalUsers, isLoading, currentPage, usersPerPage, paginate } =
    useUsers();

  const {
    selectedUser,
    isEditOpen,
    isDeleteOpen,
    openEdit,
    closeEdit,
    openDelete,
    closeDelete,
    confirmEdit,
    confirmDelete,
  } = useUserActions();

  const { filter, setFilter } = useUserStore();
  const navigate = useNavigate();

  if (isLoading) return <UserListSkeleton />;

  const renderMobileList = () => (
    <div className={styles.mobileList}>
      {users.map((user) => (
        <div key={user.id} className={styles.mobileListItem}>
          <p>
            <strong>Nome:</strong> {user.fullName}
          </p>
          <p>
            <strong>E-mail:</strong> {user.email}
          </p>
          <p>
            <strong>Perfil:</strong> {roleLabels[user.role] || user.role}
          </p>
          <div className={styles.mobileActions}>
            <button
              className={styles.editBtn}
              onClick={() => openEdit(user)}
              aria-label={`Editar usuário ${user.fullName}`}
            >
              <FaEdit />
            </button>
            <button
              className={styles.deleteBtn}
              onClick={() => openDelete(user)}
              aria-label={`Excluir usuário ${user.fullName}`}
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
        placeholder="Filtrar usuários"
      >
        <button onClick={() => navigate("/usuarios/novo")}>
          + Novo Usuário
        </button>
      </GenericFilterBar>
      <div className={styles.content_users}>
        {users.length === 0 && <p>Nenhum usuário encontrado</p>}

        {/* Tabela para desktop */}
        <table className={styles.desktopTable}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Perfil</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>{roleLabels[user.role] || user.role}</td>
                <td className={styles.actions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => openEdit(user)}
                    aria-label={`Editar usuário ${user.fullName}`}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => openDelete(user)}
                    aria-label={`Excluir usuário ${user.fullName}`}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Lista para mobile */}
        {renderMobileList()}

        <Pagination
          currentPage={currentPage}
          itemsPerPage={usersPerPage}
          totalItems={totalUsers}
          paginate={paginate}
        />

        <ConfirmModal
          isOpen={isDeleteOpen}
          message="Tem certeza que deseja excluir este usuário?"
          onConfirm={confirmDelete}
          onCancel={closeDelete}
        />

        <EditUserModal
          isOpen={isEditOpen}
          onClose={closeEdit}
          user={selectedUser}
          onSave={confirmEdit}
        />
      </div>
    </>
  );
};

export default Users;
