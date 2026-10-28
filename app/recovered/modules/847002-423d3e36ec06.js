// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.healthRoutes = void 0));
  let o = e.r(876543);
  r.healthRoutes = (0, e.r(183184).defineRoutes)({
    "GET /health": {
      summary: "Liveness health check",
      response: o.z.object({
        status: o.z.enum(["ok", "stalled"]).describe("Service health status"),
        event_loop: o.z.object({
          stalled_windows: o.z
            .number()
            .int()
            .describe(
              "Consecutive 10 s windows on this worker whose event-loop max lag reached 1 s (0 during the 120 s boot phase)",
            ),
          lag_max_ms: o.z
            .number()
            .describe("This worker's last window max event-loop lag, in ms"),
        }),
      }),
    },
  });
};
