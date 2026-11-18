export default function Drawer({
  title,
  width,
  onClose,
  footer,
  children,
}: {
  title: string;
  width: "max-w-[420px]" | "max-w-[480px]";
  onClose: () => void;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="fixed inset-0 z-10 bg-[rgba(19,40,44,0.45)]" onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={`fixed inset-y-0 right-0 z-10 box-border flex w-full flex-col bg-white shadow-[-8px_0_32px_rgba(19,40,44,0.18)] ${width}`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 id="drawer-title" className="m-0 text-lg leading-[1.4] font-semibold">
            {title}
          </h2>
          <button
            type="button"
            aria-label="ปิด"
            onClick={onClose}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-line bg-white text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-[1_1_0] flex-col gap-4 overflow-y-auto p-6">{children}</div>
        <div className="flex justify-end gap-2 border-t border-line px-6 py-4">{footer}</div>
      </aside>
    </>
  );
}
