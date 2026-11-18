"use client";
import { useEffect, useState } from "react";
import LinkButton from "./LinkButton";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { setCart } from "@/redux/features/cartSlice";
import createRental from "@/libs/createRental";
import { formatBaht, rentalCost, rentalDays, rentalErrorMessage, validateRental } from "@/libs/rentalValidation";
import { CartItem } from "../../interfaces";
import Button from "./Button";
import ImagePlaceholder from "./ImagePlaceholder";
import { useToast } from "@/providers/ToastProvider";

export default function RentalConfirm({ itemFromDetailPage }: { itemFromDetailPage?: CartItem }) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useAppSelector((state) => state.cartSlice.cartItems);
  const [directItem, setDirectItem] = useState(itemFromDetailPage);
  const [loading, setLoading] = useState(false);
  const showToast = useToast();

  const items = directItem ? [directItem] : cartItems;
  const total = items.reduce((sum, item) => sum + rentalCost(item.rentalRate, item), 0);

  useEffect(() => {
    if (!itemFromDetailPage && cartItems.length === 0 && !loading) router.replace("/cart");
  }, [itemFromDetailPage, cartItems.length, loading, router]);

  const submitEachItem = async () => {
    setLoading(true);
    const failed: CartItem[] = [];
    for (const item of items) {
      const errors = validateRental(item, item.availableQuantity);
      const firstError = errors.quantity ?? errors.startDate ?? errors.returnDate ?? errors.form;
      if (firstError) {
        failed.push({ ...item, error: firstError });
        continue;
      }
      const result = await createRental({
        equipment: item.equipmentId,
        quantity: item.quantity,
        startDate: item.startDate,
        returnDate: item.returnDate,
      });
      if (!result.success) failed.push({ ...item, error: rentalErrorMessage(result.error) });
    }
    if (failed.length === 0) {
      if (!itemFromDetailPage) dispatch(setCart([]));
      showToast("ส่งคำขอเช่าสำเร็จ");
      router.push("/rentals");
      return;
    }
    if (itemFromDetailPage) setDirectItem(failed[0]);
    else dispatch(setCart(failed));
    if (failed.length < items.length) showToast("ส่งคำขอเช่าสำเร็จ");
    setLoading(false);
  };

  return (
    <>
      <section className="overflow-hidden rounded-xl border border-line bg-white">
        {items.map((item, index) => {
          const days = rentalDays(item.startDate, item.returnDate);
          return (
            <div key={index} className="flex flex-wrap items-center gap-4 border-b border-divider px-5 py-4">
              {item.image ? (
                <img src={item.image} alt={item.name} className="h-[72px] w-[72px] rounded-lg bg-page object-cover" />
              ) : (
                <ImagePlaceholder className="h-[72px] w-[72px] rounded-lg" />
              )}
              <div className="flex flex-[1_1_260px] flex-col gap-0.5">
                <span className="text-base font-semibold">{item.name}</span>
                <span className="text-sm text-muted">
                  {item.startDate} ถึง {item.returnDate} · {days} วัน
                </span>
                <span className="text-sm text-muted">
                  {formatBaht(item.rentalRate)} × {item.quantity} เครื่อง × {days} วัน
                </span>
                {item.error && <span className="text-[13px] font-medium text-danger-text">{item.error}</span>}
              </div>
              <strong className="text-lg text-primary">{formatBaht(rentalCost(item.rentalRate, item))}</strong>
            </div>
          );
        })}
        <div className="flex items-center justify-between gap-4 px-5 py-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-base">รวม {items.length} รายการ</span>
            <span className="text-sm font-semibold text-primary">ชำระตอนรับอุปกรณ์</span>
          </div>
          <strong className="text-2xl text-primary">{formatBaht(total)}</strong>
        </div>
      </section>
      <p className="m-0 text-[13px] leading-[1.7] text-muted">
        ส่งแล้วสถานะเป็น &quot;รออนุมัติ&quot; แก้ไขหรือยกเลิกได้ที่หน้าการเช่าของฉันจนกว่าจะอนุมัติ
      </p>
      <div className="flex flex-wrap justify-end gap-2">
        <LinkButton href={itemFromDetailPage ? `/equipment/${itemFromDetailPage.equipmentId}` : "/cart"} variant="secondary">
          กลับไปแก้ไข
        </LinkButton>
        <Button onClick={submitEachItem} disabled={loading || items.length === 0}>
          ยืนยันส่งคำขอเช่า
        </Button>
      </div>
    </>
  );
}
