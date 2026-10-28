// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var l = e.i(732486),
    s = e.i(445242),
    i = e.i(439587),
    t = e.i(352386);
  e.i(12692);
  var a = e.i(398902),
    c = e.i(660947),
    n = e.i(895222);
  e.i(490510);
  var o = e.i(580510),
    r = e.i(740598),
    u = e.i(539319),
    h = e.i(235079),
    m = e.i(722936),
    d = e.i(513466),
    g = e.i(425890),
    f = e.i(338319);
  function x(e) {
    let i,
      o,
      r,
      u,
      g,
      x,
      j,
      S,
      v,
      p,
      T,
      b,
      N = (0, s.c)(30),
      { coin: _ } = e,
      { t: w } = (0, a.f)(),
      [C, P] = (0, t.useState)("holders"),
      [y, V] = (0, t.useState)("pump_fun");
    return (
      N[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (e) => P(e)), (N[0] = i))
        : (i = N[0]),
      N[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((o = (0, f.c)(n.f, "mb-0")), (N[1] = o))
        : (o = N[1]),
      N[2] !== w
        ? ((r = w("coin_details.sections.holders.title")),
          (N[2] = w),
          (N[3] = r))
        : (r = N[3]),
      N[4] !== r
        ? ((u = (0, l.jsx)(d.k, {
            value: "holders",
            className: n.g,
            children: r,
          })),
          (N[4] = r),
          (N[5] = u))
        : (u = N[5]),
      N[6] !== w
        ? ((g = w("coin_details.sections.callouts.title")),
          (N[6] = w),
          (N[7] = g))
        : (g = N[7]),
      N[8] !== g
        ? ((x = (0, l.jsx)(d.k, {
            value: "callouts",
            className: n.g,
            children: g,
          })),
          (N[8] = g),
          (N[9] = x))
        : (x = N[9]),
      N[10] !== u || N[11] !== x
        ? ((j = (0, l.jsxs)(d.U, { className: o, children: [u, x] })),
          (N[10] = u),
          (N[11] = x),
          (N[12] = j))
        : (j = N[12]),
      N[13] !== _ || N[14] !== y || N[15] !== C
        ? ((S =
            "holders" === C
              ? (0, l.jsx)(m.l, {
                  coin: _,
                  value: y,
                  onValueChange: V,
                  tabsListClassName: "mb-0",
                })
              : null),
          (N[13] = _),
          (N[14] = y),
          (N[15] = C),
          (N[16] = S))
        : (S = N[16]),
      N[17] !== j || N[18] !== S
        ? ((v = (0, l.jsxs)("div", {
            className: "mb-2 flex flex-wrap items-center justify-between gap-2",
            children: [j, S],
          })),
          (N[17] = j),
          (N[18] = S),
          (N[19] = v))
        : (v = N[19]),
      N[20] !== _ || N[21] !== y
        ? ((p = (0, l.jsx)(d.S, {
            value: "holders",
            className: "mt-0",
            children: (0, l.jsx)(h.f, {
              coin: _,
              limit: 20,
              holdersFilter: y,
              className: "max-w-none",
            }),
          })),
          (N[20] = _),
          (N[21] = y),
          (N[22] = p))
        : (p = N[22]),
      N[23] !== _
        ? ((T = (0, l.jsx)(d.S, {
            value: "callouts",
            className: "mt-0",
            children: (0, l.jsx)(c.f, { coin: _, hideViewerSection: !0 }),
          })),
          (N[23] = _),
          (N[24] = T))
        : (T = N[24]),
      N[25] !== p || N[26] !== T || N[27] !== v || N[28] !== C
        ? ((b = (0, l.jsxs)(d.i, {
            value: C,
            onValueChange: i,
            children: [v, p, T],
          })),
          (N[25] = p),
          (N[26] = T),
          (N[27] = v),
          (N[28] = C),
          (N[29] = b))
        : (b = N[29]),
      b
    );
  }
  function j(e) {
    let h,
      m,
      d,
      g,
      f,
      x,
      j,
      S,
      v,
      p,
      T,
      b = (0, s.c)(34),
      { coin: N } = e,
      { t: _ } = (0, a.f)(),
      [w, C] = (0, t.useState)("holders"),
      P = (0, u.f)();
    return (
      b[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((h = (e) => C(String(e))), (b[0] = h))
        : (h = b[0]),
      b[1] !== _
        ? ((m = _("coin_details.sections.holders.title")),
          (b[1] = _),
          (b[2] = m))
        : (m = b[2]),
      b[3] !== m
        ? ((d = (0, l.jsx)(i.T, {
            value: "holders",
            className: n.s,
            children: m,
          })),
          (b[3] = m),
          (b[4] = d))
        : (d = b[4]),
      b[5] !== _
        ? ((g = _("coin_details.sections.callouts.title")),
          (b[5] = _),
          (b[6] = g))
        : (g = b[6]),
      b[7] !== g
        ? ((f = (0, l.jsx)(i.T, {
            value: "callouts",
            className: n.s,
            children: g,
          })),
          (b[7] = g),
          (b[8] = f))
        : (f = b[8]),
      b[9] !== d || b[10] !== f
        ? ((x = (0, l.jsxs)(i.X, { className: n.R, children: [d, f] })),
          (b[9] = d),
          (b[10] = f),
          (b[11] = x))
        : (x = b[11]),
      b[12] !== N ||
      b[13] !== P.filter ||
      b[14] !== P.setPnl ||
      b[15] !== P.setScope ||
      b[16] !== P.setSearch ||
      b[17] !== P.toggleTag ||
      b[18] !== w
        ? ((j =
            "holders" === w
              ? (0, l.jsx)(r.f, {
                  onToggleTag: P.toggleTag,
                  coin: N,
                  filter: P.filter,
                  onScopeChange: P.setScope,
                  onSearchChange: P.setSearch,
                  onPnlChange: P.setPnl,
                  compact: !0,
                })
              : null),
          (b[12] = N),
          (b[13] = P.filter),
          (b[14] = P.setPnl),
          (b[15] = P.setScope),
          (b[16] = P.setSearch),
          (b[17] = P.toggleTag),
          (b[18] = w),
          (b[19] = j))
        : (j = b[19]),
      b[20] !== x || b[21] !== j
        ? ((S = (0, l.jsxs)("div", {
            className: "mb-2 flex flex-wrap items-center justify-between gap-2",
            children: [x, j],
          })),
          (b[20] = x),
          (b[21] = j),
          (b[22] = S))
        : (S = b[22]),
      b[23] !== N || b[24] !== P.filter || b[25] !== P.toggleTag
        ? ((v = (0, l.jsx)(i.S, {
            value: "holders",
            children: (0, l.jsx)(o.f, {
              coin: N,
              limit: 20,
              filter: P.filter,
              onToggleTag: P.toggleTag,
              className: "max-w-none",
            }),
          })),
          (b[23] = N),
          (b[24] = P.filter),
          (b[25] = P.toggleTag),
          (b[26] = v))
        : (v = b[26]),
      b[27] !== N
        ? ((p = (0, l.jsx)(i.S, {
            value: "callouts",
            children: (0, l.jsx)(c.f, { coin: N, hideViewerSection: !0 }),
          })),
          (b[27] = N),
          (b[28] = p))
        : (p = b[28]),
      b[29] !== p || b[30] !== S || b[31] !== v || b[32] !== w
        ? ((T = (0, l.jsxs)(i.i, {
            value: w,
            onValueChange: h,
            children: [S, v, p],
          })),
          (b[29] = p),
          (b[30] = S),
          (b[31] = v),
          (b[32] = w),
          (b[33] = T))
        : (T = b[33]),
      T
    );
  }
  e.s([
    "ReplayHoldersCalloutsTabs",
    0,
    function (e) {
      let i,
        t = (0, s.c)(3),
        { coin: a } = e,
        c = (0, g.f)();
      return (
        t[0] !== a || t[1] !== c
          ? ((i = c ? (0, l.jsx)(j, { coin: a }) : (0, l.jsx)(x, { coin: a })),
            (t[0] = a),
            (t[1] = c),
            (t[2] = i))
          : (i = t[2]),
        i
      );
    },
  ]);
};
