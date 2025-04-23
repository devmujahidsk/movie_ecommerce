// app/api/cart/[id]/quantity/route.ts

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { quantity } = await req.json();
  const cartId = parseInt(context.params.id);

  if (!quantity || quantity < 1) {
    return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
  }

  try {
    const updatedItem = await prisma.cart.update({
      where: { id: cartId },
      data: { quantity },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Error updating quantity:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
