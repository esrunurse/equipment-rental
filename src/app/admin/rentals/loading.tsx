import TableSkeleton from "@/components/TableSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto flex max-w-[1280px] flex-col gap-4 px-6 pt-8 pb-16">
      <div className="flex flex-col gap-1">
        <h1 className="m-0 text-[28px] leading-[1.4] font-bold">คำขอเช่าทั้งหมด</h1>
        <p className="m-0 text-sm text-muted">เปลี่ยนสถานะตามขั้นตอน แก้ไขหรือลบได้เฉพาะคำขอที่รออนุมัติ</p>
      </div>
      <TableSkeleton columns={7} />
    </main>
  );
}
