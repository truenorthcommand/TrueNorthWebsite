/**
 * Auth Routes — Generic JWT Authentication
 *
 * Provides login/logout endpoints. In dev mode, auto-login is available.
 * Replaces the previous Manus OAuth callback flow.
 */

import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";
import { ENV } from "./env";

export function registerOAuthRoutes(app: Express) {
  /**
   * Dev-mode auto-login: GET /api/auth/dev-login
   * Only available when JWT_SECRET is not set.
   * Creates an admin session automatically.
   */
  app.get("/api/auth/dev-login", async (req: Request, res: Response) => {
    if (ENV.cookieSecret) {
      res.status(403).json({ error: "Dev login is disabled in production" });
      return;
    }

    try {
      const devOpenId = "dev-admin";

      // Ensure dev admin user exists
      let user = await db.getUserByOpenId(devOpenId);
      if (!user) {
        await db.upsertUser({
          openId: devOpenId,
          name: "Dev Admin",
          email: "admin@localhost",
          loginMethod: "dev",
          lastSignedIn: new Date(),
        });
      }

      const sessionToken = await sdk.createSessionToken(devOpenId, {
        name: "Dev Admin",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.redirect(302, "/");
    } catch (error) {
      console.error("[Auth] Dev login failed", error);
      res.status(500).json({ error: "Dev login failed" });
    }
  });

  /**
   * Legacy OAuth callback — returns a helpful message instead of erroring.
   * Keeps route registered to avoid 404s from old bookmarks/links.
   */
  app.get("/api/oauth/callback", async (_req: Request, res: Response) => {
    res.status(410).json({
      error: "OAuth callback is no longer available",
      message: "This app now uses JWT-based authentication. Use /api/auth/dev-login in development mode.",
    });
  });
}
