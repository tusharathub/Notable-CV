import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Syncs Clerk user with Convex.
 * - If user exists, updates email or premium status.
 * - If not, creates a new user.
 */
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
      .unique(); 

    if (existingUser) {

        const updatePremium = isPremium === undefined ? existingUser.isPremium : existingUser.isPremium || isPremium;

      await ctx.db.patch(existingUser._id, {
        email,
        isPremium: updatePremium,
      });
      return existingUser._id;
    }

    // ✅ Create new user if not found
    return await ctx.db.insert("users", {
      userId,
      email,
      isPremium: isPremium ?? false,
      createdAt: Date.now(),
    });
  },
});

/**
 * Updates a user's premium status (for Stripe webhook or upgrade flow).
 */
export const updatePremiumStatus = mutation({
  args: { userId: v.string(), isPremium: v.boolean() },
  handler: async (ctx, args) => {
    console.log("Updating premium for", args.userId);
    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();

    if (user) {
      await ctx.db.patch(user._id, { isPremium: args.isPremium });
      console.log("Updated user to premium");
    } else {
      console.log("User not found in Convex");
    }
  },
});


/**
 * Retrieves a user by their Clerk userId.
 */
export const getUserById = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    if (!userId) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();

    return user || null;
  },
});
