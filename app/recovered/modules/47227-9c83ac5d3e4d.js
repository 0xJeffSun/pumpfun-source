// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.retailGrowthRoutes = void 0));
  let o = e.r(876543);
  r.retailGrowthRoutes = (0, e.r(183184).defineRoutes)({
    "GET /retail-growth/wallets": {
      summary:
        "Pump Retail Growth wallets statistic (internal): daily Solana/pump wallet counts with the corrected and excl-Pump derived lines",
      query: o.z.object({
        from: o.z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/)
          .optional()
          .describe("Inclusive start date, YYYY-MM-DD"),
        to: o.z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/)
          .optional()
          .describe("Inclusive end date, YYYY-MM-DD"),
      }),
      response: o.z.object({
        metadata: o.z.object({
          lastRefreshedAt: o.z.string(),
          beta: o.z.number(),
          betaHaircut: o.z.number(),
          identificationRate: o.z.number(),
          baseQueryId: o.z.number(),
          incrementalQueryId: o.z.number(),
        }),
        rows: o.z
          .array(
            o.z.object({
              date: o.z.string().describe("YYYY-MM-DD"),
              solanaWallets: o.z.number(),
              pumpWallets: o.z.number(),
              pumpWalletsCorrected: o.z.number(),
              exclPumpWallets: o.z.number(),
              solanaVolumeUsd: o.z.number(),
              pumpVolumeUsd: o.z.number(),
            }),
          )
          .describe("Daily wallet series, ascending"),
      }),
    },
  });
};
