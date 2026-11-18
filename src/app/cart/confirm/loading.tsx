export default function Loading() {
  return (
    <main className="mx-auto flex max-w-[920px] flex-col gap-4 px-6 pt-8 pb-16">
      <div className="flex flex-col gap-1">
        <h1 className="m-0 text-[28px] leading-[1.4] font-bold">ยืนยันคำขอเช่า</h1>
        <p className="m-0 text-[15px] text-muted">ตรวจรายละเอียดก่อนส่ง</p>
      </div>
      <div aria-busy="true" className="flex flex-col gap-2 rounded-xl border border-line bg-white p-5">
        <div className="h-4 w-12 rounded bg-divider" />
        <div className="h-6 w-40 rounded bg-divider" />
        <div className="h-5 w-64 rounded bg-divider" />
      </div>
      <div className="flex flex-col gap-4 rounded-xl border border-line bg-white p-5">
        {[1, 2].map((item) => (
          <div key={item} className="flex items-center gap-4">
            <div className="h-[72px] w-[72px] rounded-lg bg-divider" />
            <div className="flex flex-1 flex-col gap-2">
              <div className="h-5 w-1/2 rounded bg-divider" />
              <div className="h-4 w-2/3 rounded bg-divider" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
