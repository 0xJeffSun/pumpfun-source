// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(745018);
  e.i(12692);
  var a = e.i(398902),
    n = e.i(960107),
    s = e.i(157633);
  let l = (e) => {
    let a,
      n,
      l,
      o,
      c,
      m = (0, i.c)(16),
      { bookmark: u, isActive: d, onBookmarkClick: f, iconType: p } = e;
    (m[0] !== u.id || m[1] !== f
      ? ((a = () => f(u.id)), (m[0] = u.id), (m[1] = f), (m[2] = a))
      : (a = m[2]),
      m[3] !== p || m[4] !== d
        ? ((n =
            "star" === p
              ? d
                ? (0, t.jsx)(s.G3, {
                    className: "size-4 min-w-4 text-text-primary",
                  })
                : (0, t.jsx)(r.G3, {
                    className: "size-4 min-w-4 text-text-primary",
                  })
              : null),
          (m[3] = p),
          (m[4] = d),
          (m[5] = n))
        : (n = m[5]));
    let h = "default" === u.name ? "Watchlist" : u.name;
    return (
      m[6] !== h
        ? ((l = (0, t.jsx)("span", {
            className:
              "w-full max-w-[160px] truncate text-left text-sm text-text-primary",
            children: h,
          })),
          (m[6] = h),
          (m[7] = l))
        : (l = m[7]),
      m[8] !== d
        ? ((o =
            d &&
            (0, t.jsx)(r.S7, {
              className: "size-4 min-w-4 text-text-primary",
            })),
          (m[8] = d),
          (m[9] = o))
        : (o = m[9]),
      m[10] !== u.id || m[11] !== a || m[12] !== n || m[13] !== l || m[14] !== o
        ? ((c = (0, t.jsxs)(
            "button",
            {
              onClick: a,
              className:
                "group flex w-full items-center gap-2 px-3 py-2 transition-colors hover:bg-bg-quaternary focus-inset",
              children: [n, l, o],
            },
            u.id,
          )),
          (m[10] = u.id),
          (m[11] = a),
          (m[12] = n),
          (m[13] = l),
          (m[14] = o),
          (m[15] = c))
        : (c = m[15]),
      c
    );
  };
  function o(e) {
    return "default" === e.name;
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let s,
          c,
          m,
          u,
          d,
          f,
          p,
          h,
          x,
          v,
          g,
          b,
          y = (0, i.c)(54),
          {
            bookmarks: _,
            bookmarkedItems: j,
            mint: N,
            onBookmarkClick: w,
            onHoldingsClick: k,
            onManageClick: C,
            iconType: I,
            selectMode: S,
            selectedId: E,
            holdingsActive: M,
            isSidebarHoldingsTestGroup: R,
          } = e;
        y[0] !== _
          ? ((s = void 0 === _ ? [] : _), (y[0] = _), (y[1] = s))
          : (s = y[1]);
        let T = s,
          $ = void 0 === I ? "star" : I,
          A = void 0 !== S && S,
          { t: z } = (0, a.f)();
        y[2] !== T
          ? ((c = T.find(o) || n.b), (y[2] = T), (y[3] = c))
          : (c = y[3]);
        let F = c;
        if (
          (y[4] !== M || y[5] !== R || y[6] !== k || y[7] !== A || y[8] !== z
            ? ((m =
                R && A && k
                  ? (0, t.jsxs)("button", {
                      onClick: () => k(),
                      className:
                        "group flex w-full items-center gap-2 px-3 py-2 transition-colors hover:bg-bg-quaternary focus-inset",
                      children: [
                        (0, t.jsx)("span", {
                          className:
                            "w-full max-w-[160px] truncate text-left text-sm text-text-primary",
                          children: z("web.watchlist.holdings"),
                        }),
                        M &&
                          (0, t.jsx)(r.S7, {
                            className: "size-4 min-w-4 text-text-primary",
                          }),
                      ],
                    })
                  : null),
              (y[4] = M),
              (y[5] = R),
              (y[6] = k),
              (y[7] = A),
              (y[8] = z),
              (y[9] = m))
            : (m = y[9]),
          y[10] !== j ||
          y[11] !== F ||
          y[12] !== M ||
          y[13] !== N ||
          y[14] !== A ||
          y[15] !== E
            ? ((u = A ? !M && F && F.id === E : (0, n.w)(j?.[F.id], N)),
              (y[10] = j),
              (y[11] = F),
              (y[12] = M),
              (y[13] = N),
              (y[14] = A),
              (y[15] = E),
              (y[16] = u))
            : (u = y[16]),
          y[17] !== F || y[18] !== $ || y[19] !== w || y[20] !== u
            ? ((d = (0, t.jsx)(l, {
                bookmark: F,
                isActive: u,
                onBookmarkClick: w,
                iconType: $,
              })),
              (y[17] = F),
              (y[18] = $),
              (y[19] = w),
              (y[20] = u),
              (y[21] = d))
            : (d = y[21]),
          y[22] !== j ||
            y[23] !== T ||
            y[24] !== M ||
            y[25] !== $ ||
            y[26] !== N ||
            y[27] !== w ||
            y[28] !== A ||
            y[29] !== E)
        ) {
          let e;
          (y[31] !== j ||
          y[32] !== M ||
          y[33] !== $ ||
          y[34] !== N ||
          y[35] !== w ||
          y[36] !== A ||
          y[37] !== E
            ? ((e = (e) =>
                "default" === e.name
                  ? null
                  : (0, t.jsx)(
                      l,
                      {
                        bookmark: e,
                        isActive: A ? !M && e.id === E : (0, n.w)(j?.[e.id], N),
                        onBookmarkClick: w,
                        iconType: $,
                      },
                      e.id,
                    )),
              (y[31] = j),
              (y[32] = M),
              (y[33] = $),
              (y[34] = N),
              (y[35] = w),
              (y[36] = A),
              (y[37] = E),
              (y[38] = e))
            : (e = y[38]),
            (f = T.map(e)),
            (y[22] = j),
            (y[23] = T),
            (y[24] = M),
            (y[25] = $),
            (y[26] = N),
            (y[27] = w),
            (y[28] = A),
            (y[29] = E),
            (y[30] = f));
        } else f = y[30];
        return (
          y[39] !== m || y[40] !== d || y[41] !== f
            ? ((p = (0, t.jsxs)("div", {
                className: "max-h-[199px] overflow-y-auto",
                children: [m, d, f],
              })),
              (y[39] = m),
              (y[40] = d),
              (y[41] = f),
              (y[42] = p))
            : (p = y[42]),
          y[43] === Symbol.for("react.memo_cache_sentinel")
            ? ((h = (0, t.jsx)(r.xF, {
                className: "size-4 text-text-primary",
              })),
              (y[43] = h))
            : (h = y[43]),
          y[44] !== z
            ? ((x = z("web.watchlist.manage_lists")), (y[44] = z), (y[45] = x))
            : (x = y[45]),
          y[46] !== x
            ? ((v = (0, t.jsx)("span", {
                className: "text-sm text-text-primary",
                children: x,
              })),
              (y[46] = x),
              (y[47] = v))
            : (v = y[47]),
          y[48] !== C || y[49] !== v
            ? ((g = (0, t.jsx)("div", {
                className: "border-t border-border-secondary",
                children: (0, t.jsxs)("button", {
                  className:
                    "flex w-full items-center gap-2 px-3 py-2 text-sm text-text-primary transition-colors hover:bg-bg-quaternary focus-inset",
                  onClick: C,
                  children: [h, v],
                }),
              })),
              (y[48] = C),
              (y[49] = v),
              (y[50] = g))
            : (g = y[50]),
          y[51] !== p || y[52] !== g
            ? ((b = (0, t.jsxs)(t.Fragment, { children: [p, g] })),
              (y[51] = p),
              (y[52] = g),
              (y[53] = b))
            : (b = y[53]),
          b
        );
      },
    ],
    887827,
  );
};
