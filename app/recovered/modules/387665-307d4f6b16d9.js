// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.homeFeedRoutes = r.feedChain = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = e.r(421504),
    i = e.r(540480),
    l = e.r(959736),
    d = e.r(890664);
  r.feedChain = o.z.enum([
    "solana",
    "ethereum",
    "base",
    "bsc",
    "robinhood",
    "hyperevm",
    "ink",
    "arc",
    "megaeth",
    "xlayer",
    "monad",
    "polygon",
    "arbitrum",
    "ton",
    "near",
    "starknet",
  ]);
  let c = o.z.object({
      userId: o.z.string(),
      userName: o.z.string(),
      profileImage: o.z.string().nullable(),
      walletAddress: o.z.string().nullable(),
      isVerified: o.z.boolean(),
      verifiedBadgeVisible: o.z
        .boolean()
        .describe(
          "Badge rendering hint beside isVerified: show the checkmark only when both are true",
        ),
      resolvedAvatarDecoration: o.z
        .string()
        .nullable()
        .describe(d.RESOLVED_AVATAR_DECORATION_DESCRIPTION),
      accountKind: o.z
        .enum(["person", "group"])
        .describe(
          "'group' = a squad row: userId/userName/profileImage are the squad's while walletAddress is the acting admin's posting wallet; route the author press on userId + accountKind",
        ),
      followerCount: o.z
        .number()
        .nullable()
        .describe(
          "The holder profile's pump follower count (a squad row: the squad's). null when the holder has no cc profile — unknown, never 0",
        ),
      xUsername: o.z
        .string()
        .nullable()
        .describe(
          "null when no X link exists or the holder marked it private (redacted at the ranking hop)",
        ),
      xProfileImage: o.z
        .string()
        .nullable()
        .describe(
          "The holder's picture on X (400x400), not their pump pfp. X URLs rot when the avatar changes — display-only, never persist",
        ),
      totalCallouts: o.z.number(),
      amountHeld: o.z.number(),
      valueUsd: o.z
        .number()
        .nullable()
        .describe("null when no price source resolves"),
      pnlUsd: o.z.number().nullable(),
      pnlPercentage: o.z.number().nullable(),
      realizedPnlUsd: o.z
        .number()
        .describe(
          "Realized leg only: unrealized = pnlUsd - realizedPnlUsd. Never reconstruct value as costBasisUsd + pnlUsd, which overstates by exactly this",
        ),
      tokenPriceUsd: o.z
        .number()
        .nullable()
        .describe(
          "The price valueUsd/pnlUsd are marked at; re-mark at a live price p as (amountHeld * p - costBasisUsd) + realizedPnlUsd",
        ),
      costBasisAmount: o.z
        .number()
        .describe(
          "Both cost-basis legs shrink on sells — open positions only; the amountBought pair is the lifetime entry that survives exit",
        ),
      costBasisUsd: o.z.number().nullable(),
      amountBoughtUsd: o.z
        .number()
        .nullable()
        .describe(
          "Lifetime buy total, never sell-reduced; pnlPercentage = pnlUsd / max(amountBoughtUsd + receiptBasisUsd, open costBasisUsd). Null when not yet available; EVM rows stay null",
        ),
      receiptBasisUsd: o.z
        .number()
        .nullable()
        .describe(
          "Lifetime USD basis booked for transfer-in receipts, never reduced; the pnlPercentage denominator leg beside amountBoughtUsd. Null on rows not yet re-folded",
        ),
      amountBought: o.z.number().nullable(),
      callout: a.calloutDto.nullable(),
      contentKind: o.z
        .enum(["callout", "quote"])
        .describe(
          "Which content the card should feature. The callout fields stay populated either way, so clients that ignore this render the legacy card",
        ),
      quote: a.userReplyRowDto
        .nullable()
        .describe("The selected quote repost; null for contentKind 'callout'"),
    }),
    u = o.z.object({
      coinMint: o.z.string(),
      coinName: o.z.string().nullable(),
      coinImage: o.z.string().nullable(),
      symbol: o.z.string().nullable(),
      coinDescription: o.z
        .null()
        .describe(
          "Always null: retired with the narrative feature (TASK-4008); the key stays for shipped clients",
        ),
      marketCap: o.z.number().nullable(),
      protocol: o.z
        .string()
        .nullable()
        .describe(
          "The schemas Protocol slug coin-service stores for the coin's birth venue (`pons`, `flap`, `uniswap_v3`, `pump`); an EVM coin's launchpad identity",
        ),
      platform: o.z
        .string()
        .nullable()
        .describe(
          "Solana launchpad platform (`bonk`, `bags`, `believe`); null on EVM rows",
        ),
      program: o.z
        .string()
        .nullable()
        .describe(
          "Solana program slug (`pump`, `meteora_dbc`, `raydium_launchpad`); null on EVM rows",
        ),
      chain: r.feedChain
        .nullable()
        .describe("null when the coin's chain can't be proven"),
      chain_id: o.z
        .string()
        .optional()
        .describe(
          "CAIP-2 chain on a NEAR row (`near:mainnet`, whose coinMint is a case-sensitive NEAR account id) or a Starknet row (`starknet:SN_MAIN`, whose coinMint is the canonical 0x+64 felt) only; absent on SVM/EVM rows",
        ),
      narrative: o.z
        .null()
        .describe(
          "Always null: the narrative producer is retired and its rows drained (TASK-4008); the key stays for shipped clients",
        ),
      position: c
        .nullable()
        .describe("The featured entry, or null when there is none"),
      recommendationId: o.z
        .string()
        .optional()
        .describe(
          "Recsys path only: the ranking response id, the join key for impression/action attribution. Absent — never null — on the legacy path",
        ),
      recommendationRank: o.z
        .number()
        .optional()
        .describe(
          "This card's 1-based rank in that ranking response, unique only within its recommendationId: a chains= page interleaves one ranking per chain, so ranks repeat and are not the served position",
        ),
      followedHolders: i.coinFollowedHoldersDto
        .nullable()
        .describe(
          "Viewer overlay: null for anonymous viewers, on overlay degradation, and where nobody the viewer follows holds — cc makes the last two indistinguishable by design",
        ),
    }),
    h = {
      chain: o.z
        .enum(["all", ...r.feedChain.options])
        .optional()
        .describe(
          "Unset/'all' = every feed chain; a slug = that chain only (the registry's `feed` set)",
        ),
      chains: o.z
        .array(r.feedChain)
        .max(r.feedChain.options.length)
        .optional()
        .describe(
          "Comma-separated feed chains merged in exact recency order under one cursor (TASK-5135). Exclusive with chain (400 when both are sent); one slug behaves exactly like chain=<slug>. Not yet honoured: the parameter is ignored today",
        ),
      minCostBasisUsd: o.z
        .number()
        .min(0)
        .optional()
        .describe(
          "Position size: serve only callouts whose live position has a net USD cost basis >= this. Rows with no cost basis drop while set",
        ),
      maxCostBasisUsd: o.z
        .number()
        .min(0)
        .optional()
        .describe(
          "Position size ceiling: net USD cost basis <= this; rows with no cost basis drop while set; must be >= minCostBasisUsd when both are set (400 otherwise)",
        ),
      minCalloutMarketCapUsd: o.z
        .number()
        .min(0)
        .optional()
        .describe(
          "Serve only callouts whose coin's market cap AT CALLOUT TIME was >= this USD; the card's marketCap is the coin's live figure and may differ",
        ),
      maxCalloutMarketCapUsd: o.z
        .number()
        .min(0)
        .optional()
        .describe(
          "Market cap AT CALLOUT TIME <= this USD; must be >= minCalloutMarketCapUsd when both are set (400 otherwise)",
        ),
      minMarketCapUsd: o.z
        .number()
        .min(0)
        .optional()
        .describe(
          "Serve only callouts whose coin's CURRENT market cap (the card's marketCap) is >= this USD, unlike minCalloutMarketCapUsd's at-callout-time figure. Rows whose coin has no known market cap drop while either bound is set",
        ),
      maxMarketCapUsd: o.z
        .number()
        .min(0)
        .optional()
        .describe(
          "CURRENT market cap <= this USD; must be >= minMarketCapUsd when both are set (400 otherwise)",
        ),
      assetClasses: o.z
        .array(l.feedAssetClass)
        .max(l.feedAssetClass.options.length)
        .optional()
        .describe(
          "Comma-separated subset of asset classes to keep; omitted or every class = no filter. Post-cut: applied to the hydrated rows, and the page refills from the next window as it does for the bands; ignored while the homeFeedAssetClasses kill-switch is off",
        ),
    },
    m = o.z
      .string()
      .describe("cc keyset token `<created_at micros>:<callout uuid>`");
  r.homeFeedRoutes = (0, n.defineRoutes)({
    "GET /home-feed": (0, s.publicRead)("content.read", {
      summary:
        "Get the paginated home feed of trending coins and callout positions",
      query: o.z.object({
        page: o.z.number().int().min(0).optional(),
        pageSize: o.z.number().int().min(1).max(200).optional(),
        pageToken: o.z
          .string()
          .max(256)
          .optional()
          .describe(
            "Opaque continuation token from a previous response's nextPageToken; an unrecognized value serves a fresh first batch",
          ),
        forceRefresh: o.z
          .boolean()
          .optional()
          .describe(
            "Pull-to-refresh: skip the short ranking response cache and start the walk over",
          ),
        chain: o.z
          .enum(["all", ...r.feedChain.options])
          .optional()
          .describe("Unset or 'all' = every supported chain"),
        chains: o.z
          .array(r.feedChain)
          .max(r.feedChain.options.length)
          .optional()
          .describe(
            "Comma-separated feed chains merged into one page and one cursor (TASK-5135): each chain's own ranking, interleaved by rank, so every requested chain with rows appears. Exclusive with chain (400 when both are sent); one slug behaves exactly like chain=<slug>. Not yet honoured: the parameter is ignored today",
          ),
        minMarketCapUsd: o.z
          .number()
          .min(0)
          .optional()
          .describe(
            "Serve only positions in coins whose CURRENT market cap is >= this USD; applied before ranking, so a banded page still fills. Coins with no known market cap drop while either bound is set",
          ),
        maxMarketCapUsd: o.z
          .number()
          .min(0)
          .optional()
          .describe(
            "Current market cap ceiling in USD; must be >= minMarketCapUsd when both are set (400 otherwise)",
          ),
        minCostBasisUsd: o.z
          .number()
          .min(0)
          .optional()
          .describe(
            "Position size: serve only positions whose net USD cost basis is >= this, applied before ranking. Positions with no cost basis drop while either bound is set",
          ),
        maxCostBasisUsd: o.z
          .number()
          .min(0)
          .optional()
          .describe(
            "Position size ceiling in USD of net cost basis; must be >= minCostBasisUsd when both are set (400 otherwise)",
          ),
        assetClasses: o.z
          .array(l.feedAssetClass)
          .max(l.feedAssetClass.options.length)
          .optional()
          .describe(
            "Comma-separated subset of asset classes to keep; omitted or every class = no filter. Post-cut: applied to the hydrated rows, not the ranking, so a batch can serve short (a cursor batch refills from up to three ranking slices; nextPageToken stays the end signal); ignored while the homeFeedAssetClasses kill-switch is off",
          ),
        includeFollowedHolders: o.z
          .boolean()
          .optional()
          .describe("Attach the followed-holders facepile per coin"),
        followedHoldersLimit: o.z
          .number()
          .int()
          .min(1)
          .optional()
          .describe("Default 3; values above 10 clamp to 10"),
        recsys: o.z
          .boolean()
          .optional()
          .describe(
            "Vestigial (TASK-2688): the ranking-service path is the only feed path, so this changes nothing",
          ),
        updatesLimit: o.z
          .number()
          .int()
          .min(1)
          .max(10)
          .optional()
          .describe(
            "Top-level author updates served per callout; unset serves the fetched window untrimmed",
          ),
        userId: o.z
          .string()
          .optional()
          .describe(
            "Requester's wallet address, the ranker's personalization identity",
          ),
        session_id: o.z.string().optional(),
        device_id: o.z.string().max(128).optional(),
        session_start_timestamp_ms: o.z
          .number()
          .int()
          .min(0)
          .optional()
          .describe(
            "Epoch-ms the client's current session (session_id) started at; a session-age signal for the ranking (TASK-4844)",
          ),
        country: o.z
          .string()
          .optional()
          .describe(
            "ISO 3166-1 alpha-2 country code — device-locale hint, not auth",
          ),
        os: o.z.string().optional().describe("Device OS the client declares"),
        platform: o.z
          .enum(["APP", "WEB"])
          .optional()
          .describe(
            "Client surface (APP or WEB), exact-match only; absent, the server default applies",
          ),
      }),
      response: o.z.object({
        coins: o.z
          .array(u)
          .describe(
            "Can be shorter than the requested pageSize — unhydratable rows are dropped after the page is cut",
          ),
        nextPageToken: o.z
          .string()
          .optional()
          .describe(
            "Send back as pageToken for the next batch. Empty string means the end of the feed for now, not permanently. Absent on the legacy page-based path and on every degraded fallback",
          ),
      }),
    }),
    "GET /home-feed/new": (0, s.publicRead)("content.read", {
      summary:
        'The global "New" callouts feed: every live-position-backed callout across all users, newest first with no ranking, cursor-paged. The position-size, at-callout and current market-cap bands are pushed into the cc read, rechecked after it, and the page is refilled from the next window, so nextPageToken is the only end signal',
      query: o.z.object({
        pageSize: o.z
          .number()
          .int()
          .min(1)
          .max(50)
          .optional()
          .describe(
            "Default 25; a short page means the 24h window is exhausted, not that a filter cut it. A chains= page is cut at the least-advanced chain and can run short with rows remaining, so nextPageToken is the only end signal there",
          ),
        pageToken: m
          .optional()
          .describe(
            "A previous response's nextPageToken; omit for the first page",
          ),
        updatesLimit: o.z
          .number()
          .int()
          .min(1)
          .max(10)
          .optional()
          .describe(
            "Top-level author updates served per callout, as /home-feed",
          ),
        ...h,
      }),
      response: o.z.object({
        coins: o.z
          .array(u)
          .describe(
            "/home-feed cards, newest first; recommendationId/recommendationRank are absent (no ranking response)",
          ),
        nextPageToken: m
          .optional()
          .describe(
            "Send back as pageToken for the next batch; absent = the 24h window is exhausted",
          ),
        headToken: m
          .nullable()
          .describe(
            "First page only: the newest row cc returned (before filters). Pin it as `since` until the pill is tapped or chain/filters change — never replace it with a count response or a head message. Null on continuation pages and when the window is empty (then every head row is new)",
          ),
        liveSubject: o.z
          .string()
          .describe(
            'Core NATS subject (subscriber creds) the scheduler worker pushes this chain\'s head to as {v:1, kind:"head", chain, asOf, head: [{token, calloutId, coinMint, chain, costBasisUsd, calledOutAtMcap, flagged, perp?: true on a perp row}]} whenever it changes, plus a heartbeat about every 30s. Subscribe verbatim while the New tab is visible, the way the Following tab subscribes followingFeed.user.{id}. Each message is a full snapshot that replaces the last one applied; drop a message whose asOf is older than that. Pending = rows newer than the pinned `since` that pass the filters and are not flagged: the pill count is their number (25 rows all newer = "25+"), the avatar preview is their coinMint, and revealing refetches page 1 and re-pins since. Call /home-feed/new/count only on reconnect/resume or after 90s with no message. On a chains= page this is the all-chains subject, which misses most of a minority selection: subscribe to liveSubjects instead and ignore this field. The head carries no current market cap or stock/pack class, so a count from it ignores minMarketCapUsd/maxMarketCapUsd and stock/pack in assetClasses and can overcount; /home-feed/new/count applies both.',
          ),
        liveSubjects: o.z
          .array(o.z.string())
          .optional()
          .describe(
            "chains= pages only (TASK-5135): one subject per requested chain, the complete set to subscribe to; pending = the union of their heads newer than the pinned `since`. When present, ignore liveSubject: it is the all-chains subject, a 25-row global snapshot that carries almost none of a minority selection's rows",
          ),
      }),
    }),
    "GET /home-feed/new/count": {
      summary:
        "How many \"New\" feed callouts arrived after the pinned `since` under the same filters — the pill's reconnect/resume truth check and its 90s no-message fallback; the live number rides the page's liveSubject head push. Served from the worker-written head memo",
      query: o.z.object({
        since: m.describe(
          "The feed's first-page headToken, pinned until the pill is tapped or chain/filters change. Never a count response's headToken: advancing it drops callouts created before the head but linked after it, which the page still shows",
        ),
        ...h,
      }),
      response: o.z.object({
        newCount: o.z
          .number()
          .int()
          .describe(
            "Callouts newer than `since` that pass the filters and the author gates, within the memo depth. Counted before the coin (banned/hidden/nsfw) and body gates the page applies, so the page can show fewer. A chains= count sums one memo per requested chain, so it can reach memo depth x chains. Under assetClasses stock and pack are read off the head coins' cards, so a row whose card missed counts as coin",
          ),
        capped: o.z
          .boolean()
          .describe(
            "True when `since` is older than a full memo — more than the memo depth arrived, newCount is a floor. On a chains= count, true when any requested chain's memo is full",
          ),
        headToken: m.describe(
          "Informational: the newest memoized callout when it is newer than `since`, else `since` echoed back. Do not write it into `since`",
        ),
      }),
    },
  });
};
