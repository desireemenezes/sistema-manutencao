import { api } from "@/lib/api";
import type { Sector } from "../types/Sector";

const getSectors = async (): Promise<Sector[]> => {
  const response = await api.get("/sectors");
  return response.data;
};

const createSector = async (input: Omit<Sector, "id">): Promise<Sector> => {
  const response = await api.post("/sectors", input);
  return response.data;
};

const updateSector = async (input: Sector): Promise<Sector> => {
  const response = await api.put(`/sectors/${input.id}`, input);
  return response.data;
};

const deleteSector = async (id: number): Promise<void> => {
  await api.delete(`/sectors/${id}`);
};

export { getSectors, createSector, updateSector, deleteSector };
