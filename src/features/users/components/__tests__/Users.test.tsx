import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Users from "../UserList";

// Mock dos hooks utilizados no componente
jest.mock("../../hooks/useUsers", () => ({
  __esModule: true,
  default: () => ({
    users: [],
    totalUsers: 0,
    isLoading: false,
    currentPage: 1,
    usersPerPage: 10,
    paginate: jest.fn(),
  }),
}));

jest.mock("../../hooks/useUserActions", () => ({
  __esModule: true,
  useUserActions: () => ({
    selectedUser: null,
    isEditOpen: false,
    isDeleteOpen: false,
    openEdit: jest.fn(),
    closeEdit: jest.fn(),
    openDelete: jest.fn(),
    closeDelete: jest.fn(),
    confirmEdit: jest.fn(),
    confirmDelete: jest.fn(),
  }),
}));

describe("Users component", () => {
  it("renderiza a tabela de usuários na tela", () => {
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("E-mail")).toBeInTheDocument();
    expect(screen.getByText("Perfil")).toBeInTheDocument();
    expect(screen.getByText("Ações")).toBeInTheDocument();
  });
});
