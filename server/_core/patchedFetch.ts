/**
 * Patched Fetch — Stub
 *
 * Previously patched streaming issues specific to the Manus Forge proxy.
 * No longer needed with direct OpenAI-compatible API access.
 * Preserved for import compatibility.
 */

/**
 * Returns the original fetch unchanged. The Forge-specific stream patching
 * has been removed as part of the Manus dependency cleanup.
 */
export function createPatchedFetch(originalFetch: typeof fetch): typeof fetch {
  console.warn("[PatchedFetch] stubbed: Manus Forge dependency removed");
  return originalFetch;
}
