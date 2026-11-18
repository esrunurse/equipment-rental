export interface RentalInput {
  quantity: number;
  startDate: string;
  returnDate: string;
}

export interface RentalErrors {
  quantity?: string;
  startDate?: string;
  returnDate?: string;
  form?: string;
}

const DAY = 24 * 60 * 60 * 1000;

const toUtc = (date: string) => new Date(`${date}T00:00:00.000Z`).getTime();

export function rentalDiff(startDate: string, returnDate: string) {
  return (toUtc(returnDate) - toUtc(startDate)) / DAY;
}

const MIN_RENTAL_DAYS = 1;

export function rentalDays(startDate: string, returnDate: string) {
  return Math.max(rentalDiff(startDate, returnDate), MIN_RENTAL_DAYS);
}

export function rentalCost(rate: number, input: RentalInput) {
  return rate * input.quantity * rentalDays(input.startDate, input.returnDate);
}

export function canShowCost(input: RentalInput) {
  return (
    !!input.startDate &&
    !!input.returnDate &&
    Number.isInteger(input.quantity) &&
    input.quantity >= 1 &&
    rentalDiff(input.startDate, input.returnDate) >= 0
  );
}

export function validateRental(input: RentalInput, available: number): RentalErrors {
  const errors: RentalErrors = {};
  if (!Number.isInteger(input.quantity) || input.quantity < 1 || input.quantity > 3) {
    errors.quantity = "เช่าได้สูงสุด 3 เครื่องต่อคำขอ";
  } else if (input.quantity > available) {
    errors.form = "จำนวนที่ขอเกินจำนวนที่มี";
  }
  const todayUtc = new Date().toISOString().slice(0, 10);
  if (input.startDate < todayUtc) errors.startDate = "วันที่เลือกต้องไม่เป็นวันที่ผ่านมาแล้ว";
  const diff = rentalDiff(input.startDate, input.returnDate);
  if (diff < 0) errors.returnDate = "วันคืนต้องไม่ก่อนวันเริ่มเช่า";
  else if (diff > 7) errors.returnDate = "ระยะเวลาในการเช่าต่อครั้งไม่เกิน 7 วัน";
  return errors;
}

const backendMessages: Record<string, string> = {
  "Rental quantity must be an integer between 1 and 3": "เช่าได้สูงสุด 3 เครื่องต่อคำขอ",
  "Rental quantity exceeds available equipment": "จำนวนที่ขอเกินจำนวนที่มี",
  "Start date cannot be in the past": "วันที่เลือกต้องไม่เป็นวันที่ผ่านมาแล้ว",
  "Return date cannot be before start date": "วันคืนต้องไม่ก่อนวันเริ่มเช่า",
  "Rental duration cannot exceed 7 days": "ระยะเวลาในการเช่าต่อครั้งไม่เกิน 7 วัน",
  "Only pending rental requests can be changed": "แก้ไขได้เฉพาะคำขอที่รออนุมัติ",
};

export function rentalErrorMessage(error?: string) {
  if (!error) return "";
  return backendMessages[error] ?? error;
}

export const formatBaht = (n: number) => `฿${n.toLocaleString("en-US")}`;
