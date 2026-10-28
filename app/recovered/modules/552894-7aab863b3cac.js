// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  "use strict";
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(879499),
    i = e.i(929776),
    n = e.i(189816),
    a = e.i(745018),
    s = e.i(439587);
  e.i(12692);
  var o = e.i(398902),
    c = e.i(786147),
    d = e.i(607122),
    u = e.i(802763),
    m = e.i(148269),
    x = e.i(671722),
    f = e.i(595673),
    h = e.i(338319),
    p = e.i(617826),
    b = e.i(640412),
    g = e.i(761234);
  let y = d.l[g.f],
    v = "explore-lens-customizer-title",
    _ =
      "inline-flex size-7 shrink-0 items-center justify-center rounded-full text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-bg-accent disabled:pointer-events-none disabled:opacity-40",
    j =
      "flex h-11 items-center gap-3 rounded-[10px] border border-border-secondary bg-bg-primary px-3",
    w = "text-[11px] font-bold uppercase tracking-wide text-text-tertiary",
    N = (e, t) => (0, c.f)(e, x.M[t].labelKey);
  function z() {
    let e,
      l,
      i = (0, r.c)(4),
      { t: n } = (0, o.f)();
    return (
      i[0] !== n
        ? ((e = n("profile.squads.profile.coming_soon")),
          (i[0] = n),
          (i[1] = e))
        : (e = i[1]),
      i[2] !== e
        ? ((l = (0, t.jsx)("span", {
            className:
              "rounded-full bg-bg-tertiary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
            children: e,
          })),
          (i[2] = e),
          (i[3] = l))
        : (l = i[3]),
      l
    );
  }
  function I(e) {
    let l,
      s,
      c,
      d,
      u,
      m,
      f,
      b,
      g,
      y,
      v,
      w,
      I,
      k,
      C,
      S,
      M,
      O = (0, r.c)(66),
      { id: R, canMoveUp: D, canMoveDown: T, onMove: E, onHide: U } = e,
      { t: K } = (0, o.f)();
    O[0] !== R ? ((l = (0, x.Z)(R)), (O[0] = R), (O[1] = l)) : (l = O[1]);
    let Y = l;
    O[2] !== R ? ((s = (0, x.t)(R)), (O[2] = R), (O[3] = s)) : (s = O[3]);
    let $ = s,
      P = Y || !$;
    O[4] !== R || O[5] !== P
      ? ((c = { id: R, disabled: P }), (O[4] = R), (O[5] = P), (O[6] = c))
      : (c = O[6]);
    let {
      attributes: X,
      listeners: A,
      setNodeRef: L,
      setActivatorNodeRef: V,
      transform: q,
      transition: B,
      isDragging: F,
    } = (0, i.s)(c);
    if (
      O[7] !== X ||
      O[8] !== $ ||
      O[9] !== R ||
      O[10] !== P ||
      O[11] !== F ||
      O[12] !== A ||
      O[13] !== V ||
      O[14] !== L ||
      O[15] !== K ||
      O[16] !== q ||
      O[17] !== B
    ) {
      let e;
      ((d = N(K, R)), (u = F || void 0));
      let r = F && "z-10 border-bg-accent shadow-lg",
        l = !$ && "opacity-60";
      (O[26] !== r || O[27] !== l
        ? ((m = (0, h.c)(j, r, l)), (O[26] = r), (O[27] = l), (O[28] = m))
        : (m = O[28]),
        (f = R),
        (b = `explore-lens-customizer-row-${R}`),
        (g = L),
        O[29] !== q
          ? ((e = n.r.Transform.toString(q)), (O[29] = q), (O[30] = e))
          : (e = O[30]),
        O[31] !== e || O[32] !== B
          ? ((y = { transform: e, transition: B }),
            (O[31] = e),
            (O[32] = B),
            (O[33] = y))
          : (y = O[33]),
        (v = P
          ? (0, t.jsx)("span", {
              "aria-hidden": !0,
              className: "size-7 shrink-0",
            })
          : (0, t.jsx)("button", {
              "aria-label": K("web.coin.header_metric_drag_handle", {
                metric: d,
              }),
              className: (0, h.c)(_, "cursor-grab touch-none"),
              ref: V,
              type: "button",
              ...X,
              ...A,
              children: (0, t.jsx)(a.qm, { className: "size-3.5" }),
            })),
        (O[7] = X),
        (O[8] = $),
        (O[9] = R),
        (O[10] = P),
        (O[11] = F),
        (O[12] = A),
        (O[13] = V),
        (O[14] = L),
        (O[15] = K),
        (O[16] = q),
        (O[17] = B),
        (O[18] = d),
        (O[19] = u),
        (O[20] = m),
        (O[21] = f),
        (O[22] = b),
        (O[23] = g),
        (O[24] = y),
        (O[25] = v));
    } else
      ((d = O[18]),
        (u = O[19]),
        (m = O[20]),
        (f = O[21]),
        (b = O[22]),
        (g = O[23]),
        (y = O[24]),
        (v = O[25]));
    return (
      O[34] !== R
        ? ((w = (0, t.jsx)(p.f, { className: "text-text-secondary", id: R })),
          (O[34] = R),
          (O[35] = w))
        : (w = O[35]),
      O[36] !== d
        ? ((I = (0, t.jsx)("span", {
            className:
              "min-w-0 flex-1 truncate text-sm font-medium text-text-primary",
            children: d,
          })),
          (O[36] = d),
          (O[37] = I))
        : (I = O[37]),
      O[38] !== $
        ? ((k = $ ? null : (0, t.jsx)(z, {})), (O[38] = $), (O[39] = k))
        : (k = O[39]),
      O[40] !== T ||
      O[41] !== D ||
      O[42] !== P ||
      O[43] !== d ||
      O[44] !== E ||
      O[45] !== K
        ? ((C = P
            ? null
            : (0, t.jsxs)(t.Fragment, {
                children: [
                  (0, t.jsx)("button", {
                    "aria-label": K("web.coin.table_move_up", { column: d }),
                    className: _,
                    disabled: !D,
                    onClick: () => E(-1),
                    type: "button",
                    children: (0, t.jsx)(a.DD, { className: "size-3.5" }),
                  }),
                  (0, t.jsx)("button", {
                    "aria-label": K("web.coin.table_move_down", { column: d }),
                    className: _,
                    disabled: !T,
                    onClick: () => E(1),
                    type: "button",
                    children: (0, t.jsx)(a.kg, { className: "size-3.5" }),
                  }),
                ],
              })),
          (O[40] = T),
          (O[41] = D),
          (O[42] = P),
          (O[43] = d),
          (O[44] = E),
          (O[45] = K),
          (O[46] = C))
        : (C = O[46]),
      O[47] !== $ || O[48] !== d || O[49] !== Y || O[50] !== U || O[51] !== K
        ? ((S = Y
            ? (0, t.jsx)("span", {
                "aria-label": K("web.home.lens_customize_locked"),
                className:
                  "inline-flex size-7 shrink-0 items-center justify-center text-text-tertiary",
                role: "img",
                title: K("web.home.lens_customize_locked"),
                children: (0, t.jsx)(a.dl, { className: "size-4" }),
              })
            : (0, t.jsx)("button", {
                "aria-label": K("web.coin.header_metric_hide", { metric: d }),
                className: _,
                disabled: !$,
                onClick: U,
                type: "button",
                children: (0, t.jsx)(a.a6, { className: "size-4" }),
              })),
          (O[47] = $),
          (O[48] = d),
          (O[49] = Y),
          (O[50] = U),
          (O[51] = K),
          (O[52] = S))
        : (S = O[52]),
      O[53] !== w ||
      O[54] !== I ||
      O[55] !== k ||
      O[56] !== C ||
      O[57] !== S ||
      O[58] !== u ||
      O[59] !== m ||
      O[60] !== f ||
      O[61] !== b ||
      O[62] !== g ||
      O[63] !== y ||
      O[64] !== v
        ? ((M = (0, t.jsxs)("li", {
            "aria-grabbed": u,
            className: m,
            "data-lens": f,
            "data-testid": b,
            ref: g,
            style: y,
            children: [v, w, I, k, C, S],
          })),
          (O[53] = w),
          (O[54] = I),
          (O[55] = k),
          (O[56] = C),
          (O[57] = S),
          (O[58] = u),
          (O[59] = m),
          (O[60] = f),
          (O[61] = b),
          (O[62] = g),
          (O[63] = y),
          (O[64] = v),
          (O[65] = M))
        : (M = O[65]),
      M
    );
  }
  function k(e) {
    let l,
      i,
      n,
      s,
      c,
      d,
      u,
      m,
      f,
      b,
      g,
      y = (0, r.c)(30),
      { id: v, onShow: w } = e,
      { t: I } = (0, o.f)();
    y[0] !== v ? ((l = (0, x.t)(v)), (y[0] = v), (y[1] = l)) : (l = y[1]);
    let k = l;
    y[2] !== v || y[3] !== I
      ? ((i = N(I, v)), (y[2] = v), (y[3] = I), (y[4] = i))
      : (i = y[4]);
    let C = i,
      S = !k && "opacity-60";
    y[5] !== S ? ((n = (0, h.c)(j, S)), (y[5] = S), (y[6] = n)) : (n = y[6]);
    let M = `explore-lens-customizer-row-${v}`;
    (y[7] === Symbol.for("react.memo_cache_sentinel")
      ? ((s = (0, t.jsx)("span", {
          "aria-hidden": !0,
          className: "size-7 shrink-0",
        })),
        (y[7] = s))
      : (s = y[7]),
      y[8] !== v
        ? ((c = (0, t.jsx)(p.f, { className: "text-text-tertiary", id: v })),
          (y[8] = v),
          (y[9] = c))
        : (c = y[9]),
      y[10] !== C
        ? ((d = (0, t.jsx)("span", {
            className:
              "min-w-0 flex-1 truncate text-sm font-medium text-text-secondary",
            children: C,
          })),
          (y[10] = C),
          (y[11] = d))
        : (d = y[11]),
      y[12] !== k
        ? ((u = k ? null : (0, t.jsx)(z, {})), (y[12] = k), (y[13] = u))
        : (u = y[13]),
      y[14] !== C || y[15] !== I
        ? ((m = I("web.coin.header_metric_show", { metric: C })),
          (y[14] = C),
          (y[15] = I),
          (y[16] = m))
        : (m = y[16]));
    let O = !k;
    return (
      y[17] === Symbol.for("react.memo_cache_sentinel")
        ? ((f = (0, t.jsx)(a.sI, { className: "size-4" })), (y[17] = f))
        : (f = y[17]),
      y[18] !== w || y[19] !== m || y[20] !== O
        ? ((b = (0, t.jsx)("button", {
            "aria-label": m,
            className: _,
            disabled: O,
            onClick: w,
            type: "button",
            children: f,
          })),
          (y[18] = w),
          (y[19] = m),
          (y[20] = O),
          (y[21] = b))
        : (b = y[21]),
      y[22] !== v ||
      y[23] !== b ||
      y[24] !== n ||
      y[25] !== M ||
      y[26] !== c ||
      y[27] !== d ||
      y[28] !== u
        ? ((g = (0, t.jsxs)("li", {
            className: n,
            "data-lens": v,
            "data-testid": M,
            children: [s, c, d, u, b],
          })),
          (y[22] = v),
          (y[23] = b),
          (y[24] = n),
          (y[25] = M),
          (y[26] = c),
          (y[27] = d),
          (y[28] = u),
          (y[29] = g))
        : (g = y[29]),
      g
    );
  }
  e.s([
    "ExploreLensCustomizer",
    0,
    function (e) {
      let n,
        c,
        p,
        g,
        j,
        z,
        C,
        S,
        M,
        O,
        R,
        D,
        T,
        E,
        U,
        K,
        Y,
        $,
        P,
        X,
        A,
        L,
        V,
        q,
        B,
        F,
        H,
        J,
        Q,
        W,
        Z,
        G,
        ee,
        et,
        er,
        el,
        ei,
        en,
        ea,
        es,
        eo,
        ec,
        ed,
        eu,
        em,
        ex,
        ef,
        eh,
        ep,
        eb,
        eg,
        ey,
        ev,
        e_,
        ej = (0, r.c)(136),
        { onClose: ew } = e,
        { t: eN } = (0, o.f)(),
        {
          box: ez,
          visibleBox: eI,
          move: ek,
          reorder: eC,
          hide: eS,
          show: eM,
          reset: eO,
        } = (0, u.f)();
      ej[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((n = (0, x.V)(m.Q)), (ej[0] = n))
        : (n = ej[0]);
      let eR = n,
        eD = (0, x.x)(ez);
      (ej[1] === Symbol.for("react.memo_cache_sentinel")
        ? ((c = { activationConstraint: { distance: 6 } }), (ej[1] = c))
        : (c = ej[1]),
        ej[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((p = { coordinateGetter: i.j }), (ej[2] = p))
          : (p = ej[2]));
      let eT = (0, l.n)((0, l.J)(l.k, c), (0, l.J)(l.y, p));
      ej[3] !== eC
        ? ((g = (e) => {
            let t = e.active.id,
              r = e.over?.id;
            (0, x.$)(t) && (0, x.$)(r) && t !== r && eC(t, r);
          }),
          (ej[3] = eC),
          (ej[4] = g))
        : (g = ej[4]);
      let eE = g;
      ej[5] !== ez || ej[6] !== eN
        ? ((j = (e) => ({
            metric: (0, x.$)(e) ? N(eN, e) : "",
            position: ez.indexOf(e) + 1,
            total: ez.length,
          })),
          (ej[5] = ez),
          (ej[6] = eN),
          (ej[7] = j))
        : (j = ej[7]);
      let eU = j;
      (ej[8] !== eU || ej[9] !== eN
        ? ((z = (e) => {
            let { active: t } = e;
            return eN("web.coin.header_drag_picked_up", eU(t.id));
          }),
          (ej[8] = eU),
          (ej[9] = eN),
          (ej[10] = z))
        : (z = ej[10]),
        ej[11] !== ez || ej[12] !== eU || ej[13] !== eN
          ? ((C = (e) => {
              let { active: t, over: r } = e;
              return r
                ? eN("web.coin.header_drag_moved", {
                    ...eU(t.id),
                    position: ez.indexOf(r.id) + 1,
                  })
                : void 0;
            }),
            (S = (e) => {
              let { active: t, over: r } = e;
              return eN("web.coin.header_drag_dropped", {
                ...eU(t.id),
                position: ez.indexOf(r?.id ?? t.id) + 1,
              });
            }),
            (ej[11] = ez),
            (ej[12] = eU),
            (ej[13] = eN),
            (ej[14] = C),
            (ej[15] = S))
          : ((C = ej[14]), (S = ej[15])),
        ej[16] !== eU || ej[17] !== eN
          ? ((M = (e) => {
              let { active: t } = e;
              return eN("web.coin.header_drag_cancelled", eU(t.id));
            }),
            (ej[16] = eU),
            (ej[17] = eN),
            (ej[18] = M))
          : (M = ej[18]),
        ej[19] !== z || ej[20] !== C || ej[21] !== S || ej[22] !== M
          ? ((O = {
              onDragStart: z,
              onDragOver: C,
              onDragEnd: S,
              onDragCancel: M,
            }),
            (ej[19] = z),
            (ej[20] = C),
            (ej[21] = S),
            (ej[22] = M),
            (ej[23] = O))
          : (O = ej[23]));
      let eK = O;
      ej[24] !== eO
        ? ((R = () => {
            ((0, f.ri)({ buttonId: "explore_lens_customizer_reset" }), eO());
          }),
          (ej[24] = eO),
          (ej[25] = R))
        : (R = ej[25]);
      let eY = R,
        e$ = s.v;
      ej[26] !== ew
        ? ((D = (e) => {
            e || ew();
          }),
          (ej[26] = ew),
          (ej[27] = D))
        : (D = ej[27]);
      let eP = s.s;
      if (
        (ej[28] === Symbol.for("react.memo_cache_sentinel")
          ? ((T = (0, t.jsx)(a.m_, {
              "aria-hidden": !0,
              className: "size-4 shrink-0 text-text-secondary",
            })),
            (ej[28] = T))
          : (T = ej[28]),
        ej[29] !== eN
          ? ((E = eN("web.home.lens_customize")), (ej[29] = eN), (ej[30] = E))
          : (E = ej[30]),
        ej[31] !== E
          ? ((U = (0, t.jsx)("h2", {
              className: "flex-1 text-base font-semibold text-text-primary",
              id: v,
              children: E,
            })),
            (ej[31] = E),
            (ej[32] = U))
          : (U = ej[32]),
        ej[33] !== eN
          ? ((K = eN("common.close")), (ej[33] = eN), (ej[34] = K))
          : (K = ej[34]),
        ej[35] === Symbol.for("react.memo_cache_sentinel")
          ? ((Y = (0, t.jsx)(a.x6, { className: "size-4" })), (ej[35] = Y))
          : (Y = ej[35]),
        ej[36] !== ew || ej[37] !== K
          ? (($ = (0, t.jsx)("button", {
              "aria-label": K,
              className: _,
              "data-testid": "explore-lens-customizer-close",
              onClick: ew,
              type: "button",
              children: Y,
            })),
            (ej[36] = ew),
            (ej[37] = K),
            (ej[38] = $))
          : ($ = ej[38]),
        ej[39] !== U || ej[40] !== $
          ? ((P = (0, t.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [T, U, $],
            })),
            (ej[39] = U),
            (ej[40] = $),
            (ej[41] = P))
          : (P = ej[41]),
        ej[42] === Symbol.for("react.memo_cache_sentinel")
          ? ((X = (0, h.c)(d.f, d.h[y])), (ej[42] = X))
          : (X = ej[42]),
        ej[43] !== eI)
      ) {
        let e;
        (ej[45] === Symbol.for("react.memo_cache_sentinel")
          ? ((e = (e) =>
              (0, t.jsx)(
                "span",
                {
                  "aria-checked": e === eR,
                  className: (0, h.c)(d.C, d._[y]),
                  role: "radio",
                  children: (0, t.jsx)(b.C, {
                    active: e === eR,
                    id: e,
                    labels: "always",
                  }),
                },
                e,
              )),
            (ej[45] = e))
          : (e = ej[45]),
          (A = eI.map(e)),
          (ej[43] = eI),
          (ej[44] = A));
      } else A = ej[44];
      if (
        (ej[46] === Symbol.for("react.memo_cache_sentinel")
          ? ((L = (0, h.c)(d.C, d._[y], "h-full")), (ej[46] = L))
          : (L = ej[46]),
        ej[47] !== eN
          ? ((V = eN("common.more")), (ej[47] = eN), (ej[48] = V))
          : (V = ej[48]),
        ej[49] === Symbol.for("react.memo_cache_sentinel")
          ? ((q = (0, t.jsx)(a.vY, { className: "size-3" })), (ej[49] = q))
          : (q = ej[49]),
        ej[50] !== V
          ? ((B = (0, t.jsx)("span", {
              className: d.w,
              children: (0, t.jsxs)("span", { className: L, children: [V, q] }),
            })),
            (ej[50] = V),
            (ej[51] = B))
          : (B = ej[51]),
        ej[52] !== A || ej[53] !== B
          ? ((F = (0, t.jsx)("div", {
              "aria-hidden": !0,
              className:
                "flex h-14 items-center overflow-x-auto rounded-md border border-border-tertiary bg-bg-primary p-2",
              "data-testid": "explore-lens-customizer-preview",
              children: (0, t.jsxs)("div", { className: X, children: [A, B] }),
            })),
            (ej[52] = A),
            (ej[53] = B),
            (ej[54] = F))
          : (F = ej[54]),
        ej[55] !== eN
          ? ((H = eN("web.home.lens_customize_in_box")),
            (ej[55] = eN),
            (ej[56] = H))
          : (H = ej[56]),
        ej[57] !== H
          ? ((J = (0, t.jsx)("p", { className: w, children: H })),
            (ej[57] = H),
            (ej[58] = J))
          : (J = ej[58]),
        ej[59] !== eN
          ? ((Q = eN("web.coin.header_drag_instructions")),
            (ej[59] = eN),
            (ej[60] = Q))
          : (Q = ej[60]),
        ej[61] !== Q
          ? ((W = { draggable: Q }), (ej[61] = Q), (ej[62] = W))
          : (W = ej[62]),
        ej[63] !== eK || ej[64] !== W
          ? ((Z = { announcements: eK, screenReaderInstructions: W }),
            (ej[63] = eK),
            (ej[64] = W),
            (ej[65] = Z))
          : (Z = ej[65]),
        ej[66] !== ez
          ? ((G = [...ez]), (ej[66] = ez), (ej[67] = G))
          : (G = ej[67]),
        ej[68] !== ez || ej[69] !== eS || ej[70] !== ek)
      ) {
        let e;
        (ej[72] !== ez.length || ej[73] !== eS || ej[74] !== ek
          ? ((e = (e, r) =>
              (0, t.jsx)(
                I,
                {
                  canMoveDown: r < ez.length - 1,
                  canMoveUp: r > 1,
                  id: e,
                  onHide: () => eS(e),
                  onMove: (t) => ek(e, t),
                },
                e,
              )),
            (ej[72] = ez.length),
            (ej[73] = eS),
            (ej[74] = ek),
            (ej[75] = e))
          : (e = ej[75]),
          (ee = ez.map(e)),
          (ej[68] = ez),
          (ej[69] = eS),
          (ej[70] = ek),
          (ej[71] = ee));
      } else ee = ej[71];
      (ej[76] !== ee
        ? ((et = (0, t.jsx)("ul", {
            className: "flex flex-col gap-1",
            "data-testid": "explore-lens-customizer-box",
            children: ee,
          })),
          (ej[76] = ee),
          (ej[77] = et))
        : (et = ej[77]),
        ej[78] !== G || ej[79] !== et
          ? ((er = (0, t.jsx)(i.V, { items: G, strategy: i.W, children: et })),
            (ej[78] = G),
            (ej[79] = et),
            (ej[80] = er))
          : (er = ej[80]),
        ej[81] !== eE || ej[82] !== eT || ej[83] !== Z || ej[84] !== er
          ? ((el = (0, t.jsx)(l.H, {
              accessibility: Z,
              collisionDetection: l.P,
              onDragEnd: eE,
              sensors: eT,
              children: er,
            })),
            (ej[81] = eE),
            (ej[82] = eT),
            (ej[83] = Z),
            (ej[84] = er),
            (ej[85] = el))
          : (el = ej[85]),
        ej[86] !== J || ej[87] !== el
          ? ((ei = (0, t.jsxs)("section", {
              className: "flex flex-col gap-2",
              children: [J, el],
            })),
            (ej[86] = J),
            (ej[87] = el),
            (ej[88] = ei))
          : (ei = ej[88]),
        ej[89] !== eN
          ? ((en = eN("web.home.lens_customize_in_more")),
            (ej[89] = eN),
            (ej[90] = en))
          : (en = ej[90]),
        ej[91] !== en
          ? ((ea = (0, t.jsx)("p", { className: w, children: en })),
            (ej[91] = en),
            (ej[92] = ea))
          : (ea = ej[92]),
        ej[93] !== eM
          ? ((es = (e) => (0, t.jsx)(k, { id: e, onShow: () => eM(e) }, e)),
            (ej[93] = eM),
            (ej[94] = es))
          : (es = ej[94]));
      let eX = eD.map(es);
      return (
        ej[95] !== eX
          ? ((eo = (0, t.jsx)("ul", {
              className: "flex flex-col gap-1",
              "data-testid": "explore-lens-customizer-more",
              children: eX,
            })),
            (ej[95] = eX),
            (ej[96] = eo))
          : (eo = ej[96]),
        ej[97] !== ea || ej[98] !== eo
          ? ((ec = (0, t.jsxs)("section", {
              className: "flex flex-col gap-2",
              children: [ea, eo],
            })),
            (ej[97] = ea),
            (ej[98] = eo),
            (ej[99] = ec))
          : (ec = ej[99]),
        ej[100] !== ei || ej[101] !== ec
          ? ((ed = (0, t.jsxs)("div", {
              className: "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto",
              children: [ei, ec],
            })),
            (ej[100] = ei),
            (ej[101] = ec),
            (ej[102] = ed))
          : (ed = ej[102]),
        ej[103] !== eN
          ? ((eu = eN("web.home.lens_customize_hint")),
            (ej[103] = eN),
            (ej[104] = eu))
          : (eu = ej[104]),
        ej[105] !== eu
          ? ((em = (0, t.jsx)("p", {
              className: "text-xs text-text-tertiary",
              children: eu,
            })),
            (ej[105] = eu),
            (ej[106] = em))
          : (em = ej[106]),
        ej[107] !== eN
          ? ((ex = eN("web.common.reset")), (ej[107] = eN), (ej[108] = ex))
          : (ex = ej[108]),
        ej[109] !== eY || ej[110] !== ex
          ? ((ef = (0, t.jsx)(s.K, {
              "data-testid": "explore-lens-customizer-reset",
              onClick: eY,
              size: 36,
              variant: "ghost",
              children: ex,
            })),
            (ej[109] = eY),
            (ej[110] = ex),
            (ej[111] = ef))
          : (ef = ej[111]),
        ej[112] !== eN
          ? ((eh = eN("common.done")), (ej[112] = eN), (ej[113] = eh))
          : (eh = ej[113]),
        ej[114] !== ew || ej[115] !== eh
          ? ((ep = (0, t.jsx)(s.K, {
              "data-testid": "explore-lens-customizer-done",
              isRounded: !0,
              onClick: ew,
              size: 36,
              variant: "primary",
              children: eh,
            })),
            (ej[114] = ew),
            (ej[115] = eh),
            (ej[116] = ep))
          : (ep = ej[116]),
        ej[117] !== ef || ej[118] !== ep
          ? ((eb = (0, t.jsxs)("div", {
              className: "ml-auto flex items-center gap-2",
              children: [ef, ep],
            })),
            (ej[117] = ef),
            (ej[118] = ep),
            (ej[119] = eb))
          : (eb = ej[119]),
        ej[120] !== em || ej[121] !== eb
          ? ((eg = (0, t.jsxs)("div", {
              className: "flex flex-wrap items-center justify-between gap-3",
              children: [em, eb],
            })),
            (ej[120] = em),
            (ej[121] = eb),
            (ej[122] = eg))
          : (eg = ej[122]),
        ej[123] !== P || ej[124] !== F || ej[125] !== ed || ej[126] !== eg
          ? ((ey = (0, t.jsxs)("div", {
              className:
                "flex max-h-[calc(100dvh-3rem)] flex-col gap-4 p-5 sm:max-h-[calc(100dvh-6rem)]",
              "data-testid": "explore-lens-customizer",
              children: [P, F, ed, eg],
            })),
            (ej[123] = P),
            (ej[124] = F),
            (ej[125] = ed),
            (ej[126] = eg),
            (ej[127] = ey))
          : (ey = ej[127]),
        ej[128] !== eP || ej[129] !== v || ej[130] !== ey
          ? ((ev = (0, t.jsx)(eP, {
              "aria-labelledby": v,
              className: "w-full max-w-[560px] p-0",
              children: ey,
            })),
            (ej[128] = eP),
            (ej[129] = v),
            (ej[130] = ey),
            (ej[131] = ev))
          : (ev = ej[131]),
        ej[132] !== e$ || ej[133] !== D || ej[134] !== ev
          ? ((e_ = (0, t.jsx)(e$, {
              isOpen: !0,
              onIsOpenChange: D,
              children: ev,
            })),
            (ej[132] = e$),
            (ej[133] = D),
            (ej[134] = ev),
            (ej[135] = e_))
          : (e_ = ej[135]),
        e_
      );
    },
  ]);
};
