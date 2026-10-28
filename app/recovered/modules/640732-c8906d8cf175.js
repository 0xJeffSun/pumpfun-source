// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.candlesRoutes = r.createdMs = r.source = r.served = r.candle = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = ["1s", "15s", "30s", "1m", "5m", "15m", "1h", "4h", "1d"],
    a = ["price_usd", "price_quote", "price_native", "market_cap_usd"],
    i = o.z.object({
      chainId: o.z
        .string()
        .describe(
          "CAIP-2 chain id: solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp (mainnet), eip155:<chain id>, hlcore:mainnet / hlcore:testnet for a HyperCore perp (address = the coin name verbatim; perps serve price_usd and price_quote only), ton:-239 for a TON jetton (address and pool = the 48-char bounceable base64url form), near:mainnet for a NEAR token (address = the account id; no pool, NEAR candles are per token; 400 while NEAR is dark), or starknet:SN_MAIN for a Starknet token (address = 0x + 1 to 64 hex digits, any case, sent as 0x + 64 lowercase hex; no pool, Starknet candles are per token; 400 while Starknet is dark)",
        ),
      address: o.z.string().describe("Coin address on that chain"),
    }),
    l = {
      res: o.z
        .enum(s)
        .optional()
        .describe("Bar width; required unless timeframe is set"),
      timeframe: o.z
        .enum(["all"])
        .optional()
        .describe(
          "all: the server fits the coin's life into ~100 bars and reports the tier in served.res; exclusive with res; live window only (no to)",
        ),
      measure: o.z
        .enum(a)
        .optional()
        .describe(
          "Default price_usd; market_cap_usd multiplies the USD close by the current circulating supply (supplyUsed)",
        ),
      to: o.z
        .number()
        .int()
        .min(0)
        .optional()
        .describe(
          "Unix ms; the bucket containing it is the newest bar returned. Default now (the forming bar is included)",
        ),
      count: o.z
        .number()
        .int()
        .min(1)
        .max(300)
        .optional()
        .describe("Bars ending at the to bucket, default 200, max 300"),
    },
    d = (e, t) => {
      ((void 0 === e.res) == (void 0 === e.timeframe) &&
        t.addIssue({
          code: "custom",
          path: ["res"],
          message: "exactly one of res or timeframe",
        }),
        void 0 !== e.timeframe &&
          void 0 !== e.to &&
          t.addIssue({
            code: "custom",
            path: ["to"],
            message:
              "timeframe=all serves the live window only; page history with res",
          }));
    },
    c = o.z.string().describe("Decimal string in the measure unit");
  ((r.candle = o.z.object({
    openTimeMs: o.z.number().int().describe("Bucket open time, unix ms"),
    open: c,
    high: c,
    low: c,
    close: c,
    volumeUsd: o.z.string().describe("USD as a decimal string"),
    trades: o.z.number().int(),
    final: o.z
      .boolean()
      .describe("false on the forming bar (bucket still open)"),
    isCorrection: o.z
      .boolean()
      .describe("A closed bar re-emitted after a correction"),
    pool: o.z
      .object({ chainId: o.z.string(), address: o.z.string() })
      .optional()
      .describe(
        "The pool the bar came from; the AMM pool on a stitched bucket",
      ),
  })),
    (r.served = o.z
      .object({ res: o.z.enum(s), measure: o.z.enum(a) })
      .describe(
        "What was actually served; a seconds width older than its 7-day retention is served at 1m",
      )),
    (r.source = o.z.enum(["indexed", "vendor"])),
    (r.createdMs = o.z
      .number()
      .int()
      .optional()
      .describe("The coin's creation time, unix ms, when the server knows it")),
    (r.candlesRoutes = (0, n.defineRoutes)({
      "GET /candles/{chainId}/{address}": {
        summary: "A coin's OHLCV bars, oldest first",
        params: i,
        query: o.z
          .object({
            ...l,
            pool: o.z
              .string()
              .optional()
              .describe(
                "One pool address of the coin; by default curve and AMM bars are stitched per bucket",
              ),
          })
          .superRefine(d),
        response: o.z
          .object({
            candles: o.z.array(r.candle).describe("Oldest first"),
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
            createdMs: r.createdMs,
            source: r.source,
            served: r.served,
          })
          .describe(
            "503 with degraded_lanes [trade_api.get_candles] when the TradeApi lane is down, shedding or unconfigured; a transient one may carry Retry-After: 1. Cache-Control public s-maxage 5..15 s on a live window, 3600 on a closed one, only on 200. While the lane faults, a live-window 200 may instead be the last good body for this exact request, at most 300 s old, with Cache-Control no-store, Age (seconds since it was built) and X-Degraded: candles-stale",
          ),
      },
      "GET /candles/{chainId}/{address}/line": {
        summary: "A coin's close-price line, LTTB-capped",
        params: i,
        query: o.z
          .object({
            ...l,
            maxPoints: o.z
              .number()
              .int()
              .min(2)
              .max(2e3)
              .optional()
              .describe(
                "LTTB cap on the points returned, default 200, max 2000; a cap at or above count keeps every bar",
              ),
          })
          .superRefine(d),
        response: o.z
          .object({
            points: o.z
              .array(
                o.z.object({
                  time: o.z
                    .number()
                    .int()
                    .describe("Bucket open time, unix ms"),
                  price: o.z
                    .string()
                    .describe("The bar close as a decimal string"),
                }),
              )
              .describe("Oldest first"),
            served: r.served,
            source: r.source,
            createdMs: r.createdMs,
          })
          .describe(
            "503 with degraded_lanes [trade_api.get_candles] when the TradeApi lane is down, shedding or unconfigured; a transient one may carry Retry-After: 1. Cache-Control as the bars route, including its last good body (no-store, Age, X-Degraded: candles-stale) while the lane faults",
          ),
      },
    })));
};
