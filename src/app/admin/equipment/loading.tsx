import TableSkeleton from "@/components/TableSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto max-w-[1280px] px-6 pt-8 pb-16">
      <section className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="m-0 text-[28px] leading-[1.4] font-bold">จัดการอุปกรณ์</h1>
          <div className="h-11 w-[150px] rounded-lg bg-divider" />
        </div>
        <TableSkeleton columns={5} rows={10} />
      </section>
    </main>
  );
}
