// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.marketRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(617159),
    a = (0, s.openEnum)(
      ["tensor", "collector_crypt"],
      "The marketplace the card is listed on: tensor (program TCMPhJdwDryooaGtiocG1u3xcYbRpiJzb283XfCZsDp); collector_crypt is reserved (the app reads it directly today; nothing serves it here yet). coin-communities owns the set: treat any other value as a venue the app cannot buy from",
    ),
    i = (0, s.openEnum)(
      ["collector_crypt", "phygitals"],
      "The pack provider that minted the card (phygitals today). coin-communities owns the set: treat any other value as a provider the app cannot buy from",
    ),
    l = o.z.object({
      cardId: o.z
        .string()
        .describe(
          "The card's on-chain id: the Metaplex Core asset id, or a pNFT's mint. Never empty.",
        ),
      venue: a,
      provider: i,
      collection: o.z
        .string()
        .describe("The on-chain collection address the card belongs to."),
      name: o.z
        .string()
        .describe("Display name as the venue / metadata gives it."),
      imageUrl: o.z.string().describe("Front image URL; empty when unknown."),
      backImageUrl: o.z
        .string()
        .describe("Back image URL; empty when unknown."),
      grade: o.z
        .string()
        .describe(
          'Grade as the metadata attributes spell it ("PSA 10", "BGS 9.5"); empty when unknown.',
        ),
      grader: o.z
        .string()
        .describe('Grading company ("PSA", "BGS", "CGC"); empty when unknown.'),
      certNumber: o.z
        .string()
        .describe("Grading cert number; empty when unknown."),
      category: o.z
        .string()
        .describe(
          "Normalised category slug (pokemon, one_piece, sports, watch, riftbound, dragon_ball, yugioh, other); other when unmapped.",
        ),
      setName: o.z.string().describe("Set / series name; empty when unknown."),
      priceUnits: o.z
        .string()
        .describe(
          'Asking price in priceMint base units (USDC: 6 decimals) as a decimal string, e.g. "25000000": a uint64 the buy transaction takes verbatim, so it never rounds through a double.',
        ),
      priceMint: o.z
        .string()
        .describe(
          "The currency mint the listing is priced in: USDC EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v, or So11111111111111111111111111111111111111112 for SOL.",
        ),
      priceDecimals: o.z
        .number()
        .int()
        .describe("Decimals of priceMint (USDC 6, SOL 9)."),
      priceUsdEstimate: o.z
        .number()
        .nullable()
        .describe(
          "USD estimate of the price when the currency is a dollar stable (USDC: units / 1e6); null for a SOL-priced listing in v1.",
        ),
      seller: o.z.string().describe("Seller wallet."),
      listedAtUnixMs: o.z
        .number()
        .describe(
          "When the listing was made, Unix epoch milliseconds; 0 when the venue publishes none.",
        ),
      expiresAtUnixMs: o.z
        .number()
        .describe(
          "When the listing expires, Unix epoch milliseconds; 0 = no expiry.",
        ),
      listingAddress: o.z
        .string()
        .describe(
          "The venue's listing account (Tensor: the ListState PDA); empty when the venue publishes none.",
        ),
      bestBidUnits: o.z
        .string()
        .nullable()
        .describe(
          "Best standing bid on the card in priceMint base units as a decimal string, when the venue publishes one; null in v1.",
        ),
      fetchedAtUnixMs: o.z
        .number()
        .describe(
          "Unix epoch milliseconds at which coin-communities read this listing's snapshot: the age of its price, also when served from a stale snapshot.",
        ),
    });
  r.marketRoutes = (0, n.defineRoutes)({
    "GET /market/listings": {
      summary:
        "Get the active marketplace listings of graded cards our pack providers mint, paged and filtered",
      query: o.z.object({
        venue: o.z
          .enum(["tensor"])
          .optional()
          .describe(
            "Restrict to one venue; omit for every venue. Only tensor is served today (collector_crypt is reserved); any other value is a 400.",
          ),
        collection: o.z
          .string()
          .regex(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/)
          .optional()
          .describe(
            "Restrict to one on-chain collection address (base58, e.g. Phygitals Core phygZDQZJZVHvJGYPGoKPYUtXw7mstSYtTtcuh8LJcC); omit for every collection coin-communities lists. A collection it does not list is a 400 (coin-communities refuses it), never an empty page; anything but a base58 address is a 400 too.",
          ),
        category: o.z
          .string()
          .regex(/^[a-z0-9_]{1,32}$/)
          .optional()
          .describe(
            "Restrict to one normalised category slug (pokemon, one_piece, sports, watch, riftbound, dragon_ball, yugioh, other; coin-communities owns the set). Omit for every category. A slug coin-communities does not know is a 400 (unlike /packs, which answers it empty), never an empty page; anything but a lowercase slug of up to 32 characters is a 400 too.",
          ),
        cursor: o.z
          .string()
          .min(1)
          .max(256)
          .optional()
          .describe(
            "Opaque page cursor from the previous page's nextCursor; omit for the first page. A page asked for with a cursor is read from coin-communities directly and never cached, while the first page may be up to 30 s old, so a scroll across a refresh may repeat or skip a few rows. Empty or over 256 characters is a 400; a cursor coin-communities cannot decode is a 400 too, and one at or past the end of the listings it holds now is 410 MARKET_CURSOR_EXPIRED (restart from the first page).",
          ),
        page_size: o.z
          .number()
          .int()
          .min(1)
          .max(100)
          .optional()
          .describe(
            "Rows per page, default 30. Out-of-range values are rejected with 400, not clamped.",
          ),
        sort: o.z
          .enum(["price_asc", "price_desc", "listed_at_desc"])
          .optional()
          .describe(
            "Row order: price_asc (default, cheapest first), price_desc (dearest first), listed_at_desc (most recently listed first).",
          ),
      }),
      response: o.z.object({
        listings: o.z
          .array(l)
          .describe(
            "The page's listings in the requested sort order. Never an empty stand-in for a failed read: with nothing cached and coin-communities down, or a collection the page reads from in degradedCollections and nothing to serve instead, the route answers 503 (504 on a timeout). Empty with a filter no listing matches (a first page is cached for 30 s).",
          ),
        nextCursor: o.z
          .string()
          .describe("Cursor for the next page; empty on the last page."),
        total: o.z
          .number()
          .int()
          .describe(
            "Rows in the snapshot(s) matching the filter, before paging.",
          ),
        fetchedAtUnixMs: o.z
          .number()
          .describe(
            "Oldest coin-communities read time (Unix epoch milliseconds) among the collections this page drew from: the age of its prices. Stays honest when a stale snapshot is served (up to 5 min old while coin-communities is down).",
          ),
        degradedCollections: o.z
          .array(o.z.string())
          .describe(
            "Allow-listed collection addresses whose snapshot never loaded in coin-communities: absent from listings and total. Empty when every collection loaded.",
          ),
      }),
      emits: ["MARKET_CURSOR_EXPIRED"],
      errors: { 503: !0, 504: !0 },
      cacheTtlSeconds: 30,
    },
  });
};
