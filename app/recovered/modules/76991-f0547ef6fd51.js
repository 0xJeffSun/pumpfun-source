// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030),
    l = e.i(559015),
    r = e.i(759257),
    a = e.i(333757),
    i = e.i(21617);
  let s = { cashUsd: 0, withdrawableUsd: null, hlAccount: null },
    n = (e) =>
      (0, t.isContractError)(e) && (400 === e.status || 404 === e.status),
    o = async (e, t) => {
      try {
        return await e((0, r.j)());
      } catch (e) {
        if (n(e)) return t();
        throw e;
      }
    },
    d = async ({ includeFollowedHolders: e = !1, signal: t } = {}) =>
      (
        await o(
          (r) =>
            r("GET /coins/perps", {
              query: {
                sort: "volume_24h",
                limit: 150,
                ...(e
                  ? { includeFollowedHolders: !0, followedHoldersLimit: l.A }
                  : {}),
              },
              signal: t,
              ...(e ? { credentials: "include" } : {}),
            }),
          () => [],
        )
      )
        .filter(a.u)
        .map(a.D),
    c = async ({ coin: e, signal: t }) => {
      let l = await o(
        (l) =>
          l("GET /coins-v3/{address}", {
            params: { address: e },
            query: { chain: i.g },
            signal: t,
          }),
        () => null,
      );
      return l && (0, a.u)(l) ? (0, a.N)(l) : null;
    },
    u = async ({ userId: e, coins: t, signal: l }) => {
      if ("all" !== t && 0 === t.length) return [];
      let r = await o(
        (t) =>
          t("GET /user-portfolio/{userId}", {
            params: { userId: e },
            query: {},
            credentials: "include",
            signal: l,
          }),
        () => null,
      );
      if (!r) return [];
      let i = (0, a.M)(r.positions);
      if ("all" === t) return i;
      let s = new Set(t);
      return i.filter((e) => s.has(e.coin));
    },
    p = async ({ userId: e, signal: t }) => {
      let l = await o(
        (l) =>
          l("GET /user-portfolio/{userId}", {
            params: { userId: e },
            query: { filter: "CLOSED", sortBy: "RECENCY" },
            credentials: "include",
            signal: t,
          }),
        () => null,
      );
      return l ? (0, a.l)(l.positions) : [];
    },
    m = async ({ userId: e, signal: t }) => {
      let l = await o(
        (l) =>
          l("GET /user-portfolio/{userId}", {
            params: { userId: e },
            query: { totalsOnly: !0 },
            credentials: "include",
            signal: t,
          }),
        () => null,
      );
      return l ? (0, a.e)(l.summary) : s;
    },
    f = async ({ userId: e, signal: t }) => {
      let l = await o(
        (l) =>
          l("GET /perps/orders/{userId}", {
            params: { userId: e },
            query: {},
            credentials: "include",
            signal: t,
          }),
        () => null,
      );
      return l ? (0, a.t)(l) : [];
    },
    x = async ({ signal: e } = {}) => {
      let t = await o(
        (t) =>
          t("POST /perps/account/activate", {
            credentials: "include",
            signal: e,
          }),
        () => null,
      );
      return t?.hlAccount ?? null;
    };
  e.s([
    "u",
    0,
    x,
    "a",
    0,
    m,
    "z",
    0,
    p,
    "w",
    0,
    c,
    "P",
    0,
    d,
    "G",
    0,
    f,
    "V",
    0,
    u,
    "$",
    0,
    n,
  ]);
};
