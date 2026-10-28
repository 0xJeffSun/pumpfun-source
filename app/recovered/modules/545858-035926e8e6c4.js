// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    a = e.i(352386),
    s = e.i(618860),
    i = e.i(338319);
  let r = (0, a.lazy)(() =>
    e.A(65450).then((e) => ({ default: e.MayhemLaunchCtaInner })),
  );
  e.s([
    "MayhemLaunchCta",
    0,
    function () {
      let e,
        l,
        m,
        c = (0, n.c)(3);
      return (
        c[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (0, t.jsxs)("div", {
              className: "flex flex-col gap-2 px-2",
              children: [
                (0, t.jsx)("div", {
                  className:
                    "h-8 w-72 max-w-full animate-pulse rounded-full bg-bg-tertiary md:h-9",
                }),
                (0, t.jsx)("div", {
                  className:
                    "h-6 w-96 max-w-full animate-pulse rounded-full bg-bg-tertiary",
                }),
              ],
            })),
            (c[0] = e))
          : (e = c[0]),
        c[1] === Symbol.for("react.memo_cache_sentinel")
          ? ((l = (0, t.jsx)("div", {
              className: (0, i.c)(s.O, "h-[512px] animate-pulse"),
            })),
            (c[1] = l))
          : (l = c[1]),
        c[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((m = (0, t.jsx)(a.Suspense, {
              fallback: (0, t.jsxs)("div", {
                className: "flex flex-col gap-6",
                children: [
                  e,
                  (0, t.jsxs)("div", {
                    className:
                      "grid items-start gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]",
                    children: [
                      l,
                      (0, t.jsxs)("div", {
                        className: "grid grid-cols-1 gap-3.5",
                        children: [
                          (0, t.jsx)("div", {
                            className: (0, i.c)(s.O, "h-[248px] animate-pulse"),
                          }),
                          (0, t.jsx)("div", {
                            className: (0, i.c)(s.O, "h-[248px] animate-pulse"),
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              children: (0, t.jsx)(r, {}),
            })),
            (c[2] = m))
          : (m = c[2]),
        m
      );
    },
  ]);
};
