import { api } from "@/lib/api";
import type { Equipment } from "../types/Equipment";

const getEquipments = async (): Promise<Equipment[]> => {
  const response = await api.get("/equipments");
  return response.data;
};

const createEquipment = async (
  input: Omit<Equipment, "id">
): Promise<Equipment> => {
  const response = await api.post("/equipments", input);
  return response.data;
};

const updateEquipment = async (input: Equipment): Promise<Equipment> => {
  const response = await api.put(`/equipments/${input.id}`, input);
  return response.data;
};

const deleteEquipment = async (id: number): Promise<void> => {
  await api.delete(`/equipments/${id}`);
};

export { getEquipments, createEquipment, updateEquipment, deleteEquipment };
