// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030),
    r = e.i(520669);
  let l = /^[A-Za-z0-9_]+$/;
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
            : l.test(t)
              ? null
              : "charset";
      },
    ],
    693686,
  );
  let a = 50,
    i = t.contract["GET /pnl-leaderboard/groups"].response,
    s = i.shape.entries.element,
    n = s
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
        isVerified: s.shape.isVerified.default(!1),
        verifiedBadgeVisible: s.shape.verifiedBadgeVisible.default(!0),
      }),
    o = i
      .pick({ entries: !0 })
      .extend({
        periodLabel: i.shape.periodLabel.optional(),
        totalRanked: i.shape.totalRanked.optional(),
        entries: n.array(),
      }),
    u = (e) => o.parse(e);
  e.s(
    [
      "H",
      0,
      a,
      "Y",
      0,
      6e4,
      "P",
      0,
      u,
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
  let d = 50,
    m = async ({ api: e, groupId: t, signal: r }) => {
      let l = await e("GET /users/{id}", { params: { id: t }, signal: r });
      return (0, c.t)({ row: c.Q.parse(l), groupId: t });
    },
    f = 20,
    p = async ({
      api: e,
      searchTerm: t,
      offset: r,
      limit: l = f,
      signal: a,
    }) => {
      let i = await e("GET /groups/search", {
        query: { searchTerm: t, limit: l, offset: r },
        signal: a,
      });
      return (0, c.A)(i);
    },
    h = async ({ api: e, period: t, sort: r, limit: l = a, signal: i }) =>
      u(
        await e("GET /pnl-leaderboard/groups", {
          query: { period: t, sort: r, limit: l },
          signal: i,
        }),
      ),
    g = async ({
      api: e,
      groupId: r,
      status: l,
      offset: a,
      limit: i = d,
      signal: s,
    }) => {
      try {
        return (0, c.F)(
          await e("GET /groups/{groupId}/members", {
            params: { groupId: r },
            query: { status: l, limit: i, offset: a },
            signal: s,
          }),
        );
      } catch (r) {
        let e = (({ error: e, status: r }) =>
          "INVITED" === r && (0, t.isContractError)(e) && 403 === e.status
            ? { members: [], hasMore: !1, rawCount: 0 }
            : null)({ error: r, status: l });
        if (e) return e;
        throw r;
      }
    },
    x = async ({ api: e, signal: t }) => {
      let r = [],
        l = 0;
      for (let a = 0; a < 5; a++) {
        let a = (0, c.n)(
          await e("GET /groups/me", {
            query: { limit: 200, offset: l },
            signal: t,
          }),
        );
        if ((r.push(...a.memberships), !a.hasMore || 0 === a.rawCount)) break;
        l += a.rawCount;
      }
      return r;
    },
    b = async ({ api: e, idOrWallet: t, signal: r }) =>
      (0, c.n)(
        await e("GET /groups/of/{id}", {
          params: { id: t },
          query: { limit: 1 },
          signal: r,
        }),
      ).memberships[0] ?? null,
    w = t.contract["GET /user-portfolio/{userId}"].response,
    y = w
      .pick({ summary: !0 })
      .extend({
        summary: w.shape.summary.pick({ positionCount: !0 }).partial(),
      }),
    v = t.contract["GET /portfolio-summary"].response.options[1]
      .pick({ pnl: !0, percentage: !0, totalValueUsd: !0 })
      .extend({ pnl: r.s, percentage: r.s, totalValueUsd: r.f }),
    E = async ({ api: e, groupId: t, signal: r }) => {
      let l = await e("GET /user-portfolio/{userId}", {
          params: { userId: t },
          query: { filter: "ALL", totalsOnly: !0 },
          timeout: 1e4,
          signal: r,
        }),
        { summary: a } = y.parse(l);
      return { positionCount: a.positionCount ?? null };
    },
    k = async ({ api: e, groupId: t, period: r, signal: l }) => {
      let a = await e("GET /portfolio-summary", {
          query: { user: t, period: r },
          timeout: 1e4,
          signal: l,
        }),
        i = v.parse(a);
      return {
        pnlUsd: i.pnl.usd,
        pnlPercentage: i.percentage.usd,
        totalValueUsd: i.totalValueUsd,
      };
    },
    C = t.contract["GET /groups/{groupId}/members/pnl"].response,
    S = C.pick({ builtAtMs: !0, rows: !0 }).extend({
      builtAtMs: C.shape.builtAtMs.nullish(),
      rows: C.shape.rows.element.pick({ userId: !0, pnlUsd: !0 }).array(),
    }),
    I = async ({ api: e, groupId: t, period: r, signal: l }) => {
      let a = await e("GET /groups/{groupId}/members/pnl", {
          params: { groupId: t },
          query: { period: r },
          signal: l,
        }),
        i = S.parse(a);
      return { builtAtMs: i.builtAtMs ?? 0, rows: i.rows };
    },
    N = async ({
      api: e,
      groupId: t,
      accept: r,
      leaveCurrentGroup: l = !1,
    }) => {
      let a = { accept: r };
      (l && (a.leaveCurrentGroup = !0),
        await e("POST /groups/{groupId}/invites/respond", {
          params: { groupId: t },
          body: a,
        }));
    },
    T = async ({ api: e, groupId: t, userId: r }) => {
      await e("DELETE /groups/{groupId}/members/{userId}", {
        params: { groupId: t, userId: r },
      });
    },
    A = async ({ api: e, idOrWallet: t, signal: r }) => {
      let l = await e("GET /users/{id}", { params: { id: t }, signal: r });
      return c.Q.parse(l).userId ?? null;
    },
    j = async ({ api: e, groupId: t, status: r, signal: l }) => {
      let a = [],
        i = 0;
      for (let s = 0; s < 5; s++) {
        let s = await g({
          api: e,
          groupId: t,
          status: r,
          offset: i,
          limit: 200,
          signal: l,
        });
        if ((a.push(...s.members), !s.hasMore || 0 === s.rawCount)) break;
        i += s.rawCount;
      }
      return a;
    },
    P = async ({ api: e, inputs: t, signal: r }) => {
      let l = { username: t.username };
      (t.bio && (l.bio = t.bio),
        t.profileImageUrl && (l.profileImageUrl = t.profileImageUrl),
        t.headerImageUrl && (l.headerImageUrl = t.headerImageUrl),
        t.leaveCurrentGroup && (l.leaveCurrentGroup = !0));
      let a = await e("POST /groups", { body: l, timeout: 12e4, signal: r });
      return c.D.parse(a.profile);
    },
    _ = async ({ api: e, inputs: t, signal: r }) => {
      let l = {};
      (void 0 !== t.username && (l.username = t.username),
        void 0 !== t.bio && (l.bio = t.bio),
        void 0 !== t.profileImageUrl && (l.profileImageUrl = t.profileImageUrl),
        void 0 !== t.headerImageUrl && (l.headerImageUrl = t.headerImageUrl));
      let a = await e("PATCH /groups/{groupId}", {
        params: { groupId: t.groupId },
        body: l,
        timeout: 12e4,
        signal: r,
      });
      return c.D.parse(a.profile);
    },
    U = async ({ api: e, groupId: t, userId: r, signal: l }) => {
      await e("POST /groups/{groupId}/invites", {
        params: { groupId: t },
        body: { userId: r },
        signal: l,
      });
    };
  e.s(
    [
      "J",
      0,
      500,
      "V",
      0,
      f,
      "D",
      0,
      P,
      "E",
      0,
      b,
      "K",
      0,
      j,
      "a",
      0,
      A,
      "F",
      0,
      x,
      "N",
      0,
      m,
      "j",
      0,
      h,
      "Z",
      0,
      g,
      "_",
      0,
      I,
      "u",
      0,
      E,
      "B",
      0,
      p,
      "b",
      0,
      k,
      "i",
      0,
      U,
      "z",
      0,
      T,
      "o",
      0,
      N,
      "P",
      0,
      _,
    ],
    560328,
  );
  let M = "squads";
  e.s(
    [
      "f",
      0,
      {
        all: [M],
        profile: (e) => [M, "profile", e],
        members: (e, t) => [M, "members", e, t],
        membersForSquad: (e) => [M, "members", e],
        membersPnl: (e, t) => [M, "members-pnl", e, t],
        myMemberships: (e) => [M, "my-memberships", e],
        activeSquadOf: (e) => [M, "of-user", e],
        search: (e, t) => [M, "search", e, t],
        leaderboard: (e, t, r) => [M, "leaderboard", e, t, r],
        portfolio: (e) => [M, "portfolio", e],
        crewClip: (e) => [M, "crew-clip", e],
        windowedPnl: (e, t) => [M, "portfolio", e, "window", t],
      },
    ],
    989582,
  );
};
