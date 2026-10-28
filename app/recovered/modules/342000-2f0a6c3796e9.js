// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(985526),
    s = e.i(573525),
    a = e.i(237237);
  e.s([
    "f",
    0,
    function (e) {
      let r,
        n = (0, t.c)(5),
        { mint: l, onTrade: o, throttleMs: c, isEnabled: d } = e,
        x = void 0 === c ? 16 : c,
        h = void 0 === d || d,
        u = `${a.k}.${l}`;
      (n[0] !== h || n[1] !== o || n[2] !== u || n[3] !== x
        ? ((r = {
            type: i.N.Unified,
            subject: u,
            onEvent: o,
            throttleMs: x,
            enabled: h,
          }),
          (n[0] = h),
          (n[1] = o),
          (n[2] = u),
          (n[3] = x),
          (n[4] = r))
        : (r = n[4]),
        (0, s.f)(r));
    },
  ]);
};
