import { EmptyContent } from "./EmptyState";

export default function EmptyRow({
  colSpan,
  message,
  children,
}: {
  colSpan: number;
  message: string;
  children?: React.ReactNode;
}) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-6 py-12">
        <EmptyContent message={message}>{children}</EmptyContent>
      </td>
    </tr>
  );
}
