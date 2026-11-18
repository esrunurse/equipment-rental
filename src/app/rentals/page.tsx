import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getRentals from "@/libs/getRentals";
import imageUrl from "@/libs/imageUrl";
import RentalTable from "@/components/RentalTable";

export default async function MyRentalsPage() {
  const session = await getServerSession(authOptions);
  const rentalJson = await getRentals(session!.user.token);
  const rentals = rentalJson.data.map((r) => ({ ...r, equipment: { ...r.equipment, image: imageUrl(r.equipment.image) } }));

  return (
    <main className="mx-auto flex max-w-[1080px] flex-col gap-4 px-6 pt-8 pb-16">
      <div className="flex flex-col gap-1">
        <h1 className="m-0 text-[28px] leading-[1.4] font-bold">การเช่าของฉัน</h1>
        <p className="m-0 text-sm text-muted">แก้ไขหรือลบได้เฉพาะคำขอที่รออนุมัติ</p>
      </div>
      <RentalTable rentals={rentals} isAdmin={false} />
    </main>
  );
}
