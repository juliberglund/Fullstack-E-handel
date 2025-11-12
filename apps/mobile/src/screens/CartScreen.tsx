import React from "react";
import { View, Text, FlatList, Button } from "react-native";
import { useCartStore } from "../hooks/useCartStore";

export default function CartScreen({ navigation }: any) {
  const { items, removeFromCart, total } = useCartStore();

  return (
    <View style={{ padding: 20 }}>
      {items.length === 0 ? (
        <Text>Din kundvagn är tom.</Text>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <Text>
                  {item.name} – {item.price} SEK × {item.quantity}
                </Text>
                <Button
                  title="Ta bort"
                  onPress={() => removeFromCart(item.id)}
                />
              </View>
            )}
          />
          <Text style={{ fontWeight: "bold", marginTop: 10 }}>
            Totalt: {total.toFixed(2)} SEK
          </Text>
          <Button
            title="Till betalning"
            onPress={() => navigation.navigate("Checkout")}
          />
        </>
      )}
    </View>
  );
}
