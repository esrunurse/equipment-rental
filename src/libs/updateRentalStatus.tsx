"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { RentalStatus } from "../../interfaces";

export default async function updateRentalStatus(id: string, status: RentalStatus) {
  const session = await getServerSession(authOptions);
  if (!session) return { success: false, error: "Not authorized to access this route" };
  const response = await fetch(`${process.env.BACKEND_URL}/rentals/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", authorization: `Bearer ${session.user.token}` },
    body: JSON.stringify({ status }),
  });
  const json = await response.json();
  if (json.success) revalidatePath("/", "layout");
  return { success: json.success as boolean, error: json.error as string | undefined };
}
