// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.profileStub =
      r.normalizedProfile =
      r.profileCompetitionEntry =
      r.competitionEntryPhase =
      r.ACTIVE_COMPETITION_ENTRY_DESCRIPTION =
      r.CACHED_RESOLVED_AVATAR_DECORATION_DESCRIPTION =
      r.RESOLVED_AVATAR_DECORATION_DESCRIPTION =
      r.IS_PUMP_USER_DESCRIPTION =
      r.normalizedGeneratedMedia =
        void 0));
  let o = e.r(876543),
    n = e.r(617159);
  ((r.normalizedGeneratedMedia = o.z.object({
    pnlLoop: o.z.object({ uid: o.z.string(), durationSeconds: o.z.number() }),
    replayIntro: o.z
      .object({
        uid: o.z.string(),
        durationSeconds: o.z.number(),
        fireAt: o.z.number(),
      })
      .optional(),
  })),
    (r.IS_PUMP_USER_DESCRIPTION =
      "false = unclaimed shell: an identity minted when someone followed an outside wallet that never signed in, served under a generated username. Render it as a wallet (address or the viewer’s wallet label), never as an account. Treat absent as true."),
    (r.RESOLVED_AVATAR_DECORATION_DESCRIPTION =
      "The border to draw on this avatar as a decoration key (`legendary`, `epic`, `achievement:<id>`), never a url — the owner's pick while still earned, else the rarest tier ring the owner's achievements earn; null = no border. Draw it straight off the row: a client never fetches a user's achievements to draw a border (TASK-6093)."),
    (r.CACHED_RESOLVED_AVATAR_DECORATION_DESCRIPTION = `${r.RESOLVED_AVATAR_DECORATION_DESCRIPTION} Treat absent as null.`),
    (r.ACTIVE_COMPETITION_ENTRY_DESCRIPTION =
      "Squads only: the squad’s entry in the group competition whose registration is open or which is running (the earliest-starting one when several are); phase = registration before the start, live once it runs. null = the squad is not entered, or the account is a person. Absent on cached rows written before the field shipped: treat absent as null. Also null when cc’s competition read failed open: never render null as a confirmed non-entry."),
    (r.competitionEntryPhase = (0, n.openEnum)(
      ["registration", "live"],
      "registration before the competition starts, live once it runs",
    )),
    (r.profileCompetitionEntry = o.z.object({
      entryId: o.z
        .string()
        .describe(
          "The squad's entry id (UUID); '' until cc serves it, so gate on a non-empty value",
        ),
      competitionId: o.z.string(),
      competitionSlug: o.z.string(),
      phase: r.competitionEntryPhase,
    })),
    (r.normalizedProfile = o.z.object({
      userId: o.z.string(),
      username: o.z.string(),
      bio: o.z.string(),
      profileImageUrl: o.z.string(),
      headerImageUrl: o.z.string(),
      followerCount: o.z.number(),
      followingCount: o.z.number(),
      createdAt: o.z.string().nullable(),
      updatedAt: o.z.string().nullable(),
      walletAddress: o.z.string().nullable(),
      socials: o.z.array(
        o.z.object({
          provider: o.z.string(),
          username: o.z.string(),
          linkedAt: o.z.string().nullable(),
        }),
      ),
      isVerified: o.z.boolean(),
      verifiedBadgeVisible: o.z
        .boolean()
        .describe(
          "Badge rendering hint beside isVerified: show the checkmark only when both are true. The verified state itself is isVerified.",
        ),
      resolvedAvatarDecoration: o.z
        .string()
        .nullable()
        .optional()
        .describe(r.CACHED_RESOLVED_AVATAR_DECORATION_DESCRIPTION),
      kind: o.z.enum(["PERSON", "GROUP"]),
      memberCount: o.z.number(),
      membershipPolicy: o.z.literal("INVITE").nullable(),
      groupBadges: o.z.array(
        o.z.object({
          groupId: o.z.string(),
          username: o.z.string(),
          profileImageUrl: o.z.string().nullable(),
          role: o.z.string(),
        }),
      ),
      generatedMedia: r.normalizedGeneratedMedia.nullable(),
      isPumpUser: o.z.boolean().optional().describe(r.IS_PUMP_USER_DESCRIPTION),
      activeCompetitionEntry: r.profileCompetitionEntry
        .nullable()
        .optional()
        .describe(r.ACTIVE_COMPETITION_ENTRY_DESCRIPTION),
    })),
    (r.profileStub = r.normalizedProfile
      .pick({
        userId: !0,
        username: !0,
        profileImageUrl: !0,
        walletAddress: !0,
        kind: !0,
        isVerified: !0,
        verifiedBadgeVisible: !0,
        resolvedAvatarDecoration: !0,
      })
      .describe(
        "Embedded profile stub: the identity fields a sibling payload needs to render an account chip. A pick of normalizedProfile.",
      )));
};
