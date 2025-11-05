"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "@/lib/api";

export default function Page() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Failed to load products.</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Produkter</h1>
      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            {product.attributes.name} – ${product.attributes.price}
          </li>
        ))}
      </ul>
    </main>
  );
}
