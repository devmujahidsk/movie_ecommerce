// app/api/cart/clear/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// import prisma from "@/app/lib/prisma";

const prisma = new PrismaClient();

export async function DELETE() {
  try {
    const clearCart = await prisma.cart.deleteMany(); // If user-based, use where: { userId: "..." }
    return NextResponse.json({ clearCart }, { status: 200 });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json(
      { error: "Failed to clear cart" },
      { status: 500 }
    );
  }
}
