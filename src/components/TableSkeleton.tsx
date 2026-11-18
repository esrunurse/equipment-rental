export default function TableSkeleton({ columns, rows = 5 }: { columns: number; rows?: number }) {
  const cells = Array.from({ length: columns });
  return (
    <div aria-busy="true" className="overflow-x-auto rounded-xl border border-line bg-white">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line">
            {cells.map((_, column) => (
              <th key={column} scope="col" className="px-4 py-3">
                <div className="h-4 w-16 rounded bg-divider" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, row) => (
            <tr key={row} className="border-b border-divider">
              {cells.map((_, column) => (
                <td key={column} className="px-4 py-3">
                  <div className="h-4 w-3/4 rounded bg-divider" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
