// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(352386),
    a = e.i(338319);
  e.s([
    "f",
    0,
    function (e) {
      let n,
        s,
        l,
        o,
        c = (0, i.c)(15),
        { stock: m, className: d } = e,
        [h, u] = (0, r.useState)(null),
        f =
          void 0 === (o = m.imageUrl) || "" === o || /\.json(\?|$)/i.test(o)
            ? void 0
            : m.imageUrl;
      if (!f || h === f) {
        let e, i, r;
        return (
          c[0] !== d
            ? ((e = (0, a.c)(
                "flex shrink-0 items-center justify-center rounded-full bg-bg-tertiary text-xs font-semibold uppercase text-text-primary",
                d,
              )),
              (c[0] = d),
              (c[1] = e))
            : (e = c[1]),
          c[2] !== m.ticker
            ? ((i = m.ticker.charAt(0)), (c[2] = m.ticker), (c[3] = i))
            : (i = c[3]),
          c[4] !== e || c[5] !== i
            ? ((r = (0, t.jsx)("span", {
                "aria-hidden": !0,
                className: e,
                children: i,
              })),
              (c[4] = e),
              (c[5] = i),
              (c[6] = r))
            : (r = c[6]),
          r
        );
      }
      return (
        c[7] !== d
          ? ((n = (0, a.c)("shrink-0 rounded-full object-cover", d)),
            (c[7] = d),
            (c[8] = n))
          : (n = c[8]),
        c[9] !== f ? ((s = () => u(f)), (c[9] = f), (c[10] = s)) : (s = c[10]),
        c[11] !== f || c[12] !== n || c[13] !== s
          ? ((l = (0, t.jsx)("img", {
              alt: "",
              className: n,
              src: f,
              onError: s,
            })),
            (c[11] = f),
            (c[12] = n),
            (c[13] = s),
            (c[14] = l))
          : (l = c[14]),
        l
      );
    },
  ]);
};
