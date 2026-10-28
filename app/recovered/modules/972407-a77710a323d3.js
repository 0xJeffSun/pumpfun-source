// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.followingRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = e.r(890664),
    i = e.r(896727),
    l = o.z.object({ userId: o.z.string() }),
    d = o.z
      .enum(["onboarding"])
      .describe(
        'Who made the follow. `onboarding` marks an edge the onboarding "suggested follows" step created for a new user who did not pick the target; cc stores it on the edge (and on the trade-notif subscription that later rides it) so downstream can tell it from a manual follow. Omit for a person-pressed follow (stored as `user`). A re-follow of an existing edge keeps the stored origin.',
      ),
    c = o.z.object({ count: o.z.number() }),
    u = o.z.object({ success: o.z.boolean() }),
    h = o.z.object({ userId: o.z.string(), traderAddress: o.z.string() }),
    m = o.z.object({
      limit: o.z.number().int().min(1).optional(),
      offset: o.z.number().int().min(0).optional(),
      sort: o.z
        .enum(["followers", "recent"])
        .optional()
        .describe(
          "Row order for the plain list: `followers` (default) is most-followed first, `recent` is newest follow edge first. Ignored when `searchTerm` is present.",
        ),
    }),
    p = o.z.object({
      limit: o.z
        .number()
        .int()
        .min(1)
        .max(1e3)
        .optional()
        .describe(
          "Page size, default 20. Out-of-range values are rejected with 400, not clamped.",
        ),
      offset: o.z
        .number()
        .int()
        .min(0)
        .optional()
        .describe("0-indexed offset into the sorted list, default 0"),
      sort: o.z
        .enum(["followers", "recent"])
        .optional()
        .describe(
          "Row order: `followers` (default) is most-followed first, `recent` is newest follow edge first.",
        ),
    }),
    b = o.z.object({
      searchTerm: o.z
        .string()
        .min(1)
        .max(50)
        .describe(
          "Search term, relevance-ranked; trimmed. Fewer than 2 characters after trimming answers [] without a search. Longer than 50 characters is a 400.",
        ),
      limit: o.z
        .number()
        .int()
        .min(1)
        .max(100)
        .optional()
        .describe(
          "Page size, default 20. Out-of-range values are rejected with 400, not clamped.",
        ),
      offset: o.z
        .number()
        .int()
        .min(0)
        .optional()
        .describe("0-indexed offset into the ranked matches, default 0"),
    }),
    g = o.z.object({
      following_id: o.z
        .string()
        .describe(
          "The followee, echoed in the form the request sent (cc user-id UUID or wallet)",
        ),
      user_id: o.z
        .string()
        .describe(
          "The viewer, echoed in the form the request sent (cc user-id UUID or wallet)",
        ),
      timestamp: o.z
        .number()
        .nullable()
        .optional()
        .describe(
          "Epoch ms the edge was made; absent on the index-synthesized row, null when cc carries no followedAt",
        ),
    }),
    w = o.z.object({
      userId: o.z.string(),
      username: o.z.string(),
      profileImage: o.z.string().nullable(),
    }),
    y = o.z.object({ users: o.z.array(w), totalCount: o.z.number() }),
    f = y
      .optional()
      .describe(
        "Accounts the viewer follows that also follow this follower — up to 3 previews, most-followed first, plus the exact totalCount; the shape the suggestions route serves. Viewer-relative: only on a signed-in read of a page of at most 100 rows, never on the API host; absent = signal unavailable (never zero), totalCount 0 = none shared.",
      ),
    z = o.z.object({
      username: o.z.string().nullable(),
      profile_image: o.z.string().nullable(),
      resolved_avatar_decoration: o.z
        .string()
        .nullable()
        .describe(a.RESOLVED_AVATAR_DECORATION_DESCRIPTION),
      address: o.z
        .string()
        .describe(
          'Canonical Solana wallet, else the canonical EVM wallet; "" for a walletless account (a group)',
        ),
      userId: o.z
        .string()
        .describe(
          'cc user-id UUID of the account — the follow key every /following route accepts; "" when cc served the row without one',
        ),
      user_id: o.z
        .string()
        .describe(
          "Deprecated alias of userId, served for shipped clients (docs/route-deprecations.md); read userId",
        ),
      kind: o.z.enum(["person", "group"]),
      timestamp: o.z
        .number()
        .nullable()
        .describe("Always null: cc profiles carry no edge time"),
      followers: o.z.number(),
    }),
    v = z.extend({ mutuals: f }),
    k = i.userRow.extend({ mutuals: f }),
    _ = o.z.object({
      userId: o.z
        .string()
        .describe(
          "cc user-id UUID — the follow key for this row; every /following route accepts it",
        ),
      username: o.z.string(),
      profileImage: o.z.string().nullable(),
      followerCount: o.z.number(),
      pnlRanked: o.z
        .boolean()
        .describe(
          "True when a live PnL-board entry backed the row; false for social-gate fill rows",
        ),
      isVerified: o.z.boolean(),
      verifiedBadgeVisible: o.z
        .boolean()
        .describe(
          "Badge rendering hint beside isVerified: show the checkmark only when both are true",
        ),
      pnlUsd: o.z
        .number()
        .nullable()
        .describe(
          "Rolling-24h PnL in USD from the daily PnL board; null when the account is not on the board (every pnlRanked=false row) — never 0 for unknown",
        ),
      mutuals: y.describe(
        'Accounts the viewer follows that also follow this account — up to 3 previews, most-followed first, plus the exact totalCount ("and N others" = totalCount - users.length). Always present; totalCount 0 when none.',
      ),
      recommendationId: o.z
        .string()
        .describe(
          "One UUID minted per response, shared by all its rows — attribute a follow-through to the serving batch with it",
        ),
      recommendationRank: o.z
        .number()
        .describe("1-based position within this response"),
      source: o.z
        .enum(["co_follow", "pnl_board"])
        .describe(
          "Which pool the row came from: co_follow = accounts co-followed by the context user’s followers; pnl_board = daily PnL-board fill, served once the co-follow pool runs dry",
        ),
    }),
    E = o.z.object({
      following_id: o.z
        .string()
        .describe(
          "The followee's canonical SVM wallet, else canonical EVM wallet, else — for a walletless account (a squad) — its cc user id. Key on `user_id`",
        ),
      username: o.z.string().nullable(),
      profile_image: o.z.string().nullable(),
      trade_notif_enabled: o.z.boolean(),
      user_id: o.z.string(),
      is_pump_user: o.z.boolean(),
    });
  r.followingRoutes = (0, n.defineRoutes)({
    "POST /following/v2/bulk": {
      summary: "Follow multiple users in one request",
      body: o.z.object({
        targets: o.z.array(o.z.string()).min(1).max(20),
        origin: d.optional(),
      }),
      response: o.z.object({
        followed: o.z.array(o.z.string()),
        failed: o.z.array(o.z.string()),
      }),
    },
    "POST /following/v2/{userId}": {
      summary: "Follow a user",
      params: l,
      query: o.z.object({ origin: d.optional() }),
      response: o.z.void(),
      emits: ["COOLDOWN"],
    },
    "DELETE /following/bulk-trade-notifications": {
      summary: "Disable trade notifications for all followed users",
      response: u,
    },
    "DELETE /following/{userId}": {
      summary: "Unfollow a user",
      params: l,
      response: o.z.void(),
    },
    "GET /following/trade-notification-status": {
      summary: "List followed users with their trade-notification status",
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .optional()
          .describe("Default 50, capped at 100"),
        offset: o.z.number().int().optional().describe("Default 0"),
        query: o.z.string().optional(),
      }),
      response: o.z
        .array(E)
        .describe(
          "Bare array, kept for the live pagers; it carries no end-of-set signal — use /following/v2/trade-notification-status for `hasMore`",
        ),
    },
    "GET /following/v2/trade-notification-status": {
      summary:
        "List followed users with their trade-notification status, as an offset page with an end-of-set signal",
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .min(1)
          .max(100)
          .optional()
          .describe(
            "Page size, default 50. Out-of-range values are rejected with 400, not clamped (v1 clamps).",
          ),
        offset: o.z
          .number()
          .int()
          .min(0)
          .optional()
          .describe(
            "0-indexed offset, default 0. Only stable within one `query` value — reset to 0 when the search string changes.",
          ),
        query: o.z
          .string()
          .optional()
          .describe(
            "Case-insensitive prefix filter over the followees (username or wallet label). Trimmed; the first 64 characters are used.",
          ),
      }),
      response: o.z.object({
        rows: o.z
          .array(E)
          .describe(
            "Exactly the rows GET /following/trade-notification-status serves for the same limit/offset/query",
          ),
        hasMore: o.z
          .boolean()
          .describe(
            "True when at least one more row exists past this page (cc reads limit+1 and pops the sentinel). Stop paging on false, not on a short page. Scoped to the request’s `query` value, like offset itself.",
          ),
      }),
    },
    "GET /following/single/{id}": (0, s.publicRead)("graph.read", {
      summary: "Get a single follow relationship",
      params: o.z.object({
        id: o.z.string().describe("Followee: cc user-id UUID or wallet"),
      }),
      query: o.z.object({
        userId: o.z.string().describe("Viewer: cc user-id UUID or wallet"),
      }),
      response: o.z.object({
        follow: g
          .nullable()
          .describe("Null when the viewer does not follow the target"),
      }),
    }),
    "POST /following/single/batch": {
      summary: "Get follow state for several users at once",
      body: o.z.object({ targetIds: o.z.array(o.z.string()).min(1).max(100) }),
      response: o.z.object({
        following: o.z.record(o.z.string(), o.z.boolean()),
      }),
    },
    "GET /following/suggestions/{userId}": {
      summary:
        "Suggest accounts to follow after following a user — accounts co-followed by that user’s followers, PnL-credibility tiered, then filled from the daily PnL board",
      params: o.z.object({
        userId: o.z
          .string()
          .describe("The just-followed account: cc user-id UUID or wallet"),
      }),
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .min(1)
          .max(25)
          .optional()
          .describe(
            "Page size. Out-of-range values are rejected with 400, not clamped.",
          ),
        pageToken: o.z
          .string()
          .max(4096)
          .optional()
          .describe(
            "Continuation token from the previous response’s nextPageToken; omit for the first page. Opaque — do not parse or construct it.",
          ),
      }),
      response: o.z.object({
        suggestions: o.z.array(_),
        nextPageToken: o.z
          .string()
          .optional()
          .describe(
            "Continuation token for the next page; absent when the scroll is over (100-row ceiling reached, or both pools exhausted). A short page is NOT the end.",
          ),
      }),
    },
    "GET /following/followers/{userId}": {
      summary:
        "List a user's followers, or search within them via searchTerm (superseded by /following/v3/followers/{userId} and /following/v3/followers/search/{userId})",
      params: l,
      query: m.extend({ searchTerm: o.z.string().optional() }),
      response: o.z
        .union([o.z.array(v), o.z.array(k)])
        .nullable()
        .describe(
          "Plain-list rows, or UserProfile-shaped rows when searchTerm is present; null (with a 200) when the follow read is unavailable. Superseded by GET /following/v3/followers/{userId} (plain rows, 503 when unavailable) and GET /following/v3/followers/search/{userId} (TASK-5156)",
        ),
    },
    "GET /following/{userId}": {
      summary:
        "List the users a user is following (superseded by /following/v3/following/{userId})",
      params: o.z.object({
        userId: o.z.string().describe("Subject: cc user-id UUID or wallet"),
      }),
      query: m,
      response: o.z
        .array(z)
        .nullable()
        .describe(
          "null (with a 200) when the follow read is unavailable. Superseded by GET /following/v3/following/{userId}, which answers 503 instead (TASK-5156)",
        ),
    },
    "GET /following/v2/following/{userId}": {
      summary:
        "List the users a user is following (paginated), or search within them via searchTerm (superseded by /following/v3/following/{userId} and /following/v3/following/search/{userId})",
      params: l,
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .optional()
          .describe("Default 20, capped at 100"),
        offset: o.z.number().int().optional().describe("Default 0"),
        searchTerm: o.z.string().optional(),
        sort: m.shape.sort,
      }),
      response: o.z
        .union([o.z.array(z), o.z.array(i.userRow)])
        .nullable()
        .describe(
          "Plain-list rows, or UserProfile-shaped rows when searchTerm is present; null (with a 200) when the follow read is unavailable. Superseded by GET /following/v3/following/{userId} (plain rows, 503 when unavailable) and GET /following/v3/following/search/{userId} (TASK-5156)",
        ),
    },
    "GET /following/v3/followers/{userId}": (0, s.publicRead)("graph.read", {
      summary: "One page of a user's followers",
      params: l,
      query: p,
      response: o.z
        .array(v)
        .describe(
          "Plain-list rows in the requested order. `mutuals` is viewer-relative: on a signed-in read every row of a page of at most 100 rows carries it (a row without it means the signal was unavailable, never zero); it is never populated on the API host, which has no signed-in viewer. 503 when the follow read is unavailable",
        ),
      errors: { 503: !0 },
    }),
    "GET /following/v3/followers/search/{userId}": (0, s.publicRead)(
      "graph.read",
      {
        summary: "Search within a user's followers",
        params: l,
        query: b,
        response: o.z
          .array(k)
          .describe(
            "UserProfile-shaped rows in relevance order. `mutuals` is viewer-relative: on a signed-in read every row carries it (a row without it means the signal was unavailable, never zero); it is never populated on the API host, which has no signed-in viewer",
          ),
      },
    ),
    "GET /following/v3/following/{userId}": (0, s.publicRead)("graph.read", {
      summary: "One page of the users a user is following",
      params: o.z.object({
        userId: o.z.string().describe("Subject: cc user-id UUID or wallet"),
      }),
      query: p,
      response: o.z
        .array(z)
        .describe(
          "Plain-list rows in the requested order. 503 when the follow read is unavailable",
        ),
      errors: { 503: !0 },
    }),
    "GET /following/v3/following/search/{userId}": (0, s.publicRead)(
      "graph.read",
      {
        summary: "Search within the users a user is following",
        params: l,
        query: b,
        response: o.z
          .array(i.userRow)
          .describe("UserProfile-shaped rows in relevance order"),
      },
    ),
    "GET /following/v3/followers/count/{userId}": (0, s.publicRead)(
      "graph.read",
      { summary: "Get a user follower count (v3)", params: l, response: c },
    ),
    "GET /following/v3/following/count/{userId}": (0, s.publicRead)(
      "graph.read",
      { summary: "Get a user following count (v3)", params: l, response: c },
    ),
    "PUT /following/bulk-trade-notifications": {
      summary: "Enable trade notifications for all followed users",
      response: u,
    },
    "PUT /following/{userId}/trade-notifications": {
      summary: "Enable trade notifications for a followed user",
      params: l,
      response: h.describe(
        "The upserted preference identity; cc echoes no row",
      ),
    },
    "DELETE /following/{userId}/trade-notifications": {
      summary: "Disable trade notifications for a followed user",
      params: l,
      response: o.z.void(),
    },
  });
};
