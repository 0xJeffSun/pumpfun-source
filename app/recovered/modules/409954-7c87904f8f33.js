// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(146695),
    a = e.i(458310),
    n = e.i(352386),
    l = e.i(338319),
    o = e.i(432405);
  let s = (0, n.createContext)(null),
    c = s.Provider;
  e.s([
    "N",
    0,
    c,
    "o",
    0,
    (e) => {
      let c,
        d,
        m,
        x,
        u,
        p,
        b,
        f,
        h,
        g,
        y = (0, i.c)(23);
      y[0] !== e
        ? (({
            profileId: p,
            href: m,
            className: d,
            onClick: u,
            children: c,
            ...x
          } = e),
          (y[0] = e),
          (y[1] = c),
          (y[2] = d),
          (y[3] = m),
          (y[4] = x),
          (y[5] = u),
          (y[6] = p))
        : ((c = y[1]),
          (d = y[2]),
          (m = y[3]),
          (x = y[4]),
          (u = y[5]),
          (p = y[6]));
      let { isPending: v, onClick: _ } = ((e) => {
        let t,
          r,
          a = (0, i.c)(7),
          l = (0, n.useContext)(s);
        if (!l || !e) {
          let e;
          return (
            a[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((e = { isPending: !1, onClick: void 0 }), (a[0] = e))
              : (e = a[0]),
            e
          );
        }
        a[1] !== e || a[2] !== l
          ? ((t = (t) => {
              (0, o.f)(t) && (t.preventDefault(), l.navigateToProfile(e));
            }),
            (a[1] = e),
            (a[2] = l),
            (a[3] = t))
          : (t = a[3]);
        let c = t,
          d = l.pendingProfileId === e;
        return (
          a[4] !== c || a[5] !== d
            ? ((r = { isPending: d, onClick: c }),
              (a[4] = c),
              (a[5] = d),
              (a[6] = r))
            : (r = a[6]),
          r
        );
      })(p);
      y[7] !== u || y[8] !== _
        ? ((b = (e) => {
            (u?.(e), _?.(e));
          }),
          (y[7] = u),
          (y[8] = _),
          (y[9] = b))
        : (b = y[9]);
      let w = b;
      y[10] !== m || y[11] !== p
        ? ((f = m ?? (0, r.$)(p)), (y[10] = m), (y[11] = p), (y[12] = f))
        : (f = y[12]);
      let N = v || void 0,
        k = v && "cursor-progress opacity-60";
      return (
        y[13] !== d || y[14] !== k
          ? ((h = (0, l.c)(d, k)), (y[13] = d), (y[14] = k), (y[15] = h))
          : (h = y[15]),
        y[16] !== c ||
        y[17] !== x ||
        y[18] !== w ||
        y[19] !== f ||
        y[20] !== N ||
        y[21] !== h
          ? ((g = (0, t.jsx)(a.default, {
              ...x,
              href: f,
              onClick: w,
              "aria-busy": N,
              className: h,
              children: c,
            })),
            (y[16] = c),
            (y[17] = x),
            (y[18] = w),
            (y[19] = f),
            (y[20] = N),
            (y[21] = h),
            (y[22] = g))
          : (g = y[22]),
        g
      );
    },
  ]);
};
