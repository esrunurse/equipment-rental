const variants = {
  primary: "border-primary bg-primary text-white hover:bg-primary-700",
  secondary: "border-primary bg-white text-primary",
  danger: "border-[#F0C4C0] bg-white text-danger",
  disabled: "border-divider bg-divider text-[#6B7C7F]",
};

export default function Button({
  children,
  variant = "primary",
  full = false,
  type = "button",
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  full?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
}) {
  const look = disabled ? variants.disabled : variants[variant];
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`box-border h-11 cursor-pointer rounded-lg border px-[18px] text-[15px] font-semibold disabled:cursor-not-allowed ${full ? "w-full" : ""} ${look}`}
    >
      {children}
    </button>
  );
}
