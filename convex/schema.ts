import { defineSchema, defineTable } from "convex/server";
import {v} from "convex/values";

export default defineSchema({

    users: defineTable({
        userId : v.string(),
        email: v.string(),
        isPremium : v.boolean(),
        createdAt: v.number(),
    }).index("by_userId", ["userId"]),

    usage: defineTable({
        userId: v.string(),
        date: v.string(),
        count: v.number(),
    }).index("by_user_and_date", ["userId", "date"])
    .index("by_user", ["userId"]),
})