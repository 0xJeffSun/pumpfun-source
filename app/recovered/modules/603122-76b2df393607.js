// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.groupsRoutes = r.groupRoleKey = void 0));
  let o = e.r(876543),
    n = e.r(183184),
    s = e.r(785036),
    a = e.r(890664),
    i = e.r(617159);
  r.groupRoleKey = (0, i.openEnum)(
    ["OWNER", "ADMIN", "MEMBER", "UNSPECIFIED"],
    "cc's GroupRole name, an upstream-owned open set: treat unknown values as UNSPECIFIED (TASK-4734)",
  );
  let l = (0, i.openEnum)(
      ["INVITED", "ACTIVE", "UNSPECIFIED"],
      "cc's GroupMemberStatus name, an upstream-owned open set: treat unknown values as UNSPECIFIED (TASK-4734)",
    ),
    d =
      "true when this squad is entered in the group competition whose registration is open or which is running AND this member is on its roster (after the start snapshot) or eligible for it (before the start); false when the squad is not entered or the member is not counted. Also false when the roster read failed open.",
    c = o.z.object({
      profile: a.normalizedProfile.nullable(),
      role: r.groupRoleKey,
      status: l,
      invitedBy: o.z
        .string()
        .nullable()
        .describe(
          "Inviter's cc user id; null when the inviter's account was deleted",
        ),
      createdAt: o.z
        .string()
        .nullable()
        .describe("Invite time (ISO 8601), unchanged by acceptance"),
      inCompetition: o.z.boolean().describe(d),
    }),
    u = o.z.object({ members: o.z.array(c), hasMore: o.z.boolean() }),
    h = o.z.object({
      memberships: o.z.array(
        o.z.object({
          group: a.normalizedProfile.nullable(),
          role: r.groupRoleKey,
          status: l,
          invitedBy: o.z.string().nullable(),
          createdAt: o.z.string().nullable(),
          inCompetition: o.z.boolean().describe(d),
        }),
      ),
      hasMore: o.z.boolean(),
    }),
    m = o.z.object({
      profile: a.normalizedProfile.describe(
        "profile.userId is the group id (groups are profiles; read them via GET /users/{id} too)",
      ),
    }),
    p = o.z.object({
      status: o.z
        .enum(["INVITED", "ACTIVE"])
        .optional()
        .describe("Omitted matches every status"),
      limit: o.z.number().int().min(1).max(200).optional(),
      offset: o.z.number().int().min(0).optional(),
    });
  r.groupsRoutes = (0, n.defineRoutes)({
    "GET /groups/search": {
      summary: "Search squads by name or linked X handle",
      query: o.z.object({
        searchTerm: o.z
          .string()
          .min(1)
          .max(50)
          .describe(
            "cc trims it; under 2 chars answers an empty page rather than erroring",
          ),
        limit: o.z.number().int().min(1).max(100).optional(),
        offset: o.z.number().int().min(0).max(500).optional(),
      }),
      response: o.z.object({
        results: o.z
          .array(a.normalizedProfile)
          .describe(
            "Squad profiles, best-ranked first (exact > prefix > fuzzy, then follower count)",
          ),
      }),
    },
    "POST /groups": {
      summary: "Create a group owned by the authenticated user",
      body: o.z.object({
        username: o.z
          .string()
          .min(1)
          .describe(
            "Shares the person username namespace, rules, and uniqueness (cc validates)",
          ),
        bio: o.z.string().optional(),
        profileImageUrl: o.z
          .string()
          .optional()
          .describe(
            "Non-CDN urls rehost through the moderated lane (same hosts as banners); '' passes through",
          ),
        headerImageUrl: o.z
          .string()
          .optional()
          .describe(
            "IPFS/preset urls rehost through the moderated lane; CC-CDN urls persist directly",
          ),
        leaveCurrentGroup: o.z
          .boolean()
          .optional()
          .describe(
            "Consent to atomically leave the caller's current squad first; owning it is a 409 ACTIVE_OWNER",
          ),
      }),
      response: m,
      emits: [
        "ALREADY_EXISTS",
        "COOLDOWN",
        "INVALID_USERNAME",
        "ALREADY_IN_GROUP",
        "GROUP_FULL",
        "ACTIVE_OWNER",
        "ACTING_USER_INVALID",
        "GROUP_ACTOR_REQUIRED",
        "USER_BANNED",
        "NOT_AUTHORIZED",
      ],
    },
    "GET /groups/me": {
      summary:
        "The authenticated user's group memberships (ACTIVE) and pending invites (INVITED)",
      query: p,
      response: h,
    },
    "GET /groups/of/{id}": {
      summary:
        "A user's group memberships by cc user id or wallet (INVITED rows included when unfiltered)",
      params: o.z.object({ id: o.z.string() }),
      query: p,
      response: h,
    },
    "GET /groups/{groupId}/members": (0, s.publicRead)("graph.read", {
      summary:
        "A page of a group's members, owner first (the INVITED view is owner/admin-only)",
      params: o.z.object({ groupId: o.z.string() }),
      query: p,
      response: u,
    }),
    "GET /groups/{groupId}/members/pnl": (0, s.publicRead)("graph.read", {
      summary:
        "The group's active members ranked by windowed PnL (members tab); empty rows when no fold is published",
      params: o.z.object({ groupId: o.z.string() }),
      query: o.z.object({ period: o.z.enum(["1d", "1w", "1m"]) }),
      response: o.z.object({
        period: o.z.string(),
        builtAtMs: o.z
          .number()
          .describe(
            "When cc published the fold the rows come from (unix ms); 0 when no fold is published",
          ),
        windowStartSec: o.z.number().describe("Window start (unix seconds)"),
        rows: o.z
          .array(
            o.z.object({
              userId: o.z.string().describe("cc user id of the member"),
              walletAddress: o.z
                .string()
                .describe(
                  "The canonical SVM wallet the row was folded for (base58)",
                ),
              pnlUsd: o.z
                .number()
                .describe(
                  "Windowed PnL in USD (realized + unrealized) for the period",
                ),
            }),
          )
          .describe(
            "Active members with a counted fold row, pnlUsd descending. Between fold publishes the last published board is served for up to 15 minutes; empty when the group has none or no board was published in that time",
          ),
      }),
    }),
    "POST /groups/{groupId}/invites": {
      summary: "Invite a person into the group (owner/admin only)",
      params: o.z.object({ groupId: o.z.string() }),
      body: o.z.object({
        userId: o.z
          .string()
          .describe(
            "cc user id (UUID) of the person to invite — writes never resolve wallets",
          ),
      }),
      response: o.z.void(),
      emits: [
        "ALREADY_EXISTS",
        "COOLDOWN",
        "INVALID_USERNAME",
        "ALREADY_IN_GROUP",
        "GROUP_FULL",
        "ACTIVE_OWNER",
        "ACTING_USER_INVALID",
        "GROUP_ACTOR_REQUIRED",
        "USER_BANNED",
        "NOT_AUTHORIZED",
      ],
    },
    "POST /groups/{groupId}/invites/respond": {
      summary: "Accept or decline the authenticated user's pending invite",
      params: o.z.object({ groupId: o.z.string() }),
      body: o.z.object({
        accept: o.z
          .boolean()
          .describe(
            "True accepts the caller's pending invite; false declines (deletes the row)",
          ),
        leaveCurrentGroup: o.z
          .boolean()
          .optional()
          .describe(
            "With accept: consent to atomically leave the caller's current squad first; owning it is a 409 ACTIVE_OWNER, and a full target (409 GROUP_FULL) refuses before the leave",
          ),
      }),
      response: o.z.void(),
      emits: [
        "ALREADY_EXISTS",
        "COOLDOWN",
        "INVALID_USERNAME",
        "ALREADY_IN_GROUP",
        "GROUP_FULL",
        "ACTIVE_OWNER",
        "ACTING_USER_INVALID",
        "GROUP_ACTOR_REQUIRED",
        "USER_BANNED",
        "NOT_AUTHORIZED",
      ],
    },
    "DELETE /groups/{groupId}/members/{userId}": {
      summary:
        "Remove a member or revoke an invite; removing yourself is self-leave",
      params: o.z.object({ groupId: o.z.string(), userId: o.z.string() }),
      response: o.z.void(),
      emits: [
        "ALREADY_EXISTS",
        "COOLDOWN",
        "INVALID_USERNAME",
        "ALREADY_IN_GROUP",
        "GROUP_FULL",
        "ACTIVE_OWNER",
        "ACTING_USER_INVALID",
        "GROUP_ACTOR_REQUIRED",
        "USER_BANNED",
        "NOT_AUTHORIZED",
      ],
    },
    "PATCH /groups/{groupId}/members/{userId}/role": {
      summary:
        "Set an active member's role (owner only); OWNER transfers ownership",
      params: o.z.object({ groupId: o.z.string(), userId: o.z.string() }),
      body: o.z.object({ role: o.z.enum(["OWNER", "ADMIN", "MEMBER"]) }),
      response: c,
      emits: [
        "ALREADY_EXISTS",
        "COOLDOWN",
        "INVALID_USERNAME",
        "ALREADY_IN_GROUP",
        "GROUP_FULL",
        "ACTIVE_OWNER",
        "ACTING_USER_INVALID",
        "GROUP_ACTOR_REQUIRED",
        "USER_BANNED",
        "NOT_AUTHORIZED",
      ],
    },
    "PATCH /groups/{groupId}": {
      summary:
        "Update the group's settings and profile info (username/bio/profileImageUrl are owner-only)",
      params: o.z.object({ groupId: o.z.string() }),
      body: o.z.object({
        membershipPolicy: o.z
          .literal("INVITE")
          .optional()
          .describe(
            "INVITE is the only policy at launch; omitted leaves it untouched",
          ),
        username: o.z
          .string()
          .min(1)
          .optional()
          .describe(
            "Owner-only. Shares the person username namespace, rules, and uniqueness (cc validates)",
          ),
        bio: o.z
          .string()
          .optional()
          .describe(
            "Owner-only. Empty string clears it, omitted leaves it untouched",
          ),
        profileImageUrl: o.z
          .string()
          .optional()
          .describe(
            "Owner-only. Empty string clears it; non-CDN urls rehost through the moderated lane",
          ),
        headerImageUrl: o.z
          .string()
          .optional()
          .describe(
            "Empty string clears it, omitted leaves it untouched; non-CDN urls rehost",
          ),
      }),
      response: m,
      emits: [
        "ALREADY_EXISTS",
        "COOLDOWN",
        "INVALID_USERNAME",
        "ALREADY_IN_GROUP",
        "GROUP_FULL",
        "ACTIVE_OWNER",
        "ACTING_USER_INVALID",
        "GROUP_ACTOR_REQUIRED",
        "USER_BANNED",
        "NOT_AUTHORIZED",
      ],
    },
    "DELETE /groups/{groupId}": {
      summary:
        "Delete the group and its content (owner only); idempotent upstream",
      params: o.z.object({ groupId: o.z.string() }),
      response: o.z.void(),
      emits: [
        "ALREADY_EXISTS",
        "COOLDOWN",
        "INVALID_USERNAME",
        "ALREADY_IN_GROUP",
        "GROUP_FULL",
        "ACTIVE_OWNER",
        "ACTING_USER_INVALID",
        "GROUP_ACTOR_REQUIRED",
        "USER_BANNED",
        "NOT_AUTHORIZED",
      ],
    },
  });
};
