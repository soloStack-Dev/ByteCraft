import { mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * Convex backend for the Contact form.
 *
 * Every submission is persisted to the `contactSubmissions` table so it
 * can be reviewed later. The client also fires an email through the
 * /api/contact route (Resend) so the owner gets the message instantly.
 */

/** Store a contact-form submission. */
export const submitContact = mutation({
  args: {
    username: v.string(),
    email: v.string(),
    phone: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("contactSubmissions", {
      username: args.username,
      email: args.email,
      phone: args.phone,
      message: args.message,
      createdAt: Date.now(),
    });
    return id;
  },
});