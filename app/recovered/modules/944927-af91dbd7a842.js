// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    r = e.i(426091),
    n = e.i(256272);
  let i = "shadow-[0_-1px_0_0_var(--color-border-secondary)]";
  e.s([
    "COIN_PAGE_PANEL_SEAM_CLASSNAME",
    0,
    i,
    "CoinPageFrame",
    0,
    function (e) {
      let a,
        s,
        o,
        c,
        d,
        u,
        m = (0, l.c)(24),
        { topBand: f, leftColumn: x, rightColumn: h, className: p } = e;
      if ("panel" !== (0, n.u)()) {
        let e, l, r, n;
        return (
          m[0] !== x
            ? ((e = (0, t.jsx)("div", {
                className: "w-full flex-1 lg:min-w-0",
                id: "coin-content-container",
                children: x,
              })),
              (m[0] = x),
              (m[1] = e))
            : (e = m[1]),
          m[2] !== h
            ? ((l = (0, t.jsx)("div", {
                className: "w-coin-right-col lg:flex-shrink-0",
                children: h,
              })),
              (m[2] = h),
              (m[3] = l))
            : (l = m[3]),
          m[4] !== e || m[5] !== l
            ? ((r = (0, t.jsxs)("div", {
                className: "flex w-full flex-col gap-3 lg:flex-row",
                children: [e, l],
              })),
              (m[4] = e),
              (m[5] = l),
              (m[6] = r))
            : (r = m[6]),
          m[7] !== r || m[8] !== f
            ? ((n = (0, t.jsxs)(t.Fragment, { children: [f, r] })),
              (m[7] = r),
              (m[8] = f),
              (m[9] = n))
            : (n = m[9]),
          n
        );
      }
      return (
        m[10] !== p
          ? ((a = (0, r.c)(
              "w-full overflow-clip border-b border-border-tertiary bg-bg-primary tabular-nums",
              "flex flex-col",
              p,
            )),
            (m[10] = p),
            (m[11] = a))
          : (a = m[11]),
        m[12] === Symbol.for("react.memo_cache_sentinel")
          ? ((s = (0, r.c)("flex w-full flex-1 flex-col lg:flex-row", i)),
            (m[12] = s))
          : (s = m[12]),
        m[13] !== x
          ? ((o = (0, t.jsx)("div", {
              className: "flex w-full min-w-0 flex-1 flex-col",
              id: "coin-content-container",
              children: x,
            })),
            (m[13] = x),
            (m[14] = o))
          : (o = m[14]),
        m[15] !== h
          ? ((c = (0, t.jsx)("div", {
              className:
                "flex w-coin-right-col flex-col lg:flex-shrink-0 lg:border-l lg:border-border-tertiary",
              children: (0, t.jsx)("div", {
                className:
                  "flex flex-col scrollbar-hide lg:sticky lg:top-[var(--layout-top-offset,109px)] lg:max-h-[calc(100dvh-var(--layout-top-offset,109px))] lg:overflow-x-hidden lg:overflow-y-auto",
                children: h,
              }),
            })),
            (m[15] = h),
            (m[16] = c))
          : (c = m[16]),
        m[17] !== o || m[18] !== c
          ? ((d = (0, t.jsxs)("div", { className: s, children: [o, c] })),
            (m[17] = o),
            (m[18] = c),
            (m[19] = d))
          : (d = m[19]),
        m[20] !== a || m[21] !== d || m[22] !== f
          ? ((u = (0, t.jsxs)("div", {
              className: a,
              "data-surface": "panel",
              children: [f, d],
            })),
            (m[20] = a),
            (m[21] = d),
            (m[22] = f),
            (m[23] = u))
          : (u = m[23]),
        u
      );
    },
    "CoinPagePanel",
    0,
    function (e) {
      let a,
        s,
        o,
        c,
        d,
        u,
        m = (0, l.c)(18);
      if (
        (m[0] !== e
          ? (({ className: s, panelClassName: o, children: a, ...c } = e),
            (m[0] = e),
            (m[1] = a),
            (m[2] = s),
            (m[3] = o),
            (m[4] = c))
          : ((a = m[1]), (s = m[2]), (o = m[3]), (c = m[4])),
        "panel" !== (0, n.u)())
      ) {
        let e;
        if (!s && 0 === Object.keys(c).length) {
          let e;
          return (
            m[5] !== a
              ? ((e = (0, t.jsx)(t.Fragment, { children: a })),
                (m[5] = a),
                (m[6] = e))
              : (e = m[6]),
            e
          );
        }
        return (
          m[7] !== a || m[8] !== s || m[9] !== c
            ? ((e = (0, t.jsx)("div", { className: s, ...c, children: a })),
              (m[7] = a),
              (m[8] = s),
              (m[9] = c),
              (m[10] = e))
            : (e = m[10]),
          e
        );
      }
      return (
        m[11] !== s || m[12] !== o
          ? ((d = (0, r.c)("empty:hidden", i, o, s)),
            (m[11] = s),
            (m[12] = o),
            (m[13] = d))
          : (d = m[13]),
        m[14] !== a || m[15] !== c || m[16] !== d
          ? ((u = (0, t.jsx)("div", { className: d, ...c, children: a })),
            (m[14] = a),
            (m[15] = c),
            (m[16] = d),
            (m[17] = u))
          : (u = m[17]),
        u
      );
    },
  ]);
};
