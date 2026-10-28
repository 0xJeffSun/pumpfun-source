// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(254667),
    i = e.i(352386);
  e.i(12692);
  var n = e.i(398902),
    l = e.i(63289),
    s = e.i(730721);
  let o = (0, e.i(763916).f)(
      () => e.A(104887).then((e) => e.PositionReplayDialog),
      (e) => {
        a.y.warn("Position replay dialog chunk warm-up failed", {
          reason: e instanceof Error ? e.message : String(e),
        });
      },
    ),
    c = o.load,
    d = o.warm;
  var u = e.i(544514),
    m = e.i(96906),
    f = e.i(937164);
  let p = new Set(["slow-2g", "2g", "3g"]);
  var h = e.i(719421);
  e.s(
    [
      "PositionReplayHost",
      0,
      function () {
        let e,
          o,
          b,
          x,
          g,
          y,
          v,
          w,
          _,
          j = (0, r.c)(17),
          { t: C } = (0, n.f)(),
          [N, S] = (0, i.useState)(null),
          [k, E] = (0, i.useState)(0),
          [A, I] = (0, i.useState)(null),
          T = (0, u.f)();
        j[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (e) => {
              I(() => e);
            }),
            (j[0] = e))
          : (e = j[0]);
        let R = e;
        j[1] !== C
          ? ((o = (e) => {
              (S(null),
                ((0, h.P)(e) &&
                  "reloading" === (0, h.m)("position-replay-dialog")) ||
                  (a.y.error("Position replay dialog failed to load", {
                    reason: e instanceof Error ? e.message : String(e),
                  }),
                  l.c.error(C("common.something_went_wrong"))));
            }),
            (j[1] = C),
            (j[2] = o))
          : (o = j[2]);
        let L = o;
        j[3] !== L
          ? ((b = (e) => {
              (E(Date.now()), S(e), c().then(R, L));
            }),
            (j[3] = L),
            (j[4] = b))
          : (b = j[4]);
        let O = b;
        (j[5] !== O
          ? ((x = () => (0, s.u)(O)),
            (g = [O]),
            (j[5] = O),
            (j[6] = x),
            (j[7] = g))
          : ((x = j[6]), (g = j[7])),
          (0, i.useEffect)(x, g),
          j[8] !== A || j[9] !== T
            ? ((y = () => {
                if (
                  T &&
                  null === A &&
                  !(
                    (0, f.f)() ||
                    (() => {
                      if ("u" < typeof navigator) return !1;
                      let e = navigator.connection,
                        t = e?.effectiveType;
                      return void 0 !== t && p.has(t);
                    })()
                  )
                )
                  return (0, m.f)(() => d(R));
              }),
              (v = [T, A, R]),
              (j[8] = A),
              (j[9] = T),
              (j[10] = y),
              (j[11] = v))
            : ((y = j[10]), (v = j[11])),
          (0, i.useEffect)(y, v),
          j[12] === Symbol.for("react.memo_cache_sentinel")
            ? ((w = () => S(null)), (j[12] = w))
            : (w = j[12]));
        let M = w;
        return null === A
          ? null
          : (j[13] !== A || j[14] !== k || j[15] !== N
              ? ((_ = (0, t.jsx)(A, { request: N, openedAt: k, onClose: M })),
                (j[13] = A),
                (j[14] = k),
                (j[15] = N),
                (j[16] = _))
              : (_ = j[16]),
            _);
      },
    ],
    831706,
  );
};
