import { render, screen } from "@testing-library/react";
import MaintenanceHistory from "../MaintenanceHistory";

// Mock do hook useMaintenanceHistory
jest.mock("../../hooks/useMaintenanceHistory", () => ({
  __esModule: true,
  useMaintenanceHistory: () => ({
    maintenances: [],
    totalMaintenances: 0,
    isLoading: false,
    currentPage: 1,
    maintenancesPerPage: 10,
    paginate: jest.fn(),
  }),
}));

describe("MaintenanceHistory component", () => {
  it("renderiza a tabela de histórico de manutenções na tela", () => {
    render(<MaintenanceHistory />);

    // Verifica os headers da tabela
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Descrição")).toBeInTheDocument();
    expect(screen.getByText("Tipo")).toBeInTheDocument();
    expect(screen.getByText("Data Conclusão")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });
});
