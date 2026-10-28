// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.payoutsRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = o.z.object({
      walletAddress: o.z
        .string()
        .describe(
          "Wallet the payout pays — one of the authenticated user's linked wallets",
        ),
      amountUsdc: o.z
        .number()
        .describe(
          "Whole USDC (cc converts from the stored 6-decimal atomic amount)",
        ),
      status: o.z
        .string()
        .describe(
          "cc serves the payout service's lifecycle string verbatim: awaiting_approval, pending, signed, submitted, confirmed, failed, rejected",
        ),
      txSignature: o.z
        .string()
        .nullable()
        .describe(
          "Solana transaction signature; null until the payout has been submitted",
        ),
      createdAt: o.z.string().nullable(),
      kind: o.z
        .string()
        .describe(
          "The payout's class, served verbatim from cc: 'reward' (a callout-reward slice) or 'referral' (a referral commission — the user's share of the slices of the earners they referred, one payout per round). Always the class the request asked for",
        ),
    }),
    i = o.z.object({
      rank: o.z
        .number()
        .describe(
          "1-based rank in the confirmed-total ordering, consistent across pages",
        ),
      userId: o.z
        .string()
        .nullable()
        .describe(
          "Owning user's id (UUID); null when no user row claims the wallet — user-less earners stay visible as bare-wallet rows",
        ),
      username: o.z.string().nullable(),
      profileImageUrl: o.z.string().nullable(),
      isVerified: o.z
        .boolean()
        .describe(
          "Manually-set verified badge; always false on bare-wallet rows",
        ),
      verifiedBadgeVisible: o.z
        .boolean()
        .describe(
          "Badge rendering hint beside isVerified: show the checkmark only when both are true; true on bare-wallet rows",
        ),
      twitterId: o.z.string().nullable(),
      twitterUrl: o.z
        .string()
        .nullable()
        .describe(
          "Rename-stable X profile URL (x.com/i/user/{id}); null when no linked X account",
        ),
      wallets: o.z
        .array(o.z.string())
        .describe(
          "Every wallet the entry's confirmed payouts paid, in sorted order — so an EVM address can come first",
        ),
      totalPaidUsdc: o.z
        .number()
        .describe(
          "Confirmed-only paid total in whole USDC — in-flight/failed/rejected never count",
        ),
      payoutCount: o.z.number(),
      lastPaidAt: o.z.string().nullable(),
      walletAddress: o.z
        .string()
        .nullable()
        .describe(
          "The owning account's canonical Solana wallet; null on bare-wallet and EVM-only rows",
        ),
      resolvedAvatarDecoration: o.z
        .string()
        .nullable()
        .describe(
          "The avatar border the earner's profile resolves to (cc Profile.resolved_avatar_decoration): the equipped achievement key or the rarest earned tier ring; null when none, on bare-wallet rows, and when the profile batch was unavailable",
        ),
      isViewer: o.z
        .boolean()
        .optional()
        .describe(
          "Viewer-relative: present only on a signed-in read, never on the API host",
        ),
      viewerFollows: o.z
        .boolean()
        .nullable()
        .optional()
        .describe(
          "Whether the viewer follows this earner (by userId); false on the viewer's own row, null when unknown or when there is nothing to follow",
        ),
    });
  r.payoutsRoutes = (0, n.defineRoutes)({
    "GET /payouts": {
      summary:
        "The authenticated user's payout history (paged, newest first) plus the confirmed-only USDC total, for ONE class of payout: callout rewards (default) or, with kind=referral, referral commissions",
      query: o.z.object({
        kind: o.z
          .enum(["reward", "referral"])
          .optional()
          .describe(
            "Which class of payouts to serve — 'reward' = callout rewards (the default, byte-identical to omitting it), 'referral' = referral commissions. Rows and totalPaidUsdc both follow it; the two classes never mix",
          ),
        totalsOnly: o.z
          .boolean()
          .optional()
          .describe("Return only the confirmed total, skipping the rows page"),
        page: o.z.number().int().min(0).optional(),
        pageSize: o.z.number().int().min(1).max(200).optional(),
      }),
      response: o.z.object({
        payouts: o.z
          .array(a)
          .describe(
            "Newest first; empty when totalsOnly. One class per read (kind)",
          ),
        totalPaidUsdc: o.z
          .number()
          .describe(
            "Confirmed-only paid USDC of the requested kind across all the user's wallets — in-flight/failed/rejected excluded",
          ),
      }),
    },
    "GET /payouts/leaderboard": (0, s.publicRead)("leaderboards.read", {
      summary:
        "The confirmed-payout leaderboard (top-500 board, paged; all-time or a rolling 1d/1w/1m window via period) plus the in-window earner count. Per-row follow state is viewer-relative: present on a signed-in read, absent on the API host",
      query: o.z.object({
        page: o.z.number().int().min(0).optional(),
        pageSize: o.z.number().int().min(1).max(200).optional(),
        period: o.z
          .enum(["1d", "1w", "1m"])
          .optional()
          .describe("Rolling window cc's boards serve; absent = all-time"),
      }),
      response: o.z.object({
        entries: o.z
          .array(i)
          .describe(
            "Ordered by confirmed total descending, sliced from cc's cached top-500 board — pages past the cap are empty",
          ),
        totalEarners: o.z
          .number()
          .describe(
            "Total distinct earners on the whole board (not capped), independent of the served page",
          ),
        generatedAt: o.z
          .string()
          .nullable()
          .describe(
            "When cc computed the served board (cached; at most ~60s old)",
          ),
      }),
    }),
  });
};
