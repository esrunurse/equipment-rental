export default function Loading() {
  return (
    <main aria-busy="true" className="mx-auto flex max-w-[1080px] flex-wrap items-start gap-8 px-6 pt-8 pb-16">
      <section className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
        <div className="aspect-square w-full max-w-[420px] rounded-xl bg-divider" />
        <div className="h-4 w-24 rounded bg-divider" />
        <div className="h-9 w-3/4 rounded bg-divider" />
        <div className="h-5 w-full rounded bg-divider" />
        <div className="h-5 w-2/3 rounded bg-divider" />
        <div className="h-8 w-40 rounded bg-divider" />
      </section>
      <section className="flex min-w-0 flex-[1_1_340px] flex-col gap-4 rounded-xl border border-line bg-white p-6">
        <div className="h-7 w-20 rounded bg-divider" />
        <div className="h-[72px] rounded-lg bg-divider" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-[72px] rounded-lg bg-divider" />
          <div className="h-[72px] rounded-lg bg-divider" />
        </div>
        <div className="h-11 rounded-lg bg-divider" />
        <div className="h-11 rounded-lg bg-divider" />
      </section>
    </main>
  );
}
