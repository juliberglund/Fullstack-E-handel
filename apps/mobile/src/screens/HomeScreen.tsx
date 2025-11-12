import React from "react";
import { View, Text, FlatList, Button, Image } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "../api/api";
import { useCartStore } from "../hooks/useCartStore";

export default function HomeScreen({ navigation }: any) {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const addToCart = useCartStore((s) => s.addToCart);

  if (isLoading) return <Text>Laddar produkter...</Text>;
  if (error) return <Text>Kunde inte hämta produkter.</Text>;

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View
          style={{
            padding: 10,
            borderWidth: 1,
            marginBottom: 10,
            borderRadius: 8,
          }}
        >
          {item.image && (
            <Image
              source={{ uri: item.image }}
              style={{ width: "100%", height: 150 }}
            />
          )}
          <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
          <Text>{item.price} SEK</Text>
          <Button title="Lägg i kundvagn" onPress={() => addToCart(item)} />
        </View>
      )}
    />
  );
}
