import {query, mutation } from "./_generated/server"
import {v} from "convex/values"

export const getUsage = query({
    args: {userId : v.string(), date: v.string()},
    handler: async (ctx, {userId, date}) => {
        const usage = await ctx.db
        .query("usage")
        .withIndex("by_user_and_date", (q) => q.eq("userId", userId).eq("date", date))
        .unique();

        return usage?.count || 0;
    }
})

export const incrementUsage = mutation({
    args: {userId : v.string(), date: v.string()},
    handler: async (ctx, {userId, date}) => {
        const existing = await ctx.db
        .query("usage")
        .withIndex("by_user_and_date", (q) => q.eq("userId", userId).eq("date", date))
        .unique();

        if(existing) {
            await ctx.db.patch(existing._id, {count: existing.count + 1});
        }else{
            await ctx.db.insert("usage", {userId, date, count : 1});
        }
    }
})