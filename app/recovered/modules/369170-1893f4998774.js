// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.mayhemPartnerRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(617159),
    a = e.r(540480),
    i = e.r(776133),
    l = o.z.object({ mint: o.z.string() }),
    d = o.z
      .string()
      .regex(/^[1-9A-HJ-NP-Za-km-z]{32,44}$/)
      .describe("A base58 Solana address"),
    c = o.z
      .object({
        ok: o.z.literal(!1),
        reason: o.z.literal("below_threshold"),
        min_holding: o.z
          .string()
          .describe("The threshold in raw base units of a 6-decimal mint"),
        balance: o.z.string().describe("The live balance read, raw base units"),
      })
      .describe("The wallet holds less than the threshold on a Party coin"),
    u = o.z
      .object({
        ok: o.z.literal(!1),
        reason: o.z.literal("trigger_in_progress"),
      })
      .describe(
        "Another holder's trigger holds the per-mint lock; retry after the cooldown",
      ),
    h = o.z.object({ message: o.z.string() });
  r.mayhemPartnerRoutes = (0, n.defineRoutes)({
    "POST /mayhem/partner/{mint}/trigger": {
      summary:
        "Trigger a manual Mayhem trade for a coin as the wallet the partner asserts",
      params: l,
      body: o.z.object({
        wallet: d.describe(
          "The wallet the trigger acts for (base58), asserted by a partner that has authenticated its user and verified ownership under its custody",
        ),
        request_id: o.z
          .string()
          .min(1)
          .max(64)
          .regex(/^[A-Za-z0-9._:-]+$/)
          .describe(
            "Partner-minted id of this trigger, echoed on the reply and carried on the audit line; a retry of the same trigger reuses it",
          ),
      }),
      response: i.mayhemCommandReply.extend({
        request_id: o.z
          .string()
          .describe("The request_id the partner sent, echoed"),
        role: o.z
          .enum(["creator", "holder"])
          .describe(
            "The lane that admitted the wallet: the coin creator, or a holder at or above the served threshold on a Party coin",
          ),
      }),
      emits: ["PARTNER_KEY_INVALID", "PARTNER_RATE_LIMITED"],
      errors: {
        403: c,
        404: h.describe(
          "Unknown coin, or a non-creator on a coin that is not a Party coin: identical bodies, like the legacy route",
        ),
        409: u,
        503: !0,
        504: !0,
      },
    },
    "GET /mayhem/partner/{mint}/eligibility": {
      summary:
        "Read a wallet's trigger eligibility on a coin and the served re-activation rule",
      params: l,
      query: o.z.object({
        wallet: d
          .max(44)
          .describe(
            "The wallet to answer for (base58); no signature or session",
          ),
      }),
      response: o.z.object({
        eligible: o.z
          .boolean()
          .describe(
            "Whether this wallet holds a lane to trigger the coin (creator, or a holder at or above the threshold on a Party coin). Says nothing about the run: coin.state tells whether a trigger lands now",
          ),
        role: o.z.enum(["creator", "holder", "none"]),
        reason: o.z
          .enum(["not_party", "below_threshold"])
          .nullable()
          .describe(
            "Why role is none: not_party = only the creator can trigger this coin (no Party opt-in or not in manual mode); below_threshold = the live balance is under threshold. Null when eligible",
          ),
        threshold: o.z
          .string()
          .describe(
            "Holder threshold in raw base units of a 6-decimal mint; the value the trigger enforces",
          ),
        balance: o.z
          .string()
          .optional()
          .describe(
            "The live balance read for a non-creator on a Party coin, raw base units; absent when no balance was read",
          ),
        coin: o.z.object({
          state: (0, s.openEnum)(
            a.MAYHEM_STATES,
            "Mayhem lifecycle state as coin-service serves it, an upstream-owned open set",
          )
            .nullable()
            .describe("Null when the row carries none"),
          pause_reason: (0, s.openEnum)(
            a.MAYHEM_PAUSE_REASONS,
            "Why the coin is paused, an upstream-owned open set",
          )
            .nullable()
            .describe("Null unless state is paused"),
          reactivation_min_buy: o.z
            .string()
            .nullable()
            .describe(
              "The buy that re-activates the coin, as a decimal integer in the coin's quote currency scaled by 10^9 (lamports for a SOL-quoted coin), the same number the web computes; null while the coin is not paused or when reactivation_rule_inputs_missing is true",
            ),
          reactivation_rule_inputs_missing: o.z
            .boolean()
            .describe(
              "True when the rule needed the coin's first trade and swap-api did not serve it within the deadline; retry later",
            ),
        }),
      }),
      emits: ["PARTNER_KEY_INVALID", "PARTNER_RATE_LIMITED"],
      errors: {
        404: h.describe(
          "Unknown coin, or a coin that has never been in Mayhem",
        ),
        503: !0,
      },
    },
  });
};
