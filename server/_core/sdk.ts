/**
 * Auth SDK — Generic JWT Authentication
 *
 * Provides session management via JWT tokens stored in cookies.
 * In dev mode (no JWT_SECRET), automatically creates an admin session.
 */

import { COOKIE_NAME } from "@shared/const";
import { ForbiddenError } from "@shared/_core/errors";
import { parse as parseCookieHeader } from "cookie";
import type { Request } from "express";
import { SignJWT, jwtVerify } from "jose";
import type { User } from "../../drizzle/schema";
import * as db from "../db";
import { ENV } from "./env";

const DEV_SECRET = "dev-secret-do-not-use-in-production";
const DEV_ADMIN_OPEN_ID = "dev-admin";

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0;

export type SessionPayload = {
  openId: string;
  appId: string;
  name: string;
};

class AuthService {
  private isDevMode: boolean;

  constructor() {
    this.isDevMode = !ENV.cookieSecret;
    if (this.isDevMode) {
      console.warn(
        "\n" +
        "╔══════════════════════════════════════════════════════════╗\n" +
        "║  ⚠️  DEV MODE: No JWT_SECRET set                        ║\n" +
        "║  Using hardcoded dev secret — NOT FOR PRODUCTION         ║\n" +
        "║  Set JWT_SECRET env var for production deployments        ║\n" +
        "╚══════════════════════════════════════════════════════════╝\n"
      );
    } else {
      console.log("[Auth] Initialized with JWT authentication");
    }
  }

  private getSessionSecret() {
    const secret = ENV.cookieSecret || DEV_SECRET;
    return new TextEncoder().encode(secret);
  }

  /**
   * Create a session token for a user
   */
  async createSessionToken(
    openId: string,
    options: { expiresInMs?: number; name?: string } = {}
  ): Promise<string> {
    return this.signSession(
      {
        openId,
        appId: ENV.appId || "truenorth",
        name: options.name || "",
      },
      options
    );
  }

  async signSession(
    payload: SessionPayload,
    options: { expiresInMs?: number } = {}
  ): Promise<string> {
    const issuedAt = Date.now();
    const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
    const expiresInMs = options.expiresInMs ?? ONE_YEAR_MS;
    const expirationSeconds = Math.floor((issuedAt + expiresInMs) / 1000);
    const secretKey = this.getSessionSecret();

    return new SignJWT({
      openId: payload.openId,
      appId: payload.appId,
      name: payload.name,
    })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(expirationSeconds)
      .sign(secretKey);
  }

  async verifySession(
    cookieValue: string | undefined | null
  ): Promise<{ openId: string; appId: string; name: string } | null> {
    if (!cookieValue) {
      return null;
    }

    try {
      const secretKey = this.getSessionSecret();
      const { payload } = await jwtVerify(cookieValue, secretKey, {
        algorithms: ["HS256"],
      });
      const { openId, appId, name } = payload as Record<string, unknown>;

      if (
        !isNonEmptyString(openId) ||
        !isNonEmptyString(appId) ||
        !isNonEmptyString(name)
      ) {
        console.warn("[Auth] Session payload missing required fields");
        return null;
      }

      return { openId, appId, name };
    } catch (error) {
      console.warn("[Auth] Session verification failed", String(error));
      return null;
    }
  }

  private parseCookies(cookieHeader: string | undefined) {
    if (!cookieHeader) {
      return new Map<string, string>();
    }
    const parsed = parseCookieHeader(cookieHeader);
    return new Map(Object.entries(parsed));
  }

  /**
   * Authenticate an Express request by reading the session cookie.
   * In dev mode without a valid session, auto-creates an admin user.
   */
  async authenticateRequest(req: Request): Promise<User> {
    const cookies = this.parseCookies(req.headers.cookie);
    const sessionCookie = cookies.get(COOKIE_NAME);
    const session = await this.verifySession(sessionCookie);

    if (session) {
      // Valid session — look up user in DB
      let user = await db.getUserByOpenId(session.openId);
      if (user) {
        await db.upsertUser({
          openId: user.openId,
          lastSignedIn: new Date(),
        });
        return user;
      }
    }

    // In dev mode, auto-create admin user for convenience
    if (this.isDevMode) {
      let devUser = await db.getUserByOpenId(DEV_ADMIN_OPEN_ID);
      if (!devUser) {
        await db.upsertUser({
          openId: DEV_ADMIN_OPEN_ID,
          name: "Dev Admin",
          email: "admin@localhost",
          loginMethod: "dev",
          lastSignedIn: new Date(),
        });
        devUser = await db.getUserByOpenId(DEV_ADMIN_OPEN_ID);
      }
      if (devUser) {
        console.warn("[Auth] Dev mode: auto-authenticated as Dev Admin");
        return devUser;
      }
    }

    throw ForbiddenError("Invalid session cookie");
  }
}

export const sdk = new AuthService();
