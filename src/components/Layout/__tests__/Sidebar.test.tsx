import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sidebar from "../Sidebar";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mocks
jest.mock("@/hooks/useAuth", () => ({
  useAuth: () => ({
    user: { role: "researcher" },
  }),
}));

const mockCloseSidebar = jest.fn();
jest.mock("@/hooks/useSidebar", () => ({
  useSidebar: () => ({
    isOpen: true,
    closeSidebar: mockCloseSidebar,
  }),
}));

jest.mock("@/utils/useClickOutside", () => ({
  useClickOutside: jest.fn(),
}));

// Mock dos ícones (para evitar erros com renderização SVG)
jest.mock("@/constants/sidebarLinks", () => ({
  SIDEBAR_LINKS_BY_ROLE: {
    researcher: [
      {
        label: "Dashboard",
        to: "/dashboard",
        icon: () => <svg data-testid="icon" />,
      },
      {
        label: "Chamados",
        to: "/chamados",
        icon: () => <svg data-testid="icon" />,
      },
    ],
  },
}));

const renderSidebar = () => {
  render(
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>
  );
};

describe("Sidebar", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve renderizar o menu com os links do perfil 'researcher'", () => {
    renderSidebar();

    expect(
      screen.getByLabelText("Menu de navegação lateral")
    ).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Chamados")).toBeInTheDocument();
  });

  it("deve chamar closeSidebar ao clicar em um link", async () => {
    renderSidebar();

    const user = userEvent.setup();
    const link = screen.getByText("Dashboard");
    await user.click(link);

    expect(mockCloseSidebar).toHaveBeenCalledTimes(1);
  });
});
