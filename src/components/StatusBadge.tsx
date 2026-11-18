import { RentalStatus } from "../../interfaces";

const badges: Record<RentalStatus, [string, string]> = {
  pending: ["รออนุมัติ", "bg-warning-50 text-warning"],
  approved: ["อนุมัติแล้ว", "bg-success-50 text-success"],
  handed_over: ["ส่งมอบแล้ว", "bg-info-50 text-info"],
  returned: ["คืนแล้ว", "bg-divider text-muted"],
  rejected: ["ไม่อนุมัติ", "bg-danger-50 text-danger-text"],
};

export default function StatusBadge({ status }: { status: RentalStatus }) {
  const [label, look] = badges[status];
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${look}`}>
      {label}
    </span>
  );
}
