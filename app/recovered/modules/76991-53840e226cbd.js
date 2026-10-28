// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030),
    r = e.i(559015),
    i = e.i(759257),
    a = e.i(333757),
    s = e.i(21617);
  let n = { cashUsd: 0, withdrawableUsd: null, hlAccount: null },
    l = (e) =>
      (0, t.isContractError)(e) && (400 === e.status || 404 === e.status),
    o = async (e, t) => {
      try {
        return await e((0, i.j)());
      } catch (e) {
        if (l(e)) return t();
        throw e;
      }
    },
    c = async ({ includeFollowedHolders: e = !1, signal: t } = {}) =>
      (
        await o(
          (i) =>
            i("GET /coins/perps", {
              query: {
                sort: "volume_24h",
                limit: 150,
                ...(e
                  ? { includeFollowedHolders: !0, followedHoldersLimit: r.A }
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
    d = async ({ coin: e, signal: t }) => {
      let r = await o(
        (r) =>
          r("GET /coins-v3/{address}", {
            params: { address: e },
            query: { chain: s.g },
            signal: t,
          }),
        () => null,
      );
      return r && (0, a.u)(r) ? (0, a.N)(r) : null;
    },
    u = async ({ userId: e, coins: t, signal: r }) => {
      if ("all" !== t && 0 === t.length) return [];
      let i = await o(
        (t) =>
          t("GET /user-portfolio/{userId}", {
            params: { userId: e },
            query: {},
            credentials: "include",
            signal: r,
          }),
        () => null,
      );
      if (!i) return [];
      let s = (0, a.M)(i.positions);
      if ("all" === t) return s;
      let n = new Set(t);
      return s.filter((e) => n.has(e.coin));
    },
    m = async ({ userId: e, signal: t }) => {
      let r = await o(
        (r) =>
          r("GET /user-portfolio/{userId}", {
            params: { userId: e },
            query: { filter: "CLOSED", sortBy: "RECENCY" },
            credentials: "include",
            signal: t,
          }),
        () => null,
      );
      return r ? (0, a.l)(r.positions) : [];
    },
    p = async ({ userId: e, signal: t }) => {
      let r = await o(
        (r) =>
          r("GET /user-portfolio/{userId}", {
            params: { userId: e },
            query: { totalsOnly: !0 },
            credentials: "include",
            signal: t,
          }),
        () => null,
      );
      return r ? (0, a.e)(r.summary) : n;
    },
    f = async ({ userId: e, signal: t }) => {
      let r = await o(
        (r) =>
          r("GET /perps/orders/{userId}", {
            params: { userId: e },
            query: {},
            credentials: "include",
            signal: t,
          }),
        () => null,
      );
      return r ? (0, a.t)(r) : [];
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
    p,
    "z",
    0,
    m,
    "w",
    0,
    d,
    "P",
    0,
    c,
    "G",
    0,
    f,
    "V",
    0,
    u,
    "$",
    0,
    l,
  ]);
};
