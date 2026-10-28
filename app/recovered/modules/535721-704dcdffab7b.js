// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.flagsRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = o.z.union([
      o.z.boolean(),
      o.z.string(),
      o.z.number(),
      o.z.record(o.z.string(), o.z.unknown()),
      o.z.array(o.z.string()).readonly(),
      o.z.array(o.z.number()).readonly(),
    ]);
  r.flagsRoutes = (0, n.defineRoutes)({
    "GET /internal/flags": {
      summary:
        "Internal flag-store snapshot: the source, its load state and every resolved flag with its outcome",
      response: o.z.object({
        source: o.z.string(),
        loaded: o.z.boolean(),
        fetchedAt: o.z
          .number()
          .nullable()
          .describe("Unix epoch milliseconds of the last snapshot fetch"),
        ageMs: o.z.number().nullable(),
        flags: o.z.record(
          o.z.string(),
          o.z.object({
            value: s,
            outcome: o.z.enum([
              "resolved",
              "stale_beyond_slo",
              "baked",
              "missing_key",
              "unloaded",
              "eval_error",
            ]),
          }),
        ),
        experiments: o.z.record(
          o.z.string(),
          o.z.object({
            unit: o.z.string(),
            platforms: o.z.array(o.z.string()).readonly(),
          }),
        ),
      }),
    },
  });
};
