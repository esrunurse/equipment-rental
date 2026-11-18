import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import getRentals from "@/libs/getRentals";
import { UserProfile } from "../../../interfaces";
import StatusBadge from "@/components/StatusBadge";
import EmptyRow from "@/components/EmptyRow";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const token = session!.user.token;
  const profile: UserProfile = (await getUserProfile(token)).data;
  const rentals = profile.role === "member" ? (await getRentals(token)).data : [];

  return (
    <main className="mx-auto flex max-w-[920px] flex-col gap-5 px-6 pt-8 pb-16">
      <h1 className="m-0 text-[28px] leading-[1.4] font-bold">โปรไฟล์</h1>
      <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 rounded-xl border border-line bg-white p-6">
        {[
          ["ชื่อ", profile.name],
          ["อีเมล", profile.email],
          ["เบอร์โทร", profile.tel],
          ["บทบาท", profile.role],
        ].map(([label, value]) => (
          <div key={label}>
            <dt className="text-[13px] text-muted">{label}</dt>
            <dd className="m-0 text-base font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
      {profile.role === "member" && (
        <>
          <h2 className="mt-2 mb-0 text-xl font-semibold">ประวัติการเช่า</h2>
          <div className="overflow-x-auto rounded-xl border border-line bg-white">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-left text-muted">
                  <th scope="col" className="px-4 py-3 font-semibold">อุปกรณ์</th>
                  <th scope="col" className="px-2 py-3 font-semibold">จำนวน</th>
                  <th scope="col" className="px-2 py-3 font-semibold">วันเริ่ม – วันคืน</th>
                  <th scope="col" className="px-4 py-3 font-semibold">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((r) => (
                  <tr key={r._id} className="border-b border-divider">
                    <td className="px-4 py-3 font-semibold">{r.equipment.name}</td>
                    <td className="px-2 py-3">{r.quantity}</td>
                    <td className="px-2 py-3">
                      {r.startDate.slice(0, 10)} – {r.returnDate.slice(0, 10)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
                {rentals.length === 0 && <EmptyRow colSpan={4} message="ยังไม่มีประวัติการเช่า" />}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}
