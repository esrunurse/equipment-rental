import Link from "next/link";
import { EquipmentItem } from "../../interfaces";
import imageUrl from "@/libs/imageUrl";
import { formatBaht } from "@/libs/rentalValidation";
import ImagePlaceholder from "./ImagePlaceholder";

export default function EquipmentCard({ item }: { item: EquipmentItem }) {
  const out = item.quantity === 0;
  return (
    <article className="box-border flex w-full flex-col overflow-hidden rounded-xl border border-line bg-white text-ink">
      {item.image ? (
        <img
          src={imageUrl(item.image)}
          alt={item.name}
          className="block aspect-square h-auto w-full bg-page object-cover object-center"
        />
      ) : (
        <ImagePlaceholder className="aspect-square w-full" />
      )}
      <div className="flex flex-col gap-1.5 px-4 pt-3.5 pb-4">
        <span className="text-xs font-semibold text-muted">{item.category}</span>
        <h3 className="m-0 text-[17px] leading-[1.4] font-semibold">{item.name}</h3>
        <span className={`text-[13px] font-semibold ${out ? "text-danger-text" : "text-success"}`}>
          {out ? "ไม่มีให้เช่า" : `มี ${item.quantity} เครื่อง`}
        </span>
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <span className="text-sm text-muted">
            <strong className="text-xl text-primary">{formatBaht(item.rentalRate)}</strong> / วัน
          </span>
          <Link
            href={`/equipment/${item._id}`}
            className="flex h-[38px] items-center rounded-lg bg-primary px-3.5 text-sm font-semibold text-white no-underline"
          >
            ดูรายละเอียด
          </Link>
        </div>
      </div>
    </article>
  );
}
