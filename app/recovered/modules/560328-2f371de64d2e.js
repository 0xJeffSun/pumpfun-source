// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030),
    r = e.i(520669);
  let a = /^[A-Za-z0-9_]+$/;
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
            : a.test(t)
              ? null
              : "charset";
      },
    ],
    693686,
  );
  let i = 50,
    n = t.contract["GET /pnl-leaderboard/groups"].response,
    l = n.shape.entries.element,
    s = l
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
        isVerified: l.shape.isVerified.default(!1),
        verifiedBadgeVisible: l.shape.verifiedBadgeVisible.default(!0),
      }),
    o = n
      .pick({ entries: !0 })
      .extend({
        periodLabel: n.shape.periodLabel.optional(),
        totalRanked: n.shape.totalRanked.optional(),
        entries: s.array(),
      }),
    d = (e) => o.parse(e);
  e.s(
    [
      "H",
      0,
      i,
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
  var u = e.i(760447);
  let c = 50,
    m = async ({ api: e, groupId: t, signal: r }) => {
      let a = await e("GET /users/{id}", { params: { id: t }, signal: r });
      return (0, u.t)({ row: u.Q.parse(a), groupId: t });
    },
    p = 20,
    h = async ({
      api: e,
      searchTerm: t,
      offset: r,
      limit: a = p,
      signal: i,
    }) => {
      let n = await e("GET /groups/search", {
        query: { searchTerm: t, limit: a, offset: r },
        signal: i,
      });
      return (0, u.A)(n);
    },
    f = async ({ api: e, period: t, sort: r, limit: a = i, signal: n }) =>
      d(
        await e("GET /pnl-leaderboard/groups", {
          query: { period: t, sort: r, limit: a },
          signal: n,
        }),
      ),
    g = async ({
      api: e,
      groupId: r,
      status: a,
      offset: i,
      limit: n = c,
      signal: l,
    }) => {
      try {
        return (0, u.F)(
          await e("GET /groups/{groupId}/members", {
            params: { groupId: r },
            query: { status: a, limit: n, offset: i },
            signal: l,
          }),
        );
      } catch (r) {
        let e = (({ error: e, status: r }) =>
          "INVITED" === r && (0, t.isContractError)(e) && 403 === e.status
            ? { members: [], hasMore: !1, rawCount: 0 }
            : null)({ error: r, status: a });
        if (e) return e;
        throw r;
      }
    },
    b = async ({ api: e, signal: t }) => {
      let r = [],
        a = 0;
      for (let i = 0; i < 5; i++) {
        let i = (0, u.n)(
          await e("GET /groups/me", {
            query: { limit: 200, offset: a },
            signal: t,
          }),
        );
        if ((r.push(...i.memberships), !i.hasMore || 0 === i.rawCount)) break;
        a += i.rawCount;
      }
      return r;
    },
    y = async ({ api: e, idOrWallet: t, signal: r }) =>
      (0, u.n)(
        await e("GET /groups/of/{id}", {
          params: { id: t },
          query: { limit: 1 },
          signal: r,
        }),
      ).memberships[0] ?? null,
    v = t.contract["GET /user-portfolio/{userId}"].response,
    w = v
      .pick({ summary: !0 })
      .extend({
        summary: v.shape.summary.pick({ positionCount: !0 }).partial(),
      }),
    k = t.contract["GET /portfolio-summary"].response.options[1]
      .pick({ pnl: !0, percentage: !0, totalValueUsd: !0 })
      .extend({ pnl: r.s, percentage: r.s, totalValueUsd: r.f }),
    C = async ({ api: e, groupId: t, signal: r }) => {
      let a = await e("GET /user-portfolio/{userId}", {
          params: { userId: t },
          query: { filter: "ALL", totalsOnly: !0 },
          timeout: 1e4,
          signal: r,
        }),
        { summary: i } = w.parse(a);
      return { positionCount: i.positionCount ?? null };
    },
    x = async ({ api: e, groupId: t, period: r, signal: a }) => {
      let i = await e("GET /portfolio-summary", {
          query: { user: t, period: r },
          timeout: 1e4,
          signal: a,
        }),
        n = k.parse(i);
      return {
        pnlUsd: n.pnl.usd,
        pnlPercentage: n.percentage.usd,
        totalValueUsd: n.totalValueUsd,
      };
    },
    I = t.contract["GET /groups/{groupId}/members/pnl"].response,
    _ = I.pick({ builtAtMs: !0, rows: !0 }).extend({
      builtAtMs: I.shape.builtAtMs.nullish(),
      rows: I.shape.rows.element.pick({ userId: !0, pnlUsd: !0 }).array(),
    }),
    T = async ({ api: e, groupId: t, period: r, signal: a }) => {
      let i = await e("GET /groups/{groupId}/members/pnl", {
          params: { groupId: t },
          query: { period: r },
          signal: a,
        }),
        n = _.parse(i);
      return { builtAtMs: n.builtAtMs ?? 0, rows: n.rows };
    },
    E = async ({
      api: e,
      groupId: t,
      accept: r,
      leaveCurrentGroup: a = !1,
    }) => {
      let i = { accept: r };
      (a && (i.leaveCurrentGroup = !0),
        await e("POST /groups/{groupId}/invites/respond", {
          params: { groupId: t },
          body: i,
        }));
    },
    S = async ({ api: e, groupId: t, userId: r }) => {
      await e("DELETE /groups/{groupId}/members/{userId}", {
        params: { groupId: t, userId: r },
      });
    },
    A = async ({ api: e, idOrWallet: t, signal: r }) => {
      let a = await e("GET /users/{id}", { params: { id: t }, signal: r });
      return u.Q.parse(a).userId ?? null;
    },
    V = async ({ api: e, groupId: t, status: r, signal: a }) => {
      let i = [],
        n = 0;
      for (let l = 0; l < 5; l++) {
        let l = await g({
          api: e,
          groupId: t,
          status: r,
          offset: n,
          limit: 200,
          signal: a,
        });
        if ((i.push(...l.members), !l.hasMore || 0 === l.rawCount)) break;
        n += l.rawCount;
      }
      return i;
    },
    L = async ({ api: e, inputs: t, signal: r }) => {
      let a = { username: t.username };
      (t.bio && (a.bio = t.bio),
        t.profileImageUrl && (a.profileImageUrl = t.profileImageUrl),
        t.headerImageUrl && (a.headerImageUrl = t.headerImageUrl),
        t.leaveCurrentGroup && (a.leaveCurrentGroup = !0));
      let i = await e("POST /groups", { body: a, timeout: 12e4, signal: r });
      return u.D.parse(i.profile);
    },
    P = async ({ api: e, inputs: t, signal: r }) => {
      let a = {};
      (void 0 !== t.username && (a.username = t.username),
        void 0 !== t.bio && (a.bio = t.bio),
        void 0 !== t.profileImageUrl && (a.profileImageUrl = t.profileImageUrl),
        void 0 !== t.headerImageUrl && (a.headerImageUrl = t.headerImageUrl));
      let i = await e("PATCH /groups/{groupId}", {
        params: { groupId: t.groupId },
        body: a,
        timeout: 12e4,
        signal: r,
      });
      return u.D.parse(i.profile);
    },
    j = async ({ api: e, groupId: t, userId: r, signal: a }) => {
      await e("POST /groups/{groupId}/invites", {
        params: { groupId: t },
        body: { userId: r },
        signal: a,
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
      L,
      "E",
      0,
      y,
      "K",
      0,
      V,
      "a",
      0,
      A,
      "F",
      0,
      b,
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
      T,
      "u",
      0,
      C,
      "B",
      0,
      h,
      "b",
      0,
      x,
      "i",
      0,
      j,
      "z",
      0,
      S,
      "o",
      0,
      E,
      "P",
      0,
      P,
    ],
    560328,
  );
  let N = "squads";
  e.s(
    [
      "f",
      0,
      {
        all: [N],
        profile: (e) => [N, "profile", e],
        members: (e, t) => [N, "members", e, t],
        membersForSquad: (e) => [N, "members", e],
        membersPnl: (e, t) => [N, "members-pnl", e, t],
        myMemberships: (e) => [N, "my-memberships", e],
        activeSquadOf: (e) => [N, "of-user", e],
        search: (e, t) => [N, "search", e, t],
        leaderboard: (e, t, r) => [N, "leaderboard", e, t, r],
        portfolio: (e) => [N, "portfolio", e],
        crewClip: (e) => [N, "crew-clip", e],
        windowedPnl: (e, t) => [N, "portfolio", e, "window", t],
      },
    ],
    989582,
  );
};
