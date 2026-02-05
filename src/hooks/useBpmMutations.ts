import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRow, updateRow, deleteRow, GridRow } from "@/services/bpm.service";

export const useBpmMutations = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation<
    GridRow,                   // TData returned
    Error,                     // TError
    Omit<GridRow, "id">        // TVariables (input)
  >({
    mutationFn: addRow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bpm-list"] });
    },
    onError: (error) => {
      console.error("Error adding row:", error);
    },
  });

  const updateMutation = useMutation<
    GridRow,
    Error,
    GridRow
  >({
    mutationFn: updateRow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bpm-list"] });
    },
    onError: (error) => {
      console.error("Error updating row:", error);
    },
  });

  const deleteMutation = useMutation<
    void,
    Error,
    number                     // assuming deleteRow takes an id
  >({
    mutationFn: deleteRow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bpm-list"] });
    },
    onError: (error) => {
      console.error("Error deleting row:", error);
    },
  });

  return { addMutation, updateMutation, deleteMutation };
};
