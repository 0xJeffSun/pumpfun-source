// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    i = e.i(445242),
    r = e.i(745018);
  e.i(12692);
  var a = e.i(398902),
    n = e.i(338319),
    l = e.i(606178),
    o = e.i(51206),
    s = e.i(908163);
  let c =
      "flex w-full items-center font-medium text-text-tertiary transition-colors",
    d = {
      terminal: "h-7 text-xs leading-4",
      comfortable: "h-10 text-[13px] leading-[18px]",
    },
    m =
      "hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text-accent disabled:cursor-default disabled:text-text-quaternary disabled:hover:text-text-quaternary",
    x = { terminal: 24, comfortable: 28 };
  e.s([
    "f",
    0,
    m,
    "Q",
    0,
    c,
    "g",
    0,
    d,
    "r",
    0,
    function (e) {
      let u,
        p,
        b,
        f,
        h,
        g,
        y,
        v,
        _,
        w,
        N,
        k,
        j,
        S,
        C,
        z,
        $,
        F,
        E,
        P,
        T,
        A,
        L,
        M,
        I,
        q,
        U,
        D,
        K,
        B = (0, i.c)(87),
        { t: O } = (0, a.f)();
      if (B[0] !== e || B[1] !== O) {
        $ = Symbol.for("react.early_return_sentinel");
        e: {
          let i = (0, n.c)(c, d[e.density]);
          if ("disclosure" === e.kind) {
            let a,
              o,
              c,
              d,
              {
                density: x,
                label: u,
                count: p,
                open: b,
                onToggle: f,
                controls: h,
                className: g,
                "data-testid": y,
              } = e,
              v = (0, n.c)(i, m, l.U[x], "gap-1.5 text-left", g);
            (B[19] !== u
              ? ((a = (0, t.jsx)("span", {
                  className: "min-w-0 truncate",
                  children: u,
                })),
                (B[19] = u),
                (B[20] = a))
              : (a = B[20]),
              B[21] !== p || B[22] !== x
                ? ((o =
                    null != p
                      ? (0, t.jsx)(s.E, {
                          density: x,
                          className: "text-text-tertiary",
                          children: p,
                        })
                      : null),
                  (B[21] = p),
                  (B[22] = x),
                  (B[23] = o))
                : (o = B[23]));
            let _ = b && "rotate-180";
            (B[24] !== _
              ? ((c = (0, n.c)(
                  "size-3 shrink-0 text-text-quaternary transition-transform",
                  _,
                )),
                (B[24] = _),
                (B[25] = c))
              : (c = B[25]),
              B[26] !== c
                ? ((d = (0, t.jsx)(r.vY, { "aria-hidden": !0, className: c })),
                  (B[26] = c),
                  (B[27] = d))
                : (d = B[27]),
              ($ = (0, t.jsxs)("button", {
                type: "button",
                "aria-expanded": b,
                "aria-controls": h,
                onClick: f,
                "data-density": x,
                "data-footer-row": "disclosure",
                "data-testid": y,
                className: v,
                children: [a, o, d],
              })));
            break e;
          }
          if ("loadMore" === e.kind) {
            let r,
              {
                density: a,
                label: o,
                onClick: s,
                busy: c,
                disabled: d,
                className: x,
                "data-testid": u,
              } = e,
              p = void 0 !== c && c;
            (B[28] !== p || B[29] !== o || B[30] !== O
              ? ((r = p ? O("common.loading") : o),
                (B[28] = p),
                (B[29] = o),
                (B[30] = O),
                (B[31] = r))
              : (r = B[31]),
              ($ = (0, t.jsx)("button", {
                type: "button",
                "aria-busy": p || void 0,
                disabled: d || p,
                onClick: s,
                "data-density": a,
                "data-footer-row": "loadMore",
                "data-testid": u,
                className: (0, n.c)(i, m, l.U[a], "justify-center gap-1.5", x),
                children: r,
              })));
            break e;
          }
          let {
            density: a,
            page: o,
            pageCount: F,
            hasNext: E,
            onPageChange: P,
            busy: T,
            className: A,
            edgeLabels: L,
            "aria-label": M,
            "data-testid": I,
          } = e;
          ((p = a),
            (y = o),
            (v = F),
            (g = P),
            (b = L),
            (u = void 0 !== T && T),
            (f = E ?? (void 0 !== v && y < v)),
            (h = y > 1),
            (w = x[p]),
            (_ = void 0 !== b && void 0 !== v),
            (N = M),
            (k = u || void 0),
            (j = p),
            (S = "pager"),
            (C = I),
            (z = (0, n.c)(i, l.U[p], "justify-center gap-2", A)));
        }
        ((B[0] = e),
          (B[1] = O),
          (B[2] = u),
          (B[3] = p),
          (B[4] = b),
          (B[5] = f),
          (B[6] = h),
          (B[7] = g),
          (B[8] = y),
          (B[9] = v),
          (B[10] = _),
          (B[11] = w),
          (B[12] = N),
          (B[13] = k),
          (B[14] = j),
          (B[15] = S),
          (B[16] = C),
          (B[17] = z),
          (B[18] = $));
      } else
        ((u = B[2]),
          (p = B[3]),
          (b = B[4]),
          (f = B[5]),
          (h = B[6]),
          (g = B[7]),
          (y = B[8]),
          (v = B[9]),
          (_ = B[10]),
          (w = B[11]),
          (N = B[12]),
          (k = B[13]),
          (j = B[14]),
          (S = B[15]),
          (C = B[16]),
          (z = B[17]),
          ($ = B[18]));
      if ($ !== Symbol.for("react.early_return_sentinel")) return $;
      (B[32] !== u ||
      B[33] !== p ||
      B[34] !== b ||
      B[35] !== h ||
      B[36] !== g ||
      B[37] !== _ ||
      B[38] !== w
        ? ((F = _
            ? (0, t.jsx)(o._, {
                density: p,
                size: w,
                "aria-label": b.first,
                disabled: !h || u,
                onClick: () => g(1),
                children: (0, t.jsx)(r.W_, { "aria-hidden": !0 }),
              })
            : null),
          (B[32] = u),
          (B[33] = p),
          (B[34] = b),
          (B[35] = h),
          (B[36] = g),
          (B[37] = _),
          (B[38] = w),
          (B[39] = F))
        : (F = B[39]),
        B[40] !== O
          ? ((E = O("web.pagination.previous_page")), (B[40] = O), (B[41] = E))
          : (E = B[41]));
      let R = !h || u;
      (B[42] !== g || B[43] !== y
        ? ((P = () => g(y - 1)), (B[42] = g), (B[43] = y), (B[44] = P))
        : (P = B[44]),
        B[45] === Symbol.for("react.memo_cache_sentinel")
          ? ((T = (0, t.jsx)(r.S, { "aria-hidden": !0 })), (B[45] = T))
          : (T = B[45]),
        B[46] !== p || B[47] !== w || B[48] !== P || B[49] !== E || B[50] !== R
          ? ((A = (0, t.jsx)(o._, {
              density: p,
              size: w,
              "aria-label": E,
              disabled: R,
              onClick: P,
              children: T,
            })),
            (B[46] = p),
            (B[47] = w),
            (B[48] = P),
            (B[49] = E),
            (B[50] = R),
            (B[51] = A))
          : (A = B[51]));
      let H = void 0 !== v ? `${y} / ${v}` : y;
      (B[52] !== H
        ? ((L = (0, t.jsx)("span", {
            "aria-current": "page",
            className: "px-1 tabular-nums text-text-primary",
            children: H,
          })),
          (B[52] = H),
          (B[53] = L))
        : (L = B[53]),
        B[54] !== O
          ? ((M = O("web.pagination.next_page")), (B[54] = O), (B[55] = M))
          : (M = B[55]));
      let V = !f || u;
      return (
        B[56] !== g || B[57] !== y
          ? ((I = () => g(y + 1)), (B[56] = g), (B[57] = y), (B[58] = I))
          : (I = B[58]),
        B[59] === Symbol.for("react.memo_cache_sentinel")
          ? ((q = (0, t.jsx)(r.kK, { "aria-hidden": !0 })), (B[59] = q))
          : (q = B[59]),
        B[60] !== p || B[61] !== w || B[62] !== M || B[63] !== V || B[64] !== I
          ? ((U = (0, t.jsx)(o._, {
              density: p,
              size: w,
              "aria-label": M,
              disabled: V,
              onClick: I,
              children: q,
            })),
            (B[60] = p),
            (B[61] = w),
            (B[62] = M),
            (B[63] = V),
            (B[64] = I),
            (B[65] = U))
          : (U = B[65]),
        B[66] !== u ||
        B[67] !== p ||
        B[68] !== b ||
        B[69] !== f ||
        B[70] !== g ||
        B[71] !== v ||
        B[72] !== _ ||
        B[73] !== w
          ? ((D = _
              ? (0, t.jsx)(o._, {
                  density: p,
                  size: w,
                  "aria-label": b.last,
                  disabled: !f || u,
                  onClick: () => g(v),
                  children: (0, t.jsx)(r.FE, { "aria-hidden": !0 }),
                })
              : null),
            (B[66] = u),
            (B[67] = p),
            (B[68] = b),
            (B[69] = f),
            (B[70] = g),
            (B[71] = v),
            (B[72] = _),
            (B[73] = w),
            (B[74] = D))
          : (D = B[74]),
        B[75] !== N ||
        B[76] !== k ||
        B[77] !== A ||
        B[78] !== L ||
        B[79] !== U ||
        B[80] !== j ||
        B[81] !== D ||
        B[82] !== S ||
        B[83] !== C ||
        B[84] !== z ||
        B[85] !== F
          ? ((K = (0, t.jsxs)("nav", {
              "aria-label": N,
              "aria-busy": k,
              "data-density": j,
              "data-footer-row": S,
              "data-testid": C,
              className: z,
              children: [F, A, L, U, D],
            })),
            (B[75] = N),
            (B[76] = k),
            (B[77] = A),
            (B[78] = L),
            (B[79] = U),
            (B[80] = j),
            (B[81] = D),
            (B[82] = S),
            (B[83] = C),
            (B[84] = z),
            (B[85] = F),
            (B[86] = K))
          : (K = B[86]),
        K
      );
    },
  ]);
};
