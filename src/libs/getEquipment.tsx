export default async function getEquipment(id: string) {
  const response = await fetch(`${process.env.BACKEND_URL}/equipment/${id}`, {
    next: { tags: ["equipment"] },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Failed to fetch equipment");
  return await response.json();
}
