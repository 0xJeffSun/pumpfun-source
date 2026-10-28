// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(763145),
    s = e.i(1074);
  let l = { extraSmall: 2, small: 3, large: 4 };
  function a(e, i) {
    return (0, t.jsx)(r.Card, { ...e, index: i }, e.id);
  }
  e.s(
    [
      "g",
      0,
      l,
      "X",
      0,
      (e) => {
        let r,
          n,
          o = (0, i.c)(9),
          {
            className: c,
            scrollContainerClassName: d,
            livestreams: m,
            onScrollNearEnd: u,
            useViewportIntersection: f,
            eager: h,
          } = e;
        return (
          o[0] !== m ? ((r = m.map(a)), (o[0] = m), (o[1] = r)) : (r = o[1]),
          o[2] !== c ||
          o[3] !== h ||
          o[4] !== u ||
          o[5] !== d ||
          o[6] !== r ||
          o[7] !== f
            ? ((n = (0, t.jsx)(s.Carousel, {
                cardCount: l,
                gapPx: 16,
                className: c,
                scrollContainerClassName: d,
                onScrollNearEnd: u,
                useViewportIntersection: f,
                eager: h,
                children: r,
              })),
              (o[2] = c),
              (o[3] = h),
              (o[4] = u),
              (o[5] = d),
              (o[6] = r),
              (o[7] = f),
              (o[8] = n))
            : (n = o[8]),
          n
        );
      },
      "k",
      0,
      16,
    ],
    647145,
  );
  var n = e.i(426091),
    o = e.i(375670);
  let c = (e) => {
    let r,
      s,
      l,
      a,
      c,
      d,
      m,
      u,
      f,
      h,
      x,
      p = (0, i.c)(25),
      { className: v } = e;
    return (
      p[0] !== v
        ? ((r = (0, n.c)("aspect-video w-full rounded-lg", v)),
          (p[0] = v),
          (p[1] = r))
        : (r = p[1]),
      p[2] !== r
        ? ((s = (0, t.jsx)(o.f, { className: r })), (p[2] = r), (p[3] = s))
        : (s = p[3]),
      p[4] !== v
        ? ((l = (0, n.c)("size-8 shrink-0 rounded-full", v)),
          (p[4] = v),
          (p[5] = l))
        : (l = p[5]),
      p[6] !== l
        ? ((a = (0, t.jsx)(o.f, { className: l })), (p[6] = l), (p[7] = a))
        : (a = p[7]),
      p[8] !== v
        ? ((c = (0, n.c)("h-3.5 w-2/3 rounded", v)), (p[8] = v), (p[9] = c))
        : (c = p[9]),
      p[10] !== c
        ? ((d = (0, t.jsx)(o.f, { className: c })), (p[10] = c), (p[11] = d))
        : (d = p[11]),
      p[12] !== v
        ? ((m = (0, n.c)("h-3 w-1/3 rounded", v)), (p[12] = v), (p[13] = m))
        : (m = p[13]),
      p[14] !== m
        ? ((u = (0, t.jsx)(o.f, { className: m })), (p[14] = m), (p[15] = u))
        : (u = p[15]),
      p[16] !== d || p[17] !== u
        ? ((f = (0, t.jsxs)("div", {
            className: "min-w-0 flex-1 space-y-1.5",
            children: [d, u],
          })),
          (p[16] = d),
          (p[17] = u),
          (p[18] = f))
        : (f = p[18]),
      p[19] !== a || p[20] !== f
        ? ((h = (0, t.jsxs)("div", {
            className: "flex items-center gap-2",
            children: [a, f],
          })),
          (p[19] = a),
          (p[20] = f),
          (p[21] = h))
        : (h = p[21]),
      p[22] !== h || p[23] !== s
        ? ((x = (0, t.jsxs)("div", {
            className: "flex w-full flex-col gap-2",
            children: [s, h],
          })),
          (p[22] = h),
          (p[23] = s),
          (p[24] = x))
        : (x = p[24]),
      x
    );
  };
  var d = e.i(502540);
  function m(e, i) {
    return (0, t.jsx)(
      "div",
      {
        className:
          "flex-shrink-0 w-[var(--card-width-small)] xl:w-[var(--card-width-large)]",
        children: (0, t.jsx)(c, { className: "bg-bg-muted" }),
      },
      i,
    );
  }
  e.s(
    [
      "SectionSkeleton",
      0,
      (e) => {
        let r,
          s,
          a,
          c,
          u = (0, i.c)(7),
          { className: f, ref: h } = e;
        return (
          u[0] !== f
            ? ((r = (0, n.c)("flex flex-col gap-4", f)), (u[0] = f), (u[1] = r))
            : (r = u[1]),
          u[2] === Symbol.for("react.memo_cache_sentinel")
            ? ((s = (0, t.jsx)("div", {
                className: "flex flex-row items-center justify-between",
                children: (0, t.jsx)(o.f, {
                  className: "h-7 w-48 rounded bg-bg-muted",
                }),
              })),
              (u[2] = s))
            : (s = u[2]),
          u[3] === Symbol.for("react.memo_cache_sentinel")
            ? ((a = (0, t.jsx)("div", {
                className: "@container flex flex-row gap-4 overflow-hidden",
                style: { ...(0, d.f)({ cardCount: l, gapPx: 16 }), gap: 16 },
                children: Array.from({ length: l.large }, m),
              })),
              (u[3] = a))
            : (a = u[3]),
          u[4] !== h || u[5] !== r
            ? ((c = (0, t.jsxs)("div", {
                className: r,
                "aria-hidden": !0,
                ref: h,
                children: [s, a],
              })),
              (u[4] = h),
              (u[5] = r),
              (u[6] = c))
            : (c = u[6]),
          c
        );
      },
    ],
    314982,
  );
};
