import axios from "axios";
import config from "@/config";

export interface GridRow {
  id: number;
  onvan: string;
  nameSabtKonande: string;
  tarikhSabt: string;
}

const api = axios.create({
  baseURL: config.API_URL,
});

export const fetchBpmList = async (
  page?: number,
  pageSize?: number
): Promise<{ row: GridRow[]; total: number }> => {
  const res = await api.get("/farayand", {
    params: { page, pageSize },
  });
  const rows = res.data; // فرض بر اینکه res.data خودش آرایه است
  return { rows, total: rows.length };
};

export const addRow = async (
  row: Omit<GridRow, "id">
): Promise<GridRow> => {
  return (await api.post("/farayand", row)).data;
};

export const updateRow = async (row: GridRow): Promise<GridRow> => {
  return (await api.put("/farayand", row)).data;
};

export const deleteRow = async (id: number): Promise<void> => {
  await api.delete(`/farayand/${id}`);
};
