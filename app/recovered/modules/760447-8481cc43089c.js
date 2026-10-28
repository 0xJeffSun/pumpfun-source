// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030),
    r = e.i(758045);
  let l = ["OWNER", "ADMIN", "MEMBER"],
    i = ["ACTIVE", "INVITED"],
    a = (e) => l.find((t) => t === e) ?? "UNSPECIFIED",
    n = (e) => i.find((t) => t === e) ?? "UNSPECIFIED",
    s = (e) => (e?.toLowerCase() === "group" ? "group" : "person"),
    o = r.z.string().nullish(),
    d = t.contract["GET /groups/search"].response.shape.results.element,
    u = d
      .pick({ userId: !0 })
      .extend({
        username: d.shape.username.nullish(),
        bio: d.shape.bio.nullish(),
        profileImageUrl: d.shape.profileImageUrl.nullish(),
        headerImageUrl: d.shape.headerImageUrl.nullish(),
        followerCount: d.shape.followerCount.nullish(),
        followingCount: d.shape.followingCount.nullish(),
        createdAt: d.shape.createdAt.nullish(),
        updatedAt: d.shape.updatedAt.nullish(),
        walletAddress: d.shape.walletAddress.nullish(),
        isVerified: d.shape.isVerified.nullish(),
        verifiedBadgeVisible: d.shape.verifiedBadgeVisible.nullish(),
        resolvedAvatarDecoration: d.shape.resolvedAvatarDecoration.nullish(),
        memberCount: d.shape.memberCount.nullish(),
        kind: o,
      })
      .transform((e) => ({
        userId: e.userId,
        username: e.username ?? "",
        bio: e.bio || null,
        profileImage: e.profileImageUrl || null,
        headerImageUrl: e.headerImageUrl || null,
        walletAddress: e.walletAddress || null,
        followers: e.followerCount ?? 0,
        following: e.followingCount ?? 0,
        isVerified: e.isVerified ?? !1,
        verifiedBadgeVisible: !1 !== e.verifiedBadgeVisible,
        resolvedAvatarDecoration: e.resolvedAvatarDecoration ?? null,
        kind: s(e.kind),
        memberCount: e.memberCount ?? 0,
        createdAt: e.createdAt ?? null,
        updatedAt: e.updatedAt ?? null,
      })),
    c = t.contract["GET /groups/{groupId}/members"].response,
    m = c.shape.members.element,
    p = c.extend({
      members: m
        .extend({
          profile: u.nullish(),
          role: o,
          status: o,
          invitedBy: m.shape.invitedBy.nullish(),
          createdAt: m.shape.createdAt.nullish(),
          inCompetition: m.shape.inCompetition.nullish(),
        })
        .array(),
      hasMore: c.shape.hasMore.nullish(),
    }),
    h = t.contract["GET /groups/me"].response,
    f = h.shape.memberships.element,
    g = h.extend({
      memberships: f
        .extend({
          group: u.nullish(),
          role: o,
          status: o,
          invitedBy: f.shape.invitedBy.nullish(),
          createdAt: f.shape.createdAt.nullish(),
          inCompetition: f.shape.inCompetition.nullish(),
        })
        .array(),
      hasMore: h.shape.hasMore.nullish(),
    }),
    y = t.contract["GET /users/{id}"].response,
    b = y
      .pick({})
      .extend({
        address: y.shape.address.nullish(),
        userId: y.shape.userId.nullish(),
        username: y.shape.username.nullish(),
        profile_image: y.shape.profile_image.nullish(),
        header_image_url: y.shape.header_image_url.nullish(),
        member_count: y.shape.member_count.nullish(),
        bio: y.shape.bio.nullish(),
        followers: y.shape.followers.nullish(),
        following: y.shape.following.nullish(),
        kind: o,
        active_competition_entry: y.shape.active_competition_entry,
      }),
    v = t.contract["GET /groups/search"].response.extend({
      results: u.array(),
    });
  e.s([
    "C",
    0,
    (e) => "group" === s(e),
    "h",
    0,
    (e) => ({
      groupId: e.userId,
      username: e.username || null,
      bio: e.bio,
      profileImage: e.profileImage,
      headerImageUrl: e.headerImageUrl,
      memberCount: e.memberCount,
      followers: e.followers,
      following: e.following,
      activeCompetitionEntry: null,
    }),
    "t",
    0,
    ({ row: e, groupId: t }) => ({
      groupId: t,
      username: e.username ?? null,
      bio: e.bio ?? null,
      profileImage: e.profile_image ?? null,
      headerImageUrl: e.header_image_url ?? null,
      memberCount: e.member_count ?? 0,
      followers: e.followers ?? 0,
      following: e.following ?? 0,
      activeCompetitionEntry: e.active_competition_entry
        ? {
            competitionId: e.active_competition_entry.competition_id,
            competitionSlug: e.active_competition_entry.competition_slug,
            entryId: e.active_competition_entry.entry_id,
            phase: e.active_competition_entry.phase,
          }
        : null,
    }),
    "E",
    0,
    a,
    "D",
    0,
    u,
    "F",
    0,
    (e) => {
      let t = p.parse(e);
      return {
        members: t.members.flatMap((e) =>
          e.profile
            ? [
                {
                  profile: e.profile,
                  role: a(e.role),
                  status: n(e.status),
                  invitedBy: e.invitedBy ?? null,
                  createdAt: e.createdAt ?? null,
                },
              ]
            : [],
        ),
        hasMore: t.hasMore ?? !1,
        rawCount: t.members.length,
      };
    },
    "n",
    0,
    (e) => {
      let t = g.parse(e);
      return {
        memberships: t.memberships.flatMap((e) =>
          e.group
            ? [
                {
                  squad: e.group,
                  role: a(e.role),
                  status: n(e.status),
                  invitedBy: e.invitedBy ?? null,
                  createdAt: e.createdAt ?? null,
                },
              ]
            : [],
        ),
        hasMore: t.hasMore ?? !1,
        rawCount: t.memberships.length,
      };
    },
    "A",
    0,
    (e) => v.parse(e).results,
    "Q",
    0,
    b,
  ]);
};
