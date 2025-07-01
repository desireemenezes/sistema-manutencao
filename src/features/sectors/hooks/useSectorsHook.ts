import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getSectors,
  createSector,
  updateSector,
  deleteSector,
} from "../api/sectors";

export const useSectorsHook = () => {
  return useQuery(["sectors"], getSectors);
};

export const useCreateSector = () => {
  const queryClient = useQueryClient();
  return useMutation(createSector, {
    onSuccess: () => {
      queryClient.invalidateQueries(["sectors"]);
    },
  });
};

export const useUpdateSector = () => {
  const queryClient = useQueryClient();
  return useMutation(updateSector, {
    onSuccess: () => {
      queryClient.invalidateQueries(["sectors"]);
    },
  });
};

export const useDeleteSector = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteSector, {
    onSuccess: () => {
      queryClient.invalidateQueries(["sectors"]);
    },
  });
};
