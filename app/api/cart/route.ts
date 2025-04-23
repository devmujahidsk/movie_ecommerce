import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Handle POST request - Add to cart start
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { movieId, title, posterPath, releaseDate, price } = body;

    // Check if the item already exists in the cart
    const existingItem = await prisma.cart.findFirst({
      where: {
        movieId: movieId,
      },
    });

    if (existingItem) {
      // If it exists, update the quantity
      const updatedItem = await prisma.cart.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + 1,
        },
      });

      return NextResponse.json(updatedItem, { status: 200 });
    } else {
      // If it doesn't exist, create a new item
      const newCartItem = await prisma.cart.create({
        data: {
          movieId,
          title,
          posterPath,
          releaseDate,
          price,
          quantity: 1, // add initial quantity
        },
      });

      return NextResponse.json(newCartItem, { status: 201 });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { message: "Failed to add to cart" },
      { status: 500 }
    );
  }
}
// Handle POST request - Add to cart end

// Handle GET request - Add to cart start
export async function GET() {
  try {
    const cartItems = await prisma.cart.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json(
      { message: "Failed to fetch cart items" },
      { status: 500 }
    );
  }
}
// Handle GET request - Add to cart end
