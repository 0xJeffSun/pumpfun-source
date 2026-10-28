// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(148269);
  e.i(965690);
  let r = ["5m", "1h"],
    n = (e) => "string" == typeof e && r.includes(e),
    l = (e) => (n(e) ? e : "1h"),
    i = (e) => "object" == typeof e && null !== e,
    u = (e) => ("number" == typeof e && Number.isFinite(e) ? e : null),
    a = (e) => {
      if (!i(e)) return null;
      let t = u(e.calls),
        r = u(e.callers);
      return null === t || null === r || "string" != typeof e.lastCallAt
        ? null
        : {
            calls: t,
            callers: r,
            lastCallAt: e.lastCallAt,
            topMultiple: u(e.topMultiple),
          };
    };
  e.s([
    "W",
    0,
    "1h",
    "x",
    0,
    (e) => {
      let t = new URLSearchParams({
        window: e.window,
        offset: String(e.offset),
        limit: String(e.limit),
        includeNsfw: String(e.includeNsfw),
      });
      return `/api/explore/calls?${t.toString()}`;
    },
    "L",
    0,
    ({ window: e }) => `/api/explore/calls/stats?window=${e}`,
    "p",
    0,
    n,
    "r",
    0,
    (e) => {
      if (
        !i(e) ||
        !n(e.window) ||
        "boolean" != typeof e.complete ||
        "string" != typeof e.generatedAt ||
        !i(e.totals) ||
        !i(e.callsByMint)
      )
        return null;
      let t = u(e.totals.calls),
        r = u(e.totals.coins);
      if (null === t || null === r) return null;
      let l = {};
      for (let [t, r] of Object.entries(e.callsByMint)) {
        let e = a(r);
        if (null === e) return null;
        l[t] = e;
      }
      return {
        window: e.window,
        complete: e.complete,
        heldOver: !0 === e.heldOver,
        generatedAt: e.generatedAt,
        totals: { calls: t, coins: r },
        callsByMint: l,
      };
    },
    "q",
    0,
    l,
    "u",
    0,
    ({ sort: e, window: r, hasSearchTerm: n = !1 }) =>
      e !== t.E.CALLS || n ? r : l(r),
  ]);
};
