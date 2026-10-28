// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(745018),
    l = e.i(352386),
    a = e.i(338319);
  e.s([
    "f",
    0,
    function (e) {
      let n,
        s,
        o,
        d,
        c = (0, i.c)(15),
        { src: u, alt: m, loading: f, fetchPriority: p, className: h } = e,
        x = void 0 === f ? "lazy" : f,
        [b, v] = (0, l.useState)(u ? "loading" : "error");
      return (
        c[0] !== h
          ? ((n = (0, a.c)(
              "relative block aspect-[3/5] w-full overflow-hidden rounded-md bg-bg-tertiary",
              h,
            )),
            (c[0] = h),
            (c[1] = n))
          : (n = c[1]),
        c[2] !== b
          ? ((s =
              "error" === b
                ? (0, t.jsx)("span", {
                    "aria-hidden": !0,
                    className:
                      "absolute inset-0 grid place-items-center text-text-quaternary",
                    children: (0, t.jsx)(r.CC, { className: "size-6" }),
                  })
                : null),
            (c[2] = b),
            (c[3] = s))
          : (s = c[3]),
        c[4] !== m || c[5] !== p || c[6] !== x || c[7] !== u || c[8] !== b
          ? ((o =
              u && "error" !== b
                ? (0, t.jsx)("img", {
                    src: u,
                    alt: m,
                    loading: x,
                    decoding: "async",
                    fetchPriority: p,
                    onLoad: () => v("loaded"),
                    onError: () => v("error"),
                    className: (0, a.c)(
                      "absolute inset-0 size-full object-contain transition-opacity duration-200",
                      "loaded" === b ? "opacity-100" : "opacity-0",
                    ),
                  })
                : null),
            (c[4] = m),
            (c[5] = p),
            (c[6] = x),
            (c[7] = u),
            (c[8] = b),
            (c[9] = o))
          : (o = c[9]),
        c[10] !== b || c[11] !== n || c[12] !== s || c[13] !== o
          ? ((d = (0, t.jsxs)("span", {
              className: n,
              "data-testid": "pack-slab-image",
              "data-state": b,
              children: [s, o],
            })),
            (c[10] = b),
            (c[11] = n),
            (c[12] = s),
            (c[13] = o),
            (c[14] = d))
          : (d = c[14]),
        d
      );
    },
  ]);
};
