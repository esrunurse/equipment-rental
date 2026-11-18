"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function createEquipment(equipment: {
  name: string;
  category: string;
  description: string;
  quantity: number;
  rentalRate: number;
}) {
  const session = await getServerSession(authOptions);
  if (!session) return { success: false, error: "Not authorized to access this route" };
  const response = await fetch(`${process.env.BACKEND_URL}/equipment`, {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization: `Bearer ${session.user.token}` },
    body: JSON.stringify(equipment),
  });
  const json = await response.json();
  if (json.success) revalidatePath("/", "layout");
  return { success: json.success as boolean, error: json.error as string | undefined, id: json.data?._id as string | undefined };
}
