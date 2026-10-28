// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(311282),
    l = e.i(869322),
    i = e.i(986071);
  let a = ["daily", "weekly", "monthly", l.N];
  e.s([
    "O",
    0,
    (e) => `/leaderboard?${i.f.LEADERBOARD.PERIOD}=${e}`,
    "t",
    0,
    function () {
      let e,
        l,
        n,
        s = (0, t.c)(6);
      s[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, r.b)(a)), (s[0] = e))
        : (e = s[0]);
      let [o, d] = (0, r.o)(i.f.LEADERBOARD.PERIOD, e);
      s[1] !== d
        ? ((l = (e) => {
            d(e);
          }),
          (s[1] = d),
          (s[2] = l))
        : (l = s[2]);
      let u = l;
      return (
        s[3] !== u || s[4] !== o
          ? ((n = { urlPeriod: o, setUrlPeriod: u }),
            (s[3] = u),
            (s[4] = o),
            (s[5] = n))
          : (n = s[5]),
        n
      );
    },
  ]);
};
