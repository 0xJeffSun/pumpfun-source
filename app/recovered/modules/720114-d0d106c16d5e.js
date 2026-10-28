// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.internalModerationRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(4171),
    a = e.r(924968),
    i = o.z.object({
      mint: o.z.string().describe("Coin mint address"),
      verified: o.z
        .boolean()
        .describe(
          "Whether the coin is verified (exempt from the trade-shape heuristics)",
        ),
      chain_id: o.z
        .string()
        .optional()
        .describe(
          "CAIP-2 chain, present only on a NEAR coin (near:mainnet; the mint is then the NEAR account id verbatim, never EIP-55 cased) while uapiNearCards is live, or on a Starknet coin (starknet:SN_MAIN; the mint is then 0x + 64 lowercase hex) while uapiStarknetCards is live",
        ),
    }),
    l = o.z.object({
      approvalId: o.z.string(),
      mint: o.z.string(),
      coinName: o.z.string(),
      coinSymbol: o.z.string().nullable(),
      coinImageUrl: o.z.string().nullable(),
      usdMarketCap: o.z.number(),
      uniqueSearchers: o.z.number(),
      runnerUpSearchers: o.z.number(),
      dominanceRatio: o.z.number(),
      requestedAt: o.z.number().describe("Epoch ms the card was posted"),
      expiresAt: o.z.number().describe("Epoch ms the approval lapses"),
    }),
    d = o.z.object({
      active: o.z
        .object({
          mint: o.z.string(),
          approvalId: o.z.string(),
          approvedBy: o.z.string().nullable(),
          approvedAt: o.z.number(),
          expiresAt: o.z
            .number()
            .nullable()
            .describe(
              "Epoch ms the fixed window ends; null = the popularity window",
            ),
        })
        .nullable()
        .describe("The surfaced hot coin, or null when none is live"),
      pending: o.z.array(l),
      knobs: o.z.object({
        hotCoinSurface: o.z
          .string()
          .describe("The hotCoinSurface cutover state"),
        hotCoinDominanceRatio: o.z.number(),
        hotCoinMinUniqueSearchers: o.z.number(),
        hotCoinSustainPolls: o.z.number(),
        hotCoinDisplayMinutes: o.z.number(),
      }),
    }),
    c = o.z.object({
      pending: o.z.array(
        o.z.object({
          approvalId: o.z.string(),
          coinMint: o.z.string(),
          coinName: o.z.string(),
          coinSymbol: o.z.string().nullable(),
          coinImageUrl: o.z.string().nullable(),
          priceChangePercent: o.z.number().nullable(),
          usdMarketCap: o.z.number(),
          uniqueSearchers: o.z.number(),
          verifiedEngagedCount: o.z
            .number()
            .nullable()
            .describe("null = the count was unavailable when the card posted"),
          requestedAt: o.z.number().describe("Epoch ms the card was posted"),
          expiresAt: o.z.number().describe("Epoch ms the approval lapses"),
        }),
      ),
    }),
    u = o.z.object({
      status: o.z.literal("resolved"),
      action: o.z.enum(["confirm", "decline"]),
      mint: o.z.string().describe("The coin the decision applied to"),
    }),
    h = {
      404: (0, s.nestError)("Not Found").describe(
        "No such approval, or it already expired and its record is gone",
      ),
      409: (0, s.nestError)("Conflict").describe(
        "Another operator (or the Slack card, or the expiry sweeper) already resolved it",
      ),
    };
  r.internalModerationRoutes = (0, n.defineRoutes)({
    "GET /internal/moderation/coin-verified/{mint}": {
      summary: "Internal: read the verified flag on a coin",
      params: o.z.object({ mint: o.z.string() }),
      response: i,
    },
    "POST /internal/moderation/mark-as-verified/{mint}": {
      summary: "Internal: set the verified flag on a coin",
      params: o.z.object({ mint: o.z.string() }),
      body: a.markVerifiedBody,
      response: i,
    },
    "GET /internal/moderation/hot-coin": {
      summary: "Internal: read the hot-coin surface state",
      response: d,
    },
    "POST /internal/moderation/hot-coin/approvals/{approvalId}/approve": {
      summary: "Internal: approve a pending hot-coin surfacing",
      params: o.z.object({ approvalId: o.z.string() }),
      response: u,
      errors: h,
    },
    "POST /internal/moderation/hot-coin/approvals/{approvalId}/decline": {
      summary: "Internal: decline a pending hot-coin surfacing",
      params: o.z.object({ approvalId: o.z.string() }),
      response: u,
      errors: h,
    },
    "GET /internal/moderation/trending-approvals": {
      summary: "Internal: list pending quiet-trending approvals",
      response: c,
    },
    "POST /internal/moderation/trending-approvals/{approvalId}/approve": {
      summary: "Internal: approve a pending quiet-trending notification",
      params: o.z.object({ approvalId: o.z.string() }),
      response: u,
      errors: h,
    },
    "POST /internal/moderation/trending-approvals/{approvalId}/decline": {
      summary: "Internal: decline a pending quiet-trending notification",
      params: o.z.object({ approvalId: o.z.string() }),
      response: u,
      errors: h,
    },
  });
};
