// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242);
  e.i(12692);
  var r = e.i(398902),
    i = e.i(170450),
    l = e.i(632817),
    a = e.i(890088),
    o = e.i(592209),
    s = e.i(338319),
    u = e.i(633311);
  e.s([
    "f",
    0,
    function (e) {
      let d,
        c,
        f,
        m,
        p,
        h,
        y = (0, n.c)(25),
        {
          timestamp: g,
          live: v,
          density: b,
          suffix: w,
          showTitle: k,
          fallback: S,
          className: C,
        } = e,
        A = void 0 === v || v,
        x = void 0 === S ? null : S,
        M = w ?? "comfortable" === (void 0 === b ? "comfortable" : b),
        { t: _, i18n: T } = (0, r.f)(),
        D = (0, i.f)(),
        P = (0, u.l)(g);
      y[0] !== P || y[1] !== M || y[2] !== _
        ? ((d = (e) =>
            null === P || e === l.Y
              ? ""
              : (0, a.f)({ t: _, elapsedMs: e - P, suffix: M })),
          (y[0] = P),
          (y[1] = M),
          (y[2] = _),
          (y[3] = d))
        : (d = y[3]);
      let j = d,
        L = (0, l.H)(j, A && null !== P);
      y[4] !== P
        ? ((c = null === P ? void 0 : new Date(P).toISOString()),
          (y[4] = P),
          (y[5] = c))
        : (c = y[5]);
      let F = c;
      e: {
        let e;
        if (!(void 0 !== k && k) || null === P) {
          f = void 0;
          break e;
        }
        if (y[6] !== P || y[7] !== T.language) {
          let t = (0, o.v)(T.language) ?? "en";
          ((e = (0, a.V)(P, t)), (y[6] = P), (y[7] = T.language), (y[8] = e));
        } else e = y[8];
        f = e;
      }
      let N = f;
      if (null === P) {
        let e;
        return (
          y[9] !== x
            ? ((e = (0, t.jsx)(t.Fragment, { children: x })),
              (y[9] = x),
              (y[10] = e))
            : (e = y[10]),
          e
        );
      }
      y[11] !== P ||
      y[12] !== D ||
      y[13] !== A ||
      y[14] !== L ||
      y[15] !== M ||
      y[16] !== _
        ? ((m = D && A ? L : (0, a.K)({ t: _, timestampMs: P, suffix: M })),
          (y[11] = P),
          (y[12] = D),
          (y[13] = A),
          (y[14] = L),
          (y[15] = M),
          (y[16] = _),
          (y[17] = m))
        : (m = y[17]);
      let O = m,
        $ = D ? N : void 0;
      return (
        y[18] !== C
          ? ((p = (0, s.c)("tabular-nums", C)), (y[18] = C), (y[19] = p))
          : (p = y[19]),
        y[20] !== F || y[21] !== O || y[22] !== p || y[23] !== $
          ? ((h = (0, t.jsx)("time", {
              dateTime: F,
              suppressHydrationWarning: !0,
              title: $,
              className: p,
              children: O,
            })),
            (y[20] = F),
            (y[21] = O),
            (y[22] = p),
            (y[23] = $),
            (y[24] = h))
          : (h = y[24]),
        h
      );
    },
  ]);
};
