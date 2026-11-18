"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { clearCart } from "@/redux/features/cartSlice";

export default function LogoutButton() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        dispatch(clearCart());
        await signOut({ redirect: false });
        router.replace("/");
        router.refresh();
      }}
      className="h-10 cursor-pointer rounded-lg border border-line bg-white px-3.5 text-sm text-ink"
    >
      ออกจากระบบ
    </button>
  );
}
