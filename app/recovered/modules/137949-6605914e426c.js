// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    a = e.i(745018);
  e.i(12692);
  var l = e.i(398902),
    r = e.i(338319),
    n = e.i(606178),
    o = e.i(51206),
    s = e.i(908163);
  let d =
      "flex w-full items-center font-medium text-text-tertiary transition-colors",
    c = {
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
    d,
    "g",
    0,
    c,
    "r",
    0,
    function (e) {
      let f,
        p,
        h,
        b,
        y,
        x,
        v,
        g,
        w,
        k,
        C,
        N,
        j,
        I,
        _,
        A,
        U,
        V,
        B,
        S,
        M,
        T,
        E,
        R,
        $,
        q,
        z,
        K,
        F,
        L = (0, i.c)(87),
        { t: P } = (0, l.f)();
      if (L[0] !== e || L[1] !== P) {
        U = Symbol.for("react.early_return_sentinel");
        e: {
          let i = (0, r.c)(d, c[e.density]);
          if ("disclosure" === e.kind) {
            let l,
              o,
              d,
              c,
              {
                density: m,
                label: f,
                count: p,
                open: h,
                onToggle: b,
                controls: y,
                className: x,
                "data-testid": v,
              } = e,
              g = (0, r.c)(i, u, n.U[m], "gap-1.5 text-left", x);
            (L[19] !== f
              ? ((l = (0, t.jsx)("span", {
                  className: "min-w-0 truncate",
                  children: f,
                })),
                (L[19] = f),
                (L[20] = l))
              : (l = L[20]),
              L[21] !== p || L[22] !== m
                ? ((o =
                    null != p
                      ? (0, t.jsx)(s.E, {
                          density: m,
                          className: "text-text-tertiary",
                          children: p,
                        })
                      : null),
                  (L[21] = p),
                  (L[22] = m),
                  (L[23] = o))
                : (o = L[23]));
            let w = h && "rotate-180";
            (L[24] !== w
              ? ((d = (0, r.c)(
                  "size-3 shrink-0 text-text-quaternary transition-transform",
                  w,
                )),
                (L[24] = w),
                (L[25] = d))
              : (d = L[25]),
              L[26] !== d
                ? ((c = (0, t.jsx)(a.vY, { "aria-hidden": !0, className: d })),
                  (L[26] = d),
                  (L[27] = c))
                : (c = L[27]),
              (U = (0, t.jsxs)("button", {
                type: "button",
                "aria-expanded": h,
                "aria-controls": y,
                onClick: b,
                "data-density": m,
                "data-footer-row": "disclosure",
                "data-testid": v,
                className: g,
                children: [l, o, c],
              })));
            break e;
          }
          if ("loadMore" === e.kind) {
            let a,
              {
                density: l,
                label: o,
                onClick: s,
                busy: d,
                disabled: c,
                className: m,
                "data-testid": f,
              } = e,
              p = void 0 !== d && d;
            (L[28] !== p || L[29] !== o || L[30] !== P
              ? ((a = p ? P("common.loading") : o),
                (L[28] = p),
                (L[29] = o),
                (L[30] = P),
                (L[31] = a))
              : (a = L[31]),
              (U = (0, t.jsx)("button", {
                type: "button",
                "aria-busy": p || void 0,
                disabled: c || p,
                onClick: s,
                "data-density": l,
                "data-footer-row": "loadMore",
                "data-testid": f,
                className: (0, r.c)(i, u, n.U[l], "justify-center gap-1.5", m),
                children: a,
              })));
            break e;
          }
          let {
            density: l,
            page: o,
            pageCount: V,
            hasNext: B,
            onPageChange: S,
            busy: M,
            className: T,
            edgeLabels: E,
            "aria-label": R,
            "data-testid": $,
          } = e;
          ((p = l),
            (v = o),
            (g = V),
            (x = S),
            (h = E),
            (f = void 0 !== M && M),
            (b = B ?? (void 0 !== g && v < g)),
            (y = v > 1),
            (k = m[p]),
            (w = void 0 !== h && void 0 !== g),
            (C = R),
            (N = f || void 0),
            (j = p),
            (I = "pager"),
            (_ = $),
            (A = (0, r.c)(i, n.U[p], "justify-center gap-2", T)));
        }
        ((L[0] = e),
          (L[1] = P),
          (L[2] = f),
          (L[3] = p),
          (L[4] = h),
          (L[5] = b),
          (L[6] = y),
          (L[7] = x),
          (L[8] = v),
          (L[9] = g),
          (L[10] = w),
          (L[11] = k),
          (L[12] = C),
          (L[13] = N),
          (L[14] = j),
          (L[15] = I),
          (L[16] = _),
          (L[17] = A),
          (L[18] = U));
      } else
        ((f = L[2]),
          (p = L[3]),
          (h = L[4]),
          (b = L[5]),
          (y = L[6]),
          (x = L[7]),
          (v = L[8]),
          (g = L[9]),
          (w = L[10]),
          (k = L[11]),
          (C = L[12]),
          (N = L[13]),
          (j = L[14]),
          (I = L[15]),
          (_ = L[16]),
          (A = L[17]),
          (U = L[18]));
      if (U !== Symbol.for("react.early_return_sentinel")) return U;
      (L[32] !== f ||
      L[33] !== p ||
      L[34] !== h ||
      L[35] !== y ||
      L[36] !== x ||
      L[37] !== w ||
      L[38] !== k
        ? ((V = w
            ? (0, t.jsx)(o._, {
                density: p,
                size: k,
                "aria-label": h.first,
                disabled: !y || f,
                onClick: () => x(1),
                children: (0, t.jsx)(a.W_, { "aria-hidden": !0 }),
              })
            : null),
          (L[32] = f),
          (L[33] = p),
          (L[34] = h),
          (L[35] = y),
          (L[36] = x),
          (L[37] = w),
          (L[38] = k),
          (L[39] = V))
        : (V = L[39]),
        L[40] !== P
          ? ((B = P("web.pagination.previous_page")), (L[40] = P), (L[41] = B))
          : (B = L[41]));
      let D = !y || f;
      (L[42] !== x || L[43] !== v
        ? ((S = () => x(v - 1)), (L[42] = x), (L[43] = v), (L[44] = S))
        : (S = L[44]),
        L[45] === Symbol.for("react.memo_cache_sentinel")
          ? ((M = (0, t.jsx)(a.S, { "aria-hidden": !0 })), (L[45] = M))
          : (M = L[45]),
        L[46] !== p || L[47] !== k || L[48] !== S || L[49] !== B || L[50] !== D
          ? ((T = (0, t.jsx)(o._, {
              density: p,
              size: k,
              "aria-label": B,
              disabled: D,
              onClick: S,
              children: M,
            })),
            (L[46] = p),
            (L[47] = k),
            (L[48] = S),
            (L[49] = B),
            (L[50] = D),
            (L[51] = T))
          : (T = L[51]));
      let O = void 0 !== g ? `${v} / ${g}` : v;
      (L[52] !== O
        ? ((E = (0, t.jsx)("span", {
            "aria-current": "page",
            className: "px-1 tabular-nums text-text-primary",
            children: O,
          })),
          (L[52] = O),
          (L[53] = E))
        : (E = L[53]),
        L[54] !== P
          ? ((R = P("web.pagination.next_page")), (L[54] = P), (L[55] = R))
          : (R = L[55]));
      let W = !b || f;
      return (
        L[56] !== x || L[57] !== v
          ? (($ = () => x(v + 1)), (L[56] = x), (L[57] = v), (L[58] = $))
          : ($ = L[58]),
        L[59] === Symbol.for("react.memo_cache_sentinel")
          ? ((q = (0, t.jsx)(a.kK, { "aria-hidden": !0 })), (L[59] = q))
          : (q = L[59]),
        L[60] !== p || L[61] !== k || L[62] !== R || L[63] !== W || L[64] !== $
          ? ((z = (0, t.jsx)(o._, {
              density: p,
              size: k,
              "aria-label": R,
              disabled: W,
              onClick: $,
              children: q,
            })),
            (L[60] = p),
            (L[61] = k),
            (L[62] = R),
            (L[63] = W),
            (L[64] = $),
            (L[65] = z))
          : (z = L[65]),
        L[66] !== f ||
        L[67] !== p ||
        L[68] !== h ||
        L[69] !== b ||
        L[70] !== x ||
        L[71] !== g ||
        L[72] !== w ||
        L[73] !== k
          ? ((K = w
              ? (0, t.jsx)(o._, {
                  density: p,
                  size: k,
                  "aria-label": h.last,
                  disabled: !b || f,
                  onClick: () => x(g),
                  children: (0, t.jsx)(a.FE, { "aria-hidden": !0 }),
                })
              : null),
            (L[66] = f),
            (L[67] = p),
            (L[68] = h),
            (L[69] = b),
            (L[70] = x),
            (L[71] = g),
            (L[72] = w),
            (L[73] = k),
            (L[74] = K))
          : (K = L[74]),
        L[75] !== C ||
        L[76] !== N ||
        L[77] !== T ||
        L[78] !== E ||
        L[79] !== z ||
        L[80] !== j ||
        L[81] !== K ||
        L[82] !== I ||
        L[83] !== _ ||
        L[84] !== A ||
        L[85] !== V
          ? ((F = (0, t.jsxs)("nav", {
              "aria-label": C,
              "aria-busy": N,
              "data-density": j,
              "data-footer-row": I,
              "data-testid": _,
              className: A,
              children: [V, T, E, z, K],
            })),
            (L[75] = C),
            (L[76] = N),
            (L[77] = T),
            (L[78] = E),
            (L[79] = z),
            (L[80] = j),
            (L[81] = K),
            (L[82] = I),
            (L[83] = _),
            (L[84] = A),
            (L[85] = V),
            (L[86] = F))
          : (F = L[86]),
        F
      );
    },
  ]);
};
