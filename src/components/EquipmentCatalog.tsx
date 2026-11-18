import { EquipmentJson } from "../../interfaces";
import { filterEquipment } from "@/libs/filterEquipment";
import EquipmentCard from "./EquipmentCard";
import Pagination from "./Pagination";
import EmptyState from "./EmptyState";
import LinkButton from "./LinkButton";

export default async function EquipmentCatalog({
  equipmentJson,
  params,
}: {
  equipmentJson: Promise<EquipmentJson>;
  params: { q?: string; category?: string; sort?: string; page?: string };
}) {
  const { items, totalPages, page } = filterEquipment((await equipmentJson).data, params);
  if (items.length === 0) {
    const filtered = !!params.q || !!params.category;
    return (
      <EmptyState
        large
        message={params.q ? "ไม่พบอุปกรณ์ที่ค้นหา" : params.category ? "ไม่พบอุปกรณ์ในหมวดนี้" : "ยังไม่มีอุปกรณ์"}
      >
        {filtered && <LinkButton href="/">ดูอุปกรณ์ทั้งหมด</LinkButton>}
      </EmptyState>
    );
  }
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
        {items.map((item) => (
          <EquipmentCard key={item._id} item={item} />
        ))}
      </div>
      <Pagination current={page} total={totalPages} />
    </>
  );
}
