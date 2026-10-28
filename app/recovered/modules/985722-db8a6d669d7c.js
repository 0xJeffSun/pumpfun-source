// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.coinsRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(540480),
    a = o.z.enum([
      "created_timestamp",
      "market_cap",
      "ath_market_cap",
      "reply_count",
      "last_reply",
      "last_trade_timestamp",
    ]),
    i = o.z.enum(["ASC", "DESC"]),
    l = o.z.enum(["NONE", "IN_PROGRESS", "COMPLETED"]),
    d = o.z.enum(["active", "paused", "completed"]),
    c = o.z.enum(["new", "graduating", "graduated", "movers", "charity"]),
    u = o.z.enum([
      "pump",
      "meteora_dbc",
      "raydium_launchpad",
      "raydium_launchpad_bonk",
      "loadout",
      "meme_fun",
      "non_launchpad",
      "stonkfun",
    ]),
    h = o.z.enum([
      "bonk",
      "bags",
      "believe",
      "moonshot",
      "jup_studio",
      "basedpad",
      "hooked",
      "dbc",
      "raydium",
    ]),
    m = {
      playlist_url: o.z
        .string()
        .nullable()
        .optional()
        .describe(
          "HLS playlist URL of the live stream; absent when no playlist entry is known for the coin, null when livestream-service has none",
        ),
      playlist_url_high: o.z.string().nullable().optional(),
      playlist_url_low: o.z.string().nullable().optional(),
      vod_playlist_url: o.z.string().nullable().optional(),
      playlist_status: o.z.string().nullable().optional(),
      playlist_updated_at: o.z
        .string()
        .nullable()
        .optional()
        .describe("ISO 8601"),
      livestream_title: o.z
        .string()
        .optional()
        .describe(
          "Set only on rows served from the currently-live cache; never attached by the playlist merge",
        ),
    },
    p = s.coinDto.extend(m),
    b = {
      recommendation_id: o.z
        .string()
        .optional()
        .describe(
          "Id of the slate the row was served in. On a search slate, search-service's per-result-set slate id, for joining a client impression to the server-side slate record. On great-coins, set on every row to group the impressions and opens of one served list: the trending list's ranking id when cc sends one, else `trending:` plus the first 16 hex chars of sha256 over the served mints in order with 0x addresses lowercased (the canonical form, whatever casing the row serves), joined by newlines, so the same rows in the same order always carry the same id. On GET /coins/similar, search-service's `similar:<uuid>` page id, one per served GetSimilarCoins page, on every row whichever leg served it. On GET /coins/recommendations, the ranker's ranking_id, one per GetRankedCoins response, on every served row",
        ),
      recommendation_rank: o.z
        .number()
        .optional()
        .describe(
          "The row's 1-based position in the slate; on great-coins, its slot in the served list; on GET /coins/similar, offset + position + 1 on the pre-screen result order; on GET /coins/recommendations, the ranker's own rank, with gaps where rows were dropped after ranking (banned, excluded, hidden by a security verdict)",
        ),
    },
    g = s.coinDto.extend(b),
    w = s.enrichedCoinDto
      .extend(m)
      .extend(b)
      .extend({
        search_priority: o.z
          .boolean()
          .optional()
          .describe(
            "True on the rows search-service's slate layout leads the page with (the curated top-token list or the social-trending head), false on its other rows; absent on a page search-service sent no layout for (a pasted address, a legacy serve)",
          ),
        exact_match: o.z
          .boolean()
          .optional()
          .describe(
            "True on the exact-ticker row search-service's slate layout seated on the page (slot 3 of the first page); absent on every other row",
          ),
        preview: o.z
          .boolean()
          .optional()
          .describe(
            "True on the first-page rows the active-search preview renders: the rows search-service's slate layout names (its priority rows when any, else its first rows, at most four; on a clone-heavy term under searchClonePreview its exact-symbol rows, up to six), or the first four rows of a page it sent no layout for (a pasted address, a legacy serve); absent on every other row and on later pages",
          ),
        compare: o.z
          .boolean()
          .optional()
          .describe(
            "True on every preview row when search-service's layout previews more than four rows, which only its clone-heavy layout does (five or more served rows whose symbol is the term): the preview is a clone comparison, so a client prints market cap, age and 1h volume on each of these rows; absent otherwise",
          ),
      }),
    y =
      "followed_holders is attached to every row or to none, decided by includeFollowedHolders; the schema is one notch wider than the wire because that correlation is a fact about the request",
    f = o.z.array(w).describe(y),
    z = o.z.array(o.z.string().min(32).max(66)).max(32),
    v =
      "base58 SVM mint or 0x EVM address; SOL is always spelled as wSOL So11111111111111111111111111111111111111112 on the index (other SOL spellings are folded to it)",
    k = o.z
      .object({
        quoteFacets: o.z
          .array(
            o.z.object({
              mint: o.z
                .string()
                .describe(
                  "The launch quote mint as the index spells it: wSOL for SOL. EVM mints are EIP-55 checksummed on the wire (TASK-5732); lowercase is the identity form backends key by",
                ),
              coinCount: o.z
                .number()
                .int()
                .min(0)
                .describe(
                  "Coins matching the request whose launch quote is this mint",
                ),
              symbol: o.z
                .string()
                .optional()
                .describe(
                  "From the quote-asset catalog; absent when the catalog is unavailable or does not list the mint",
                ),
              name: o.z
                .string()
                .optional()
                .describe(
                  "From the quote-asset catalog; absent when the catalog is unavailable or does not list the mint",
                ),
              imageUri: o.z
                .string()
                .optional()
                .describe(
                  "From the quote-asset catalog; absent when the catalog is unavailable or does not list the mint",
                ),
              assetClass: o.z
                .string()
                .optional()
                .describe(
                  "Catalog asset class (e.g. TOKEN); absent when unlabelled or unspecified",
                ),
            }),
          )
          .describe(
            "Top 12 quote mints by coin count, descending. Facets are computed under the request's own filters, so omit quoteMints/excludeQuoteMints to get the full breakdown. Empty when search-service predates quote facets.",
          ),
        otherCount: o.z
          .number()
          .int()
          .min(0)
          .describe(
            "Coins matching the request whose quote mint is outside the top 12, summed; 0 when search-service predates quote facets",
          ),
      })
      .describe(
        "Quote-currency breakdown of a coin search. Counts skip the 7-day recency filter, so they mirror /coins/search-unrestricted, not the 7-day-bounded page 0 of /coins/search-v2. Served from a 15 s Redis memo per result-affecting request.",
      ),
    _ = o.z.object({
      offset: o.z
        .number()
        .int()
        .min(0)
        .max(0x7fffffff)
        .optional()
        .describe(
          "Default 0, max 2147483647 (int32); a deeper offset is refused with 400",
        ),
      includeNsfw: o.z.boolean().optional().describe("Default false"),
      sort: o.z.string().optional(),
      searchTerm: o.z
        .string()
        .max(66)
        .optional()
        .describe(
          "66 admits a whole Starknet address paste (0x + 64 hex) and 64 a whole NEAR account paste; a raw (untrimmed) term over 50 (search-service's own hard limit) is a 400 unless its trimmed value is a NEAR account paste (dotted or 64-hex) over 50 while NEAR cards are live, or a Starknet address paste while Starknet cards are live",
        ),
      order: o.z.string().optional(),
      creator: o.z.string().optional(),
      complete: o.z.boolean().optional(),
      sessionId: o.z.string().optional(),
      deviceId: o.z
        .string()
        .max(128)
        .optional()
        .describe(
          "Persisted install/device id, forwarded verbatim to search-service, which buckets the device-grain search-ranking experiment on it",
        ),
      minAgeSeconds: o.z.number().int().optional(),
      maxAgeSeconds: o.z.number().int().optional(),
      minVolumeSol: o.z
        .number()
        .optional()
        .describe("No-op: not forwarded to the search backend."),
      maxVolumeSol: o.z
        .number()
        .optional()
        .describe("No-op: not forwarded to the search backend."),
      minMarketCapSol: o.z.number().int().optional(),
      maxMarketCapSol: o.z.number().int().optional(),
      minAthMarketCapSol: o.z.number().int().optional(),
      maxAthMarketCapSol: o.z.number().int().optional(),
      minMarketCapUsd: o.z
        .number()
        .optional()
        .describe("Inclusive lower bound on usd_market_cap (USD)"),
      maxMarketCapUsd: o.z
        .number()
        .optional()
        .describe("Inclusive upper bound on usd_market_cap (USD)"),
      maxLastTradeAgeSeconds: o.z
        .number()
        .int()
        .optional()
        .describe(
          "Upper bound on the age of the last trade in seconds; a never-traded coin never passes",
        ),
      currentlyLive: o.z.boolean().optional(),
      mayhemState: d.optional(),
      program: u.optional(),
      boostModes: o.z.array(l).optional(),
      quoteMints: z
        .optional()
        .describe(
          `Include filter on the coin launch quote mint, at most 32: ${v}`,
        ),
      excludeQuoteMints: z
        .optional()
        .describe(
          `Exclude filter on the coin launch quote mint, at most 32: ${v}`,
        ),
      platform: h.optional(),
      activeViewerCount: o.z
        .number()
        .int()
        .max(0x7fffffff)
        .optional()
        .describe("Max 2147483647 (int32); a larger value is refused with 400"),
      isCashbackEnabled: o.z.boolean().optional(),
      isHolderReward: o.z.boolean().optional(),
      tokenizedAgent: o.z.boolean().optional(),
      isCharity: o.z.boolean().optional(),
      launchpadOnly: o.z
        .boolean()
        .optional()
        .describe(
          "Only launchpad-born coins: program in the registry launchpadPrograms set, applied by search-service; an absent program counts as pump on SVM only",
        ),
      maxDepth: o.z
        .number()
        .int()
        .min(0)
        .max(0xffffffff)
        .optional()
        .describe(
          "Pump curve depth ceiling (inclusive), max 4294967295 (uint32); coins created before the depth rung count as 0. The coin-creation picker sends program=pump&pumpSwapGraduatedOnly=true&maxDepth=<max_curve_depth-1>.",
        ),
      pumpSwapGraduatedOnly: o.z
        .boolean()
        .optional()
        .describe(
          "Only coins launched on Pump and migrated to PumpSwap (pump_swap_pool set, no raydium_pool).",
        ),
      includeFollowedHolders: o.z
        .boolean()
        .optional()
        .describe(
          "Opt-in: attach the followed-holders facepile per coin (needs a viewer JWT; anonymous opt-in gets followed_holders: null). Off by default.",
        ),
      followedHoldersLimit: o.z
        .number()
        .int()
        .min(1)
        .optional()
        .describe(
          "Followed holders returned per coin (default 3; values above 10 clamp to 10).",
        ),
    }),
    E = o.z.object({
      vanityKeyCaptchaToken: o.z.string().max(4096).optional(),
      captchaToken: o.z.string().max(4096).optional(),
      metadataUri: o.z.string().max(2048).optional(),
      name: o.z.string().max(200),
      ticker: o.z.string().max(100),
      description: o.z.string().max(1e4),
      twitter: o.z.string().max(2048).optional(),
      telegram: o.z.string().max(2048).optional(),
      website: o.z.string().max(2048).optional(),
      showName: o.z.boolean().optional(),
      image: o.z.string().max(2048).optional(),
      video: o.z.string().max(2048).optional(),
      tokenProgram: o.z.string().optional(),
      cashback: o.z.boolean().optional(),
      holderReward: o.z.boolean().optional(),
      quoteMint: o.z.string().optional(),
    });
  r.coinsRoutes = (0, n.defineRoutes)({
    "POST /coins/sign-create-tx": {
      summary: "Sign a coin-creation transaction (client-only, deprecated)",
      body: o.z.object({
        serializedTx: o.z
          .string()
          .min(1)
          .max(6144)
          .describe(
            "Base58-encoded serialized Solana transaction: legacy, v0 or SIMD-0385 v1 (0x81 prefix, message first, signatures trailing; at most 4096 bytes).",
          ),
        mint: o.z.string().min(1).describe("Base58-encoded mint public key."),
        isFreeCoinCreation: o.z.boolean().optional(),
        clientSupportsV1: o.z
          .boolean()
          .optional()
          .describe(
            "Informational: the caller can consume a transaction v1 response. Changes nothing; the signed transaction always comes back in the version it was sent.",
          ),
      }),
      response: o.z.object({
        serializedTx: o.z
          .string()
          .describe(
            "Base58-encoded signed transaction, in the version it was sent (a v1 input answers v1 bytes).",
          ),
      }),
    },
    "POST /coins/add-banner": {
      summary: "Add a banner to a coin",
      body: o.z.object({
        mint: o.z.string().min(1),
        banner: o.z.string().min(1),
      }),
      response: o.z.object({ success: o.z.boolean() }),
    },
    "POST /coins/create-v2": {
      summary: "Create a coin without captcha",
      body: E.omit({ vanityKeyCaptchaToken: !0, captchaToken: !0 }),
      response: o.z.object({
        mint: o.z.string().describe("Mint address of the created coin"),
      }),
    },
    "GET /coins/currently-live": {
      summary: "List currently-live coins",
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .optional()
          .describe("Default 60, clamped to 70"),
        offset: o.z.number().int().optional().describe("Default 0"),
        includeNsfw: o.z.boolean().optional().describe("Default false"),
      }),
      response: o.z.array(p),
    },
    "GET /coins/mayhem-mode": {
      summary: "List mayhem-mode coins",
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .optional()
          .describe("Default 60, clamped to 60"),
        offset: o.z
          .number()
          .int()
          .max(1e3)
          .optional()
          .describe("Default 0, max 1000; a deeper offset is refused with 400"),
        includeNsfw: o.z.boolean().optional().describe("Default false"),
        mayhemState: o.z
          .string()
          .optional()
          .describe(
            "Absent or empty selects active+paused; otherwise one of 'active', 'paused', 'completed'",
          ),
      }),
      response: o.z.array(s.coinDto),
    },
    "GET /coins/bookmarks/default": {
      summary: "Get coins in the default bookmark list",
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .optional()
          .describe("Default 10, clamped to 50"),
        offset: o.z.number().int().optional().describe("Default 0"),
        includeNsfw: o.z.boolean().optional().describe("Default true"),
      }),
      response: o.z.array(s.coinDto),
    },
    "GET /coins/bookmarks/{id}": {
      summary: "Get coins in a bookmark list",
      params: o.z.object({ id: o.z.string() }),
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .optional()
          .describe("Default 10, clamped to 50"),
        offset: o.z.number().int().optional().describe("Default 0"),
        includeNsfw: o.z.boolean().optional().describe("Default true"),
      }),
      response: o.z.array(s.coinDto),
    },
    "GET /coins/protected": {
      summary: "Admin: list coins with creator metadata",
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .optional()
          .describe("Default 102, capped at 102"),
        offset: o.z.number().int().optional().describe("Default 0"),
        sort: a.optional().describe("Default created_timestamp"),
        order: i.optional().describe("Default DESC"),
        searchTerm: o.z.string().max(50).optional(),
        creator: o.z.string().optional(),
        fromDate: o.z.string().optional(),
        toDate: o.z.string().optional(),
        includeNsfw: o.z.boolean().optional().describe("Default false"),
        complete: o.z.boolean().optional(),
        isLive: o.z.boolean().optional(),
        banned: o.z.boolean().optional(),
        boostModes: o.z.array(l).optional(),
      }),
      response: o.z.array(s.coinDto),
    },
    "POST /coins/mints": {
      summary: "Get enriched coins by mint addresses",
      body: s.getCoinsByMintsBody,
      response: o.z.array(s.enrichedCoinDto).describe(y),
    },
    "GET /coins/similar": {
      summary: "Get coins similar to a mint",
      query: o.z.object({
        mint: o.z.string(),
        limit: o.z.number().int().optional().describe("Default 5"),
        offset: o.z
          .number()
          .int()
          .max(0x7fffffff)
          .optional()
          .describe(
            "Default 0, max 2147483647 (int32); a deeper offset is refused with 400",
          ),
        includeNsfw: o.z.boolean().optional().describe("Default false"),
        chain: o.z
          .string()
          .optional()
          .describe(
            "starknet:SN_MAIN names mint as a Starknet address (0x plus 1 to 64 hex, served canonical), answered from the Starknet lane alone while uapiStarknetDiscovery is live, else 400 on a non-address; that arm serves only the first 50 neighbours, so offset + limit past 50 returns a short page and offset 50 or deeper returns []. near:mainnet names mint as a NEAR account id (2-64 lowercase chars: named (dotted or top-level), 64-hex or 0x-implicit; served verbatim, never case-folded), answered from the NEAR lane alone while uapiNearDiscovery is live, else 400 on a non-account id; that arm too serves only the first 50 neighbours. Either arm dark, or any other value, is ignored and mint is read as before",
          ),
      }),
      response: o.z
        .array(g)
        .describe(
          "Most similar first. Every row carries recommendation_id (search-service's similar:<uuid> page id, one per served GetSimilarCoins page, whichever leg served) and recommendation_rank = offset + position + 1 on the pre-screen result order; absent only when search-service sent no rec_id",
        ),
    },
    "GET /coins/search-v2": {
      summary: "Search coins (7-day recency filter)",
      query: _.extend({
        limit: o.z
          .number()
          .int()
          .min(1)
          .optional()
          .describe(
            "Rows per page, default 5. search-service caps the 7-day recency-filtered page at 50; larger values are accepted and clamped to 50, not rejected.",
          ),
        experimentFlag: o.z.string().optional(),
        includePerps: o.z
          .boolean()
          .optional()
          .describe(
            "true appends up to 5 HyperCore perp rows after the slate on offset 0; absent or false never appends. Default false.",
          ),
      }),
      response: f.describe(
        `${y} When the caller passes includePerps=true and searchTerm is non-empty, up to 5 HyperCore perp rows are appended after the slate on offset 0 only, beyond limit; a perp row carries chain hlcore:mainnet, assetClass ASSET_CLASS_PERPETUAL and perp{}, and lacks the token-only fields (usd_market_cap, market_cap, created_timestamp, chain_id), so a caller that passes includePerps=true must tolerate it; callers that do not pass it never see one.`,
      ),
    },
    "GET /coins/search-unrestricted": {
      summary: "Search coins without recency filter",
      query: _.extend({
        limit: o.z
          .number()
          .int()
          .min(1)
          .max(200)
          .optional()
          .describe("Default 48"),
      }),
      response: f,
    },
    "GET /coins/search-quote-facets": {
      summary: "Quote-currency facet counts for a coin search",
      query: _.omit({
        offset: !0,
        includeFollowedHolders: !0,
        followedHoldersLimit: !0,
      }).extend({
        searchTerm: o.z
          .string()
          .max(50)
          .optional()
          .describe("50 is search-service's own hard limit"),
      }),
      response: k,
    },
    "GET /coins/great-coins": {
      summary: "Get great coins",
      query: o.z.object({
        includeFollowedHolders: o.z
          .boolean()
          .optional()
          .describe(
            "Opt-in: attach the followed-holders facepile per coin (needs a viewer JWT). Off by default.",
          ),
        followedHoldersLimit: o.z
          .number()
          .int()
          .min(1)
          .optional()
          .describe(
            "Followed holders returned per coin (default 3; values above 10 clamp to 10).",
          ),
        experimentGroup: o.z
          .string()
          .optional()
          .describe(
            "Experiment group (deprecated, no longer affects behavior).",
          ),
        topK: o.z
          .number()
          .int()
          .min(1)
          .max(50)
          .optional()
          .describe(
            "Number of trending search results to return. Defaults to 5, max 50.",
          ),
      }),
      response: o.z.array(s.enrichedCoinDto.extend(b)).describe(y),
    },
    "GET /coins/recommendations": {
      summary:
        "Ranked coin recommendations for a client surface (deposit_success: the rail on the deposit success screen; search_entry: the Recommended block on the search entry view; first_buy_picks: the first-coin list on the own-profile empty Open positions tab, ranked over the wallet-pay catalog), best first, each row stamped with the ranking id and rank",
      query: o.z.object({
        surface: o.z
          .enum(["deposit_success", "search_entry", "first_buy_picks"])
          .describe(
            "The client surface the slate is for; selects the kill switch, the ranker deadline and caller tag and the security-verdict surface",
          ),
        limit: o.z
          .number()
          .int()
          .min(1)
          .max(10)
          .optional()
          .describe("Rows served. Default 5, max 10"),
        session_id: o.z
          .string()
          .max(128)
          .optional()
          .describe(
            "Per-session id; the ranking service buckets its experiments server-side on it",
          ),
        device_id: o.z
          .string()
          .max(128)
          .optional()
          .describe(
            "Persisted install id, the value analytics events stamp as deviceId, so ranking-log device ids join impressions",
          ),
        session_start_timestamp_ms: o.z
          .number()
          .int()
          .min(0)
          .max(Number.MAX_SAFE_INTEGER)
          .optional()
          .describe(
            "Epoch-ms the client's current session (session_id) started at; a session-age signal for the ranking, forwarded verbatim",
          ),
        first_login_timestamp_ms: o.z
          .number()
          .int()
          .min(0)
          .max(Number.MAX_SAFE_INTEGER)
          .optional()
          .describe(
            "Epoch-ms of the viewer's first login; a user-age signal for the ranking, forwarded verbatim",
          ),
        country: o.z
          .string()
          .max(8)
          .optional()
          .describe(
            "ISO 3166-1 alpha-2 country code — device-locale hint, not auth",
          ),
        os: o.z
          .string()
          .max(16)
          .optional()
          .describe(
            "Device OS the client declares (ios or android); resolved with the x-pump-platform header, anything else reads as not sent",
          ),
        platform: o.z
          .enum(["APP", "WEB"])
          .optional()
          .describe(
            "Client surface (APP or WEB), exact-match only; absent, the x-pump-source header decides",
          ),
        includeFollowedHolders: o.z
          .boolean()
          .optional()
          .describe(
            "Opt-in: attach the followed-holders facepile per coin (needs a viewer JWT; anonymous opt-in gets followed_holders: null). Off by default.",
          ),
      }),
      response: o.z
        .array(s.enrichedCoinDto.extend(b))
        .describe(
          `Best first; empty while the surface is dark (deposit_success: coinsDepositSuccessRecommendations off; search_entry: searchEntryRecommendationsRoute off; first_buy_picks: coinsFirstBuyPicksRecommendations off) or when the ranker has nothing servable for the viewer. 503 when the ranker fails or misses the surface's deadline (deposit_success 2 s, search_entry 900 ms, first_buy_picks 2.5 s), never an unstamped fallback. ${y}`,
        ),
    },
    "GET /coins/hot-coin": {
      summary: "Get the currently surfaced hot coin, if any",
      response: o.z.object({
        hotCoin: o.z
          .object({
            coin: s.coinDto,
            expiresAt: o.z
              .number()
              .nullable()
              .describe(
                "null = popularity window (surfaced while the coin stays rank 1); a number is the fixed window wall-clock expiry",
              ),
          })
          .nullable()
          .describe("null is the steady state: no approved surfacing window"),
      }),
    },
    "GET /coins/top-tokens/mints": {
      summary: "Get the top-tokens mint list",
      query: o.z.object({
        sortOrder: o.z
          .enum(["volume_1_hr", "market_cap"])
          .optional()
          .describe("Omit for the admin-curated order."),
        withChains: o.z
          .boolean()
          .optional()
          .describe(
            "true serves the { mints, chains } shape; omitted or false serves the bare mint array, unchanged since before 0.133.0",
          ),
      }),
      response: o.z.union([
        o.z
          .array(o.z.string())
          .describe(
            "Mint addresses only (base58 SVM or 0x EVM), ordered by ?sortOrder; membership is identical across sort modes",
          ),
        o.z.object({
          mints: o.z
            .array(o.z.string())
            .describe(
              "The list the bare shape serves, same order and casing, then NEAR account ids (verbatim), which ride this shape only",
            ),
          chains: o.z
            .record(o.z.string(), o.z.array(o.z.string()))
            .describe(
              "CAIP-2 chain ids (eip155:8453, solana:<genesis>, near:mainnet) each member was vetted on, keyed by its entry in `mints`; a NEAR account id is keyed to [near:mainnet]; [] for a member with no vetted chain, which earns no chain-keyed badge",
            ),
        }),
      ]),
    },
    "GET /coins/perps": {
      summary: "Get the HyperCore perps screener",
      query: _.pick({
        includeFollowedHolders: !0,
        followedHoldersLimit: !0,
      }).extend({
        sort: o.z
          .enum(["volume_24h", "open_interest", "funding_rate", "change_24h"])
          .optional()
          .describe("Default volume_24h"),
        limit: o.z
          .number()
          .int()
          .min(1)
          .max(150)
          .optional()
          .describe("Rows per page, default 30, max 150"),
        offset: o.z
          .number()
          .int()
          .min(0)
          .max(149)
          .optional()
          .describe("Default 0, max 149"),
      }),
      response: o.z
        .array(s.enrichedCoinDto)
        .describe(
          `Perp rows only (chain, assetClass perpetual, perp set; token-only fields absent). ${y} An opted-in row's followed_holders is null for an anonymous viewer and for a coin none of the viewer's follows hold; otherwise holders (largest position first, up to followedHoldersLimit) and totalCount.`,
        ),
    },
    "GET /coins/boards/{board}": {
      summary: "Get a fold-ranked coin board",
      params: o.z.object({ board: c }),
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .min(1)
          .max(150)
          .optional()
          .describe(
            "Rows per page, default 30, max 150 (the AIA board window)",
          ),
        offset: o.z
          .number()
          .int()
          .min(0)
          .max(149)
          .optional()
          .describe("Default 0, max 149"),
        chains: o.z
          .array(o.z.string())
          .optional()
          .describe(
            "CSV of CAIP-2 chain ids (solana:..., eip155:8453, near:mainnet, starknet:SN_MAIN) to keep; omit for every chain. A NEAR or Starknet row is ranked only under chains naming near:mainnet or starknet:SN_MAIN, each answering 400 while its cards are dark",
          ),
      }),
      response: o.z
        .object({
          board: c,
          version: o.z
            .string()
            .describe(
              "List version, uint64 as a decimal string; bumps on every rank change of the board",
            ),
          as_of_ms: o.z
            .number()
            .describe(
              "Newest card as_of on the page in ms; 0 for an empty page",
            ),
          coins: o.z
            .array(s.coinDto)
            .describe(
              "Rank order; a member without a coin-service body is dropped, never synthesized",
            ),
        })
        .describe(
          "404 (router body) while uapiCoinLists is off; 503 with degraded_lanes [trade_api.list_coins] when the TradeApi lane is down or unconfigured",
        ),
    },
    "GET /coins/{mint}/canonical-image": {
      summary: "Get the canonical image for a mint",
      params: o.z.object({ mint: o.z.string() }),
      response: o.z.object({
        imageUri: o.z
          .string()
          .nullable()
          .describe("Canonical image URI, or null when unavailable"),
        cdnKey: o.z.string().describe("CDN cache key for the image"),
      }),
      emits: ["COIN_BLOCKED"],
    },
    "POST /coins/raw/batch": {
      summary: "Get raw coins by mint addresses",
      body: s.getCoinsByMintsBody,
      response: o.z.array(s.coinDto),
    },
    "GET /coins/check-vanity-store/{mint}": {
      summary: "Check if a mint key came from the vanity pool",
      params: o.z.object({ mint: o.z.string() }),
      response: o.z.boolean(),
    },
    "GET /coins": {
      summary: "List coins with creator metadata",
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .optional()
          .describe("Default 50, clamped to 70"),
        offset: o.z.number().int().optional().describe("Default 0"),
        sort: a.optional().describe("Default created_timestamp"),
        order: i.optional().describe("Default DESC"),
        includeNsfw: o.z.boolean().optional().describe("Default false"),
        creator: o.z.string().optional(),
        complete: o.z.boolean().optional(),
        boostModes: o.z.array(l).optional(),
      }),
      response: o.z.array(s.coinDto),
    },
  });
};
