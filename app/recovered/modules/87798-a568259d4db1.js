// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    s = e.i(426091),
    n = e.i(659226),
    l = e.i(458310),
    r = e.i(352386),
    o = e.i(238442),
    a = e.i(256272),
    c = e.i(375670),
    d = e.i(787773),
    h = e.i(967694),
    u = e.i(21193),
    m = e.i(696500),
    f = e.i(108305),
    p = e.i(446929),
    g = e.i(288912),
    x = e.i(909316),
    b = e.i(745018),
    v = e.i(745674);
  function y(e) {
    let s,
      n,
      l,
      o,
      a,
      c = (0, i.c)(15),
      { label: d, active: h, content: u } = e,
      [y, w] = (0, r.useState)(!1),
      C = h ? "" : void 0;
    return (
      c[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((s = (0, t.jsx)(b.w3, { className: "size-3.5" })), (c[0] = s))
        : (s = c[0]),
      c[1] !== h
        ? ((n = h
            ? (0, t.jsx)("span", {
                "aria-hidden": !0,
                className:
                  "absolute -right-0.5 -top-0.5 size-1.5 rounded-full bg-bg-accent",
              })
            : null),
          (c[1] = h),
          (c[2] = n))
        : (n = c[2]),
      c[3] !== h || c[4] !== d || c[5] !== C || c[6] !== n
        ? ((l = (0, t.jsxs)(m.f.Trigger, {
            type: "button",
            "aria-label": d,
            "aria-pressed": h,
            "data-active": C,
            "data-testid": "data-list-filter",
            className: v.V,
            children: [s, n],
          })),
          (c[3] = h),
          (c[4] = d),
          (c[5] = C),
          (c[6] = n),
          (c[7] = l))
        : (l = c[7]),
      c[8] !== u || c[9] !== d
        ? ((o = (0, t.jsx)(f.f.Portal, {
            children: (0, t.jsx)(p.f.Positioner, {
              side: "bottom",
              align: "start",
              sideOffset: 6,
              collisionPadding: 12,
              className: "z-[1000]",
              children: (0, t.jsx)(g.f.Popup, {
                "aria-label": d,
                className: v.q,
                "data-testid": "data-list-filter-popup",
                children: u,
              }),
            }),
          })),
          (c[8] = u),
          (c[9] = d),
          (c[10] = o))
        : (o = c[10]),
      c[11] !== y || c[12] !== l || c[13] !== o
        ? ((a = (0, t.jsxs)(x.f.Root, {
            open: y,
            onOpenChange: w,
            children: [l, o],
          })),
          (c[11] = y),
          (c[12] = l),
          (c[13] = o),
          (c[14] = a))
        : (a = c[14]),
      a
    );
  }
  var w = e.i(936947);
  let C = { start: "text-left", end: "text-right" },
    j = { asc: "↑", desc: "↓" },
    S = { asc: "ascending", desc: "descending" },
    z = (e) => {
      let s,
        n,
        r,
        o,
        a,
        c,
        d,
        h,
        u,
        m = (0, i.c)(18);
      m[0] !== e
        ? (({
            href: s,
            label: n,
            prefetch: c,
            onMouseEnter: o,
            onMouseLeave: a,
            ...r
          } = e),
          (m[0] = e),
          (m[1] = s),
          (m[2] = n),
          (m[3] = r),
          (m[4] = o),
          (m[5] = a),
          (m[6] = c))
        : ((s = m[1]),
          (n = m[2]),
          (r = m[3]),
          (o = m[4]),
          (a = m[5]),
          (c = m[6]));
      let f = void 0 !== c && c;
      return (
        m[7] !== o
          ? ((d =
              o &&
              ((e) => {
                (0, w.j)(e) && o(e);
              })),
            (m[7] = o),
            (m[8] = d))
          : (d = m[8]),
        m[9] !== a
          ? ((h =
              a &&
              ((e) => {
                (0, w.j)(e) && a(e);
              })),
            (m[9] = a),
            (m[10] = h))
          : (h = m[10]),
        m[11] !== s ||
        m[12] !== n ||
        m[13] !== r ||
        m[14] !== f ||
        m[15] !== d ||
        m[16] !== h
          ? ((u = (0, t.jsx)(l.default, {
              href: s,
              prefetch: f,
              ...r,
              onMouseEnter: d,
              onMouseLeave: h,
              "aria-label": n,
              "data-row-cover": "",
              className: v.r,
            })),
            (m[11] = s),
            (m[12] = n),
            (m[13] = r),
            (m[14] = f),
            (m[15] = d),
            (m[16] = h),
            (m[17] = u))
          : (u = m[17]),
        u
      );
    },
    k = (e) => {
      let s,
        n,
        l = (0, i.c)(19),
        { row: r, onRowClick: o, rowHref: a, rowActionLabel: c } = e;
      l[0] !== r || l[1] !== a
        ? ((s = a?.(r)), (l[0] = r), (l[1] = a), (l[2] = s))
        : (s = l[2]);
      let d = s;
      l[3] !== r || l[4] !== c
        ? ((n = c?.(r)), (l[3] = r), (l[4] = c), (l[5] = n))
        : (n = l[5]);
      let h = n;
      if (d) {
        let e, i;
        return (
          l[6] !== o || l[7] !== r
            ? ((e = o ? () => o(r) : void 0),
              (l[6] = o),
              (l[7] = r),
              (l[8] = e))
            : (e = l[8]),
          l[9] !== d || l[10] !== h || l[11] !== e
            ? ((i = (0, t.jsx)(z, { href: d, label: h, onClick: e })),
              (l[9] = d),
              (l[10] = h),
              (l[11] = e),
              (l[12] = i))
            : (i = l[12]),
          i
        );
      }
      if (o) {
        let e, i;
        return (
          l[13] !== o || l[14] !== r
            ? ((e = () => o(r)), (l[13] = o), (l[14] = r), (l[15] = e))
            : (e = l[15]),
          l[16] !== h || l[17] !== e
            ? ((i = (0, t.jsx)("button", {
                type: "button",
                "aria-label": h,
                "data-row-cover": "",
                className: v.r,
                onClick: e,
              })),
              (l[16] = h),
              (l[17] = e),
              (l[18] = i))
            : (i = l[18]),
          i
        );
      }
      return null;
    },
    M = (e) => {
      let n,
        l,
        r,
        o,
        a = (0, i.c)(34),
        { column: c, sortState: d, onToggle: h, sortIndicator: u } = e,
        m = void 0 === u ? "always" : u;
      a[0] !== c || a[1] !== d
        ? ((n =
            "function" == typeof c.header ? c.header({ sort: d }) : c.header),
          (a[0] = c),
          (a[1] = d),
          (a[2] = n))
        : (n = a[2]);
      let f = n,
        p = !!(c.sortFn || c.sortable);
      a[3] !== c.filter || a[4] !== c.headerControls
        ? ((l =
            c.headerControls || c.filter
              ? (0, t.jsxs)("span", {
                  className: "inline-flex items-center gap-1",
                  children: [
                    c.headerControls,
                    c.filter ? (0, t.jsx)(y, { ...c.filter }) : null,
                  ],
                })
              : null),
          (a[3] = c.filter),
          (a[4] = c.headerControls),
          (a[5] = l))
        : (l = a[5]);
      let g = l,
        x = c.headerControlsPlacement
          ? "before" === c.headerControlsPlacement
          : "end" === c.align;
      if (
        a[6] !== c ||
        a[7] !== f ||
        a[8] !== g ||
        a[9] !== x ||
        a[10] !== p ||
        a[11] !== h ||
        a[12] !== m ||
        a[13] !== d
      ) {
        o = Symbol.for("react.early_return_sentinel");
        e: {
          let e,
            i,
            n,
            l,
            u,
            b = (0, s.c)(
              "flex items-center gap-1",
              "end" === c.align && "justify-end",
            );
          if (!p) {
            o = g
              ? (0, t.jsxs)("span", {
                  className: b,
                  children: [x ? g : null, f, x ? null : g],
                })
              : (0, t.jsx)(t.Fragment, { children: f });
            break e;
          }
          let y = d?.columnId === c.id ? d : null,
            w = "end" === c.align,
            C = w && null !== g && !x,
            S = w && !C && "relative",
            z = y && "text-text-primary",
            k = "active" === m && "group/sort";
          (a[16] !== S || a[17] !== z || a[18] !== k
            ? ((e = (0, s.c)(v.n, S, z, k)),
              (a[16] = S),
              (a[17] = z),
              (a[18] = k),
              (a[19] = e))
            : (e = a[19]),
            a[20] !== c || a[21] !== h
              ? ((i = () => h(c)), (a[20] = c), (a[21] = h), (a[22] = i))
              : (i = a[22]));
          let M = w && "absolute left-full top-1/2 ml-1 -translate-y-1/2",
            E =
              !y &&
              ("active" === m
                ? "opacity-0 transition-opacity group-hover/sort:opacity-40 group-focus-visible/sort:opacity-40"
                : "opacity-40");
          a[23] !== M || a[24] !== E
            ? ((n = (0, s.c)("w-2 text-[11px]", M, E)),
              (a[23] = M),
              (a[24] = E),
              (a[25] = n))
            : (n = a[25]);
          let N = y ? j[y.direction] : j.asc;
          (a[26] !== n || a[27] !== N
            ? ((l = (0, t.jsx)("span", {
                "aria-hidden": !0,
                className: n,
                children: N,
              })),
              (a[26] = n),
              (a[27] = N),
              (a[28] = l))
            : (l = a[28]),
            a[29] !== f || a[30] !== i || a[31] !== l || a[32] !== e
              ? ((u = (0, t.jsxs)("button", {
                  type: "button",
                  className: e,
                  onClick: i,
                  children: [f, l],
                })),
                (a[29] = f),
                (a[30] = i),
                (a[31] = l),
                (a[32] = e),
                (a[33] = u))
              : (u = a[33]));
          let I = u;
          r = g
            ? (0, t.jsxs)("span", {
                className: (0, s.c)(b, C && "relative"),
                children: [x ? g : null, I, x ? null : g],
              })
            : I;
        }
        ((a[6] = c),
          (a[7] = f),
          (a[8] = g),
          (a[9] = x),
          (a[10] = p),
          (a[11] = h),
          (a[12] = m),
          (a[13] = d),
          (a[14] = r),
          (a[15] = o));
      } else ((r = a[14]), (o = a[15]));
      return o !== Symbol.for("react.early_return_sentinel") ? o : r;
    },
    E = ({
      rows: e,
      columns: i,
      rowKey: l,
      density: r,
      scrollRef: o,
      estimateRowHeight: a,
      overscan: d = 8,
      sortState: h,
      onToggleSort: u,
      sortIndicator: m,
      ariaLabel: f,
      rowClasses: p,
      rowClickHandler: g,
      rowIntentProps: x,
      rowAttributes: b,
      cellClass: y,
      stateRowClass: w,
      freshKeys: C,
      cover: j,
      rowTestId: z,
      status: k,
      loadingRowCount: E,
      stateRow: N,
    }) => {
      let O = (0, n.f)({
          count: "loading" === k ? E : e.length,
          getScrollElement: () => o.current,
          estimateSize: () => a,
          overscan: d,
        }),
        T = i.map((e) => (e.size ? `${e.size}px` : "minmax(0, 1fr)")).join(" "),
        R = O.getVirtualItems();
      return (0, t.jsxs)("div", {
        role: "grid",
        "aria-label": f,
        "aria-rowcount": e.length + 1,
        className: "text-sm",
        children: [
          (0, t.jsx)("div", {
            role: "row",
            "aria-rowindex": 1,
            className: (0, s.c)(v.w[r], v.I, "grid"),
            style: { gridTemplateColumns: T },
            children: i.map((e) =>
              (0, t.jsx)(
                "div",
                {
                  role: "columnheader",
                  "aria-sort": h?.columnId === e.id ? S[h.direction] : void 0,
                  className: (0, s.c)(y(e, "grid", "head"), v.d[r]),
                  children: (0, t.jsx)(M, {
                    column: e,
                    sortState: h,
                    onToggle: u,
                    sortIndicator: m,
                  }),
                },
                e.id,
              ),
            ),
          }),
          N
            ? (0, t.jsx)("div", {
                role: "row",
                className: (0, s.c)(w, "flex items-center justify-center"),
                "data-testid": "data-list-state-row",
                children: (0, t.jsx)("div", { role: "gridcell", children: N }),
              })
            : null,
          (0, t.jsx)("div", {
            className: "relative w-full",
            style: { height: O.getTotalSize() },
            children: R.map((n) => {
              if ("loading" === k)
                return (0, t.jsx)(
                  "div",
                  {
                    role: "row",
                    "data-testid": "data-list-skeleton-row",
                    className: (0, s.c)(
                      "absolute left-0 top-0 grid w-full",
                      n.index !== E - 1 && v.W,
                    ),
                    style: {
                      transform: `translateY(${n.start}px)`,
                      height: n.size,
                      gridTemplateColumns: T,
                    },
                    children: i.map((e) =>
                      (0, t.jsx)(
                        "div",
                        {
                          role: "gridcell",
                          className: y(e, "grid"),
                          children: (0, t.jsx)(c.f, {
                            className: (0, s.c)(
                              "h-4 w-full max-w-[9rem] bg-bg-tertiary",
                              "end" === e.align && "ml-auto",
                            ),
                          }),
                        },
                        e.id,
                      ),
                    ),
                  },
                  `skeleton-${n.index}`,
                );
              let r = e[n.index];
              if (void 0 === r) return null;
              let o = l(r);
              return (0, t.jsx)(
                I,
                {
                  row: r,
                  index: n.index,
                  isFresh: C.has(o),
                  isLast: n.index === e.length - 1,
                  start: n.start,
                  size: n.size,
                  template: T,
                  columns: i,
                  rowTestId: z,
                  rowAttributes: b,
                  rowClasses: p,
                  rowClickHandler: g,
                  rowIntentProps: x,
                  cellClass: y,
                  cover: j,
                },
                o,
              );
            }),
          }),
        ],
      });
    },
    N = (e) => {
      let n,
        l,
        r,
        o,
        a,
        c,
        d = (0, i.c)(36),
        {
          row: h,
          index: u,
          isFresh: m,
          isLast: f,
          columns: p,
          rowTestId: g,
          rowAttributes: x,
          rowClasses: b,
          rowClickHandler: v,
          rowIntentProps: y,
          cellClass: w,
          cover: C,
        } = e;
      (d[0] !== h || d[1] !== x
        ? ((n = x?.(h)), (d[0] = h), (d[1] = x), (d[2] = n))
        : (n = d[2]),
        d[3] !== f || d[4] !== h || d[5] !== b
          ? ((l = b(h, { isLast: f })),
            (d[3] = f),
            (d[4] = h),
            (d[5] = b),
            (d[6] = l))
          : (l = d[6]));
      let j = m || void 0;
      if (
        (d[7] !== h || d[8] !== v
          ? ((r = v(h)), (d[7] = h), (d[8] = v), (d[9] = r))
          : (r = d[9]),
        d[10] !== h || d[11] !== y
          ? ((o = y(h)), (d[10] = h), (d[11] = y), (d[12] = o))
          : (o = d[12]),
        d[13] !== w ||
          d[14] !== p ||
          d[15] !== C ||
          d[16] !== u ||
          d[17] !== m ||
          d[18] !== f ||
          d[19] !== h)
      ) {
        let e;
        (d[21] !== w ||
        d[22] !== C ||
        d[23] !== u ||
        d[24] !== m ||
        d[25] !== f ||
        d[26] !== h
          ? ((e = (e, i) =>
              (0, t.jsxs)(
                "td",
                {
                  className: (0, s.c)(
                    w(e, "table", "cell", { divider: !f }),
                    0 === i && "relative",
                  ),
                  children: [
                    0 === i ? C(h) : null,
                    e.cell({ row: h, index: u, isFresh: m }),
                  ],
                },
                e.id,
              )),
            (d[21] = w),
            (d[22] = C),
            (d[23] = u),
            (d[24] = m),
            (d[25] = f),
            (d[26] = h),
            (d[27] = e))
          : (e = d[27]),
          (a = p.map(e)),
          (d[13] = w),
          (d[14] = p),
          (d[15] = C),
          (d[16] = u),
          (d[17] = m),
          (d[18] = f),
          (d[19] = h),
          (d[20] = a));
      } else a = d[20];
      return (
        d[28] !== g ||
        d[29] !== n ||
        d[30] !== l ||
        d[31] !== j ||
        d[32] !== r ||
        d[33] !== o ||
        d[34] !== a
          ? ((c = (0, t.jsx)("tr", {
              ...n,
              className: l,
              "data-fresh": j,
              "data-testid": g,
              onClick: r,
              ...o,
              children: a,
            })),
            (d[28] = g),
            (d[29] = n),
            (d[30] = l),
            (d[31] = j),
            (d[32] = r),
            (d[33] = o),
            (d[34] = a),
            (d[35] = c))
          : (c = d[35]),
        c
      );
    },
    I = (e) => {
      let n,
        l,
        r,
        o,
        a,
        c,
        d,
        h = (0, i.c)(40),
        {
          row: u,
          index: m,
          isFresh: f,
          isLast: p,
          start: g,
          size: x,
          template: b,
          columns: v,
          rowTestId: y,
          rowAttributes: w,
          rowClasses: C,
          rowClickHandler: j,
          rowIntentProps: S,
          cellClass: z,
          cover: k,
        } = e;
      h[0] !== u || h[1] !== w
        ? ((n = w?.(u)), (h[0] = u), (h[1] = w), (h[2] = n))
        : (n = h[2]);
      let M = m + 2,
        E = f || void 0;
      (h[3] !== u || h[4] !== j
        ? ((l = j(u)), (h[3] = u), (h[4] = j), (h[5] = l))
        : (l = h[5]),
        h[6] !== u || h[7] !== S
          ? ((r = S(u)), (h[6] = u), (h[7] = S), (h[8] = r))
          : (r = h[8]),
        h[9] !== p || h[10] !== u || h[11] !== C
          ? ((o = (0, s.c)(
              "absolute left-0 top-0 grid w-full",
              C(u, { isLast: p }),
            )),
            (h[9] = p),
            (h[10] = u),
            (h[11] = C),
            (h[12] = o))
          : (o = h[12]));
      let N = `translateY(${g}px)`;
      if (
        (h[13] !== x || h[14] !== N || h[15] !== b
          ? ((a = { transform: N, height: x, gridTemplateColumns: b }),
            (h[13] = x),
            (h[14] = N),
            (h[15] = b),
            (h[16] = a))
          : (a = h[16]),
        h[17] !== z ||
          h[18] !== v ||
          h[19] !== k ||
          h[20] !== m ||
          h[21] !== f ||
          h[22] !== u)
      ) {
        let e;
        (h[24] !== z || h[25] !== k || h[26] !== m || h[27] !== f || h[28] !== u
          ? ((e = (e, i) =>
              (0, t.jsxs)(
                "div",
                {
                  role: "gridcell",
                  className: (0, s.c)(z(e, "grid"), 0 === i && "relative"),
                  children: [
                    0 === i ? k(u) : null,
                    e.cell({ row: u, index: m, isFresh: f }),
                  ],
                },
                e.id,
              )),
            (h[24] = z),
            (h[25] = k),
            (h[26] = m),
            (h[27] = f),
            (h[28] = u),
            (h[29] = e))
          : (e = h[29]),
          (c = v.map(e)),
          (h[17] = z),
          (h[18] = v),
          (h[19] = k),
          (h[20] = m),
          (h[21] = f),
          (h[22] = u),
          (h[23] = c));
      } else c = h[23];
      return (
        h[30] !== y ||
        h[31] !== n ||
        h[32] !== M ||
        h[33] !== E ||
        h[34] !== l ||
        h[35] !== r ||
        h[36] !== o ||
        h[37] !== a ||
        h[38] !== c
          ? ((d = (0, t.jsx)("div", {
              ...n,
              role: "row",
              "aria-rowindex": M,
              "data-fresh": E,
              "data-testid": y,
              onClick: l,
              ...r,
              className: o,
              style: a,
              children: c,
            })),
            (h[30] = y),
            (h[31] = n),
            (h[32] = M),
            (h[33] = E),
            (h[34] = l),
            (h[35] = r),
            (h[36] = o),
            (h[37] = a),
            (h[38] = c),
            (h[39] = d))
          : (d = h[39]),
        d
      );
    };
  (e.s(
    [
      "k",
      0,
      function (e) {
        let n,
          l,
          m,
          f,
          p,
          g,
          x,
          b,
          y,
          j,
          z,
          I,
          O,
          T,
          R,
          A,
          _,
          F,
          P = (0, i.c)(93),
          {
            columns: W,
            rowKey: D,
            status: L,
            virtualize: $,
            scroll: K,
            scrollClassName: q,
            live: B,
            chrome: H,
            density: V,
            sortIndicator: U,
            onRowClick: Y,
            rowHref: J,
            rowActionLabel: Q,
            rowCover: X,
            isRowInteractive: Z,
            rowClassName: G,
            rowAttributes: ee,
            freshRowClassName: et,
            highlightedKey: ei,
            renderEmpty: es,
            renderError: en,
            onRetry: el,
            loadingRowCount: er,
            loadingLabel: eo,
            footer: ea,
            className: ec,
            testId: ed,
            rowTestId: eh,
            "aria-label": eu,
          } = e,
          em = void 0 !== $ && $,
          ef = void 0 === V ? "comfy" : V,
          ep = void 0 === U ? "always" : U,
          eg = void 0 === er ? 8 : er,
          {
            sortState: ex,
            toggle: eb,
            sortedRows: ev,
          } = ((e) => {
            let t,
              s,
              n,
              l = (0, i.c)(15),
              {
                rows: o,
                columns: a,
                sortState: c,
                onSortChange: d,
                defaultSortState: h,
              } = e,
              u = void 0 !== c,
              [m, f] = (0, r.useState)(h ?? null),
              p = u ? c : m;
            l[0] !== p || l[1] !== u || l[2] !== d
              ? ((t = (e) => {
                  let t,
                    i =
                      ((t = e.defaultSortDirection ?? "asc"),
                      p && p.columnId === e.id
                        ? p.direction === t
                          ? {
                              columnId: e.id,
                              direction: "asc" === t ? "desc" : "asc",
                            }
                          : null
                        : { columnId: e.id, direction: t });
                  (u || f(i), d?.(i));
                }),
                (l[0] = p),
                (l[1] = u),
                (l[2] = d),
                (l[3] = t))
              : (t = l[3]);
            let g = t;
            if (l[4] !== a || l[5] !== p || l[6] !== u || l[7] !== o) {
              e: {
                let e;
                if (u || !p) {
                  s = o;
                  break e;
                }
                l[9] !== p
                  ? ((e = (e) => e.id === p.columnId), (l[9] = p), (l[10] = e))
                  : (e = l[10]);
                let t = a.find(e);
                if (!t?.sortFn) {
                  s = o;
                  break e;
                }
                let i = "asc" === p.direction ? 1 : -1,
                  n = t.sortFn;
                s = o.toSorted((e, t) => n(e, t) * i);
              }
              ((l[4] = a), (l[5] = p), (l[6] = u), (l[7] = o), (l[8] = s));
            } else s = l[8];
            let x = s;
            return (
              l[11] !== p || l[12] !== x || l[13] !== g
                ? ((n = { sortState: p, toggle: g, sortedRows: x }),
                  (l[11] = p),
                  (l[12] = x),
                  (l[13] = g),
                  (l[14] = n))
                : (n = l[14]),
              n
            );
          })(e),
          ey = !!B && null === ex,
          ew = B?.prependMode ?? "held",
          eC = B?.paused ?? !1;
        P[0] !== D || P[1] !== ev || P[2] !== ey || P[3] !== ew || P[4] !== eC
          ? ((n = {
              rows: ev,
              rowKey: D,
              enabled: ey,
              prependMode: ew,
              pausedExternally: eC,
            }),
            (P[0] = D),
            (P[1] = ev),
            (P[2] = ey),
            (P[3] = ew),
            (P[4] = eC),
            (P[5] = n))
          : (n = P[5]);
        let {
            visibleRows: ej,
            heldRows: eS,
            reveal: ez,
            freshKeys: ek,
            pauseTargetProps: eM,
          } = (({
            rows: e,
            rowKey: t,
            enabled: i,
            prependMode: s,
            pausedExternally: n,
          }) => {
            let [l, o] = (0, r.useState)(!1),
              a = i && "held" === s && (l || n),
              [c, d] = (0, r.useState)(null),
              h = (0, r.useRef)(null),
              m = (0, r.useRef)(e);
            (0, r.useEffect)(() => {
              m.current = e;
            }, [e]);
            let f = 0 === e.length;
            (0, r.useEffect)(() => {
              let e = (e) => {
                ((h.current = e), d(e));
              };
              if (!a || f) {
                null !== h.current && e(null);
                return;
              }
              null === h.current && e(new Set(m.current.map(t)));
            }, [a, f, t]);
            let { visibleRows: p, heldRows: g } = (0, r.useMemo)(() => {
                if (!c) return { visibleRows: e, heldRows: [] };
                let i = e.findLastIndex((e) => c.has(t(e))),
                  s = [],
                  n = [];
                return (
                  e.forEach((e, l) => {
                    (l > i || c.has(t(e)) ? s : n).push(e);
                  }),
                  { visibleRows: s, heldRows: n }
                );
              }, [e, t, c]),
              x = (0, r.useCallback)(() => {
                if (null === h.current) return;
                let e = new Set(m.current.map(t));
                ((h.current = e), d(e));
              }, [t]),
              b = (0, r.useMemo)(() => p.map(t), [p, t]);
            return (
              (0, r.useEffect)(() => {
                let e = h.current;
                if (!e || b.every((t) => e.has(t))) return;
                let t = new Set(b);
                ((h.current = t), d(t));
              }, [b]),
              {
                visibleRows: p,
                heldRows: g,
                reveal: x,
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
          })(n),
          eE = (0, r.useRef)(null),
          eN = "self" === (void 0 === K ? "page" : K),
          eI = !!em && eN,
          eO = !!(Y || J || X);
        P[6] !== eO || P[7] !== Z
          ? ((l = (e) => eO && (Z?.(e) ?? !0)),
            (P[6] = eO),
            (P[7] = Z),
            (P[8] = l))
          : (l = P[8]);
        let eT = l;
        P[9] !== Y || P[10] !== Q || P[11] !== X || P[12] !== J || P[13] !== eT
          ? ((m = (e) =>
              eT(e)
                ? X
                  ? X(e)
                  : (0, t.jsx)(k, {
                      row: e,
                      onRowClick: Y,
                      rowHref: J,
                      rowActionLabel: Q,
                    })
                : null),
            (P[9] = Y),
            (P[10] = Q),
            (P[11] = X),
            (P[12] = J),
            (P[13] = eT),
            (P[14] = m))
          : (m = P[14]);
        let eR = m;
        P[15] !== eT
          ? ((f = (e) => (eT(e) ? w.N : void 0)), (P[15] = eT), (P[16] = f))
          : (f = P[16]);
        let eA = f;
        P[17] !== eT
          ? ((p = (e) => (eT(e) ? w.J : void 0)), (P[17] = eT), (P[18] = p))
          : (p = P[18]);
        let e_ = p;
        P[19] !== ef ||
        P[20] !== ek ||
        P[21] !== et ||
        P[22] !== ei ||
        P[23] !== eI ||
        P[24] !== G ||
        P[25] !== eT ||
        P[26] !== D
          ? ((g = (e, t) => {
              let { isLast: i } = t,
                n = D(e),
                l = ek.has(n),
                r = ei === n;
              return (0, s.c)(
                "relative",
                eI && !i && v.W,
                !eI && v.P[ef],
                eT(e) && v.e,
                l && (et?.(e) ?? u.l),
                r && v.$,
                !eI && v.K[ef],
                G?.(e, { isFresh: l, isHighlighted: r }),
              );
            }),
            (P[19] = ef),
            (P[20] = ek),
            (P[21] = et),
            (P[22] = ei),
            (P[23] = eI),
            (P[24] = G),
            (P[25] = eT),
            (P[26] = D),
            (P[27] = g))
          : (g = P[27]);
        let eF = g;
        P[28] !== ef
          ? ((x = (e, t, i, n) => {
              let l = void 0 === i ? "cell" : i,
                { divider: r } = void 0 === n ? {} : n;
              return (0, s.c)(
                "head" === l ? v.h[ef] : v.a[ef],
                "table" === t &&
                  ("head" === l ? v.c : (void 0 === r || r) && v.D),
                C[e.align ?? "start"],
                void 0 !== e.minContainerWidth &&
                  ("table" === t
                    ? v.Z[e.minContainerWidth]
                    : v.H[e.minContainerWidth]),
                e.className,
              );
            }),
            (P[28] = ef),
            (P[29] = x))
          : (x = P[29]);
        let eP = x;
        P[30] !== eS || P[31] !== eN || P[32] !== B || P[33] !== ez
          ? ((b =
              B && eS.length > 0
                ? (0, t.jsx)(o.f, {
                    count: eS.length,
                    onClick: ez,
                    label: B.pillLabel(eS.length),
                    tail: B.pillTail(eS.length),
                    avatars: B.pillAvatars?.(eS),
                    placement: eN ? "sticky" : "inline",
                  })
                : null),
            (P[30] = eS),
            (P[31] = eN),
            (P[32] = B),
            (P[33] = ez),
            (P[34] = b))
          : (b = P[34]);
        let eW = b;
        P[35] !== ef
          ? ((y = "comfortable" === ef ? "comfortable" : "terminal"),
            (P[35] = ef),
            (P[36] = y))
          : (y = P[36]);
        let eD = y,
          eL = v.p[ef],
          e$ = d.Q[eD];
        P[37] !== eL || P[38] !== e$
          ? ((j = (0, s.c)(eL, e$, "text-center")),
            (P[37] = eL),
            (P[38] = e$),
            (P[39] = j))
          : (j = P[39]);
        let eK = j;
        e: {
          if ("loading" === L) {
            z = null;
            break e;
          }
          if ("error" === L) {
            let e;
            (P[40] !== eD || P[41] !== el || P[42] !== en
              ? ((e =
                  en?.({ retry: el }) ??
                  (0, t.jsx)(h.f, { density: eD, onRetry: el, children: "–" })),
                (P[40] = eD),
                (P[41] = el),
                (P[42] = en),
                (P[43] = e))
              : (e = P[43]),
              (z = e));
            break e;
          }
          if ("empty" === L || ("ready" === L && 0 === ej.length)) {
            let e;
            (P[44] !== es
              ? ((e = es?.() ?? null), (P[44] = es), (P[45] = e))
              : (e = P[45]),
              (z = e));
            break e;
          }
          z = null;
        }
        let eq = z;
        P[46] !== eu ||
        P[47] !== eP ||
        P[48] !== W ||
        P[49] !== ef ||
        P[50] !== ek ||
        P[51] !== eN ||
        P[52] !== eI ||
        P[53] !== eg ||
        P[54] !== eR ||
        P[55] !== ee ||
        P[56] !== eF ||
        P[57] !== eA ||
        P[58] !== e_ ||
        P[59] !== D ||
        P[60] !== eh ||
        P[61] !== ep ||
        P[62] !== ex ||
        P[63] !== eq ||
        P[64] !== eK ||
        P[65] !== L ||
        P[66] !== eb ||
        P[67] !== em ||
        P[68] !== ej
          ? ((I = eI
              ? (0, t.jsx)(E, {
                  rows: ej,
                  columns: W,
                  rowKey: D,
                  density: ef,
                  scrollRef: eE,
                  estimateRowHeight:
                    "object" == typeof em ? em.estimateRowHeight : 44,
                  overscan: "object" == typeof em ? em.overscan : void 0,
                  sortState: ex,
                  onToggleSort: eb,
                  sortIndicator: ep,
                  ariaLabel: eu,
                  rowClasses: eF,
                  rowClickHandler: eA,
                  rowIntentProps: e_,
                  rowAttributes: ee,
                  cellClass: eP,
                  stateRowClass: eK,
                  freshKeys: ek,
                  cover: eR,
                  rowTestId: eh,
                  status: L,
                  loadingRowCount: eg,
                  stateRow: eq,
                })
              : (0, t.jsxs)("table", {
                  "aria-label": eu,
                  className: "w-full border-separate border-spacing-0 text-sm",
                  children: [
                    (0, t.jsx)("thead", {
                      className: (0, s.c)(eN && v.w[ef]),
                      children: (0, t.jsx)("tr", {
                        children: W.map((e) =>
                          (0, t.jsx)(
                            "th",
                            {
                              scope: "col",
                              style: e.size ? { width: e.size } : void 0,
                              "aria-sort":
                                ex?.columnId === e.id
                                  ? S[ex.direction]
                                  : void 0,
                              className: (0, s.c)(
                                eP(e, "table", "head"),
                                v.d[ef],
                              ),
                              children: (0, t.jsx)(M, {
                                column: e,
                                sortState: ex,
                                onToggle: eb,
                                sortIndicator: ep,
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
                          ? Array.from({ length: eg }, (e, i) =>
                              (0, t.jsx)(
                                "tr",
                                {
                                  className: v.P[ef],
                                  "data-testid": "data-list-skeleton-row",
                                  children: W.map((e) =>
                                    (0, t.jsx)(
                                      "td",
                                      {
                                        className: eP(e, "table", "cell", {
                                          divider: i !== eg - 1,
                                        }),
                                        children: (0, t.jsx)(c.f, {
                                          className: (0, s.c)(
                                            "h-4 w-full max-w-[9rem] bg-bg-tertiary",
                                            "end" === e.align && "ml-auto",
                                          ),
                                        }),
                                      },
                                      e.id,
                                    ),
                                  ),
                                },
                                `skeleton-${i}`,
                              ),
                            )
                          : null,
                        eq
                          ? (0, t.jsx)("tr", {
                              children: (0, t.jsx)("td", {
                                colSpan: W.length,
                                className: eK,
                                "data-testid": "data-list-state-row",
                                children: eq,
                              }),
                            })
                          : null,
                        "ready" === L
                          ? ej.map((e, i) => {
                              let s = D(e);
                              return (0, t.jsx)(
                                N,
                                {
                                  row: e,
                                  index: i,
                                  isFresh: ek.has(s),
                                  isLast: i === ej.length - 1,
                                  columns: W,
                                  rowTestId: eh,
                                  rowAttributes: ee,
                                  rowClasses: eF,
                                  rowClickHandler: eA,
                                  rowIntentProps: e_,
                                  cellClass: eP,
                                  cover: eR,
                                },
                                s,
                              );
                            })
                          : null,
                      ],
                    }),
                  ],
                })),
            (P[46] = eu),
            (P[47] = eP),
            (P[48] = W),
            (P[49] = ef),
            (P[50] = ek),
            (P[51] = eN),
            (P[52] = eI),
            (P[53] = eg),
            (P[54] = eR),
            (P[55] = ee),
            (P[56] = eF),
            (P[57] = eA),
            (P[58] = e_),
            (P[59] = D),
            (P[60] = eh),
            (P[61] = ep),
            (P[62] = ex),
            (P[63] = eq),
            (P[64] = eK),
            (P[65] = L),
            (P[66] = eb),
            (P[67] = em),
            (P[68] = ej),
            (P[69] = I))
          : (I = P[69]);
        let eB = I,
          eH = "card" === (void 0 === H ? "card" : H) && a.$;
        (P[70] !== ec || P[71] !== eH
          ? ((O = (0, s.c)("@container flex w-full min-w-0 flex-col", eH, ec)),
            (P[70] = ec),
            (P[71] = eH),
            (P[72] = O))
          : (O = P[72]),
          P[73] !== eo || P[74] !== L
            ? ((T =
                "loading" === L && eo
                  ? (0, t.jsx)("span", {
                      role: "status",
                      className: "sr-only",
                      children: eo,
                    })
                  : null),
              (P[73] = eo),
              (P[74] = L),
              (P[75] = T))
            : (T = P[75]));
        let eV = eN ? null : eW;
        P[76] !== eN || P[77] !== q
          ? ((R = (0, s.c)(
              "relative min-w-0",
              eN ? (0, s.c)(v.i, q) : "overflow-x-auto",
            )),
            (P[76] = eN),
            (P[77] = q),
            (P[78] = R))
          : (R = P[78]);
        let eU = eN ? eW : null;
        return (
          P[79] !== eB || P[80] !== eM || P[81] !== R || P[82] !== eU
            ? ((A = (0, t.jsxs)("div", {
                ref: eE,
                ...eM,
                className: R,
                children: [eU, eB],
              })),
              (P[79] = eB),
              (P[80] = eM),
              (P[81] = R),
              (P[82] = eU),
              (P[83] = A))
            : (A = P[83]),
          P[84] !== ea
            ? ((_ = ea
                ? (0, t.jsx)("div", { className: "px-4 pt-3", children: ea })
                : null),
              (P[84] = ea),
              (P[85] = _))
            : (_ = P[85]),
          P[86] !== O ||
          P[87] !== T ||
          P[88] !== eV ||
          P[89] !== A ||
          P[90] !== _ ||
          P[91] !== ed
            ? ((F = (0, t.jsxs)("div", {
                "data-testid": ed,
                className: O,
                children: [T, eV, A, _],
              })),
              (P[86] = O),
              (P[87] = T),
              (P[88] = eV),
              (P[89] = A),
              (P[90] = _),
              (P[91] = ed),
              (P[92] = F))
            : (F = P[92]),
          F
        );
      },
      "j",
      0,
      z,
    ],
    63121,
  ),
    e.s([], 87798));
};
