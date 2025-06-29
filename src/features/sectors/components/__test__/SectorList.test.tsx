import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SectorList from "../SectorList";

// Mock dos hooks
jest.mock("../../store/useSectors", () => ({
  __esModule: true,
  default: () => ({
    sectors: [],
    totalSectors: 0,
    isLoading: false,
    error: null,
    filter: "",
    setFilter: jest.fn(),
    currentPage: 1,
    sectorsPerPage: 10,
    paginate: jest.fn(),
    createSector: jest.fn(),
  }),
}));

jest.mock("../../store/useSectorActions", () => ({
  __esModule: true,
  useSectorActions: () => ({
    selectedSector: null,
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

describe("SectorList component", () => {
  it("renderiza a tabela de setores na tela", () => {
    render(
      <MemoryRouter>
        <SectorList />
      </MemoryRouter>
    );

    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Categoria")).toBeInTheDocument();
    expect(screen.getByText("Ações")).toBeInTheDocument();
  });
});
