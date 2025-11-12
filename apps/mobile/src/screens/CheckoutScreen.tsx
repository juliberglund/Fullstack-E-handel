import React from "react";
import { Text } from "react-native";
import { useCartStore } from "../hooks/useCartStore";
import { WebView } from "react-native-webview";

export default function CheckoutScreen() {
  const { items, total } = useCartStore();

  if (items.length === 0) return <Text>Din kundvagn är tom.</Text>;

  const html = `
    <html>
      <body>
        <script src="https://www.paypal.com/sdk/js?client-id=YOUR_SANDBOX_CLIENT_ID&currency=SEK"></script>
        <div id="paypal-button-container"></div>
        <script>
          paypal.Buttons({
            createOrder: function(data, actions) {
              return actions.order.create({ purchase_units: [{ amount: { value: '${total.toFixed(2)}' } }] });
            },
            onApprove: function(data, actions) {
              return actions.order.capture().then(function(details) {
                alert('Tack ' + details.payer.name.given_name + '!');
              });
            }
          }).render('#paypal-button-container');
        </script>
      </body>
    </html>
  `;

  return (
    <WebView originWhitelist={["*"]} source={{ html }} style={{ flex: 1 }} />
  );
}
