export default function Banner({ q, category, sort }: { q?: string; category?: string; sort?: string }) {
  return (
    <section aria-label="แบนเนอร์" className="relative h-[380px] overflow-hidden bg-ink">
      <img src="/img/banner.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
      <div className="relative mx-auto box-border flex h-full max-w-[1280px] flex-col justify-center gap-4 px-6">
        <h1 className="m-0 text-[40px] leading-[1.35] font-bold text-white">เช่าอุปกรณ์ที่ต้องการ ได้ในไม่กี่คลิก</h1>
        <p className="m-0 text-lg text-white">โทรศัพท์ กล้องถ่ายรูป โน้ตบุ๊ก และอุปกรณ์เสริม พร้อมให้เช่าวันนี้</p>
        <form role="search" action="/" className="flex max-w-[560px] flex-wrap gap-2">
          <label htmlFor="q" className="sr-only">
            ค้นหาอุปกรณ์
          </label>
          <input
            id="q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="ค้นหาชื่ออุปกรณ์"
            className="box-border h-12 min-w-0 flex-[999_1_280px] rounded-lg border-0 bg-white px-3.5 text-base text-ink"
          />
          {category && <input type="hidden" name="category" value={category} />}
          {sort && <input type="hidden" name="sort" value={sort} />}
          <button
            type="submit"
            className="h-12 flex-[1_1_96px] cursor-pointer rounded-lg border-0 bg-primary text-base font-semibold text-white"
          >
            ค้นหา
          </button>
        </form>
      </div>
    </section>
  );
}
