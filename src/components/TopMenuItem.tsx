"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopMenuItem({
  title,
  pageRef,
  exact,
  activePrefix,
}: {
  title: string;
  pageRef: string;
  exact?: boolean;
  activePrefix?: string;
}) {
  const pathname = usePathname();
  const active =
    (exact ? pathname === pageRef : pathname === pageRef || pathname.startsWith(`${pageRef}/`)) ||
    (!!activePrefix && pathname.startsWith(activePrefix));
  return (
    <Link
      href={pageRef}
      className={`rounded-lg px-3 py-2 text-[15px] no-underline ${
        active ? "bg-primary-50 font-semibold text-primary" : "font-medium text-muted"
      }`}
    >
      {title}
    </Link>
  );
}
