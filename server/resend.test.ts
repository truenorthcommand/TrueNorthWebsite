import { describe, it, expect } from "vitest";
import * as dotenv from "dotenv";

dotenv.config();

describe("Resend API Key Validation", () => {
  it("should have RESEND_API_KEY set and be a valid format", () => {
    const apiKey = process.env.RESEND_API_KEY;
    expect(apiKey, "RESEND_API_KEY must be set").toBeTruthy();
    // Resend API keys start with 're_'
    expect(apiKey, "RESEND_API_KEY must start with re_").toMatch(/^re_/);
  });

  it("should confirm key is send-only (restricted) or full access", async () => {
    const apiKey = process.env.RESEND_API_KEY;
    // A send-only key returns 401 on domains.list but works for emails.send
    // This is the expected and correct permission level for sending audit emails
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.domains.list();
    // Either no error (full access) or restricted_api_key (send-only) — both are valid
    if (error) {
      expect(error.name).toBe("restricted_api_key");
    } else {
      expect(error).toBeNull();
    }
  }, 15000);
});
