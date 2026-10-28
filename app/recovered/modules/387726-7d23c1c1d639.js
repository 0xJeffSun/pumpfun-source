// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(745018),
    i = e.i(352386);
  e.i(12692);
  var l = e.i(398902),
    a = e.i(116549),
    o = e.i(908163),
    s = e.i(338319);
  function u(e) {
    let i,
      a,
      s,
      u,
      c = (0, n.c)(9),
      { density: d, className: m } = e,
      { t: f } = (0, l.f)();
    return (
      c[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, t.jsx)(r.kl, { "aria-hidden": !0 })), (c[0] = i))
        : (i = c[0]),
      c[1] !== f
        ? ((a = f("web.feed.paused")), (c[1] = f), (c[2] = a))
        : (a = c[2]),
      c[3] !== a
        ? ((s = (0, t.jsx)("span", {
            className: "min-w-0 truncate",
            children: a,
          })),
          (c[3] = a),
          (c[4] = s))
        : (s = c[4]),
      c[5] !== m || c[6] !== d || c[7] !== s
        ? ((u = (0, t.jsxs)(o.E, {
            density: d,
            role: "status",
            className: m,
            children: [i, s],
          })),
          (c[5] = m),
          (c[6] = d),
          (c[7] = s),
          (c[8] = u))
        : (u = c[8]),
      u
    );
  }
  e.s([
    "q",
    0,
    function (e) {
      let r,
        l,
        o,
        c,
        d = (0, n.c)(9),
        { paused: m, className: f } = e,
        p = (0, a.v)(),
        h = p?.publish,
        g = (0, a.x)();
      return (d[0] !== m || d[1] !== h
        ? ((r = () => {
            if (h) return (h(m), () => h(!1));
          }),
          (l = [h, m]),
          (d[0] = m),
          (d[1] = h),
          (d[2] = r),
          (d[3] = l))
        : ((r = d[2]), (l = d[3])),
      (0, i.useEffect)(r, l),
      !m || p?.headerHasRoom)
        ? null
        : (d[4] !== f
            ? ((o = (0, s.c)(
                "pointer-events-none absolute top-2 right-2 z-10 border border-border-tertiary bg-bg-quaternary",
                f,
              )),
              (d[4] = f),
              (d[5] = o))
            : (o = d[5]),
          d[6] !== g || d[7] !== o
            ? ((c = (0, t.jsx)(u, { density: g, className: o })),
              (d[6] = g),
              (d[7] = o),
              (d[8] = c))
            : (c = d[8]),
          c);
    },
    "B",
    0,
    u,
  ]);
};
