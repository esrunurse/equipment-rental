export default function FormAlert({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="m-0 rounded-lg bg-danger-50 px-3 py-2.5 text-sm text-[#8A2620]">
      {message}
    </p>
  );
}
