import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createUser = mutation({
    args: {userId : v.string(), email: v.string()},
    handler : async (ctx, args) => {
        const existing = await ctx.db
        .query("users")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .unique();

        if(!existing){
            await ctx.db.insert("users", {
                userId: args.userId,
                email: args.email,
                isPremium: false,
                createdAt: Date.now(),
            })
        }
    }
})