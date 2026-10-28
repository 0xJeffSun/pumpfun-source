// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(426091),
    s = e.i(352386);
  let i = (0, s.lazy)(() =>
      e.A(723337).then((e) => ({ default: e.BountyVideoPlayerImpl })),
    ),
    a = (e) => {
      let s,
        i,
        a,
        o = (0, n.c)(7),
        { className: l, maxHeight: c } = e;
      return (
        o[0] !== l
          ? ((s = (0, r.c)("aspect-video w-full bg-bg-tertiary", l)),
            (o[0] = l),
            (o[1] = s))
          : (s = o[1]),
        o[2] !== c
          ? ((i = c ? { maxHeight: c } : void 0), (o[2] = c), (o[3] = i))
          : (i = o[3]),
        o[4] !== s || o[5] !== i
          ? ((a = (0, t.jsx)("div", {
              "aria-hidden": !0,
              className: s,
              style: i,
            })),
            (o[4] = s),
            (o[5] = i),
            (o[6] = a))
          : (a = o[6]),
        a
      );
    };
  e.s([
    "f",
    0,
    (e) => {
      let r,
        o,
        l,
        c = (0, n.c)(8);
      return (
        c[0] !== e.className || c[1] !== e.maxHeight
          ? ((r = (0, t.jsx)(a, {
              className: e.className,
              maxHeight: e.maxHeight,
            })),
            (c[0] = e.className),
            (c[1] = e.maxHeight),
            (c[2] = r))
          : (r = c[2]),
        c[3] !== e
          ? ((o = (0, t.jsx)(i, { ...e })), (c[3] = e), (c[4] = o))
          : (o = c[4]),
        c[5] !== r || c[6] !== o
          ? ((l = (0, t.jsx)(s.Suspense, { fallback: r, children: o })),
            (c[5] = r),
            (c[6] = o),
            (c[7] = l))
          : (l = c[7]),
        l
      );
    },
  ]);
};
