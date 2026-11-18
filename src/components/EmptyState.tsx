type Props = {
  message: string;
  large?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

export function EmptyContent({ message, large, icon, children }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      {icon}
      {large ? (
        <h2 className="m-0 text-[22px] font-bold">{message}</h2>
      ) : (
        <p className="m-0 text-base font-semibold">{message}</p>
      )}
      {children}
    </div>
  );
}

export default function EmptyState(props: Props) {
  return (
    <div className="rounded-xl border border-line bg-white px-6 py-12">
      <EmptyContent {...props} />
    </div>
  );
}
