import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req:Request) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    let event : Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig!,
            process.env.STRIPE_SECRET_KEY!
        )
    } catch (err: any) {
        return NextResponse.json({error : err.message}, {status: 400})
    }

    switch(event.type){
        case "checkout.session.completed": {
            const session = event.data.object as Stripe.Checkout.Session;
            const userId = session.metadata?.userId;
            if(userId) {
                await convex.mutation(api.users.updatePremiumStatus, {userId, isPremium: true});
            }
            break;
        }

        case "customer.subscription.deleted": {
            const subscription = event.data.object as Stripe.Subscription;
            const userId = (subscription.metadata as any)?.userId;
            if(userId){
                await convex.mutation(api.users.updatePremiumStatus,{userId, isPremium: false})
            }
            break;
        }
    }
    return NextResponse.json({received: true});
}