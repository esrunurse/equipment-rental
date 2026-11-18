import { EquipmentItem } from "../../interfaces";

export const PAGE_SIZE = 8;

export function filterEquipment(
  list: EquipmentItem[],
  params: { q?: string; category?: string; sort?: string; page?: string }
) {
  const q = (params.q ?? "").trim().toLowerCase();
  let items = list.filter((item) => item.name.toLowerCase().includes(q));
  if (params.category) items = items.filter((item) => item.category === params.category);
  if (params.sort === "price_desc") items = [...items].sort((a, b) => b.rentalRate - a.rentalRate);
  if (params.sort === "price_asc") items = [...items].sort((a, b) => a.rentalRate - b.rentalRate);

  const totalPages = Math.max(Math.ceil(items.length / PAGE_SIZE), 1);
  const requested = parseInt(params.page ?? "1");
  const page = Number.isNaN(requested) ? 1 : Math.min(Math.max(requested, 1), totalPages);
  return { items: items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), totalPages, page };
}
