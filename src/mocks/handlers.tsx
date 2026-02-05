import { rest } from "msw";
import { GridRow } from "@/services/bpm.service";

let mockData: GridRow[] = [
  { id: 1, onvan: "عنوان1", nameSabtKonande: "علی", tarikhSabt: "1402/01/01" },
  { id: 2, onvan: "عنوان2", nameSabtKonande: "مریم", tarikhSabt: "1402/02/02" },
];

export const handlers = [
  // GET /farayand
  rest.get("*/farayand", (req, res, ctx) => {
    const page = Number(req.url.searchParams.get("page") ?? 0);
    const pageSize = Number(req.url.searchParams.get("pageSize") ?? 10);
    const start = page * pageSize;
    const end = start + pageSize;
    return res(ctx.status(200), ctx.json({ rows: mockData.slice(start, end), total: mockData.length }));
  }),

  // POST /farayand
  rest.post("*/farayand", async (req, res, ctx) => {
    const newRow = await req.json();
    const id = mockData.length + 1;
    const row = { id, ...newRow };
    mockData.push(row);
    return res(ctx.status(201), ctx.json(row));
  }),

  // PUT /farayand/:id
  rest.put("*/farayand/:id", async (req, res, ctx) => {
    const { id } = req.params;
    const updated = await req.json();
    mockData = mockData.map(r => r.id === Number(id) ? updated : r);
    return res(ctx.status(200), ctx.json(updated));
  }),

  // DELETE /farayand/:id
  rest.delete("*/farayand/:id", (req, res, ctx) => {
    const { id } = req.params;
    mockData = mockData.filter(r => r.id !== Number(id));
    return res(ctx.status(200));
  })
];
