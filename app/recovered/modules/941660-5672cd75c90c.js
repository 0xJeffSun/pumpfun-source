// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.usersRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = e.r(890664),
    i = e.r(421504),
    l = e.r(896727),
    d = a.normalizedProfile.extend({
      viewerFollows: o.z
        .boolean()
        .describe(
          "Whether the authenticated viewer follows this user. Followed candidates sort first.",
        ),
    }),
    c = o.z.object({
      address: o.z
        .string()
        .describe(
          "Subject identifier: normally a wallet address — the subject's canonical wallet when the streak belongs to a pump.fun user. A pump.fun user id when that user has no canonical Solana wallet (walletless or EVM-only account) or when wallet resolution was unavailable. See subjectType.",
        ),
      streak: o.z
        .number()
        .describe("Current active trading streak (consecutive days)"),
      rank: o.z.number().describe("Rank on the leaderboard (1-based)"),
      subjectType: o.z
        .enum(["wallet", "user"])
        .describe(
          "Whether `address` is a wallet address or a pump.fun user id.",
        ),
    }),
    u = o.z.object({ date: o.z.string(), traded: o.z.boolean() }),
    h = o.z.object({
      volumeUsd: o.z.number(),
      trades: o.z.number(),
      previousVolumeUsd: o.z.number(),
      previousTrades: o.z.number(),
      biggestTradeUsd: o.z
        .number()
        .describe(
          "USD notional of the single largest trade inside this window; 0 when the window has no trade.",
        ),
      percentileBucket: o.z
        .number()
        .describe(
          'Volume tier inside this window\'s cohort, same ladder as the rollup percentileBucket: 1/5/10/25/50 = "top N%", 100 = below the top-50% cutoff, 0 = unranked.',
        ),
    }),
    m = {
      allTimeVolumeUsd: o.z.number().optional(),
      allTimeTrades: o.z.number().optional(),
      biggestTradeUsd: o.z.number().optional(),
      window1d: h.optional(),
      window7d: h.optional(),
      window30d: h.optional(),
      window30dVolumeUsd: o.z.number().optional(),
      percentileBucket: o.z
        .number()
        .optional()
        .describe(
          'Trailing-30d cohort tier cutoff, not a 0-100 percentile: 1/5/10/25/50 = "top N%", 100 = below the top-50% cutoff, 0 = unranked. Equals window30d.percentileBucket.',
        ),
      allTimePercentileBucket: o.z
        .number()
        .optional()
        .describe(
          "The same tier ladder as percentileBucket, applied to allTimeVolumeUsd against the lifetime cohort; 0 = unranked.",
        ),
    },
    p = o.z.object({
      ...m,
      statsUpdatedAt: o.z.number().optional(),
      byPlatform: o.z
        .array(o.z.object({ ...m, platform: o.z.string() }))
        .optional(),
    }),
    b = o.z.object({ value: o.z.number(), previous: o.z.number() }),
    g = o.z.object({
      window1d: b.optional(),
      window7d: b.optional(),
      window30d: b.optional(),
      windowAllTime: b
        .optional()
        .describe(
          "Everything from firstDataDay through asOf; previous is always 0. For followerNetChange the value is the current follower count.",
        ),
    }),
    w = o.z.object({
      value: o.z.number(),
      previous: o.z
        .number()
        .optional()
        .describe(
          "Unset when the previous window predates follow-edge tracking.",
        ),
    }),
    y = o.z.object({
      window1d: w.optional(),
      window7d: w.optional(),
      window30d: w.optional(),
    }),
    f = o.z.object({
      profileViews: g.optional(),
      calloutViews: g.optional(),
      calloutClicks: g.optional(),
      calloutTradeIntents: g.optional(),
      followerNetChange: g.optional(),
      followersGained: y.optional(),
      followersLost: y.optional(),
      followerCount: o.z.number().optional(),
      firstDataDay: o.z.string().optional(),
      asOf: o.z.string().optional(),
      statsUpdatedAt: o.z.number().optional(),
    }),
    z = o.z.object({
      min: o.z
        .number()
        .describe("Inclusive lower bound of the bucket's multiple range."),
      max: o.z
        .number()
        .nullable()
        .describe("Exclusive upper bound; null for the open-ended top bucket."),
      count: o.z.number(),
    }),
    v = (e) =>
      o.z
        .number()
        .nullable()
        .optional()
        .describe(
          `Raw percentile 0..100 of ${e} among the window's population (share at or below the user, midrank on ties); top X% = 100 - rank. Null/absent = unranked (stat null, no tailed callout in the window, or the window's ladder is missing or stale), never 0.`,
        ),
    k = o.z.object({
      tailBuyers: v("tailBuyers"),
      tailVolumeUsd: v("tailVolumeUsd"),
      tailUniqueBuyers: v(
        "tailUniqueBuyers (distinct tailer wallets, the Tailers tile)",
      ),
      tailCohort1h: v("tailCohort1h"),
      tailCohort4h: v("tailCohort4h"),
      tailCohort24h: v("tailCohort24h"),
      tailPnl1hUsd: v("tailPnl1hUsd"),
      tailPnl4hUsd: v("tailPnl4hUsd"),
      tailPnl24hUsd: v("tailPnl24hUsd"),
      tailAth1hUsd: v("tailAth1hUsd"),
      tailAth4hUsd: v("tailAth4hUsd"),
      tailAth24hUsd: v("tailAth24hUsd"),
      population: o.z
        .number()
        .nullable()
        .optional()
        .describe(
          "Authors ranked in this window (the population every rank is against).",
        ),
      generatedAt: o.z
        .number()
        .nullable()
        .optional()
        .describe("Epoch ms at which the window's rank ladder was built."),
    }),
    _ = o.z.object({
      totalCallouts: o.z.number(),
      calloutsWithMultiple: o.z.number(),
      twoXPercent: o.z.number(),
      onePointFiveXPercent: o.z.number(),
      onePointTwoXPercent: o.z.number(),
      averageMultiple: o.z.number(),
      medianMultiple: o.z.number(),
      averageTimeToPeakMs: o.z
        .number()
        .nullable()
        .describe(
          "Whole milliseconds; null when no callout in the window recorded a peak.",
        ),
      tailBuyers: o.z
        .number()
        .nullable()
        .describe(
          "Sum over the window's callouts (those created after tail tracking went live) of distinct users whose buy was attributed to the callout; null when none qualifies.",
        ),
      tailCallouts: o.z
        .number()
        .nullable()
        .describe(
          "Callouts in the window with tail tracking, the denominator of tailBuyers; null when 0.",
        ),
      tailCallouts1h: o.z
        .number()
        .nullable()
        .describe(
          "Callouts in the window whose 1 h tailing-cohort PnL is served; null when 0.",
        ),
      tailCohort1h: o.z
        .number()
        .nullable()
        .describe(
          "Users tailPnl1hUsd covers (tailers whose first attributed buy landed before +1 h and whose window priced); null when no callout is served.",
        ),
      tailPnl1hUsd: o.z
        .number()
        .nullable()
        .describe(
          "USD, whole-position PnL change of the tailing cohort over [callout, +1 h], summed over served callouts; null when none.",
        ),
      tailCallouts4h: o.z
        .number()
        .nullable()
        .describe(
          "Callouts in the window whose 4 h tailing-cohort PnL is served; null when 0.",
        ),
      tailCohort4h: o.z
        .number()
        .nullable()
        .describe(
          "Users tailPnl4hUsd covers (tailers whose first attributed buy landed before +4 h and whose window priced); null when no callout is served.",
        ),
      tailPnl4hUsd: o.z
        .number()
        .nullable()
        .describe(
          "USD, whole-position PnL change of the tailing cohort over [callout, +4 h], summed over served callouts; null when none.",
        ),
      tailCallouts24h: o.z
        .number()
        .nullable()
        .describe(
          "Callouts in the window whose 24 h tailing-cohort PnL is served; null when 0.",
        ),
      tailCohort24h: o.z
        .number()
        .nullable()
        .describe(
          "Users tailPnl24hUsd covers (tailers whose first attributed buy landed before +24 h and whose window priced); null when no callout is served.",
        ),
      tailPnl24hUsd: o.z
        .number()
        .nullable()
        .describe(
          "USD, whole-position PnL change of the tailing cohort over [callout, +24 h], summed over served callouts; null when none.",
        ),
      tailUniqueBuyers: o.z
        .number()
        .nullable()
        .describe(
          "Distinct wallets that tailed at least one of the window's callouts (one wallet tailing five callouts counts once); always <= tailBuyers; null when unknown.",
        ),
      tailVolumeUsd: o.z
        .number()
        .nullable()
        .describe(
          "USD of the tailers' attributed buys through the window's callouts (SOL at the current SOL price plus USDC), author and reply-author self-buys excluded; null when unknown or unpriced.",
        ),
      tailPnlHist1h: i.tailPnlHistogram
        .nullable()
        .describe(
          "Per-tailer 1 h PnL histogram summed over served callouts (server-defined buckets); null when no callout is served, never all-zero buckets.",
        ),
      tailPnlHist4h: i.tailPnlHistogram
        .nullable()
        .describe(
          "Per-tailer 4 h PnL histogram summed over served callouts (server-defined buckets); null when no callout is served, never all-zero buckets.",
        ),
      tailPnlHist24h: i.tailPnlHistogram
        .nullable()
        .describe(
          "Per-tailer 24 h PnL histogram summed over served callouts (server-defined buckets); null when no callout is served, never all-zero buckets.",
        ),
      tailAth1hUsd: o.z
        .number()
        .nullable()
        .describe(
          "USD, best-case-exit PnL of the 1 h tailing cohort summed over the window's callouts whose 1 h ATH arm is served (per tailer max(0, in-window bought amount x highest outlier-screened 1 m candle high - in-window buy spend) over its own window [first in-window buy, +1 h]); >= 0; null when no callout in the window is served or unavailable.",
        ),
      tailAth4hUsd: o.z
        .number()
        .nullable()
        .describe(
          "USD, best-case-exit PnL of the 4 h tailing cohort summed over the window's callouts whose 4 h ATH arm is served (per tailer max(0, in-window bought amount x highest outlier-screened 1 m candle high - in-window buy spend) over its own window [first in-window buy, +4 h]); >= 0; null when no callout in the window is served or unavailable.",
        ),
      tailAth24hUsd: o.z
        .number()
        .nullable()
        .describe(
          "USD, best-case-exit PnL of the 24 h tailing cohort summed over the window's callouts whose 24 h ATH arm is served (per tailer max(0, in-window bought amount x highest outlier-screened 5 m candle high - in-window buy spend) over its own window [first in-window buy, +24 h]); >= 0; null when no callout in the window is served or unavailable.",
        ),
      tailAthHist1h: i.tailPnlHistogram
        .nullable()
        .describe(
          "Per-tailer 1 h best-case-exit PnL histogram (tailer-anchored window, 1 m candle highs) summed elementwise over served callouts; five buckets from 0 up (first min 0, last max null), callouts = how many contributed; null when no callout carries one, never all-zero buckets.",
        ),
      tailAthHist4h: i.tailPnlHistogram
        .nullable()
        .describe(
          "Per-tailer 4 h best-case-exit PnL histogram (tailer-anchored window, 1 m candle highs) summed elementwise over served callouts; five buckets from 0 up (first min 0, last max null), callouts = how many contributed; null when no callout carries one, never all-zero buckets.",
        ),
      tailAthHist24h: i.tailPnlHistogram
        .nullable()
        .describe(
          "Per-tailer 24 h best-case-exit PnL histogram (tailer-anchored window, 5 m candle highs) summed elementwise over served callouts; five buckets from 0 up (first min 0, last max null), callouts = how many contributed; null when no callout carries one, never all-zero buckets.",
        ),
      distribution: o.z
        .array(z)
        .describe("Server-defined buckets; [] for a user with no callouts."),
      ranks: k
        .nullable()
        .optional()
        .describe(
          "Percentile ranks of this window's tail stats against every author in the same window; null when cc served no ranks for the window (each rank inside is itself nullable).",
        ),
    }),
    E = (e) =>
      _.optional().describe(
        `The ${e} window. Absent only when stats are unavailable (the route fails open to {} rather than 5xx) or predate windowed stats; present with zeros for a user with no callouts. When present every field is populated.`,
      ),
    T = o.z.object({
      calloutId: o.z
        .string()
        .describe("The callout credited with the tier (UUID)."),
      mint: o.z.string().describe("Token address the callout was made on."),
      multiple: o.z
        .number()
        .describe(
          "The callout's whole-number peak multiple at read time; at least the tier's threshold.",
        ),
      calledOutAt: o.z
        .string()
        .nullable()
        .describe(
          "ISO-8601 time the callout was made; null when cc served none.",
        ),
      peakedAt: o.z
        .string()
        .nullable()
        .describe(
          "ISO-8601 time the peak multiple was last raised; null when the peak predates tracking.",
        ),
    }),
    A = o.z.object({
      periodType: o.z
        .enum(["weekly", "monthly"])
        .describe("Which board the finish was on."),
      periodLabel: o.z
        .string()
        .describe('ISO week label ("2026-W37") or calendar month ("2026-08").'),
      rank: o.z.number().describe("1-based rank in that period."),
      periodStart: o.z
        .string()
        .nullable()
        .describe(
          "ISO-8601 UTC start of the period (Monday 00:00 for a week, the 1st for a month); null when cc served none.",
        ),
    }),
    I = o.z.object({
      kind: o.z
        .enum(["callout", "leaderboard"])
        .describe(
          'Which arm is populated: "callout" for the multiple track, "leaderboard" for the board track.',
        ),
      callout: T.nullable().describe(
        'Set when kind is "callout"; null otherwise.',
      ),
      leaderboard: o.z
        .object({
          finishes: o.z
            .array(A)
            .describe(
              "The closed leaderboard periods that satisfied the badge's rule, chronological and capped at the rule's own count. Never empty.",
            ),
        })
        .nullable()
        .describe('Set when kind is "leaderboard"; null otherwise.'),
    }),
    S = o.z.object({
      achievementId: o.z.string(),
      unlockedAt: o.z
        .string()
        .nullable()
        .describe(
          "ISO-8601 grant time; null when cc served the unlock without one.",
        ),
      value: o.z
        .number()
        .nullable()
        .describe(
          "Metric value frozen at grant time; null for grants whose rule has no scalar metric.",
        ),
      seen: o.z
        .boolean()
        .describe(
          "Whether the owner has acknowledged the unlock. Always false for anonymous and third-party viewers.",
        ),
      holderCount: o.z
        .number()
        .nullable()
        .describe(
          "Population: how many users hold this achievement, the subject included, as of a snapshot a few minutes old (never below 1 for a holder). Null when cc served the unlock without a population (the read is disabled or was unavailable), never 0.",
        ),
      holderPercent: o.z
        .number()
        .nullable()
        .describe(
          "holderCount as a percentage (0-100) of all accounts, against the planner estimate of the user table. Null whenever holderCount is, and when the account estimate is unavailable.",
        ),
      evidence: I.nullable().describe(
        "What earned the unlock: the callout that reached a multiple tier, or the closed leaderboard periods behind a board badge. Derived by cc at read time from the current truth stores, so it can lag `value`. Null for the count-and-total tracks, when nothing currently qualifies, and when cc served the unlock without it (the read is disabled or was unavailable).",
      ),
    }),
    R = o.z.object({
      metric: o.z.string(),
      currentValue: o.z.number(),
      nextThreshold: o.z
        .number()
        .nullable()
        .describe(
          "Threshold of the next locked tier; null when the track is maxed out.",
        ),
      nextAchievementId: o.z
        .string()
        .nullable()
        .describe(
          "Catalog id of the next locked tier; null when the track is maxed out.",
        ),
      previousThreshold: o.z
        .number()
        .nullable()
        .describe(
          "Threshold of the highest tier already reached (the floor of the current rung); null when no tier is reached yet. A bar renders as (currentValue - previousThreshold) / (nextThreshold - previousThreshold).",
        ),
      previousAchievementId: o.z
        .string()
        .nullable()
        .describe(
          "Catalog id of the highest tier already reached; null when none is.",
        ),
    }),
    P = o.z.object({
      provider: o.z.literal("twitter"),
      username: o.z.string(),
      profileImageUrl: o.z
        .string()
        .nullable()
        .describe(
          "Stored X avatar (400x400, refreshed on X login) — NOT the pump profile picture. Null when X offers nothing.",
        ),
      linkedAt: o.z
        .string()
        .nullable()
        .describe(
          "ISO timestamp of when the account was linked; null when cc omits it.",
        ),
      followerCount: o.z
        .number()
        .describe(
          "Follower count on X as of cc's last sync — NOT the pump follower count.",
        ),
      url: o.z
        .string()
        .nullable()
        .describe(
          "Rename-proof X profile link (x.com/i/user/{id}) — deep-link with this, not the handle.",
        ),
    });
  r.usersRoutes = (0, n.defineRoutes)({
    "GET /users/{id}": (0, s.publicRead)("profiles.read", {
      summary: "Get a user by wallet address or user id",
      params: o.z.object({ id: o.z.string() }),
      response: l.userRow,
    }),
    "DELETE /users": {
      summary:
        "Delete the current user account (Privy dissociation plus the local row); empty 200",
      response: o.z.void(),
      emits: ["PRIVY_IDENTITY_TOKEN_EXPIRED", "PRIVY_IDENTITY_TOKEN_INVALID"],
      errors: {
        401: o.z
          .object({
            code: o.z.enum([
              "privy_identity_token_expired",
              "privy_identity_token_invalid",
            ]),
            message: o.z.string(),
          })
          .describe(
            "Deprecated lowercase twin of PRIVY_IDENTITY_TOKEN_EXPIRED / PRIVY_IDENTITY_TOKEN_INVALID, carried beside `error` on every refusal until web reads `error` (docs/route-deprecations.md): the x-privy-id-token header is missing, expired or fails verification; refresh the Privy identity token and retry (TASK-5220)",
          ),
      },
    },
    "GET /users": (0, s.publicRead)("profiles.read", {
      summary: "List users",
      query: o.z.object({
        sort: o.z.string().optional(),
        order: o.z.string().optional(),
        offset: o.z.number().int().optional(),
        limit: o.z.number().int().optional(),
      }),
      response: o.z.array(l.userRow),
    }),
    "GET /users/mention-candidates": {
      summary: "Mention-picker candidates for the @ composer",
      query: o.z.object({
        searchTerm: o.z.string().optional(),
        limit: o.z.number().int().optional(),
      }),
      response: o.z.array(d),
    },
    "GET /users/search-v2": (0, s.publicRead)("profiles.read", {
      summary: "Search users (v2)",
      query: o.z.object({
        searchTerm: o.z.string().optional(),
        offset: o.z.number().int().optional(),
        limit: o.z.number().int().optional(),
        sort: o.z.string().optional(),
        order: o.z.string().optional(),
        includeLabelledWallets: o.z.boolean().optional(),
      }),
      response: o.z.array(l.userRow),
    }),
    "POST /users/batch": (0, s.publicRead)("profiles.read", {
      summary: "Fetch users by addresses in batch",
      body: o.z.object({ addresses: o.z.array(o.z.string()).max(100) }),
      response: o.z.array(l.userRow),
    }),
    "GET /users/streaks/leaderboard": {
      summary: "Get the trading streak leaderboard",
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .min(1)
          .max(200)
          .optional()
          .describe("Number of entries to return (max: 200)"),
      }),
      response: o.z.object({
        entries: o.z
          .array(c)
          .describe(
            "Array of leaderboard entries, sorted by streak descending",
          ),
      }),
    },
    "GET /users/{address}/streak": {
      summary: "Get trading streak and daily history for a user",
      params: o.z.object({ address: o.z.string() }),
      query: o.z.object({
        startDate: o.z
          .string()
          .optional()
          .describe(
            "Start date (YYYY-MM-DD). Defaults to the 2025-04-01 streak epoch, which also floors it.",
          ),
        endDate: o.z
          .string()
          .optional()
          .describe(
            "End date (YYYY-MM-DD). Defaults to today, which also caps it.",
          ),
      }),
      response: o.z.object({
        activeStreak: o.z
          .number()
          .describe("Current consecutive trading days streak"),
        longestStreak: o.z
          .number()
          .describe("Longest consecutive trading days streak since launch"),
        leaderboardRank: o.z
          .number()
          .nullable()
          .describe(
            "Position among every live trading streak (1-based), in the streak leaderboard's order: the board row for a top-200 address, the row the board would give it otherwise. Null when the address has no live streak or no rank is available.",
          ),
        rankedTotal: o.z
          .number()
          .nullable()
          .describe(
            "Number of live streaks leaderboardRank was drawn from, for rendering a percentile. Null whenever leaderboardRank is null or came from the top-200 board alone.",
          ),
        history: o.z
          .array(u)
          .describe("Array of daily trade status (most recent first)"),
        computedAt: o.z
          .string()
          .describe(
            'ISO-8601 server time at which the streak was computed (portfolio_service folds live day marks onto the nightly base on every read, so this is the freshness of the figures). Clients show it as the "updated" time instead of their own fetch time.',
          ),
      }),
    },
    "GET /users/{address}/trader-stats": {
      summary: "Get a wallet's trader stats",
      params: o.z.object({ address: o.z.string() }),
      response: p,
    },
    "GET /users/{address}/social-stats": {
      summary:
        "A wallet's nightly social-engagement stats (profile views, callout engagement, followers)",
      params: o.z.object({ address: o.z.string() }),
      response: f,
    },
    "GET /users/{address}/callout-stats": (0, s.publicRead)("profiles.read", {
      summary:
        "A user's callout performance stats (peak-multiple hit rates, averages, time to peak, distribution), every window (daily/weekly/monthly/allTime, plus lastRound = callouts created between the two newest executed payout round cuts) in one response. Public like the callout list itself — derived from publicly visible callouts.",
      params: o.z.object({ address: o.z.string() }),
      response: o.z.object({
        daily: E("daily"),
        weekly: E("weekly"),
        monthly: E("monthly"),
        allTime: E("all-time"),
        lastRound: E("last payout round"),
        computedAt: o.z
          .string()
          .describe(
            'ISO-8601 server time at which the windows were computed from live callout data (cc recomputes on every read, so this is the freshness of the figures). Present on every response, the fail-open {} shape included; clients show it as the "updated" time instead of their own fetch time. tail* fields are frozen horizon snapshots, not recomputed per read.',
          ),
      }),
    }),
    "GET /users/{address}/achievements": (0, s.publicRead)("profiles.read", {
      summary:
        "A user's achievement unlocks plus live progress on every track. Unlock facts are public-profile data; `seen` is viewer-relative, served only to the signed-in owner and absent on the API host.",
      params: o.z.object({ address: o.z.string() }),
      response: o.z.object({
        achievements: o.z
          .array(S)
          .describe("Unlocked achievements, ordered by catalog sortOrder."),
        progress: o.z
          .array(R)
          .describe(
            "Live progress for the tracks whose truth store is coin-communities-local. Trader-family live values are deliberately absent.",
          ),
        catalogVersion: o.z
          .string()
          .describe(
            "Catalog version the unlocks were resolved against; empty when the response is a degraded fallback.",
          ),
      }),
    }),
    "GET /users/{id}/socials": {
      summary:
        "A user's linked social accounts (X handle + stored X avatar), from coin-communities",
      params: o.z.object({ id: o.z.string() }),
      response: o.z.object({ socials: o.z.array(P) }),
    },
    "GET /users/{id}/mutual-followers": {
      summary:
        "Accounts the viewer follows that also follow this user ('followed by people you follow'), most-followed first.",
      params: o.z.object({ id: o.z.string() }),
      query: o.z.object({
        limit: o.z.number().int().min(1).optional(),
        offset: o.z
          .number()
          .int()
          .min(0)
          .optional()
          .describe(
            "Offset paging, mirroring the cc RPC; cc rejects past 10k.",
          ),
      }),
      response: o.z.object({
        mutualFollowers: o.z.array(a.normalizedProfile),
        hasMore: o.z.boolean(),
        totalCount: o.z
          .number()
          .describe(
            "Exact size of the whole mutual set across all pages, not just this page.",
          ),
      }),
    },
    "POST /users/achievements/seen": {
      summary:
        "Acknowledge the caller's freshly unlocked achievements (clears the 'new badge' dot). Idempotent: already-seen ids and ids with no unlock are no-ops.",
      body: o.z.object({
        achievementIds: o.z
          .array(o.z.string().max(64))
          .max(100)
          .optional()
          .describe(
            "Catalog ids to acknowledge. Omit to acknowledge every currently-unseen unlock. Ids with no unlock row are ignored.",
          ),
      }),
      response: o.z.object({
        marked: o.z
          .number()
          .describe(
            "Unlocks this call transitioned to seen; 0 when everything was already acknowledged.",
          ),
      }),
    },
    "POST /users": {
      summary: "Update the current user profile",
      body: o.z.object({
        username: o.z.string().max(15).optional(),
        profileImage: o.z.string().optional(),
        bio: o.z.string().max(250).optional(),
      }),
      response: l.userRow,
      emits: ["COOLDOWN", "USERNAME_RESERVED", "USERNAME_TAKEN", "USER_BANNED"],
    },
    "POST /users/profile-image": {
      summary: "Update profile image",
      body: o.z.object({
        profileImage: o.z
          .string()
          .nullable()
          .optional()
          .describe(
            "The new profile image URL for the user. Omit, send null, or send an empty string to clear the custom avatar: a holder whose generated media is ready gets their mascot (the PnL-loop thumbnail, rehosted to the CDN); everyone else resets to the default pumpatar.",
          ),
      }),
      response: l.userRow,
      emits: ["COOLDOWN", "USER_BANNED"],
    },
    "POST /users/header-image": {
      summary: "Update profile header image",
      body: o.z.object({
        headerImage: o.z
          .string()
          .nullable()
          .optional()
          .describe(
            "The new profile header/banner image URL for the user. Omit, send null, or send an empty string to clear the header image.",
          ),
      }),
      response: o.z.object({ header_image_url: o.z.string() }),
    },
    "POST /users/avatar-decoration": {
      summary: "Update profile avatar decoration (border effect)",
      body: o.z.object({
        avatarDecoration: o.z
          .string()
          .nullable()
          .optional()
          .describe(
            'The avatar decoration (border effect) key to show on the profile picture, e.g. `legendary`, `epic` or `none` (an explicit "no border"); lowercase [a-z0-9_:-], at most 64 chars. Omit, send null, or send an empty string to clear the pick, which lets every viewer derive the default from the rarest earned achievement again.',
          ),
      }),
      response: o.z.object({
        avatar_decoration: o.z
          .string()
          .nullable()
          .describe(
            "The persisted pick, as the profile rows serve it: the key, or null once cleared.",
          ),
      }),
    },
    "GET /users/username-exists/{username}": (0, s.publicRead)(
      "profiles.read",
      {
        summary: "Check if a username exists",
        params: o.z.object({ username: o.z.string() }),
        response: o.z.object({
          exists_flag: o.z
            .boolean()
            .describe(
              "Whether the handle is already reserved. The check has no viewer, so the caller's own current handle reads true, as does a banned or unclaimed owner's handle. Always present; a failed profile-service read fails soft to false on a 200 rather than an error status.",
            ),
        }),
      },
    ),
    "POST /users/{userAddress}/remove-avatar": {
      summary: "Admin: remove a user avatar",
      params: o.z
        .object({ userAddress: o.z.string() })
        .describe("cc user id (UUID) or base58 canonical wallet"),
      response: o.z.object({ success: o.z.literal(!0) }),
    },
  });
};
