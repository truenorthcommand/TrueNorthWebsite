/**
 * Data API — Stub
 * Previously called external APIs through the Manus Forge proxy.
 * Now returns an empty object gracefully.
 *
 * Quick example (matches original curl usage):
 *   await callDataApi("Youtube/search", {
 *     query: { gl: "US", hl: "en", q: "truenorth" },
 *   })
 */

export type DataApiCallOptions = {
  query?: Record<string, unknown>;
  body?: Record<string, unknown>;
  pathParams?: Record<string, unknown>;
  formData?: Record<string, unknown>;
};

export async function callDataApi(
  apiId: string,
  options: DataApiCallOptions = {}
): Promise<unknown> {
  console.warn("[DataApi] stubbed: Manus Forge dependency removed");
  return {};
}
