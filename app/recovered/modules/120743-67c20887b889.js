// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.mintPositionsRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = e.r(984870);
  r.mintPositionsRoutes = (0, n.defineRoutes)({
    "GET /mint-positions/{mint}": (0, s.publicRead)("positions.read", {
      summary: "Get the users holding a position in a mint",
      params: o.z.object({ mint: o.z.string() }),
      query: o.z.object({
        sortBy: o.z
          .enum(["LATEST", "TOP", "LOWEST_ENTRY", "RANKED", "CLOSED_PNL"])
          .optional()
          .describe(
            "Order of the list. CLOSED_PNL serves the mint's fully exited positions (booked realized PnL) ranked by realized PnL USD descending, losses last, and requires withThesis=true; every other sort serves open holders.",
          ),
        page: o.z.number().int().min(0).optional(),
        pageSize: o.z.number().int().min(1).max(50).optional(),
        withThesis: o.z
          .boolean()
          .optional()
          .describe(
            "Server-side filter to holders whose position has a callout with a thesis (cc applies it before paging)",
          ),
        updatesLimit: o.z
          .number()
          .int()
          .min(0)
          .max(20)
          .optional()
          .describe(
            "Max author updates per callout (omitted serves 5); 0 skips update enrichment entirely",
          ),
        includeProfile: o.z
          .boolean()
          .optional()
          .describe(
            "Embed each holder's full registry profile on the row; off by default",
          ),
        dustFloorUsd: o.z
          .number()
          .min(0)
          .max(1e5)
          .optional()
          .describe(
            "LOWEST_ENTRY's USD dust floor, forwarded verbatim to cc (unset = cc's $5 default, 0 = structural guards only); rejected with sortBy=CLOSED_PNL, which ranks by realized PnL instead",
          ),
        pageToken: o.z
          .string()
          .max(256)
          .optional()
          .describe(
            "RANKED only: cursor from a previous RANKED response. Mutually exclusive with `page`",
          ),
        forceRefresh: o.z
          .boolean()
          .optional()
          .describe(
            "RANKED only: pull-to-refresh — skip the ranking-cache read and restart the walk",
          ),
        chainId: o.z
          .number()
          .int()
          .min(1)
          .optional()
          .describe(
            "RANKED only: Codex network id of the coin. Solana mints never need it; an unresolvable 0x mint without it is a 400",
          ),
        session_id: o.z
          .string()
          .max(128)
          .optional()
          .describe(
            "RANKED only: required for a nextPageToken; without it RANKED serves one page and no token",
          ),
        device_id: o.z
          .string()
          .max(128)
          .optional()
          .describe(
            "RANKED only: persisted install/device id, forwarded to the ranker",
          ),
        country: o.z
          .string()
          .min(2)
          .max(8)
          .optional()
          .describe(
            "RANKED only: ISO 3166-1 alpha-2 country code — device-locale hint, not auth",
          ),
        os: o.z
          .string()
          .max(16)
          .optional()
          .describe("RANKED only: device OS the client declares"),
        platform: o.z
          .string()
          .max(16)
          .optional()
          .describe("RANKED only: client surface"),
        chain: o.z
          .string()
          .regex(/^(?:(?:hlcore|near):mainnet|starknet:SN_MAIN|ton:-239)$/)
          .optional()
          .describe(
            "CAIP-2 chain of a perp, NEAR, Starknet or TON coin: hlcore:mainnet makes {mint} the HL coin key verbatim (BTC, xyz:TSLA) and serves the coin's HyperCore perp holders (assetClass ASSET_CLASS_PERPETUAL, chainId 0, perp block); near:mainnet makes {mint} a NEAR account id verbatim (wrap.near) and serves its NEAR holders (chain near:mainnet, chainId null, walletAddress the account id); starknet:SN_MAIN makes {mint} a Starknet address (0x + 1..64 hex, any case, a 0x+40 included; served as 0x + 64 lowercase hex, 400 otherwise) and serves its Starknet holders (chain starknet:SN_MAIN, chainId null, coinMint and walletAddress 0x + 64 lowercase hex); ton:-239 makes {mint} the CRC-checked 48-char bounceable EQ jetton master (400 otherwise) and serves its TON holders (chain ton:-239, chainId null, walletAddress the holder's TON wallet); RANKED on hlcore:mainnet, near:mainnet or starknet:SN_MAIN is ranked where enabled (rows carry recommendationId and recommendationRank; chainId is ignored) and otherwise serves TOP with no recommendationId, and on ton:-239 always serves TOP. Absent = the spot path. 400, with the hlcore:mainnet body, when holders are not available for that chain",
          ),
        scope: o.z
          .enum(["mint", "pairs"])
          .optional()
          .describe(
            "Which callouts the list reads. mint (default, same as omitted) = the coin's own holders. pairs = the coin's callout rows plus every coin whose launch quote is this mint, each row tagged with its coinMint and the page's coins served in `coins`; requires withThesis=true and sortBy TOP, LATEST, CLOSED_PNL or RANKED, and rejects chain and dustFloorUsd. RANKED under pairs pages by pageToken like RANKED under mint and serves the ranker's order across those coins with recommendationId and recommendationRank on every row, or the pairs TOP page (page 0, no recommendation fields, no token) while the ranked Pairs view is dark or degraded",
          ),
      }),
      response: o.z.object({
        positions: o.z.array(a.mintPositionDto),
        totalCount: o.z
          .number()
          .describe(
            "Total visible holders of the mint, from cc's response-level GetPositions total: every chain of the mint counted, served even on empty pages. LATEST/TOP/LOWEST_ENTRY count the mint's open holders. sortBy=CLOSED_PNL counts the closed holders that have a callout for this mint, and is INFORMATIONAL ONLY — do not page on it: page on hasMore. scope=pairs counts the in-scope callout rows (the coin and its pairs), exact and pageable. Only while a cc deploy is mid-roll can this fall back to summing the page rows' per-chain totals, which are not status-scoped",
          ),
        hasMore: o.z
          .boolean()
          .describe(
            "Whether another page exists. Pages may come back shorter than pageSize because cc drops rows at read time, so clients must page on hasMore, never on row count. Offset sorts (TOP/LATEST/LOWEST_ENTRY/CLOSED_PNL, and every offset-paged scope=pairs sort) derive it from totalCount; RANKED, under either scope, sets it from nextPageToken. Always false on an empty page. On a thesis-filtered list it may still be true for the last non-empty page, in which case the next page comes back empty with hasMore false — so following hasMore alone costs at most one empty request, never an endless walk",
          ),
        coins: o.z
          .record(o.z.string(), a.positionCoinDto)
          .optional()
          .describe(
            "scope=pairs only (every sort, RANKED included): lean coin per distinct coinMint on the page; absent when the verdict gate hid the coin",
          ),
        nextPageToken: o.z
          .string()
          .optional()
          .describe("RANKED only; absent = end of list or no session_id"),
      }),
      cacheTtlSeconds: 10,
    }),
  });
};
