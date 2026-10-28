// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    r = e.i(745018),
    i = e.i(352386),
    a = e.i(338319);
  e.s([
    "f",
    0,
    function (e) {
      let s,
        n,
        o,
        d,
        c = (0, l.c)(15),
        { src: u, alt: m, loading: p, fetchPriority: f, className: x } = e,
        h = void 0 === p ? "lazy" : p,
        [g, y] = (0, i.useState)(u ? "loading" : "error");
      return (
        c[0] !== x
          ? ((s = (0, a.c)(
              "relative block aspect-[3/5] w-full overflow-hidden rounded-md bg-bg-tertiary",
              x,
            )),
            (c[0] = x),
            (c[1] = s))
          : (s = c[1]),
        c[2] !== g
          ? ((n =
              "error" === g
                ? (0, t.jsx)("span", {
                    "aria-hidden": !0,
                    className:
                      "absolute inset-0 grid place-items-center text-text-quaternary",
                    children: (0, t.jsx)(r.CC, { className: "size-6" }),
                  })
                : null),
            (c[2] = g),
            (c[3] = n))
          : (n = c[3]),
        c[4] !== m || c[5] !== f || c[6] !== h || c[7] !== u || c[8] !== g
          ? ((o =
              u && "error" !== g
                ? (0, t.jsx)("img", {
                    src: u,
                    alt: m,
                    loading: h,
                    decoding: "async",
                    fetchPriority: f,
                    onLoad: () => y("loaded"),
                    onError: () => y("error"),
                    className: (0, a.c)(
                      "absolute inset-0 size-full object-contain transition-opacity duration-200",
                      "loaded" === g ? "opacity-100" : "opacity-0",
                    ),
                  })
                : null),
            (c[4] = m),
            (c[5] = f),
            (c[6] = h),
            (c[7] = u),
            (c[8] = g),
            (c[9] = o))
          : (o = c[9]),
        c[10] !== g || c[11] !== s || c[12] !== n || c[13] !== o
          ? ((d = (0, t.jsxs)("span", {
              className: s,
              "data-testid": "pack-slab-image",
              "data-state": g,
              children: [n, o],
            })),
            (c[10] = g),
            (c[11] = s),
            (c[12] = n),
            (c[13] = o),
            (c[14] = d))
          : (d = c[14]),
        d
      );
    },
  ]);
};
