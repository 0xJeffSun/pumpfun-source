// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.mayhemApiRoutes = r.mayhemCommandReply = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = e.r(617159),
    i = o.z.enum(["24h", "7d"]),
    l = o.z.object({ "24h": o.z.number(), "7d": o.z.number() }),
    d = o.z.object({
      rank: o.z.number().int().min(1),
      mint: o.z.string(),
      netUsdDeployed: o.z
        .number()
        .describe("Signed buys - sells in USD; positive = net inflow"),
    }),
    c = o.z.object({
      rank: o.z.number().int().min(1),
      address: o.z.string(),
      realisedPnlUsd: o.z.number(),
      winRate: o.z.number().min(0).max(1),
      volumeUsd: o.z.number(),
      tradeCount: o.z.number().int().min(0),
    });
  r.mayhemCommandReply = o.z.object({
    ok: o.z.boolean(),
    reason: o.z
      .string()
      .optional()
      .describe(
        "Reject reason from the mayhem service, an upstream-owned open set: treat unknown values as a generic rejection. Known values: invalid_request, rate_limited, position_not_found, terminated, not_manual_mode, trade_in_flight, low_sol_reserves, low_stable_reserves, unprofitable_fees, below_market_cap_floor, below_initial_buy_floor, invalid_mode, feature_disabled (surface as a temporarily-disabled banner), internal_error. below_initial_buy_floor and low_stable_reserves both appeared on the wire before they were listed (TASK-4734)",
      ),
    state: o.z
      .object({
        mode: (0, a.openEnum)(
          ["auto", "manual"],
          "Mode reported by the mayhem service, an upstream-owned open set (TASK-4734)",
        ).optional(),
      })
      .optional()
      .describe("Post-success state snapshot for set_mode"),
    retryAfterSec: o.z.number().optional(),
  });
  let u = o.z.object({ mint: o.z.string() });
  r.mayhemApiRoutes = (0, n.defineRoutes)({
    "GET /mayhem/overview": {
      summary: "Get mayhem landing-page overview tiles",
      response: o.z.object({
        activeCoins: o.z
          .number()
          .describe(
            "Live coin-service count of coins in mayhem 'active' state",
          ),
        agentVolumeUsd: l.nullable(),
        distinctTraders: l.nullable(),
        coinsCreated: l.nullable(),
        coinsCreatedByMode: o.z
          .object({ auto: l, manual: l, party: l.optional() })
          .nullable()
          .describe(
            "Disjoint buckets: party is manual-mode-with-multiplayer, manual is manual minus party, so auto + manual + party <= coinsCreated: coins with no mayhem_coin_state row are only in the total",
          ),
        updatedAt: o.z
          .number()
          .nullable()
          .describe("Null on a cold start or a Redis flush"),
      }),
    },
    "GET /mayhem/top-coins": {
      summary: "Get top mayhem coins",
      query: o.z.object({
        window: o.z
          .string()
          .optional()
          .describe("Defaults to 24h when absent or empty; only '24h' or '7d'"),
      }),
      response: o.z.object({
        window: i,
        items: o.z.array(d),
        updatedAt: o.z.number().nullable(),
      }),
    },
    "GET /mayhem/top-traders": {
      summary: "Get top mayhem traders",
      query: o.z.object({
        window: o.z
          .string()
          .optional()
          .describe("Defaults to 24h when absent or empty; only '24h' or '7d'"),
      }),
      response: o.z.object({
        window: i,
        items: o.z.array(c),
        updatedAt: o.z.number().nullable(),
      }),
    },
    "GET /mayhem/{mint}/top-traders": (0, s.publicRead)("leaderboards.read", {
      summary: "Get the trader leaderboard for a mayhem coin",
      params: u,
      response: o.z.object({
        mint: o.z.string(),
        updatedAt: o.z
          .number()
          .describe("Epoch ms when this snapshot was taken"),
        traders: o.z.array(
          o.z.object({
            rank: o.z.number(),
            address: o.z.string(),
            username: o.z.string().nullable(),
            profileImage: o.z.string().nullable(),
            realisedPnlUsd: o.z.number(),
            averageEntryMarketCapUsd: o.z.number().nullable(),
            averageExitMarketCapUsd: o.z.number().nullable(),
            totalBoughtUsd: o.z.number(),
            totalSoldUsd: o.z.number(),
            buyTransactionCount: o.z.number(),
            sellTransactionCount: o.z.number(),
            tokenBalance: o.z
              .string()
              .describe(
                "Raw token amount as a string (may exceed Number.MAX_SAFE_INTEGER)",
              ),
            tokenAmountBought: o.z.number(),
            tokenAmountSold: o.z.number(),
            lastActivityAt: o.z.number().describe("Epoch seconds"),
          }),
        ),
      }),
    }),
    "POST /mayhem/{mint}/mode": {
      summary: "Toggle a coin between auto and manual mayhem mode",
      params: u,
      body: o.z.object({
        mode: o.z.enum(["auto", "manual"]),
        multiplayer: o.z
          .boolean()
          .optional()
          .describe(
            "Mayhem Multiplayer opt-in (mp_manual): only accepted as true, only with mode manual, recorded once at coin creation. false is rejected — there is no opt-out in v1",
          ),
      }),
      response: r.mayhemCommandReply,
    },
    "POST /mayhem/{mint}/emote": {
      summary: "Send a party emote on a multiplayer mayhem coin",
      params: u,
      body: o.z.object({
        emoji: o.z
          .enum(["🚀", "🔥", "📈", "😂", "💀"])
          .describe(
            "One of the party emote set, sent as the raw emoji; anything else is rejected",
          ),
        client_emote_id: o.z
          .string()
          .max(64)
          .optional()
          .describe(
            "Client-minted id echoed verbatim on the mayhemEmote.<mint> broadcast so the sender can skip its own echo after floating the emote optimistically",
          ),
      }),
      response: o.z.object({
        ok: o.z.boolean(),
        reason: o.z
          .enum(["run_not_active", "publish_failed"])
          .optional()
          .describe(
            "Present only when ok is false: run_not_active = the coin is a party coin whose run is paused or completed (nobody can emote); publish_failed = the emote passed every gate but the broadcast did not go out. Eligibility and budget refusals are 403 below_threshold / 429 rate_limited bodies, party-ness a bare 404, like trigger-trade",
          ),
      }),
    },
    "POST /mayhem/{mint}/trigger-trade": {
      summary: "Trigger a single manual mayhem trade for a coin",
      params: u,
      response: r.mayhemCommandReply,
    },
  });
};
