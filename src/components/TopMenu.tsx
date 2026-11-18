import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import TopMenuItem from "./TopMenuItem";
import CartLink from "./CartLink";
import LogoutButton from "./LogoutButton";

export default async function TopMenu() {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;

  return (
    <header className="box-border w-full border-b border-line bg-white text-ink">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-6 px-6 py-3">
        <Link href="/" className="text-xl font-bold text-primary no-underline">
          RentHub
        </Link>
        <nav aria-label="เมนูหลัก" className="flex flex-wrap gap-1">
          {role === "admin" && <TopMenuItem title="แดชบอร์ด" pageRef="/admin" exact />}
          <TopMenuItem title="อุปกรณ์ทั้งหมด" pageRef="/" activePrefix="/equipment" exact />
          {role === "member" && <TopMenuItem title="การเช่าของฉัน" pageRef="/rentals" />}
          {role === "admin" && <TopMenuItem title="จัดการอุปกรณ์" pageRef="/admin/equipment" />}
          {role === "admin" && <TopMenuItem title="คำขอเช่าทั้งหมด" pageRef="/admin/rentals" />}
        </nav>
        <div className="flex-[1_1_0]" />
        {session ? (
          <div className="flex flex-wrap items-center gap-4">
            {role === "member" && <CartLink />}
            <Link href="/profile" className="text-sm font-semibold text-ink no-underline">
              {session.user.name} <span className="text-xs font-medium text-muted">({role})</span>
            </Link>
            <LogoutButton />
          </div>
        ) : (
          <Link
            href="/signin"
            className="flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-white no-underline"
          >
            เข้าสู่ระบบ
          </Link>
        )}
      </div>
    </header>
  );
}
