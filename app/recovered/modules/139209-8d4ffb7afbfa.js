// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.competitionsRoutes = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = e.r(617159),
    i = e.r(882668),
    l = e.r(603122),
    d = (0, a.openEnum)(
      ["group", "person"],
      "Who competes: squads (group) or individual traders (person); squads ship first, so treat an unknown value as unsupported",
    ),
    c = (0, a.openEnum)(
      ["upcoming", "registration", "live", "ended"],
      "cc's derived lifecycle at read time: upcoming (listed, registration not open yet), registration (joinable, no scores yet), live (scoring from startsAt), ended (closed; scores freeze once isFinal)",
    ),
    u = (0, a.openEnum)(
      [
        "REGISTRATION_CLOSED",
        "NOT_OWNER",
        "SIZE_BELOW_MIN",
        "SIZE_ABOVE_MAX",
        "HIDDEN",
        "BANNED",
        "NO_WALLET",
        "FULL",
        "KIND_MISMATCH",
        "NO_GROUP",
        "REGISTRATION_NOT_OPEN",
      ],
      "cc's CompetitionEligibilityReason suffix; each one is also the COMPETITION_<reason> 409 the register route answers",
    ),
    h = {
      username: o.z
        .string()
        .nullable()
        .describe(
          "Squad or trader name from the cc profile; null when the lookup missed",
        ),
      profileImageUrl: o.z.string().nullable(),
      xUsername: o.z
        .string()
        .nullable()
        .describe(
          "The participant's linked X handle (a trader's own link; a squad's is support-set); null when none is linked or the lookup missed",
        ),
      isVerified: o.z.boolean(),
      verifiedBadgeVisible: o.z
        .boolean()
        .describe(
          "Badge rendering hint beside isVerified: show the checkmark only when both are true",
        ),
    },
    m = o.z.object({
      entryId: o.z.string(),
      participantId: o.z
        .string()
        .describe(
          "cc account id of the participant: the squad (kind group) or the user (kind person)",
        ),
      kind: d,
      rank: o.z
        .number()
        .describe(
          "1-based ordinal rank by pnlUsd descending; a tie goes to the earlier registration, then entry id. 0 = not ranked: struck, a squad hidden from the PnL boards, no scoring wallet, or before the first build",
        ),
      pnlUsd: o.z
        .number()
        .describe(
          "Sum of the roster's window PnL in USD (realized + unrealized) — the ranking key",
        ),
      realizedPnlUsd: o.z.number(),
      unrealizedPnlUsd: o.z.number(),
      buySpendSol: o.z.number(),
      memberCount: o.z
        .number()
        .describe(
          "Roster size (snapshot rows, walletless members included); 0 before the snapshot at startsAt",
        ),
      membersFresh: o.z
        .number()
        .describe(
          "Roster members whose leg is inside the freshness bound; a stale member keeps its last-good legs in the sum",
        ),
      struck: o.z
        .boolean()
        .describe(
          "Disqualified for this competition: rank 0 and left out of the leaderboard entries, totalRanked, participants, top and winners; still served as the caller's own viewer entry and by entry detail",
        ),
      lastRefreshedAtMs: o.z
        .number()
        .describe(
          "Oldest refresh among the summed members (unix ms); the finalize time on a final board; 0 before the first build",
        ),
      positionsCount: o.z
        .number()
        .describe(
          "Person rows: the participant's live positions count, never sliced by positionsLimit; 0 for squads and on a final board",
        ),
      topPositions: o.z
        .array(i.pnlBoardTopPosition)
        .describe(
          "Person rows: largest fresh USD value first, sliced to positionsLimit; empty for squads and on a final board",
        ),
      walletAddress: o.z
        .string()
        .nullable()
        .describe(
          "Person rows: the trader's Solana board wallet snapshotted at competition start (base58); null for squads, a walletless member, and a rank-0 row before the first build",
        ),
      ...h,
    }),
    p = m.extend({
      prize: o.z
        .string()
        .nullable()
        .describe(
          "The amount of the prizes tier covering this row's rank; null when no tier covers it",
        ),
    }),
    b = o.z.object({
      id: o.z.string(),
      slug: o.z.string(),
      kind: d,
      title: o.z.string(),
      description: o.z.string().describe("May be empty"),
      prizeCopy: o.z
        .string()
        .describe(
          "Free-text prize headline shown as-is (prizes are paid by hand); may be empty. The per-rank amounts are prizes",
        ),
      imageUrl: o.z
        .string()
        .nullable()
        .describe("Card image URL on the images CDN; null when none is set"),
      prizes: o.z
        .array(
          o.z.object({
            rankFrom: o.z
              .number()
              .describe("First rank the tier covers, 1-based"),
            rankTo: o.z
              .number()
              .describe("Last rank the tier covers, inclusive; >= rankFrom"),
            amount: o.z
              .string()
              .describe(
                'Display text of the prize per rank, e.g. "$5,000" or "2 SOL"; a squad prize goes to the squad',
              ),
          }),
        )
        .describe(
          "Per-rank prize tiers, rankFrom ascending and non-overlapping (gaps allowed); empty when none are set",
        ),
      registrationOpensAt: o.z
        .string()
        .nullable()
        .describe(
          "ISO 8601; when registration opens. Before it the competition is listed as upcoming and register answers COMPETITION_REGISTRATION_NOT_OPEN",
        ),
      registrationClosesAt: o.z
        .string()
        .nullable()
        .describe(
          "ISO 8601; equal to endsAt when joining stays open for the run",
        ),
      startsAt: o.z
        .string()
        .nullable()
        .describe(
          "ISO 8601, on the hour UTC; every entry scores from here whenever it registered",
        ),
      endsAt: o.z.string().nullable().describe("ISO 8601, on the hour UTC"),
      minMembers: o.z.number().describe("1 for person competitions"),
      maxMembers: o.z.number().describe("1 for person competitions"),
      maxEntries: o.z.number().describe("Registration cap"),
      entriesCount: o.z
        .number()
        .describe("Entries registered so far, struck ones included"),
      participants: o.z
        .number()
        .describe(
          "Entries not struck (squads for a squad competition, traders for a person one); 0 when none or the count read failed",
        ),
      joinable: o.z
        .boolean()
        .describe(
          "Registration is open now (registrationOpensAt <= now < registrationClosesAt) and the competition is not full; says nothing about the caller's own eligibility",
        ),
      phase: c,
      isFinal: o.z
        .boolean()
        .describe(
          "True once the final result is persisted; scores no longer move, though a later strike or hide still drops a row",
        ),
      top: o.z
        .array(m)
        .describe(
          "Always present, [] when not applicable: phase registration or live only, the latest board build's ranks 1..3, rank ascending; [] before the first build, on a board read fault (list only) and in every other phase",
        ),
      winners: o.z
        .array(p)
        .describe(
          "Always present, [] when not applicable: phase ended only, the served ranks 1..N (N = the largest prizes rankTo, or 3 when prizes is empty) with the current strikes and hides applied, rank ascending; [] when nothing ranked, on a board read fault (list only) and in every other phase",
        ),
    }),
    g = o.z.object({
      entry: m
        .nullable()
        .describe(
          "The entry counting the viewer at any rank, rank 0 included; null when no entry counts them",
        ),
      eligibility: o.z.object({
        canRegister: o.z
          .boolean()
          .describe(
            "True when register would add a new entry now; false when an entry already counts the viewer, even with no reasons",
          ),
        reasons: o.z
          .array(u)
          .describe(
            "Every reason blocking registration; empty when canRegister",
          ),
        groupId: o.z
          .string()
          .nullable()
          .describe(
            "Squad competitions: the viewer's active squad; null when none (groupRole is then UNSPECIFIED)",
          ),
        groupRole: l.groupRoleKey,
      }),
      tosAcceptedAt: o.z
        .string()
        .nullable()
        .describe(
          "When the viewer accepted the trade competition terms (ISO 8601; one global acceptance per user, not per competition); null until they accept",
        ),
    }),
    w = o.z.object({
      userId: o.z.string().describe("cc user id of the roster member"),
      walletAddress: o.z
        .string()
        .nullable()
        .describe(
          "The member's Solana board wallet snapshotted with the roster, the wallet this leg was scored from; null when the member had none",
        ),
      pnlUsd: o.z
        .number()
        .describe(
          "The member's own realized + unrealized PnL in USD on this token inside the window",
        ),
      realizedPnlUsd: o.z.number(),
      unrealizedPnlUsd: o.z.number(),
      buySpendUsd: o.z
        .number()
        .describe(
          "The member's own buy spend in USD on this token inside the window",
        ),
    }),
    y = i.pnlBoardPosition.extend({
      pnlUsd: o.z
        .number()
        .describe(
          "Realized + unrealized PnL in USD on this token during the competition window — the reel is sorted by it, descending",
        ),
      realizedPnlUsd: o.z.number(),
      unrealizedPnlUsd: o.z.number(),
      buySpendUsd: o.z.number().describe("Buy spend in USD inside the window"),
      members: o.z
        .array(w)
        .describe(
          "Which roster members made this token's PnL, pnlUsd descending then userId. Their pnlUsd, realizedPnlUsd, unrealizedPnlUsd and buySpendUsd sum to the token's. Each member contributes only their own top-10 tokens by window PnL, so a member whose position on this token fell outside their own top 10 is absent here and uncounted in the token's sums. [] on a reel persisted before members shipped",
        ),
    }),
    f = i.pnlBoardPosition.extend({
      pnlUsd: o.z
        .number()
        .describe(
          "Realized + unrealized PnL in USD on this token as scored by the competition build, summed across the entry's members",
        ),
      realizedPnlUsd: o.z.number(),
      unrealizedPnlUsd: o.z.number(),
      buySpendUsd: o.z.number().describe("Buy spend in USD inside the window"),
      openingCostUsd: o.z
        .number()
        .describe(
          "Cost in USD of the amount already held at startsAt, scored as an opening buy; 0 when none",
        ),
      amountHeld: o.z
        .number()
        .describe(
          "Token amount the members hold now (UI units); a client showing open positions keeps rows with amountHeld > 0",
        ),
      costBasisUsd: o.z
        .number()
        .describe("Cost basis in USD of the amount held now; 0 when none"),
      priceMissing: o.z
        .boolean()
        .describe(
          "true when a member holds this token with no cost basis cc could price; valueUsd is then null",
        ),
      valueUsd: o.z
        .number()
        .nullable()
        .describe(
          "costBasisUsd + unrealizedPnlUsd, cc's served value (never re-priced live); null when priceMissing",
        ),
      pnlPercentage: o.z
        .number()
        .nullable()
        .describe(
          "pnlUsd / (buySpendUsd + openingCostUsd), a ratio (0.25 = +25%); null when that denominator is <= 0",
        ),
      members: o.z
        .array(w)
        .describe(
          "Which roster members' legs make this token's numbers, as cc ordered them",
        ),
    }),
    z = i.pnlBoardPosition.extend({
      ...h,
      entryId: o.z.string().describe("The ranked entry the trader counts for"),
      rank: o.z.number().int().describe("The entry's board rank (1-based)"),
      userId: o.z.string().describe("cc user id of the trader"),
      walletAddress: o.z
        .string()
        .nullable()
        .describe("The board wallet the leg scored on; null when cc sent none"),
      pnlUsd: o.z
        .number()
        .describe(
          "The trader's realized + unrealized PnL in USD on this token during the competition window, always > 0 — rows sort by it, descending",
        ),
      realizedPnlUsd: o.z.number(),
      unrealizedPnlUsd: o.z.number(),
      buySpendUsd: o.z.number().describe("Buy spend in USD inside the window"),
    }),
    v = o.z.object({
      userId: o.z.string().describe("cc user id of the roster member"),
      walletAddress: o.z
        .string()
        .nullable()
        .describe(
          "The Solana board wallet snapshotted at competition start; null when the member had none (counted in memberCount, scores nothing)",
        ),
      pnlUsd: o.z
        .number()
        .describe("The member's window PnL in USD (realized + unrealized)"),
      realizedPnlUsd: o.z.number(),
      unrealizedPnlUsd: o.z.number(),
      buySpendSol: o.z.number(),
      fresh: o.z
        .boolean()
        .describe(
          "False when the sum carries the member's last-good leg (or none)",
        ),
      lastRefreshedAtMs: o.z
        .number()
        .describe("Unix ms; 0 when never refreshed"),
      ...h,
    }),
    k = o.z.object({ id: o.z.string().describe("Competition id (UUID)") }),
    _ = m.extend({
      registeredAt: o.z.number().describe("Registration time (unix ms)"),
      strikeReason: o.z
        .string()
        .nullable()
        .describe("Active strike reason; null when not struck"),
      struckBy: o.z
        .string()
        .nullable()
        .describe(
          "Operator wallet or admin email that placed the active strike; null when not struck",
        ),
      struckByUserId: o.z.string().nullable(),
      struckAt: o.z
        .number()
        .nullable()
        .describe("Active strike time (unix ms); null when not struck"),
      hidden: o.z
        .boolean()
        .describe(
          "Group competitions: the squad is hidden from every PnL board (POST /pnl-leaderboard/groups/ban); always false for person entries",
        ),
    }),
    E = o.z.object({
      id: o.z.string().describe("Competition id (UUID)"),
      entryId: o.z.string().describe("Entry id (UUID)"),
    });
  r.competitionsRoutes = (0, n.defineRoutes)({
    "GET /competitions": (0, s.publicRead)("leaderboards.read", {
      summary:
        "Every competition in three viewer-independent buckets: upcoming, live (registration or live) and past (the 50 latest ended)",
      response: o.z.object({
        upcoming: o.z
          .array(b)
          .describe(
            "now < registrationOpensAt (phase upcoming), startsAt ascending",
          ),
        live: o.z
          .array(b)
          .describe(
            "registrationOpensAt <= now < endsAt (phase registration or live), startsAt ascending; these carry top",
          ),
        past: o.z
          .array(b)
          .describe(
            "At most 50 competitions with now >= endsAt (phase ended), the latest endsAt first; these carry winners",
          ),
      }),
    }),
    "GET /competitions/tos": {
      summary:
        "Whether the authenticated user accepted the trade competition terms (and when)",
      response: o.z.object({
        accepted: o.z.boolean(),
        acceptedAt: o.z
          .string()
          .nullable()
          .describe("ISO 8601 first acceptance; null when not accepted"),
      }),
    },
    "POST /competitions/tos/accept": {
      summary:
        "Record the authenticated user's trade competition terms acceptance (idempotent; echoes the original acceptance time)",
      response: o.z.object({
        acceptedAt: o.z.string().describe("ISO 8601 first acceptance"),
        alreadyAccepted: o.z
          .boolean()
          .describe(
            "true when an earlier acceptance stood; acceptedAt is that one",
          ),
      }),
    },
    "GET /competitions/{idOrSlug}": (0, s.publicRead)("leaderboards.read", {
      summary:
        "One competition by id or slug with its ranked board. `viewer` (own entry and eligibility) is viewer-relative: present on a signed-in read, absent on the API host",
      params: o.z.object({
        idOrSlug: o.z.string().describe("Competition id (UUID) or slug"),
      }),
      query: o.z.object({
        limit: o.z
          .number()
          .int()
          .optional()
          .describe(
            "Leaderboard rows served (default and ceiling 100; out-of-range values clamp).",
          ),
        positionsLimit: o.z
          .number()
          .int()
          .min(0)
          .optional()
          .describe(
            "Top positions returned per row (leaderboard, top, winners, viewer entry) as icons (default 3; values above 5 clamp to 5; 0 = count only). Squad rows carry none.",
          ),
      }),
      response: o.z.object({
        competition: b,
        leaderboard: o.z.object({
          builtAtMs: o.z
            .number()
            .describe(
              "When the served board was built (unix ms); 0 before the first build",
            ),
          startSec: o.z
            .number()
            .describe(
              "Scoring window start (calendar unix seconds) = startsAt — unlike windowStartSec on the rolling boards",
            ),
          endSec: o.z
            .number()
            .describe(
              "Scoring window end the served legs were read at (unix seconds): the last build while live, endsAt once final",
            ),
          totalRanked: o.z
            .number()
            .describe(
              "Ranked entries on the whole board (rank 1 and up); rank-0 rows are not counted",
            ),
          isFinal: o.z
            .boolean()
            .describe(
              "True when serving the persisted final result, overlaid with the current strikes and hides (ranks re-densify at read)",
            ),
          entries: o.z
            .array(m.extend(i.viewerFollowFields))
            .describe(
              "The top limit ranked rows, rank ascending: cc leaves rank-0 rows (struck, hidden, walletless, not yet built) out. Empty before the first build. isViewer/viewerFollows ride person rows on an authenticated read only",
            ),
        }),
        viewer: g
          .optional()
          .describe(
            "The caller's own entry (at any rank, rank 0 included) and eligibility. Present only on an authenticated read that cc resolved to a user; omitted, never null, when anonymous, or when the viewer read failed or missed its 1 s wait",
          ),
      }),
    }),
    "POST /competitions/{id}/register": {
      summary:
        "Register for a competition: the caller's squad (owner only, groupId) or the caller; idempotent. A 429 COMPETITION_REGISTER_BUSY means cc is saturated: retry after the Retry-After header (seconds)",
      params: k,
      body: o.z.object({
        groupId: o.z
          .uuid()
          .optional()
          .describe(
            "Squad competitions: the caller's squad (cc group id); omit for a person competition",
          ),
      }),
      response: o.z.object({
        entry: m.describe(
          "The entry, existing or new; unranked until the board builds",
        ),
        snapshotCount: o.z
          .number()
          .describe(
            "Roster rows written now (registration after startsAt); 0 when the roster snapshots at startsAt",
          ),
        excludedUserIds: o.z
          .array(o.z.string())
          .describe(
            "Members left out of the snapshot because another entry already counts them",
          ),
      }),
      emits: [
        "COMPETITION_REGISTRATION_CLOSED",
        "COMPETITION_NOT_OWNER",
        "COMPETITION_SIZE_BELOW_MIN",
        "COMPETITION_SIZE_ABOVE_MAX",
        "COMPETITION_HIDDEN",
        "COMPETITION_BANNED",
        "COMPETITION_NO_WALLET",
        "COMPETITION_FULL",
        "COMPETITION_KIND_MISMATCH",
        "COMPETITION_NO_GROUP",
        "COMPETITION_REGISTRATION_NOT_OPEN",
        "COMPETITION_REGISTER_BUSY",
      ],
      errors: {
        429: o.z
          .object({ message: o.z.string() })
          .describe("The route throttle (10/min); no 'error' key"),
      },
    },
    "GET /competitions/{id}/entries/{entryId}": (0, s.publicRead)(
      "leaderboards.read",
      {
        summary:
          "One entry with its snapshot roster and each member's counted legs, pnlUsd descending",
        params: o.z.object({
          id: o.z.string().describe("Competition id (UUID)"),
          entryId: o.z.string().describe("Entry id (UUID)"),
        }),
        response: o.z.object({
          entry: m,
          members: o.z
            .array(v)
            .describe(
              "Snapshot roster with counted legs, pnlUsd descending; empty before the snapshot at startsAt",
            ),
        }),
      },
    ),
    "GET /competitions/{id}/entries/{entryId}/highlights": (0, s.publicRead)(
      "leaderboards.read",
      {
        summary:
          "One entry's highlight reel: its top tokens by PnL during the competition window, coin display fields attached",
        params: o.z.object({
          id: o.z.string().describe("Competition id (UUID)"),
          entryId: o.z.string().describe("Entry id (UUID)"),
        }),
        query: o.z.object({
          limit: o.z
            .number()
            .int()
            .optional()
            .describe(
              "Tokens returned (default and ceiling 10; out-of-range values clamp)",
            ),
        }),
        response: o.z.object({
          entryId: o.z.string(),
          tokens: o.z
            .array(y)
            .describe(
              "Top tokens by window PnL summed across the entry's roster, descending, banned mints excluded, each carrying the roster members whose legs it sums; from the live fold while the competition runs, frozen with the final board once it ends. Empty before the first build and for competitions finalized before the reel shipped",
            ),
        }),
      },
    ),
    "GET /competitions/{id}/entries/{entryId}/positions": (0, s.publicRead)(
      "leaderboards.read",
      {
        summary:
          "One entry's scored legs merged per token with the members holding each, every page sliced from one cc build (one builtAtMs). 409 when the competition is not live (before startsAt or once results exist); 503 while cc cannot serve the read",
        params: o.z.object({
          id: o.z.string().describe("Competition id (UUID)"),
          entryId: o.z.string().describe("Entry id (UUID)"),
        }),
        query: o.z.object({
          page: o.z
            .number()
            .int()
            .min(0)
            .max(Number.MAX_SAFE_INTEGER)
            .optional()
            .describe("0-indexed page (default 0)"),
          pageSize: o.z
            .number()
            .int()
            .min(1)
            .max(200)
            .optional()
            .describe("Rows per page (default 50, ceiling 200)"),
        }),
        response: o.z.object({
          entryId: o.z.string(),
          entryPnlUsd: o.z
            .number()
            .describe("The entry's scored PnL in USD on this build"),
          entryPnlPercentage: o.z
            .number()
            .nullable()
            .describe(
              "entryPnlUsd / the sum of (buySpendUsd + openingCostUsd) over every row of the build, a ratio; null when complete is false or that denominator is <= 0",
            ),
          builtAtMs: o.z
            .number()
            .describe(
              "When cc built the scored legs every page is cut from (epoch ms)",
            ),
          complete: o.z
            .boolean()
            .describe(
              "false when legs are boot-seeded or the build changed mid-read; rows then do not sum. When true, rows[].pnlUsd over every page sums to entryPnlUsd",
            ),
          total: o.z
            .number()
            .int()
            .describe("Rows across every page of this build"),
          struck: o.z
            .boolean()
            .describe(
              "true when moderation struck the entry; clients show it as disqualified",
            ),
          page: o.z.number().int(),
          pageSize: o.z.number().int(),
          rows: o.z
            .array(f)
            .describe(
              "This page of the entry's tokens in cc's order (never re-sorted), coin display fields attached",
            ),
        }),
      },
    ),
    "GET /competitions/{id}/highlights": (0, s.publicRead)(
      "leaderboards.read",
      {
        summary:
          "The competition's biggest winning legs across every ranked entry, one card per trader by default, coin and profile display fields attached. Rows are capped per trader before any chain filter: a client that drops chains thins the list instead of refilling it, so ask for every chain or raise perMemberLimit.",
        params: o.z.object({
          id: o.z.string().describe("Competition id (UUID)"),
        }),
        query: o.z.object({
          limit: o.z
            .number()
            .int()
            .optional()
            .describe(
              "Rows returned (default and ceiling 20; 0 and negatives clamp to 1, values above the cap to the cap)",
            ),
          perMemberLimit: o.z
            .number()
            .int()
            .optional()
            .describe(
              "Rows per trader (default 1, ceiling 10; 0 and negatives clamp to 1, values above the cap to the cap)",
            ),
        }),
        response: o.z.object({
          competitionId: o.z.string(),
          builtAtMs: o.z
            .number()
            .describe(
              "When the board build these rows come from ran (epoch ms)",
            ),
          isFinal: o.z
            .boolean()
            .describe(
              "true once the competition ended and the rows derive from the persisted final board; false while live",
            ),
          rows: o.z
            .array(z)
            .describe(
              "Wins only (pnlUsd > 0): every ranked entry's members' top-token legs, pnlUsd descending, at most perMemberLimit per trader; from the live board build while the competition runs, from the final board (strikes, hides and bans applied) once it ends. Empty before the first build and for final boards persisted before token members shipped",
            ),
        }),
      },
    ),
    "GET /competitions/{id}/moderation/entries": {
      summary:
        "Moderator roster: every entry, struck and hidden ones included (pump.competitions.moderate)",
      params: k,
      response: o.z.object({
        competitionId: o.z.string(),
        final: o.z
          .boolean()
          .describe(
            "Scores persisted; only strikes and hides still move ranks",
          ),
        entries: o.z
          .array(_)
          .describe(
            "Board order: ranked rows rank ascending, then rank-0 rows by registration",
          ),
      }),
    },
    "POST /competitions/{id}/entries/{entryId}/strike": {
      summary:
        "Strike (disqualify) a competition entry (pump.competitions.moderate)",
      params: E,
      body: o.z.object({ reason: o.z.string().trim().min(3).max(500) }),
      response: o.z.object({
        entryId: o.z.string(),
        changed: o.z
          .boolean()
          .describe("false when the entry was already struck"),
      }),
    },
    "POST /competitions/{id}/entries/{entryId}/unstrike": {
      summary: "Lift a competition entry strike (pump.competitions.moderate)",
      params: E,
      body: o.z.object({ reason: o.z.string().trim().max(500).optional() }),
      response: o.z.object({
        entryId: o.z.string(),
        changed: o.z.boolean().describe("false when no active strike stood"),
      }),
    },
  });
};
