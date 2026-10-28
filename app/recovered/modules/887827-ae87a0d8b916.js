// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(745018);
  e.i(12692);
  var i = e.i(398902),
    n = e.i(960107),
    l = e.i(157633);
  let s = (e) => {
    let i,
      n,
      s,
      o,
      c,
      d = (0, r.c)(16),
      { bookmark: m, isActive: u, onBookmarkClick: f, iconType: h } = e;
    (d[0] !== m.id || d[1] !== f
      ? ((i = () => f(m.id)), (d[0] = m.id), (d[1] = f), (d[2] = i))
      : (i = d[2]),
      d[3] !== h || d[4] !== u
        ? ((n =
            "star" === h
              ? u
                ? (0, t.jsx)(l.G3, {
                    className: "size-4 min-w-4 text-text-primary",
                  })
                : (0, t.jsx)(a.G3, {
                    className: "size-4 min-w-4 text-text-primary",
                  })
              : null),
          (d[3] = h),
          (d[4] = u),
          (d[5] = n))
        : (n = d[5]));
    let p = "default" === m.name ? "Watchlist" : m.name;
    return (
      d[6] !== p
        ? ((s = (0, t.jsx)("span", {
            className:
              "w-full max-w-[160px] truncate text-left text-sm text-text-primary",
            children: p,
          })),
          (d[6] = p),
          (d[7] = s))
        : (s = d[7]),
      d[8] !== u
        ? ((o =
            u &&
            (0, t.jsx)(a.S7, {
              className: "size-4 min-w-4 text-text-primary",
            })),
          (d[8] = u),
          (d[9] = o))
        : (o = d[9]),
      d[10] !== m.id || d[11] !== i || d[12] !== n || d[13] !== s || d[14] !== o
        ? ((c = (0, t.jsxs)(
            "button",
            {
              onClick: i,
              className:
                "group flex w-full items-center gap-2 px-3 py-2 transition-colors hover:bg-bg-quaternary focus-inset",
              children: [n, s, o],
            },
            m.id,
          )),
          (d[10] = m.id),
          (d[11] = i),
          (d[12] = n),
          (d[13] = s),
          (d[14] = o),
          (d[15] = c))
        : (c = d[15]),
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
        let l,
          c,
          d,
          m,
          u,
          f,
          h,
          p,
          x,
          g,
          b,
          v,
          y = (0, r.c)(54),
          {
            bookmarks: j,
            bookmarkedItems: w,
            mint: N,
            onBookmarkClick: _,
            onHoldingsClick: k,
            onManageClick: S,
            iconType: C,
            selectMode: M,
            selectedId: E,
            holdingsActive: A,
            isSidebarHoldingsTestGroup: R,
          } = e;
        y[0] !== j
          ? ((l = void 0 === j ? [] : j), (y[0] = j), (y[1] = l))
          : (l = y[1]);
        let D = l,
          z = void 0 === C ? "star" : C,
          T = void 0 !== M && M,
          { t: P } = (0, i.f)();
        y[2] !== D
          ? ((c = D.find(o) || n.b), (y[2] = D), (y[3] = c))
          : (c = y[3]);
        let B = c;
        if (
          (y[4] !== A || y[5] !== R || y[6] !== k || y[7] !== T || y[8] !== P
            ? ((d =
                R && T && k
                  ? (0, t.jsxs)("button", {
                      onClick: () => k(),
                      className:
                        "group flex w-full items-center gap-2 px-3 py-2 transition-colors hover:bg-bg-quaternary focus-inset",
                      children: [
                        (0, t.jsx)("span", {
                          className:
                            "w-full max-w-[160px] truncate text-left text-sm text-text-primary",
                          children: P("web.watchlist.holdings"),
                        }),
                        A &&
                          (0, t.jsx)(a.S7, {
                            className: "size-4 min-w-4 text-text-primary",
                          }),
                      ],
                    })
                  : null),
              (y[4] = A),
              (y[5] = R),
              (y[6] = k),
              (y[7] = T),
              (y[8] = P),
              (y[9] = d))
            : (d = y[9]),
          y[10] !== w ||
          y[11] !== B ||
          y[12] !== A ||
          y[13] !== N ||
          y[14] !== T ||
          y[15] !== E
            ? ((m = T ? !A && B && B.id === E : (0, n.w)(w?.[B.id], N)),
              (y[10] = w),
              (y[11] = B),
              (y[12] = A),
              (y[13] = N),
              (y[14] = T),
              (y[15] = E),
              (y[16] = m))
            : (m = y[16]),
          y[17] !== B || y[18] !== z || y[19] !== _ || y[20] !== m
            ? ((u = (0, t.jsx)(s, {
                bookmark: B,
                isActive: m,
                onBookmarkClick: _,
                iconType: z,
              })),
              (y[17] = B),
              (y[18] = z),
              (y[19] = _),
              (y[20] = m),
              (y[21] = u))
            : (u = y[21]),
          y[22] !== w ||
            y[23] !== D ||
            y[24] !== A ||
            y[25] !== z ||
            y[26] !== N ||
            y[27] !== _ ||
            y[28] !== T ||
            y[29] !== E)
        ) {
          let e;
          (y[31] !== w ||
          y[32] !== A ||
          y[33] !== z ||
          y[34] !== N ||
          y[35] !== _ ||
          y[36] !== T ||
          y[37] !== E
            ? ((e = (e) =>
                "default" === e.name
                  ? null
                  : (0, t.jsx)(
                      s,
                      {
                        bookmark: e,
                        isActive: T ? !A && e.id === E : (0, n.w)(w?.[e.id], N),
                        onBookmarkClick: _,
                        iconType: z,
                      },
                      e.id,
                    )),
              (y[31] = w),
              (y[32] = A),
              (y[33] = z),
              (y[34] = N),
              (y[35] = _),
              (y[36] = T),
              (y[37] = E),
              (y[38] = e))
            : (e = y[38]),
            (f = D.map(e)),
            (y[22] = w),
            (y[23] = D),
            (y[24] = A),
            (y[25] = z),
            (y[26] = N),
            (y[27] = _),
            (y[28] = T),
            (y[29] = E),
            (y[30] = f));
        } else f = y[30];
        return (
          y[39] !== d || y[40] !== u || y[41] !== f
            ? ((h = (0, t.jsxs)("div", {
                className: "max-h-[199px] overflow-y-auto",
                children: [d, u, f],
              })),
              (y[39] = d),
              (y[40] = u),
              (y[41] = f),
              (y[42] = h))
            : (h = y[42]),
          y[43] === Symbol.for("react.memo_cache_sentinel")
            ? ((p = (0, t.jsx)(a.xF, {
                className: "size-4 text-text-primary",
              })),
              (y[43] = p))
            : (p = y[43]),
          y[44] !== P
            ? ((x = P("web.watchlist.manage_lists")), (y[44] = P), (y[45] = x))
            : (x = y[45]),
          y[46] !== x
            ? ((g = (0, t.jsx)("span", {
                className: "text-sm text-text-primary",
                children: x,
              })),
              (y[46] = x),
              (y[47] = g))
            : (g = y[47]),
          y[48] !== S || y[49] !== g
            ? ((b = (0, t.jsx)("div", {
                className: "border-t border-border-secondary",
                children: (0, t.jsxs)("button", {
                  className:
                    "flex w-full items-center gap-2 px-3 py-2 text-sm text-text-primary transition-colors hover:bg-bg-quaternary focus-inset",
                  onClick: S,
                  children: [p, g],
                }),
              })),
              (y[48] = S),
              (y[49] = g),
              (y[50] = b))
            : (b = y[50]),
          y[51] !== h || y[52] !== b
            ? ((v = (0, t.jsxs)(t.Fragment, { children: [h, b] })),
              (y[51] = h),
              (y[52] = b),
              (y[53] = v))
            : (v = y[53]),
          v
        );
      },
    ],
    887827,
  );
};
