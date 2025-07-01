import { useQuery } from "react-query";
import { getSectors } from "../api/sectors";

export const useSectorsHook = () => {
  return useQuery(["sectors"], getSectors);
};
