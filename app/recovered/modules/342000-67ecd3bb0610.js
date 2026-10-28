// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    l = e.i(985526),
    r = e.i(573525),
    n = e.i(237237);
  e.s([
    "f",
    0,
    function (e) {
      let i,
        a = (0, t.c)(5),
        { mint: s, onTrade: o, throttleMs: c, isEnabled: d } = e,
        u = void 0 === c ? 16 : c,
        m = void 0 === d || d,
        f = `${n.k}.${s}`;
      (a[0] !== m || a[1] !== o || a[2] !== f || a[3] !== u
        ? ((i = {
            type: l.N.Unified,
            subject: f,
            onEvent: o,
            throttleMs: u,
            enabled: m,
          }),
          (a[0] = m),
          (a[1] = o),
          (a[2] = f),
          (a[3] = u),
          (a[4] = i))
        : (i = a[4]),
        (0, r.f)(i));
    },
  ]);
};
