// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.followingFeedRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = o.z.object({
      tradeId: o.z.string(),
      userAddress: o.z.string(),
      coinMint: o.z.string(),
      priceSol: o.z.number(),
      amount: o.z.number(),
      side: o.z.string(),
      timestamp: o.z.number(),
      username: o.z.string().optional(),
      profileImage: o.z.string().optional(),
      realizedPnlUsd: o.z.number().optional(),
      user_uuid: o.z.string().describe("The trader's cc user id"),
    });
  r.followingFeedRoutes = (0, n.defineRoutes)({
    "GET /following-feed/by-mint/{mint}": {
      summary: "Get the following feed for a specific mint",
      params: o.z.object({ mint: o.z.string() }),
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .optional()
          .describe("Default 25, capped at 50"),
        cursor: o.z
          .string()
          .optional()
          .describe("Opaque cursor from the previous page's nextCursor"),
        chain: o.z
          .string()
          .regex(/^(?:(?:hlcore|near):mainnet|ton:-239)$/)
          .optional()
          .describe(
            "CAIP-2 chain of a perp, TON or NEAR coin: hlcore:mainnet makes {mint} the HL coin key verbatim (BTC, xyz:TSLA) and reads the followed accounts perp callouts on it; ton:-239 makes {mint} the TON jetton master in its CRC-checked 48-char bounceable EQ form (400 otherwise) and reads the followed accounts callouts on it; near:mainnet makes {mint} the NEAR token account id verbatim (never case-folded) and serves the NEAR rows (400 while the NEAR positions lane is off). Absent = the spot path. 400 while the NEAR positions lane (near:mainnet) is dark, with the hlcore:mainnet body",
          ),
      }),
      response: o.z.object({
        trades: o.z.array(s),
        nextCursor: o.z
          .string()
          .describe("Empty string when there are no more pages"),
      }),
    },
  });
};
