import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ContentDash } from "../ContentDash";

const queryClient = new QueryClient();

jest.mock("@/api/maintenanceApi", () => ({
  useMaintenanceList: () => ({
    data: [
      { id: 1, title: "Chamado 1", status: "aberto", assignedTo: 1 },
      { id: 2, title: "Chamado 2", status: "em andamento", assignedTo: 1 },
      { id: 3, title: "Chamado 3", status: "concluido", assignedTo: 2 },
    ],
    isLoading: false,
  }),
  useMaintenanceStats: () => ({
    openRequests: [{ id: 1 }],
    inProgressRequests: [{ id: 2 }],
    completedRequests: [{ id: 3 }],
    isLoading: false,
  }),
}));

jest.mock("@/api/useTechnicians", () => ({
  useTechnicians: () => ({
    data: [
      { id: 1, fullName: "Técnico 1" },
      { id: 2, fullName: "Técnico 2" },
    ],
    isLoading: false,
  }),
}));

describe("ContentDash", () => {
  it("deve renderizar a tela de dashboard", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ContentDash />
      </QueryClientProvider>
    );

    await waitFor(() => screen.getByText("Tipos de Manutenção"));
    await waitFor(() => screen.getByText("Agentes"));

    expect(screen.getByText("Tipos de Manutenção")).toBeInTheDocument();
    expect(screen.getByText("Agentes")).toBeInTheDocument();
  });
});
