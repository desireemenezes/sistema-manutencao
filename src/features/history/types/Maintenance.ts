export interface Maintenance {
  id: number;
  description: string;
  type: "corrective" | "preventive";
  priority: string;
  status: "open" | "in_progress" | "completed";
  relatedTo: "equipment" | "sector";
  equipmentId: number;
  sectorId: number;
  assignedTo: number;
  completionDate: string | null;
  completionNotes: string | null;
  partsUsed: Array<{ name: string; quantity: number }>;
}
