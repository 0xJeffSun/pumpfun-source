// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.followedHoldersRoutes = r.FOLLOWED_HOLDER_COIN_FIELDS = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(540480),
    a = e.r(882668),
    i = e.r(984870),
    l = e.r(890664),
    d = a.onboardingSuggestion.extend({
      recommendationId: o.z
        .string()
        .describe(
          "The response-level recommendationId, repeated on every row so a client stamps it on each event without a join",
        ),
      recommendationRank: o.z
        .number()
        .int()
        .describe("1-based position of this row in the served list"),
      ...a.viewerFollowFields,
    }),
    c = s.coinFollowedHoldersDto.extend({
      totalCount: o.z
        .number()
        .int()
        .describe(
          'Size of the whole followed-holder set for the coin, not just the embedded page — the "and N others" figure',
        ),
    });
  r.FOLLOWED_HOLDER_COIN_FIELDS = {
    mint: !0,
    name: !0,
    symbol: !0,
    image_uri: !0,
    video_uri: !0,
    creator: !0,
    created_timestamp: !0,
    complete: !0,
    total_supply: !0,
    total_supply_str: !0,
    show_name: !0,
    king_of_the_hill_timestamp: !0,
    market_cap: !0,
    market_id: !0,
    inverted: !0,
    nsfw: !0,
    last_reply: !0,
    reply_count: !0,
    is_currently_live: !0,
    thumbnail: !0,
    program: !0,
    usd_market_cap: !0,
    platform: !0,
    base_decimals: !0,
    raydium_pool: !0,
    chain_id: !0,
    protocol: !0,
  };
  let u = s.coinDto
      .pick(r.FOLLOWED_HOLDER_COIN_FIELDS)
      .extend({
        followed_holders: c.describe(
          "GET /followed-holders/{mint}?includePositions=true opens the full holder list with positions",
        ),
      }),
    h = o.z.object({
      holders: o.z
        .array(
          o.z.object({
            userId: o.z
              .string()
              .describe("cc user id (hyphenated UUID) of the enterer"),
            profileImageUrl: o.z
              .string()
              .describe(
                "The enterer's avatar URL; never empty (an avatar-less enterer is omitted from holders)",
              ),
          }),
        )
        .describe(
          "The accounts the viewer follows that entered the coin most recently, newest entry first, at most four; an enterer cc could not hydrate, or one with no avatar, is omitted — so this is often shorter than totalCount",
        ),
      entererUserIds: o.z
        .array(o.z.string())
        .describe(
          "Every account totalCount tallies — cc user ids (hyphenated UUIDs), newest entry first, avatar-less included — so a client can list exactly who got in behind the card",
        ),
      totalCount: o.z
        .number()
        .int()
        .describe(
          'Every account the viewer follows that net-bought the coin inside the window and cleared the USD entry floor, not just the faces shown — the rank key and the "and N others" figure',
        ),
      latestEntryAt: o.z
        .string()
        .describe(
          "ISO-8601 timestamp of the newest qualifying buy across those accounts — the recency label and the ranking tiebreak; always inside windowMinutes",
        ),
      heldValueUsd: o.z
        .number()
        .optional()
        .describe(
          "What those accounts hold in the coin right now, in USD — cc's sum over the counted positions of amount held × its shared fresh token price, so it moves with price and shrinks on a partial sell. Absent when the coin has no fresh price (never a stale mark, never cost basis): render nothing rather than 0",
        ),
    }),
    m = s.coinDto.extend({
      caught_up: h.describe(
        "Who of the accounts the viewer follows entered this coin inside the window, and when the newest entry landed",
      ),
    });
  r.followedHoldersRoutes = (0, n.defineRoutes)({
    "GET /followed-holders/suggestions": {
      summary:
        "Accounts to follow for a viewer whose Most holders board is empty: the engagement-scored onboarding pool minus the viewer's follows under mostHoldersEmptyStateScoredSuggestions, else the random daily PnL board sample GET /pnl-leaderboard/follow-suggestions serves; every row carries the response's recommendationId and its 1-based rank for the empty state's own analytics (TASK-6513).",
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .optional()
          .describe("Default 5, capped at 25"),
      }),
      response: o.z.object({
        recommendationId: o.z
          .string()
          .describe(
            "One id per response, 'most_holders_empty:<arm>:<source>:<uuid>': arm is the flag's value when served (random | scored, the intent-to-treat split), source the list that filled it, so a scored-arm fallback reads as arm scored, source pnl_board_random",
          ),
        source: o.z
          .enum(["scored_pool", "pnl_board_random"])
          .describe(
            "Which list the rows came from: scored_pool (the engagement-scored onboarding pool, minus accounts the viewer already follows) or pnl_board_random (the uniform sample of the daily PnL board, the same rows GET /pnl-leaderboard/follow-suggestions serves). pnl_board_random while mostHoldersEmptyStateScoredSuggestions is off, and under it when the pool is unreadable or yields nothing for the viewer",
          ),
        entries: o.z
          .array(d)
          .describe(
            "Ranked suggestions, recommendationRank ascending; empty when the board sample itself is empty. An unreadable daily board is the same error GET /pnl-leaderboard/follow-suggestions answers, on either arm: an empty list is never served for an outage",
          ),
      }),
    },
    "GET /followed-holders/recent-entries": {
      summary:
        "Coins ranked by how many accounts the viewer follows net-bought them inside a trailing window ('get caught up'), most enterers first — each row is the trending coin card plus the enterer facepile and the newest entry time.",
      response: o.z.object({
        coins: o.z
          .array(m)
          .describe(
            "Most unique enterers first, at most ten; a ranked mint the coin registry cannot hydrate, a Robinhood tokenized stock (protocol stock_factory, not tradable in-app), a blocked mint or a coin the scam gate flags is dropped. EVM mints are EIP-55 checksummed on the wire (TASK-5732); lowercase is the identity form backends key by, so join across surfaces on a canonicalized key",
          ),
        windowMinutes: o.z
          .number()
          .int()
          .describe(
            "The trailing window the rollup actually applied, in minutes — a server-side dial (client-server's followedHolderRecentEntriesWindowMinutes flag, under cc's own ceiling), so render recency copy against this, never an assumed constant. 0 when the route is dark or degraded, alongside an empty coins",
          ),
      }),
    },
    "GET /followed-holders/coins": {
      summary:
        "Coins ranked by how many accounts the viewer follows hold them ('coins my follows hold'), most-held first — each row is the trending coin card plus the followed-holders facepile",
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .min(1)
          .optional()
          .describe("Page size; default 50, capped at 200"),
        offset: o.z
          .number()
          .int()
          .min(0)
          .optional()
          .describe(
            "Offset into cc's 200-coin ranking bound; at or past it the page is empty",
          ),
        buyersOnly: o.z
          .boolean()
          .optional()
          .describe(
            "Default true: count only holders who bought (drops airdrop/transfer-only holdings). Pass false to count every live position",
          ),
        dustFloorUsd: o.z
          .number()
          .min(0)
          .optional()
          .describe(
            "USD floor a followed holder's position in the coin must clear to count (fresh price, else cost basis; unknown counts); default 5, 0 counts every live position",
          ),
        followedHoldersLimit: o.z
          .number()
          .int()
          .min(1)
          .optional()
          .describe(
            "Facepile size per coin (largest positions first); default 3, clamped to 10",
          ),
      }),
      response: o.z.object({
        coins: o.z
          .array(u)
          .describe(
            "Most followed holders first, mint tiebreak; a ranked mint the coin registry cannot hydrate, or a Robinhood tokenized stock (protocol stock_factory, not tradable in-app), is dropped from the page",
          ),
        hasMore: o.z
          .boolean()
          .describe(
            "Whether another page exists within cc's 200-coin ranking bound",
          ),
      }),
    },
    "GET /followed-holders/{mint}": {
      summary:
        "Accounts the viewer follows that hold a live position in the mint ('holders you follow'), largest position first (summed USD value across the holder's wallets and chains); includeMuted also lists holders the viewer has blocked, followed or not.",
      params: o.z.object({ mint: o.z.string() }),
      query: o.z.object({
        limit: o.z.number().int().min(1).optional(),
        offset: o.z
          .number()
          .int()
          .min(0)
          .optional()
          .describe("Offset paging, mirroring the cc RPC; cc rejects past 10k"),
        buyersOnly: o.z
          .boolean()
          .optional()
          .describe(
            "Default true: narrows to holders who bought. Pass explicit false to include every live position",
          ),
        includePositions: o.z
          .boolean()
          .optional()
          .describe(
            "Also attach each listed holder's position rows in the mint. Off by default",
          ),
        includeMuted: o.z
          .boolean()
          .optional()
          .describe(
            "Also list the mint's holders the viewer has blocked, followed or not; each row then carries isMuted. Off by default",
          ),
        chain: o.z
          .string()
          .regex(/^(?:(?:hlcore|near):mainnet|starknet:SN_MAIN|ton:-239)$/)
          .optional()
          .describe(
            "CAIP-2 chain of a perp, NEAR, Starknet or TON coin: hlcore:mainnet makes {mint} the HL coin key verbatim (BTC, xyz:TSLA), near:mainnet a NEAR account id verbatim (wrap.near), starknet:SN_MAIN a 0x + 64 lowercase hex felt (a shorter 0x hex is left-padded) while uapiStarknetPositions is live, and ton:-239 the TON jetton master in its CRC-checked 48-char bounceable EQ form; any of them adds holderCount, the coin's served holder total. Absent = the spot path. 400 while the NEAR positions surface (near) or the Starknet positions surface (starknet:SN_MAIN) is dark, with the hlcore:mainnet body; a malformed EQ jetton beside ton:-239 is a 400",
          ),
      }),
      response: o.z.object({
        followedHolders: o.z.array(
          l.normalizedProfile.extend({
            isMuted: o.z
              .boolean()
              .optional()
              .describe(
                "Only when includeMuted: whether the viewer has muted this holder. Absent otherwise",
              ),
          }),
        ),
        hasMore: o.z.boolean(),
        totalCount: o.z
          .number()
          .describe(
            "Exact size of the whole followed-holder set across all pages, not just this page",
          ),
        holderCount: o.z
          .number()
          .optional()
          .describe(
            "Only with chain=hlcore:mainnet, near:mainnet, starknet:SN_MAIN or ton:-239: the coin's served holder total beside totalCount (the followed subset), so 'N holders, k you follow' is one call",
          ),
        positions: o.z
          .array(i.mintPositionDto)
          .optional()
          .describe(
            "Only when includePositions: the listed holders' position rows in the mint, one entry per live position row — join to followedHolders by userId, never assume one row per holder. Best-effort: [] can also mean the attach was dropped, never an error",
          ),
      }),
    },
  });
};
