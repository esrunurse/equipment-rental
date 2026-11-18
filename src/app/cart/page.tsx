import CartList from "@/components/CartList";
import CartGate from "@/components/CartGate";

export default function CartPage() {
  return (
    <main className="mx-auto flex max-w-[920px] flex-col gap-4 px-6 pt-8 pb-16">
      <h1 className="m-0 text-[28px] leading-[1.4] font-bold">ตะกร้า</h1>
      <CartGate>
        <CartList />
      </CartGate>
    </main>
  );
}
