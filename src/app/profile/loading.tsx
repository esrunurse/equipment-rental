import TableSkeleton from "@/components/TableSkeleton";

export default function Loading() {
  return (
    <main className="mx-auto flex max-w-[920px] flex-col gap-5 px-6 pt-8 pb-16">
      <h1 className="m-0 text-[28px] leading-[1.4] font-bold">โปรไฟล์</h1>
      <div aria-busy="true" className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 rounded-xl border border-line bg-white p-6">
        {[1, 2, 3, 4].map((field) => (
          <div key={field} className="flex flex-col gap-1.5">
            <div className="h-4 w-16 rounded bg-divider" />
            <div className="h-6 w-3/4 rounded bg-divider" />
          </div>
        ))}
      </div>
      <TableSkeleton columns={4} />
    </main>
  );
}
