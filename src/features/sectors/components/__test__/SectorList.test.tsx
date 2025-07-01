import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SectorList from "../SectorList";
import useSectors from "../../hooks/useSectors";

jest.mock("../../hooks/useSectors");

const useSectorsMock = useSectors as jest.MockedFunction<typeof useSectors>;

describe("SectorList component", () => {
  it("should render the sector list when sectors are available", () => {
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
      createSectorHandler: jest.fn(),
      updateSectorHandler: jest.fn(),
      deleteSectorHandler: jest.fn(),
    }));

    render(
      <MemoryRouter>
        <SectorList />
      </MemoryRouter>
    );

    // Usar getAllByText para verificar se o texto "Setor 1" aparece mais de uma vez
    const sectors = screen.getAllByText("Setor 1");
    expect(sectors.length).toBeGreaterThan(0); // Garante que há pelo menos um setor renderizado
  });
});
