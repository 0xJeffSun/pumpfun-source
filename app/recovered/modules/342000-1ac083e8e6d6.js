// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(985526),
    i = e.i(573525),
    l = e.i(237237);
  e.s([
    "f",
    0,
    function (e) {
      let n,
        a = (0, t.c)(5),
        { mint: s, onTrade: o, throttleMs: d, isEnabled: c } = e,
        u = void 0 === d ? 16 : d,
        m = void 0 === c || c,
        h = `${l.k}.${s}`;
      (a[0] !== m || a[1] !== o || a[2] !== h || a[3] !== u
        ? ((n = {
            type: r.N.Unified,
            subject: h,
            onEvent: o,
            throttleMs: u,
            enabled: m,
          }),
          (a[0] = m),
          (a[1] = o),
          (a[2] = h),
          (a[3] = u),
          (a[4] = n))
        : (n = a[4]),
        (0, i.f)(n));
    },
  ]);
};
