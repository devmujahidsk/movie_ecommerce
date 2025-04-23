import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

type CartItem = {
  title: string;
  price: number;
  quantity: number;
  posterPath?: string;
};

export async function POST(req: NextRequest) {
  const items: CartItem[] = await req.json();

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: item.posterPath
              ? [`${req.nextUrl.origin}${item.posterPath}`]
              : [],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      success_url: `${req.nextUrl.origin}/thankyou`,
      cancel_url: `${req.nextUrl.origin}/cancel`,
    });

    console.log("Stripe session created:", session);

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("Stripe Error:", err);
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
