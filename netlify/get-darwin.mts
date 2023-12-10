let client: any;
export async function getDarwinClient(): Promise<
  typeof import("national-rail-darwin-promises")
> {
  if (!client) {
    // Patching a bug in xmldoc
    globalThis.global = globalThis as unknown as (typeof globalThis)["global"];
    const { default: Darwin } = await import("national-rail-darwin-promises");
    client = new Darwin();
  }
  return client;
}
