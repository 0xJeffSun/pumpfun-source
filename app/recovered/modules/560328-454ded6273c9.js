// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030),
    a = e.i(520669);
  let i = /^[A-Za-z0-9_]+$/;
  e.s(
    [
      "$",
      0,
      200,
      "k",
      0,
      15,
      "y",
      0,
      12e4,
      "b",
      0,
      (e) => e.trim().length > 200,
      "M",
      0,
      (e) => {
        let t = e.trim();
        return 0 === t.length
          ? "required"
          : t.length > 15
            ? "too_long"
            : i.test(t)
              ? null
              : "charset";
      },
    ],
    693686,
  );
  let l = 50,
    r = t.contract["GET /pnl-leaderboard/groups"].response,
    n = r.shape.entries.element,
    o = n
      .pick({
        rank: !0,
        groupId: !0,
        username: !0,
        profileImageUrl: !0,
        pnlUsd: !0,
        realizedPnlUsd: !0,
        unrealizedPnlUsd: !0,
        memberCount: !0,
      })
      .extend({
        isVerified: n.shape.isVerified.default(!1),
        verifiedBadgeVisible: n.shape.verifiedBadgeVisible.default(!0),
      }),
    s = r
      .pick({ entries: !0 })
      .extend({
        periodLabel: r.shape.periodLabel.optional(),
        totalRanked: r.shape.totalRanked.optional(),
        entries: o.array(),
      }),
    d = (e) => s.parse(e);
  e.s(
    [
      "H",
      0,
      l,
      "Y",
      0,
      6e4,
      "P",
      0,
      d,
      "C",
      0,
      (e, t) =>
        "realized" === t
          ? e.realizedPnlUsd
          : "unrealized" === t
            ? e.unrealizedPnlUsd
            : e.pnlUsd,
    ],
    956683,
  );
  var c = e.i(760447);
  let u = 50,
    m = async ({ api: e, groupId: t, signal: a }) => {
      let i = await e("GET /users/{id}", { params: { id: t }, signal: a });
      return (0, c.t)({ row: c.Q.parse(i), groupId: t });
    },
    p = 20,
    h = async ({
      api: e,
      searchTerm: t,
      offset: a,
      limit: i = p,
      signal: l,
    }) => {
      let r = await e("GET /groups/search", {
        query: { searchTerm: t, limit: i, offset: a },
        signal: l,
      });
      return (0, c.A)(r);
    },
    f = async ({ api: e, period: t, sort: a, limit: i = l, signal: r }) =>
      d(
        await e("GET /pnl-leaderboard/groups", {
          query: { period: t, sort: a, limit: i },
          signal: r,
        }),
      ),
    g = async ({
      api: e,
      groupId: a,
      status: i,
      offset: l,
      limit: r = u,
      signal: n,
    }) => {
      try {
        return (0, c.F)(
          await e("GET /groups/{groupId}/members", {
            params: { groupId: a },
            query: { status: i, limit: r, offset: l },
            signal: n,
          }),
        );
      } catch (a) {
        let e = (({ error: e, status: a }) =>
          "INVITED" === a && (0, t.isContractError)(e) && 403 === e.status
            ? { members: [], hasMore: !1, rawCount: 0 }
            : null)({ error: a, status: i });
        if (e) return e;
        throw a;
      }
    },
    y = async ({ api: e, signal: t }) => {
      let a = [],
        i = 0;
      for (let l = 0; l < 5; l++) {
        let l = (0, c.n)(
          await e("GET /groups/me", {
            query: { limit: 200, offset: i },
            signal: t,
          }),
        );
        if ((a.push(...l.memberships), !l.hasMore || 0 === l.rawCount)) break;
        i += l.rawCount;
      }
      return a;
    },
    v = async ({ api: e, idOrWallet: t, signal: a }) =>
      (0, c.n)(
        await e("GET /groups/of/{id}", {
          params: { id: t },
          query: { limit: 1 },
          signal: a,
        }),
      ).memberships[0] ?? null,
    b = t.contract["GET /user-portfolio/{userId}"].response,
    I = b
      .pick({ summary: !0 })
      .extend({
        summary: b.shape.summary.pick({ positionCount: !0 }).partial(),
      }),
    w = t.contract["GET /portfolio-summary"].response.options[1]
      .pick({ pnl: !0, percentage: !0, totalValueUsd: !0 })
      .extend({ pnl: a.s, percentage: a.s, totalValueUsd: a.f }),
    C = async ({ api: e, groupId: t, signal: a }) => {
      let i = await e("GET /user-portfolio/{userId}", {
          params: { userId: t },
          query: { filter: "ALL", totalsOnly: !0 },
          timeout: 1e4,
          signal: a,
        }),
        { summary: l } = I.parse(i);
      return { positionCount: l.positionCount ?? null };
    },
    k = async ({ api: e, groupId: t, period: a, signal: i }) => {
      let l = await e("GET /portfolio-summary", {
          query: { user: t, period: a },
          timeout: 1e4,
          signal: i,
        }),
        r = w.parse(l);
      return {
        pnlUsd: r.pnl.usd,
        pnlPercentage: r.percentage.usd,
        totalValueUsd: r.totalValueUsd,
      };
    },
    x = t.contract["GET /groups/{groupId}/members/pnl"].response,
    T = x
      .pick({ builtAtMs: !0, rows: !0 })
      .extend({
        builtAtMs: x.shape.builtAtMs.nullish(),
        rows: x.shape.rows.element.pick({ userId: !0, pnlUsd: !0 }).array(),
      }),
    _ = async ({ api: e, groupId: t, period: a, signal: i }) => {
      let l = await e("GET /groups/{groupId}/members/pnl", {
          params: { groupId: t },
          query: { period: a },
          signal: i,
        }),
        r = T.parse(l);
      return { builtAtMs: r.builtAtMs ?? 0, rows: r.rows };
    },
    E = async ({
      api: e,
      groupId: t,
      accept: a,
      leaveCurrentGroup: i = !1,
    }) => {
      let l = { accept: a };
      (i && (l.leaveCurrentGroup = !0),
        await e("POST /groups/{groupId}/invites/respond", {
          params: { groupId: t },
          body: l,
        }));
    },
    N = async ({ api: e, groupId: t, userId: a }) => {
      await e("DELETE /groups/{groupId}/members/{userId}", {
        params: { groupId: t, userId: a },
      });
    },
    S = async ({ api: e, idOrWallet: t, signal: a }) => {
      let i = await e("GET /users/{id}", { params: { id: t }, signal: a });
      return c.Q.parse(i).userId ?? null;
    },
    M = async ({ api: e, groupId: t, status: a, signal: i }) => {
      let l = [],
        r = 0;
      for (let n = 0; n < 5; n++) {
        let n = await g({
          api: e,
          groupId: t,
          status: a,
          offset: r,
          limit: 200,
          signal: i,
        });
        if ((l.push(...n.members), !n.hasMore || 0 === n.rawCount)) break;
        r += n.rawCount;
      }
      return l;
    },
    P = async ({ api: e, inputs: t, signal: a }) => {
      let i = { username: t.username };
      (t.bio && (i.bio = t.bio),
        t.profileImageUrl && (i.profileImageUrl = t.profileImageUrl),
        t.headerImageUrl && (i.headerImageUrl = t.headerImageUrl),
        t.leaveCurrentGroup && (i.leaveCurrentGroup = !0));
      let l = await e("POST /groups", { body: i, timeout: 12e4, signal: a });
      return c.D.parse(l.profile);
    },
    U = async ({ api: e, inputs: t, signal: a }) => {
      let i = {};
      (void 0 !== t.username && (i.username = t.username),
        void 0 !== t.bio && (i.bio = t.bio),
        void 0 !== t.profileImageUrl && (i.profileImageUrl = t.profileImageUrl),
        void 0 !== t.headerImageUrl && (i.headerImageUrl = t.headerImageUrl));
      let l = await e("PATCH /groups/{groupId}", {
        params: { groupId: t.groupId },
        body: i,
        timeout: 12e4,
        signal: a,
      });
      return c.D.parse(l.profile);
    },
    A = async ({ api: e, groupId: t, userId: a, signal: i }) => {
      await e("POST /groups/{groupId}/invites", {
        params: { groupId: t },
        body: { userId: a },
        signal: i,
      });
    };
  e.s(
    [
      "J",
      0,
      500,
      "V",
      0,
      p,
      "D",
      0,
      P,
      "E",
      0,
      v,
      "K",
      0,
      M,
      "a",
      0,
      S,
      "F",
      0,
      y,
      "N",
      0,
      m,
      "j",
      0,
      f,
      "Z",
      0,
      g,
      "_",
      0,
      _,
      "u",
      0,
      C,
      "B",
      0,
      h,
      "b",
      0,
      k,
      "i",
      0,
      A,
      "z",
      0,
      N,
      "o",
      0,
      E,
      "P",
      0,
      U,
    ],
    560328,
  );
  let j = "squads";
  e.s(
    [
      "f",
      0,
      {
        all: [j],
        profile: (e) => [j, "profile", e],
        members: (e, t) => [j, "members", e, t],
        membersForSquad: (e) => [j, "members", e],
        membersPnl: (e, t) => [j, "members-pnl", e, t],
        myMemberships: (e) => [j, "my-memberships", e],
        activeSquadOf: (e) => [j, "of-user", e],
        search: (e, t) => [j, "search", e, t],
        leaderboard: (e, t, a) => [j, "leaderboard", e, t, a],
        portfolio: (e) => [j, "portfolio", e],
        crewClip: (e) => [j, "crew-clip", e],
        windowedPnl: (e, t) => [j, "portfolio", e, "window", t],
      },
    ],
    989582,
  );
};
