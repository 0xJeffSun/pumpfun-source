// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    i = e.i(745018),
    r = e.i(426091),
    l = e.i(352386);
  let a = (0, l.createContext)(null),
    s = () => (0, l.use)(a),
    o = (e) => {
      let t,
        i,
        r = (0, n.c)(3),
        [a, s] = (0, l.useState)(!0);
      return (
        r[0] !== e
          ? ((t = () => {
              if (!e) return;
              let t = window.setTimeout(() => s(!1), 2500);
              return () => window.clearTimeout(t);
            }),
            (i = [e]),
            (r[0] = e),
            (r[1] = t),
            (r[2] = i))
          : ((t = r[1]), (i = r[2])),
        (0, l.useEffect)(t, i),
        a && e ? e : null
      );
    };
  function c(e) {
    let i,
      l,
      a = (0, n.c)(5),
      { children: s, className: o } = e;
    return (
      a[0] !== o
        ? ((i = (0, r.c)(
            "pb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-text-tertiary",
            o,
          )),
          (a[0] = o),
          (a[1] = i))
        : (i = a[1]),
      a[2] !== s || a[3] !== i
        ? ((l = (0, t.jsx)("h3", { className: i, children: s })),
          (a[2] = s),
          (a[3] = i),
          (a[4] = l))
        : (l = a[4]),
      l
    );
  }
  (e.s(
    [
      "_",
      0,
      a,
      "w",
      0,
      function (e) {
        let i,
          r = (0, n.c)(3),
          { settingId: l, children: s } = e,
          c = o(l);
        return (
          r[0] !== s || r[1] !== c
            ? ((i = (0, t.jsx)(a.Provider, { value: c, children: s })),
              (r[0] = s),
              (r[1] = c),
              (r[2] = i))
            : (i = r[2]),
          i
        );
      },
      "h",
      0,
      o,
      "A",
      0,
      s,
    ],
    165228,
  ),
    e.s(
      [
        "s",
        0,
        function (e) {
          let i,
            a,
            o,
            c,
            d,
            u,
            x,
            m,
            p,
            f,
            h,
            g = (0, n.c)(30),
            {
              title: b,
              description: j,
              control: v,
              children: y,
              note: _,
              settingId: w,
              dense: N,
              className: C,
            } = e,
            k = s(),
            S = void 0 !== w && k === w,
            T = (0, l.useRef)(null);
          (g[0] !== S
            ? ((i = () => {
                S &&
                  T.current?.scrollIntoView?.({
                    block: "center",
                    behavior: "smooth",
                  });
              }),
              (a = [S]),
              (g[0] = S),
              (g[1] = i),
              (g[2] = a))
            : ((i = g[1]), (a = g[2])),
            (0, l.useEffect)(i, a));
          let A = S || void 0,
            P = N ? "py-2.5" : "py-3.5",
            F =
              S &&
              "bg-text-accent/[0.06] ring-1 ring-inset ring-text-accent/30";
          return (
            g[3] !== C || g[4] !== P || g[5] !== F
              ? ((o = (0, r.c)(
                  "-mx-3 rounded-lg px-3 transition-colors duration-500",
                  P,
                  F,
                  C,
                )),
                (g[3] = C),
                (g[4] = P),
                (g[5] = F),
                (g[6] = o))
              : (o = g[6]),
            g[7] !== b
              ? ((c = (0, t.jsx)("h4", {
                  className:
                    "text-[13px] font-medium leading-5 text-text-primary",
                  children: b,
                })),
                (g[7] = b),
                (g[8] = c))
              : (c = g[8]),
            g[9] !== j
              ? ((d = j
                  ? (0, t.jsx)("p", {
                      className:
                        "mt-0.5 max-w-[56ch] text-xs leading-[1.45] text-text-tertiary",
                      children: j,
                    })
                  : null),
                (g[9] = j),
                (g[10] = d))
              : (d = g[10]),
            g[11] !== _
              ? ((u = _
                  ? (0, t.jsx)("p", {
                      className:
                        "mt-1 text-[11px] leading-snug text-text-quaternary",
                      children: _,
                    })
                  : null),
                (g[11] = _),
                (g[12] = u))
              : (u = g[12]),
            g[13] !== c || g[14] !== d || g[15] !== u
              ? ((x = (0, t.jsxs)("div", {
                  className: "min-w-0 flex-1",
                  children: [c, d, u],
                })),
                (g[13] = c),
                (g[14] = d),
                (g[15] = u),
                (g[16] = x))
              : (x = g[16]),
            g[17] !== v
              ? ((m = v
                  ? (0, t.jsx)("div", {
                      className: "flex shrink-0 items-center justify-end",
                      children: v,
                    })
                  : null),
                (g[17] = v),
                (g[18] = m))
              : (m = g[18]),
            g[19] !== x || g[20] !== m
              ? ((p = (0, t.jsxs)("div", {
                  className: "flex items-start justify-between gap-6",
                  children: [x, m],
                })),
                (g[19] = x),
                (g[20] = m),
                (g[21] = p))
              : (p = g[21]),
            g[22] !== y
              ? ((f = y
                  ? (0, t.jsx)("div", { className: "mt-3", children: y })
                  : null),
                (g[22] = y),
                (g[23] = f))
              : (f = g[23]),
            g[24] !== w ||
            g[25] !== p ||
            g[26] !== f ||
            g[27] !== A ||
            g[28] !== o
              ? ((h = (0, t.jsxs)("div", {
                  ref: T,
                  "data-setting-id": w,
                  "data-focused": A,
                  className: o,
                  children: [p, f],
                })),
                (g[24] = w),
                (g[25] = p),
                (g[26] = f),
                (g[27] = A),
                (g[28] = o),
                (g[29] = h))
              : (h = g[29]),
            h
          );
        },
        "D",
        0,
        function (e) {
          let l,
            a,
            s,
            o,
            c,
            d,
            u,
            x,
            m = (0, n.c)(23),
            {
              icon: p,
              label: f,
              onClick: h,
              testId: g,
              busy: b,
              tone: j,
              children: v,
            } = e,
            y = void 0 === j ? "default" : j,
            _ = b || void 0,
            w = "danger" === y ? "text-loss" : "text-text-primary";
          m[0] !== w
            ? ((l = (0, r.c)(
                "group flex h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-[13px] font-medium transition-colors hover:bg-bg-secondary",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-accent/50",
                w,
              )),
              (m[0] = w),
              (m[1] = l))
            : (l = m[1]);
          let N = "danger" === y ? "text-loss" : "text-text-tertiary";
          return (
            m[2] !== N
              ? ((a = (0, r.c)(
                  "flex size-7 shrink-0 items-center justify-center rounded-md bg-bg-secondary ring-1 ring-inset ring-border-secondary/60",
                  N,
                )),
                (m[2] = N),
                (m[3] = a))
              : (a = m[3]),
            m[4] !== b || m[5] !== p
              ? ((s = b
                  ? (0, t.jsx)("span", {
                      className:
                        "size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent",
                    })
                  : p),
                (m[4] = b),
                (m[5] = p),
                (m[6] = s))
              : (s = m[6]),
            m[7] !== a || m[8] !== s
              ? ((o = (0, t.jsx)("span", {
                  "aria-hidden": !0,
                  className: a,
                  children: s,
                })),
                (m[7] = a),
                (m[8] = s),
                (m[9] = o))
              : (o = m[9]),
            m[10] !== f
              ? ((c = (0, t.jsx)("span", {
                  className: "min-w-0 flex-1 truncate",
                  children: f,
                })),
                (m[10] = f),
                (m[11] = c))
              : (c = m[11]),
            m[12] === Symbol.for("react.memo_cache_sentinel")
              ? ((d = (0, t.jsx)(i.kK, {
                  "aria-hidden": !0,
                  className:
                    "size-3.5 text-text-quaternary transition-transform group-hover:translate-x-0.5",
                })),
                (m[12] = d))
              : (d = m[12]),
            m[13] !== h ||
            m[14] !== _ ||
            m[15] !== l ||
            m[16] !== o ||
            m[17] !== c ||
            m[18] !== g
              ? ((u = (0, t.jsxs)("button", {
                  type: "button",
                  onClick: h,
                  "data-testid": g,
                  "aria-busy": _,
                  className: l,
                  children: [o, c, d],
                })),
                (m[13] = h),
                (m[14] = _),
                (m[15] = l),
                (m[16] = o),
                (m[17] = c),
                (m[18] = g),
                (m[19] = u))
              : (u = m[19]),
            m[20] !== v || m[21] !== u
              ? ((x = (0, t.jsxs)("div", {
                  className: "-mx-3",
                  children: [u, v],
                })),
                (m[20] = v),
                (m[21] = u),
                (m[22] = x))
              : (x = m[22]),
            x
          );
        },
        "X",
        0,
        function (e) {
          let i,
            l,
            a,
            s,
            o,
            d = (0, n.c)(15),
            {
              label: u,
              description: x,
              children: m,
              className: p,
              "data-testid": f,
            } = e;
          return (
            d[0] !== p
              ? ((i = (0, r.c)("flex flex-col", p)), (d[0] = p), (d[1] = i))
              : (i = d[1]),
            d[2] !== x || d[3] !== u
              ? ((l = u
                  ? (0, t.jsx)(c, {
                      className: x ? "pb-0" : void 0,
                      children: u,
                    })
                  : null),
                (d[2] = x),
                (d[3] = u),
                (d[4] = l))
              : (l = d[4]),
            d[5] !== x
              ? ((a = x
                  ? (0, t.jsx)("p", {
                      className:
                        "pb-2 text-xs leading-[1.45] text-text-tertiary",
                      children: x,
                    })
                  : null),
                (d[5] = x),
                (d[6] = a))
              : (a = d[6]),
            d[7] !== m
              ? ((s = (0, t.jsx)("div", {
                  className: "divide-y divide-border-secondary",
                  children: m,
                })),
                (d[7] = m),
                (d[8] = s))
              : (s = d[8]),
            d[9] !== i ||
            d[10] !== l ||
            d[11] !== a ||
            d[12] !== s ||
            d[13] !== f
              ? ((o = (0, t.jsxs)("section", {
                  "data-testid": f,
                  className: i,
                  children: [l, a, s],
                })),
                (d[9] = i),
                (d[10] = l),
                (d[11] = a),
                (d[12] = s),
                (d[13] = f),
                (d[14] = o))
              : (o = d[14]),
            o
          );
        },
        "N",
        0,
        function (e) {
          let i,
            l,
            a = (0, n.c)(5),
            { children: s, className: o } = e;
          return (
            a[0] !== o
              ? ((i = (0, r.c)(
                  "overflow-hidden rounded-lg bg-bg-secondary ring-1 ring-inset ring-border-secondary/60",
                  o,
                )),
                (a[0] = o),
                (a[1] = i))
              : (i = a[1]),
            a[2] !== s || a[3] !== i
              ? ((l = (0, t.jsx)("div", { className: i, children: s })),
                (a[2] = s),
                (a[3] = i),
                (a[4] = l))
              : (l = a[4]),
            l
          );
        },
        "O",
        0,
        function (e) {
          let i,
            r = (0, n.c)(4),
            { onClick: l, children: a, "aria-label": s } = e;
          return (
            r[0] !== s || r[1] !== a || r[2] !== l
              ? ((i = (0, t.jsx)("button", {
                  type: "button",
                  onClick: l,
                  "aria-label": s,
                  className:
                    "rounded-md px-1.5 py-1 text-xs font-medium text-text-tertiary transition-colors hover:bg-bg-secondary hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-accent/50",
                  children: a,
                })),
                (r[0] = s),
                (r[1] = a),
                (r[2] = l),
                (r[3] = i))
              : (i = r[3]),
            i
          );
        },
      ],
      379288,
    ));
};
