import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkUserId: v.string(),
  }).index("by_clerk_id", ["clerkUserId"]),

  products: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
    imageUrl: v.string(),
    origin: v.string(),
    roastType: v.string(),
    dietaryProfile: v.object({
      nonDairy: v.boolean(),
      glutenFree: v.boolean(),
    }),
    inStock: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_name", ["name"])
    .index("by_roast_type", ["roastType"]),

  cartItems: defineTable({
    userId: v.id("users"),
    productId: v.id("products"),
    quantity: v.number(),
    addedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_product", ["userId", "productId"]),
});