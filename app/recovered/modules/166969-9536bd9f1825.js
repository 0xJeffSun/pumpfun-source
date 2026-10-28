// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.referralRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = o.z.object({
      userId: o.z
        .string()
        .optional()
        .describe(
          "The referrer's cc user id; absent once their account is deleted",
        ),
      username: o.z
        .string()
        .optional()
        .describe(
          "The referrer's username today; absent when it cannot be read",
        ),
      canonicalSvmWallet: o.z.string().optional(),
      canonicalEvmWallet: o.z.string().optional(),
      appliedUsername: o.z
        .string()
        .describe(
          "The referrer's username at apply time; renames do not update it",
        ),
      referredAt: o.z.string(),
    }),
    a = o.z.object({
      userId: o.z.string().optional(),
      appliedUsername: o.z.string(),
      referredAt: o.z.string(),
    }),
    i = o.z.enum([
      "applied",
      "alreadyReferred",
      "unknownUsername",
      "selfReferral",
      "referrerNotEligible",
      "referrerNotOlder",
      "refereeNotEligible",
      "accountPredatesProgram",
      "applyWindowClosed",
    ]),
    l = o.z.object({
      userId: o.z.string().describe("The referee's cc user id"),
      username: o.z
        .string()
        .describe("The referee's username today (renames show through)"),
      svmWallet: o.z
        .string()
        .optional()
        .describe(
          "The referee's canonical Solana wallet — the avatar seed; absent when they have none",
        ),
      evmWallet: o.z
        .string()
        .optional()
        .describe(
          "The referee's canonical EVM wallet; absent when they have none",
        ),
      referredAt: o.z.string().describe("When the referral was recorded"),
      hasPaidReferrer: o.z
        .boolean()
        .describe(
          "True once this referee's qualifying first deposit has paid the viewer (a landed payout, not a deposit). Per referee this is the same fact paidRefereeCount counts; summed over a full walk it only bounds that count from below",
        ),
      allTimeVolumeUsd: o.z
        .number()
        .optional()
        .describe(
          "The referee's lifetime pump-attributed trading volume in USD, all chains and platforms — the same figure as their profile's trader stats; 0 when they have not traded, absent when the stats read failed open",
        ),
    });
  r.referralRoutes = (0, n.defineRoutes)({
    "GET /referral/me": {
      summary:
        "Referral state of the authenticated user, or of the account named by ?userId (cc user id or wallet): who referred them, whether they can be referred, when their first-deposit-match window ends, and how many accounts they have referred",
      query: o.z.object({
        userId: o.z
          .string()
          .max(64)
          .optional()
          .describe(
            "Read another account instead of the viewer: a cc user id (hyphenated UUID) or a Solana wallet address",
          ),
      }),
      response: o.z.object({
        referrer: s
          .optional()
          .describe("Who referred the viewer; absent when nobody has"),
        eligibleReferee: o.z.boolean(),
        referralWindowEndsAt: o.z
          .string()
          .optional()
          .describe(
            "End of the viewer's 24-hour deposit-match window (account creation + 24h), set even once it closed; absent for an account that never had one. A code can be applied after it, but such a referral earns no first-deposit match",
          ),
        refereeCount: o.z.number(),
        referrerEarningsUsdMicros: o.z
          .number()
          .describe(
            "All-time USDC paid to the viewer as a referrer by the first-deposit match program, in USD micros (USDC base units, 6 decimals; divide by 1e6 for dollars). 0 when nothing has been paid",
          ),
        paidRefereeCount: o.z
          .number()
          .describe(
            "How many referees have made a qualifying first deposit that paid the viewer. Counted from paid payouts, not from the referral edges behind refereeCount, so the two counts are not ordered",
          ),
        calloutReferralEarningsUsdMicros: o.z
          .number()
          .describe(
            "All-time USDC paid to the viewer as a referrer by the callout-rewards referral share — each daily payout round cuts every referred earner's reward slice by a share and pays it to their referrer — in USD micros (6 decimals). A separate program from referrerEarningsUsdMicros; the two are never summed except in totalEarnedUsd. 0 when nothing has been paid",
          ),
        calloutReferralPayoutCount: o.z
          .number()
          .describe(
            "How many daily payout rounds paid the viewer a callout referral commission (one payout per round in which any of their referees earned) — paid rounds, not referees",
          ),
        totalEarnedUsd: o.z
          .number()
          .describe(
            "Lifetime referral earnings in decimal USD for display, e.g. 50 or 12.5: (referrerEarningsUsdMicros + calloutReferralEarningsUsdMicros) / 1e6 — the deposit-match and callout-rewards programs summed. Use the two *UsdMicros fields where the exact integers matter",
          ),
      }),
      emits: ["PROFILE_NOT_MIRRORED"],
    },
    "GET /referral/me/referees": {
      summary:
        "The accounts the authenticated user has referred, newest first, one keyset page at a time: each referee's id, current username, canonical wallets, when they were referred, whether their first deposit has paid the viewer, and their lifetime trading volume. Always self-scoped; there is no ?userId",
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .min(1)
          .max(50)
          .optional()
          .describe("Page size, 1..50; default 50"),
        cursor: o.z
          .string()
          .max(128)
          .optional()
          .describe(
            "Opaque keyset cursor from the previous page's nextCursor; omit for the newest page",
          ),
      }),
      response: o.z.object({
        referees: o.z
          .array(l)
          .describe(
            "Newest referral first; banned referees are included so a full walk matches refereeCount",
          ),
        nextCursor: o.z
          .string()
          .nullable()
          .describe("null when there are no more results"),
      }),
      emits: ["PROFILE_NOT_MIRRORED"],
    },
    "POST /referral/apply": {
      summary:
        "Apply a referral code (the referrer's username) for the authenticated user. Idempotent: a referee who already has a referrer gets 'alreadyReferred' with the stored edge",
      body: o.z.object({
        username: o.z
          .string()
          .max(64)
          .describe(
            "The referrer's username, which is the referral code (matched case-insensitively)",
          ),
      }),
      response: o.z.object({
        outcome: i.describe(
          "What cc decided. Every policy refusal is an outcome on a 200, not an error",
        ),
        referral: a
          .optional()
          .describe(
            "The viewer's referral edge, set for 'applied' and 'alreadyReferred'",
          ),
      }),
      emits: ["PROFILE_NOT_MIRRORED"],
    },
  });
};
