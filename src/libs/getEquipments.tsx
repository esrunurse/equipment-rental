import { EquipmentJson } from "../../interfaces";

export default async function getEquipments(): Promise<EquipmentJson> {
  const response = await fetch(`${process.env.BACKEND_URL}/equipment`, {
    next: { tags: ["equipment"] },
  });
  if (!response.ok) throw new Error("Failed to fetch equipment");
  return await response.json();
}
