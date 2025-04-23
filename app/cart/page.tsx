"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/app/store/cartStore";
type CartItem = {
  id: number;
  movieId: number;
  title: string;
  posterPath: string;
  releaseDate: string;
  price: number;
  quantity: number; // <- add this
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const setCount = useCartStore((state) => state.setCount);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("/api/cart");
      const data = await res.json();
      setCartItems(data);
      setCount(data.length);
    };

    fetchCart();
  }, [setCount]);

  // remove the product from cart function start
  const handleRemove = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove the product from cart?"
    );
    if (!confirmed) return;

    try {
      await fetch(`/api/cart/${id}`, {
        method: "DELETE",
      });

      setCartItems((prevItems) => {
        const updatedItems = prevItems.filter((item) => item.id !== id);
        setCount(updatedItems.reduce((acc, item) => acc + item.quantity, 0));
        return updatedItems;
      });
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };
  // remove the product from cart function end

  // Update button handler
  const updateQuantity = async (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const res = await fetch(`/api/cart/${id}/quantity`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!res.ok) throw new Error("Failed to update quantity");

      setCartItems((prevItems) => {
        const updatedItems = prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCount(updatedItems.reduce((acc, item) => acc + item.quantity, 0));
        return updatedItems;
      });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  // Update button handler

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-8 text-black mix-blend-difference bg-black min-h-screen">
      <h1 className="text-3xl text-white font-bold mb-8 border-b pb-4">
        Product
      </h1>
      <div data-merge-list-item="item-key:head">
        <div
          className="cart-item-list__head grid gap-4 grid-cols-[4fr_1fr_1fr_1fr]"
          aria-hidden="true"
        >
          <div className="text-xl font-semibold flex-1 text-white mix-blend-difference cart-item-list-heading cart-item-list-heading--product">
            Product Name
          </div>
          <div className="text-xl font-semibold text-white mix-blend-difference cart-item-list-heading cart-item-list-heading--price">
            Price
          </div>
          <div className="text-xl font-semibold text-white mix-blend-difference cart-item-list-heading cart-item-list-heading--quantity">
            Quantity
          </div>
          <div className="text-xl font-semibold text-white mix-blend-difference cart-item-list-heading cart-item-list-heading--total">
            Subtotal
          </div>
        </div>
      </div>
      {cartItems.length === 0 ? (
        <>
          <p className="text-gray-600">Your Cart is Empty!</p>
          <Image
            src="/shopping.png"
            alt="empty cart"
            width={512}
            height={512}
            priority
            className="mix-blend-difference text-white"
          />
        </>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[3fr_1fr_1fr_1fr] items-center border-t py-6 gap-6"
            >
              <div className="product-details flex items-center gap-8">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
                  alt={item.title}
                  width={150}
                  height={200}
                  priority
                  className="rounded-md"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mix-blend-difference">
                    {item.title}
                  </h2>
                  <p className="text-white mix-blend-difference">
                    Release: {item.releaseDate}
                  </p>
                </div>
              </div>
              <div className="flex justify-between text-center mx-auto gap-4">
                <p className="font-semibold text-lg text-white mix-blend-difference">
                  $. {item.price.toFixed(2)}
                </p>
              </div>
              <div>
                <div className="flex items-center justify-center border rounded mx-auto w-36">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 text-xl text-white mix-blend-difference"
                  >
                    −
                  </button>
                  <span className="px-4 text-white mix-blend-difference">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 text-xl text-white mix-blend-difference"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 mix-blend-difference justify-center flex mt-4 w-36 rounded text-lg px-8 mx-auto border"
                >
                  Remove
                </button>
              </div>
              {/* sub total of each item */}
              <p className="font-semibold text-lg text-white mix-blend-difference">
                $. {(item.price * item.quantity).toFixed(2)}
              </p>
              {/* sub total of each item */}
            </div>
          ))}

          {/* Subtotal and Checkout */}
          <div className="mt-10 text-right">
            <p className="text-2xl text-white mix-blend-difference font-bold">
              Subtotal: $. {subtotal.toFixed(2)}
            </p>
            <p className="text-white mix-blend-difference mb-4">
              Discounts & taxes are calculated at checkout
            </p>
            <Link
              href="/checkout"
              className="text-white px-8 py-3 rounded-full text-lg font-semibold mix-blend-difference bg-orange-400 hover:bg-gray-800 transition"
            >
              CHECKOUT
            </Link>
            <div className="mt-4">
              <Link href="/" className="text-red-500 underline text-sm">
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
