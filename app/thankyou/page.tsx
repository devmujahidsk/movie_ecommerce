"use client";

import { useEffect } from "react";
import { useCartStore } from "@/app/store/cartStore";

function ThankYou() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    const clearCartOnServer = async () => {
      try {
        await fetch("/api/cart/clear", { method: "DELETE" });
        clearCart(); // also clear client state
        console.log("Cart cleared after payment!");
      } catch (error) {
        console.error("Failed to clear cart:", error);
      }
    };

    clearCartOnServer();
  }, [clearCart]);

  return (
    <div className="text-white text-5xl text-center font-bold pb-8">
      <h1 className="text-3xl font-bold mt-8">🎉 Payment Successful!</h1>
      <h1 className="text-3xl font-bold">
        🎉 ThankYou for Purchasing From Our Movie
      </h1>
    </div>
  );
}

export default ThankYou;
