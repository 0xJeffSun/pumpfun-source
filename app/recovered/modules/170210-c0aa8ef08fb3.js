// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(254667),
    i = e.i(352386);
  e.i(12692);
  var n = e.i(398902),
    l = e.i(63289),
    s = e.i(544514),
    o = e.i(96906),
    c = e.i(937164),
    d = e.i(719421),
    u = e.i(984066);
  let m = (0, e.i(763916).f)(
      () => e.A(353264).then((e) => e.PositionPnlShareSheet),
      (e) => {
        a.y.warn("PnL share sheet chunk warm-up failed", {
          reason: e instanceof Error ? e.message : String(e),
        });
      },
    ),
    f = m.load,
    p = m.warm;
  function h(e) {
    return e + 1;
  }
  e.s(
    [
      "PositionPnlShareHost",
      0,
      function () {
        let e,
          m,
          b,
          x,
          g,
          y,
          v,
          w,
          _ = (0, r.c)(15),
          { t: j } = (0, n.f)(),
          [C, N] = (0, i.useState)(null),
          [S, k] = (0, i.useState)(0),
          [E, A] = (0, i.useState)(null),
          I = (0, s.f)();
        _[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (e) => {
              A(() => e);
            }),
            (_[0] = e))
          : (e = _[0]);
        let T = e;
        _[1] !== j
          ? ((m = (e) => {
              (N(null),
                ((0, d.P)(e) &&
                  "reloading" === (0, d.m)("position-pnl-share-sheet")) ||
                  (a.y.error("PnL share sheet failed to load", {
                    reason: e instanceof Error ? e.message : String(e),
                  }),
                  l.c.error(j("common.something_went_wrong"))));
            }),
            (_[1] = j),
            (_[2] = m))
          : (m = _[2]);
        let R = m;
        return (_[3] !== R
          ? ((b = () =>
              (0, u.L)((e) => {
                (N(e), k(h), f().then(T, R));
              })),
            (x = [T, R]),
            (_[3] = R),
            (_[4] = b),
            (_[5] = x))
          : ((b = _[4]), (x = _[5])),
        (0, i.useEffect)(b, x),
        _[6] !== E || _[7] !== I
          ? ((g = () => {
              if (!(!I || null !== E || (0, c.f)()))
                return (0, o.f)(() => p(T));
            }),
            (y = [I, E, T]),
            (_[6] = E),
            (_[7] = I),
            (_[8] = g),
            (_[9] = y))
          : ((g = _[8]), (y = _[9])),
        (0, i.useEffect)(g, y),
        C && null !== E)
          ? (_[10] === Symbol.for("react.memo_cache_sentinel")
              ? ((v = () => N(null)), (_[10] = v))
              : (v = _[10]),
            _[11] !== E || _[12] !== C || _[13] !== S
              ? ((w = (0, t.jsx)(E, { request: C, onClose: v }, S)),
                (_[11] = E),
                (_[12] = C),
                (_[13] = S),
                (_[14] = w))
              : (w = _[14]),
            w)
          : null;
      },
    ],
    170210,
  );
};
