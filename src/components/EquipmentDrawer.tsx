"use client";
import { useRef, useState } from "react";
import { EquipmentItem } from "../../interfaces";
import createEquipment from "@/libs/createEquipment";
import updateEquipment from "@/libs/updateEquipment";
import uploadEquipmentImage from "@/libs/uploadEquipmentImage";
import Drawer from "./Drawer";
import TextField from "./TextField";
import Button from "./Button";
import FormAlert from "./FormAlert";

const categories = ["โทรศัพท์", "กล้องถ่ายรูป", "โน้ตบุ๊ก", "อุปกรณ์เสริม"];
const imageTypes = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 2 * 1024 * 1024;

type Errors = { name?: string; quantity?: string; rentalRate?: string; image?: string; form?: string };

export default function EquipmentDrawer({ item, onClose }: { item: EquipmentItem | null; onClose: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState(item?.name ?? "");
  const [category, setCategory] = useState(item?.category ?? categories[0]);
  const [description, setDescription] = useState(item?.description ?? "");
  const [quantity, setQuantity] = useState(item ? String(item.quantity) : "");
  const [rentalRate, setRentalRate] = useState(item ? String(item.rentalRate) : "");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(item?.image ?? "");
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);

  const onPick = (picked: File | undefined) => {
    if (!picked) return;
    setFile(picked);
    setPreview(URL.createObjectURL(picked));
  };

  const onSave = async () => {
    if (!formRef.current?.reportValidity()) return;
    const next: Errors = {};
    const qty = Number(quantity);
    if (quantity === "" || !Number.isInteger(qty) || qty < 0) next.quantity = "ต้องเป็นจำนวนเต็ม 0 ขึ้นไป";
    if (rentalRate === "" || Number(rentalRate) < 0) next.rentalRate = "ค่าเช่าต้องไม่ติดลบ";
    if (file && !imageTypes.includes(file.type)) next.image = "รองรับเฉพาะไฟล์ jpg, png, webp";
    else if (file && file.size > MAX_SIZE) next.image = "ไฟล์ต้องไม่เกิน 2MB";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSaving(true);
    const body = { name, category, description, quantity: qty, rentalRate: Number(rentalRate) };
    const result = item ? await updateEquipment(item._id, body) : await createEquipment(body);
    if (!result.success) {
      setSaving(false);
      const isDuplicateName = /E11000|duplicate/i.test(result.error ?? "");
      if (isDuplicateName) setErrors({ name: "ชื่อนี้มีอยู่แล้ว" });
      else setErrors({ form: result.error });
      return;
    }
    const id = item ? item._id : (result as { id?: string }).id;
    if (file && id) {
      const formData = new FormData();
      formData.append("image", file);
      const upload = await uploadEquipmentImage(id, formData);
      if (!upload.success) {
        setSaving(false);
        setErrors({ form: upload.error });
        return;
      }
    }
    setSaving(false);
    onClose();
  };

  const imageError = !!errors.image;

  return (
    <Drawer
      title={item ? "แก้ไขอุปกรณ์" : "เพิ่มอุปกรณ์"}
      width="max-w-[480px]"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            ยกเลิก
          </Button>
          <Button onClick={onSave} disabled={saving}>
            {saving ? "กำลังอัปโหลด…" : "บันทึก"}
          </Button>
        </>
      }
    >
      <form ref={formRef} className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="a-img" className="text-sm font-medium">
            รูปอุปกรณ์
          </label>
          <div className={`flex gap-3 ${imageError ? "items-center" : "items-end"}`}>
            {preview && !imageError ? (
              <img
                src={preview}
                alt="ตัวอย่างรูปที่เลือก"
                className="aspect-square w-28 rounded-lg border border-line bg-page object-cover"
              />
            ) : (
              <div
                className={`box-border flex aspect-square items-center justify-center rounded-lg ${
                  imageError ? "w-[88px] border-2 border-dashed border-danger bg-danger-50 text-danger-text" : "w-28 border border-line bg-page text-muted"
                }`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
                </svg>
              </div>
            )}
            <div className="flex min-w-0 flex-col gap-1.5">
              <label
                htmlFor="a-img"
                className="inline-flex h-10 cursor-pointer items-center self-start rounded-lg border border-primary px-3.5 text-sm font-semibold text-primary"
              >
                {item ? "เปลี่ยนรูป" : "เลือกรูป"}
              </label>
              <input
                id="a-img"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => onPick(e.target.files?.[0])}
                className="absolute h-px w-px opacity-0"
              />
              <span className="text-xs text-muted">
                {imageError && file ? `${file.name} · ${(file.size / 1024 / 1024).toFixed(1)}MB` : "jpg, png, webp ไม่เกิน 2MB"}
              </span>
            </div>
          </div>
          {errors.image && <span className="text-[13px] font-medium text-danger-text">{errors.image}</span>}
        </div>
        <TextField id="a-name" label="ชื่ออุปกรณ์" value={name} onChange={setName} error={errors.name} required />
        <TextField id="a-cat" label="หมวดหมู่" type="select" options={categories} value={category} onChange={setCategory} />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="a-desc" className="text-sm font-medium">
            รายละเอียด
          </label>
          <textarea
            id="a-desc"
            rows={3}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-y rounded-lg border border-line px-3 py-2.5 text-[15px] text-ink"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <TextField id="a-qty" label="จำนวนที่มี" type="number" value={quantity} onChange={setQuantity} error={errors.quantity} />
          <TextField id="a-rate" label="ค่าเช่าต่อวัน" type="number" value={rentalRate} onChange={setRentalRate} error={errors.rentalRate} />
        </div>
        <FormAlert message={errors.form} />
      </form>
    </Drawer>
  );
}
