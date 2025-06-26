import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-wrapper">
      <Header />
      <div className="layout-body">
        <Sidebar />
        <main
          tabIndex={-1}
          aria-label="Conteúdo principal"
          className="main-content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
