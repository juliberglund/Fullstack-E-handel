export type Product = {
  id: number;
  name: string;
  price: number;
  description?: string;
  image?: string;
};
export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("http://localhost:1337/api/products?populate=*");
  if (!res.ok) throw new Error("Failed to fetch products");

  const data = await res.json();

  return data.data.map((item: any) => ({
    id: item.id,
    name: item.attributes.name,
    price: item.attributes.price,
    description: item.attributes.description,
    image: item.attributes.image?.data?.attributes?.url,
  }));
};
