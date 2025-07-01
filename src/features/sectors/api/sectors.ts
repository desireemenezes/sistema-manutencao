import { api } from "@/lib/api";
import type { Sector } from "../types/Sector";

// Função para buscar setores
const getSectors = async (): Promise<Sector[]> => {
  const response = await api.get<Sector[]>("/sectors");
  return response.data;
};

// Função para criar setor (enviado para API, mas manipulando localmente)
const createSector = async (input: Omit<Sector, "id">): Promise<Sector> => {
  const response = await api.post("/sectors", input);
  return response.data; // Retorna a resposta da API (dados criados)
};

// Função para atualizar setor (enviado para API, mas manipulando localmente)
const updateSector = async (input: Sector): Promise<Sector> => {
  const response = await api.put(`/sectors/${input.id}`, input);
  return response.data; // Retorna a resposta da API (dados atualizados)
};

// Função para excluir setor (enviado para API, mas manipulando localmente)
const deleteSector = async (id: number): Promise<void> => {
  await api.delete(`/sectors/${id}`);
};

export { getSectors, createSector, updateSector, deleteSector };
