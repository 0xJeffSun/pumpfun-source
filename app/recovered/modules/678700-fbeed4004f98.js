// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t,
    n = e.i(445242),
    i = e.i(311282),
    r = e.i(986071),
    a = (((t = {}).TERMINAL = "terminal"), (t.WATCHLIST = "watchlist"), t);
  let s = ["terminal", "watchlist"];
  e.s([
    "z",
    () => a,
    "N",
    0,
    function () {
      let e,
        t,
        a = (0, n.c)(4);
      a[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((e = (0, i.b)(s).withDefault("terminal")), (a[0] = e))
        : (e = a[0]);
      let [l, o] = (0, i.o)(r.f.HOME.FEED, e);
      return (
        a[1] !== l || a[2] !== o
          ? ((t = { homeFeed: l, setHomeFeed: o }),
            (a[1] = l),
            (a[2] = o),
            (a[3] = t))
          : (t = a[3]),
        t
      );
    },
  ]);
};
