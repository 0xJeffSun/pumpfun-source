// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    a = e.i(445242),
    i = e.i(426091);
  e.i(12692);
  var l = e.i(398902),
    r = e.i(375670);
  let s = "block h-2 rounded-full transition-all duration-300";
  function n(e, a) {
    return (0, t.jsx)(
      r.f,
      { className: (0, i.c)(s, "mx-0.5 w-2 animate-pulse") },
      a,
    );
  }
  e.s([
    "PaginationDots",
    0,
    (e) => {
      let r,
        n,
        c,
        o = (0, a.c)(10),
        { count: d, selectedIndex: m, onSelect: u, className: f } = e,
        { t: h } = (0, l.f)();
      return d < 2
        ? null
        : (o[0] !== f
            ? ((r = (0, i.c)("flex items-center justify-center gap-2", f)),
              (o[0] = f),
              (o[1] = r))
            : (r = o[1]),
          o[2] !== d || o[3] !== u || o[4] !== m || o[5] !== h
            ? ((n = Array.from({ length: d }, (e, a) => {
                let l = a === m;
                return (0, t.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "group flex h-6 items-center px-0.5",
                    "aria-label": h("web.live.hero_slide_dot_aria", {
                      index: a + 1,
                      total: d,
                    }),
                    "aria-current": l ? "true" : void 0,
                    onClick: () => u(a),
                    children: (0, t.jsx)("span", {
                      className: (0, i.c)(
                        s,
                        l
                          ? "w-6 bg-text-primary"
                          : "w-2 bg-text-quaternary group-hover:bg-text-tertiary",
                      ),
                    }),
                  },
                  a,
                );
              })),
              (o[2] = d),
              (o[3] = u),
              (o[4] = m),
              (o[5] = h),
              (o[6] = n))
            : (n = o[6]),
          o[7] !== r || o[8] !== n
            ? ((c = (0, t.jsx)("div", {
                className: r,
                "data-testid": "live-hero-dots",
                children: n,
              })),
              (o[7] = r),
              (o[8] = n),
              (o[9] = c))
            : (c = o[9]),
          c);
    },
    "PaginationDotsSkeleton",
    0,
    (e) => {
      let l,
        r,
        s,
        c = (0, a.c)(7),
        { count: o, className: d } = e;
      return (
        c[0] !== d
          ? ((l = (0, i.c)("flex h-6 items-center justify-center gap-2", d)),
            (c[0] = d),
            (c[1] = l))
          : (l = c[1]),
        c[2] !== o
          ? ((r = Array.from({ length: o }, n)), (c[2] = o), (c[3] = r))
          : (r = c[3]),
        c[4] !== l || c[5] !== r
          ? ((s = (0, t.jsx)("div", {
              className: l,
              "aria-hidden": !0,
              children: r,
            })),
            (c[4] = l),
            (c[5] = r),
            (c[6] = s))
          : (s = c[6]),
        s
      );
    },
  ]);
};
