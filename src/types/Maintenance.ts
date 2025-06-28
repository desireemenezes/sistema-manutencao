export interface PartUsed {
  name: string;
  quantity: number;
}

export type MaintenanceType = "corrective" | "preventive";

export type MaintenanceStatus = "open" | "in_progress" | "completed";

export type RelatedTo = "equipment" | "location";

export interface MaintenanceRequest {
  id: number;
  type: MaintenanceType;
  description: string;
  priority: "low" | "medium" | "high";
  status: MaintenanceStatus;
  relatedTo: RelatedTo;
  equipmentId?: number;
  sectorId: number;
  assignedTo?: number; // agente (userId)
  requesterId: number; // <-- adiciona aqui o campo requesterId
  completionDate?: string | null;
  completionNotes?: string | null;
  partsUsed: PartUsed[];
}

export type CreateMaintenanceRequest = {
  type: "" | MaintenanceType;
  priority: "" | "low" | "medium" | "high";
  description: string;
  relatedTo: RelatedTo;
  sectorId: number | "";
  equipmentId?: number | "";
  assignedTo: number | null;
  requesterId: number; // se necessário para criar
};
