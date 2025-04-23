import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const count = await prisma.cart.count();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart count:", error);
    return NextResponse.json(
      { message: "Failed to fetch count" },
      { status: 500 }
    );
  }
}
