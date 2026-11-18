"use client";
import { useState } from "react";
import LinkButton from "./LinkButton";
import { RentalItem, RentalStatus } from "../../interfaces";
import deleteRental from "@/libs/deleteRental";
import updateRentalStatus from "@/libs/updateRentalStatus";
import StatusBadge from "./StatusBadge";
import IconButton from "./IconButton";
import Button from "./Button";
import ConfirmDialog from "./ConfirmDialog";
import RentalEditDrawer from "./RentalEditDrawer";
import FormAlert from "./FormAlert";
import EmptyRow from "./EmptyRow";
import { rentalErrorMessage } from "@/libs/rentalValidation";

const nextActions: Record<RentalStatus, { label: string; variant: "primary" | "danger"; status: RentalStatus }[]> = {
  pending: [
    { label: "อนุมัติ", variant: "primary", status: "approved" },
    { label: "ไม่อนุมัติ", variant: "danger", status: "rejected" },
  ],
  approved: [{ label: "ส่งมอบแล้ว", variant: "primary", status: "handed_over" }],
  handed_over: [{ label: "รับคืนแล้ว", variant: "primary", status: "returned" }],
  returned: [],
  rejected: [],
};

export default function RentalTable({ rentals, isAdmin }: { rentals: RentalItem[]; isAdmin: boolean }) {
  const [editing, setEditing] = useState<RentalItem | null>(null);
  const [deleting, setDeleting] = useState<RentalItem | null>(null);
  const [error, setError] = useState("");

  const onDelete = async () => {
    if (!deleting) return;
    const result = await deleteRental(deleting._id);
    setDeleting(null);
    setError(result.success ? "" : rentalErrorMessage(result.error));
  };

  const onStatus = async (id: string, status: RentalStatus) => {
    const result = await updateRentalStatus(id, status);
    setError(result.success ? "" : rentalErrorMessage(result.error));
  };

  return (
    <>
      <FormAlert message={error} />
      <div className="overflow-x-auto rounded-xl border border-line bg-white">
        <table className={`w-full border-collapse text-sm ${isAdmin ? "min-w-[1080px]" : "min-w-[720px]"}`}>
          <thead>
            <tr className="border-b border-line text-left text-muted">
              {isAdmin && <th scope="col" className="px-4 py-3 font-semibold">ผู้เช่า</th>}
              <th scope="col" className={`${isAdmin ? "px-2" : "px-4"} py-3 font-semibold`}>อุปกรณ์</th>
              <th scope="col" className="px-2 py-3 font-semibold">จำนวน</th>
              <th scope="col" className="px-2 py-3 font-semibold">วันเริ่ม – วันคืน</th>
              <th scope="col" className="px-2 py-3 font-semibold">สถานะ</th>
              {isAdmin && <th scope="col" className="px-2 py-3 font-semibold">เปลี่ยนสถานะ</th>}
              <th scope="col" className="px-4 py-3 text-right font-semibold">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((r) => (
              <tr key={r._id} className="border-b border-divider">
                {isAdmin && <td className="px-4 py-3">{r.user?.name}</td>}
                <td className={`${isAdmin ? "px-2" : "px-4"} py-3 font-semibold`}>{r.equipment.name}</td>
                <td className="px-2 py-3">{r.quantity}</td>
                <td className="px-2 py-3">
                  {r.startDate.slice(0, 10)} – {r.returnDate.slice(0, 10)}
                </td>
                <td className="px-2 py-3">
                  <StatusBadge status={r.status} />
                </td>
                {isAdmin && (
                  <td className="px-2 py-3">
                    <div className="flex flex-wrap gap-2">
                      {nextActions[r.status].map((a) => (
                        <Button key={a.status} variant={a.variant} onClick={() => onStatus(r._id, a.status)}>
                          {a.label}
                        </Button>
                      ))}
                      {nextActions[r.status].length === 0 && <span className="text-[13px] text-[#6B7C7F]">–</span>}
                    </div>
                  </td>
                )}
                <td className="px-4 py-3">
                  {r.status === "pending" ? (
                    <div className="flex justify-end gap-2">
                      <IconButton icon="edit" onClick={() => setEditing(r)} />
                      <IconButton icon="delete" onClick={() => setDeleting(r)} />
                    </div>
                  ) : (
                    <div className="text-right text-[13px] text-[#6B7C7F]">แก้ไขไม่ได้</div>
                  )}
                </td>
              </tr>
            ))}
            {rentals.length === 0 && (
              <EmptyRow colSpan={isAdmin ? 7 : 5} message="ยังไม่มีคำขอเช่า">
                {!isAdmin && (
                  <LinkButton href="/">ดูอุปกรณ์ทั้งหมด</LinkButton>
                )}
              </EmptyRow>
            )}
          </tbody>
        </table>
      </div>
      {editing && <RentalEditDrawer rental={editing} onClose={() => setEditing(null)} />}
      {deleting && (
        <ConfirmDialog
          title="ลบคำขอนี้?"
          message="เมื่อยืนยันยกเลิกจะไม่สามารถกู้คืนได้"
          confirmLabel="ยืนยันลบ"
          onCancel={() => setDeleting(null)}
          onConfirm={onDelete}
        />
      )}
    </>
  );
}
