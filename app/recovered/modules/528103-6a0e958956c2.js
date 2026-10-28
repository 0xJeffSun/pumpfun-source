// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.packsRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(617159),
    a = e.r(983689),
    i = (0, s.openEnum)(
      ["collector_crypt", "phygitals"],
      "The vendor behind a pack: collector_crypt (gacha.collectorcrypt.com, ids prefixed cc:), phygitals (api.phygitals.com, ids prefixed phy:). coin-communities owns the set: treat any other value as a provider the app cannot buy from",
    ),
    l = o.z
      .object({
        common: o.z
          .number()
          .int()
          .describe(
            "Common-tier cards left: the tier `low_threshold` applies to.",
          ),
        uncommon: o.z.number().int().describe("Uncommon-tier cards left."),
        rare: o.z.number().int().describe("Rare-tier cards left."),
        epic: o.z.number().int().describe("Epic-tier cards left."),
      })
      .describe(
        "Cards left per rarity tier, as Collector Crypt reports them (0 for a tier it omits).",
      ),
    d = o.z.object({
      name: o.z
        .string()
        .describe("The provider's tier name (common, chase, S, ...)."),
      rank: o.z
        .number()
        .int()
        .describe(
          "Position from best (0) to worst, as the provider orders them.",
        ),
      weight_pct: o.z
        .number()
        .describe("Chance of landing in this tier, in percent (0..100)."),
      value_low_usd: o.z
        .number()
        .describe(
          "Lowest card value in the tier, USD, on the pack's value_basis.",
        ),
      value_high_usd: o.z
        .number()
        .nullable()
        .describe(
          "Highest card value in the tier, USD; null when the tier is open-ended.",
        ),
      stock: o.z
        .number()
        .int()
        .nullable()
        .describe(
          "Cards left in the tier; null when the provider publishes no per-tier counts.",
        ),
    }),
    c = o.z
      .object({
        multi_pull: o.z
          .boolean()
          .describe("More than one pull per transaction (max_per_pull > 1)."),
        turbo: o.z
          .boolean()
          .describe("Collector Crypt Turbo (chained single pulls)."),
        inventory_preview: o.z
          .boolean()
          .describe(
            "A live list of the cards still in the pack (Collector Crypt getNfts).",
          ),
        chase_preview: o.z
          .boolean()
          .describe("A chase-card preview (Phygitals vm/chase)."),
        ship: o.z
          .boolean()
          .describe("The physical card can be shipped home through our flow."),
        market_list: o.z
          .boolean()
          .describe(
            "Pulled cards can be listed on a marketplace through our flow.",
          ),
        market_buy: o.z
          .boolean()
          .describe(
            "Listed cards of this provider can be bought through our flow.",
          ),
      })
      .describe(
        "Which optional surfaces the pack supports; every flag false unless the provider offers it.",
      ),
    u = o.z.object({
      id: o.z
        .string()
        .describe(
          "Stable id the app buys with: <prefix>:<provider_pack_id>, e.g. cc:pokemon_25, phy:rookie-pack. Never empty.",
        ),
      provider: i,
      provider_pack_id: o.z
        .string()
        .describe(
          "The provider's own key: Collector Crypt's pack_type (the cc-pack-machines join key), Phygitals' claw id (a mint address).",
        ),
      slug: o.z
        .string()
        .describe(
          "Human key for covers and deep links: Collector Crypt's pack_type, Phygitals' slug.",
        ),
      name: o.z.string().describe("Display name as the provider gives it."),
      category: o.z
        .string()
        .describe(
          "Normalised category slug (pokemon, one_piece, sports, watch, riftbound, dragon_ball, yugioh, other).",
        ),
      tier_usd: o.z
        .number()
        .int()
        .describe(
          "The price bucket the tier router keys on: the price rounded to whole USD.",
        ),
      price_usdc: o.z
        .string()
        .describe(
          'Exact price in USDC as a 6-decimal string, e.g. "25.000000".',
        ),
      price_units: o.z
        .string()
        .describe(
          'The same price in USDC base units (6 decimals) as a decimal string, e.g. "25000000": a uint64 the buy transaction takes verbatim, so it never rounds through a double.',
        ),
      ev_usd: o.z
        .number()
        .nullable()
        .describe(
          "Expected value per pull in USD on value_basis; null when the provider publishes none.",
        ),
      value_basis: (0, s.openEnum)(
        ["insured_value", "provider_fmv"],
        "What ev_usd and the odds tiers are quoted against: insured_value = the insured value of the vaulted card (Collector Crypt); provider_fmv = the provider's own fair-market-value estimate (Phygitals). A label, never compared across providers; coin-communities owns the set",
      ),
      buyback_pct: o.z
        .number()
        .nullable()
        .describe(
          "Instant buyback as a fraction of the card's value (0..1); null when the provider publishes none.",
        ),
      buyback_window_s: o.z
        .number()
        .int()
        .nullable()
        .describe(
          "How long after the pull the buyback offer stands, in seconds; null when set per card at pull time (Phygitals).",
        ),
      odds: o.z
        .array(d)
        .describe("The rarity / value tiers a pull can land in, best first."),
      availability: (0, s.openEnum)(
        ["in_stock", "low", "sold_out", "closed"],
        "Whether the pack can be bought right now: in_stock; low = buyable but near the provider's cutoff (warn); sold_out = no stock; closed = the provider switched it off (never an alternate). coin-communities owns the set: treat any other value as sold_out",
      ),
      max_per_pull: o.z
        .number()
        .int()
        .describe(
          "Packs one transaction may buy: 1 for Collector Crypt, Phygitals' max_per_mint.",
        ),
      capabilities: c,
      image_url: o.z
        .string()
        .describe("Our cover art URL; empty when we have none."),
      provider_image_url: o.z
        .string()
        .describe(
          "The provider's own image URL; empty when it publishes none.",
        ),
      partner_fee_usd: o.z
        .number()
        .nullable()
        .describe(
          "Collector Crypt adopted machines only: the per-pack fee it carves out for us, in USD; null otherwise.",
        ),
      fetched_at: o.z
        .number()
        .describe(
          "Unix epoch milliseconds at which coin-communities read this pack's provider catalog: the age of its price and stock, also when served from a stale snapshot.",
        ),
      stock: l
        .nullable()
        .describe(
          "Collector Crypt only: cards left per rarity tier; null for a provider that publishes no per-tier counts.",
        ),
      low_threshold: o.z
        .number()
        .int()
        .nullable()
        .describe(
          "Collector Crypt only: the common-tier count below which it stops selling the machine; null otherwise.",
        ),
      popularity: o.z
        .number()
        .int()
        .describe(
          "A popularity signal for sorting (Phygitals: pulls in the last 7 days); 0 when the provider publishes none.",
        ),
    }),
    h = o.z.object({
      category: o.z.string().describe("Normalised category slug."),
      tier_usd: o.z.number().int().describe("The price tier in whole USD."),
      primary: u.describe(
        "The pack the slot shows: the first in-stock pack in preference order, or, when nothing is in stock, the preferred pack flagged sold_out or closed so the app can grey it out as restocking.",
      ),
      alternates: o.z
        .array(u)
        .describe(
          "The other in-stock packs at this price, in preference order (never a closed pack).",
        ),
      all_sold_out: o.z
        .boolean()
        .describe(
          "True when no provider has stock at this price: primary is not buyable and alternates is empty.",
        ),
    }),
    m = a.collectibleDto.extend({
      grader: o.z
        .string()
        .nullable()
        .describe(
          "Grading company alone (PSA, BGS, CGC); null for a raw card.",
        ),
      gradeValue: o.z
        .string()
        .nullable()
        .describe('The grade as a number ("10", "9.5"); null for a raw card.'),
      cardName: o.z
        .string()
        .nullable()
        .describe(
          'The card\'s own name ("Michael Jordan") when the metadata carries one; name holds the full slab title.',
        ),
      year: o.z
        .string()
        .nullable()
        .describe('The set\'s year ("2008") when the metadata carries one.'),
      category: o.z
        .string()
        .nullable()
        .describe(
          "Normalised category slug (pokemon, one_piece, sports, watch, riftbound, dragon_ball, yugioh, other).",
        ),
      certNumber: o.z
        .string()
        .nullable()
        .describe(
          "The grading company's certificate number; null for a raw card.",
        ),
    });
  r.packsRoutes = (0, n.defineRoutes)({
    "GET /packs": {
      summary:
        "Get the merged pack catalog across every pack provider and the tier slots the hub shows",
      query: o.z.object({
        category: o.z
          .string()
          .regex(/^[a-z0-9_]{1,32}$/)
          .optional()
          .describe(
            "Restrict to one normalised category slug (pokemon, one_piece, sports, watch, riftbound, dragon_ball, yugioh, other; coin-communities owns the set). Omit for every category. An unknown slug answers empty packs and tiers, not 404; anything but a lowercase slug of up to 32 characters is a 400.",
          ),
      }),
      response: o.z.object({
        packs: o.z
          .array(u)
          .describe(
            "Every servable pack from every loaded provider, in catalog order (provider, then the provider's own order). Never an empty stand-in for a failed read: with nothing cached and coin-communities down the route answers 503 (504 on a timeout). Empty with a category no pack carries.",
          ),
        tiers: o.z
          .array(h)
          .describe(
            "The tier router's output over packs: one slot per (category, price tier), sorted by category then tier_usd ascending.",
          ),
        fetched_at: o.z
          .record(o.z.string(), o.z.number())
          .describe(
            "Unix epoch milliseconds at which coin-communities last read each loaded provider's catalog, keyed by provider name (collector_crypt, phygitals). A provider absent here never loaded: see degraded. Stays honest when a stale snapshot is served (up to 5 min old while coin-communities is down).",
          ),
        degraded: o.z
          .array(i)
          .describe(
            "Providers whose catalog never loaded in coin-communities: absent from packs and tiers, so their slots fell through to the next provider. Empty when every provider loaded.",
          ),
      }),
      errors: { 503: !0, 504: !0 },
      cacheTtlSeconds: 30,
    },
    "GET /packs/holdings": {
      summary:
        "Get the Phygitals cards a wallet holds, each with a USD mark off the live marketplace listings",
      query: o.z.object({
        wallet: o.z
          .string()
          .regex(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/)
          .describe(
            "The owner wallet, a base58 Solana address; anything else is a 400.",
          ),
      }),
      response: o.z.object({
        holdings: o.z
          .array(m)
          .describe(
            "The wallet's Phygitals cards (the Metaplex Core assets in Phygitals' collection it owns, read off the chain by coin-communities), dearest mark first, unpriced last. Each row is the collectible card block: markUsd / markSource / markAsOf carry the mark (listing = the card's own live asking price; fmv = the cheapest live listing of the same card name at the same grade, an estimate; null = unpriced), status is listed while the card's own listing is live, else held. Neither the pack the card came from nor its rarity is on chain, so no row carries them. Empty for a wallet holding no card. Never an empty stand-in for a failed read: with nothing cached and coin-communities down the route answers 503 (504 on a timeout).",
          ),
        fetched_at: o.z
          .number()
          .describe(
            "Unix epoch milliseconds at which coin-communities read the wallet's cards off the chain: the age of the holdings, also when served from a stale snapshot.",
          ),
        listings_fetched_at: o.z
          .number()
          .describe(
            "Unix epoch milliseconds at which coin-communities read the marketplace snapshot the marks came from; 0 when none was loaded (see marks_degraded).",
          ),
        marks_degraded: o.z
          .boolean()
          .describe(
            "True when coin-communities had no marketplace snapshot to mark against, so every row is unpriced; the holdings themselves are complete.",
          ),
      }),
      errors: { 503: !0, 504: !0 },
      cacheTtlSeconds: 60,
    },
  });
};
