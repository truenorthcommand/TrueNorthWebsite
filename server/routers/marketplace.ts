import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { notifyOwner } from "../_core/notification";

export const marketplaceRouter = router({
  submitFeedback: publicProcedure
    .input(z.object({
      email: z.string().email().max(320),
      request: z.string().min(1).max(2000),
    }))
    .mutation(async ({ input }) => {
      await notifyOwner({
        title: `New marketplace request from ${input.email}`,
        content: `**Email:** ${input.email}\n\n**Request:**\n${input.request}`,
      });
      return { success: true };
    }),
});
