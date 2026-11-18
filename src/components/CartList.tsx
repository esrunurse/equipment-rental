"use client";
import EmptyState from "./EmptyState";
import LinkButton from "./LinkButton";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { removeFromCart } from "@/redux/features/cartSlice";
import { formatBaht, rentalCost } from "@/libs/rentalValidation";
import IconButton from "./IconButton";
import ImagePlaceholder from "./ImagePlaceholder";

export default function CartList() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useAppSelector((state) => state.cartSlice.cartItems);
  const total = cartItems.reduce((sum, item) => sum + rentalCost(item.rentalRate, item), 0);

  if (cartItems.length === 0) {
    return (
      <EmptyState
        message="ตะกร้ายังว่าง"
        icon={
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-muted">
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        }
      >
        <LinkButton href="/">ดูอุปกรณ์ทั้งหมด</LinkButton>
      </EmptyState>
    );
  }

  return (
    <>
      {cartItems.map((item, index) => (
        <div key={index} className="flex flex-wrap items-center gap-4 rounded-xl border border-line bg-white p-4">
          {item.image ? (
            <img src={item.image} alt={item.name} className="h-[72px] w-[72px] rounded-lg bg-page object-cover" />
          ) : (
            <ImagePlaceholder className="h-[72px] w-[72px] rounded-lg" />
          )}
          <div className="flex flex-[1_1_240px] flex-col gap-0.5">
            <span className="text-base font-semibold">{item.name}</span>
            <span className="text-sm text-muted">
              {item.quantity} เครื่อง · {item.startDate} ถึง {item.returnDate}
            </span>
            {item.error && <span className="text-[13px] font-medium text-danger-text">{item.error}</span>}
          </div>
          <strong className="text-lg text-primary">{formatBaht(rentalCost(item.rentalRate, item))}</strong>
          <IconButton icon="delete" onClick={() => dispatch(removeFromCart(index))} />
        </div>
      ))}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
        <span className="text-base">
          รวม <strong className="text-2xl text-primary">{formatBaht(total)}</strong>
        </span>
        <LinkButton href="/cart/confirm">ส่งคำขอเช่าทั้งหมด</LinkButton>
      </div>
    </>
  );
}
