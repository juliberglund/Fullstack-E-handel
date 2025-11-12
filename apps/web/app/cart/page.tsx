"use client";
import Link from "next/link";
import { useCartStore } from "../store/cartStore";

export default function CartPage() {
  const { items, removeFromCart, total } = useCartStore();

  return (
    <main className="p-10">
      <h1 className="text-2xl font-semibold mb-4">Din kundvagn</h1>
      {items.length === 0 ? (
        <p>Din kundvagn är tom.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between border-b pb-2 items-center"
              >
                <div>
                  <strong>{item.name}</strong> – {item.price} SEK ×{" "}
                  {item.quantity}
                </div>
                <button
                  className="text-red-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  Ta bort
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 font-semibold">
            Totalt: {total.toFixed(2)} SEK
          </div>
          <Link
            href="/checkout"
            className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Till betalning
          </Link>
        </>
      )}
    </main>
  );
}
