"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// import { loadStripe } from "@stripe/stripe-js";
// import Link from 'next/link';

type CartItem = {
  //   id: number;
  //   movieId: number;
  title: string;
  posterPath: string;
  price: number;
  quantity: number; // <- add this
};

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch("/api/cart");
      const data = await res.json();
      setCartItems(data); // assuming only one item for now
    };
    fetchCart();
  }, []);

  const handlePayNow = async () => {
    try {
      const res = await fetch("/api/checkoutsession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItems), // cartItems is an array of CartItem
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url; // 👈 This line redirects to Stripe Checkout
      } else {
        console.error("Stripe URL not returned:", data);
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  // Calculate subtotal and total
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = 10; // Example shipping cost
  const total = subtotal + shipping;
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact */}
          <section className="bg-black mix-blend-difference text-white border border-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <input
              type="text"
              placeholder="Email or mobile phone number"
              className="w-full border text-white bg-black border-white rounded px-4 py-2 mb-3"
            />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" />
              Email me with news and offers
            </label>
          </section>

          {/* Delivery */}
          <section className="bg-black mix-blend-difference text-white border border-white p-6 rounded-lg shadow space-y-4">
            <h2 className="text-lg font-semibold">Delivery</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="First name"
                className="px-4 py-2 border text-white bg-black border-white rounded"
              />
              <input
                placeholder="Last name"
                className="px-4 py-2 border text-white bg-black border-white rounded"
              />
            </div>
            <input
              placeholder="Address"
              className="w-full px-4 border text-white bg-black border-white py-2 rounded"
            />
            <input
              placeholder="Apartment, suite, etc. (optional)"
              className="w-full px-4 border text-white bg-black border-white py-2 rounded"
            />
            <div className="grid grid-cols-3 gap-4">
              <input
                placeholder="City"
                className="border text-white bg-black border-white px-4 py-2 rounded"
              />
              <input
                placeholder="State"
                className="border text-white bg-black border-white px-4 py-2 rounded"
              />
              <input
                placeholder="PIN code"
                className="border text-white bg-black border-white px-4 py-2 rounded"
              />
            </div>
            <div className="flex gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Save this information
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Text me with offers
              </label>
            </div>
          </section>

          {/* Shipping method */}
          <section className="bg-black mix-blend-difference text-white border border-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold">Shipping method</h2>
            <p className="text-sm text-white">
              Enter your address to view shipping options.
            </p>
          </section>

          {/* Payment */}
          <section className="bg-black mix-blend-difference text-white border border-white p-6 rounded-lg shadow space-y-4">
            <h2 className="text-lg font-semibold">Payment</h2>
            <p className="text-sm text-white">
              All transactions are secure and encrypted.
            </p>
            <div className="border p-4 rounded text-sm">
              <div className="flex justify-between items-center">
                <p>Razorpay Secure (UPI, Cards, Wallets, NetBanking)</p>
                <div className="mt-2 flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    viewBox="0 0 38 24"
                    width="38"
                    height="24"
                    aria-labelledby="pi-upi"
                  >
                    <title id="pi-upi">UPI</title>
                    <path
                      opacity=".07"
                      d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    />
                    <path
                      fill="#fff"
                      d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                    />
                    <path
                      fill="#097939"
                      d="M 30.296875 17.160156 L 34.832031 11.933594 L 32.683594 6.527344 Z M 30.296875 17.160156 "
                    />
                    <path
                      fill="#ed752e"
                      d="M 28.769531 17.160156 L 33.304688 11.933594 L 31.15625 6.527344 Z M 28.769531 17.160156 "
                    />
                    <path
                      fill="#747474"
                      d="M 7.097656 6.589844 L 5.1875 15.179688 L 11.964844 15.238281 L 13.828125 6.589844 L 15.546875 6.589844 L 13.3125 16.644531 C 13.226562 17.027344 12.902344 17.339844 12.585938 17.339844 L 3.898438 17.339844 C 3.371094 17.339844 3.058594 16.820312 3.203125 16.179688 L 5.332031 6.589844 Z M 28.054688 6.527344 L 29.773438 6.527344 L 27.386719 17.339844 L 25.617188 17.339844 Z M 15.738281 11.03125 L 24.332031 10.972656 L 24.902344 8.691406 L 16.167969 8.691406 L 16.691406 6.585938 L 26.003906 6.480469 C 26.582031 6.472656 26.925781 7.039062 26.773438 7.746094 L 25.898438 11.796875 C 25.742188 12.503906 25.148438 13.074219 24.570312 13.074219 L 16.882812 13.074219 L 15.976562 17.519531 L 14.304688 17.519531 Z M 15.738281 11.03125 "
                    />
                  </svg>

                  <svg
                    viewBox="0 0 38 24"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    width="38"
                    height="24"
                    aria-labelledby="pi-visa"
                  >
                    <title id="pi-visa">Visa</title>
                    <path
                      opacity=".07"
                      d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    />
                    <path
                      fill="#fff"
                      d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                    />
                    <path
                      d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                      fill="#142688"
                    />
                  </svg>

                  <svg
                    viewBox="0 0 38 24"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    width="38"
                    height="24"
                    aria-labelledby="pi-master"
                  >
                    <title id="pi-master">Mastercard</title>
                    <path
                      opacity=".07"
                      d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    />
                    <path
                      fill="#fff"
                      d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                    />
                    <circle fill="#EB001B" cx="15" cy="12" r="7" />
                    <circle fill="#F79E1B" cx="23" cy="12" r="7" />
                    <path
                      fill="#FF5F00"
                      d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                    />
                  </svg>

                  <svg
                    viewBox="0 0 38 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="24"
                    role="img"
                    aria-labelledby="pi-rupay"
                  >
                    <title id="pi-rupay">RuPay</title>
                    <g fill="none" fillRule="evenodd">
                      <rect
                        strokeOpacity=".07"
                        stroke="#000"
                        fill="#FFF"
                        x=".5"
                        y=".5"
                        width="37"
                        height="23"
                        rx="3"
                      />
                      <path fill="#097A44" d="M32 15.77l2-7.41 2 3.82z" />
                      <path fill="#F46F20" d="M30.76 15.79l2-7.4 2 3.82z" />
                      <path
                        d="M20.67 8.2a2 2 0 0 0-1.56-.56h-3l-1.95 6.81h1.75l.66-2.31h1.23a3.4 3.4 0 0 0 1.9-.5 2.93 2.93 0 0 0 1.12-1.72 1.77 1.77 0 0 0-.15-1.72zm-3.21.94h1.12a.76.76 0 0 1 .55.15c.11.11.07.35 0 .53a1.08 1.08 0 0 1-.4.62 1.21 1.21 0 0 1-.7.2H17l.46-1.5zM9.14 9a1.64 1.64 0 0 0-.2-.61 1.3 1.3 0 0 0-.58-.53 2.75 2.75 0 0 0-1.08-.18H4l-2 6.75h1.73l.72-2.52H5.7c.47 0 .58.1.6.13.02.03.09.15 0 .65l-.16.6a3.35 3.35 0 0 0-.11.59v.55h1.79l.12-.43-.11-.08s-.07-.05-.06-.2c.027-.19.07-.377.13-.56l.1-.42a2.14 2.14 0 0 0 .1-1.11.88.88 0 0 0-.26-.41 2 2 0 0 0 .68-.54 2.79 2.79 0 0 0 .53-1c.07-.22.101-.45.09-.68zm-1.86.83a.84.84 0 0 1-.5.6 1.79 1.79 0 0 1-.64.09H4.86l.38-1.33h1.43a1.1 1.1 0 0 1 .53.09c.05 0 .21.07.08.5v.05zm4.9 2.17a2.11 2.11 0 0 1-.3.67 1 1 0 0 1-.87.43c-.34 0-.36-.14-.38-.2a1.24 1.24 0 0 1 .07-.52l.89-3.11H9.9l-.86 3a3 3 0 0 0-.15 1.32c.08.42.4.91 1.41.91.247.004.493-.03.73-.1a2.51 2.51 0 0 0 .6-.29l-.08.3h1.62l1.47-5.13H13L12.18 12zm12.93 1.1l.63-2.18c.24-.83-.07-1.21-.37-1.39A2.75 2.75 0 0 0 24 9.2a2.87 2.87 0 0 0-2 .68 2.75 2.75 0 0 0-.69 1.1l-.09.26h1.61v-.11a1.15 1.15 0 0 1 .25-.37.84.84 0 0 1 .56-.17.89.89 0 0 1 .46.08v.18c0 .06 0 .15-.25.23a2.13 2.13 0 0 1-.48.1l-.44.05a4 4 0 0 0-1.25.32c-.57.271-.99.78-1.15 1.39a1.25 1.25 0 0 0 .17 1.22c.289.307.7.468 1.12.44a2.43 2.43 0 0 0 1.07-.25l.4-.23v.33H25l.13-.48-.13-.07a.61.61 0 0 1 0-.22c0-.25.07-.43.11-.58zm-2.92-.1a.62.62 0 0 1 .34-.4 2.17 2.17 0 0 1 .57-.15l.29-.05.3-.07v.07a1.24 1.24 0 0 1-.51.75 1.44 1.44 0 0 1-.72.21.34.34 0 0 1-.25-.08.55.55 0 0 1-.02-.28zm7.91-3.68l-1.69 3v-3h-1.8l.39 5.13-.12.19a.8.8 0 0 1-.23.25.64.64 0 0 1-.24.08h-.68l-.39 1.37h.83a2 2 0 0 0 1.29-.34 9.55 9.55 0 0 0 1.27-1.71l3.17-5-1.8.03z"
                        fill="#302F82"
                      />
                    </g>
                  </svg>

                  <svg
                    viewBox="0 0 38 24"
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    width="38"
                    height="24"
                    role="img"
                    aria-labelledby="pi-paytm"
                  >
                    <title id="pi-paytm">Paytm</title>
                    <rect
                      x=".5"
                      y=".5"
                      width="37"
                      height="23"
                      rx="3"
                      ry="3"
                      fill="#fff"
                      stroke="#000"
                      strokeOpacity=".07"
                    />
                    <path
                      d="M14.17 13.32v2.6a.87.87 0 0 1-.74.91h-2.7a1.83 1.83 0 0 1-2-1.9 14.66 14.66 0 0 1 .06-2.08 1.81 1.81 0 0 1 1.69-1.54h1.19a.31.31 0 0 0 .34-.41.33.33 0 0 0-.23-.41H10c-.38 0-.46-.08-.46-.47V8.91a.3.3 0 0 1 .25-.35h2.39a1.87 1.87 0 0 1 1.92 2.1c.08.91.07 1.79.07 2.66zm-3.32 1.34a.34.34 0 0 0 .31.36h.61a.33.33 0 0 0 .36-.35v-1.13c0-.3-.16-.36-.72-.36s-.53.1-.56.37v1.11zm9.58-2.73v2.81a2 2 0 0 1-1.85 2.15h-2.45c-.34 0-.42-.07-.42-.42v-1.26a.3.3 0 0 1 .29-.35h2a.32.32 0 0 0 .36-.34.33.33 0 0 0-.31-.35h-1a1.94 1.94 0 0 1-2-1.86V9a.32.32 0 0 1 .26-.37h1.34c.34 0 .42.1.42.45v2.6c0 .45.1.54.55.54h.05c.62 0 .67-.05.67-.66V9a.36.36 0 0 1 .45-.5H20a.36.36 0 0 1 .42.42c.01 1.08.01 2.02.01 3.01zM4.57 14.48v1.94c0 .46-.06.51-.52.51H2.87a.3.3 0 0 1-.36-.36V9a.28.28 0 0 1 .22-.32H6.2a1.66 1.66 0 0 1 1.62 1.61 17.62 17.62 0 0 1 0 2.49 1.74 1.74 0 0 1-1.73 1.74H4.57zm0-2.08h.86a.32.32 0 0 0 .32-.31V11a.32.32 0 0 0-.28-.35h-.88v1.74z"
                      fill="#22346c"
                    />
                    <path
                      d="M28.94 9a2.2 2.2 0 0 1 2.86.1 7.28 7.28 0 0 1 1.15-.51 2.08 2.08 0 0 1 2.56 2v5.83c0 .36-.09.45-.45.45h-1.15a.35.35 0 0 1-.42-.42v-5.24a.6.6 0 0 0-.79-.64.55.55 0 0 0-.49.58v5.4a.31.31 0 0 1-.25.36h-1.43a.3.3 0 0 1-.35-.31v-5.43a.48.48 0 0 0-.29-.55 1.38 1.38 0 0 0-.71 0 .48.48 0 0 0-.26.53v5.21c0 .48-.06.55-.56.55h-1c-.36 0-.42-.08-.42-.44V9c0-.42.06-.47.46-.47h1.09a.42.42 0 0 1 .45.47zm-5.43 1.64h-.77a.33.33 0 0 1-.41-.4V9a.31.31 0 0 1 .25-.36h.1a2 2 0 0 0 1.74-1 2 2 0 0 1 .58-.57c.24-.16.42 0 .44.27v1.27h.7a.36.36 0 0 1 .42.42v1.22a.35.35 0 0 1-.42.42h-.66v5.83c0 .42-.07.48-.47.49h-1.09a.34.34 0 0 1-.42-.42c.01-1.87.01-5.78.01-5.92z"
                      fill="#24b8eb"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-4 border-t pt-4">
                After clicking Pay now, you will be redirected to Razorpay to
                complete your purchase securely.
              </div>
            </div>
          </section>

          {/* Billing address */}
          <section className="bg-black mix-blend-difference text-white border border-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-white mix-blend-difference mb-4">
              Billing address
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="billing"
                  onChange={() => setUseDifferentBilling(false)}
                  checked={!useDifferentBilling}
                />
                Same as shipping address
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="billing"
                  onChange={() => setUseDifferentBilling(true)}
                  checked={useDifferentBilling}
                />
                Use a different billing address
              </label>
            </div>

            {/* Smooth collapsible section */}
            <div
              className={`transition-all duration-300 overflow-hidden grid gap-4 mt-4 ${
                useDifferentBilling
                  ? "max-h-[1000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="grid grid-cols-2 gap-4">
                <input
                  placeholder="First name"
                  className="border text-white bg-black border-white px-4 py-2 rounded"
                />
                <input
                  placeholder="Last name"
                  className="border text-white bg-black border-white px-4 py-2 rounded"
                />
              </div>
              <input
                placeholder="Address"
                className="w-full border text-white bg-black border-white px-4 py-2 rounded"
              />
              <input
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full border text-white bg-black border-white px-4 py-2 rounded"
              />
              <div className="grid grid-cols-3 gap-4">
                <input
                  placeholder="City"
                  className="border text-white bg-black border-white px-4 py-2 rounded"
                />
                <input
                  placeholder="State"
                  className="border text-white bg-black border-white px-4 py-2 rounded"
                />
                <input
                  placeholder="PIN code"
                  className="border text-white bg-black border-white px-4 py-2 rounded"
                />
              </div>
            </div>
          </section>

          {/* Pay Now Button */}
          <button
            onClick={handlePayNow}
            className="w-full bg-black border-white border text-white py-3 mix-blend-difference rounded-lg font-semibold"
          >
            Pay now
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-black border text-white border-white p-6 rounded-lg shadow sticky h-fit">
          {cartItems.length > 0 ? (
            <>
              {/* Loop through all cart items */}
              {cartItems.map((cartItem, index) => (
                <div
                  key={index}
                  className="flex gap-4 mb-4 border-b last:border-b-0"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${cartItem.posterPath}`}
                    alt={cartItem.title}
                    width={50}
                    height={50}
                    priority
                    className="rounded z-40 mb-4"
                  />
                  <div className="flex-1 relative">
                    <h3 className="font-semibold text-xl">{cartItem.title}</h3>
                    <p className="absolute -top-[10px] -left-[35px] bg-white text-red-500 mix-blend-difference rounded-full text-s w-8 h-8 flex items-center justify-center z-50">
                      {cartItem.quantity}
                    </p>
                    <p className="font-medium mt-1">${cartItem.price}</p>
                  </div>
                </div>
              ))}

              <div className="mt-6">
                <input
                  type="text"
                  placeholder="Discount code or gift card"
                  className="border text-white bg-black border-white px-4 py-2 w-full rounded"
                />
                <button className="mt-2 text-sm font-medium text-blue-600">
                  Apply
                </button>
              </div>

              <div className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-white">Enter address</span>
                </div>
                <div className="flex justify-between font-semibold text-base mt-2">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </>
          ) : (
            <p>Loading cart...</p>
          )}
        </div>
      </div>
    </div>
  );
}
