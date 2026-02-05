import { useQuery } from "@tanstack/react-query";
import { fetchBpmList,GridRow } from "@/services/bpm.service";
export const useBpmList = (page: number, pageSize: number) =>
  useQuery<{rows: GridRow[], total: number}, Error>({
    queryKey: ["bpm-list", page, pageSize],
    queryFn: () => fetchBpmList(page, pageSize),
    staleTime: 5 * 60 * 1000,
  });
