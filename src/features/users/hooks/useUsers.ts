import { useQuery, useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify"; // import do toast
import { getUsers, createUser } from "../api/users";
import { useUserStore } from "../store/userStore";
import type { User } from "@/types/Auth";

const useUsers = () => {
  const { filter, currentPage, usersPerPage, setCurrentPage } = useUserStore();
  const queryClient = useQueryClient();

  // Apenas busca os usuários uma vez e mantém em cache
  const {
    data: allUsers,
    isLoading,
    error,
  } = useQuery<User[]>(["users"], getUsers, {
    staleTime: 5 * 60 * 1000, // cache por 5 minutos
    keepPreviousData: true,
  });

  // Filtragem e paginação locais
  const normalizedFilter = filter.toLowerCase();

  const filteredUsers =
    allUsers?.filter(
      (user) =>
        user.fullName.toLowerCase().includes(normalizedFilter) ||
        user.email.toLowerCase().includes(normalizedFilter)
    ) ?? [];

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const paginatedUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const createMutation = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      toast.success("Usuário criado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar usuário.");
    },
  });

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    users: paginatedUsers,
    totalUsers: filteredUsers.length,
    isLoading,
    error,
    createUser: createMutation.mutate,
    currentPage,
    usersPerPage,
    paginate,
  };
};

export default useUsers;
