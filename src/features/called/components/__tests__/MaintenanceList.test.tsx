import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MaintenanceList } from "../MaintenanceList";

const queryClient = new QueryClient();

jest.mock("@/api/useTechnicians", () => ({
  useTechnicians: () => ({
    data: [
      { id: 1, fullName: "Técnico 1" },
      { id: 2, fullName: "Técnico 2" },
    ],
    isLoading: false,
  }),
}));

const mockedUseMaintenanceList = jest.fn();
const mockedUseUpdateMaintenance = jest.fn(() => ({
  mutate: jest.fn(),
}));

jest.mock("@/api/maintenanceApi", () => ({
  useMaintenanceList: () => mockedUseMaintenanceList(),
  useUpdateMaintenance: () => mockedUseUpdateMaintenance(),
}));

describe("MaintenanceList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar a lista de chamados", async () => {
    mockedUseMaintenanceList.mockReturnValue({
      data: [
        { id: 1, description: "Chamado 1", status: "open", assignedTo: 1 },
        {
          id: 2,
          description: "Chamado 2",
          status: "in_progress",
          assignedTo: 1,
        },
        { id: 3, description: "Chamado 3", status: "completed", assignedTo: 2 },
      ],
      isLoading: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MaintenanceList />
      </QueryClientProvider>
    );

    expect(await screen.findByText("Chamado 1")).toBeInTheDocument();
    expect(await screen.findByText("Chamado 2")).toBeInTheDocument();
    expect(await screen.findByText("Chamado 3")).toBeInTheDocument();
  });

  it("deve renderizar o skeleton quando está carregando", async () => {
    mockedUseMaintenanceList.mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MaintenanceList />
      </QueryClientProvider>
    );

    await waitFor(() => {
      const skeletons = screen.getAllByRole("listitem");
      expect(skeletons.length).toBeGreaterThan(0); // ou 5, se fixo
    });
  });

  it("deve renderizar a mensagem de nenhum chamado encontrado", async () => {
    mockedUseMaintenanceList.mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MaintenanceList />
      </QueryClientProvider>
    );

    expect(
      await screen.findByText(
        "Nenhum chamado encontrado com os filtros atuais."
      )
    ).toBeInTheDocument();
  });
});
