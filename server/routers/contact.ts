import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { contactSubmissions, auditSubmissions } from "../../drizzle/schema";
import { notifyOwner } from "../_core/notification";

export const contactRouter = router({
  submit: publicProcedure
    .input(z.object({
      name: z.string().min(1).max(255),
      email: z.string().email().max(320),
      company: z.string().max(255).optional().default(""),
      audience: z.string().max(100).optional().default(""),
      message: z.string().min(1).max(5000),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (db) await db.insert(contactSubmissions).values({
        name: input.name,
        email: input.email,
        company: input.company || null,
        audience: input.audience || null,
        message: input.message,
      });

      await notifyOwner({
        title: `New contact form submission from ${input.name}`,
        content: `**Name:** ${input.name}\n**Email:** ${input.email}\n**Company:** ${input.company || "—"}\n**Audience:** ${input.audience || "—"}\n\n**Message:**\n${input.message}`,
      });

      return { success: true };
    }),
});

export const auditRouter = router({
  submit: publicProcedure
    .input(z.object({
      name: z.string().min(1).max(255),
      email: z.string().email().max(320),
      answers: z.record(z.string(), z.string()),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (db) await db.insert(auditSubmissions).values({
        name: input.name,
        email: input.email,
        answers: JSON.stringify(input.answers),
      });

      const answersText = Object.entries(input.answers)
        .map(([k, v]) => `**${k}:** ${v}`)
        .join("\n");

      await notifyOwner({
        title: `New free audit submission from ${input.name}`,
        content: `**Name:** ${input.name}\n**Email:** ${input.email}\n\n**Answers:**\n${answersText}`,
      });

      return { success: true };
    }),
});
