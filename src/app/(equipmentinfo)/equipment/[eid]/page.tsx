import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getEquipment from "@/libs/getEquipment";
import imageUrl from "@/libs/imageUrl";
import { formatBaht } from "@/libs/rentalValidation";
import { EquipmentItem } from "../../../../../interfaces";
import RentalForm from "@/components/RentalForm";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import equipmentCode from "@/libs/equipmentCode";

export default async function EquipmentDetailPage({ params }: { params: Promise<{ eid: string }> }) {
  const { eid } = await params;
  const isMongoId = /^[0-9a-f]{24}$/i.test(eid);
  if (!isMongoId) notFound();
  const equipmentJson = await getEquipment(eid);
  if (!equipmentJson) notFound();
  const item: EquipmentItem = equipmentJson.data;
  const session = await getServerSession(authOptions);
  const role = session?.user.role;

  return (
    <main className="mx-auto flex max-w-[1080px] flex-wrap items-start gap-8 px-6 pt-8 pb-16">
      <section className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
        {item.image ? (
          <img
            src={imageUrl(item.image)}
            alt={item.name}
            className="aspect-square h-auto w-full max-w-[420px] rounded-xl bg-page object-cover object-center"
          />
        ) : (
          <ImagePlaceholder className="aspect-square w-full max-w-[420px] rounded-xl" />
        )}
        <span className="text-[13px] font-semibold text-muted">{item.category}</span>
        <h1 className="m-0 text-[28px] leading-[1.4] font-bold">{item.name}</h1>
        <p className="m-0 text-base leading-[1.7] text-muted">{item.description}</p>
        <p className="m-0 font-mono text-[13px] text-muted">id: {equipmentCode(item)}</p>
        <p className="m-0 text-[15px]">
          <strong className="text-2xl text-primary">{formatBaht(item.rentalRate)}</strong> / วัน ·{" "}
          {item.quantity === 0 ? "ไม่มีให้เช่า" : `มี ${item.quantity} เครื่อง`}
        </p>
      </section>
      {(role === "member" || !session) && (
        <RentalForm
          guest={!session}
          equipment={{
            _id: item._id,
            name: item.name,
            image: imageUrl(item.image),
            rentalRate: item.rentalRate,
            quantity: item.quantity,
          }}
        />
      )}
    </main>
  );
}
