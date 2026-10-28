// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    r = e.i(745018),
    n = e.i(352386);
  e.i(12692);
  var i = e.i(398902),
    a = e.i(256272),
    s = e.i(51206),
    o = e.i(607122),
    c = e.i(778593),
    d = e.i(460261),
    u = e.i(84976),
    m = e.i(280838),
    f = e.i(505563),
    x = e.i(693885),
    h = e.i(158928),
    p = e.i(72768),
    g = e.i(862507),
    b = e.i(833119),
    v = e.i(18075),
    y = e.i(592054);
  let _ = () => {},
    j = {
      isUsdcQuote: !1,
      isUsdDenomUnavailable: !1,
      hasTokenBalance: !1,
      isTradeLoading: !1,
      immediateTradeInFlight: !1,
      spamQuickTrade: !1,
      activeQuickTrade: null,
      executeQuickBuyPreset: _,
      executeQuickSellPreset: _,
      isQuickBuyPresetInsufficient: () => !1,
      isQuickTradeUnavailable: !0,
    };
  function w(e) {
    return (0, t.jsx)("p", { children: e }, e);
  }
  function N(e) {
    return !e;
  }
  e.s([
    "f",
    0,
    function (e) {
      let k,
        S,
        C,
        M,
        I,
        P,
        E,
        A,
        $,
        T,
        R,
        U,
        D,
        F,
        L,
        B,
        O,
        q,
        z,
        K,
        V,
        Q,
        H,
        W,
        Y,
        X,
        G,
        J,
        Z,
        ee,
        et,
        el,
        er,
        en,
        ei,
        ea,
        es = (0, l.c)(100),
        {
          coin: eo,
          reason: ec,
          explanation: ed,
          primaryAction: eu,
          secondaryAction: em,
          onClose: ef,
          chain: ex,
        } = e,
        eh = void 0 === ex ? "solana" : ex,
        { t: ep } = (0, i.f)(),
        [eg, eb] = (0, n.useState)("buy"),
        ev = (0, x.f)(),
        [ey, e_] = (0, n.useState)(""),
        [ej, ew] = (0, n.useState)(!1),
        eN = (0, n.useId)();
      es[0] === Symbol.for("react.memo_cache_sentinel")
        ? ((k = { state: j }), (es[0] = k))
        : (k = es[0]);
      let ek = (0, h.f)(k),
        { presets: eS, activeIndex: eC, setActiveIndex: eM } = (0, c.f)();
      es[1] !== eg
        ? ((S = (e) => {
            e !== eg && (eb(e), e_(""));
          }),
          (es[1] = eg),
          (es[2] = S))
        : (S = es[2]);
      let eI = S;
      (es[3] !== ep
        ? ((C = ep("web.trade.side_aria")), (es[3] = ep), (es[4] = C))
        : (C = es[4]),
        es[5] !== ep
          ? ((M = ep("web.trade.buy")), (es[5] = ep), (es[6] = M))
          : (M = es[6]),
        es[7] !== M
          ? ((I = { value: "buy", label: M, tone: "mint" }),
            (es[7] = M),
            (es[8] = I))
          : (I = es[8]),
        es[9] !== ep
          ? ((P = ep("web.trade.sell")), (es[9] = ep), (es[10] = P))
          : (P = es[10]),
        es[11] !== P
          ? ((E = { value: "sell", label: P, tone: "loss" }),
            (es[11] = P),
            (es[12] = E))
          : (E = es[12]),
        es[13] !== I || es[14] !== E
          ? ((A = [I, E]), (es[13] = I), (es[14] = E), (es[15] = A))
          : (A = es[15]),
        es[16] !== eI || es[17] !== eg || es[18] !== C || es[19] !== A
          ? (($ = (0, t.jsx)(o.X, {
              density: "terminal",
              size: 32,
              fullWidth: !0,
              "aria-label": C,
              value: eg,
              onValueChange: eI,
              options: A,
              className: "min-w-0 flex-1 shrink",
            })),
            (es[16] = eI),
            (es[17] = eg),
            (es[18] = C),
            (es[19] = A),
            (es[20] = $))
          : ($ = es[20]));
      let eP = ek.settingsPresets,
        eE = ev.sheet.open,
        eA = ev.onOpenChange,
        e$ = ev.sheet.focusSettingId;
      (es[21] !== ep
        ? ((T = ep("web.trade.trade_settings")), (es[21] = ep), (es[22] = T))
        : (T = es[22]),
        es[23] === Symbol.for("react.memo_cache_sentinel")
          ? ((R = (0, t.jsx)(r.xF, {})), (es[23] = R))
          : (R = es[23]),
        es[24] !== T
          ? ((U = (0, t.jsx)(s._, {
              density: "terminal",
              "aria-label": T,
              children: R,
            })),
            (es[24] = T),
            (es[25] = U))
          : (U = es[25]),
        es[26] !== eh ||
        es[27] !== ek.settingsPresets ||
        es[28] !== U ||
        es[29] !== ev.onOpenChange ||
        es[30] !== ev.sheet.focusSettingId ||
        es[31] !== ev.sheet.open
          ? ((D = (0, t.jsx)(g.m, {
              quickPresets: eP,
              chain: eh,
              open: eE,
              onOpenChange: eA,
              focusSettingId: e$,
              trigger: U,
            })),
            (es[26] = eh),
            (es[27] = ek.settingsPresets),
            (es[28] = U),
            (es[29] = ev.onOpenChange),
            (es[30] = ev.sheet.focusSettingId),
            (es[31] = ev.sheet.open),
            (es[32] = D))
          : (D = es[32]),
        es[33] !== ef || es[34] !== ep
          ? ((F =
              ef &&
              (0, t.jsx)(s._, {
                density: "terminal",
                onClick: ef,
                "aria-label": ep("web.trade.close_trade_box"),
                children: (0, t.jsx)(r.x6, {}),
              })),
            (es[33] = ef),
            (es[34] = ep),
            (es[35] = F))
          : (F = es[35]),
        es[36] !== $ || es[37] !== D || es[38] !== F
          ? ((L = (0, t.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [$, D, F],
            })),
            (es[36] = $),
            (es[37] = D),
            (es[38] = F),
            (es[39] = L))
          : (L = es[39]),
        es[40] === Symbol.for("react.memo_cache_sentinel")
          ? ((B = { symbol: "SOL", decimals: u.f, isUsdPegged: !1 }),
            (es[40] = B))
          : (B = es[40]),
        es[41] !== eo.symbol
          ? ((O = (0, y.I)(eo.symbol)), (es[41] = eo.symbol), (es[42] = O))
          : (O = es[42]));
      let eT = eo.base_decimals ?? d._;
      (es[43] !== O || es[44] !== eT
        ? ((q = { symbol: O, decimals: eT }),
          (es[43] = O),
          (es[44] = eT),
          (es[45] = q))
        : (q = es[45]),
        es[46] !== ey
          ? ((z = (0, m.p)(ey) ?? 0), (es[46] = ey), (es[47] = z))
          : (z = es[47]),
        es[48] !== z
          ? ((K = { usd: z, funding: 0, token: 0 }), (es[48] = z), (es[49] = K))
          : (K = es[49]),
        es[50] !== ey || es[51] !== q || es[52] !== K
          ? ((V = {
              value: ey,
              setValue: e_,
              mode: "usd",
              cycleMode: _,
              canCycleMode: !1,
              funding: B,
              token: q,
              conversions: K,
              disabled: !1,
            }),
            (es[50] = ey),
            (es[51] = q),
            (es[52] = K),
            (es[53] = V))
          : (V = es[53]),
        es[54] !== eC || es[55] !== eS || es[56] !== eM
          ? ((Q =
              eS.length > 1
                ? (0, t.jsx)(v.f, {
                    presets: eS,
                    activeIndex: eC,
                    onSelect: eM,
                  })
                : void 0),
            (es[54] = eC),
            (es[55] = eS),
            (es[56] = eM),
            (es[57] = Q))
          : (Q = es[57]),
        es[58] === Symbol.for("react.memo_cache_sentinel")
          ? ((H = { disabled: !0, onSelect: _ }), (es[58] = H))
          : (H = es[58]),
        es[59] !== Q
          ? ((W = (0, t.jsx)(f.Q, { selector: Q, shares: H })),
            (es[59] = Q),
            (es[60] = W))
          : (W = es[60]),
        es[61] !== V || es[62] !== W
          ? ((Y = (0, t.jsx)(m.k, { model: V, footer: W })),
            (es[61] = V),
            (es[62] = W),
            (es[63] = Y))
          : (Y = es[63]),
        es[64] === Symbol.for("react.memo_cache_sentinel")
          ? ((X = () => ew(N)), (es[64] = X))
          : (X = es[64]),
        es[65] === Symbol.for("react.memo_cache_sentinel")
          ? ((G = (0, t.jsx)(r.wB, {
              className: "size-3.5 shrink-0",
              "aria-hidden": !0,
            })),
            (es[65] = G))
          : (G = es[65]),
        es[66] !== ec
          ? ((J = (0, t.jsx)("span", { className: "min-w-0", children: ec })),
            (es[66] = ec),
            (es[67] = J))
          : (J = es[67]),
        es[68] !== eN || es[69] !== ej || es[70] !== J
          ? ((Z = (0, t.jsx)("div", {
              className:
                "flex items-center gap-2 px-1 text-xs leading-4 text-text-tertiary",
              children: (0, t.jsxs)("button", {
                type: "button",
                "aria-expanded": ej,
                "aria-controls": eN,
                onClick: X,
                className:
                  "flex min-w-0 flex-1 items-center gap-1.5 text-left transition-colors hover:text-text-primary",
                children: [G, J],
              }),
            })),
            (es[68] = eN),
            (es[69] = ej),
            (es[70] = J),
            (es[71] = Z))
          : (Z = es[71]),
        es[72] !== ed || es[73] !== eN || es[74] !== ej
          ? ((ee = ej
              ? (0, t.jsx)("div", {
                  id: eN,
                  role: "note",
                  "data-testid": "gated-trade-explanation",
                  className:
                    "space-y-1.5 rounded-md bg-bg-tertiary px-2.5 py-2 text-[11px] leading-4 text-text-secondary",
                  children: ed.map(w),
                })
              : null),
            (es[72] = ed),
            (es[73] = eN),
            (es[74] = ej),
            (es[75] = ee))
          : (ee = es[75]),
        es[76] !== eu
          ? ((et = () => void eu.onClick()), (es[76] = eu), (es[77] = et))
          : (et = es[77]),
        es[78] !== eu.label ||
        es[79] !== eu.testId ||
        es[80] !== eg ||
        es[81] !== et
          ? ((el = (0, t.jsx)(b.u, {
              side: eg,
              onClick: et,
              "data-testid": eu.testId,
              children: eu.label,
            })),
            (es[78] = eu.label),
            (es[79] = eu.testId),
            (es[80] = eg),
            (es[81] = et),
            (es[82] = el))
          : (el = es[82]),
        es[83] !== em
          ? ((er = em
              ? (0, t.jsx)(b.u, {
                  variant: "secondary",
                  onClick: () => void em.onClick(),
                  "data-testid": em.testId,
                  children: em.label,
                })
              : null),
            (es[83] = em),
            (es[84] = er))
          : (er = es[84]));
      let eR = `${eo.mint}:${eg}`;
      return (
        es[85] !== ev
          ? ((en = (e) => {
              e.settingId && ev.openSetting(e.settingId);
            }),
            (es[85] = ev),
            (es[86] = en))
          : (en = es[86]),
        es[87] !== ek || es[88] !== eg || es[89] !== eR || es[90] !== en
          ? ((ei = (0, t.jsx)(p.f, {
              quick: ek,
              resetKey: eR,
              side: eg,
              onEditPresets: en,
            })),
            (es[87] = ek),
            (es[88] = eg),
            (es[89] = eR),
            (es[90] = en),
            (es[91] = ei))
          : (ei = es[91]),
        es[92] !== L ||
        es[93] !== Y ||
        es[94] !== Z ||
        es[95] !== ee ||
        es[96] !== el ||
        es[97] !== er ||
        es[98] !== ei
          ? ((ea = (0, t.jsxs)(a.g, {
              className: "relative min-w-0 gap-3 overflow-hidden p-3",
              "data-testid": "gated-trade-box",
              children: [L, Y, Z, ee, el, er, ei],
            })),
            (es[92] = L),
            (es[93] = Y),
            (es[94] = Z),
            (es[95] = ee),
            (es[96] = el),
            (es[97] = er),
            (es[98] = ei),
            (es[99] = ea))
          : (ea = es[99]),
        ea
      );
    },
  ]);
};
