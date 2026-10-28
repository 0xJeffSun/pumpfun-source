// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.tradesRoutes = r.tradeRow = r.amount = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = o.z
      .string()
      .regex(/^\d{1,20}-\d{1,10}-\d{1,10}-\d{1,15}$/)
      .describe(
        "OrdinalKey <blockId>-<txIndex>-<eventIndex>-<blockTimeMs>: the row field and the before/after query form",
      ),
    a = o.z
      .string()
      .nullable()
      .describe("USD as a decimal string; null when the store carries no mark");
  r.amount = o.z.object({
    raw: o.z.string().describe("Integer base units as a decimal string"),
    decimals: o.z.number().int(),
  });
  let i = o.z.object({ chainId: o.z.string(), address: o.z.string() });
  r.tradeRow = o.z.object({
    ordinalKey: s,
    blockId: o.z.string().describe("uint64 as a decimal string"),
    txIndex: o.z.number().int(),
    eventIndex: o.z.number().int(),
    blockTimeMs: o.z.number().int(),
    txId: o.z
      .string()
      .describe(
        "Transaction id in the row chain form; base58 (43-44 chars) on near:mainnet; 0x + 64 hex on starknet:SN_MAIN",
      ),
    legIndex: o.z.number().int(),
    late: o.z.boolean(),
    isBackfill: o.z.boolean(),
    side: o.z.enum(["buy", "sell"]),
    kind: o.z.enum(["swap"]),
    venue: o.z
      .string()
      .describe(
        "Protocol enum name in lower snake case; on a ton:-239 coin one of stonfi_v1, stonfi_v2, dedust_v2, dedust_cpmm, tonco_v1, tonco_v2, uranus, blum, bcl, swap_coffee, bidask_damm, gaspump, memeslab, moon, or unspecified on a head row whose pool is not in the store page (txId is then the pool-side tx hash as 64 lowercase hex, trader.address and a jetton quote.id the 48-char bounceable friendly form); on a near:mainnet coin one of rhea_v1, rhea_dcl, nearly_trade, justhoot (trader.address the account id, up to 64 chars, trader null when unkeyed; amounts reach 10^24-scale raw strings); on a starknet:SN_MAIN coin one of ekubo, nostra, ascend, starkovia, stark_industry (txId, trader.address and quote.id 0x + 64 lowercase hex, trader null when unattributed; raw strings up to 78 digits)",
      ),
    surface: o.z
      .string()
      .optional()
      .describe(
        "Pump surface the trade was built on (core, terminal, web on Solana; bridge, wallet on EVM); absent when the row was not built on a pump surface. The venue rule: venue=pump keeps exactly the rows that carry it",
      ),
    pool: i.nullable(),
    trader: o.z.object({ address: o.z.string() }).nullable(),
    baseAmount: r.amount,
    quoteAmount: r.amount,
    quote: o.z
      .object({
        id: o.z
          .string()
          .describe(
            'Quote asset address on the row chain; "" on a ton:-239 TON- or pTON-quoted swap (decimals 9, no symbol); "" on a near:mainnet native NEAR (wNEAR) leg (symbol NEAR, decimals 24), else the stable token account id verbatim',
          ),
        symbol: o.z.string().optional(),
        decimals: o.z.number().int().optional(),
      })
      .nullable(),
    priceUsd: a,
    priceQuote: o.z.string().nullable(),
    quotePriceUsd: a,
    valueUsd: a,
    valueNative: o.z.string().nullable(),
  });
  let l = o.z
      .object({
        dir: o.z
          .string()
          .describe("PerpDirection enum name in lower snake case"),
        closedPnlUsd: a,
        feeUsd: a,
        isLiquidation: o.z.boolean(),
        twapId: o.z
          .string()
          .optional()
          .describe(
            'Decimal TWAP order id, present on TWAP slice fills only; a TWAP slice carries txId "" (render a badge, no link)',
          ),
      })
      .describe("Set on perp_fill rows only"),
    d = r.tradeRow.extend({
      kind: o.z.enum(["swap", "perp_fill"]),
      perp: l.optional(),
    }),
    c = r.tradeRow.extend({
      side: o.z.enum(["buy", "sell"]).nullable(),
      kind: o.z.enum(["perp_fill", "perp_funding", "perp_transfer"]),
      coin: i.nullable(),
      baseAmount: r.amount.nullable(),
      quoteAmount: r.amount.nullable(),
      perp: l.optional(),
    }),
    u = {
      limit: o.z
        .number()
        .int()
        .min(1)
        .max(100)
        .optional()
        .describe("Rows per page, default 100, max 100"),
      cursor: o.z
        .string()
        .optional()
        .describe(
          "Opaque base64url cursor from a previous page; exclusive with before/after",
        ),
      before: s.optional(),
      after: s.optional(),
    },
    h = o.z
      .string()
      .nullable()
      .describe("Opaque base64url cursor for the next page; null on the last"),
    m = o.z.object({
      buys: o.z.number().int(),
      sells: o.z.number().int(),
      buyVolumeUsd: o.z.string().describe("USD as a decimal string"),
      sellVolumeUsd: o.z.string().describe("USD as a decimal string"),
      netBase: r.amount
        .nullable()
        .describe(
          "Net base over the page; null on a wallet page, which spans coins",
        ),
      asOf: o.z
        .string()
        .nullable()
        .describe("OrdinalKey the walk is current to; pinned across pages"),
    }),
    p = (e) =>
      o.z.object({
        trades: o.z
          .array(e)
          .describe("Newest first; oldest first when after is set (Gap fill)"),
        aggregates: m,
        cursor: h,
        source: o.z.enum(["indexed", "vendor"]),
      });
  r.tradesRoutes = (0, n.defineRoutes)({
    "GET /trades/wallet/{userId}": {
      summary: "A wallet's perp trade history, newest first",
      params: o.z.object({
        userId: o.z
          .string()
          .describe(
            "Pump user id (UUID) or a base58 Solana wallet, resolved to its canonical EVM wallet (none: 200 with trades []), or a 0x wallet (sent lowercase)",
          ),
      }),
      query: o.z.object({
        limit: u.limit,
        cursor: o.z
          .string()
          .optional()
          .describe(
            "Opaque base64url cursor from a previous page; the only paging key (before/after: 400)",
          ),
        kinds: o.z
          .array(o.z.enum(["perp_fill", "perp_funding", "perp_transfer"]))
          .optional()
          .describe(
            "CSV of perp kinds to keep; default perp_fill,perp_transfer (funding only when named)",
          ),
      }),
      response: p(c).describe(
        "200 with trades [] when the registry holds no wallet or the user has no EVM wallet (no TradeApi call); 503 with degraded_lanes [trade_api.list_trades] when the TradeApi lane is down, shedding, unconfigured or the HyperCore lane is off; a transient one may carry Retry-After: 1",
      ),
    },
    "GET /trades/{chainId}/{address}": {
      summary: "A coin's trade tape, newest first",
      params: o.z.object({
        chainId: o.z
          .string()
          .describe(
            "CAIP-2 chain id: solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp (mainnet), eip155:<chain id>, hlcore:mainnet|hlcore:testnet (HyperCore perps; the address is the HL coin key verbatim), ton:-239 (TON mainnet; the address is the 48-char bounceable friendly form, swap kinds only, pages by cursor only (pool, minUsd, before, after are a 400), venue=pump is a 400), or near:mainnet (NEAR mainnet; the address is the account id, swap kinds only, pages by cursor only (pool, minUsd, before, after are a 400), venue=pump is a 400; a 400 while uapiNearTrades is off), or starknet:SN_MAIN (Starknet mainnet; the address is 0x + 1 to 64 hex digits, canonicalised to 0x + 64 lowercase hex, swap kinds only, pages by cursor only (pool, minUsd, before, after are a 400), venue=pump is a 400; a 400 while uapiStarknetTrades is off)",
          ),
        address: o.z.string().describe("Coin address on that chain"),
      }),
      query: o.z.object({
        ...u,
        kinds: o.z
          .array(o.z.enum(["swap", "perp_fill"]))
          .optional()
          .describe(
            "CSV of trade kinds to keep: swap or perp_fill (default perp_fill on an hlcore coin)",
          ),
        minUsd: o.z.number().min(0).optional(),
        pool: o.z.string().optional(),
        venue: o.z
          .enum(["all", "pump"])
          .optional()
          .describe(
            "all (default): every row; pump: only rows built on a pump surface (the row carries surface); any other value is a 400",
          ),
      }),
      response: p(d)
        .extend({
          revokedFromBlock: o.z
            .string()
            .regex(/^\d+$/)
            .nullable()
            .optional()
            .describe(
              "Reorg revoke floor as a decimal block number: every row with blockId at or above it is gone, drop held rows from that block up and re-page from it. Present on every starknet:SN_MAIN page, null when no revoke; absent on every other chain",
            ),
        })
        .describe(
          "200 with trades [] and zero aggregates when the registry holds no coin for the address on a cold first page (no cursor, before or after; swap-api parity for an unknown mint); 503 with degraded_lanes [trade_api.list_trades] when the TradeApi lane is down, shedding or unconfigured, or when a cursor, before or after page finds no coin; a transient one may carry Retry-After: 1",
        ),
    },
  });
};
