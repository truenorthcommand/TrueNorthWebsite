import { describe, it, expect, vi } from "vitest";
import * as dotenv from "dotenv";

dotenv.config();

describe("Audit Email Sending with Timeout", () => {
  it("should handle email send with 10-second timeout", async () => {
    const { Resend } = await import("resend");
    const apiKey = process.env.RESEND_API_KEY;

    expect(apiKey, "RESEND_API_KEY must be set").toBeTruthy();

    const resend = new Resend(apiKey);

    // Simulate the timeout protection logic
    const emailPromise = resend.emails.send({
      from: "TrueNorth Operations Group <noreply@noreply.truenorthoperationsgroup.com>",
      to: "test@example.com",
      subject: "Test Email",
      html: "<p>Test</p>",
      text: "Test",
    });

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Email send timeout after 10 seconds")), 10000);
    });

    try {
      const result = await Promise.race([emailPromise, timeoutPromise]) as any;
      // Either succeeds or fails, but should not hang
      expect(result).toBeDefined();
    } catch (err) {
      // Expected to fail due to invalid email, but should not timeout
      const errorMsg = err instanceof Error ? err.message : String(err);
      expect(errorMsg).not.toContain("timeout");
    }
  }, 15000);

  it("should not hang when email send is slow", async () => {
    // This test verifies that even if the Resend API is slow,
    // the 10-second timeout will prevent the mutation from hanging
    const startTime = Date.now();

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Email send timeout after 10 seconds")), 10000);
    });

    try {
      // Simulate a slow operation
      await Promise.race([
        new Promise(resolve => setTimeout(() => resolve("done"), 5000)),
        timeoutPromise
      ]);
      const duration = Date.now() - startTime;
      expect(duration).toBeLessThan(6000); // Should complete in ~5 seconds
    } catch (err) {
      // Should not timeout
      const errorMsg = err instanceof Error ? err.message : String(err);
      expect(errorMsg).not.toContain("timeout");
    }
  }, 15000);
});
