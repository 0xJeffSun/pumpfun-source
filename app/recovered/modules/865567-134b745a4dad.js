// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(254667),
    a = e.i(352386);
  e.i(12692);
  var o = e.i(398902),
    i = e.i(544514),
    n = e.i(815748),
    s = e.i(984724),
    c = e.i(326929),
    d = e.i(441057);
  function m(e) {
    return e + 1;
  }
  e.s([
    "f",
    0,
    function (e) {
      let u,
        p,
        h,
        b,
        x,
        f,
        g,
        y = (0, r.c)(37),
        { t: v } = (0, o.f)(),
        w = e.view ?? "candle";
      y[0] !== e.candleClassName || y[1] !== e.heightPx || y[2] !== w
        ? ((u = null != e.heightPx || e.candleClassName ? void 0 : (0, c.l)(w)),
          (y[0] = e.candleClassName),
          (y[1] = e.heightPx),
          (y[2] = w),
          (y[3] = u))
        : (u = y[3]);
      let S = u;
      y[4] !== S || y[5] !== e.heightPx
        ? ((p = null != e.heightPx ? { height: e.heightPx } : { minHeight: S }),
          (y[4] = S),
          (y[5] = e.heightPx),
          (y[6] = p))
        : (p = y[6]);
      let N = p,
        [C, j] = (0, a.useState)(null),
        [P, k] = (0, a.useState)(!1),
        [T, M] = (0, a.useState)(0),
        _ = (0, i.f)();
      y[7] === Symbol.for("react.memo_cache_sentinel")
        ? ((h = () => {
            (k(!1), M(m));
          }),
          (y[7] = h))
        : (h = y[7]);
      let U = h;
      if (
        (y[8] !== _
          ? ((b = () => {
              if (!_) return;
              let e = !1;
              return (
                (0, d.f)()
                  .then((t) => {
                    e || (j(() => t.default), k(!1));
                  })
                  .catch((t) => {
                    e ||
                      (l.y.error("Failed to load coin page chart", {
                        error: t,
                      }),
                      j(null),
                      k(!0));
                  }),
                () => {
                  e = !0;
                }
              );
            }),
            (y[8] = _),
            (y[9] = b))
          : (b = y[9]),
        y[10] !== _ || y[11] !== T
          ? ((x = [_, T]), (y[10] = _), (y[11] = T), (y[12] = x))
          : (x = y[12]),
        (0, a.useEffect)(b, x),
        P)
      ) {
        let e;
        return (
          y[13] !== w
            ? ((e = (0, t.jsx)(n.f, { onRetry: U, view: w })),
              (y[13] = w),
              (y[14] = e))
            : (e = y[14]),
          e
        );
      }
      if (!C) {
        let r,
          l,
          a,
          o,
          i = e.coin,
          n = e.displayMode ?? e.defaultMode;
        y[15] !== v
          ? ((r = v("web.chart.loading_chart")), (y[15] = v), (y[16] = r))
          : (r = y[16]);
        let c = null != e.heightPx,
          d = !e.hideHeader;
        y[17] !== e.extraDisabledFeatures
          ? ((l = e.extraDisabledFeatures?.includes("timeframes_toolbar")),
            (y[17] = e.extraDisabledFeatures),
            (y[18] = l))
          : (l = y[18]);
        let m = !l;
        return (
          y[19] !== e.coin ||
          y[20] !== e.lineToolbarClassName ||
          y[21] !== m ||
          y[22] !== n ||
          y[23] !== r ||
          y[24] !== c ||
          y[25] !== d ||
          y[26] !== w
            ? ((a = (0, t.jsx)(s.f, {
                coin: i,
                displayMode: n,
                "aria-label": r,
                view: w,
                fill: c,
                header: d,
                footer: m,
                lineToolbarClassName: e.lineToolbarClassName,
              })),
              (y[19] = e.coin),
              (y[20] = e.lineToolbarClassName),
              (y[21] = m),
              (y[22] = n),
              (y[23] = r),
              (y[24] = c),
              (y[25] = d),
              (y[26] = w),
              (y[27] = a))
            : (a = y[27]),
          y[28] !== N || y[29] !== a
            ? ((o = (0, t.jsx)("div", {
                className: "w-full overflow-hidden",
                style: N,
                children: a,
              })),
              (y[28] = N),
              (y[29] = a),
              (y[30] = o))
            : (o = y[30]),
          o
        );
      }
      return (
        y[31] !== C || y[32] !== e
          ? ((f = (0, t.jsx)(C, { ...e })),
            (y[31] = C),
            (y[32] = e),
            (y[33] = f))
          : (f = y[33]),
        y[34] !== N || y[35] !== f
          ? ((g = (0, t.jsx)("div", {
              className: "w-full overflow-hidden",
              style: N,
              children: f,
            })),
            (y[34] = N),
            (y[35] = f),
            (y[36] = g))
          : (g = y[36]),
        g
      );
    },
  ]);
};
