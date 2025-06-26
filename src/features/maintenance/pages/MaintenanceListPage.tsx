import { MaintenanceFilters } from "../components/MaintenanceFilters";
import { MaintenanceList } from "../components/MaintenanceList";

export const MaintenanceListPage = () => {
  return (
    <div>
      <MaintenanceFilters />
      <MaintenanceList />
    </div>
  );
};
