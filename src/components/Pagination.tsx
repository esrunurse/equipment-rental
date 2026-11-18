"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function pageNumbers(current: number, total: number) {
  const show = new Set<number>();
  if (total <= 5) {
    for (let n = 1; n <= total; n++) show.add(n);
  } else {
    [1, 2, 3, current - 1, current, current + 1, total - 1, total].forEach((n) => {
      if (n >= 1 && n <= total) show.add(n);
    });
  }
  return [...show].sort((a, b) => a - b);
}

const btn = "h-9 rounded-lg border border-line bg-white px-3 text-sm";
const pageLook = (on: boolean) =>
  `text-[15px] decoration-2 underline-offset-[6px] ${
    on ? "font-bold text-primary underline" : "font-medium text-muted no-underline"
  }`;

export default function Pagination({ current, total }: { current: number; total: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const hrefFor = (n: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(n));
    return `${pathname}?${params.toString()}`;
  };

  const go = (n: number) => {
    if (n < 1 || n > total) return;
    router.push(hrefFor(n));
  };

  const pages = pageNumbers(current, total);

  return (
    <nav aria-label="เปลี่ยนหน้า" className="flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={() => go(current - 1)}
        className={`${btn} ${current <= 1 ? "cursor-not-allowed text-[#6B7C7F]" : "cursor-pointer text-ink"}`}
      >
        ก่อนหน้า
      </button>
      <div className="flex items-center gap-3">
        {pages.map((n, i) => (
          <span key={n} className="flex items-center gap-3">
            {i > 0 && n - pages[i - 1] > 1 && (
              <span aria-hidden="true" className="text-[15px] text-[#6B7C7F]">
                …
              </span>
            )}
            <Link href={hrefFor(n)} aria-current={n === current ? "page" : undefined} className={pageLook(n === current)}>
              {n}
            </Link>
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => go(current + 1)}
        className={`${btn} ${current >= total ? "cursor-not-allowed text-[#6B7C7F]" : "cursor-pointer text-ink"}`}
      >
        ถัดไป
      </button>
    </nav>
  );
}
