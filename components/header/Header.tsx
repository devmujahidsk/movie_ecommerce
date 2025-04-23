"use client";
import React, { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { Navbar } from "./Navbar";
// import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { useCartStore } from "@/app/store/cartStore";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const count = useCartStore((state) => state.count);
  // const { cartCount } = useCart();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="flex justify-between mb-16">
        <div className="cartIcon fixed top-0 left-0 p-8 cursor-pointer z-50 mix-blend-difference">
          <div className="relative">
            <Link href="/cart">
              <FaCartShopping className="w-20 h-10 text-white" />
              {count > 0 && (
                <span className="absolute -top-4 right-0 bg-white text-red-500 mix-blend-difference rounded-full text-s w-8 h-8 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
        <div className="text-right fixed top-0 right-0 cursor-pointer z-50 mix-blend-difference">
          <h3
            className="text-white text-4xl font-bold p-8 mix-blend-difference"
            onClick={toggleMenu}
          >
            Menu
          </h3>
        </div>
      </div>
      <header>
        <Navbar isOpen={isOpen} toggleMenu={toggleMenu} />
      </header>
    </>
  );
};
