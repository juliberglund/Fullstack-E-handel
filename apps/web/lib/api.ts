export type Product = {
  id: number;
  attributes: {
    name: string;
    price: number;
    description?: string;
  };
};

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("http://localhost:1337/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.data;
};
