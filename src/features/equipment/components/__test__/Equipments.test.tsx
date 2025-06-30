import { render, screen } from "@testing-library/react";
import Equipments from "../Equipment";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

// Crie um QueryClient
const queryClient = new QueryClient();

// Mock dos hooks utilizados no componente
jest.mock("../../store/useEquipments", () => ({
  __esModule: true,
  default: () => ({
    equipments: [],
    totalEquipments: 0,
    isLoading: false,
    currentPage: 1,
    equipmentsPerPage: 10,
    paginate: jest.fn(),
  }),
}));

jest.mock("../../store/useEquipmentActions", () => ({
  __esModule: true,
  useEquipmentActions: () => ({
    selectedEquipment: null,
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

describe("Equipments component", () => {
  it("renderiza a tabela de equipamentos na tela", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Equipments />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Verifica os headers da tabela
    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Código")).toBeInTheDocument();
    expect(screen.getByText("Modelo")).toBeInTheDocument();
    expect(screen.getByText("Próxima Preventiva")).toBeInTheDocument();
    expect(screen.getByText("Ações")).toBeInTheDocument();
  });
});
