import { v } from "convex/values";
import { mutation, query } from "./_generated/server";


export const saveCv = mutation({
    args: {userId: v.string(), title: v.string(), content: v.string()},
    handler: async (ctx, {userId, title, content}) => {
        const user = await ctx.db
        .query("users")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .unique();

        if(!user) throw new Error("user not found");

        const existingCVs = await ctx.db
        .query("cvHistory")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .collect();

        if(!user.isPremium && existingCVs.length >= 3) {
            throw new Error("Freee user only can save upto 3 CVs");
        }

        const CvId = await ctx.db.insert("cvHistory", {
            userId,
            title,
            content,
            createdAt: Date.now(),
        });

        return CvId;
    }
})

export const getUserHistory = query({
    args: {userId: v.string()},
    handler: async (ctx, {userId}) => {
        const history = await ctx.db
        .query("cvHistory")
        .withIndex("by_userId", (q) => q.eq("userId", userId))
        .order("desc")
        .collect();

        return history;
    }
})