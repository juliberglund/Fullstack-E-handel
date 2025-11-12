"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCartStore } from "../store/cartStore";

export default function CheckoutPage() {
  const { total, items } = useCartStore();

  if (items.length === 0) return <p className="p-10">Din kundvagn är tom.</p>;

  return (
    <main className="p-10">
      <h1 className="text-2xl font-semibold mb-6">Betalning</h1>
      <p className="mb-4">Totalt: {total.toFixed(2)} SEK</p>

      <PayPalScriptProvider options={{ "client-id": "YOUR_SANDBOX_CLIENT_ID" }}>
        <PayPalButtons
          createOrder={(_data: any, actions: any) =>
            actions.order.create({
              purchase_units: [{ amount: { value: total.toFixed(2) } }],
            })
          }
          onApprove={(_data: any, actions: any) =>
            actions.order.capture().then((details: any) => {
              alert(`Tack ${details.payer.name.given_name}!`);
            })
          }
        />
      </PayPalScriptProvider>
    </main>
  );
}
