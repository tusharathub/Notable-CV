import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const syncUser = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    isPremium: v.optional(v.boolean()),
  },
  handler: async (ctx, { userId, email, isPremium }) => {
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .first();

    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        email,
        isPremium: isPremium ?? existingUser.isPremium,
      });
      return existingUser._id;
    }

    // Create new user
    return await ctx.db.insert("users", {
      userId,
      email: email ,
      isPremium: isPremium ?? false,
      createdAt: Date.now(),
    });
  },
});

export const updatePremiumStatus = mutation({
    args: {userId : v.string(), isPremium: v.boolean()},
    handler: async (ctx, args) => {
        const user = await ctx.db
        .query("users")
        .withIndex("by_userId", (q) => q.eq("userId", args.userId))
        .unique();

        if(user) {
            await ctx.db.patch(user._id, {isPremium: args.isPremium});
        }
    }
})
