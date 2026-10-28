// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.profileOverviewRoutes = r.PROFILE_OVERVIEW_LEGS = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = e.r(890664),
    i = e.r(896727);
  r.PROFILE_OVERVIEW_LEGS = [
    "counts",
    "verified",
    "badges",
    "banned",
    "created_coins",
    "follows",
    "follows_you",
    "dm_eligible",
    "mutuals",
  ];
  let l = (e, t) =>
    e
      .nullable()
      .describe(
        `${t}. null = this leg degraded on this request (named in degraded).`,
      );
  r.profileOverviewRoutes = (0, n.defineRoutes)({
    "GET /users/{id}/overview": (0, s.publicRead)("profiles.read", {
      summary:
        "The profile header in one read: profile row, follow counts, verified and achievement badges, ban state, created-coins count and, for a signed-in viewer, the viewer-relative follow, DM and mutuals state. 404 for a cc user id with no account, like GET /users/{id}; a wallet with none is served as an external wallet.",
      params: o.z.object({
        id: o.z
          .string()
          .describe("cc user-id UUID or base58 wallet; echoed back as address"),
      }),
      response: o.z.object({
        address: o.z.string().describe("The id as sent"),
        profile: i.userRow
          .nullable()
          .describe(
            "null with HTTP 200 = a wallet with no cc account (an external wallet); a user id with none is a 404. A cc transport failure is a 503, never null.",
          ),
        isPumpUser: o.z.boolean().describe("profile !== null"),
        counts: o.z
          .object({
            followers: l(o.z.number(), "Follower count"),
            following: l(o.z.number(), "Following count"),
          })
          .describe("Both null when the counts leg degraded"),
        verified: l(
          o.z.boolean(),
          "Verified-profile badge; false for a wallet with no cc account",
        ),
        achievementBadgeIds: l(
          o.z.array(o.z.string()),
          "Top achievement badge ids for the avatar chip; [] for a wallet with no cc account",
        ),
        banned: l(
          o.z.boolean(),
          "Global user ban, cc verdict (moderation/ban); false when not banned",
        ),
        createdCoinsCount: l(
          o.z.number(),
          "Coins created by the canonical wallet; 0 for a walletless account",
        ),
        viewer: o.z
          .object({
            isViewer: o.z
              .boolean()
              .describe(
                "The viewer is the profile owner; every other field is null without degrading",
              ),
            follows: l(o.z.boolean(), "Viewer follows the profile"),
            followsYou: l(
              o.z.boolean(),
              "Profile follows the viewer; false for a wallet with no cc account",
            ),
            dmEligible: l(
              o.z.boolean(),
              "cc says the pair can DM right now; false for a wallet with no cc account",
            ),
            mutuals: l(
              o.z.object({
                totalCount: o.z
                  .number()
                  .describe("Exact size of the whole mutual set"),
                preview: o.z.array(a.profileStub),
              }),
              "Accounts the viewer follows that also follow the profile, most-followed first",
            ),
          })
          .optional()
          .describe("Absent on anonymous responses"),
        degraded: o.z
          .array(o.z.enum(r.PROFILE_OVERVIEW_LEGS))
          .describe(
            "Legs that failed, timed out or could only serve a fail-open blank (verified, badges) on this request. Re-issue exactly those against their dedicated routes instead of retrying the aggregate. An anonymous response with a non-empty list is served no-store; a complete one is edge-cacheable with Vary: Authorization, Cookie.",
          ),
      }),
    }),
  });
};
