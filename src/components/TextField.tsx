export default function TextField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  options,
  error,
  required,
}: {
  id: string;
  label: string;
  type?: "text" | "email" | "tel" | "password" | "date" | "number" | "select";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: string[];
  error?: string;
  required?: boolean;
}) {
  const box = `box-border h-11 w-full min-w-0 rounded-lg bg-white px-3 text-[15px] text-ink ${
    error ? "border-2 border-danger" : "border border-line"
  }`;
  return (
    <div className="flex min-w-0 flex-col gap-1.5 text-ink">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {type === "select" ? (
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={box}>
          {options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={(e) => onChange(e.target.value)}
          className={box}
        />
      )}
      {error && <span className="text-[13px] font-medium text-danger-text">{error}</span>}
    </div>
  );
}
