import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * ByteCraft Convex schema.
 *
 * - contactSubmissions: rows sent through the Contact form. Stored so
 *   submissions can be reviewed later; a copy is emailed via Resend.
 */
export default defineSchema({
  contactSubmissions: defineTable({
    username: v.string(),
    email: v.string(),
    phone: v.string(),
    message: v.string(),
    createdAt: v.number(),
  })
    .index("by_created_at", ["createdAt"])
    .index("by_email", ["email"]),
});