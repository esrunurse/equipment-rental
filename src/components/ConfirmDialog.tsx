import Button from "./Button";

export default function ConfirmDialog({
  title,
  message,
  confirmLabel,
  onCancel,
  onConfirm,
}: {
  title: string;
  message: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-20 box-border flex items-center justify-center bg-[rgba(19,40,44,0.45)] p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cd-title"
        className="box-border flex w-[400px] max-w-full flex-col gap-3 rounded-xl bg-white p-6 text-ink shadow-[0_16px_40px_rgba(19,40,44,0.25)]"
      >
        <h2 id="cd-title" className="m-0 text-lg leading-[1.4] font-semibold">
          {title}
        </h2>
        <p className="m-0 text-[15px] leading-[1.6] text-muted">{message}</p>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" onClick={onCancel}>
            ยกเลิก
          </Button>
          <button
            type="button"
            onClick={onConfirm}
            className="h-11 cursor-pointer rounded-lg border border-danger bg-danger px-[18px] text-[15px] font-semibold text-white"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
