// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(157633),
    l = e.i(352386);
  e.i(12692);
  var i = e.i(398902),
    a = e.i(359516),
    n = e.i(706615);
  e.s([
    "N",
    0,
    "cup",
    "b",
    0,
    (e, r, i) => {
      let s,
        o,
        d = (0, t.c)(4);
      d[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = { isVisible: !1 }), (d[0] = s))
        : (s = d[0]);
      let { data: u } = (0, a.f)(s),
        c = (0, n.g)(u, r) ? "cup" : e,
        [m, p] = (0, l.useState)(i ?? null),
        h = m ?? c;
      return (
        d[1] !== c || d[2] !== h
          ? ((o = { timeframe: h, landing: c, setTimeframe: p }),
            (d[1] = c),
            (d[2] = h),
            (d[3] = o))
          : (o = d[3]),
        o
      );
    },
    "t",
    0,
    (e) => {
      let l,
        a,
        n,
        s = (0, t.c)(7),
        { t: o } = (0, i.f)();
      return (
        s[0] !== o
          ? ((l = o("web.leaderboard.cup.tab_cup")), (s[0] = o), (s[1] = l))
          : (l = s[1]),
        s[2] !== l
          ? ((a = { value: "cup", icon: r.WV, ariaLabel: l }),
            (s[2] = l),
            (s[3] = a))
          : (a = s[3]),
        s[4] !== e || s[5] !== a
          ? ((n = [a, ...e]), (s[4] = e), (s[5] = a), (s[6] = n))
          : (n = s[6]),
        n
      );
    },
  ]);
};
