// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    a = e.i(439587),
    s = e.i(292686),
    i = e.i(458310);
  e.i(12692);
  var r = e.i(398902),
    l = e.i(612559),
    m = e.i(595673);
  function c() {
    ((0, m.gh)({ tabName: "launch", sourceElement: s.k9.MAYHEM_PAGE_NAV }),
      (function (e) {
        let t = document.getElementById(e);
        if (!t) return;
        let n = document.querySelector(".sticky.top-0"),
          a = n ? Math.round(n.getBoundingClientRect().height) : 0,
          s = t.getBoundingClientRect().top + window.scrollY - a - 16;
        window.scrollTo({ top: s, behavior: "smooth" });
      })("launch"));
  }
  function o() {
    return (0, m.V4)({
      buttonName: "read_mayhem_docs",
      sourceElement: s.k9.MAYHEM_PAGE_NAV,
    });
  }
  e.s(
    [
      "MayhemPageHeader",
      0,
      function () {
        let e,
          s,
          m,
          d,
          u,
          h,
          x,
          f,
          p,
          b,
          y,
          _,
          g = (0, n.c)(26),
          { t: v } = (0, r.f)();
        return (
          g[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = (0, t.jsx)(l.f, {})), (g[0] = e))
            : (e = g[0]),
          g[1] !== v
            ? ((s = v("mayhem_mode.mayhem_mode")), (g[1] = v), (g[2] = s))
            : (s = g[2]),
          g[3] !== s
            ? ((m = (0, t.jsxs)("div", {
                className: "flex items-center gap-3.5",
                children: [
                  e,
                  (0, t.jsx)("h1", {
                    className:
                      "font-semibold text-[40px] text-text-primary leading-[44px] tracking-[-0.035em] md:text-[52px] md:leading-[56px]",
                    children: s,
                  }),
                ],
              })),
              (g[3] = s),
              (g[4] = m))
            : (m = g[4]),
          g[5] !== v
            ? ((d = v("web.mayhem.page_subtitle")), (g[5] = v), (g[6] = d))
            : (d = g[6]),
          g[7] !== d
            ? ((u = (0, t.jsx)("p", {
                className:
                  "text-lg text-text-tertiary leading-7 tracking-[-0.01em]",
                children: d,
              })),
              (g[7] = d),
              (g[8] = u))
            : (u = g[8]),
          g[9] !== m || g[10] !== u
            ? ((h = (0, t.jsxs)("div", {
                className: "flex min-w-0 max-w-[720px] flex-col gap-4",
                children: [m, u],
              })),
              (g[9] = m),
              (g[10] = u),
              (g[11] = h))
            : (h = g[11]),
          g[12] !== v
            ? ((x = v("web.mayhem.docs")), (g[12] = v), (g[13] = x))
            : (x = g[13]),
          g[14] !== x
            ? ((f = (0, t.jsx)(a.L, {
                as: i.default,
                href: "/docs/mayhem-mode",
                isRounded: !0,
                size: 44,
                variant: "secondary",
                onClick: o,
                children: x,
              })),
              (g[14] = x),
              (g[15] = f))
            : (f = g[15]),
          g[16] !== v
            ? ((p = v("web.mayhem.launch_a_coin")), (g[16] = v), (g[17] = p))
            : (p = g[17]),
          g[18] !== p
            ? ((b = (0, t.jsx)(a.K, {
                isRounded: !0,
                size: 44,
                variant: "primary",
                onClick: c,
                children: p,
              })),
              (g[18] = p),
              (g[19] = b))
            : (b = g[19]),
          g[20] !== f || g[21] !== b
            ? ((y = (0, t.jsxs)("div", {
                className:
                  "flex shrink-0 items-center gap-2.5 pt-1 lg:pt-[52px]",
                children: [f, b],
              })),
              (g[20] = f),
              (g[21] = b),
              (g[22] = y))
            : (y = g[22]),
          g[23] !== y || g[24] !== h
            ? ((_ = (0, t.jsxs)("header", {
                className:
                  "flex flex-wrap items-start justify-between gap-x-6 gap-y-4 px-2 lg:flex-nowrap",
                children: [h, y],
              })),
              (g[23] = y),
              (g[24] = h),
              (g[25] = _))
            : (_ = g[25]),
          _
        );
      },
    ],
    676955,
  );
};
