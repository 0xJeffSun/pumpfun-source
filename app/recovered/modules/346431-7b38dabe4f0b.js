// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(148269);
  e.i(965690);
  let r = ["5m", "1h"],
    l = (e) => "string" == typeof e && r.includes(e),
    n = (e) => (l(e) ? e : "1h"),
    i = (e) => "object" == typeof e && null !== e,
    s = (e) => ("number" == typeof e && Number.isFinite(e) ? e : null),
    a = (e) => {
      if (!i(e)) return null;
      let t = s(e.calls),
        r = s(e.callers);
      return null === t || null === r || "string" != typeof e.lastCallAt
        ? null
        : {
            calls: t,
            callers: r,
            lastCallAt: e.lastCallAt,
            topMultiple: s(e.topMultiple),
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
    l,
    "r",
    0,
    (e) => {
      if (
        !i(e) ||
        !l(e.window) ||
        "boolean" != typeof e.complete ||
        "string" != typeof e.generatedAt ||
        !i(e.totals) ||
        !i(e.callsByMint)
      )
        return null;
      let t = s(e.totals.calls),
        r = s(e.totals.coins);
      if (null === t || null === r) return null;
      let n = {};
      for (let [t, r] of Object.entries(e.callsByMint)) {
        let e = a(r);
        if (null === e) return null;
        n[t] = e;
      }
      return {
        window: e.window,
        complete: e.complete,
        heldOver: !0 === e.heldOver,
        generatedAt: e.generatedAt,
        totals: { calls: t, coins: r },
        callsByMint: n,
      };
    },
    "q",
    0,
    n,
    "u",
    0,
    ({ sort: e, window: r, hasSearchTerm: l = !1 }) =>
      e !== t.E.CALLS || l ? r : n(r),
  ]);
};
