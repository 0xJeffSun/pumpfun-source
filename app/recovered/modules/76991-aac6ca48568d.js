// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(402030),
    r = e.i(559015),
    a = e.i(759257),
    f = e.i(333757),
    n = e.i(21617);
  let i = { cashUsd: 0, withdrawableUsd: null, hlAccount: null },
    s = (e) =>
      (0, t.isContractError)(e) && (400 === e.status || 404 === e.status),
    c = async (e, t) => {
      try {
        return await e((0, a.j)());
      } catch (e) {
        if (s(e)) return t();
        throw e;
      }
    },
    o = async ({ includeFollowedHolders: e = !1, signal: t } = {}) =>
      (
        await c(
          (a) =>
            a("GET /coins/perps", {
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
        .filter(f.u)
        .map(f.D),
    l = async ({ coin: e, signal: t }) => {
      let r = await c(
        (r) =>
          r("GET /coins-v3/{address}", {
            params: { address: e },
            query: { chain: n.g },
            signal: t,
          }),
        () => null,
      );
      return r && (0, f.u)(r) ? (0, f.N)(r) : null;
    },
    u = async ({ userId: e, coins: t, signal: r }) => {
      if ("all" !== t && 0 === t.length) return [];
      let a = await c(
        (t) =>
          t("GET /user-portfolio/{userId}", {
            params: { userId: e },
            query: {},
            credentials: "include",
            signal: r,
          }),
        () => null,
      );
      if (!a) return [];
      let n = (0, f.M)(a.positions);
      if ("all" === t) return n;
      let i = new Set(t);
      return n.filter((e) => i.has(e.coin));
    },
    d = async ({ userId: e, signal: t }) => {
      let r = await c(
        (r) =>
          r("GET /user-portfolio/{userId}", {
            params: { userId: e },
            query: { filter: "CLOSED", sortBy: "RECENCY" },
            credentials: "include",
            signal: t,
          }),
        () => null,
      );
      return r ? (0, f.l)(r.positions) : [];
    },
    h = async ({ userId: e, signal: t }) => {
      let r = await c(
        (r) =>
          r("GET /user-portfolio/{userId}", {
            params: { userId: e },
            query: { totalsOnly: !0 },
            credentials: "include",
            signal: t,
          }),
        () => null,
      );
      return r ? (0, f.e)(r.summary) : i;
    },
    p = async ({ userId: e, signal: t }) => {
      let r = await c(
        (r) =>
          r("GET /perps/orders/{userId}", {
            params: { userId: e },
            query: {},
            credentials: "include",
            signal: t,
          }),
        () => null,
      );
      return r ? (0, f.t)(r) : [];
    },
    m = async ({ signal: e } = {}) => {
      let t = await c(
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
    m,
    "a",
    0,
    h,
    "z",
    0,
    d,
    "w",
    0,
    l,
    "P",
    0,
    o,
    "G",
    0,
    p,
    "V",
    0,
    u,
    "$",
    0,
    s,
  ]);
};
