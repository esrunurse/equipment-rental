import TableSkeleton from "@/components/TableSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto flex max-w-[1080px] flex-col gap-5 px-6 pt-8 pb-16">
      <h1 className="m-0 text-[28px] leading-[1.4] font-bold">แดชบอร์ด</h1>
      <div aria-busy="true" className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {[1, 2, 3, 4].map((card) => (
          <div key={card} className="flex flex-col gap-2 rounded-xl border border-line bg-white p-5">
            <div className="h-5 w-24 rounded bg-divider" />
            <div className="h-10 w-16 rounded bg-divider" />
          </div>
        ))}
      </div>
      <h2 className="mt-2 mb-0 text-xl font-semibold">คำขอล่าสุด</h2>
      <TableSkeleton columns={4} />
    </main>
  );
}
