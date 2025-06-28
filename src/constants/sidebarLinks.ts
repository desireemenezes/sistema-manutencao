import React from "react";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaUsers,
  FaIndustry,
  FaCogs,
  FaHistory,
  FaUserCheck,
} from "react-icons/fa";

type IconType = React.ComponentType<
  React.SVGProps<SVGSVGElement> & { title?: string }
>;

interface SidebarLink {
  label: string;
  to: string;
  icon: IconType;
}

export const SIDEBAR_LINKS_BY_ROLE: Record<
  "manager" | "technician" | "researcher",
  SidebarLink[]
> = {
  manager: [
    { label: "Dashboard", to: "/dashboard", icon: FaTachometerAlt },
    { label: "Chamados", to: "/chamados", icon: FaClipboardList },
    { label: "Usuários", to: "/usuarios", icon: FaUsers },
    { label: "Setores", to: "/setores", icon: FaIndustry },
    { label: "Equipamentos", to: "/equipamentos", icon: FaCogs },
    { label: "Histórico", to: "/historico", icon: FaHistory },
  ],
  technician: [
    {
      label: "Chamados Atribuídos",
      to: "/chamados-atribuidos",
      icon: FaUserCheck,
    },
  ],
  researcher: [{ label: "Chamados", to: "/Chamados", icon: FaClipboardList }],
};
