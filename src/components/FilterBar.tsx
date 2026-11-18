"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = ["ทั้งหมด", "โทรศัพท์", "กล้องถ่ายรูป", "โน้ตบุ๊ก", "อุปกรณ์เสริม"];
const sorts = [
  { value: "price_desc", label: "ราคา สูง-ต่ำ" },
  { value: "price_asc", label: "ราคา ต่ำ-สูง" },
  { value: "name", label: "ชื่อ A-Z" },
];

export default function FilterBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get("category") ?? "";
  const sort = searchParams.get("sort") ?? "name";

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div role="group" aria-label="หมวดหมู่" className="flex flex-wrap gap-2">
        {categories.map((c) => {
          const value = c === "ทั้งหมด" ? "" : c;
          const on = value === current;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={on}
              onClick={() => update("category", value)}
              className={`h-[38px] cursor-pointer rounded-full border px-4 text-sm ${
                on ? "border-primary bg-primary font-semibold text-white" : "border-line bg-white text-ink"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-sm text-muted">
          เรียงตาม
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => update("sort", e.target.value === "name" ? "" : e.target.value)}
          className="h-10 rounded-lg border border-line bg-white px-2.5 text-sm text-ink"
        >
          {sorts.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
