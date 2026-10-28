// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.perpsRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(4171),
    a = o.z.object({ message: o.z.string() }),
    i = o.z.object({
      coin: o.z
        .string()
        .describe("HyperCore coin name (dex-prefixed on HIP-3 dexes)"),
      dex: o.z.string().describe("HIP-3 dex name; empty on the main perp dex"),
      oid: o.z.string().describe("HyperCore order id (uint64, decimal string)"),
      kind: o.z.enum(["tp", "sl", "limit"]),
      side: o.z.enum(["buy", "sell"]),
      triggerPx: o.z
        .string()
        .nullable()
        .describe("USD trigger price (decimal string); null on a limit order"),
      limitPx: o.z
        .string()
        .nullable()
        .describe("USD limit price (decimal string)"),
      size: o.z.string().describe("Remaining size (decimal string)"),
      origSize: o.z.string().describe("Original size (decimal string)"),
      reduceOnly: o.z.boolean(),
      tif: o.z
        .string()
        .nullable()
        .describe("HyperCore time-in-force; null when upstream reported none"),
      isPositionTpsl: o.z
        .boolean()
        .describe("A TP/SL attached to the whole position, not one order"),
      createdAt: o.z
        .string()
        .nullable()
        .describe("ISO instant the order was placed"),
      stateAsOf: o.z.string().nullable(),
    });
  r.perpsRoutes = (0, n.defineRoutes)({
    "POST /perps/account/activate": {
      summary:
        "Activate the authed user's HyperCore account: asks cc to probe the user's canonical EVM wallet on Hyperliquid now and answers the account state (unknown until the probe lands, missing, active). 401 without a session. 404 when the session carries no cc user id or cc holds no canonical EVM wallet for the user; 503 while the HyperCore account lane is unavailable",
      response: o.z.object({
        hlAccount: o.z.enum(["unknown", "missing", "active"]),
      }),
      errors: {
        400: a.describe("cc INVALID_ARGUMENT"),
        401: a.describe("The request carries no session"),
        404: a.describe(
          "No cc user id on the session, or cc NOT_FOUND: no canonical EVM wallet",
        ),
        429: s.userRateLimitError.describe(
          "The BFF bucket (perps-account-activate, 10/min) fired before cc was asked",
        ),
        503: !0,
      },
    },
    "GET /perps/orders/{userId}": {
      summary:
        "A user's resting HyperCore orders (TP, SL, limit) over TradeApi GetOpenOrders. 200 with orders [] when the user has no EVM wallet; 503 while the wallet mapping is unavailable; 503 with degraded_lanes [trade_api.get_open_orders] while the TradeApi lane is unavailable",
      params: o.z.object({
        userId: o.z
          .string()
          .describe(
            "Pump user id (UUID) or a base58 Solana wallet, resolved to its canonical EVM wallet (none: 200 with orders []), or a 0x wallet (sent lowercase)",
          ),
      }),
      query: o.z.object({
        dex: o.z
          .array(o.z.string().max(64))
          .max(16)
          .optional()
          .describe(
            "HIP-3 dex names to read (csv on the wire); omitted = the main dex and every HIP-3 dex. The main dex alone is not addressable: an empty item is dropped",
          ),
      }),
      response: o.z.object({
        orders: o.z.array(i),
        stateAsOf: o.z
          .string()
          .nullable()
          .describe("ISO instant the HyperCore open-orders state was read"),
      }),
      errors: {
        400: a.describe(
          "userId not a UUID, 0x wallet or base58 wallet; more than 16 dex names or a dex name over 64 chars",
        ),
        503: !0,
      },
    },
  });
};
