import type { FastifyInstance } from "fastify";
import type { CalloutsStore } from "./callouts-store.js";

export const CALLOUTS_NATIVE_ROUTES = new Set(["GET /callout/{calloutId}"]);
export function registerCalloutRoutes(
  app: FastifyInstance,
  store: CalloutsStore,
): void {
  app.get("/v1/callout/:calloutId", async (request, reply) => {
    // No query behavior is documented for this operation. Do not pretend viewer/filter hints work.
    if (new URLSearchParams(request.url.split("?")[1] ?? "").size !== 0) {
      return reply
        .code(501)
        .send({
          error: "COMPATIBILITY_NOT_IMPLEMENTED",
          reason: "CALLOUT_QUERY_UNSUPPORTED",
        });
    }
    const { calloutId } = request.params as { calloutId: string };
    return reply
      .header("X-Reconstruction-Data-Source", store.dataSource)
      .header("X-Reconstruction-Observed-At", store.observedAt)
      .header("X-Reconstruction-Compatibility", "unqualified")
      .send(store.get(calloutId));
  });
}
