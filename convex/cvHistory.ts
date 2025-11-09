import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const saveCvHistory = mutation({
    args: {userId: v.string(), title: v.string(), content: v.string()},
    handler: async (ctx, {userId, title, content}) => {
        const user = await ctx.db
        .query("users")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .unique();

        if(!user) throw new Error("user not found");
        if(!user.isPremium) return;

        await ctx.db.insert("cvHistory", {
            userId,
            title,
            content,
            createdAt: Date.now(),
        });

    }
})

export const getCVHistory = query({
    args: {userId: v.string()},
    handler: async (ctx, {userId}) => {

        const user = await ctx.db
        .query("users")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .unique();

        if(!user || !user.isPremium) return [];

        const history = await ctx.db
        .query("cvHistory")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .order("desc")
        .take(20);

        return history;
    }
})