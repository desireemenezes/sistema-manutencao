import { render } from "@testing-library/react";
import Equipments from "../../components/Equipment";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";

// Criar uma instância do QueryClient
const queryClient = new QueryClient();

describe("Equipments component", () => {
  it("deve renderizar o componente sem erros", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Equipments />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(document.body).toBeInTheDocument();
  });
});
