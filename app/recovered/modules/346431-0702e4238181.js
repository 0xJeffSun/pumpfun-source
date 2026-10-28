// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(148269);
  e.i(965690);
  let r = ["5m", "1h"],
    l = (e) => "string" == typeof e && r.includes(e),
    i = (e) => (l(e) ? e : "1h"),
    a = (e) => "object" == typeof e && null !== e,
    n = (e) => ("number" == typeof e && Number.isFinite(e) ? e : null),
    s = (e) => {
      if (!a(e)) return null;
      let t = n(e.calls),
        r = n(e.callers);
      return null === t || null === r || "string" != typeof e.lastCallAt
        ? null
        : {
            calls: t,
            callers: r,
            lastCallAt: e.lastCallAt,
            topMultiple: n(e.topMultiple),
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
        !a(e) ||
        !l(e.window) ||
        "boolean" != typeof e.complete ||
        "string" != typeof e.generatedAt ||
        !a(e.totals) ||
        !a(e.callsByMint)
      )
        return null;
      let t = n(e.totals.calls),
        r = n(e.totals.coins);
      if (null === t || null === r) return null;
      let i = {};
      for (let [t, r] of Object.entries(e.callsByMint)) {
        let e = s(r);
        if (null === e) return null;
        i[t] = e;
      }
      return {
        window: e.window,
        complete: e.complete,
        heldOver: !0 === e.heldOver,
        generatedAt: e.generatedAt,
        totals: { calls: t, coins: r },
        callsByMint: i,
      };
    },
    "q",
    0,
    i,
    "u",
    0,
    ({ sort: e, window: r, hasSearchTerm: l = !1 }) =>
      e !== t.E.CALLS || l ? r : i(r),
  ]);
};
