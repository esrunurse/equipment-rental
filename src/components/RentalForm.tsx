"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/features/cartSlice";
import { RentalErrors, validateRental } from "@/libs/rentalValidation";
import RentalFields from "./RentalFields";
import Button from "./Button";
import { useToast } from "@/providers/ToastProvider";

export default function RentalForm({
  equipment,
  guest = false,
}: {
  equipment: { _id: string; name: string; image: string; rentalRate: number; quantity: number };
  guest?: boolean;
}) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [values, setValues] = useState({ quantity: "1", startDate: "", returnDate: "" });
  const [errors, setErrors] = useState<RentalErrors>({});
  const showToast = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const input = { quantity: Number(values.quantity), startDate: values.startDate, returnDate: values.returnDate };

  const check = () => {
    const next = validateRental(input, equipment.quantity);
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goSignIn = () => router.push(`/signin?callbackUrl=${encodeURIComponent(`/equipment/${equipment._id}`)}`);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guest) return goSignIn();
    if (!check()) return;
    const query = new URLSearchParams({ equipment: equipment._id, ...values });
    router.push(`/cart/confirm?${query.toString()}`);
  };

  const onAddToCart = () => {
    if (guest) return goSignIn();
    if (!formRef.current?.reportValidity() || !check()) return;
    dispatch(
      addToCart({
        equipmentId: equipment._id,
        name: equipment.name,
        image: equipment.image,
        rentalRate: equipment.rentalRate,
        availableQuantity: equipment.quantity,
        ...input,
      })
    );
    showToast("เพิ่มลงตะกร้าแล้ว");
  };

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate={guest}
      className="flex min-w-0 flex-[1_1_340px] flex-col gap-4 rounded-xl border border-line bg-white p-6"
    >
      <h2 className="m-0 text-xl leading-[1.4] font-semibold">ขอเช่า</h2>
      <RentalFields
        idPrefix="d"
        rate={equipment.rentalRate}
        values={values}
        errors={errors}
        onChange={(key, value) => setValues({ ...values, [key]: value })}
        datesSideBySide
        totalSize="text-[22px]"
      />
      <Button type="submit" full>
        ส่งคำขอเช่า
      </Button>
      <Button variant="secondary" full onClick={onAddToCart}>
        เพิ่มลงตะกร้า
      </Button>
    </form>
  );
}
