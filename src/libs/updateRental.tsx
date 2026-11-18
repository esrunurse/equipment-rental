"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function updateRental(
  id: string,
  rental: { quantity: number; startDate: string; returnDate: string }
) {
  const session = await getServerSession(authOptions);
  if (!session) return { success: false, error: "Not authorized to access this route" };
  const response = await fetch(`${process.env.BACKEND_URL}/rentals/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", authorization: `Bearer ${session.user.token}` },
    body: JSON.stringify(rental),
  });
  const json = await response.json();
  if (json.success) revalidatePath("/", "layout");
  return { success: json.success as boolean, error: json.error as string | undefined };
}
