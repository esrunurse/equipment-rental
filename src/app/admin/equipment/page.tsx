import getEquipments from "@/libs/getEquipments";
import imageUrl from "@/libs/imageUrl";
import EquipmentAdmin from "@/components/EquipmentAdmin";

export default async function AdminEquipmentPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const page = parseInt((await searchParams).page ?? "1") || 1;
  const equipmentJson = await getEquipments();
  const items = equipmentJson.data.map((item) => ({ ...item, image: imageUrl(item.image) }));

  return (
    <main className="mx-auto max-w-[1280px] px-6 pt-8 pb-16">
      <EquipmentAdmin items={items} page={page} />
    </main>
  );
}
