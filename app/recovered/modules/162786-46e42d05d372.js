// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(352386);
  e.s([
    "f",
    0,
    function (e) {
      let i,
        n,
        o,
        l,
        a = (0, t.c)(7),
        [s, c] = (0, r.useState)(void 0 !== e && e);
      a[0] !== s ? ((i = () => c(!s)), (a[0] = s), (a[1] = i)) : (i = a[1]);
      let u = i;
      a[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = () => c(!0)), (a[2] = n))
        : (n = a[2]);
      let d = n;
      a[3] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = () => c(!1)), (a[3] = o))
        : (o = a[3]);
      let f = o;
      return (
        a[4] !== u || a[5] !== s
          ? ((l = {
              value: s,
              setValue: c,
              toggleValue: u,
              setTrue: d,
              setFalse: f,
            }),
            (a[4] = u),
            (a[5] = s),
            (a[6] = l))
          : (l = a[6]),
        l
      );
    },
  ]);
};
