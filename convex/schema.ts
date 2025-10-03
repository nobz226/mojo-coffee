import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkUserId: v.string(),
  }).index("by_clerk_id", ["clerkUserId"]),

  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(), // Store in cents to avoid floating point issues
    imageUrl: v.string(),
    origin: v.string(), // e.g., "Ethiopia", "Colombia"
    roastType: v.string(), // e.g., "Light", "Medium", "Dark"
    dietaryProfile: v.object({
      nonDairy: v.boolean(),
      glutenFree: v.boolean(),
    }),
    inStock: v.boolean(),
    createdAt: v.number(), // timestamp
  })
    .index("by_name", ["name"])
    .index("by_roast_type", ["roastType"]),
});