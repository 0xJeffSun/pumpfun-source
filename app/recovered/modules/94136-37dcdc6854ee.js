// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242);
  e.i(12692);
  var r = e.i(398902),
    i = e.i(607122),
    l = e.i(994533),
    a = e.i(338319);
  e.s(
    [
      "f",
      0,
      function (e) {
        let o,
          s,
          u,
          c,
          d,
          m = (0, n.c)(19),
          { density: f, value: p, onChange: h, boards: g, className: y } = e,
          v = void 0 === g ? l.f : g,
          { t: b } = (0, r.f)();
        if (m[0] !== v || m[1] !== b) {
          let e;
          (m[3] !== b
            ? ((e = (e) => ({ value: e, label: b(l.U[e]) })),
              (m[3] = b),
              (m[4] = e))
            : (e = m[4]),
            (o = v.map(e)),
            (m[0] = v),
            (m[1] = b),
            (m[2] = o));
        } else o = m[2];
        let w = o;
        return (
          m[5] !== y
            ? ((s = (0, a.c)("flex shrink-0 items-center", y)),
              (m[5] = y),
              (m[6] = s))
            : (s = m[6]),
          m[7] !== b
            ? ((u = b("web.screeners.trending_boards_a11y")),
              (m[7] = b),
              (m[8] = u))
            : (u = m[8]),
          m[9] !== p || m[10] !== f || m[11] !== w || m[12] !== h || m[13] !== u
            ? ((c = (0, t.jsx)(i.X, {
                density: f,
                value: p,
                onValueChange: h,
                options: w,
                "aria-label": u,
              })),
              (m[9] = p),
              (m[10] = f),
              (m[11] = w),
              (m[12] = h),
              (m[13] = u),
              (m[14] = c))
            : (c = m[14]),
          m[15] !== p || m[16] !== s || m[17] !== c
            ? ((d = (0, t.jsx)("div", {
                className: s,
                "data-testid": "trending-board",
                "data-board": p,
                children: c,
              })),
              (m[15] = p),
              (m[16] = s),
              (m[17] = c),
              (m[18] = d))
            : (d = m[18]),
          d
        );
      },
    ],
    94136,
  );
  var o = e.i(745018),
    s = e.i(372550),
    u = e.i(491208),
    c = e.i(187611);
  let d = {
      terminal: {
        inline: "hidden @[145px]/trending-window:flex",
        dropdown:
          "hidden @[75px]/trending-window:flex @[145px]/trending-window:hidden",
        bare: "@[75px]/trending-window:hidden",
      },
      comfortable: {
        inline: "hidden @[161px]/trending-window:flex",
        dropdown:
          "hidden @[83px]/trending-window:flex @[161px]/trending-window:hidden",
        bare: "@[83px]/trending-window:hidden",
      },
    },
    m = {
      terminal:
        "@container/trending-window flex min-w-0 grow basis-[57px] items-center justify-end",
      comfortable:
        "@container/trending-window flex min-w-0 grow basis-[63px] items-center justify-end",
    },
    f = u.W.map((e) => ({ value: e, label: e })),
    p = u.W.map((e) => ({ value: e, label: (0, c.T)(e, "number-format") }));
  e.s(
    [
      "f",
      0,
      function (e) {
        let l,
          u,
          c,
          h,
          g,
          y,
          v,
          b,
          w,
          x,
          k,
          M,
          C = (0, n.c)(40),
          { density: I, align: S, value: N, onChange: A } = e,
          j = void 0 === S ? "start" : S,
          { t: _ } = (0, r.f)();
        C[0] !== _
          ? ((l = _("web.settings.feed.trending_window")),
            (C[0] = _),
            (C[1] = l))
          : (l = C[1]);
        let U = l,
          E = d[I],
          T = m[I];
        return (
          C[2] !== E.inline
            ? ((u = (0, a.c)("shrink-0 items-center", E.inline)),
              (C[2] = E.inline),
              (C[3] = u))
            : (u = C[3]),
          C[4] !== I || C[5] !== U || C[6] !== A || C[7] !== N
            ? ((c = (0, t.jsx)(i.X, {
                density: I,
                value: N,
                onValueChange: A,
                options: f,
                "aria-label": U,
              })),
              (C[4] = I),
              (C[5] = U),
              (C[6] = A),
              (C[7] = N),
              (C[8] = c))
            : (c = C[8]),
          C[9] !== u || C[10] !== c
            ? ((h = (0, t.jsx)("div", {
                className: u,
                "data-testid": "trending-window-inline",
                children: c,
              })),
              (C[9] = u),
              (C[10] = c),
              (C[11] = h))
            : (h = C[11]),
          C[12] !== E.dropdown
            ? ((g = (0, a.c)("flex shrink-0 items-center", E.dropdown)),
              (C[12] = E.dropdown),
              (C[13] = g))
            : (g = C[13]),
          C[14] === Symbol.for("react.memo_cache_sentinel")
            ? ((y = (0, t.jsx)(o.E$, { "aria-hidden": !0 })), (C[14] = y))
            : (y = C[14]),
          C[15] !== j ||
          C[16] !== I ||
          C[17] !== U ||
          C[18] !== A ||
          C[19] !== N
            ? ((v = (0, t.jsx)(s.f, {
                density: I,
                "aria-label": U,
                value: N,
                onChange: A,
                options: p,
                leading: y,
                align: j,
                "data-testid": "trending-window",
              })),
              (C[15] = j),
              (C[16] = I),
              (C[17] = U),
              (C[18] = A),
              (C[19] = N),
              (C[20] = v))
            : (v = C[20]),
          C[21] !== g || C[22] !== v
            ? ((b = (0, t.jsx)("div", {
                className: g,
                "data-testid": "trending-window-dropdown",
                children: v,
              })),
              (C[21] = g),
              (C[22] = v),
              (C[23] = b))
            : (b = C[23]),
          C[24] !== E.bare
            ? ((w = (0, a.c)("flex shrink-0 items-center", E.bare)),
              (C[24] = E.bare),
              (C[25] = w))
            : (w = C[25]),
          C[26] !== j ||
          C[27] !== I ||
          C[28] !== U ||
          C[29] !== A ||
          C[30] !== N
            ? ((x = (0, t.jsx)(s.f, {
                density: I,
                "aria-label": U,
                value: N,
                onChange: A,
                options: p,
                align: j,
                "data-testid": "trending-window-bare-chip",
              })),
              (C[26] = j),
              (C[27] = I),
              (C[28] = U),
              (C[29] = A),
              (C[30] = N),
              (C[31] = x))
            : (x = C[31]),
          C[32] !== w || C[33] !== x
            ? ((k = (0, t.jsx)("div", {
                className: w,
                "data-testid": "trending-window-bare",
                children: x,
              })),
              (C[32] = w),
              (C[33] = x),
              (C[34] = k))
            : (k = C[34]),
          C[35] !== b || C[36] !== k || C[37] !== T || C[38] !== h
            ? ((M = (0, t.jsxs)("div", {
                className: T,
                "data-testid": "trending-window-slot",
                children: [h, b, k],
              })),
              (C[35] = b),
              (C[36] = k),
              (C[37] = T),
              (C[38] = h),
              (C[39] = M))
            : (M = C[39]),
          M
        );
      },
    ],
    10824,
  );
};
