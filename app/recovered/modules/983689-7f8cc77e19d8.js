// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.collectibleDto =
      r.collectibleLeg =
      r.COLLECTIBLE_LEGS =
      r.COLLECTIBLE_MARKETPLACES =
      r.COLLECTIBLE_STATUSES =
      r.COLLECTIBLE_PROVIDERS =
        void 0));
  let o = e.r(876543),
    n = e.r(617159);
  ((r.COLLECTIBLE_PROVIDERS = ["collector_crypt", "phygitals"]),
    (r.COLLECTIBLE_STATUSES = [
      "held",
      "listed",
      "bought_back",
      "sold",
      "redeemed",
      "seized",
      "burned",
      "inventory",
    ]),
    (r.COLLECTIBLE_MARKETPLACES = [
      "collector_crypt",
      "magic_eden",
      "tensor",
      "phygitals",
    ]),
    (r.COLLECTIBLE_LEGS = [
      "pull",
      "buyback",
      "market_buy",
      "market_sale",
      "gift",
      "transfer",
      "redeem",
      "seize",
      "burn",
    ]),
    (r.collectibleLeg = (0, n.openEnum)(
      r.COLLECTIBLE_LEGS,
      "Which collectible leg produced this row (cc's ledger leg_role); absent on every token row, so a client that ignores it labels the row by its BUY/SELL/SEND/RECEIVE type",
    )));
  let s = o.z.object({
    priceUsd: o.z.number().nullable(),
    marketplace: (0, n.openEnum)(
      r.COLLECTIBLE_MARKETPLACES,
      "Marketplace the card is listed on",
    ).nullable(),
    listedAt: o.z
      .string()
      .nullable()
      .describe("ISO instant the listing opened"),
  });
  r.collectibleDto = o.z.object({
    assetId: o.z
      .string()
      .describe("The card's Metaplex Core asset id or pNFT mint"),
    provider: (0, n.openEnum)(
      r.COLLECTIBLE_PROVIDERS,
      "Card provider",
    ).nullable(),
    status: (0, n.openEnum)(
      r.COLLECTIBLE_STATUSES,
      "Lifecycle state of the card; listed while a marketplace listing is live",
    ).nullable(),
    name: o.z.string().nullable().describe("Card name"),
    imageUrl: o.z.string().nullable(),
    grade: o.z
      .string()
      .nullable()
      .describe(
        "Grading company and grade as one label (PSA 10); null ungraded",
      ),
    setName: o.z.string().nullable(),
    markUsd: o.z
      .number()
      .nullable()
      .describe(
        "The PnL mark the row's tokenPriceUsd and valueUsd rest on; null = unpriced",
      ),
    markSource: o.z
      .string()
      .nullable()
      .describe(
        "Price source the mark was picked from (buyback, standing_bid, fmv, listing, ...); null when unpriced",
      ),
    markAsOf: o.z
      .string()
      .nullable()
      .describe("ISO instant the mark was observed"),
    insuredValueUsd: o.z
      .number()
      .nullable()
      .describe("Provider insured value; display only, never the mark"),
    insuredAsOf: o.z.string().nullable(),
    buybackValueUsd: o.z
      .number()
      .nullable()
      .describe("The provider's current buyback quote; null when none stands"),
    buybackExpiresAt: o.z
      .string()
      .nullable()
      .describe("ISO instant the buyback quote lapses; null = no expiry"),
    listing: s
      .nullable()
      .describe("Live marketplace listing; null when not listed"),
  });
};
