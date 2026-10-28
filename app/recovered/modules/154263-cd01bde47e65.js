// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.pnlLeaderboardRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = e.r(421504),
    i = e.r(540480),
    l = e.r(882668),
    d = e.r(890664),
    c = o.z.enum(["daily", "weekly", "monthly"]),
    u = o.z.object({
      tx: o.z
        .string()
        .describe(
          "Transaction signature — not unique by itself: each fill of a multi-fill transaction is its own row",
        ),
      isBuy: o.z.boolean(),
      timestamp: o.z.string().nullable(),
      amountUsd: o.z.number().nullable(),
      baseAmount: o.z
        .number()
        .nullable()
        .describe("Token amount in UI units (decimals applied)"),
      priceUsd: o.z.number().nullable(),
      mint: o.z.string(),
      chainId: o.z.number(),
      walletAddress: o.z
        .string()
        .describe(
          "Always base58: an SVM fill carries the wallet that filled (one of its trader's tradingWallets, not necessarily the board wallet); an EVM fill is served under its trader's board wallet — an EVM wallet never reaches a client",
        ),
      userId: o.z
        .string()
        .describe(
          "Joins traders; every wallet here belongs to a registered cc account",
        ),
      slotIndexId: o.z
        .string()
        .describe(
          "26-digit zero-padded chain-ordered id — the row's stable identity and same-second tiebreak",
        ),
      amountSol: o.z
        .number()
        .nullable()
        .describe(
          "Native-currency notional of the fill; null when the source carries none",
        ),
    }),
    h = o.z.object({
      userId: o.z.string(),
      walletAddress: o.z.string().describe("The wallet ranked on the board(s)"),
      username: o.z
        .string()
        .nullable()
        .describe("Null when cc holds no profile row for the account"),
      profileImage: o.z.string().nullable(),
      isVerified: o.z.boolean(),
      verifiedBadgeVisible: o.z
        .boolean()
        .describe(
          "Badge rendering hint beside isVerified: show the checkmark only when both are true",
        ),
      resolvedAvatarDecoration: o.z
        .string()
        .nullable()
        .describe(
          "The border a viewer draws on the avatar, resolved by cc against the owner's unlocks (TASK-6093); null = no border, or no cc profile",
        ),
      bestRank: o.z
        .number()
        .describe("Best (lowest) rank across the boards the wallet appears on"),
      periods: o.z
        .array(c)
        .describe("Boards (top 50) the wallet ranks on, in period order"),
      tradingWallets: o.z
        .array(o.z.string())
        .describe(
          "The distinct walletAddress values of this trader's served rows, sorted (all base58)",
        ),
      tradeCount: o.z.number(),
    }),
    m = o.z.enum(["realized", "unrealized", "combined"]),
    p = o.z
      .union([o.z.literal(0), o.z.literal(1), o.z.literal(2), o.z.literal(3)])
      .describe(
        "Numeric period (inherited from the retired admin-service proto): 0 unspecified, 1 weekly, 2 monthly, 3 daily",
      ),
    b = o.z.object({
      rank: o.z.number(),
      pnlSol: o.z.number(),
      pnlUsd: o.z.number(),
      pnlPercent: o.z.number(),
      buySpendSol: o.z.number(),
      lastRefreshedAtMs: o.z.number(),
      realizedPnlSol: o.z.number(),
      realizedPnlUsd: o.z.number(),
      unrealizedPnlSol: o.z.number(),
      unrealizedPnlUsd: o.z.number(),
      positionsCount: o.z
        .number()
        .describe(
          "The row's whole holdings count, never sliced by positionsLimit",
        ),
      topPositions: o.z
        .array(l.pnlBoardTopPosition)
        .describe("Largest fresh USD value first, sliced to positionsLimit"),
    }),
    g = b.extend({
      walletAddress: o.z.string(),
      username: o.z.string().nullable(),
      profileImage: o.z.string().nullable(),
      xUsername: o.z.string().nullable(),
      isVerified: o.z.boolean(),
      verifiedBadgeVisible: o.z
        .boolean()
        .describe(
          "Badge rendering hint beside isVerified: show the checkmark only when both are true",
        ),
      resolvedAvatarDecoration: o.z
        .string()
        .nullable()
        .describe(
          "The border a viewer draws on the avatar, resolved by cc against the owner's unlocks (TASK-6093); null = no border, or no cc profile",
        ),
      userId: o.z
        .string()
        .nullable()
        .describe("cc user id; null when the profile lookup missed"),
    }),
    w = g.extend(l.viewerFollowFields),
    y = o.z.object({
      found: o.z.boolean(),
      projectedRank: o.z.number(),
      onBoard: o.z.boolean(),
      approximate: o.z.boolean(),
      entry: g.optional(),
      totalRanked: o.z.number(),
      periodLabel: o.z.string(),
      windowStartSec: o.z.number(),
    }),
    f = o.z
      .number()
      .int()
      .min(0)
      .optional()
      .describe(
        "Top positions returned per row as icons (default 3; values above 5 clamp to 5; 0 = count only).",
      ),
    z = o.z.object({
      rank: o.z.number(),
      walletAddress: o.z.string(),
      coinMint: o.z.string(),
      pnlUsd: o.z.number().nullable(),
      pnlPercentage: o.z.number().nullable(),
      amountHeld: o.z.number().nullable(),
      isExited: o.z.boolean().nullable(),
      costBasisAmount: o.z.number().nullable(),
      costBasisUsd: o.z.number().nullable(),
      amountBoughtUsd: o.z.number().nullable(),
      receiptBasisUsd: o.z.number().nullable(),
      amountBought: o.z.number().nullable(),
      realizedPnlUsd: o.z
        .number()
        .nullable()
        .describe("Raw stored realized leg, NOT transfer-adjusted"),
      avgEntryMcapUsd: o.z.number().nullable(),
      callout: a.calloutDto.describe(
        "Never null — a row without a callout is dropped from the board",
      ),
      leaderboardPnlUsd: o.z.number(),
      heldValueSol: o.z.number(),
      valueUsd: o.z.number().nullable(),
      lastRefreshedAtMs: o.z.number(),
      username: o.z.string().nullable().optional(),
      profileImage: o.z.string().nullable().optional(),
      xUsername: o.z.string().nullable().optional(),
      isVerified: o.z.boolean().optional(),
      verifiedBadgeVisible: o.z
        .boolean()
        .optional()
        .describe(
          "Badge rendering hint beside isVerified: show the checkmark only when both are true",
        ),
      resolvedAvatarDecoration: o.z
        .string()
        .nullable()
        .optional()
        .describe(
          "The border a viewer draws on the avatar, resolved by cc against the owner's unlocks (TASK-6093); null = no border, or no cc profile",
        ),
      userId: o.z
        .string()
        .nullable()
        .optional()
        .describe(
          "Profile fields are present only when the board had at least one wallet to enrich",
        ),
      followedHolders: i.coinFollowedHoldersDto
        .nullable()
        .optional()
        .describe(
          "Present only when the request opted in via includeFollowedHolders; null when there is no viewer or the overlay degraded",
        ),
      ...l.viewerFollowFields,
    });
  r.pnlLeaderboardRoutes = (0, n.defineRoutes)({
    "GET /pnl-leaderboard": (0, s.publicRead)("leaderboards.read", {
      summary:
        "Get the PNL leaderboard for a period. `viewer` (the caller's own rank off the same board snapshot) is viewer-relative: present on a signed-in read, absent on the API host",
      query: o.z.object({
        period: c,
        sort: m.optional(),
        positionsLimit: f,
        limit: o.z
          .number()
          .int()
          .optional()
          .describe("Rows served; default and ceiling 100"),
      }),
      response: o.z.object({
        entries: o.z.array(w),
        periodType: p,
        periodLabel: o.z.string(),
        windowStartSec: o.z.number(),
        viewer: y
          .optional()
          .describe(
            "The caller's own rank, checked against this same board snapshot (a row the board lists wins). Viewer-relative: present only on a signed-in read (an invalid token reads as anonymous); the key is omitted, never null, on an anonymous read and on the API host. When cc is slow or down it may be the caller's last computed block (at most 300 s old) or found: false, but it is never dropped",
          ),
      }),
    }),
    "GET /pnl-leaderboard/groups": (0, s.publicRead)("leaderboards.read", {
      summary: "Get the group PNL leaderboard for a period",
      query: o.z.object({
        period: c,
        sort: m.optional(),
        limit: o.z
          .number()
          .int()
          .optional()
          .describe(
            "Rows served (default and ceiling 100; out-of-range values clamp).",
          ),
        positionsLimit: f,
      }),
      response: o.z.object({
        entries: o.z.array(
          b.extend({
            groupId: o.z.string(),
            memberCount: o.z.number(),
            membersCounted: o.z.number(),
            username: o.z.string().nullable(),
            profileImageUrl: o.z.string().nullable(),
            xUsername: o.z
              .string()
              .nullable()
              .describe(
                "The squad's linked X handle; null when none is linked or the profile lookup missed",
              ),
            isVerified: o.z.boolean(),
            verifiedBadgeVisible: o.z
              .boolean()
              .describe(
                "Badge rendering hint beside isVerified: show the checkmark only when both are true",
              ),
            activeCompetitionEntry: d.profileCompetitionEntry
              .nullable()
              .describe(
                "The squad’s entry in the group competition whose registration is open or which is running (the earliest-starting one when several are); null = not entered or the profile lookup missed; may lag a register by up to the board cache TTL (15 min).",
              ),
          }),
        ),
        periodType: p,
        periodLabel: o.z.string(),
        windowStartSec: o.z.number(),
        totalRanked: o.z.number(),
      }),
    }),
    "GET /pnl-leaderboard/follow-suggestions": (0, s.publicRead)("graph.read", {
      summary: "Get follow suggestions sampled from the PNL leaderboard",
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .optional()
          .describe("Default 5, capped at 25"),
      }),
      response: o.z.object({
        entries: o.z.array(w),
        periodLabel: o.z.string(),
        windowStartSec: o.z.number(),
      }),
    }),
    "GET /pnl-leaderboard/onboarding-suggestions": (0, s.publicRead)(
      "graph.read",
      {
        summary:
          "Get the scored, sampled follow suggestions for the mobile onboarding step",
        query: o.z.object({
          limit: o.z
            .number()
            .int()
            .optional()
            .describe("Default 10, capped at 25"),
        }),
        response: o.z.object({
          entries: o.z.array(
            l.onboardingSuggestion.extend(l.viewerFollowFields),
          ),
        }),
      },
    ),
    "GET /pnl-leaderboard/positions": (0, s.publicRead)("leaderboards.read", {
      summary: "Get the PNL position leaderboard for a period",
      query: o.z.object({
        period: o.z.enum(["daily", "weekly"]),
        includeFollowedHolders: o.z
          .boolean()
          .optional()
          .describe(
            "Opt-in: attach the followed-holders facepile per entry. Viewer-relative: the API host has no viewer, so followedHolders is null there. Off by default (TASK-3718).",
          ),
        followedHoldersLimit: o.z
          .number()
          .int()
          .min(1)
          .optional()
          .describe(
            "Followed holders returned per entry (default 3; values above 10 clamp to 10).",
          ),
        limit: o.z
          .number()
          .int()
          .optional()
          .describe("Rows served; default and ceiling 25"),
      }),
      response: o.z.object({
        entries: o.z.array(z),
        periodLabel: o.z.string(),
        windowStartSec: o.z.number(),
        totalRanked: o.z.number(),
      }),
    }),
    "GET /pnl-leaderboard/top-trader-trades/{mint}": (0, s.publicRead)(
      "leaderboards.read",
      {
        summary:
          "A coin's trades from accounts ranked in the top 50 of any PNL leaderboard period, across all their wallets on either chain (chart marks)",
        params: o.z.object({ mint: o.z.string() }),
        query: o.z.object({
          chainId: o.z
            .number()
            .int()
            .optional()
            .describe(
              "Codex network id of an EVM mint's chain; omitted lets cc infer the family from the mint shape (Solana mints never need it)",
            ),
          to: o.z
            .number()
            .int()
            .min(0)
            .optional()
            .describe(
              "Serve trades at or before this instant (epoch ms); omitted = now. Honoured only while the server pages (see `page`).",
            ),
          cursor: o.z
            .string()
            .max(200)
            .optional()
            .describe(
              "Continuation from the previous response's page.nextCursor; omit for the newest page",
            ),
          limit: o.z
            .number()
            .int()
            .min(1)
            .max(500)
            .optional()
            .describe("Trades per page; default and ceiling 500"),
        }),
        response: o.z.object({
          mint: o.z.string(),
          traders: o.z
            .array(h)
            .describe(
              "Only top traders with at least one served trade on the coin, best rank first",
            ),
          trades: o.z
            .array(u)
            .describe(
              "Every returned trader's trades on the coin, newest first; the newest `limit` (default 500) across all of them",
            ),
          boardsBuiltAtMs: o.z
            .number()
            .describe(
              'Build time of the OLDEST board in the union — how fresh "top trader" is at worst (a held board keeps its stamp)',
            ),
          generatedAtMs: o.z.number(),
          page: o.z
            .object({
              nextCursor: o.z
                .string()
                .nullable()
                .describe(
                  "Pass as `cursor` for the trades older than this page; null = nothing older",
                ),
              to: o.z
                .number()
                .nullable()
                .describe("The `to` this page was served for; null = now"),
              limit: o.z.number(),
            })
            .nullable()
            .describe(
              "Present only when the server honoured to/cursor/limit — the paging capability marker. Null means the response is the whole set: keep the single-fetch behaviour. A degraded read is served as an empty page with page null and a 200, never a 5xx; on a 429 back off and keep the last good set.",
            ),
        }),
      },
    ),
    "POST /pnl-leaderboard/ban": {
      summary: "Ban a wallet from every PNL leaderboard",
      body: o.z.object({
        walletAddress: o.z.string().min(1),
        reason: o.z.string().optional(),
      }),
      response: o.z.object({
        walletAddress: o.z.string(),
        alreadyBanned: o.z.boolean(),
        bannedAt: o.z.number(),
      }),
    },
    "POST /pnl-leaderboard/unban": {
      summary: "Unban a wallet from every PNL leaderboard",
      body: o.z.object({
        walletAddress: o.z.string().min(1),
        reason: o.z.string().optional(),
      }),
      response: o.z.object({
        walletAddress: o.z.string(),
        wasBanned: o.z.boolean(),
      }),
    },
    "POST /pnl-leaderboard/groups/ban": {
      summary: "Hide a group from the group PNL leaderboard",
      body: o.z.object({
        groupId: o.z.uuid().describe("cc user id (UUID) of the group"),
        reason: o.z.string().optional(),
      }),
      response: o.z.object({
        groupId: o.z.string(),
        alreadyBanned: o.z.boolean(),
        bannedAt: o.z.number(),
      }),
    },
    "POST /pnl-leaderboard/groups/unban": {
      summary: "Unhide a group from the group PNL leaderboard",
      body: o.z.object({
        groupId: o.z.uuid().describe("cc user id (UUID) of the group"),
        reason: o.z.string().optional(),
      }),
      response: o.z.object({ groupId: o.z.string(), wasBanned: o.z.boolean() }),
    },
    "GET /pnl-leaderboard/blocklist/mints": {
      summary: "Active PnL-board mint blocklist (pump.competitions.moderate)",
      response: o.z.object({
        mints: o.z
          .array(
            o.z.object({
              mint: o.z.string(),
              reason: o.z.string(),
              bannedBy: o.z.string(),
              bannedByUserId: o.z.string().nullable(),
              bannedAt: o.z.number(),
            }),
          )
          .describe("Newest first"),
      }),
    },
    "POST /pnl-leaderboard/blocklist/mints/add": {
      summary:
        "Hide up to 50 mints from every PnL board (pump.competitions.moderate)",
      body: o.z.object({
        mints: o.z.array(o.z.string().trim().min(1)).min(1).max(50),
        reason: o.z.string().trim().max(500).optional(),
      }),
      response: o.z.object({
        added: o.z.array(o.z.string()),
        alreadyBlocked: o.z.array(o.z.string()),
      }),
    },
    "POST /pnl-leaderboard/blocklist/mints/remove": {
      summary:
        "Unhide up to 50 mints on every PnL board (pump.competitions.moderate)",
      body: o.z.object({
        mints: o.z.array(o.z.string().trim().min(1)).min(1).max(50),
      }),
      response: o.z.object({
        removed: o.z.array(o.z.string()),
        notBlocked: o.z.array(o.z.string()),
      }),
    },
  });
};
