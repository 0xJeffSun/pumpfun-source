// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.followingPositionsRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(421504),
    a = e.r(890664),
    i = e.r(983689),
    l = e.r(959736),
    d = e.r(443063),
    c = s.replyCalloutDto.extend({
      position: s.repostPositionDto
        .nullable()
        .describe(
          "The liked callout author's position in its coin (position.perp on a perp callout); null when the author has no visible position row",
        ),
    }),
    u = o.z.enum([
      "callout",
      "update",
      "reply",
      "quote",
      "repost",
      "trade",
      "like",
      "post",
      "collectible",
    ]),
    h = o.z.enum([...u.options, "session"]),
    m = o.z.object({
      buys: o.z
        .number()
        .describe("How many folded fills were buys; 0 on a run of sells"),
      sells: o.z
        .number()
        .describe("How many folded fills were sells; 0 on a run of buys"),
      boughtUsd: o.z
        .number()
        .nullable()
        .describe(
          "USD across the buy fills; null on a run of sells or when none carried a notional",
        ),
      soldUsd: o.z
        .number()
        .nullable()
        .describe(
          "USD across the sell fills; null on a run of buys or when none carried a notional",
        ),
      outcome: o.z
        .enum(["aped", "exited"])
        .describe("'aped' on a run of buys, 'exited' on a run of sells"),
    }),
    p = o.z.object({
      userId: o.z.string(),
      userName: o.z.string(),
      profileImage: o.z.string().nullable(),
      walletAddress: o.z
        .string()
        .nullable()
        .describe(
          "The profile's canonical wallet, distinct from the item-level walletAddress (the trading/position wallet)",
        ),
      isVerified: o.z.boolean(),
      verifiedBadgeVisible: o.z
        .boolean()
        .describe(
          "Badge rendering hint beside isVerified: show the checkmark only when both are true",
        ),
      resolvedAvatarDecoration: o.z
        .string()
        .nullable()
        .describe(a.RESOLVED_AVATAR_DECORATION_DESCRIPTION),
      xUsername: o.z.string().nullable(),
      kind: o.z
        .enum(["person", "group"])
        .describe(
          "'group' = a squad callout/repost: the author is the squad and the row's walletAddress is the acting admin's",
        ),
    }),
    b = o.z.object({
      amountHeld: o.z.number(),
      pnlUsd: o.z.number().nullable(),
      pnlPercentage: o.z.number().nullable(),
      valueUsd: o.z.number().nullable(),
      realizedPnlUsd: o.z.number(),
      costBasisAmount: o.z.number(),
      costBasisUsd: o.z.number().nullable(),
      amountBought: o.z.number().nullable(),
      amountBoughtUsd: o.z.number().nullable(),
      receiptBasisUsd: o.z.number().nullable(),
      tokenPriceUsd: o.z
        .number()
        .nullable()
        .describe("Not re-markable when null"),
    }),
    g = o.z.object({
      eventKind: o.z
        .enum(["open", "add", "reduce", "close"])
        .describe(
          "What the order did to the position; a flip serves as two rows (close, then open) sharing orderKey",
        ),
      side: o.z.enum(["long", "short"]),
      leverageBps: o.z
        .number()
        .nullable()
        .describe("10000 = 1x; null when unknown"),
      isCross: o.z
        .boolean()
        .nullable()
        .describe("Cross margin; false = isolated; null when unknown"),
      size: o.z
        .string()
        .describe(
          "HL decimal string in coin units: the order's fold of its fills",
        ),
      sizeAfter: o.z
        .string()
        .describe(
          "HL decimal string, signed (negative = short): the position after the order",
        ),
      notionalUsd: o.z.number().describe("Order notional in USD"),
      price: o.z
        .number()
        .describe("Fill price in USD, size-weighted across the order's fills"),
      closedPnlUsd: o.z
        .number()
        .nullable()
        .describe(
          "Realized PnL in USD the order closed; null when it closed nothing",
        ),
      liquidated: o.z
        .boolean()
        .describe("The order was a liquidation (close or reduce)"),
      dex: o.z.string().describe("HL perp dex; '' = the main dex"),
      orderKey: o.z
        .string()
        .describe(
          "hl:<lowercase 0x>:<coin>:<twap id or oid>; equals tx except on the two rows of a flip (tx carries #close / #open)",
        ),
    }),
    w = o.z.object({
      tx: o.z
        .string()
        .describe(
          "Transaction signature — the dedupe key against refetches and future live events",
        ),
      isBuy: o.z.boolean(),
      timestamp: o.z.string().nullable(),
      amountUsd: o.z.number().nullable(),
      baseAmount: o.z.number().nullable(),
      priceUsd: o.z
        .number()
        .nullable()
        .describe(
          "Effective fill price (amountUsd / baseAmount): route loss included, user-borne fees excluded",
        ),
      fillMarketCapUsd: o.z
        .number()
        .nullable()
        .describe(
          "The market cap the fill executed at (priceUsd × the coin's supply), on the same base as the item-level marketCap, which is the coin's CURRENT cap; null when priceUsd is unknown or the coin card has no real supply",
        ),
      groupId: o.z
        .string()
        .nullable()
        .describe(
          "Squad id when the row reached the viewer via a followed squad rather than a direct follow (direct wins on overlap); null on direct-follow rows",
        ),
      collectibleLeg: i.collectibleLeg.optional(),
      collectible: i.collectibleDto
        .optional()
        .describe(
          "Card legs only (collectibleLeg set): the card block; absent on every token row and when the card lookup misses",
        ),
      perp: g
        .optional()
        .describe(
          "hlcore TRADE rows only (chain hlcore:mainnet, assetClass ASSET_CLASS_PERPETUAL): the HyperCore perp order; absent on every spot fill",
        ),
    }),
    y = {
      kind: h.describe(
        "Exactly one payload slot is set per kind: callout (+position) / reply / repost / trade (kinds trade and collectible) / like / post / session. 'collectible' is a graded-card leg on the trade slot. 'session' is served, never requested",
      ),
      author: p
        .nullable()
        .describe("The item's actor — for reposts, the reposter"),
      coinMint: o.z.string().describe("Empty string when the anchor is hidden"),
      chainId: o.z
        .number()
        .describe(
          "cc's chain id for the row, passed through unchanged (Codex network id; 0 when unresolvable). Identify a perp row by chain and assetClass, never by chainId",
        ),
      chain: o.z
        .string()
        .optional()
        .describe(
          "CAIP-2 chain of a perp row (hlcore:mainnet): the row's coin is anchored on an hlcore callout, or the row is an hlcore TRADE row (trade.perp set); coinMint is the HL coin key and the coin card is the perp's, marketCap null. Absent on every spot row",
        ),
      assetClass: o.z
        .enum(["ASSET_CLASS_TOKEN", "ASSET_CLASS_PERPETUAL"])
        .optional()
        .describe(
          "ASSET_CLASS_PERPETUAL on perp rows; absent on every spot row",
        ),
      perp: s.mintPositionPerpDto
        .nullable()
        .optional()
        .describe(
          "Perp callout rows and hlcore TRADE rows: the author's (trader's) HyperCore position as cc stamps it on the row (live while open, the frozen callout close once closed), as /mint-positions serves it; null on a closing trade or when the row carries neither a live position nor a callout side. Absent on every other row",
        ),
      walletAddress: o.z
        .string()
        .nullable()
        .describe(
          "The trading wallet on trade rows, the position wallet on callout rows, null otherwise. EVM never reaches the client",
        ),
      createdAt: o.z
        .string()
        .nullable()
        .describe("The item's own timestamp (ISO 8601) — the feed's sort key"),
      coinName: o.z
        .string()
        .nullable()
        .describe("Coin card; null when the lookup misses"),
      coinImage: o.z.string().nullable(),
      symbol: o.z.string().nullable(),
      marketCap: o.z.number().nullable(),
      callout: s.calloutDto.nullable(),
      position: b
        .nullable()
        .describe(
          "Callout rows only: the author's stored position behind the callout",
        ),
      reply: s.userReplyRowDto.nullable(),
      repost: s.repostDto.nullable(),
      trade: w
        .nullable()
        .describe("Trade fill; empty fill fields are null, never zero"),
      like: o.z.object({ callout: c.nullable() }).nullable(),
      post: d.postDto
        .nullable()
        .describe(
          "Post rows: the coin-less post (root, reply, quote or repost). coinMint is '' and chainId 0 on these rows",
        ),
      totalCallouts: o.z.number(),
    },
    f = o.z.object(y),
    z = o.z.object({
      kind: o.z
        .literal("trade")
        .describe(
          "The kind every folded row shares — the row a client renders the session as — never 'session'. Only fills fold (TASK-5305): a callout or update stays a row of its own",
        ),
      count: o.z.number().describe("Total folded fills, as cc served it"),
      items: o.z
        .array(f)
        .describe(
          "The folded fills, newest first — complete trade items of the run's one side, carrying the same coin card and fill fixups a top-level row gets. Always two or more; this is what a client expands under 'Show activity'",
        ),
      summary: o.z
        .object({
          trade: m.describe(
            "The run's count and notional on its one side and its outcome",
          ),
        })
        .describe("The roll-up over the folded fills"),
    }),
    v = o.z
      .object(y)
      .extend({
        session: z
          .optional()
          .describe(
            "Session rows only: the folded run this row stands in for. The row's own author, coin, wallet and createdAt are the newest folded row's, so it sorts and filters like the row it replaces",
          ),
      });
  r.followingPositionsRoutes = (0, n.defineRoutes)({
    "GET /following-positions/alerts": {
      summary:
        "The unified alerts feed: everything the signed-in user's followed accounts did as first-class rows — callouts, updates, replies, quotes, reposts, trades, and graded-card legs (kind collectible) — newest first with cursor paging. kinds filters to any subset (one endpoint as each single-lane feed); trades are not tied to callouts. Filters: kinds subset, a trade-notional band (minTradeAmountUsd/maxTradeAmountUsd), a current-market-cap band (minMarketCapUsd/maxMarketCapUsd; coins with unknown mcap drop while a bound is set), and an asset-class subset (assetClasses: coin|stock|perp|pack, post-cut).",
      query: o.z.object({
        pageSize: o.z
          .number()
          .int()
          .min(1)
          .optional()
          .describe(
            "Served size is clamped to 10 server-side, never rejected; cursor, not page length, is the end-of-feed signal",
          ),
        cursor: o.z
          .string()
          .max(200)
          .optional()
          .describe(
            "Keyset cursor from the previous response's nextCursor; omit for the first page",
          ),
        kinds: o.z
          .array(u)
          .optional()
          .describe("Comma-separated subset to serve; omitted = all nine"),
        chainId: o.z
          .number()
          .int()
          .optional()
          .describe(
            "Restrict to one Codex network id. Applied inside the cc read over a 14-day scan window per page, so a chain-filtered page fills whenever the window holds rows and may still come short with a nextCursor",
          ),
        chainIds: o.z
          .array(o.z.number().int())
          .optional()
          .describe(
            "Comma-separated Codex network ids; combined with chainId as a set",
          ),
        chains: o.z
          .array(
            o.z.enum(["hlcore:mainnet", "ton:-239", "near:mainnet", "all"]),
          )
          .optional()
          .describe(
            "Comma-separated CAIP-2 chains; combined with chainId/chainIds as a set. hlcore:mainnet admits perp TRADE rows (alone, it serves only those); ton:-239 serves the TON rows (400 while the cc TON feeds are dark); near:mainnet serves the NEAR rows (400 while the NEAR positions lane is off); all = every spot chain unfiltered (all,hlcore:mainnet adds the perp TRADE rows), rejected (400) beside chainId/chainIds; omitted = no perp TRADE row",
          ),
        assetClasses: o.z
          .array(l.feedAssetClass)
          .max(l.feedAssetClass.options.length)
          .optional()
          .describe(
            "Comma-separated asset classes to keep; omitted = every class the other filters admit. Post-cut like the market-cap band (pages can serve short mid-set; nextCursor is the end signal). perp = a perp callout or fill (hlcore), pack = a graded-card callout or leg, stock = a coin coin-service classifies as tokenized equity, coin = every other coin row (a missed coin card reads as coin); coin-less post rows are exempt. chains=hlcore:mainnet and the collectible kind still decide whether perp fills and card legs reach the page; assetClasses drops what those levers cannot (perp and card callouts, stock vs coin)",
          ),
        minTradeAmountUsd: o.z
          .number()
          .min(0)
          .optional()
          .describe("Trade rows only: drop trades below this USD notional"),
        maxTradeAmountUsd: o.z
          .number()
          .min(0)
          .optional()
          .describe(
            "Trade rows only: drop trades above this USD notional (or with no notional); must be >= minTradeAmountUsd when both are set (400 otherwise)",
          ),
        minMarketCapUsd: o.z
          .number()
          .min(0)
          .optional()
          .describe(
            "Serve only items whose coin's CURRENT market cap is inside [min, max]",
          ),
        maxMarketCapUsd: o.z.number().min(0).optional(),
        foldSessions: o.z
          .boolean()
          .optional()
          .describe(
            "The caller renders session rows: fold a followed account's run of same-side fills on one coin into one kind=session row (only while cc's rollup lever is on). Omitted or false serves every fill as its own trade row",
          ),
      }),
      response: o.z.object({
        items: o.z
          .array(v)
          .describe(
            "A short page never means the end: the reply-family kind subsets cut post-hoc and the chain filter (chainId/chainIds), though applied inside the cc read, only scans 14 days per page. Page on nextCursor, not on array length",
          ),
        nextCursor: o.z.string().nullable().describe("null means end of feed"),
        maxAgeSeconds: o.z
          .number()
          .describe(
            "How long this exact page is re-served unchanged (the server memoizes the first page for this many seconds; 0 = assembled for this call). Never poll faster than this",
          ),
        filledAtMs: o.z
          .number()
          .describe(
            "Unix millis when the page was assembled; on a memoized page up to maxAgeSeconds before the call",
          ),
      }),
    },
    "POST /following-positions/alerts/presence": {
      summary:
        "Registers (or renews) live-stream presence and returns the subscription contract: the exact NATS subject to consume plus the heartbeat cadence. CC publishes stream events ONLY for viewers with live presence; call this every heartbeatIntervalSeconds while subscribed. A body with `filters` is an authoritative statement of the viewer's stream bands (send it on EVERY beat, an empty object clears them); no body only renews liveness and preserves the stored bands. Best-effort: a registry outage serves { subject: null } (200) — the stream degrades to HTTP polling, never the reverse.",
      body: o.z
        .object({
          filters: o.z
            .object({
              minTradeAmountUsd: o.z.number().min(0).optional(),
              maxTradeAmountUsd: o.z.number().min(0).optional(),
              minMarketCapUsd: o.z.number().min(0).optional(),
              maxMarketCapUsd: o.z.number().min(0).optional(),
            })
            .optional()
            .describe(
              "The viewer's live-stream bands, the GET /following-positions/alerts twins; present = authoritative (every band unset clears), absent = a bare liveness beat",
            ),
        })
        .optional(),
      response: o.z.object({
        subject: o.z
          .string()
          .nullable()
          .describe(
            "The exact NATS subject to consume; null = presence could not be registered (registry outage)",
          ),
        heartbeatIntervalSeconds: o.z.number(),
        presenceTtlSeconds: o.z.number(),
      }),
    },
    "DELETE /following-positions/alerts/presence": {
      summary:
        "Counts a stream stop (screen blur / app background); presence itself is never removed here and expires by its TTL, so a missed call changes nothing. Idempotent.",
      response: o.z.void(),
    },
  });
};
