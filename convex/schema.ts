import { defineSchema, defineTable } from "convex/server";
import {v} from "convex/values";

export default defineSchema({
    usage: defineTable({
        userId: v.string(),
        date: v.string(),
        count: v.string(),
    }).index("by_user_and_date", ["userId", "date"])
    .index("by_user", ["userId"]),
})