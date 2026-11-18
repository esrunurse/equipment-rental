"use client";
import Link from "next/link";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, useAppSelector } from "@/redux/store";

export default function CartLink() {
  const count = useAppSelector((state) => state.cartSlice.cartItems.length);
  return (
    <Link
      href="/cart"
      aria-label={`ตะกร้า ${count} รายการ`}
      className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
      <PersistGate loading={null} persistor={persistor}>
        <span className="absolute -top-1.5 -right-1.5 box-border flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-[5px] text-[11px] font-bold text-white">
          {count}
        </span>
      </PersistGate>
    </Link>
  );
}
