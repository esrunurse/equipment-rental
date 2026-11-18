import { RentalJson } from "../../interfaces";

export default async function getRentals(token: string): Promise<RentalJson> {
  const response = await fetch(`${process.env.BACKEND_URL}/rentals`, {
    headers: { authorization: `Bearer ${token}` },
    next: { tags: ["rentals"] },
  });
  if (!response.ok) throw new Error("Failed to fetch rentals");
  return await response.json();
}
