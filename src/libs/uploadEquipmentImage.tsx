"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function uploadEquipmentImage(id: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session) return { success: false, error: "Not authorized to access this route" };
  const response = await fetch(`${process.env.BACKEND_URL}/equipment/${id}/image`, {
    method: "POST",
    headers: { authorization: `Bearer ${session.user.token}` },
    body: formData,
  });
  const json = await response.json();
  if (json.success) revalidatePath("/", "layout");
  return { success: json.success as boolean, error: json.error as string | undefined };
}
