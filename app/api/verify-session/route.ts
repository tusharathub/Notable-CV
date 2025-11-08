import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("metadata userId", session.metadata?.userId)
    const userId = session.metadata?.userId;
    

    if (!userId) {
      return NextResponse.json({ error: "No user metadata found" }, { status: 400 });
    }
    

    return NextResponse.json({ userId });
  } catch (error) {
    console.error("Verification failed:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
