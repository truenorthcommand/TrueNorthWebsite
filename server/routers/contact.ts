import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { contactSubmissions, auditSubmissions } from "../../drizzle/schema";
import { notifyOwner } from "../_core/notification";
import { generateAuditReport } from "../auditEngine";
import { buildAuditEmailHtml, buildAuditEmailText } from "../auditEmailTemplate";
import { ENV } from "../_core/env";
import { Resend } from "resend";

// Verified sending domain: noreply.truenorthoperationsgroup.com (subdomain)
const FROM_EMAIL = "TrueNorth Operations Group <noreply@noreply.truenorthoperationsgroup.com>";

async function sendAuditResultsEmail(
  name: string,
  email: string,
  answers: Record<string, string>
): Promise<void> {
  if (!ENV.resendApiKey) {
    console.warn("[Audit Email] RESEND_API_KEY not set — skipping email send.");
    return;
  }

  try {
    const report = generateAuditReport(answers);
    const html = buildAuditEmailHtml(name, report);
    const text = buildAuditEmailText(name, report);

    const resend = new Resend(ENV.resendApiKey);

    // Set a 10-second timeout for the email send to prevent hanging
    const emailPromise = resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Your TrueNorth Operational Audit Report — Score: ${report.score.total}/10`,
      html,
      text,
    });

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Email send timeout after 10 seconds")), 10000);
    });

    const { error } = await Promise.race([emailPromise, timeoutPromise]) as any;

    if (error) {
      console.error("[Audit Email] Failed to send audit results email:", error);
    } else {
      console.log(`[Audit Email] Audit results sent to ${email}`);
    }
  } catch (err) {
    console.error("[Audit Email] Exception during email send:", err instanceof Error ? err.message : String(err));
  }
}

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

      // Notify owner
      await notifyOwner({
        title: `New free audit submission from ${input.name}`,
        content: `**Name:** ${input.name}\n**Email:** ${input.email}\n\n**Answers:**\n${answersText}`,
      });

      // Send personalised audit results email to the user (non-blocking, fire-and-forget)
      // We do not await this to keep the mutation response fast
      sendAuditResultsEmail(input.name, input.email, input.answers)
        .catch((err) => {
          console.error("[Audit Email] Unhandled error in fire-and-forget:", err);
        });
      
      // Ensure we don't hang waiting for email
      // The email send happens in the background with its own 10-second timeout

      return { success: true };
    }),
});
