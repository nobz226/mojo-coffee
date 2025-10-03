import { query } from "./_generated/server";
import { v } from "convex/values";

// Get all products
export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

// Get single product by ID
export const getById = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get products by roast type
export const getByRoastType = query({
  args: { roastType: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .withIndex("by_roast_type", (q) => q.eq("roastType", args.roastType))
      .collect();
  },
});