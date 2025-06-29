import { api } from "@/lib/api";
import type { Maintenance } from "../Maintenance";

export const getMaintenanceRequests = async (): Promise<Maintenance[]> => {
  const response = await api.get("/maintenanceRequests");
  return response.data; // Certifique-se de que 'data' está sendo retornado como um array de manutenções
};
