// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(745018);
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
      m = (0, r.c)(16),
      { bookmark: d, isActive: u, onBookmarkClick: h, iconType: x } = e;
    (m[0] !== d.id || m[1] !== h
      ? ((a = () => h(d.id)), (m[0] = d.id), (m[1] = h), (m[2] = a))
      : (a = m[2]),
      m[3] !== x || m[4] !== u
        ? ((n =
            "star" === x
              ? u
                ? (0, t.jsx)(s.G3, {
                    className: "size-4 min-w-4 text-text-primary",
                  })
                : (0, t.jsx)(i.G3, {
                    className: "size-4 min-w-4 text-text-primary",
                  })
              : null),
          (m[3] = x),
          (m[4] = u),
          (m[5] = n))
        : (n = m[5]));
    let f = "default" === d.name ? "Watchlist" : d.name;
    return (
      m[6] !== f
        ? ((l = (0, t.jsx)("span", {
            className:
              "w-full max-w-[160px] truncate text-left text-sm text-text-primary",
            children: f,
          })),
          (m[6] = f),
          (m[7] = l))
        : (l = m[7]),
      m[8] !== u
        ? ((o =
            u &&
            (0, t.jsx)(i.S7, {
              className: "size-4 min-w-4 text-text-primary",
            })),
          (m[8] = u),
          (m[9] = o))
        : (o = m[9]),
      m[10] !== d.id || m[11] !== a || m[12] !== n || m[13] !== l || m[14] !== o
        ? ((c = (0, t.jsxs)(
            "button",
            {
              onClick: a,
              className:
                "group flex w-full items-center gap-2 px-3 py-2 transition-colors hover:bg-bg-quaternary focus-inset",
              children: [n, l, o],
            },
            d.id,
          )),
          (m[10] = d.id),
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
          d,
          u,
          h,
          x,
          f,
          b,
          p,
          y,
          v,
          g = (0, r.c)(54),
          {
            bookmarks: w,
            bookmarkedItems: k,
            mint: N,
            onBookmarkClick: j,
            onHoldingsClick: _,
            onManageClick: C,
            iconType: I,
            selectMode: S,
            selectedId: T,
            holdingsActive: A,
            isSidebarHoldingsTestGroup: F,
          } = e;
        g[0] !== w
          ? ((s = void 0 === w ? [] : w), (g[0] = w), (g[1] = s))
          : (s = g[1]);
        let E = s,
          R = void 0 === I ? "star" : I,
          O = void 0 !== S && S,
          { t: B } = (0, a.f)();
        g[2] !== E
          ? ((c = E.find(o) || n.b), (g[2] = E), (g[3] = c))
          : (c = g[3]);
        let D = c;
        if (
          (g[4] !== A || g[5] !== F || g[6] !== _ || g[7] !== O || g[8] !== B
            ? ((m =
                F && O && _
                  ? (0, t.jsxs)("button", {
                      onClick: () => _(),
                      className:
                        "group flex w-full items-center gap-2 px-3 py-2 transition-colors hover:bg-bg-quaternary focus-inset",
                      children: [
                        (0, t.jsx)("span", {
                          className:
                            "w-full max-w-[160px] truncate text-left text-sm text-text-primary",
                          children: B("web.watchlist.holdings"),
                        }),
                        A &&
                          (0, t.jsx)(i.S7, {
                            className: "size-4 min-w-4 text-text-primary",
                          }),
                      ],
                    })
                  : null),
              (g[4] = A),
              (g[5] = F),
              (g[6] = _),
              (g[7] = O),
              (g[8] = B),
              (g[9] = m))
            : (m = g[9]),
          g[10] !== k ||
          g[11] !== D ||
          g[12] !== A ||
          g[13] !== N ||
          g[14] !== O ||
          g[15] !== T
            ? ((d = O ? !A && D && D.id === T : (0, n.w)(k?.[D.id], N)),
              (g[10] = k),
              (g[11] = D),
              (g[12] = A),
              (g[13] = N),
              (g[14] = O),
              (g[15] = T),
              (g[16] = d))
            : (d = g[16]),
          g[17] !== D || g[18] !== R || g[19] !== j || g[20] !== d
            ? ((u = (0, t.jsx)(l, {
                bookmark: D,
                isActive: d,
                onBookmarkClick: j,
                iconType: R,
              })),
              (g[17] = D),
              (g[18] = R),
              (g[19] = j),
              (g[20] = d),
              (g[21] = u))
            : (u = g[21]),
          g[22] !== k ||
            g[23] !== E ||
            g[24] !== A ||
            g[25] !== R ||
            g[26] !== N ||
            g[27] !== j ||
            g[28] !== O ||
            g[29] !== T)
        ) {
          let e;
          (g[31] !== k ||
          g[32] !== A ||
          g[33] !== R ||
          g[34] !== N ||
          g[35] !== j ||
          g[36] !== O ||
          g[37] !== T
            ? ((e = (e) =>
                "default" === e.name
                  ? null
                  : (0, t.jsx)(
                      l,
                      {
                        bookmark: e,
                        isActive: O ? !A && e.id === T : (0, n.w)(k?.[e.id], N),
                        onBookmarkClick: j,
                        iconType: R,
                      },
                      e.id,
                    )),
              (g[31] = k),
              (g[32] = A),
              (g[33] = R),
              (g[34] = N),
              (g[35] = j),
              (g[36] = O),
              (g[37] = T),
              (g[38] = e))
            : (e = g[38]),
            (h = E.map(e)),
            (g[22] = k),
            (g[23] = E),
            (g[24] = A),
            (g[25] = R),
            (g[26] = N),
            (g[27] = j),
            (g[28] = O),
            (g[29] = T),
            (g[30] = h));
        } else h = g[30];
        return (
          g[39] !== m || g[40] !== u || g[41] !== h
            ? ((x = (0, t.jsxs)("div", {
                className: "max-h-[199px] overflow-y-auto",
                children: [m, u, h],
              })),
              (g[39] = m),
              (g[40] = u),
              (g[41] = h),
              (g[42] = x))
            : (x = g[42]),
          g[43] === Symbol.for("react.memo_cache_sentinel")
            ? ((f = (0, t.jsx)(i.xF, {
                className: "size-4 text-text-primary",
              })),
              (g[43] = f))
            : (f = g[43]),
          g[44] !== B
            ? ((b = B("web.watchlist.manage_lists")), (g[44] = B), (g[45] = b))
            : (b = g[45]),
          g[46] !== b
            ? ((p = (0, t.jsx)("span", {
                className: "text-sm text-text-primary",
                children: b,
              })),
              (g[46] = b),
              (g[47] = p))
            : (p = g[47]),
          g[48] !== C || g[49] !== p
            ? ((y = (0, t.jsx)("div", {
                className: "border-t border-border-secondary",
                children: (0, t.jsxs)("button", {
                  className:
                    "flex w-full items-center gap-2 px-3 py-2 text-sm text-text-primary transition-colors hover:bg-bg-quaternary focus-inset",
                  onClick: C,
                  children: [f, p],
                }),
              })),
              (g[48] = C),
              (g[49] = p),
              (g[50] = y))
            : (y = g[50]),
          g[51] !== x || g[52] !== y
            ? ((v = (0, t.jsxs)(t.Fragment, { children: [x, y] })),
              (g[51] = x),
              (g[52] = y),
              (g[53] = v))
            : (v = g[53]),
          v
        );
      },
    ],
    887827,
  );
};
