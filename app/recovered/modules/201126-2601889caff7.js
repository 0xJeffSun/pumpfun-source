// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.replayRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(640732),
    a = e.r(783011),
    i = o.z
      .string()
      .nullable()
      .describe("USD as a decimal string; null when the server has no value"),
    l = o.z
      .object({
        fromMs: o.z
          .number()
          .int()
          .nullable()
          .describe(
            "The requested from, unix ms; null = the wallet trade span",
          ),
        toMs: o.z
          .number()
          .int()
          .nullable()
          .describe("The requested to, unix ms; null = the wallet trade span"),
      })
      .describe("The window as requested (echoed, never resolved here)"),
    d = o.z
      .object({
        chainId: o.z.string().describe("CAIP-2 chain id"),
        address: o.z.string(),
        name: o.z.string().nullable(),
        symbol: o.z.string().nullable(),
        imageUrl: o.z.string().nullable().describe("Final CDN URL"),
        decimals: o.z
          .number()
          .int()
          .nullable()
          .describe("Base decimals; null when the registry carries none"),
        priceUsd: i,
        marketCapUsd: i,
        circulatingSupply: a.amount
          .nullable()
          .describe(
            "Circulating supply as {raw, decimals}; null when the market state carries none",
          ),
      })
      .nullable()
      .describe("null when the serve role holds no card for the coin"),
    c = o.z
      .object({
        candles: o.z.array(s.candle).describe("Oldest first"),
        hasOlder: o.z
          .boolean()
          .describe("Older bars exist before the first returned"),
        graduatedAt: o.z
          .string()
          .optional()
          .describe(
            "OrdinalKey of the curve to AMM graduation when the coin has graduated",
          ),
        supplyUsed: o.z
          .string()
          .optional()
          .describe(
            "Circulating supply the market_cap_usd bars were multiplied by, as a decimal string",
          ),
        createdMs: s.createdMs,
        source: s.source,
        served: s.served,
      })
      .nullable()
      .describe(
        "Price history at the finest width still stored (served names it); null when unavailable",
      ),
    u = o.z
      .object({
        balance: a.amount.nullable(),
        valueUsd: i,
        costBasisUsd: i,
        realizedPnlUsd: i,
        unrealizedPnlUsd: i,
        totalBoughtUsd: i,
        totalSoldUsd: i,
        buys: o.z.number().int(),
        sells: o.z.number().int(),
        isExited: o.z.boolean(),
        asOf: o.z
          .string()
          .nullable()
          .describe("OrdinalKey the position is current to"),
      })
      .nullable()
      .describe("Position after the window; null when unavailable");
  r.replayRoutes = (0, n.defineRoutes)({
    "GET /replay": {
      summary:
        "A wallet's trades in one coin with the coin card, price history and position after the window",
      query: o.z.object({
        wallet: o.z
          .string()
          .describe(
            "The trading wallet: a base58 Solana key or a 0x EVM account",
          ),
        chainId: o.z
          .string()
          .describe(
            "CAIP-2 chain id: solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp (mainnet) or eip155:<chain id>",
          ),
        address: o.z.string().describe("Coin address on that chain"),
        from: o.z
          .number()
          .int()
          .min(0)
          .optional()
          .describe(
            "Window start, unix ms inclusive; set with to, or neither for the wallet trade span in the coin",
          ),
        to: o.z
          .number()
          .int()
          .min(0)
          .optional()
          .describe("Window end, unix ms inclusive; set with from"),
      }),
      response: o.z
        .object({
          window: l,
          card: d,
          candles: c,
          walletTrades: o.z
            .array(
              a.tradeRow.extend({
                quoteAmount: a.amount
                  .nullable()
                  .describe(
                    "null on a wallet-ledger row: the serve role carries no quote leg there",
                  ),
              }),
            )
            .describe("The wallet's swaps in the window, in server order"),
          position: u,
        })
        .describe(
          "404 (router body) while uapiReplay is off or dual_write; 503 with degraded_lanes [trade_api.get_replay] when the TradeApi lane is down or unconfigured. A data projection of GetReplay, not the mobile-resources ReplayInputProps body. No Cache-Control of its own (a JWT caller gets no-store)",
        ),
    },
  });
};
