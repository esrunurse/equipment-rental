export default function EquipmentSkeleton() {
  return (
    <div aria-busy="true" className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="flex flex-col overflow-hidden rounded-xl border border-line bg-white">
          <div className="aspect-square w-full bg-divider" />
          <div className="flex flex-col gap-1.5 px-4 pt-3.5 pb-4">
            <div className="h-4 w-1/4 rounded bg-divider" />
            <div className="h-6 w-4/5 rounded bg-divider" />
            <div className="h-5 w-1/3 rounded bg-divider" />
            <div className="mt-1.5 flex items-center justify-between gap-2">
              <div className="h-7 w-24 rounded bg-divider" />
              <div className="h-[38px] w-[106px] rounded-lg bg-divider" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
