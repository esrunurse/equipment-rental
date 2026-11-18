import { redirect } from "next/navigation";

export default async function RedirectToHome({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const query = new URLSearchParams(await searchParams).toString();
  redirect(query ? `/?${query}` : "/");
}
