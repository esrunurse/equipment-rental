import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import getEquipment from "@/libs/getEquipment";
import imageUrl from "@/libs/imageUrl";
import { CartItem, EquipmentItem, UserProfile } from "../../../../interfaces";
import CartGate from "@/components/CartGate";
import RentalConfirm from "@/components/RentalConfirm";

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ equipment?: string; quantity?: string; startDate?: string; returnDate?: string }>;
}) {
  const params = await searchParams;
  const session = await getServerSession(authOptions);
  const profile: UserProfile = (await getUserProfile(session!.user.token)).data;

  let itemFromDetailPage: CartItem | undefined;
  if (params.equipment) {
    const json = await getEquipment(params.equipment);
    if (!json || !params.startDate || !params.returnDate) redirect(`/equipment/${params.equipment}`);
    const equipment: EquipmentItem = json.data;
    itemFromDetailPage = {
      equipmentId: equipment._id,
      name: equipment.name,
      image: imageUrl(equipment.image),
      rentalRate: equipment.rentalRate,
      availableQuantity: equipment.quantity,
      quantity: Number(params.quantity),
      startDate: params.startDate,
      returnDate: params.returnDate,
    };
  }

  return (
    <main className="mx-auto flex max-w-[920px] flex-col gap-4 px-6 pt-8 pb-16">
      <div className="flex flex-col gap-1">
        <h1 className="m-0 text-[28px] leading-[1.4] font-bold">ยืนยันคำขอเช่า</h1>
        <p className="m-0 text-[15px] text-muted">ตรวจรายละเอียดก่อนส่ง</p>
      </div>
      <section className="flex flex-col gap-1 rounded-xl border border-line bg-white p-5">
        <span className="text-[13px] font-semibold text-muted">ผู้เช่า</span>
        <span className="text-base font-semibold">{profile.name}</span>
        <span className="text-sm text-muted">
          {profile.email} · {profile.tel}
        </span>
      </section>
      <CartGate>
        <RentalConfirm itemFromDetailPage={itemFromDetailPage} />
      </CartGate>
    </main>
  );
}
