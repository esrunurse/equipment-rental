"use client";
import { useState } from "react";
import { EquipmentItem } from "../../interfaces";
import deleteEquipment from "@/libs/deleteEquipment";
import { formatBaht } from "@/libs/rentalValidation";
import Button from "./Button";
import IconButton from "./IconButton";
import Pagination from "./Pagination";
import ConfirmDialog from "./ConfirmDialog";
import EquipmentDrawer from "./EquipmentDrawer";
import ImagePlaceholder from "./ImagePlaceholder";
import FormAlert from "./FormAlert";
import EmptyRow from "./EmptyRow";
import equipmentCode from "@/libs/equipmentCode";

const PAGE_SIZE = 10;

export default function EquipmentAdmin({ items, page }: { items: EquipmentItem[]; page: number }) {
  const [editing, setEditing] = useState<EquipmentItem | "new" | null>(null);
  const [deleting, setDeleting] = useState<EquipmentItem | null>(null);
  const [error, setError] = useState("");
  const totalPages = Math.max(Math.ceil(items.length / PAGE_SIZE), 1);
  const current = Math.min(Math.max(page, 1), totalPages);
  const rows = items.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const onDelete = async () => {
    if (!deleting) return;
    const result = await deleteEquipment(deleting._id);
    setDeleting(null);
    setError(result.success ? "" : result.error ?? "");
  };

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="m-0 text-[28px] leading-[1.4] font-bold">จัดการอุปกรณ์</h1>
        <Button onClick={() => setEditing("new")}>+ เพิ่มอุปกรณ์</Button>
      </div>
      <FormAlert message={error} />
      <div className="overflow-x-auto rounded-xl border border-line bg-white">
        <table className="w-full min-w-[600px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th scope="col" className="px-4 py-3 font-semibold">ชื่อ</th>
              <th scope="col" className="px-2 py-3 font-semibold">หมวดหมู่</th>
              <th scope="col" className="px-2 py-3 font-semibold">จำนวน</th>
              <th scope="col" className="px-2 py-3 font-semibold">ค่าเช่า/วัน</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item._id} className="border-b border-divider">
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    {item.image ? (
                      <img src={item.image} alt="" className="aspect-square w-11 rounded-md bg-page object-cover" />
                    ) : (
                      <ImagePlaceholder className="aspect-square w-11 rounded-md" />
                    )}
                    <div>
                      <div className="font-semibold">{item.name}</div>
                      <div className="font-mono text-xs text-muted">id: {equipmentCode(item)}</div>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2.5">{item.category}</td>
                <td className="px-2 py-2.5">{item.quantity}</td>
                <td className="px-2 py-2.5">{formatBaht(item.rentalRate)}</td>
                <td className="px-4 py-2.5">
                  <div className="flex justify-end gap-2">
                    <IconButton icon="edit" onClick={() => setEditing(item)} />
                    <IconButton icon="delete" onClick={() => setDeleting(item)} />
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <EmptyRow colSpan={5} message="ยังไม่มีอุปกรณ์">
                <Button onClick={() => setEditing("new")}>+ เพิ่มอุปกรณ์</Button>
              </EmptyRow>
            )}
          </tbody>
        </table>
      </div>
      {items.length > 0 && <Pagination current={current} total={totalPages} />}
      {editing && (
        <EquipmentDrawer item={editing === "new" ? null : editing} onClose={() => setEditing(null)} />
      )}
      {deleting && (
        <ConfirmDialog
          title="ลบอุปกรณ์นี้?"
          message="เมื่อยืนยันยกเลิกจะไม่สามารถกู้คืนได้"
          confirmLabel="ยืนยันลบ"
          onCancel={() => setDeleting(null)}
          onConfirm={onDelete}
        />
      )}
    </section>
  );
}
