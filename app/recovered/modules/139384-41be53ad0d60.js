// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.coinsGrpcRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(540480),
    a = s.coinMayhemDto.extend({
      mint: o.z
        .string()
        .describe("Which coin the state belongs to, so the row stands alone"),
      multiplayer: o.z
        .boolean()
        .describe(
          "Mayhem Multiplayer (mp_manual): holders above trigger_min_holding may fire the manual trigger, not just the creator.",
        ),
      trigger_min_holding: o.z
        .string()
        .optional()
        .describe(
          "Holder threshold in raw base units (6-decimal mint); present only when multiplayer is true. Gate the trigger button on exactly this value — it is what the server enforces",
        ),
      trigger_cooldown_ms: o.z
        .number()
        .optional()
        .describe(
          "Button-lock window in milliseconds applied when a mayhemTrigger.<mint> event lands; present only when multiplayer is true",
        ),
      unique_triggerers: o.z
        .number()
        .optional()
        .describe(
          'Unique wallets whose triggers were accepted on this coin ("N traders have triggered"). Present only when multiplayer is true and the count is known and > 0 — absence means unknown, not zero; keep the last known value',
        ),
    }),
    i = s.enrichedCoinDto.extend({
      creator: o.z
        .string()
        .describe(
          "Always set on this route: a coin with no known creator is served as the system program address 11111111111111111111111111111111",
        ),
    }),
    l = o.z.object({
      limit: o.z.number(),
      offset: o.z.number(),
      count: o.z.number(),
      coins: o.z.array(s.coinDto),
    });
  r.coinsGrpcRoutes = (0, n.defineRoutes)({
    "GET /coins-v2/{mint}": {
      summary: "Get an enriched coin by mint",
      params: o.z.object({ mint: o.z.string() }),
      query: o.z.object({
        includeLiveStreamInfo: o.z
          .boolean()
          .optional()
          .describe("Defaults to true"),
      }),
      response: s.coinDto,
      emits: ["COIN_BLOCKED"],
    },
    "GET /coins-v2/{mint}/mayhem-state": {
      summary: "Get the mayhem-mode state for a coin",
      params: o.z.object({ mint: o.z.string() }),
      response: a
        .nullable()
        .describe(
          "Null (with a 200) when the mint has no mayhem_coin_state row or coin-service answers NOT_FOUND / INVALID_ARGUMENT for it; any other upstream failure is a 5xx, never null",
        ),
    },
    "POST /coins-v2/mints": {
      summary: "Get enriched coins by mint addresses",
      body: s.getCoinsByMintsBody,
      response: o.z
        .array(i)
        .describe(
          "A mint the coin registry cannot hydrate is dropped. followed_holders is attached to every row or to none, decided by includeFollowedHolders; the schema is one notch wider than the wire because that correlation is a fact about the request",
        ),
    },
    "GET /coins-v2/user-created-coins/{creator}": {
      summary: "Get coins created by an address",
      params: o.z.object({ creator: o.z.string() }),
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .optional()
          .describe("Default 50, capped at 50"),
        offset: o.z
          .number()
          .int()
          .optional()
          .describe("Default 0; past 200 the page is empty"),
        includeNsfw: o.z.boolean().optional().describe("Defaults to false"),
      }),
      response: l,
    },
  });
};
