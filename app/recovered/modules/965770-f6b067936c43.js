// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.solPriceRoutes = void 0));
  let o = e.r(876543);
  r.solPriceRoutes = (0, e.r(183184).defineRoutes)({
    "GET /sol-price": {
      summary: "Get the current SOL price",
      response: o.z.object({
        solPrice: o.z.number(),
        asOfTimestamp: o.z
          .number()
          .describe("Unix epoch milliseconds the price was marked at"),
        stale: o.z
          .boolean()
          .describe(
            "The upstream price could not be refreshed and a held value is being served, so treat it as indicative",
          ),
      }),
    },
  });
};
