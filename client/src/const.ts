export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

/**
 * Generate login URL at runtime.
 * In dev mode, redirects to the auto-login endpoint.
 * In production, could be extended to support an external OAuth provider.
 */
export const getLoginUrl = () => {
  return `/api/auth/dev-login`;
};
