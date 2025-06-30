import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ContentDash } from "../ContentDash";

// Mock do ResizeObserver para evitar erro no jsdom
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// 🧪 Mock do Recharts: evita warning de width/height no teste
jest.mock("recharts", () => {
  const original = jest.requireActual("recharts");
  return {
    ...original,
    ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  };
});

// 🧪 Mock dos hooks
jest.mock("../../hooks/useMaintenanceStats", () => ({
  useMaintenanceStats: () => ({
    openRequests: [{ id: 1 }],
    inProgressRequests: [{ id: 2 }, { id: 3 }],
    completedRequests: [{ id: 4 }],
    isLoading: false,
  }),
}));

jest.mock("../../hooks/useMaintenanceTypesChartData", () => ({
  useMaintenanceTypesChartData: () => [
    { type: "Preventiva", count: 3 },
    { type: "Corretiva", count: 5 },
  ],
}));

jest.mock("../../hooks/useAgentRequestsChartData", () => ({
  useAgentRequestsChartData: () => [
    { agent: "João", count: 4 },
    { agent: "Maria", count: 2 },
  ],
}));

const queryClient = new QueryClient();

describe("ContentDash", () => {
  it("deve renderizar os contadores e gráficos corretamente", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ContentDash />
      </QueryClientProvider>
    );

    expect(await screen.findByText("Abertos: 1")).toBeInTheDocument();
    expect(await screen.findByText("Em andamento: 2")).toBeInTheDocument();
    expect(await screen.findByText("Concluídos: 1")).toBeInTheDocument();

    expect(
      screen.getByLabelText("Gráfico de Tipos de Manutenção")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Gráfico de Chamados por Agentes")
    ).toBeInTheDocument();
  });
});
