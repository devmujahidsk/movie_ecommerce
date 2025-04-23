"use client";
import { createContext, useContext, useEffect, useState } from "react";

type CartContextType = {
  cartCount: number;
  updateCartCount: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = async () => {
    const res = await fetch("/api/cart/count");
    const data = await res.json();
    setCartCount(data.count);
  };

  useEffect(() => {
    updateCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
};
