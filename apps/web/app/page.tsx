"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "@/lib/api";
import { useCartStore } from "./store/cartStore";

export default function Page() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const addToCart = useCartStore((s) => s.addToCart);

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Failed to load products.</p>;

  return (
    <main className="p-10">
      <h1 className="text-2xl font-semibold mb-6">Produkter</h1>
      <div className="grid grid-cols-3 gap-6">
        {products?.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <h2 className="text-lg font-medium">{product.attributes.name}</h2>
            <p className="text-gray-500 mb-2">{product.attributes.price} SEK</p>
            <button
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: product.attributes.name,
                  price: product.attributes.price,
                })
              }
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Lägg i kundvagn
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
