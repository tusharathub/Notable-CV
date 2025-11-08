import { NextResponse } from "next/server";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    try {
        const {userId} = await req.json();

        if(!userId) {
            return NextResponse.json({error: "User ID is missing"}, {status: 400});
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "subscription",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data : {name: "AI CV Builder Premium Plan"},
                        unit_amount: 449,
                        recurring: {interval: "month"},
                    },
                    quantity: 1,
                }
            ],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
            metadata : {userId},
        })

        return NextResponse.json({url: session.url});
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({error: "Error creating checkout session"}, {status: 500});
    }
}
