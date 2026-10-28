// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.portfolioSummaryRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = e.r(617159),
    i = o.z.object({
      sol: o.z.number().nullable(),
      usd: o.z.number().nullable(),
    }),
    l = o.z.object({
      from: o.z.number(),
      to: o.z.number(),
      pnl: i,
      realizedPnl: i,
      unrealizedPnl: i,
      percentage: i.describe(
        "The usd leg rebased onto the account total; the sol leg is not rebased. The usd leg is null when a NEAR realized leg is folded into pnl: the NEAR leg carries no capital to rebase it on",
      ),
      totalBuySpend: i,
      heldOpenValue: i,
      maxCapitalDeployed: i.describe(
        "Engine lane (over-cap wallets): equity at window start plus the peak cumulative in-window trade cash (buys +, sells -). Exact lane: null. Anchored to the window start; not comparable across nested windows. Transfers carry no capital. Not rendered.",
      ),
      equityAtWindowStart: i,
      missingPriceMints: o.z.array(o.z.string()),
      tradePercentage: i.describe(
        "Engine lane: pnl / maxCapitalDeployed x 100. Exact lane: pnl / (equity at window start + net deployed) x 100. Anchored to the window start; may fall below -100%. Clients render percentage.usd, which is floored by the account base when the account total is known. The usd leg is null when a NEAR realized leg is folded into pnl: the NEAR leg carries no capital deployed.",
      ),
    }),
    d = o.z.enum(["content_pairs", "portfolio_pairs"]),
    c = o.z.object({
      chain: o.z.string().describe("Chain slug the row is held on"),
      mint: o.z.string(),
      amount: o.z.number().describe("UI amount held"),
      priceUsd: o.z
        .number()
        .describe(
          "USD price the row was valued at, the one in the wallet's served total: the live price when repriced, else computedPriceUsd",
        ),
      valueUsd: o.z.number().describe("amount x priceUsd"),
      marketCapUsd: o.z
        .number()
        .nullable()
        .describe(
          "USD market cap: on a repriced row the pairs row's cap from the same content print as priceUsd (null when the pairs row carries no cap), else profile-service's value",
        ),
      computedPriceUsd: o.z
        .number()
        .optional()
        .describe(
          "profile-service's post-mark price the computed total used; absent when the body was filled outside the reprice",
        ),
      contribUsd: o.z
        .number()
        .optional()
        .describe(
          "amount x computedPriceUsd: this row's share of the computed total",
        ),
      computedPlane: (0, a.openEnum)(
        [
          "cache",
          "dynamodb",
          "dbproxy",
          "solscan",
          "codex",
          "ledger_mark",
          "balance_mark",
        ],
        "profile-service-owned price arm that valued the row for the computed total; null until profile-service tags it",
      )
        .nullable()
        .optional(),
      markUsd: o.z
        .number()
        .nullable()
        .optional()
        .describe(
          "On GET /portfolio-summary: null when the server held this row's PnL leg (spam, missing price, amount skew, no PnL row, no live price, or a failed pairs read), a number only when the served pnl legs moved on this row. On POST /portfolio-summary/balances: the balance read's own row mark as served, no PnL leg",
        ),
      markSource: o.z
        .enum(["pnl_row", "ps_mark"])
        .nullable()
        .optional()
        .describe(
          "Which mark markUsd is: pnl_row = the PnL engine's row mark, ps_mark = the mark the balance read served. Null exactly when markUsd is null",
        ),
      repriced: o.z
        .boolean()
        .optional()
        .describe(
          "true = priceUsd is the live pairs price and the totals moved with it",
        ),
      livePlane: d.nullable().optional(),
    }),
    u = o.z.array(c).nullable().optional(),
    h = (e) => o.z.object({ "1d": e, "1w": e, "1m": e, all: e }),
    m = o.z
      .object({
        plane: o.z
          .enum(["content_pairs", "portfolio_pairs", "none"])
          .describe(
            "The live plane the rows were repriced on; none = no reprice ran",
          ),
        mode: o.z
          .enum(["fill", "fresh"])
          .describe(
            "fill / fresh = applied on a wallet fill / an owner fresh fill",
          ),
        asOf: o.z
          .number()
          .describe(
            "Epoch ms of the pairs read; a client tick older than asOf is stale for repriced rows",
          ),
        depth: o.z.number().describe("Holdings rows asked of profile-service"),
        repricedRows: o.z.number(),
        deltaTotalUsd: o.z
          .number()
          .describe(
            "Sum over repriced rows of amount x (live - computedPriceUsd)",
          ),
        deltaPnlUsd: o.z
          .number()
          .describe(
            "Sum over repriced rows with a PnL mark, spam excluded, of amount x (live - markUsd); applied to pnl and unrealizedPnl",
          ),
        tailValueUsd: o.z
          .number()
          .nullable()
          .describe(
            "Rows past the depth, at their computed price; 0 when every row was sent; null when a bucket it would absorb cannot be separated (identity.reasons.tailValueUsd)",
          ),
        capSuspectUsd: o.z
          .number()
          .describe(
            "contribUsd of rows held at their computed price because the live price looks liquidity-capped",
          ),
        unrepriced: o.z
          .array(
            o.z.object({
              mint: o.z.string(),
              chain: o.z.string(),
              reason: o.z.enum([
                "no_row",
                "unpriced",
                "cap_suspect",
                "no_evm_key",
                "over_cap_keys",
                "no_pnl_row",
                "mark_skew",
                "price_missing",
              ]),
              contribUsd: o.z.number(),
              capValueUsd: o.z.number().optional(),
            }),
          )
          .describe(
            "Up to 50 rows by contribUsd that stayed at their computed price (no_pnl_row: the Total repriced, the PnL leg not, no exact mark; mark_skew: the Total repriced, the PnL leg not, the trade row marks a different amount than the bag; price_missing: the engine booked no unrealized for the mint (missing_price_mints), so the PnL leg is not shifted)",
          ),
        unrepricedUsd: o.z
          .number()
          .describe("contribUsd of every row the Total did not reprice"),
        amountSkew: o.z
          .array(
            o.z.object({
              mint: o.z.string(),
              psAmount: o.z.number(),
              ccAmount: o.z.number(),
              basis: o.z.enum(["content", "pnl_row"]),
            }),
          )
          .describe(
            "Up to 10 rows whose profile-service amount differs from the content or PnL row amount by more than 0.1 %; the header keeps the profile-service amount",
          ),
        spamExcludedRows: o.z.number(),
        pnlUncoveredUsd: h(o.z.number().nullable()).describe(
          "Per window: the unrealized leg no PnL row explains; null when the window was not served",
        ),
        pnlPartial: h(o.z.boolean()).describe(
          "Per window: true when pnlUncoveredUsd exceeds half the unrealized leg",
        ),
        reason: o.z
          .string()
          .nullable()
          .describe(
            "Why no reprice ran (error, timeout, breaker_open, holdings_null, truncated); null when it ran",
          ),
      })
      .nullable()
      .optional()
      .describe(
        "Present only when `holdings` is sent and the body was filled inside the reprice scope (every fill once portfolioSummaryPsHoldingsV2 is on, else the owner's fresh reads); null = holdings unavailable",
      ),
    p = o.z
      .object({
        solUsd: o.z.number().nullable(),
        perpsUsd: o.z
          .number()
          .nullable()
          .describe(
            "The perps leg folded into the served total; null when either total is unknown",
          ),
        evmNativeUsd: o.z
          .array(o.z.object({ chain: o.z.string(), usd: o.z.number() }))
          .nullable(),
        psHiddenUsd: o.z.number().nullable(),
        spamGroupedUsd: o.z.number().nullable(),
        hiddenStablesUsd: o.z.number().nullable(),
        subCentUsd: o.z.number().nullable(),
        rowsRemark: o.z.string(),
        reasons: o.z
          .record(o.z.string(), o.z.string())
          .describe("Why each null bucket is null"),
      })
      .nullable()
      .optional()
      .describe(
        "The named buckets between totalValueUsd and the holdings rows, beside reprice; a bucket the server cannot compute is null with a reason, never 0",
      ),
    b = l.extend({
      totalValueUsd: o.z.number().nullable(),
      cache: o.z
        .object({
          filledAtMs: o.z
            .number()
            .describe("Unix milliseconds the served body was computed"),
          ttlSeconds: o.z
            .number()
            .describe(
              "Seconds past filledAtMs before a poll can see a different body; a poll sooner than that returns these bytes",
            ),
          fresh: o.z
            .boolean()
            .optional()
            .describe(
              "true = this body was refilled for its owner's `fresh` read; absent otherwise",
            ),
        })
        .describe(
          "Freshness of the memoized body: derive the poll interval from ttlSeconds and never poll faster",
        ),
    }),
    g = o.z.enum(["1d", "1w", "1m", "all"]),
    w = b.extend({
      wallet: o.z.string(),
      tokenCount: o.z
        .number()
        .nullable()
        .describe(
          "Tokens in the window; null when the PnL leg was unavailable and the balance leg serves alone (every PnL leg null, totalValueUsd served)",
        ),
      solPriceUsd: o.z.number().nullable(),
      nativeBalanceSol: o.z.number().nullable(),
      computedAt: o.z
        .number()
        .describe(
          "Epoch ms the served body was built; a cache hit carries the stored stamp",
        ),
      evmAddress: o.z
        .string()
        .nullable()
        .optional()
        .describe(
          "The linked EVM wallet, lowercased 0x; null = none linked; absent = the mapping lookup failed this request, keep the last-known value",
        ),
      windows: o.z
        .partialRecord(g, l.nullable())
        .optional()
        .describe(
          "Present only when `periods` is sent: one entry per requested period; null = that window was refused or failed, never zero legs. The `period` entry equals the top-level legs.",
        ),
      holdings: u.describe(
        "Present only when `holdings` is sent: the balance leg's top N rows by computed value, N = reprice.depth (native excluded, linked EVM rows merged), off the same read as totalValueUsd; the tail is reprice.tailValueUsd; null = unavailable (including a body cached before holdings were stored)",
      ),
      reprice: m,
      identity: p,
    }),
    y = o.z.object({
      totalValueUsd: o.z
        .number()
        .nullable()
        .describe(
          "Multichain balance total in USD; null when a linked chain arm is unavailable or profile-service cut the Solana row read at its ceiling (truncated) — a floor is never served as a total",
        ),
      solPriceUsd: o.z
        .number()
        .nullable()
        .describe(
          "SOL price the Solana leg was valued at; null when that leg is fail-open",
        ),
      nativeBalanceSol: o.z.number().nullable(),
      perpCashUsd: o.z
        .number()
        .nullable()
        .describe(
          "The linked HyperCore account's cash (the summary's perp leg, cash only), served only for a signed-in viewer's own wallets: 0 = no perp account; null for every other wallet (so always null on the API host), or when the perp read was unavailable. Not folded into totalValueUsd",
        ),
      holdings: u.describe(
        "Present only on the viewer's own wallets when `holdings` is sent: the top 25 rows by valueUsd, off the same read as totalValueUsd; null = unavailable",
      ),
    }),
    f = b.extend({
      groupId: o.z.string(),
      memberCount: o.z.number(),
      membersIncluded: o.z.number(),
    }),
    z = o.z.object({
      time: o.z.number().describe("Bucket start, UTC seconds"),
      value: o.z
        .number()
        .describe("Portfolio value at the bucket, in `currency`"),
    }),
    v = o.z.object({
      period: o.z.enum(["1d", "1w", "1m", "all"]),
      range: o.z
        .enum(["1D", "7D", "30D", "ALL"])
        .describe("swap-api range the period mapped to"),
      currency: o.z.literal("USD"),
      points: o.z
        .array(z)
        .describe(
          "Time-ascending; buckets before equityFrom are absent, never zero-filled",
        ),
      equityFrom: o.z
        .number()
        .nullable()
        .describe(
          "UTC seconds; the earliest bucket the union covers; null when no wallet answered",
        ),
      resolutionSec: o.z.number().describe("Bucket width in seconds"),
      valueNow: o.z
        .number()
        .nullable()
        .describe("The last point value; null when the series is empty"),
      meta: o.z.object({
        walletsRequested: o.z.number().describe("Distinct wallets looked up"),
        walletsAnswered: o.z
          .number()
          .describe("Wallets whose series made it into the union"),
        walletsUnanswered: o.z.array(
          o.z.object({
            wallet: o.z.string(),
            reason: (0, a.openEnum)(
              ["unavailable", "deadline", "mixed_regime"],
              "swap-api-owned reason the wallet is missing from the union",
            ),
          }),
        ),
        walletsDegraded: o.z
          .array(o.z.string())
          .describe(
            "Answered wallets whose series is partial (a cash, EVM or chain leg unavailable)",
          ),
        coverageFrom: o.z
          .number()
          .nullable()
          .describe(
            "Unix seconds: the earliest instant the series can start (the data floor across the answered wallets); null when no wallet answered. period=all starts here.",
          ),
      }),
    });
  r.portfolioSummaryRoutes = (0, n.defineRoutes)({
    "GET /portfolio-summary": (0, s.publicRead)("positions.read", {
      summary:
        "Merged Solana+EVM portfolio PnL for a wallet, username, or the authenticated user; a group id or group username serves the squad aggregate over active members",
      query: o.z.object({
        user: o.z
          .string()
          .max(66)
          .optional()
          .describe(
            "Identity to serve: Solana wallet, EVM wallet, username, a NEAR account id (served its NEAR realized PnL alone) or a Starknet address 0x+64 (served its Starknet realized PnL alone). Required when calling with an API key (api.pump.fun); optional with a session, where omitted = the signed-in user. Omitted with an API key answers 400 API_USER_REQUIRED.",
          ),
        period: g.describe(
          "PnL window: 1d / 1w / 1m trail now; all = from the data floor 2026-07-01T00:00Z on every chain but NEAR and Starknet (all carries no NEAR or Starknet realized leg; a NEAR account id or Starknet address answers all with null pnl and realizedPnl). Every period marks the bags held at its start (markHeld).",
        ),
        periods: o.z
          .string()
          .max(15)
          .regex(/^(1d|1w|1m|all)(,(1d|1w|1m|all))*$/)
          .optional()
          .describe(
            "Comma-separated periods, e.g. `1d,1w,1m,all` (1-4, duplicates collapsed, order kept): each is served under `windows` beside the top-level `period` body. Omitted = no `windows`.",
          ),
        fresh: o.z
          .boolean()
          .optional()
          .describe(
            "Owner refresh (1/true): applies only to a signed-in owner of the served wallet, within 60 fresh reads per minute, whose body is then refilled past every cache and answers cache.fresh: true. Anyone else, every API-host caller included, is served the cached body, never a 429",
          ),
        holdings: o.z
          .boolean()
          .optional()
          .describe(
            "Serve `holdings` (1/true): the balance leg's top 25 priced rows; omitted = no `holdings` key",
          ),
      }),
      response: o.z
        .union([w, f])
        .describe(
          "A wallet's windowed PnL also carries its derived NEAR account's realized PnL (an unavailable NEAR component is left out, never zero); a NEAR account id whose top-level period is unavailable answers 503 with degraded_lanes [trade_api.get_realized_pnl], and an unavailable window under `windows` is null. A Starknet address 0x+64 is served its Starknet realized PnL alone under the same rules",
        ),
      emits: ["API_USER_REQUIRED"],
    }),
    "POST /portfolio-summary/balances": (0, s.publicRead)("positions.read", {
      summary:
        "Multichain balance totals for a page of wallets in one read, off the same aggregate as /portfolio-summary",
      body: o.z.object({
        wallets: o.z
          .array(o.z.string().regex(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/))
          .min(1)
          .max(50)
          .describe(
            "Solana wallets (base58) to read balances for; linked EVM arms are aggregated server-side.",
          ),
        fresh: o.z
          .boolean()
          .optional()
          .describe(
            "Owner refresh for a signed-in viewer's own wallets on the page: read past every cache under GET /portfolio-summary's `fresh` rules; ignored for every other wallet, and on the API host",
          ),
        holdings: o.z
          .boolean()
          .optional()
          .describe(
            "Serve `holdings` on the viewer's own wallets; every other wallet never carries the key",
          ),
      }),
      response: o.z.object({
        wallets: o.z
          .record(o.z.string(), y.nullable())
          .describe(
            "Every requested wallet is a key; null = the read failed for that wallet; retry on the next load",
          ),
      }),
    }),
    "GET /portfolio-summary/chart": (0, s.publicRead)("positions.read", {
      summary:
        "Portfolio value series (tokens at trusted marks plus cash, linked EVM chains folded in) for a wallet, username, or the authenticated user; a group id or group username answers 404 (no squad charts)",
      query: o.z.object({
        user: o.z
          .string()
          .max(66)
          .optional()
          .describe(
            "Identity to serve: Solana wallet, EVM wallet, username, or a Starknet address 0x+64 (served its Starknet value series alone). Required when calling with an API key (api.pump.fun); optional with a session, where omitted = the signed-in user. Omitted with an API key answers 400 API_USER_REQUIRED.",
          ),
        period: o.z
          .enum(["1d", "1w", "1m", "all"])
          .default("1d")
          .describe(
            "Chart window; maps to swap-api 1D / 7D / 30D / ALL (all = from the data floor, 2026-07-01T00:00Z on every chain; the response meta carries coverageFrom)",
          ),
      }),
      response: v.describe(
        "While the chart is still being built the route answers 503 with `status: \"computing\"`, `retryAfterSeconds` and a Retry-After header: keep the loading state and re-ask after the hint (no partial series is ever served). A 503 with degraded_lanes [trade_api.get_portfolio_chart] is a lane fault: re-ask once after its Retry-After header when it carries one, otherwise it is not retryable. The series also carries the wallet's derived NEAR account; a Starknet address 0x+64 is served its Starknet value series alone. When a chain's series is unavailable the route answers 503 with degraded_lanes [trade_api.get_portfolio_chart]",
      ),
      emits: ["API_USER_REQUIRED"],
      errors: { 503: !0 },
    }),
  });
};
