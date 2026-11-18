import { EquipmentItem } from "../../interfaces";

const categorySlug: Record<string, string> = {
  "โทรศัพท์": "mobile",
  "กล้องถ่ายรูป": "camera",
  "โน้ตบุ๊ก": "laptop",
  "อุปกรณ์เสริม": "accessory",
};

export default function equipmentCode(item: Pick<EquipmentItem, "_id" | "category" | "createdAt">) {
  const categoryName = categorySlug[item.category] ?? "other";
  const createdDateBangkok = new Date(item.createdAt)
    .toLocaleDateString("en-CA", { timeZone: "Asia/Bangkok" })
    .replaceAll("-", "");
  return `rent-hub-${categoryName}-${createdDateBangkok}-${item._id.slice(-5)}`.toUpperCase();
}
