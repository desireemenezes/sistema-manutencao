import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { getUsers, createUser, updateUser, deleteUser } from "../api/users";
import type { User } from "@/types/Auth";
import { useUserStore } from "./userStore";

const useUsers = () => {
  const {
    users,
    setUsers,
    filter,
    setFilter,
    currentPage,
    usersPerPage,
    setCurrentPage,
    addUser,
    updateUserLocal,
    deleteUserLocal,
  } = useUserStore();

  const queryClient = useQueryClient();

  // Carrega os usuários da API, mas só quando o estado local estiver vazio
  const { isLoading, error } = useQuery<User[]>(["users"], getUsers, {
    staleTime: 5 * 60 * 1000,
    onSuccess: (data) => {
      if (users.length === 0) {
        setUsers(data); // Preenche o estado local apenas se estiver vazio
      }
    },
    enabled: users.length === 0, // Executa a query apenas se não houver usuários locais
  });

  // Filtragem e paginação local em Zustand
  const normalizedFilter = filter.trim().toLowerCase();
  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(normalizedFilter) ||
      user.email.toLowerCase().includes(normalizedFilter)
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const paginatedUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Criação otimista (Atualiza o estado local)
  const createMutation = useMutation(createUser, {
    onMutate: (newUser: Omit<User, "id">) => {
      const tempId = Date.now();
      addUser({ ...newUser, id: tempId }); // Adiciona o usuário localmente
    },
    onSuccess: (createdUser: User) => {
      updateUserLocal(createdUser); // Atualiza o usuário na lista local
      toast.success("Usuário criado com sucesso!");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      toast.error("Erro ao criar usuário.");
      queryClient.invalidateQueries(["users"]);
    },
  });

  // Atualização otimista (Atualiza o usuário local)
  const updateMutation = useMutation(updateUser, {
    onMutate: (updatedUser: User) => {
      updateUserLocal(updatedUser); // Atualiza o usuário localmente
    },
    onSuccess: () => {
      toast.success("Usuário atualizado com sucesso!");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      toast.error("Erro ao atualizar usuário.");
      queryClient.invalidateQueries(["users"]);
    },
  });

  // Deleção otimista (Remove o usuário local)
  const deleteMutation = useMutation(deleteUser, {
    onMutate: (id: number) => {
      deleteUserLocal(id); // Remove o usuário localmente
    },
    onSuccess: () => {
      toast.success("Usuário deletado com sucesso!");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      toast.error("Erro ao excluir usuário.");
      queryClient.invalidateQueries(["users"]);
    },
  });

  const paginate = (page: number) => setCurrentPage(page);

  return {
    users: paginatedUsers,
    totalUsers: filteredUsers.length,
    isLoading,
    error,
    createUser: createMutation.mutate,
    updateUser: updateMutation.mutate,
    deleteUser: deleteMutation.mutate,
    filter,
    setFilter,
    currentPage,
    usersPerPage,
    paginate,
  };
};

export default useUsers;
