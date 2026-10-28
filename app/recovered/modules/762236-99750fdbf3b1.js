// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.gachaInventoryRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(617159),
    a = o.z
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
    i = o.z.object({
      pack_type: o.z
        .string()
        .describe(
          "Collector Crypt's machine code (e.g. pokemon_25): the pack_type blockchain-api-service's cc-pack-machines lists and cc-pack-build takes. Join on it.",
        ),
      level: (0, s.openEnum)(
        ["healthy", "low", "empty"],
        "healthy = comfortably stocked; low = still selling, near the cutoff (warn); empty = not selling, a build is refused (grey out). coin-communities owns the set: read any other value as healthy",
      ),
      stock: a,
      low_threshold: o.z
        .number()
        .int()
        .nullable()
        .describe(
          "The common-tier count below which Collector Crypt stops selling the machine; null when it reports none (the level then reads the stock alone).",
        ),
    });
  r.gachaInventoryRoutes = (0, n.defineRoutes)({
    "GET /gacha-inventory": {
      summary:
        "Get the inventory level and per-tier stock of every Collector Crypt pack machine",
      response: o.z.object({
        machines: o.z
          .array(i)
          .describe(
            "Every machine in Collector Crypt's list, in its order. Never an empty stand-in for a failed read: with nothing cached and coin-communities down the route answers 503 (504 on a timeout).",
          ),
        fetched_at: o.z
          .number()
          .describe(
            "Unix epoch milliseconds at which coin-communities read the list from Collector Crypt: the age of the levels, also when served from a stale snapshot (up to 5 min old while coin-communities is down).",
          ),
      }),
      errors: { 503: !0, 504: !0 },
      cacheTtlSeconds: 30,
    },
  });
};
