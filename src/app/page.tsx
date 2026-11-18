import { Suspense } from "react";
import getEquipments from "@/libs/getEquipments";
import Banner from "@/components/Banner";
import FilterBar from "@/components/FilterBar";
import EquipmentCatalog from "@/components/EquipmentCatalog";
import EquipmentSkeleton from "@/components/EquipmentSkeleton";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; sort?: string; page?: string }>;
}) {
  const params = await searchParams;
  const equipmentJson = getEquipments();

  return (
    <>
      <Banner q={params.q} category={params.category} sort={params.sort} />
      <main className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 pt-8 pb-16">
        <FilterBar />
        <Suspense key={JSON.stringify(params)} fallback={<EquipmentSkeleton />}>
          <EquipmentCatalog equipmentJson={equipmentJson} params={params} />
        </Suspense>
      </main>
    </>
  );
}
