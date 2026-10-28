// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(745018),
    a = e.i(352386),
    n = e.i(338319);
  e.s([
    "f",
    0,
    function (e) {
      let l,
        o,
        s,
        c,
        d = (0, i.c)(15),
        { src: m, alt: x, loading: u, fetchPriority: p, className: b } = e,
        f = void 0 === u ? "lazy" : u,
        [h, g] = (0, a.useState)(m ? "loading" : "error");
      return (
        d[0] !== b
          ? ((l = (0, n.c)(
              "relative block aspect-[3/5] w-full overflow-hidden rounded-md bg-bg-tertiary",
              b,
            )),
            (d[0] = b),
            (d[1] = l))
          : (l = d[1]),
        d[2] !== h
          ? ((o =
              "error" === h
                ? (0, t.jsx)("span", {
                    "aria-hidden": !0,
                    className:
                      "absolute inset-0 grid place-items-center text-text-quaternary",
                    children: (0, t.jsx)(r.CC, { className: "size-6" }),
                  })
                : null),
            (d[2] = h),
            (d[3] = o))
          : (o = d[3]),
        d[4] !== x || d[5] !== p || d[6] !== f || d[7] !== m || d[8] !== h
          ? ((s =
              m && "error" !== h
                ? (0, t.jsx)("img", {
                    src: m,
                    alt: x,
                    loading: f,
                    decoding: "async",
                    fetchPriority: p,
                    onLoad: () => g("loaded"),
                    onError: () => g("error"),
                    className: (0, n.c)(
                      "absolute inset-0 size-full object-contain transition-opacity duration-200",
                      "loaded" === h ? "opacity-100" : "opacity-0",
                    ),
                  })
                : null),
            (d[4] = x),
            (d[5] = p),
            (d[6] = f),
            (d[7] = m),
            (d[8] = h),
            (d[9] = s))
          : (s = d[9]),
        d[10] !== h || d[11] !== l || d[12] !== o || d[13] !== s
          ? ((c = (0, t.jsxs)("span", {
              className: l,
              "data-testid": "pack-slab-image",
              "data-state": h,
              children: [o, s],
            })),
            (d[10] = h),
            (d[11] = l),
            (d[12] = o),
            (d[13] = s),
            (d[14] = c))
          : (c = d[14]),
        c
      );
    },
  ]);
};
