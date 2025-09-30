import { mutation } from "./_generated/server";
import { v } from "convex/values";

export default mutation({
  args: {
    clerkUserId: v.string(),
  },
  handler: async ({ db }, { clerkUserId }) => {
    await db.insert("users", { clerkUserId });
  },
});
