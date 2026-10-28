// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.userPositionsRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = e.r(984870);
  r.userPositionsRoutes = (0, n.defineRoutes)({
    "GET /user-positions/{userId}": (0, s.publicRead)("positions.read", {
      summary:
        "Get a user's position (total PnL + callout) in each of the given mints; a group id serves the group's member-aggregate position per mint (walletAddress null, no callout link)",
      params: o.z.object({ userId: o.z.string() }),
      query: o.z.object({
        mints: o.z
          .array(o.z.string())
          .max(200)
          .describe(
            "Comma-separated mint list on the wire, max 200 entries; a perp coin is hlcore:<network>:<coin key> (hlcore:mainnet:BTC) and serves one row with coinMint = the coin key, chain = the CAIP-2, chainId 0, assetClass ASSET_CLASS_PERPETUAL and perp{}",
          ),
        updatesLimit: o.z
          .number()
          .int()
          .min(0)
          .max(20)
          .optional()
          .describe(
            "Max author updates per callout (omitted serves 5); 0 skips update enrichment entirely",
          ),
      }),
      response: o.z.object({
        positions: o.z
          .array(a.userPositionDto)
          .describe(
            "One row per requested mint the user has a position in; a group id serves the group's member-aggregate position per mint",
          ),
      }),
    }),
  });
};
