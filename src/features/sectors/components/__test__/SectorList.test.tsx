import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SectorList from "../SectorList";
import useSectors from "../../store/useSectors";
import { useSectorActions } from "../../store/useSectorActions";

jest.mock("../../store/useSectors");
jest.mock("../../store/useSectorActions");

const useSectorsMock = useSectors as jest.MockedFunction<typeof useSectors>;
const useSectorActionsMock = useSectorActions as jest.MockedFunction<
  typeof useSectorActions
>;

const sectorActionsMock = {
  selectedSector: null,
  isEditOpen: false,
  isDeleteOpen: false,
  openEdit: jest.fn(),
  closeEdit: jest.fn(),
  openDelete: jest.fn(),
  closeDelete: jest.fn(),
  confirmEdit: jest.fn(),
  confirmDelete: jest.fn(),
  confirmCreate: jest.fn(), // Adicionado confirmCreate
};

describe("SectorList component", () => {
  beforeEach(() => {
    useSectorActionsMock.mockImplementation(() => sectorActionsMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the sector table when sectors are available", () => {
    useSectorsMock.mockImplementation(() => ({
      sectors: [{ id: 1, name: "Setor 1", category: "Categoria 1" }],
      totalSectors: 1,
      isLoading: false,
      error: null,
      filter: "",
      setFilter: jest.fn(),
      currentPage: 1,
      sectorsPerPage: 10,
      paginate: jest.fn(),
      createSector: jest.fn(),
      updateSector: jest.fn(), // Adicionado updateSector
      deleteSector: jest.fn(), // Adicionado deleteSector
    }));

    render(
      <MemoryRouter>
        <SectorList />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("columnheader", { name: "Nome" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Categoria" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Ações" })
    ).toBeInTheDocument();
  });

  it("should display a message when no sectors are found", () => {
    useSectorsMock.mockImplementation(() => ({
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
      updateSector: jest.fn(), // Adicionado updateSector
      deleteSector: jest.fn(), // Adicionado deleteSector
    }));

    render(
      <MemoryRouter>
        <SectorList />
      </MemoryRouter>
    );

    expect(screen.getByText("Nenhum setor encontrado.")).toBeInTheDocument();
  });
});
