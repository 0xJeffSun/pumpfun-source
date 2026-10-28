// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(352386);
  e.i(12692);
  var i = e.i(398902),
    n = e.i(786147),
    l = e.i(375670),
    s = e.i(530501),
    o = e.i(338319),
    c = e.i(965690),
    d = e.i(618427),
    m = e.i(745018),
    u = e.i(813792),
    f = e.i(974166);
  let h = ["buy"],
    p = (e) =>
      (0, o.c)(
        f.f,
        f.Z[e],
        "right" === (0, s.A)(e).align && f.l,
        "coin" === e && [f.N, f.V],
      ),
    x = (e) => {
      let a,
        i = (0, r.c)(3),
        { id: n, window: l } = e;
      return (
        i[0] !== n || i[1] !== l
          ? ((a = (0, t.jsx)("span", {
              className: "text-[11px] font-normal text-text-tertiary",
              "data-testid": "explore-window-suffix",
              id: n,
              children: l,
            })),
            (i[0] = n),
            (i[1] = l),
            (i[2] = a))
          : (a = i[2]),
        a
      );
    },
    g = (e) => {
      let l,
        c,
        d = (0, r.c)(30),
        { id: g, direction: b, window: v, onToggleSort: y, trailing: j } = e,
        { t: w } = (0, i.f)(),
        N = (0, a.useId)(),
        _ = (0, a.useId)(),
        k = (0, a.useId)();
      if (
        d[0] !== b ||
        d[1] !== k ||
        d[2] !== g ||
        d[3] !== N ||
        d[4] !== y ||
        d[5] !== _ ||
        d[6] !== w ||
        d[7] !== j ||
        d[8] !== v
      ) {
        c = Symbol.for("react.early_return_sentinel");
        e: {
          let e,
            r,
            a,
            i,
            S,
            C,
            M = (0, s.A)(g),
            E = (0, n.f)(w, M.labelKey),
            A = M.hintKey ? (0, n.f)(w, M.hintKey, { window: v }) : null;
          d[11] !== g
            ? ((e = (0, s.m)(g)), (d[11] = g), (d[12] = e))
            : (e = d[12]);
          let R = e;
          d[13] !== g
            ? ((r = (0, s.h)(g)), (d[13] = g), (d[14] = r))
            : (r = d[14]);
          let D = r;
          d[15] !== D || d[16] !== _ || d[17] !== v
            ? ((a = D ? (0, t.jsx)(x, { id: _, window: v }) : null),
              (d[15] = D),
              (d[16] = _),
              (d[17] = v),
              (d[18] = a))
            : (a = d[18]);
          let z = a;
          if (h.includes(g)) {
            let e, r;
            (d[19] !== g ? ((e = p(g)), (d[19] = g), (d[20] = e)) : (e = d[20]),
              d[21] !== g
                ? ((r = (0, f.r)(g)), (d[21] = g), (d[22] = r))
                : (r = d[22]),
              (c = (0, t.jsxs)("th", {
                className: e,
                scope: "col",
                style: r,
                children: [
                  (0, t.jsx)("span", { className: "sr-only", children: E }),
                  j,
                ],
              })));
            break e;
          }
          let T = D ? `${N} ${_}` : N,
            P = R || null !== A;
          if (d[23] !== R || d[24] !== b)
            ((i = R
              ? "asc" === b
                ? "ascending"
                : "desc" === b
                  ? "descending"
                  : "none"
              : void 0),
              (d[23] = R),
              (d[24] = b),
              (d[25] = i));
          else i = d[25];
          (d[26] !== g ? ((S = p(g)), (d[26] = g), (d[27] = S)) : (S = d[27]),
            d[28] !== g
              ? ((C = (0, f.r)(g)), (d[28] = g), (d[29] = C))
              : (C = d[29]),
            (l = (0, t.jsx)("th", {
              "aria-describedby": A ? k : void 0,
              "aria-labelledby": P ? T : void 0,
              "aria-sort": i,
              className: S,
              scope: "col",
              style: C,
              children: R
                ? (0, t.jsxs)("button", {
                    "aria-label": w("web.coin.table_sort_by", { column: E }),
                    className: (0, o.c)(
                      "relative inline-flex h-7 items-center gap-1 rounded-sm hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-text-accent",
                      b && "font-semibold text-text-primary",
                    ),
                    "data-testid": `explore-sort-${g}`,
                    onClick: () => y(g),
                    type: "button",
                    children: [
                      (0, t.jsx)("span", { id: N, children: E }),
                      z,
                      b
                        ? (0, t.jsx)(m.J0, {
                            "aria-hidden": !0,
                            className: (0, o.c)(
                              "size-3 text-gain transition-transform",
                              "asc" === b && "rotate-180",
                            ),
                          })
                        : null,
                      b
                        ? (0, t.jsx)("span", {
                            "aria-hidden": !0,
                            className:
                              "absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-gain",
                          })
                        : null,
                    ],
                  })
                : A
                  ? (0, t.jsxs)(t.Fragment, {
                      children: [
                        (0, t.jsx)(u.f, {
                          content: A,
                          children: (0, t.jsxs)("span", {
                            "aria-describedby": k,
                            className:
                              "inline-flex items-center gap-1 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-text-accent",
                            tabIndex: 0,
                            children: [
                              (0, t.jsx)("span", { id: N, children: E }),
                              z,
                            ],
                          }),
                        }),
                        (0, t.jsx)("span", {
                          className: "sr-only",
                          id: k,
                          children: A,
                        }),
                      ],
                    })
                  : (0, t.jsxs)("span", {
                      className: "inline-flex items-center gap-1",
                      children: [(0, t.jsx)("span", { children: E }), z],
                    }),
            })));
        }
        ((d[0] = b),
          (d[1] = k),
          (d[2] = g),
          (d[3] = N),
          (d[4] = y),
          (d[5] = _),
          (d[6] = w),
          (d[7] = j),
          (d[8] = v),
          (d[9] = l),
          (d[10] = c));
      } else ((l = d[9]), (c = d[10]));
      return c !== Symbol.for("react.early_return_sentinel") ? c : l;
    };
  e.s(
    [
      "s",
      0,
      h,
      "t",
      0,
      function (e) {
        let a,
          i,
          n = (0, r.c)(13),
          {
            columnIds: l,
            sorting: s,
            window: o,
            onToggleSort: c,
            customizeSlot: d,
          } = e;
        if (
          n[0] !== l ||
          n[1] !== d ||
          n[2] !== c ||
          n[3] !== s ||
          n[4] !== o
        ) {
          let e;
          (n[6] !== d || n[7] !== c || n[8] !== s || n[9] !== o
            ? ((e = (e) => {
                let r;
                return (0, t.jsx)(
                  g,
                  {
                    direction: (r = s.find((t) => t.id === e))
                      ? r.desc
                        ? "desc"
                        : "asc"
                      : null,
                    id: e,
                    onToggleSort: c,
                    trailing:
                      "buy" === e && d
                        ? (0, t.jsx)("span", {
                            className: "flex justify-end",
                            children: d,
                          })
                        : void 0,
                    window: o,
                  },
                  e,
                );
              }),
              (n[6] = d),
              (n[7] = c),
              (n[8] = s),
              (n[9] = o),
              (n[10] = e))
            : (e = n[10]),
            (a = l.map(e)),
            (n[0] = l),
            (n[1] = d),
            (n[2] = c),
            (n[3] = s),
            (n[4] = o),
            (n[5] = a));
        } else a = n[5];
        return (
          n[11] !== a
            ? ((i = (0, t.jsx)("thead", {
                className: f.X,
                children: (0, t.jsx)("tr", { children: a }),
              })),
              (n[11] = a),
              (n[12] = i))
            : (i = n[12]),
          i
        );
      },
      "y",
      0,
      x,
      "$",
      0,
      p,
    ],
    692598,
  );
  let b = (0, a.memo)((e) => {
    let a,
      l,
      o,
      d,
      m = (0, r.c)(17),
      { rows: u, window: g, columnIds: b } = e,
      y = void 0 === u ? 15 : u,
      j = void 0 === g ? c.O : g,
      w = void 0 === b ? s.t : b,
      { t: N } = (0, i.f)();
    if (m[0] !== w || m[1] !== N || m[2] !== j) {
      let e;
      (m[4] !== N || m[5] !== j
        ? ((e = (e) => {
            let r = (0, n.f)(N, (0, s.A)(e).labelKey),
              a = (0, s.h)(e);
            return (0, t.jsx)(
              "th",
              {
                "aria-label": a ? `${r} ${j}` : void 0,
                className: p(e),
                scope: "col",
                style: (0, f.r)(e),
                children: h.includes(e)
                  ? (0, t.jsx)("span", { className: "sr-only", children: r })
                  : (0, t.jsxs)("span", {
                      className: "inline-flex items-center gap-1",
                      children: [
                        (0, t.jsx)("span", { children: r }),
                        a ? (0, t.jsx)(x, { window: j }) : null,
                      ],
                    }),
              },
              e,
            );
          }),
          (m[4] = N),
          (m[5] = j),
          (m[6] = e))
        : (e = m[6]),
        (a = w.map(e)),
        (m[0] = w),
        (m[1] = N),
        (m[2] = j),
        (m[3] = a));
    } else a = m[3];
    if (
      (m[7] !== a
        ? ((l = (0, t.jsx)("thead", {
            className: f.X,
            children: (0, t.jsx)("tr", { children: a }),
          })),
          (m[7] = a),
          (m[8] = l))
        : (l = m[8]),
      m[9] !== w || m[10] !== y)
    ) {
      let e;
      (m[12] !== w
        ? ((e = (e, r) =>
            (0, t.jsx)("tr", { className: f.Y, children: w.map(v) }, r)),
          (m[12] = w),
          (m[13] = e))
        : (e = m[13]),
        (o = (0, t.jsx)("tbody", {
          className: f.S,
          children: Array.from({ length: y }, e),
        })),
        (m[9] = w),
        (m[10] = y),
        (m[11] = o));
    } else o = m[11];
    return (
      m[14] !== l || m[15] !== o
        ? ((d = (0, t.jsx)("div", {
            className: f.W,
            "data-testid": "explore-table-skeleton",
            children: (0, t.jsx)("div", {
              className: f.g,
              children: (0, t.jsxs)("table", {
                className: f.$,
                children: [l, o],
              }),
            }),
          })),
          (m[14] = l),
          (m[15] = o),
          (m[16] = d))
        : (d = m[16]),
      d
    );
  });
  function v(e) {
    return (0, t.jsx)(
      "td",
      {
        className: (0, o.c)(
          f.I,
          f.Z[e],
          "right" === (0, s.A)(e).align && f.l,
          "coin" === e && f.F,
        ),
        "data-column": e,
        children: ((e) => {
          switch (e) {
            case "coin":
              return (0, t.jsxs)("div", {
                className: "flex items-center gap-2.5",
                children: [
                  (0, t.jsx)(l.f, { className: "size-8 shrink-0 rounded-md" }),
                  (0, t.jsxs)("div", {
                    className: "flex flex-col gap-1.5",
                    children: [
                      (0, t.jsx)(l.f, { className: "h-3.5 w-[120px]" }),
                      (0, t.jsx)(l.f, { className: "h-2.5 w-16" }),
                    ],
                  }),
                ],
              });
            case "graph":
              return (0, t.jsx)(d.f, { height: f.m.height, width: f.m.width });
            case "calls":
              return (0, t.jsxs)("div", {
                className: "flex flex-col items-end gap-1.5",
                children: [
                  (0, t.jsx)(l.f, { className: "h-3.5 w-8" }),
                  (0, t.jsx)(l.f, { className: "h-2.5 w-14" }),
                ],
              });
            case "market_cap":
              return (0, t.jsxs)("div", {
                className: "flex flex-col items-end gap-1.5",
                children: [
                  (0, t.jsx)(l.f, { className: "h-3.5 w-16" }),
                  (0, t.jsx)(l.f, { className: "h-1 w-12 rounded-full" }),
                ],
              });
            case "change":
              return (0, t.jsx)(l.f, { className: "ml-auto h-5 w-14 rounded" });
            case "volume":
              return (0, t.jsx)(l.f, { className: "ml-auto h-3.5 w-14" });
            case "txns":
            case "traders":
            case "holders":
              return (0, t.jsx)(l.f, { className: "ml-auto h-3.5 w-10" });
            default:
              return null;
          }
        })(e),
      },
      e,
    );
  }
  ((b.displayName = "ExploreTableSkeleton"),
    e.s(["ExploreTableSkeleton", 0, b], 689794));
};
