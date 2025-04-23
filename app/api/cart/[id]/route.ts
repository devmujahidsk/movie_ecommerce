import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// Delete query start
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const cartId = parseInt(params.id);

  try {
    await prisma.cart.delete({
      where: { id: cartId },
    });
    return NextResponse.json({ message: "Item Deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { message: "Failed to delete item" },
      { status: 500 }
    );
  }
}

// Delete query end
