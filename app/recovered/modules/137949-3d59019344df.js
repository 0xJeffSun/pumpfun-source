// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(745018);
  e.i(12692);
  var l = e.i(398902),
    a = e.i(338319),
    n = e.i(606178),
    s = e.i(51206),
    o = e.i(908163);
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
        x,
        b,
        v,
        y,
        g,
        w,
        j,
        k,
        N,
        _,
        S,
        C,
        I,
        A,
        D,
        U,
        F,
        M,
        z,
        P,
        $,
        E,
        L,
        R,
        T,
        q,
        H = (0, i.c)(87),
        { t: B } = (0, l.f)();
      if (H[0] !== e || H[1] !== B) {
        A = Symbol.for("react.early_return_sentinel");
        e: {
          let i = (0, a.c)(d, c[e.density]);
          if ("disclosure" === e.kind) {
            let l,
              s,
              d,
              c,
              {
                density: m,
                label: f,
                count: p,
                open: h,
                onToggle: x,
                controls: b,
                className: v,
                "data-testid": y,
              } = e,
              g = (0, a.c)(i, u, n.U[m], "gap-1.5 text-left", v);
            (H[19] !== f
              ? ((l = (0, t.jsx)("span", {
                  className: "min-w-0 truncate",
                  children: f,
                })),
                (H[19] = f),
                (H[20] = l))
              : (l = H[20]),
              H[21] !== p || H[22] !== m
                ? ((s =
                    null != p
                      ? (0, t.jsx)(o.E, {
                          density: m,
                          className: "text-text-tertiary",
                          children: p,
                        })
                      : null),
                  (H[21] = p),
                  (H[22] = m),
                  (H[23] = s))
                : (s = H[23]));
            let w = h && "rotate-180";
            (H[24] !== w
              ? ((d = (0, a.c)(
                  "size-3 shrink-0 text-text-quaternary transition-transform",
                  w,
                )),
                (H[24] = w),
                (H[25] = d))
              : (d = H[25]),
              H[26] !== d
                ? ((c = (0, t.jsx)(r.vY, { "aria-hidden": !0, className: d })),
                  (H[26] = d),
                  (H[27] = c))
                : (c = H[27]),
              (A = (0, t.jsxs)("button", {
                type: "button",
                "aria-expanded": h,
                "aria-controls": b,
                onClick: x,
                "data-density": m,
                "data-footer-row": "disclosure",
                "data-testid": y,
                className: g,
                children: [l, s, c],
              })));
            break e;
          }
          if ("loadMore" === e.kind) {
            let r,
              {
                density: l,
                label: s,
                onClick: o,
                busy: d,
                disabled: c,
                className: m,
                "data-testid": f,
              } = e,
              p = void 0 !== d && d;
            (H[28] !== p || H[29] !== s || H[30] !== B
              ? ((r = p ? B("common.loading") : s),
                (H[28] = p),
                (H[29] = s),
                (H[30] = B),
                (H[31] = r))
              : (r = H[31]),
              (A = (0, t.jsx)("button", {
                type: "button",
                "aria-busy": p || void 0,
                disabled: c || p,
                onClick: o,
                "data-density": l,
                "data-footer-row": "loadMore",
                "data-testid": f,
                className: (0, a.c)(i, u, n.U[l], "justify-center gap-1.5", m),
                children: r,
              })));
            break e;
          }
          let {
            density: l,
            page: s,
            pageCount: D,
            hasNext: U,
            onPageChange: F,
            busy: M,
            className: z,
            edgeLabels: P,
            "aria-label": $,
            "data-testid": E,
          } = e;
          ((p = l),
            (y = s),
            (g = D),
            (v = F),
            (h = P),
            (f = void 0 !== M && M),
            (x = U ?? (void 0 !== g && y < g)),
            (b = y > 1),
            (j = m[p]),
            (w = void 0 !== h && void 0 !== g),
            (k = $),
            (N = f || void 0),
            (_ = p),
            (S = "pager"),
            (C = E),
            (I = (0, a.c)(i, n.U[p], "justify-center gap-2", z)));
        }
        ((H[0] = e),
          (H[1] = B),
          (H[2] = f),
          (H[3] = p),
          (H[4] = h),
          (H[5] = x),
          (H[6] = b),
          (H[7] = v),
          (H[8] = y),
          (H[9] = g),
          (H[10] = w),
          (H[11] = j),
          (H[12] = k),
          (H[13] = N),
          (H[14] = _),
          (H[15] = S),
          (H[16] = C),
          (H[17] = I),
          (H[18] = A));
      } else
        ((f = H[2]),
          (p = H[3]),
          (h = H[4]),
          (x = H[5]),
          (b = H[6]),
          (v = H[7]),
          (y = H[8]),
          (g = H[9]),
          (w = H[10]),
          (j = H[11]),
          (k = H[12]),
          (N = H[13]),
          (_ = H[14]),
          (S = H[15]),
          (C = H[16]),
          (I = H[17]),
          (A = H[18]));
      if (A !== Symbol.for("react.early_return_sentinel")) return A;
      (H[32] !== f ||
      H[33] !== p ||
      H[34] !== h ||
      H[35] !== b ||
      H[36] !== v ||
      H[37] !== w ||
      H[38] !== j
        ? ((D = w
            ? (0, t.jsx)(s._, {
                density: p,
                size: j,
                "aria-label": h.first,
                disabled: !b || f,
                onClick: () => v(1),
                children: (0, t.jsx)(r.W_, { "aria-hidden": !0 }),
              })
            : null),
          (H[32] = f),
          (H[33] = p),
          (H[34] = h),
          (H[35] = b),
          (H[36] = v),
          (H[37] = w),
          (H[38] = j),
          (H[39] = D))
        : (D = H[39]),
        H[40] !== B
          ? ((U = B("web.pagination.previous_page")), (H[40] = B), (H[41] = U))
          : (U = H[41]));
      let O = !b || f;
      (H[42] !== v || H[43] !== y
        ? ((F = () => v(y - 1)), (H[42] = v), (H[43] = y), (H[44] = F))
        : (F = H[44]),
        H[45] === Symbol.for("react.memo_cache_sentinel")
          ? ((M = (0, t.jsx)(r.S, { "aria-hidden": !0 })), (H[45] = M))
          : (M = H[45]),
        H[46] !== p || H[47] !== j || H[48] !== F || H[49] !== U || H[50] !== O
          ? ((z = (0, t.jsx)(s._, {
              density: p,
              size: j,
              "aria-label": U,
              disabled: O,
              onClick: F,
              children: M,
            })),
            (H[46] = p),
            (H[47] = j),
            (H[48] = F),
            (H[49] = U),
            (H[50] = O),
            (H[51] = z))
          : (z = H[51]));
      let V = void 0 !== g ? `${y} / ${g}` : y;
      (H[52] !== V
        ? ((P = (0, t.jsx)("span", {
            "aria-current": "page",
            className: "px-1 tabular-nums text-text-primary",
            children: V,
          })),
          (H[52] = V),
          (H[53] = P))
        : (P = H[53]),
        H[54] !== B
          ? (($ = B("web.pagination.next_page")), (H[54] = B), (H[55] = $))
          : ($ = H[55]));
      let K = !x || f;
      return (
        H[56] !== v || H[57] !== y
          ? ((E = () => v(y + 1)), (H[56] = v), (H[57] = y), (H[58] = E))
          : (E = H[58]),
        H[59] === Symbol.for("react.memo_cache_sentinel")
          ? ((L = (0, t.jsx)(r.kK, { "aria-hidden": !0 })), (H[59] = L))
          : (L = H[59]),
        H[60] !== p || H[61] !== j || H[62] !== $ || H[63] !== K || H[64] !== E
          ? ((R = (0, t.jsx)(s._, {
              density: p,
              size: j,
              "aria-label": $,
              disabled: K,
              onClick: E,
              children: L,
            })),
            (H[60] = p),
            (H[61] = j),
            (H[62] = $),
            (H[63] = K),
            (H[64] = E),
            (H[65] = R))
          : (R = H[65]),
        H[66] !== f ||
        H[67] !== p ||
        H[68] !== h ||
        H[69] !== x ||
        H[70] !== v ||
        H[71] !== g ||
        H[72] !== w ||
        H[73] !== j
          ? ((T = w
              ? (0, t.jsx)(s._, {
                  density: p,
                  size: j,
                  "aria-label": h.last,
                  disabled: !x || f,
                  onClick: () => v(g),
                  children: (0, t.jsx)(r.FE, { "aria-hidden": !0 }),
                })
              : null),
            (H[66] = f),
            (H[67] = p),
            (H[68] = h),
            (H[69] = x),
            (H[70] = v),
            (H[71] = g),
            (H[72] = w),
            (H[73] = j),
            (H[74] = T))
          : (T = H[74]),
        H[75] !== k ||
        H[76] !== N ||
        H[77] !== z ||
        H[78] !== P ||
        H[79] !== R ||
        H[80] !== _ ||
        H[81] !== T ||
        H[82] !== S ||
        H[83] !== C ||
        H[84] !== I ||
        H[85] !== D
          ? ((q = (0, t.jsxs)("nav", {
              "aria-label": k,
              "aria-busy": N,
              "data-density": _,
              "data-footer-row": S,
              "data-testid": C,
              className: I,
              children: [D, z, P, R, T],
            })),
            (H[75] = k),
            (H[76] = N),
            (H[77] = z),
            (H[78] = P),
            (H[79] = R),
            (H[80] = _),
            (H[81] = T),
            (H[82] = S),
            (H[83] = C),
            (H[84] = I),
            (H[85] = D),
            (H[86] = q))
          : (q = H[86]),
        q
      );
    },
  ]);
};
