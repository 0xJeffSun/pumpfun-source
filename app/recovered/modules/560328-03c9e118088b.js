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
  let i = 50,
    a = t.contract["GET /pnl-leaderboard/groups"].response,
    n = a.shape.entries.element,
    s = n
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
    o = a
      .pick({ entries: !0 })
      .extend({
        periodLabel: a.shape.periodLabel.optional(),
        totalRanked: a.shape.totalRanked.optional(),
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
      let l = await e("GET /users/{id}", { params: { id: t }, signal: r });
      return (0, u.t)({ row: u.Q.parse(l), groupId: t });
    },
    p = 20,
    h = async ({
      api: e,
      searchTerm: t,
      offset: r,
      limit: l = p,
      signal: i,
    }) => {
      let a = await e("GET /groups/search", {
        query: { searchTerm: t, limit: l, offset: r },
        signal: i,
      });
      return (0, u.A)(a);
    },
    f = async ({ api: e, period: t, sort: r, limit: l = i, signal: a }) =>
      d(
        await e("GET /pnl-leaderboard/groups", {
          query: { period: t, sort: r, limit: l },
          signal: a,
        }),
      ),
    g = async ({
      api: e,
      groupId: r,
      status: l,
      offset: i,
      limit: a = c,
      signal: n,
    }) => {
      try {
        return (0, u.F)(
          await e("GET /groups/{groupId}/members", {
            params: { groupId: r },
            query: { status: l, limit: a, offset: i },
            signal: n,
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
    y = async ({ api: e, signal: t }) => {
      let r = [],
        l = 0;
      for (let i = 0; i < 5; i++) {
        let i = (0, u.n)(
          await e("GET /groups/me", {
            query: { limit: 200, offset: l },
            signal: t,
          }),
        );
        if ((r.push(...i.memberships), !i.hasMore || 0 === i.rawCount)) break;
        l += i.rawCount;
      }
      return r;
    },
    b = async ({ api: e, idOrWallet: t, signal: r }) =>
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
    x = t.contract["GET /portfolio-summary"].response.options[1]
      .pick({ pnl: !0, percentage: !0, totalValueUsd: !0 })
      .extend({ pnl: r.s, percentage: r.s, totalValueUsd: r.f }),
    C = async ({ api: e, groupId: t, signal: r }) => {
      let l = await e("GET /user-portfolio/{userId}", {
          params: { userId: t },
          query: { filter: "ALL", totalsOnly: !0 },
          timeout: 1e4,
          signal: r,
        }),
        { summary: i } = w.parse(l);
      return { positionCount: i.positionCount ?? null };
    },
    I = async ({ api: e, groupId: t, period: r, signal: l }) => {
      let i = await e("GET /portfolio-summary", {
          query: { user: t, period: r },
          timeout: 1e4,
          signal: l,
        }),
        a = x.parse(i);
      return {
        pnlUsd: a.pnl.usd,
        pnlPercentage: a.percentage.usd,
        totalValueUsd: a.totalValueUsd,
      };
    },
    A = t.contract["GET /groups/{groupId}/members/pnl"].response,
    k = A.pick({ builtAtMs: !0, rows: !0 }).extend({
      builtAtMs: A.shape.builtAtMs.nullish(),
      rows: A.shape.rows.element.pick({ userId: !0, pnlUsd: !0 }).array(),
    }),
    _ = async ({ api: e, groupId: t, period: r, signal: l }) => {
      let i = await e("GET /groups/{groupId}/members/pnl", {
          params: { groupId: t },
          query: { period: r },
          signal: l,
        }),
        a = k.parse(i);
      return { builtAtMs: a.builtAtMs ?? 0, rows: a.rows };
    },
    U = async ({
      api: e,
      groupId: t,
      accept: r,
      leaveCurrentGroup: l = !1,
    }) => {
      let i = { accept: r };
      (l && (i.leaveCurrentGroup = !0),
        await e("POST /groups/{groupId}/invites/respond", {
          params: { groupId: t },
          body: i,
        }));
    },
    E = async ({ api: e, groupId: t, userId: r }) => {
      await e("DELETE /groups/{groupId}/members/{userId}", {
        params: { groupId: t, userId: r },
      });
    },
    j = async ({ api: e, idOrWallet: t, signal: r }) => {
      let l = await e("GET /users/{id}", { params: { id: t }, signal: r });
      return u.Q.parse(l).userId ?? null;
    },
    N = async ({ api: e, groupId: t, status: r, signal: l }) => {
      let i = [],
        a = 0;
      for (let n = 0; n < 5; n++) {
        let n = await g({
          api: e,
          groupId: t,
          status: r,
          offset: a,
          limit: 200,
          signal: l,
        });
        if ((i.push(...n.members), !n.hasMore || 0 === n.rawCount)) break;
        a += n.rawCount;
      }
      return i;
    },
    S = async ({ api: e, inputs: t, signal: r }) => {
      let l = { username: t.username };
      (t.bio && (l.bio = t.bio),
        t.profileImageUrl && (l.profileImageUrl = t.profileImageUrl),
        t.headerImageUrl && (l.headerImageUrl = t.headerImageUrl),
        t.leaveCurrentGroup && (l.leaveCurrentGroup = !0));
      let i = await e("POST /groups", { body: l, timeout: 12e4, signal: r });
      return u.D.parse(i.profile);
    },
    T = async ({ api: e, inputs: t, signal: r }) => {
      let l = {};
      (void 0 !== t.username && (l.username = t.username),
        void 0 !== t.bio && (l.bio = t.bio),
        void 0 !== t.profileImageUrl && (l.profileImageUrl = t.profileImageUrl),
        void 0 !== t.headerImageUrl && (l.headerImageUrl = t.headerImageUrl));
      let i = await e("PATCH /groups/{groupId}", {
        params: { groupId: t.groupId },
        body: l,
        timeout: 12e4,
        signal: r,
      });
      return u.D.parse(i.profile);
    },
    P = async ({ api: e, groupId: t, userId: r, signal: l }) => {
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
      p,
      "D",
      0,
      S,
      "E",
      0,
      b,
      "K",
      0,
      N,
      "a",
      0,
      j,
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
      I,
      "i",
      0,
      P,
      "z",
      0,
      E,
      "o",
      0,
      U,
      "P",
      0,
      T,
    ],
    560328,
  );
  let V = "squads";
  e.s(
    [
      "f",
      0,
      {
        all: [V],
        profile: (e) => [V, "profile", e],
        members: (e, t) => [V, "members", e, t],
        membersForSquad: (e) => [V, "members", e],
        membersPnl: (e, t) => [V, "members-pnl", e, t],
        myMemberships: (e) => [V, "my-memberships", e],
        activeSquadOf: (e) => [V, "of-user", e],
        search: (e, t) => [V, "search", e, t],
        leaderboard: (e, t, r) => [V, "leaderboard", e, t, r],
        portfolio: (e) => [V, "portfolio", e],
        crewClip: (e) => [V, "crew-clip", e],
        windowedPnl: (e, t) => [V, "portfolio", e, "window", t],
      },
    ],
    989582,
  );
};
