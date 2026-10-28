// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    a = e.i(445242),
    i = e.i(426091);
  let l = "lg:mx-12 xl:mx-16",
    r =
      "flex snap-x snap-mandatory gap-4 overflow-x-auto scrollbar-hidden [--hero-pad:24px] lg:[--hero-pad:48px] xl:[--hero-pad:96px] 2xl:[--hero-pad:128px]",
    s = () => ({
      "--hero-card-w": "min(1200px, calc(100cqw - 2 * var(--hero-pad)))",
      paddingInline: "calc((100cqw - var(--hero-card-w)) / 2)",
    });
  (e.s(
    [
      "F",
      0,
      "w-[var(--hero-card-w)] shrink-0 snap-center",
      "B",
      0,
      "relative flex flex-col lg:block",
      "c",
      0,
      16,
      "s",
      0,
      "w-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-[260px] lg:overflow-hidden xl:w-[340px]",
      "h",
      0,
      "w-full min-w-0 lg:pr-[260px] xl:pr-[340px]",
      "C",
      0,
      r,
      "U",
      0,
      l,
      "f",
      0,
      s,
    ],
    829010,
  ),
    e.s(
      [
        "HeroStage",
        0,
        (e) => {
          let n,
            c,
            o,
            d,
            m,
            u,
            f = (0, a.c)(14),
            {
              children: h,
              containerRef: x,
              scrollRef: p,
              overlay: v,
              className: g,
            } = e;
          return (
            f[0] !== g
              ? ((n = (0, i.c)("relative", g)), (f[0] = g), (f[1] = n))
              : (n = f[1]),
            f[2] === Symbol.for("react.memo_cache_sentinel")
              ? ((c = (0, i.c)("@container", l)), (f[2] = c))
              : (c = f[2]),
            f[3] === Symbol.for("react.memo_cache_sentinel")
              ? ((o = s()), (f[3] = o))
              : (o = f[3]),
            f[4] !== h || f[5] !== p
              ? ((d = (0, t.jsx)("div", {
                  ref: p,
                  className: r,
                  style: o,
                  children: h,
                })),
                (f[4] = h),
                (f[5] = p),
                (f[6] = d))
              : (d = f[6]),
            f[7] !== x || f[8] !== d
              ? ((m = (0, t.jsx)("div", { ref: x, className: c, children: d })),
                (f[7] = x),
                (f[8] = d),
                (f[9] = m))
              : (m = f[9]),
            f[10] !== v || f[11] !== n || f[12] !== m
              ? ((u = (0, t.jsxs)("div", { className: n, children: [m, v] })),
                (f[10] = v),
                (f[11] = n),
                (f[12] = m),
                (f[13] = u))
              : (u = f[13]),
            u
          );
        },
      ],
      187807,
    ));
};
