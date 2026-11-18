import TextField from "./TextField";
import { RentalErrors, RentalInput, canShowCost, formatBaht, rentalCost, rentalDays } from "@/libs/rentalValidation";

export default function RentalFields({
  idPrefix,
  rate,
  values,
  errors,
  onChange,
  datesSideBySide,
  totalSize,
}: {
  idPrefix: string;
  rate: number;
  values: { quantity: string; startDate: string; returnDate: string };
  errors: RentalErrors;
  onChange: (key: "quantity" | "startDate" | "returnDate", value: string) => void;
  datesSideBySide: boolean;
  totalSize: "text-[22px]" | "text-xl";
}) {
  const input: RentalInput = {
    quantity: Number(values.quantity),
    startDate: values.startDate,
    returnDate: values.returnDate,
  };
  const dates = (
    <>
      <TextField id={`${idPrefix}-start`} label="วันเริ่มเช่า" type="date" value={values.startDate} onChange={(v) => onChange("startDate", v)} error={errors.startDate} required />
      <TextField id={`${idPrefix}-end`} label="วันคืน" type="date" value={values.returnDate} onChange={(v) => onChange("returnDate", v)} error={errors.returnDate} required />
    </>
  );
  return (
    <>
      <TextField id={`${idPrefix}-qty`} label="จำนวน" type="number" value={values.quantity} onChange={(v) => onChange("quantity", v)} error={errors.quantity} />
      {datesSideBySide ? <div className="grid grid-cols-2 gap-3">{dates}</div> : dates}
      <p className="m-0 text-[13px] leading-[1.7] text-muted">
        เช่าได้สูงสุด 3 เครื่องต่อคำขอ
        <br />
        ระยะเวลาในการเช่าต่อครั้งไม่เกิน 7 วัน
      </p>
      {canShowCost(input) && (
        <div className="flex items-baseline justify-between border-t border-line pt-3.5">
          <span className="text-sm text-muted">
            {formatBaht(rate)} × {input.quantity} เครื่อง × {rentalDays(input.startDate, input.returnDate)} วัน
          </span>
          <strong className={`${totalSize} text-primary`}>{formatBaht(rentalCost(rate, input))}</strong>
        </div>
      )}
    </>
  );
}
