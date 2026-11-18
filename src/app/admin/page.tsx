import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getEquipments from "@/libs/getEquipments";
import getRentals from "@/libs/getRentals";
import StatusBadge from "@/components/StatusBadge";
import EmptyRow from "@/components/EmptyRow";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  const equipmentJson = await getEquipments();
  const rentals = (await getRentals(session!.user.token)).data;
  const recent = [...rentals].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5);

  const cards = [
    { label: "อุปกรณ์ทั้งหมด", value: equipmentJson.count },
    { label: "รออนุมัติ", value: rentals.filter((r) => r.status === "pending").length },
    { label: "กำลังเช่า (ส่งมอบแล้ว)", value: rentals.filter((r) => r.status === "handed_over").length },
    { label: "คำขอเช่าทั้งหมด", value: rentals.length },
  ];

  return (
    <main className="mx-auto flex max-w-[1080px] flex-col gap-5 px-6 pt-8 pb-16">
      <h1 className="m-0 text-[28px] leading-[1.4] font-bold">แดชบอร์ด</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {cards.map((card) => (
          <div key={card.label} className="flex flex-col gap-1 rounded-xl border border-line bg-white p-5">
            <span className="text-sm text-muted">{card.label}</span>
            <span className="text-[32px] font-bold">{card.value}</span>
          </div>
        ))}
      </div>
      <h2 className="mt-2 mb-0 text-xl font-semibold">คำขอล่าสุด</h2>
      <div className="overflow-x-auto rounded-xl border border-line bg-white">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left text-muted">
              <th scope="col" className="px-4 py-3 font-semibold">ผู้เช่า</th>
              <th scope="col" className="px-2 py-3 font-semibold">อุปกรณ์</th>
              <th scope="col" className="px-2 py-3 font-semibold">วันเริ่ม – วันคืน</th>
              <th scope="col" className="px-4 py-3 font-semibold">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((r) => (
              <tr key={r._id} className="border-b border-divider">
                <td className="px-4 py-3">{r.user?.name}</td>
                <td className="px-2 py-3 font-semibold">{r.equipment.name}</td>
                <td className="px-2 py-3">
                  {r.startDate.slice(0, 10)} – {r.returnDate.slice(0, 10)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={r.status} />
                </td>
              </tr>
            ))}
            {recent.length === 0 && <EmptyRow colSpan={4} message="ยังไม่มีคำขอเช่า" />}
          </tbody>
        </table>
      </div>
      {recent.length > 0 && (
        <Link href="/admin/rentals" className="self-start text-sm font-semibold text-primary">
          ดูคำขอทั้งหมด
        </Link>
      )}
    </main>
  );
}
