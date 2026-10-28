// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030),
    r = e.i(758045);
  let l = ["OWNER", "ADMIN", "MEMBER"],
    a = ["ACTIVE", "INVITED"],
    i = (e) => l.find((t) => t === e) ?? "UNSPECIFIED",
    s = (e) => a.find((t) => t === e) ?? "UNSPECIFIED",
    n = (e) => (e?.toLowerCase() === "group" ? "group" : "person"),
    o = r.z.string().nullish(),
    u = t.contract["GET /groups/search"].response.shape.results.element,
    c = u
      .pick({ userId: !0 })
      .extend({
        username: u.shape.username.nullish(),
        bio: u.shape.bio.nullish(),
        profileImageUrl: u.shape.profileImageUrl.nullish(),
        headerImageUrl: u.shape.headerImageUrl.nullish(),
        followerCount: u.shape.followerCount.nullish(),
        followingCount: u.shape.followingCount.nullish(),
        createdAt: u.shape.createdAt.nullish(),
        updatedAt: u.shape.updatedAt.nullish(),
        walletAddress: u.shape.walletAddress.nullish(),
        isVerified: u.shape.isVerified.nullish(),
        verifiedBadgeVisible: u.shape.verifiedBadgeVisible.nullish(),
        resolvedAvatarDecoration: u.shape.resolvedAvatarDecoration.nullish(),
        memberCount: u.shape.memberCount.nullish(),
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
        kind: n(e.kind),
        memberCount: e.memberCount ?? 0,
        createdAt: e.createdAt ?? null,
        updatedAt: e.updatedAt ?? null,
      })),
    d = t.contract["GET /groups/{groupId}/members"].response,
    m = d.shape.members.element,
    f = d.extend({
      members: m
        .extend({
          profile: c.nullish(),
          role: o,
          status: o,
          invitedBy: m.shape.invitedBy.nullish(),
          createdAt: m.shape.createdAt.nullish(),
          inCompetition: m.shape.inCompetition.nullish(),
        })
        .array(),
      hasMore: d.shape.hasMore.nullish(),
    }),
    p = t.contract["GET /groups/me"].response,
    h = p.shape.memberships.element,
    g = p.extend({
      memberships: h
        .extend({
          group: c.nullish(),
          role: o,
          status: o,
          invitedBy: h.shape.invitedBy.nullish(),
          createdAt: h.shape.createdAt.nullish(),
          inCompetition: h.shape.inCompetition.nullish(),
        })
        .array(),
      hasMore: p.shape.hasMore.nullish(),
    }),
    x = t.contract["GET /users/{id}"].response,
    b = x
      .pick({})
      .extend({
        address: x.shape.address.nullish(),
        userId: x.shape.userId.nullish(),
        username: x.shape.username.nullish(),
        profile_image: x.shape.profile_image.nullish(),
        header_image_url: x.shape.header_image_url.nullish(),
        member_count: x.shape.member_count.nullish(),
        bio: x.shape.bio.nullish(),
        followers: x.shape.followers.nullish(),
        following: x.shape.following.nullish(),
        kind: o,
        active_competition_entry: x.shape.active_competition_entry,
      }),
    w = t.contract["GET /groups/search"].response.extend({
      results: c.array(),
    });
  e.s([
    "C",
    0,
    (e) => "group" === n(e),
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
    i,
    "D",
    0,
    c,
    "F",
    0,
    (e) => {
      let t = f.parse(e);
      return {
        members: t.members.flatMap((e) =>
          e.profile
            ? [
                {
                  profile: e.profile,
                  role: i(e.role),
                  status: s(e.status),
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
                  role: i(e.role),
                  status: s(e.status),
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
    (e) => w.parse(e).results,
    "Q",
    0,
    b,
  ]);
};
