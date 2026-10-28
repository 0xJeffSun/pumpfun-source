// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    i = e.i(909316),
    r = e.i(696500),
    s = e.i(108305),
    a = e.i(446929),
    n = e.i(288912),
    o = e.i(745018);
  e.i(12692);
  var d = e.i(398902),
    c = e.i(980268),
    u = e.i(360827),
    m = e.i(595673),
    b = e.i(338319),
    p = e.i(324787);
  let f =
      "flex size-6 items-center justify-center rounded text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary disabled:pointer-events-none disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-text-accent",
    h =
      "flex-1 rounded-md border border-border-tertiary px-2 py-1 text-xs font-medium text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-text-accent aria-pressed:border-transparent aria-pressed:bg-bg-accent/[0.12] aria-pressed:text-text-accent aria-pressed:hover:bg-bg-accent/[0.12]",
    x = "px-1 pb-1 text-xs font-medium text-text-tertiary";
  function y(e) {
    return e.setColumnHidden;
  }
  function v(e) {
    return e.moveColumn;
  }
  function g(e) {
    return e.setDensity;
  }
  function w(e) {
    return e.resetTable;
  }
  function _(e) {
    return [e.id, e];
  }
  function j(e) {
    return void 0 !== e;
  }
  e.s([
    "f",
    0,
    (e) => {
      let k,
        N,
        S,
        C,
        I,
        F,
        T,
        U,
        K,
        A,
        D,
        P,
        z,
        E,
        V,
        H,
        M,
        q,
        B,
        L,
        O,
        $,
        J,
        R,
        Z,
        W,
        Y,
        Q,
        X,
        G,
        ee,
        et = (0, l.c)(113),
        {
          table: el,
          catalog: ei,
          className: er,
          icon: es,
          iconClassName: ea,
          showDensity: en,
          sourceScreen: eo,
        } = e,
        ed = void 0 === es ? o.cL : es,
        ec = void 0 === en || en,
        { t: eu } = (0, d.f)();
      et[0] !== el
        ? ((k = (e) => e.tables[el]), (et[0] = el), (et[1] = k))
        : (k = et[1]);
      let em = (0, p.w)(k),
        eb = (0, p.w)(y),
        ep = (0, p.w)(v),
        ef = (0, p.w)(g),
        eh = (0, p.w)(w);
      et[2] !== em.hidden
        ? ((N = new Set(em.hidden)), (et[2] = em.hidden), (et[3] = N))
        : (N = et[3]);
      let ex = N;
      if (
        et[4] !== ed ||
        et[5] !== ei ||
        et[6] !== er ||
        et[7] !== em.order ||
        et[8] !== ex ||
        et[9] !== ea ||
        et[10] !== ep ||
        et[11] !== eh ||
        et[12] !== eb ||
        et[13] !== ef ||
        et[14] !== eo ||
        et[15] !== eu ||
        et[16] !== el
      ) {
        let e,
          l,
          d,
          p,
          h,
          y,
          v,
          g,
          w,
          k = new Map(ei.map(_)),
          N = em.order.map((e) => k.get(e)).filter(j);
        et[35] !== eu
          ? ((e = (e) => eu(e)), (et[35] = eu), (et[36] = e))
          : (e = et[36]);
        let O = e;
        et[37] !== eb || et[38] !== eo || et[39] !== el
          ? ((l = (e) => {
              let { id: t, checked: l } = e;
              (eb({ table: el, id: t, hidden: !l }),
                (0, m.lT)({
                  table: el,
                  action: l ? "show" : "hide",
                  columnId: t,
                  sourceScreen: eo,
                }));
            }),
            (et[37] = eb),
            (et[38] = eo),
            (et[39] = el),
            (et[40] = l))
          : (l = et[40]);
        let $ = l,
          J = (e) => {
            let { id: t, direction: l } = e,
              i = N.findIndex((e) => e.id === t),
              r = N["up" === l ? i - 1 : i + 1];
            (ep({ table: el, id: t, direction: l, neighborId: r?.id }),
              (0, m.lT)({
                table: el,
                action: "reorder",
                columnId: t,
                value: l,
                sourceScreen: eo,
              }));
          };
        (et[41] !== ef || et[42] !== eo || et[43] !== el
          ? ((d = (e) => {
              (ef({ table: el, density: e }),
                (0, m.lT)({
                  table: el,
                  action: "density",
                  value: e,
                  sourceScreen: eo,
                }));
            }),
            (et[41] = ef),
            (et[42] = eo),
            (et[43] = el),
            (et[44] = d))
          : (d = et[44]),
          (T = d),
          et[45] !== eh || et[46] !== eo || et[47] !== el
            ? ((p = () => {
                (eh({ table: el }),
                  (0, m.lT)({ table: el, action: "reset", sourceScreen: eo }));
              }),
              (et[45] = eh),
              (et[46] = eo),
              (et[47] = el),
              (et[48] = p))
            : (p = et[48]),
          (U = p),
          (F = i.f.Root),
          et[49] !== eu
            ? ((h = eu("web.coin.customize_table")),
              (et[49] = eu),
              (et[50] = h))
            : (h = et[50]),
          et[51] !== er
            ? ((y = (0, b.c)(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border-tertiary bg-bg-tertiary text-text-tertiary transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-text-accent data-[popup-open]:text-text-primary",
                er,
              )),
              (et[51] = er),
              (et[52] = y))
            : (y = et[52]),
          et[53] !== ea
            ? ((v = (0, b.c)("size-4", ea)), (et[53] = ea), (et[54] = v))
            : (v = et[54]),
          et[55] !== ed || et[56] !== v
            ? ((g = (0, t.jsx)(ed, { className: v })),
              (et[55] = ed),
              (et[56] = v),
              (et[57] = g))
            : (g = et[57]),
          et[58] !== h || et[59] !== y || et[60] !== g
            ? ((V = (0, t.jsx)(r.f.Trigger, {
                "aria-label": h,
                className: y,
                "data-testid": "coin-table-customize",
                children: g,
              })),
              (et[58] = h),
              (et[59] = y),
              (et[60] = g),
              (et[61] = V))
            : (V = et[61]),
          (I = s.f.Portal),
          (C = a.f.Positioner),
          (A = "bottom"),
          (D = "end"),
          (P = 6),
          (z = 16),
          (E = "z-[120]"),
          (S = n.f.Popup),
          et[62] !== eu
            ? ((B = eu("web.coin.customize_table")),
              (et[62] = eu),
              (et[63] = B))
            : (B = et[63]),
          et[64] === Symbol.for("react.memo_cache_sentinel")
            ? ((L = (0, b.c)(
                u.V,
                "flex w-64 flex-col gap-3 p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-text-accent",
              )),
              (et[64] = L))
            : (L = et[64]),
          (K = "coin-table-customize-panel"),
          et[65] !== eu
            ? ((w = eu("web.coin.table_columns")), (et[65] = eu), (et[66] = w))
            : (w = et[66]),
          et[67] !== w
            ? ((q = (0, t.jsx)("p", { className: x, children: w })),
              (et[67] = w),
              (et[68] = q))
            : (q = et[68]),
          (H = "flex flex-col"),
          (M = N.map((e, l) => {
            let i = e.id,
              r = O(e.labelKey),
              s = !0 === e.lockedVisible;
            return (0, t.jsxs)(
              "li",
              {
                className: "flex items-center gap-2 rounded-md px-1 py-1",
                children: [
                  (0, t.jsx)(c.f, {
                    "aria-label": r,
                    checked: s || !ex.has(i),
                    disabled: s,
                    "data-testid": `coin-table-column-${i}`,
                    onCheckedChange: (e) => $({ id: i, checked: !0 === e }),
                  }),
                  (0, t.jsx)("span", {
                    className:
                      "min-w-0 flex-1 truncate text-sm text-text-primary",
                    children: r,
                  }),
                  (0, t.jsx)("button", {
                    type: "button",
                    className: f,
                    "aria-label": eu("web.coin.table_move_up", { column: r }),
                    "data-testid": `coin-table-move-up-${i}`,
                    disabled: 0 === l,
                    onClick: () => J({ id: i, direction: "up" }),
                    children: (0, t.jsx)(o.vY, {
                      className: "size-4 rotate-180",
                    }),
                  }),
                  (0, t.jsx)("button", {
                    type: "button",
                    className: f,
                    "aria-label": eu("web.coin.table_move_down", { column: r }),
                    "data-testid": `coin-table-move-down-${i}`,
                    disabled: l === N.length - 1,
                    onClick: () => J({ id: i, direction: "down" }),
                    children: (0, t.jsx)(o.vY, { className: "size-4" }),
                  }),
                ],
              },
              i,
            );
          })),
          (et[4] = ed),
          (et[5] = ei),
          (et[6] = er),
          (et[7] = em.order),
          (et[8] = ex),
          (et[9] = ea),
          (et[10] = ep),
          (et[11] = eh),
          (et[12] = eb),
          (et[13] = ef),
          (et[14] = eo),
          (et[15] = eu),
          (et[16] = el),
          (et[17] = S),
          (et[18] = C),
          (et[19] = I),
          (et[20] = F),
          (et[21] = T),
          (et[22] = U),
          (et[23] = K),
          (et[24] = A),
          (et[25] = D),
          (et[26] = P),
          (et[27] = z),
          (et[28] = E),
          (et[29] = V),
          (et[30] = H),
          (et[31] = M),
          (et[32] = q),
          (et[33] = B),
          (et[34] = L));
      } else
        ((S = et[17]),
          (C = et[18]),
          (I = et[19]),
          (F = et[20]),
          (T = et[21]),
          (U = et[22]),
          (K = et[23]),
          (A = et[24]),
          (D = et[25]),
          (P = et[26]),
          (z = et[27]),
          (E = et[28]),
          (V = et[29]),
          (H = et[30]),
          (M = et[31]),
          (q = et[32]),
          (B = et[33]),
          (L = et[34]));
      return (
        et[69] !== H || et[70] !== M
          ? ((O = (0, t.jsx)("ul", { className: H, children: M })),
            (et[69] = H),
            (et[70] = M),
            (et[71] = O))
          : (O = et[71]),
        et[72] !== O || et[73] !== q
          ? (($ = (0, t.jsxs)("section", { children: [q, O] })),
            (et[72] = O),
            (et[73] = q),
            (et[74] = $))
          : ($ = et[74]),
        et[75] !== em.density || et[76] !== T || et[77] !== ec || et[78] !== eu
          ? ((J = ec
              ? (0, t.jsxs)("section", {
                  children: [
                    (0, t.jsx)("p", {
                      className: x,
                      children: eu("web.coin.table_density"),
                    }),
                    (0, t.jsxs)("div", {
                      className: "flex gap-2",
                      role: "group",
                      children: [
                        (0, t.jsx)("button", {
                          type: "button",
                          className: h,
                          "aria-pressed": "comfy" === em.density,
                          "data-testid": "coin-table-density-comfy",
                          onClick: () => T("comfy"),
                          children: eu("web.coin.table_density_comfy"),
                        }),
                        (0, t.jsx)("button", {
                          type: "button",
                          className: h,
                          "aria-pressed": "compact" === em.density,
                          "data-testid": "coin-table-density-compact",
                          onClick: () => T("compact"),
                          children: eu("web.coin.table_density_compact"),
                        }),
                      ],
                    }),
                  ],
                })
              : null),
            (et[75] = em.density),
            (et[76] = T),
            (et[77] = ec),
            (et[78] = eu),
            (et[79] = J))
          : (J = et[79]),
        et[80] !== eu
          ? ((R = eu("web.coin.table_narrow_columns_hint")),
            (et[80] = eu),
            (et[81] = R))
          : (R = et[81]),
        et[82] !== R
          ? ((Z = (0, t.jsx)("p", {
              className: "px-1 text-xs text-text-tertiary",
              children: R,
            })),
            (et[82] = R),
            (et[83] = Z))
          : (Z = et[83]),
        et[84] !== eu
          ? ((W = eu("web.coin.table_reset")), (et[84] = eu), (et[85] = W))
          : (W = et[85]),
        et[86] !== U || et[87] !== W
          ? ((Y = (0, t.jsx)("button", {
              type: "button",
              className:
                "rounded-md border border-border-tertiary px-2 py-1.5 text-xs font-medium text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-text-accent",
              "data-testid": "coin-table-reset",
              onClick: U,
              children: W,
            })),
            (et[86] = U),
            (et[87] = W),
            (et[88] = Y))
          : (Y = et[88]),
        et[89] !== S ||
        et[90] !== K ||
        et[91] !== $ ||
        et[92] !== J ||
        et[93] !== Z ||
        et[94] !== Y ||
        et[95] !== B ||
        et[96] !== L
          ? ((Q = (0, t.jsxs)(S, {
              "aria-label": B,
              className: L,
              "data-testid": K,
              children: [$, J, Z, Y],
            })),
            (et[89] = S),
            (et[90] = K),
            (et[91] = $),
            (et[92] = J),
            (et[93] = Z),
            (et[94] = Y),
            (et[95] = B),
            (et[96] = L),
            (et[97] = Q))
          : (Q = et[97]),
        et[98] !== C ||
        et[99] !== A ||
        et[100] !== D ||
        et[101] !== P ||
        et[102] !== z ||
        et[103] !== E ||
        et[104] !== Q
          ? ((X = (0, t.jsx)(C, {
              side: A,
              align: D,
              sideOffset: P,
              collisionPadding: z,
              className: E,
              children: Q,
            })),
            (et[98] = C),
            (et[99] = A),
            (et[100] = D),
            (et[101] = P),
            (et[102] = z),
            (et[103] = E),
            (et[104] = Q),
            (et[105] = X))
          : (X = et[105]),
        et[106] !== I || et[107] !== X
          ? ((G = (0, t.jsx)(I, { children: X })),
            (et[106] = I),
            (et[107] = X),
            (et[108] = G))
          : (G = et[108]),
        et[109] !== F || et[110] !== V || et[111] !== G
          ? ((ee = (0, t.jsxs)(F, { children: [V, G] })),
            (et[109] = F),
            (et[110] = V),
            (et[111] = G),
            (et[112] = ee))
          : (ee = et[112]),
        ee
      );
    },
  ]);
};
