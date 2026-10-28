// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.globalParamsRoutes = void 0));
  let o = e.r(876543);
  r.globalParamsRoutes = (0, e.r(183184).defineRoutes)({
    "GET /global-params/{timestamp}": {
      summary: "Get bonding-curve global params at a timestamp",
      params: o.z.object({ timestamp: o.z.number().int() }),
      response: o.z.object({
        slot: o.z.number().describe("Slot the global params were recorded at"),
        signature: o.z
          .string()
          .describe("Transaction signature the global params were read from"),
        initial_virtual_token_reserves: o.z.number(),
        initial_virtual_sol_reserves: o.z.number(),
        initial_virtual_quote_reserves: o.z.number(),
        initial_real_token_reserves: o.z.number(),
        token_total_supply: o.z.number(),
        fee_basis_points: o.z.number(),
        timestamp: o.z
          .number()
          .describe(
            "Unix epoch milliseconds of this parameter set; 0 on the fallback row served when no snapshot matches",
          ),
      }),
    },
  });
};
