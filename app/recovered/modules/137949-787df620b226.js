// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    a = e.i(745018);
  e.i(12692);
  var i = e.i(398902),
    s = e.i(338319),
    l = e.i(606178),
    n = e.i(51206),
    o = e.i(908163);
  let c =
      "flex w-full items-center font-medium text-text-tertiary transition-colors",
    d = {
      terminal: "h-7 text-xs leading-4",
      comfortable: "h-10 text-[13px] leading-[18px]",
    },
    u =
      "hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-accent disabled:cursor-default disabled:text-text-quaternary disabled:hover:text-text-quaternary",
    m = { terminal: 24, comfortable: 28 };
  e.s([
    "f",
    0,
    u,
    "Q",
    0,
    c,
    "g",
    0,
    d,
    "r",
    0,
    function (e) {
      let x,
        p,
        f,
        g,
        b,
        h,
        y,
        v,
        w,
        _,
        j,
        N,
        k,
        S,
        z,
        C,
        U,
        E,
        T,
        P,
        $,
        K,
        A,
        I,
        R,
        q,
        O,
        F,
        M,
        D = (0, r.c)(87),
        { t: Y } = (0, i.f)();
      if (D[0] !== e || D[1] !== Y) {
        U = Symbol.for("react.early_return_sentinel");
        e: {
          let r = (0, s.c)(c, d[e.density]);
          if ("disclosure" === e.kind) {
            let i,
              n,
              c,
              d,
              {
                density: m,
                label: x,
                count: p,
                open: f,
                onToggle: g,
                controls: b,
                className: h,
                "data-testid": y,
              } = e,
              v = (0, s.c)(r, u, l.U[m], "gap-1.5 text-left", h);
            (D[19] !== x
              ? ((i = (0, t.jsx)("span", {
                  className: "min-w-0 truncate",
                  children: x,
                })),
                (D[19] = x),
                (D[20] = i))
              : (i = D[20]),
              D[21] !== p || D[22] !== m
                ? ((n =
                    null != p
                      ? (0, t.jsx)(o.E, {
                          density: m,
                          className: "text-text-tertiary",
                          children: p,
                        })
                      : null),
                  (D[21] = p),
                  (D[22] = m),
                  (D[23] = n))
                : (n = D[23]));
            let w = f && "rotate-180";
            (D[24] !== w
              ? ((c = (0, s.c)(
                  "size-3 shrink-0 text-text-quaternary transition-transform",
                  w,
                )),
                (D[24] = w),
                (D[25] = c))
              : (c = D[25]),
              D[26] !== c
                ? ((d = (0, t.jsx)(a.vY, { "aria-hidden": !0, className: c })),
                  (D[26] = c),
                  (D[27] = d))
                : (d = D[27]),
              (U = (0, t.jsxs)("button", {
                type: "button",
                "aria-expanded": f,
                "aria-controls": b,
                onClick: g,
                "data-density": m,
                "data-footer-row": "disclosure",
                "data-testid": y,
                className: v,
                children: [i, n, d],
              })));
            break e;
          }
          if ("loadMore" === e.kind) {
            let a,
              {
                density: i,
                label: n,
                onClick: o,
                busy: c,
                disabled: d,
                className: m,
                "data-testid": x,
              } = e,
              p = void 0 !== c && c;
            (D[28] !== p || D[29] !== n || D[30] !== Y
              ? ((a = p ? Y("common.loading") : n),
                (D[28] = p),
                (D[29] = n),
                (D[30] = Y),
                (D[31] = a))
              : (a = D[31]),
              (U = (0, t.jsx)("button", {
                type: "button",
                "aria-busy": p || void 0,
                disabled: d || p,
                onClick: o,
                "data-density": i,
                "data-footer-row": "loadMore",
                "data-testid": x,
                className: (0, s.c)(r, u, l.U[i], "justify-center gap-1.5", m),
                children: a,
              })));
            break e;
          }
          let {
            density: i,
            page: n,
            pageCount: E,
            hasNext: T,
            onPageChange: P,
            busy: $,
            className: K,
            edgeLabels: A,
            "aria-label": I,
            "data-testid": R,
          } = e;
          ((p = i),
            (y = n),
            (v = E),
            (h = P),
            (f = A),
            (x = void 0 !== $ && $),
            (g = T ?? (void 0 !== v && y < v)),
            (b = y > 1),
            (_ = m[p]),
            (w = void 0 !== f && void 0 !== v),
            (j = I),
            (N = x || void 0),
            (k = p),
            (S = "pager"),
            (z = R),
            (C = (0, s.c)(r, l.U[p], "justify-center gap-2", K)));
        }
        ((D[0] = e),
          (D[1] = Y),
          (D[2] = x),
          (D[3] = p),
          (D[4] = f),
          (D[5] = g),
          (D[6] = b),
          (D[7] = h),
          (D[8] = y),
          (D[9] = v),
          (D[10] = w),
          (D[11] = _),
          (D[12] = j),
          (D[13] = N),
          (D[14] = k),
          (D[15] = S),
          (D[16] = z),
          (D[17] = C),
          (D[18] = U));
      } else
        ((x = D[2]),
          (p = D[3]),
          (f = D[4]),
          (g = D[5]),
          (b = D[6]),
          (h = D[7]),
          (y = D[8]),
          (v = D[9]),
          (w = D[10]),
          (_ = D[11]),
          (j = D[12]),
          (N = D[13]),
          (k = D[14]),
          (S = D[15]),
          (z = D[16]),
          (C = D[17]),
          (U = D[18]));
      if (U !== Symbol.for("react.early_return_sentinel")) return U;
      (D[32] !== x ||
      D[33] !== p ||
      D[34] !== f ||
      D[35] !== b ||
      D[36] !== h ||
      D[37] !== w ||
      D[38] !== _
        ? ((E = w
            ? (0, t.jsx)(n._, {
                density: p,
                size: _,
                "aria-label": f.first,
                disabled: !b || x,
                onClick: () => h(1),
                children: (0, t.jsx)(a.W_, { "aria-hidden": !0 }),
              })
            : null),
          (D[32] = x),
          (D[33] = p),
          (D[34] = f),
          (D[35] = b),
          (D[36] = h),
          (D[37] = w),
          (D[38] = _),
          (D[39] = E))
        : (E = D[39]),
        D[40] !== Y
          ? ((T = Y("web.pagination.previous_page")), (D[40] = Y), (D[41] = T))
          : (T = D[41]));
      let B = !b || x;
      (D[42] !== h || D[43] !== y
        ? ((P = () => h(y - 1)), (D[42] = h), (D[43] = y), (D[44] = P))
        : (P = D[44]),
        D[45] === Symbol.for("react.memo_cache_sentinel")
          ? (($ = (0, t.jsx)(a.S, { "aria-hidden": !0 })), (D[45] = $))
          : ($ = D[45]),
        D[46] !== p || D[47] !== _ || D[48] !== P || D[49] !== T || D[50] !== B
          ? ((K = (0, t.jsx)(n._, {
              density: p,
              size: _,
              "aria-label": T,
              disabled: B,
              onClick: P,
              children: $,
            })),
            (D[46] = p),
            (D[47] = _),
            (D[48] = P),
            (D[49] = T),
            (D[50] = B),
            (D[51] = K))
          : (K = D[51]));
      let G = void 0 !== v ? `${y} / ${v}` : y;
      (D[52] !== G
        ? ((A = (0, t.jsx)("span", {
            "aria-current": "page",
            className: "px-1 tabular-nums text-text-primary",
            children: G,
          })),
          (D[52] = G),
          (D[53] = A))
        : (A = D[53]),
        D[54] !== Y
          ? ((I = Y("web.pagination.next_page")), (D[54] = Y), (D[55] = I))
          : (I = D[55]));
      let Q = !g || x;
      return (
        D[56] !== h || D[57] !== y
          ? ((R = () => h(y + 1)), (D[56] = h), (D[57] = y), (D[58] = R))
          : (R = D[58]),
        D[59] === Symbol.for("react.memo_cache_sentinel")
          ? ((q = (0, t.jsx)(a.kK, { "aria-hidden": !0 })), (D[59] = q))
          : (q = D[59]),
        D[60] !== p || D[61] !== _ || D[62] !== I || D[63] !== Q || D[64] !== R
          ? ((O = (0, t.jsx)(n._, {
              density: p,
              size: _,
              "aria-label": I,
              disabled: Q,
              onClick: R,
              children: q,
            })),
            (D[60] = p),
            (D[61] = _),
            (D[62] = I),
            (D[63] = Q),
            (D[64] = R),
            (D[65] = O))
          : (O = D[65]),
        D[66] !== x ||
        D[67] !== p ||
        D[68] !== f ||
        D[69] !== g ||
        D[70] !== h ||
        D[71] !== v ||
        D[72] !== w ||
        D[73] !== _
          ? ((F = w
              ? (0, t.jsx)(n._, {
                  density: p,
                  size: _,
                  "aria-label": f.last,
                  disabled: !g || x,
                  onClick: () => h(v),
                  children: (0, t.jsx)(a.FE, { "aria-hidden": !0 }),
                })
              : null),
            (D[66] = x),
            (D[67] = p),
            (D[68] = f),
            (D[69] = g),
            (D[70] = h),
            (D[71] = v),
            (D[72] = w),
            (D[73] = _),
            (D[74] = F))
          : (F = D[74]),
        D[75] !== j ||
        D[76] !== N ||
        D[77] !== K ||
        D[78] !== A ||
        D[79] !== O ||
        D[80] !== k ||
        D[81] !== F ||
        D[82] !== S ||
        D[83] !== z ||
        D[84] !== C ||
        D[85] !== E
          ? ((M = (0, t.jsxs)("nav", {
              "aria-label": j,
              "aria-busy": N,
              "data-density": k,
              "data-footer-row": S,
              "data-testid": z,
              className: C,
              children: [E, K, A, O, F],
            })),
            (D[75] = j),
            (D[76] = N),
            (D[77] = K),
            (D[78] = A),
            (D[79] = O),
            (D[80] = k),
            (D[81] = F),
            (D[82] = S),
            (D[83] = z),
            (D[84] = C),
            (D[85] = E),
            (D[86] = M))
          : (M = D[86]),
        M
      );
    },
  ]);
};
