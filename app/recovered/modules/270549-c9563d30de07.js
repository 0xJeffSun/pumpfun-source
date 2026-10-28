// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.shareVideoRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = o.z.object({
      renderId: o.z
        .string()
        .describe("Content-addressed render id (props hash)"),
      status: o.z.enum(["rendering", "done"]),
      videoUrl: o.z
        .string()
        .optional()
        .describe("Playable/downloadable mp4 URL once the render is done"),
    }),
    a = o.z.object({
      videoUrl: o.z
        .string()
        .describe("Presigned S3 URL of the composited video"),
      elapsedMs: o.z.number().describe("Server-side compositing time in ms"),
    }),
    i = /^hlcore:(mainnet|testnet)$/,
    l = /^[A-Za-z0-9]+(?::[A-Za-z0-9]+)?$/,
    d = {
      durationSeconds: o.z.number().min(1).max(15).optional(),
      width: o.z.number().int().min(16).max(2160).optional(),
      height: o.z.number().int().min(16).max(2160).optional(),
    },
    c = {
      framingScale: o.z
        .number()
        .min(1)
        .max(3)
        .optional()
        .describe("Zoom of the cover-fitted background about the centre, 1-3"),
      framingOffsetX: o.z
        .number()
        .min(-1)
        .max(1)
        .optional()
        .describe(
          "Horizontal shift of the zoomed background as a fraction of the output width; positive moves it right",
        ),
      framingOffsetY: o.z
        .number()
        .min(-1)
        .max(1)
        .optional()
        .describe(
          "Vertical shift of the zoomed background as a fraction of the output height; positive moves it down",
        ),
    },
    u = {
      foregroundUrl: o.z
        .string()
        .optional()
        .describe(
          "Foreground card image URL; supply exactly one of this or a `foreground` file part",
        ),
      backgroundUrl: o.z
        .string()
        .optional()
        .describe(
          "Background clip URL; alternative to a `background` file part",
        ),
    },
    h = {
      trimStartSeconds: o.z
        .number()
        .min(0)
        .optional()
        .describe("Start of the looping segment, seconds from the clip start"),
      trimEndSeconds: o.z
        .number()
        .min(0)
        .optional()
        .describe("End of the looping segment, seconds from the clip start"),
    },
    m = ["foreground", "background"];
  r.shareVideoRoutes = (0, n.defineRoutes)({
    "POST /share-video/profile": {
      summary: "Composite a shareable profile-card video",
      multipart: !0,
      multipartFiles: m,
      body: o.z.object({ ...u, ...d, ...c, ...h }),
      response: a,
    },
    "POST /share-video/pnl": {
      summary: "Composite a shareable PnL-card video",
      multipart: !0,
      multipartFiles: m,
      body: o.z.object({
        ...u,
        tier: o.z
          .enum(["legendary", "big_win", "small_win", "loss"])
          .optional()
          .describe(
            "Selects a prebaked character loop as the background clip.",
          ),
        fit: o.z.enum(["cover", "right_square"]).optional(),
        ...d,
        ...c,
        ...h,
      }),
      response: a,
    },
    "POST /share-video/replay": {
      summary: "Start (or fetch a cached) trade-replay render",
      body: o.z
        .object({
          wallet: o.z
            .string()
            .max(66)
            .describe(
              "Wallet whose trades to replay — Solana address, or mapped 0x for EVM mints",
            ),
          mint: o.z
            .string()
            .max(66)
            .describe(
              "Solana mint, EVM base token address, or the HL coin key (BTC, xyz:TSLA) when chain is hlcore",
            ),
          chainId: o.z
            .number()
            .int()
            .min(1)
            .optional()
            .describe("EVM numeric chain id (e.g. 8453); absent = Solana"),
          chain: o.z
            .string()
            .max(41)
            .regex(/^[-a-z0-9]{3,8}:[-_a-zA-Z0-9]{1,32}$/)
            .optional()
            .describe(
              "CAIP-2 chain. hlcore:mainnet marks a HyperCore perp market (mint is the HL coin key; leverage, marginUsd, liquidationPx apply). near:mainnet (uapiNearTrades live), ton:-239 or starknet:SN_MAIN (uapiStarknetTrades live) marks a card-lane replay (mint is the coin address on that chain; perp numbers dropped); while that flag is off the chain is ignored. Any other value is accepted and ignored. Absent = Solana / EVM by chainId",
            ),
          cut: o.z
            .enum(["full", "social"])
            .optional()
            .describe("Edit to render. Default: full cut"),
          profitUsd: o.z
            .number()
            .optional()
            .describe(
              "Authoritative profit override, USD (position-sheet number)",
            ),
          profitPct: o.z
            .number()
            .optional()
            .describe("Authoritative percent-return override"),
          marketCapUsd: o.z
            .number()
            .optional()
            .describe("Coin market cap for the end-card stat, USD"),
          leverage: o.z
            .number()
            .int()
            .min(1)
            .optional()
            .describe(
              "Perp position leverage (x) — the open beat badge and the margin fallback (notional / leverage)",
            ),
          marginUsd: o.z
            .number()
            .min(0)
            .optional()
            .describe(
              "Perp margin posted, USD — authoritative for the margin beat when supplied",
            ),
          liquidationPx: o.z
            .number()
            .min(0)
            .optional()
            .describe(
              "Perp liquidation price — drives the liquidation beat; absent = none shown",
            ),
          username: o.z
            .string()
            .max(64)
            .optional()
            .describe("Trader handle for the end-card footer"),
          userImageUrl: o.z.string().max(2048).optional(),
          coinSymbol: o.z.string().max(32).optional(),
          coinName: o.z.string().max(128).optional(),
          imageUrl: o.z.string().max(2048).optional(),
          createdTs: o.z
            .number()
            .int()
            .min(0)
            .optional()
            .describe(
              "Coin creation time, ms since epoch — improves candle fetch for young coins",
            ),
        })
        .refine(
          (e) => void 0 === e.chain || !i.test(e.chain) || l.test(e.mint),
          {
            message:
              "mint must be an HL coin key (BTC or dex:COIN) when chain is hlcore",
            path: ["mint"],
          },
        ),
      response: s,
    },
    "POST /share-video/pack-replay": {
      summary: "Start (or fetch a cached) pack-opening replay render",
      body: o.z.object({
        nftAddress: o.z
          .string()
          .max(64)
          .describe("The pulled card — Collector Crypt NFT address"),
        packType: o.z
          .string()
          .max(48)
          .regex(/^[A-Za-z0-9_-]+$/)
          .describe("Collector Crypt machine pack_type (cover art, odds)"),
        wallet: o.z
          .string()
          .max(64)
          .describe("The puller's wallet (byline identity)"),
        rarity: o.z
          .string()
          .max(32)
          .optional()
          .describe(
            "Collector Crypt tier name (the burst tier): common, uncommon, rare or epic today; any bounded name is accepted, media_service falls back for one it does not know",
          ),
        valueUsd: o.z
          .number()
          .min(0)
          .optional()
          .describe("Value at pull, USD (the count-up target)"),
        oddsAtLeast: o.z
          .number()
          .min(0)
          .max(1)
          .optional()
          .describe(
            "Chance of a card at least this rare from this pack, 0-1 (the odds line under the title); absent = no odds line",
          ),
        username: o.z
          .string()
          .max(64)
          .optional()
          .describe("Puller handle for the byline"),
        userImageUrl: o.z
          .url({ protocol: /^https$/ })
          .max(512)
          .optional()
          .describe(
            "Puller avatar — an https URL, already CDN-resolved by the caller",
          ),
        cut: o.z
          .enum(["full", "social"])
          .optional()
          .describe("Edit to render. Default: social cut"),
      }),
      response: s,
    },
    "POST /share-video/scene/{kind}": {
      summary: "Start (or fetch a cached) planned scene render",
      params: o.z.object({
        kind: o.z
          .string()
          .regex(/^[a-z][a-z0-9-]{0,31}$/)
          .describe(
            "Registered scene kind: pack (the pack opening) or binder (the Packs binder film); an unknown kind answers 503, as both do while the pack replay kill switch is off",
          ),
      }),
      body: o.z.object({
        params: o.z
          .record(
            o.z.string().regex(/^[a-z][a-z0-9_]{0,31}$/),
            o.z.string().max(512),
          )
          .refine((e) => Object.keys(e).length <= 16, {
            message: "at most 16 params",
          })
          .describe(
            "The scene's inputs by name, as its props API takes them. pack: nft, pack, wallet, and optionally rarity, value_usd, odds_at_least, username, user_image_url, validated by media_service. binder: wallet (base58, whose binder the film shows; any signed-in caller may share anyone's) and optionally title and stamp (1-40 characters, no control characters; only the owner's own session may send them, another session's are 400 and the film keeps its default words), nothing else, validated here",
          ),
        cut: o.z
          .enum(["full", "social"])
          .optional()
          .describe("Edit to render. Default: the kind's own default cut"),
      }),
      response: s,
      errors: { 503: !0 },
    },
    "GET /share-video/replay/{renderId}": {
      summary: "Poll a replay render (trade, pack opening or planned scene)",
      params: o.z.object({ renderId: o.z.string() }),
      response: s.describe(
        "Serves both kinds of replay render: render ids are media_service content hashes, so one status route covers trade and pack-opening kickoffs",
      ),
    },
  });
};
