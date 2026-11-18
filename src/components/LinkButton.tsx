import Link from "next/link";

const variants = {
  primary: "border-primary bg-primary text-white",
  secondary: "border-primary bg-white text-primary",
};

export default function LinkButton({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`box-border flex h-11 items-center rounded-lg border px-[18px] text-[15px] font-semibold no-underline ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}
