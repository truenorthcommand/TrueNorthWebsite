/**
 * Image Generation — Stub
 * Previously used Manus Forge image service.
 * Now returns a placeholder image URL gracefully.
 */

export type GenerateImageOptions = {
  prompt: string;
  originalImages?: Array<{
    url?: string;
    b64Json?: string;
    mimeType?: string;
  }>;
};

export type GenerateImageResponse = {
  url?: string;
};

export async function generateImage(
  options: GenerateImageOptions
): Promise<GenerateImageResponse> {
  console.warn("[ImageGeneration] stubbed: Manus Forge dependency removed");
  return {
    url: "https://placehold.co/1024x1024/1a1a19/ffffff?text=Image+Generation+Stubbed",
  };
}
