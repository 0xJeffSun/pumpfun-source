// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    s = e.i(445242),
    i = e.i(426091),
    l = e.i(659226),
    n = e.i(458310),
    r = e.i(352386),
    o = e.i(238442),
    a = e.i(256272),
    h = e.i(375670),
    d = e.i(787773),
    c = e.i(967694),
    u = e.i(21193),
    m = e.i(696500),
    f = e.i(108305),
    g = e.i(446929),
    p = e.i(288912),
    v = e.i(909316),
    b = e.i(745018),
    x = e.i(745674);
  function w(e) {
    let i,
      l,
      n,
      o,
      a,
      h = (0, s.c)(15),
      { label: d, active: c, content: u } = e,
      [w, y] = (0, r.useState)(!1),
      C = c ? "" : void 0;
    return (
      h[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((i = (0, t.jsx)(b.w3, { className: "size-3.5" })), (h[0] = i))
        : (i = h[0]),
      h[1] !== c
        ? ((l = c
            ? (0, t.jsx)("span", {
                "aria-hidden": !0,
                className:
                  "absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-bg-accent",
              })
            : null),
          (h[1] = c),
          (h[2] = l))
        : (l = h[2]),
      h[3] !== c || h[4] !== d || h[5] !== C || h[6] !== l
        ? ((n = (0, t.jsxs)(m.f.Trigger, {
            type: "button",
            "aria-label": d,
            "aria-pressed": c,
            "data-active": C,
            "data-testid": "data-list-filter",
            className: x.V,
            children: [i, l],
          })),
          (h[3] = c),
          (h[4] = d),
          (h[5] = C),
          (h[6] = l),
          (h[7] = n))
        : (n = h[7]),
      h[8] !== u || h[9] !== d
        ? ((o = (0, t.jsx)(f.f.Portal, {
            children: (0, t.jsx)(g.f.Positioner, {
              side: "bottom",
              align: "start",
              sideOffset: 6,
              collisionPadding: 12,
              className: "z-[1000]",
              children: (0, t.jsx)(p.f.Popup, {
                "aria-label": d,
                className: x.q,
                "data-testid": "data-list-filter-popup",
                children: u,
              }),
            }),
          })),
          (h[8] = u),
          (h[9] = d),
          (h[10] = o))
        : (o = h[10]),
      h[11] !== w || h[12] !== n || h[13] !== o
        ? ((a = (0, t.jsxs)(v.f.Root, {
            open: w,
            onOpenChange: y,
            children: [n, o],
          })),
          (h[11] = w),
          (h[12] = n),
          (h[13] = o),
          (h[14] = a))
        : (a = h[14]),
      a
    );
  }
  var y = e.i(936947);
  let C = { start: "text-left", end: "text-right" },
    S = { asc: "↑", desc: "↓" },
    j = { asc: "ascending", desc: "descending" },
    M = (e) => {
      let i,
        l,
        r,
        o,
        a,
        h,
        d,
        c,
        u,
        m = (0, s.c)(18);
      m[0] !== e
        ? (({
            href: i,
            label: l,
            prefetch: h,
            onMouseEnter: o,
            onMouseLeave: a,
            ...r
          } = e),
          (m[0] = e),
          (m[1] = i),
          (m[2] = l),
          (m[3] = r),
          (m[4] = o),
          (m[5] = a),
          (m[6] = h))
        : ((i = m[1]),
          (l = m[2]),
          (r = m[3]),
          (o = m[4]),
          (a = m[5]),
          (h = m[6]));
      let f = void 0 !== h && h;
      return (
        m[7] !== o
          ? ((d =
              o &&
              ((e) => {
                (0, y.j)(e) && o(e);
              })),
            (m[7] = o),
            (m[8] = d))
          : (d = m[8]),
        m[9] !== a
          ? ((c =
              a &&
              ((e) => {
                (0, y.j)(e) && a(e);
              })),
            (m[9] = a),
            (m[10] = c))
          : (c = m[10]),
        m[11] !== i ||
        m[12] !== l ||
        m[13] !== r ||
        m[14] !== f ||
        m[15] !== d ||
        m[16] !== c
          ? ((u = (0, t.jsx)(n.default, {
              href: i,
              prefetch: f,
              ...r,
              onMouseEnter: d,
              onMouseLeave: c,
              "aria-label": l,
              "data-row-cover": "",
              className: x.r,
            })),
            (m[11] = i),
            (m[12] = l),
            (m[13] = r),
            (m[14] = f),
            (m[15] = d),
            (m[16] = c),
            (m[17] = u))
          : (u = m[17]),
        u
      );
    },
    z = (e) => {
      let i,
        l,
        n = (0, s.c)(19),
        { row: r, onRowClick: o, rowHref: a, rowActionLabel: h } = e;
      n[0] !== r || n[1] !== a
        ? ((i = a?.(r)), (n[0] = r), (n[1] = a), (n[2] = i))
        : (i = n[2]);
      let d = i;
      n[3] !== r || n[4] !== h
        ? ((l = h?.(r)), (n[3] = r), (n[4] = h), (n[5] = l))
        : (l = n[5]);
      let c = l;
      if (d) {
        let e, s;
        return (
          n[6] !== o || n[7] !== r
            ? ((e = o ? () => o(r) : void 0),
              (n[6] = o),
              (n[7] = r),
              (n[8] = e))
            : (e = n[8]),
          n[9] !== d || n[10] !== c || n[11] !== e
            ? ((s = (0, t.jsx)(M, { href: d, label: c, onClick: e })),
              (n[9] = d),
              (n[10] = c),
              (n[11] = e),
              (n[12] = s))
            : (s = n[12]),
          s
        );
      }
      if (o) {
        let e, s;
        return (
          n[13] !== o || n[14] !== r
            ? ((e = () => o(r)), (n[13] = o), (n[14] = r), (n[15] = e))
            : (e = n[15]),
          n[16] !== c || n[17] !== e
            ? ((s = (0, t.jsx)("button", {
                type: "button",
                "aria-label": c,
                "data-row-cover": "",
                className: x.r,
                onClick: e,
              })),
              (n[16] = c),
              (n[17] = e),
              (n[18] = s))
            : (s = n[18]),
          s
        );
      }
      return null;
    },
    O = (e) => {
      let l,
        n,
        r,
        o,
        a = (0, s.c)(34),
        { column: h, sortState: d, onToggle: c, sortIndicator: u } = e,
        m = void 0 === u ? "always" : u;
      a[0] !== h || a[1] !== d
        ? ((l =
            "function" == typeof h.header ? h.header({ sort: d }) : h.header),
          (a[0] = h),
          (a[1] = d),
          (a[2] = l))
        : (l = a[2]);
      let f = l,
        g = !!(h.sortFn || h.sortable);
      a[3] !== h.filter || a[4] !== h.headerControls
        ? ((n =
            h.headerControls || h.filter
              ? (0, t.jsxs)("span", {
                  className: "inline-flex items-center gap-1",
                  children: [
                    h.headerControls,
                    h.filter ? (0, t.jsx)(w, { ...h.filter }) : null,
                  ],
                })
              : null),
          (a[3] = h.filter),
          (a[4] = h.headerControls),
          (a[5] = n))
        : (n = a[5]);
      let p = n,
        v = h.headerControlsPlacement
          ? "before" === h.headerControlsPlacement
          : "end" === h.align;
      if (
        a[6] !== h ||
        a[7] !== f ||
        a[8] !== p ||
        a[9] !== v ||
        a[10] !== g ||
        a[11] !== c ||
        a[12] !== m ||
        a[13] !== d
      ) {
        o = Symbol.for("react.early_return_sentinel");
        e: {
          let e,
            s,
            l,
            n,
            u,
            b = (0, i.c)(
              "flex items-center gap-1",
              "end" === h.align && "justify-end",
            );
          if (!g) {
            o = p
              ? (0, t.jsxs)("span", {
                  className: b,
                  children: [v ? p : null, f, v ? null : p],
                })
              : (0, t.jsx)(t.Fragment, { children: f });
            break e;
          }
          let w = d?.columnId === h.id ? d : null,
            y = "end" === h.align,
            C = y && null !== p && !v,
            j = y && !C && "relative",
            M = w && "text-text-primary",
            z = "active" === m && "group/sort";
          (a[16] !== j || a[17] !== M || a[18] !== z
            ? ((e = (0, i.c)(x.n, j, M, z)),
              (a[16] = j),
              (a[17] = M),
              (a[18] = z),
              (a[19] = e))
            : (e = a[19]),
            a[20] !== h || a[21] !== c
              ? ((s = () => c(h)), (a[20] = h), (a[21] = c), (a[22] = s))
              : (s = a[22]));
          let O = y && "absolute left-full top-1/2 ml-1 -translate-y-1/2",
            I =
              !w &&
              ("active" === m
                ? "opacity-0 transition-opacity group-hover/sort:opacity-40 group-focus-visible/sort:opacity-40"
                : "opacity-40");
          a[23] !== O || a[24] !== I
            ? ((l = (0, i.c)("w-2 text-[11px]", O, I)),
              (a[23] = O),
              (a[24] = I),
              (a[25] = l))
            : (l = a[25]);
          let E = w ? S[w.direction] : S.asc;
          (a[26] !== l || a[27] !== E
            ? ((n = (0, t.jsx)("span", {
                "aria-hidden": !0,
                className: l,
                children: E,
              })),
              (a[26] = l),
              (a[27] = E),
              (a[28] = n))
            : (n = a[28]),
            a[29] !== f || a[30] !== s || a[31] !== n || a[32] !== e
              ? ((u = (0, t.jsxs)("button", {
                  type: "button",
                  className: e,
                  onClick: s,
                  children: [f, n],
                })),
                (a[29] = f),
                (a[30] = s),
                (a[31] = n),
                (a[32] = e),
                (a[33] = u))
              : (u = a[33]));
          let k = u;
          r = p
            ? (0, t.jsxs)("span", {
                className: (0, i.c)(b, C && "relative"),
                children: [v ? p : null, k, v ? null : p],
              })
            : k;
        }
        ((a[6] = h),
          (a[7] = f),
          (a[8] = p),
          (a[9] = v),
          (a[10] = g),
          (a[11] = c),
          (a[12] = m),
          (a[13] = d),
          (a[14] = r),
          (a[15] = o));
      } else ((r = a[14]), (o = a[15]));
      return o !== Symbol.for("react.early_return_sentinel") ? o : r;
    },
    I = ({
      rows: e,
      columns: s,
      rowKey: n,
      density: r,
      scrollRef: o,
      estimateRowHeight: a,
      overscan: d = 8,
      sortState: c,
      onToggleSort: u,
      sortIndicator: m,
      ariaLabel: f,
      rowClasses: g,
      rowClickHandler: p,
      rowIntentProps: v,
      rowAttributes: b,
      cellClass: w,
      stateRowClass: y,
      freshKeys: C,
      cover: S,
      rowTestId: M,
      status: z,
      loadingRowCount: I,
      stateRow: E,
    }) => {
      let N = (0, l.f)({
          count: "loading" === z ? I : e.length,
          getScrollElement: () => o.current,
          estimateSize: () => a,
          overscan: d,
        }),
        R = s.map((e) => (e.size ? `${e.size}px` : "minmax(0, 1fr)")).join(" "),
        A = N.getVirtualItems();
      return (0, t.jsxs)("div", {
        role: "grid",
        "aria-label": f,
        "aria-rowcount": e.length + 1,
        className: "text-sm",
        children: [
          (0, t.jsx)("div", {
            role: "row",
            "aria-rowindex": 1,
            className: (0, i.c)(x.w[r], x.I, "grid"),
            style: { gridTemplateColumns: R },
            children: s.map((e) =>
              (0, t.jsx)(
                "div",
                {
                  role: "columnheader",
                  "aria-sort": c?.columnId === e.id ? j[c.direction] : void 0,
                  className: (0, i.c)(w(e, "grid", "head"), x.d[r]),
                  children: (0, t.jsx)(O, {
                    column: e,
                    sortState: c,
                    onToggle: u,
                    sortIndicator: m,
                  }),
                },
                e.id,
              ),
            ),
          }),
          E
            ? (0, t.jsx)("div", {
                role: "row",
                className: (0, i.c)(y, "flex items-center justify-center"),
                "data-testid": "data-list-state-row",
                children: (0, t.jsx)("div", { role: "gridcell", children: E }),
              })
            : null,
          (0, t.jsx)("div", {
            className: "relative w-full",
            style: { height: N.getTotalSize() },
            children: A.map((l) => {
              if ("loading" === z)
                return (0, t.jsx)(
                  "div",
                  {
                    role: "row",
                    "data-testid": "data-list-skeleton-row",
                    className: (0, i.c)(
                      "absolute left-0 top-0 grid w-full",
                      l.index !== I - 1 && x.W,
                    ),
                    style: {
                      transform: `translateY(${l.start}px)`,
                      height: l.size,
                      gridTemplateColumns: R,
                    },
                    children: s.map((e) =>
                      (0, t.jsx)(
                        "div",
                        {
                          role: "gridcell",
                          className: w(e, "grid"),
                          children: (0, t.jsx)(h.f, {
                            className: (0, i.c)(
                              "h-4 w-full max-w-[9rem] bg-bg-tertiary",
                              "end" === e.align && "ml-auto",
                            ),
                          }),
                        },
                        e.id,
                      ),
                    ),
                  },
                  `skeleton-${l.index}`,
                );
              let r = e[l.index];
              if (void 0 === r) return null;
              let o = n(r);
              return (0, t.jsx)(
                k,
                {
                  row: r,
                  index: l.index,
                  isFresh: C.has(o),
                  isLast: l.index === e.length - 1,
                  start: l.start,
                  size: l.size,
                  template: R,
                  columns: s,
                  rowTestId: M,
                  rowAttributes: b,
                  rowClasses: g,
                  rowClickHandler: p,
                  rowIntentProps: v,
                  cellClass: w,
                  cover: S,
                },
                o,
              );
            }),
          }),
        ],
      });
    },
    E = (e) => {
      let l,
        n,
        r,
        o,
        a,
        h,
        d = (0, s.c)(36),
        {
          row: c,
          index: u,
          isFresh: m,
          isLast: f,
          columns: g,
          rowTestId: p,
          rowAttributes: v,
          rowClasses: b,
          rowClickHandler: x,
          rowIntentProps: w,
          cellClass: y,
          cover: C,
        } = e;
      (d[0] !== c || d[1] !== v
        ? ((l = v?.(c)), (d[0] = c), (d[1] = v), (d[2] = l))
        : (l = d[2]),
        d[3] !== f || d[4] !== c || d[5] !== b
          ? ((n = b(c, { isLast: f })),
            (d[3] = f),
            (d[4] = c),
            (d[5] = b),
            (d[6] = n))
          : (n = d[6]));
      let S = m || void 0;
      if (
        (d[7] !== c || d[8] !== x
          ? ((r = x(c)), (d[7] = c), (d[8] = x), (d[9] = r))
          : (r = d[9]),
        d[10] !== c || d[11] !== w
          ? ((o = w(c)), (d[10] = c), (d[11] = w), (d[12] = o))
          : (o = d[12]),
        d[13] !== y ||
          d[14] !== g ||
          d[15] !== C ||
          d[16] !== u ||
          d[17] !== m ||
          d[18] !== f ||
          d[19] !== c)
      ) {
        let e;
        (d[21] !== y ||
        d[22] !== C ||
        d[23] !== u ||
        d[24] !== m ||
        d[25] !== f ||
        d[26] !== c
          ? ((e = (e, s) =>
              (0, t.jsxs)(
                "td",
                {
                  className: (0, i.c)(
                    y(e, "table", "cell", { divider: !f }),
                    0 === s && "relative",
                  ),
                  children: [
                    0 === s ? C(c) : null,
                    e.cell({ row: c, index: u, isFresh: m }),
                  ],
                },
                e.id,
              )),
            (d[21] = y),
            (d[22] = C),
            (d[23] = u),
            (d[24] = m),
            (d[25] = f),
            (d[26] = c),
            (d[27] = e))
          : (e = d[27]),
          (a = g.map(e)),
          (d[13] = y),
          (d[14] = g),
          (d[15] = C),
          (d[16] = u),
          (d[17] = m),
          (d[18] = f),
          (d[19] = c),
          (d[20] = a));
      } else a = d[20];
      return (
        d[28] !== p ||
        d[29] !== l ||
        d[30] !== n ||
        d[31] !== S ||
        d[32] !== r ||
        d[33] !== o ||
        d[34] !== a
          ? ((h = (0, t.jsx)("tr", {
              ...l,
              className: n,
              "data-fresh": S,
              "data-testid": p,
              onClick: r,
              ...o,
              children: a,
            })),
            (d[28] = p),
            (d[29] = l),
            (d[30] = n),
            (d[31] = S),
            (d[32] = r),
            (d[33] = o),
            (d[34] = a),
            (d[35] = h))
          : (h = d[35]),
        h
      );
    },
    k = (e) => {
      let l,
        n,
        r,
        o,
        a,
        h,
        d,
        c = (0, s.c)(40),
        {
          row: u,
          index: m,
          isFresh: f,
          isLast: g,
          start: p,
          size: v,
          template: b,
          columns: x,
          rowTestId: w,
          rowAttributes: y,
          rowClasses: C,
          rowClickHandler: S,
          rowIntentProps: j,
          cellClass: M,
          cover: z,
        } = e;
      c[0] !== u || c[1] !== y
        ? ((l = y?.(u)), (c[0] = u), (c[1] = y), (c[2] = l))
        : (l = c[2]);
      let O = m + 2,
        I = f || void 0;
      (c[3] !== u || c[4] !== S
        ? ((n = S(u)), (c[3] = u), (c[4] = S), (c[5] = n))
        : (n = c[5]),
        c[6] !== u || c[7] !== j
          ? ((r = j(u)), (c[6] = u), (c[7] = j), (c[8] = r))
          : (r = c[8]),
        c[9] !== g || c[10] !== u || c[11] !== C
          ? ((o = (0, i.c)(
              "absolute left-0 top-0 grid w-full",
              C(u, { isLast: g }),
            )),
            (c[9] = g),
            (c[10] = u),
            (c[11] = C),
            (c[12] = o))
          : (o = c[12]));
      let E = `translateY(${p}px)`;
      if (
        (c[13] !== v || c[14] !== E || c[15] !== b
          ? ((a = { transform: E, height: v, gridTemplateColumns: b }),
            (c[13] = v),
            (c[14] = E),
            (c[15] = b),
            (c[16] = a))
          : (a = c[16]),
        c[17] !== M ||
          c[18] !== x ||
          c[19] !== z ||
          c[20] !== m ||
          c[21] !== f ||
          c[22] !== u)
      ) {
        let e;
        (c[24] !== M || c[25] !== z || c[26] !== m || c[27] !== f || c[28] !== u
          ? ((e = (e, s) =>
              (0, t.jsxs)(
                "div",
                {
                  role: "gridcell",
                  className: (0, i.c)(M(e, "grid"), 0 === s && "relative"),
                  children: [
                    0 === s ? z(u) : null,
                    e.cell({ row: u, index: m, isFresh: f }),
                  ],
                },
                e.id,
              )),
            (c[24] = M),
            (c[25] = z),
            (c[26] = m),
            (c[27] = f),
            (c[28] = u),
            (c[29] = e))
          : (e = c[29]),
          (h = x.map(e)),
          (c[17] = M),
          (c[18] = x),
          (c[19] = z),
          (c[20] = m),
          (c[21] = f),
          (c[22] = u),
          (c[23] = h));
      } else h = c[23];
      return (
        c[30] !== w ||
        c[31] !== l ||
        c[32] !== O ||
        c[33] !== I ||
        c[34] !== n ||
        c[35] !== r ||
        c[36] !== o ||
        c[37] !== a ||
        c[38] !== h
          ? ((d = (0, t.jsx)("div", {
              ...l,
              role: "row",
              "aria-rowindex": O,
              "data-fresh": I,
              "data-testid": w,
              onClick: n,
              ...r,
              className: o,
              style: a,
              children: h,
            })),
            (c[30] = w),
            (c[31] = l),
            (c[32] = O),
            (c[33] = I),
            (c[34] = n),
            (c[35] = r),
            (c[36] = o),
            (c[37] = a),
            (c[38] = h),
            (c[39] = d))
          : (d = c[39]),
        d
      );
    };
  (e.s(
    [
      "k",
      0,
      function (e) {
        let l,
          n,
          m,
          f,
          g,
          p,
          v,
          b,
          w,
          S,
          M,
          k,
          N,
          R,
          A,
          T,
          F,
          P,
          W = (0, s.c)(93),
          {
            columns: D,
            rowKey: _,
            status: L,
            virtualize: $,
            scroll: B,
            scrollClassName: H,
            live: K,
            chrome: V,
            density: q,
            sortIndicator: U,
            onRowClick: Y,
            rowHref: J,
            rowActionLabel: Q,
            rowCover: Z,
            isRowInteractive: G,
            rowClassName: X,
            rowAttributes: ee,
            freshRowClassName: et,
            highlightedKey: es,
            renderEmpty: ei,
            renderError: el,
            onRetry: en,
            loadingRowCount: er,
            loadingLabel: eo,
            footer: ea,
            className: eh,
            testId: ed,
            rowTestId: ec,
            "aria-label": eu,
          } = e,
          em = void 0 !== $ && $,
          ef = void 0 === q ? "comfy" : q,
          eg = void 0 === U ? "always" : U,
          ep = void 0 === er ? 8 : er,
          {
            sortState: ev,
            toggle: eb,
            sortedRows: ex,
          } = ((e) => {
            let t,
              i,
              l,
              n = (0, s.c)(15),
              {
                rows: o,
                columns: a,
                sortState: h,
                onSortChange: d,
                defaultSortState: c,
              } = e,
              u = void 0 !== h,
              [m, f] = (0, r.useState)(c ?? null),
              g = u ? h : m;
            n[0] !== g || n[1] !== u || n[2] !== d
              ? ((t = (e) => {
                  let t,
                    s =
                      ((t = e.defaultSortDirection ?? "asc"),
                      g && g.columnId === e.id
                        ? g.direction === t
                          ? {
                              columnId: e.id,
                              direction: "asc" === t ? "desc" : "asc",
                            }
                          : null
                        : { columnId: e.id, direction: t });
                  (u || f(s), d?.(s));
                }),
                (n[0] = g),
                (n[1] = u),
                (n[2] = d),
                (n[3] = t))
              : (t = n[3]);
            let p = t;
            if (n[4] !== a || n[5] !== g || n[6] !== u || n[7] !== o) {
              e: {
                let e;
                if (u || !g) {
                  i = o;
                  break e;
                }
                n[9] !== g
                  ? ((e = (e) => e.id === g.columnId), (n[9] = g), (n[10] = e))
                  : (e = n[10]);
                let t = a.find(e);
                if (!t?.sortFn) {
                  i = o;
                  break e;
                }
                let s = "asc" === g.direction ? 1 : -1,
                  l = t.sortFn;
                i = o.toSorted((e, t) => l(e, t) * s);
              }
              ((n[4] = a), (n[5] = g), (n[6] = u), (n[7] = o), (n[8] = i));
            } else i = n[8];
            let v = i;
            return (
              n[11] !== g || n[12] !== v || n[13] !== p
                ? ((l = { sortState: g, toggle: p, sortedRows: v }),
                  (n[11] = g),
                  (n[12] = v),
                  (n[13] = p),
                  (n[14] = l))
                : (l = n[14]),
              l
            );
          })(e),
          ew = !!K && null === ev,
          ey = K?.prependMode ?? "held",
          eC = K?.paused ?? !1;
        W[0] !== _ || W[1] !== ex || W[2] !== ew || W[3] !== ey || W[4] !== eC
          ? ((l = {
              rows: ex,
              rowKey: _,
              enabled: ew,
              prependMode: ey,
              pausedExternally: eC,
            }),
            (W[0] = _),
            (W[1] = ex),
            (W[2] = ew),
            (W[3] = ey),
            (W[4] = eC),
            (W[5] = l))
          : (l = W[5]);
        let {
            visibleRows: eS,
            heldRows: ej,
            reveal: eM,
            freshKeys: ez,
            pauseTargetProps: eO,
          } = (({
            rows: e,
            rowKey: t,
            enabled: s,
            prependMode: i,
            pausedExternally: l,
          }) => {
            let [n, o] = (0, r.useState)(!1),
              a = s && "held" === i && (n || l),
              [h, d] = (0, r.useState)(null),
              c = (0, r.useRef)(null),
              m = (0, r.useRef)(e);
            (0, r.useEffect)(() => {
              m.current = e;
            }, [e]);
            let f = 0 === e.length;
            (0, r.useEffect)(() => {
              let e = (e) => {
                ((c.current = e), d(e));
              };
              if (!a || f) {
                null !== c.current && e(null);
                return;
              }
              null === c.current && e(new Set(m.current.map(t)));
            }, [a, f, t]);
            let { visibleRows: g, heldRows: p } = (0, r.useMemo)(() => {
                if (!h) return { visibleRows: e, heldRows: [] };
                let s = e.findLastIndex((e) => h.has(t(e))),
                  i = [],
                  l = [];
                return (
                  e.forEach((e, n) => {
                    (n > s || h.has(t(e)) ? i : l).push(e);
                  }),
                  { visibleRows: i, heldRows: l }
                );
              }, [e, t, h]),
              v = (0, r.useCallback)(() => {
                if (null === c.current) return;
                let e = new Set(m.current.map(t));
                ((c.current = e), d(e));
              }, [t]),
              b = (0, r.useMemo)(() => g.map(t), [g, t]);
            return (
              (0, r.useEffect)(() => {
                let e = c.current;
                if (!e || b.every((t) => e.has(t))) return;
                let t = new Set(b);
                ((c.current = t), d(t));
              }, [b]),
              {
                visibleRows: g,
                heldRows: p,
                reveal: v,
                freshKeys: (0, u.C)(b),
                paused: a,
                pauseTargetProps: (0, r.useMemo)(
                  () => ({
                    onPointerEnter: () => o(!0),
                    onPointerLeave: () => o(!1),
                    onFocusCapture: () => o(!0),
                    onBlurCapture: (e) => {
                      let t = e.relatedTarget;
                      (t instanceof Node && e.currentTarget.contains(t)) ||
                        o(!1);
                    },
                  }),
                  [],
                ),
              }
            );
          })(l),
          eI = (0, r.useRef)(null),
          eE = "self" === (void 0 === B ? "page" : B),
          ek = !!em && eE,
          eN = !!(Y || J || Z);
        W[6] !== eN || W[7] !== G
          ? ((n = (e) => eN && (G?.(e) ?? !0)),
            (W[6] = eN),
            (W[7] = G),
            (W[8] = n))
          : (n = W[8]);
        let eR = n;
        W[9] !== Y || W[10] !== Q || W[11] !== Z || W[12] !== J || W[13] !== eR
          ? ((m = (e) =>
              eR(e)
                ? Z
                  ? Z(e)
                  : (0, t.jsx)(z, {
                      row: e,
                      onRowClick: Y,
                      rowHref: J,
                      rowActionLabel: Q,
                    })
                : null),
            (W[9] = Y),
            (W[10] = Q),
            (W[11] = Z),
            (W[12] = J),
            (W[13] = eR),
            (W[14] = m))
          : (m = W[14]);
        let eA = m;
        W[15] !== eR
          ? ((f = (e) => (eR(e) ? y.N : void 0)), (W[15] = eR), (W[16] = f))
          : (f = W[16]);
        let eT = f;
        W[17] !== eR
          ? ((g = (e) => (eR(e) ? y.J : void 0)), (W[17] = eR), (W[18] = g))
          : (g = W[18]);
        let eF = g;
        W[19] !== ef ||
        W[20] !== ez ||
        W[21] !== et ||
        W[22] !== es ||
        W[23] !== ek ||
        W[24] !== X ||
        W[25] !== eR ||
        W[26] !== _
          ? ((p = (e, t) => {
              let { isLast: s } = t,
                l = _(e),
                n = ez.has(l),
                r = es === l;
              return (0, i.c)(
                "relative",
                ek && !s && x.W,
                !ek && x.P[ef],
                eR(e) && x.e,
                n && (et?.(e) ?? u.l),
                r && x.$,
                !ek && x.K[ef],
                X?.(e, { isFresh: n, isHighlighted: r }),
              );
            }),
            (W[19] = ef),
            (W[20] = ez),
            (W[21] = et),
            (W[22] = es),
            (W[23] = ek),
            (W[24] = X),
            (W[25] = eR),
            (W[26] = _),
            (W[27] = p))
          : (p = W[27]);
        let eP = p;
        W[28] !== ef
          ? ((v = (e, t, s, l) => {
              let n = void 0 === s ? "cell" : s,
                { divider: r } = void 0 === l ? {} : l;
              return (0, i.c)(
                "head" === n ? x.h[ef] : x.a[ef],
                "table" === t &&
                  ("head" === n ? x.c : (void 0 === r || r) && x.D),
                C[e.align ?? "start"],
                void 0 !== e.minContainerWidth &&
                  ("table" === t
                    ? x.Z[e.minContainerWidth]
                    : x.H[e.minContainerWidth]),
                e.className,
              );
            }),
            (W[28] = ef),
            (W[29] = v))
          : (v = W[29]);
        let eW = v;
        W[30] !== ej || W[31] !== eE || W[32] !== K || W[33] !== eM
          ? ((b =
              K && ej.length > 0
                ? (0, t.jsx)(o.f, {
                    count: ej.length,
                    onClick: eM,
                    label: K.pillLabel(ej.length),
                    tail: K.pillTail(ej.length),
                    avatars: K.pillAvatars?.(ej),
                    placement: eE ? "sticky" : "inline",
                  })
                : null),
            (W[30] = ej),
            (W[31] = eE),
            (W[32] = K),
            (W[33] = eM),
            (W[34] = b))
          : (b = W[34]);
        let eD = b;
        W[35] !== ef
          ? ((w = "comfortable" === ef ? "comfortable" : "terminal"),
            (W[35] = ef),
            (W[36] = w))
          : (w = W[36]);
        let e_ = w,
          eL = x.p[ef],
          e$ = d.Q[e_];
        W[37] !== eL || W[38] !== e$
          ? ((S = (0, i.c)(eL, e$, "text-center")),
            (W[37] = eL),
            (W[38] = e$),
            (W[39] = S))
          : (S = W[39]);
        let eB = S;
        e: {
          if ("loading" === L) {
            M = null;
            break e;
          }
          if ("error" === L) {
            let e;
            (W[40] !== e_ || W[41] !== en || W[42] !== el
              ? ((e =
                  el?.({ retry: en }) ??
                  (0, t.jsx)(c.f, { density: e_, onRetry: en, children: "–" })),
                (W[40] = e_),
                (W[41] = en),
                (W[42] = el),
                (W[43] = e))
              : (e = W[43]),
              (M = e));
            break e;
          }
          if ("empty" === L || ("ready" === L && 0 === eS.length)) {
            let e;
            (W[44] !== ei
              ? ((e = ei?.() ?? null), (W[44] = ei), (W[45] = e))
              : (e = W[45]),
              (M = e));
            break e;
          }
          M = null;
        }
        let eH = M;
        W[46] !== eu ||
        W[47] !== eW ||
        W[48] !== D ||
        W[49] !== ef ||
        W[50] !== ez ||
        W[51] !== eE ||
        W[52] !== ek ||
        W[53] !== ep ||
        W[54] !== eA ||
        W[55] !== ee ||
        W[56] !== eP ||
        W[57] !== eT ||
        W[58] !== eF ||
        W[59] !== _ ||
        W[60] !== ec ||
        W[61] !== eg ||
        W[62] !== ev ||
        W[63] !== eH ||
        W[64] !== eB ||
        W[65] !== L ||
        W[66] !== eb ||
        W[67] !== em ||
        W[68] !== eS
          ? ((k = ek
              ? (0, t.jsx)(I, {
                  rows: eS,
                  columns: D,
                  rowKey: _,
                  density: ef,
                  scrollRef: eI,
                  estimateRowHeight:
                    "object" == typeof em ? em.estimateRowHeight : 44,
                  overscan: "object" == typeof em ? em.overscan : void 0,
                  sortState: ev,
                  onToggleSort: eb,
                  sortIndicator: eg,
                  ariaLabel: eu,
                  rowClasses: eP,
                  rowClickHandler: eT,
                  rowIntentProps: eF,
                  rowAttributes: ee,
                  cellClass: eW,
                  stateRowClass: eB,
                  freshKeys: ez,
                  cover: eA,
                  rowTestId: ec,
                  status: L,
                  loadingRowCount: ep,
                  stateRow: eH,
                })
              : (0, t.jsxs)("table", {
                  "aria-label": eu,
                  className: "w-full border-separate border-spacing-0 text-sm",
                  children: [
                    (0, t.jsx)("thead", {
                      className: (0, i.c)(eE && x.w[ef]),
                      children: (0, t.jsx)("tr", {
                        children: D.map((e) =>
                          (0, t.jsx)(
                            "th",
                            {
                              scope: "col",
                              style: e.size ? { width: e.size } : void 0,
                              "aria-sort":
                                ev?.columnId === e.id
                                  ? j[ev.direction]
                                  : void 0,
                              className: (0, i.c)(
                                eW(e, "table", "head"),
                                x.d[ef],
                              ),
                              children: (0, t.jsx)(O, {
                                column: e,
                                sortState: ev,
                                onToggle: eb,
                                sortIndicator: eg,
                              }),
                            },
                            e.id,
                          ),
                        ),
                      }),
                    }),
                    (0, t.jsxs)("tbody", {
                      children: [
                        "loading" === L
                          ? Array.from({ length: ep }, (e, s) =>
                              (0, t.jsx)(
                                "tr",
                                {
                                  className: x.P[ef],
                                  "data-testid": "data-list-skeleton-row",
                                  children: D.map((e) =>
                                    (0, t.jsx)(
                                      "td",
                                      {
                                        className: eW(e, "table", "cell", {
                                          divider: s !== ep - 1,
                                        }),
                                        children: (0, t.jsx)(h.f, {
                                          className: (0, i.c)(
                                            "h-4 w-full max-w-[9rem] bg-bg-tertiary",
                                            "end" === e.align && "ml-auto",
                                          ),
                                        }),
                                      },
                                      e.id,
                                    ),
                                  ),
                                },
                                `skeleton-${s}`,
                              ),
                            )
                          : null,
                        eH
                          ? (0, t.jsx)("tr", {
                              children: (0, t.jsx)("td", {
                                colSpan: D.length,
                                className: eB,
                                "data-testid": "data-list-state-row",
                                children: eH,
                              }),
                            })
                          : null,
                        "ready" === L
                          ? eS.map((e, s) => {
                              let i = _(e);
                              return (0, t.jsx)(
                                E,
                                {
                                  row: e,
                                  index: s,
                                  isFresh: ez.has(i),
                                  isLast: s === eS.length - 1,
                                  columns: D,
                                  rowTestId: ec,
                                  rowAttributes: ee,
                                  rowClasses: eP,
                                  rowClickHandler: eT,
                                  rowIntentProps: eF,
                                  cellClass: eW,
                                  cover: eA,
                                },
                                i,
                              );
                            })
                          : null,
                      ],
                    }),
                  ],
                })),
            (W[46] = eu),
            (W[47] = eW),
            (W[48] = D),
            (W[49] = ef),
            (W[50] = ez),
            (W[51] = eE),
            (W[52] = ek),
            (W[53] = ep),
            (W[54] = eA),
            (W[55] = ee),
            (W[56] = eP),
            (W[57] = eT),
            (W[58] = eF),
            (W[59] = _),
            (W[60] = ec),
            (W[61] = eg),
            (W[62] = ev),
            (W[63] = eH),
            (W[64] = eB),
            (W[65] = L),
            (W[66] = eb),
            (W[67] = em),
            (W[68] = eS),
            (W[69] = k))
          : (k = W[69]);
        let eK = k,
          eV = "card" === (void 0 === V ? "card" : V) && a.$;
        (W[70] !== eh || W[71] !== eV
          ? ((N = (0, i.c)("@container flex w-full min-w-0 flex-col", eV, eh)),
            (W[70] = eh),
            (W[71] = eV),
            (W[72] = N))
          : (N = W[72]),
          W[73] !== eo || W[74] !== L
            ? ((R =
                "loading" === L && eo
                  ? (0, t.jsx)("span", {
                      role: "status",
                      className: "sr-only",
                      children: eo,
                    })
                  : null),
              (W[73] = eo),
              (W[74] = L),
              (W[75] = R))
            : (R = W[75]));
        let eq = eE ? null : eD;
        W[76] !== eE || W[77] !== H
          ? ((A = (0, i.c)(
              "relative min-w-0",
              eE ? (0, i.c)(x.i, H) : "overflow-x-auto",
            )),
            (W[76] = eE),
            (W[77] = H),
            (W[78] = A))
          : (A = W[78]);
        let eU = eE ? eD : null;
        return (
          W[79] !== eK || W[80] !== eO || W[81] !== A || W[82] !== eU
            ? ((T = (0, t.jsxs)("div", {
                ref: eI,
                ...eO,
                className: A,
                children: [eU, eK],
              })),
              (W[79] = eK),
              (W[80] = eO),
              (W[81] = A),
              (W[82] = eU),
              (W[83] = T))
            : (T = W[83]),
          W[84] !== ea
            ? ((F = ea
                ? (0, t.jsx)("div", { className: "px-4 pt-3", children: ea })
                : null),
              (W[84] = ea),
              (W[85] = F))
            : (F = W[85]),
          W[86] !== N ||
          W[87] !== R ||
          W[88] !== eq ||
          W[89] !== T ||
          W[90] !== F ||
          W[91] !== ed
            ? ((P = (0, t.jsxs)("div", {
                "data-testid": ed,
                className: N,
                children: [R, eq, T, F],
              })),
              (W[86] = N),
              (W[87] = R),
              (W[88] = eq),
              (W[89] = T),
              (W[90] = F),
              (W[91] = ed),
              (W[92] = P))
            : (P = W[92]),
          P
        );
      },
      "j",
      0,
      M,
    ],
    63121,
  ),
    e.s([], 87798));
};
