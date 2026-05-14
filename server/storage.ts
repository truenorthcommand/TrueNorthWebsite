// Storage helpers — Stub
// Previously used Manus Forge storage proxy. Now returns null gracefully.

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream"
): Promise<{ key: string; url: string } | null> {
  console.warn("[Storage] stubbed: Manus Forge dependency removed");
  return null;
}

export async function storageGet(
  relKey: string
): Promise<{ key: string; url: string } | null> {
  console.warn("[Storage] stubbed: Manus Forge dependency removed");
  return null;
}
