import EmptyState from "@/components/EmptyState";
import LinkButton from "@/components/LinkButton";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-[1080px] flex-col gap-8 px-6 pt-10 pb-16">
      <EmptyState large message="ไม่พบอุปกรณ์นี้">
        <LinkButton href="/">กลับหน้ารายการ</LinkButton>
      </EmptyState>
    </main>
  );
}
