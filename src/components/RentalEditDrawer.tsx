"use client";
import { useRef, useState } from "react";
import { RentalItem } from "../../interfaces";
import updateRental from "@/libs/updateRental";
import { RentalErrors, formatBaht, rentalErrorMessage, validateRental } from "@/libs/rentalValidation";
import Drawer from "./Drawer";
import RentalFields from "./RentalFields";
import Button from "./Button";
import FormAlert from "./FormAlert";
import ImagePlaceholder from "./ImagePlaceholder";

export default function RentalEditDrawer({ rental, onClose }: { rental: RentalItem; onClose: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState({
    quantity: String(rental.quantity),
    startDate: rental.startDate.slice(0, 10),
    returnDate: rental.returnDate.slice(0, 10),
  });
  const [errors, setErrors] = useState<RentalErrors>({});
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    if (!formRef.current?.reportValidity()) return;
    const input = { quantity: Number(values.quantity), startDate: values.startDate, returnDate: values.returnDate };
    const next = validateRental(input, rental.equipment.quantity);
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setLoading(true);
    const result = await updateRental(rental._id, input);
    setLoading(false);
    if (!result.success) {
      setErrors({ form: rentalErrorMessage(result.error) });
      return;
    }
    onClose();
  };

  return (
    <Drawer
      title="แก้ไขคำขอเช่า"
      width="max-w-[420px]"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            ยกเลิก
          </Button>
          <Button onClick={onSave} disabled={loading}>
            บันทึก
          </Button>
        </>
      }
    >
      <form ref={formRef} className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center gap-3">
          {rental.equipment.image ? (
            <img src={rental.equipment.image} alt="" className="aspect-square w-14 rounded-lg bg-page object-cover" />
          ) : (
            <ImagePlaceholder className="aspect-square w-14 rounded-lg" />
          )}
          <div className="flex flex-col gap-0.5">
            <span className="text-base font-semibold">{rental.equipment.name}</span>
            <span className="text-[13px] text-muted">
              {formatBaht(rental.equipment.rentalRate)} / วัน · มี {rental.equipment.quantity} เครื่อง
            </span>
          </div>
        </div>
        <RentalFields
          idPrefix="e"
          rate={rental.equipment.rentalRate}
          values={values}
          errors={errors}
          onChange={(key, value) => setValues({ ...values, [key]: value })}
          datesSideBySide={false}
          totalSize="text-xl"
        />
        <FormAlert message={errors.form} />
      </form>
    </Drawer>
  );
}
