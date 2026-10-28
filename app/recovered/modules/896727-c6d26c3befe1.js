// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e, t, r) => {
  (Object.defineProperty(r, "__esModule", { value: !0 }),
    (r.userRow = r.userGroupBadge = void 0));
  let o = e.r(876543),
    n = e.r(617159),
    s = e.r(890664);
  ((r.userGroupBadge = o.z.object({
    group_id: o.z.string(),
    username: o.z.string(),
    profile_image_url: o.z.string().nullable(),
    role: (0, n.openEnum)(
      ["OWNER", "ADMIN", "MEMBER", "UNSPECIFIED"],
      "cc's GroupRole name, an upstream-owned open set: render unknown values as a plain member (TASK-4734)",
    ),
  })),
    (r.userRow = o.z.object({
      address: o.z.string(),
      userId: o.z.string().optional(),
      username: o.z.string().nullable(),
      profile_image: o.z.string().nullable(),
      header_image_url: o.z.string().nullable().optional(),
      avatar_decoration: o.z
        .string()
        .nullable()
        .optional()
        .describe(
          "The owner's avatar decoration (border effect) PICK as a decoration key — `legendary`, `epic`, `none` (an explicit no-border), `achievement:<id>` — never a url: the client owns the key -> artwork catalog. For the owner's chooser (which tile is selected); the border to draw is resolved_avatar_decoration. null or absent means no pick. Served on GET /users/{id} and POST /users/batch rows; absent on rows cc did not produce",
        ),
      resolved_avatar_decoration: o.z
        .string()
        .nullable()
        .optional()
        .describe(
          "The border to draw on this avatar, resolved from the owner's pick and achievements (TASK-6093): the pick while still earned, else the rarest tier ring the achievements earn (`legendary`, `epic`); null means no border (an explicit `none` pick, or nothing earned). Same key grammar as avatar_decoration. Served on GET /users/{id} and POST /users/batch rows — never fetch a user's achievements to draw a border. Absent on rows cc did not produce. A newly earned tier can take up to an hour to show to other viewers; the owner's own view updates immediately",
        ),
      kind: o.z.enum(["person", "group"]).optional(),
      member_count: o.z.number().optional(),
      group_badges: o.z.array(r.userGroupBadge).optional(),
      active_competition_entry: o.z
        .object({
          entry_id: o.z
            .string()
            .describe(
              "The squad's entry id (UUID); '' until cc serves it, so gate on a non-empty value",
            ),
          competition_id: o.z.string(),
          competition_slug: o.z.string(),
          phase: s.competitionEntryPhase,
        })
        .nullable()
        .optional()
        .describe(s.ACTIVE_COMPETITION_ENTRY_DESCRIPTION),
      bio: o.z.string().nullable(),
      followers: o.z.number(),
      following: o.z.number(),
      last_username_update_timestamp: o.z
        .number()
        .nullable()
        .optional()
        .describe(
          "Unix epoch ms of the last username change; null when never renamed. Served by the single-profile read and on labelled-wallet search rows; absent from batch and hydrated search-v2 rows (cc batch profile read omits it, TASK-4734)",
        ),
      x_username: o.z.string().nullable(),
      wallet_label: o.z.string().optional(),
      is_pump_user: o.z.boolean().optional(),
      is_banned: o.z.boolean().optional(),
      canonical_svm_wallet: o.z.string().optional(),
      canonical_evm_wallet: o.z.string().optional(),
      last_active_at: o.z
        .string()
        .nullable()
        .optional()
        .describe(
          "ISO time of the account's latest authenticated request (~1 min granularity, kept for one day). Viewer-relative: served on GET /users/{id} and POST /users/batch rows to a signed-in viewer, for accounts the viewer follows and the viewer's own row, null otherwise (not followed, never seen, degraded read) — render null as unknown. Absent for anonymous callers, on the API host, and on every other row-serving read (TASK-4935)",
        ),
    })));
};
