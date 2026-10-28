// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(458310);
  e.i(12692);
  var a = e.i(398902),
    i = e.i(337689),
    s = e.i(951425),
    n = e.i(691471),
    o = e.i(392968),
    u = e.i(908163),
    c = e.i(243719),
    d = e.i(499141),
    m = e.i(338319);
  e.s([
    "f",
    0,
    function (e) {
      let f,
        p,
        h,
        g,
        x,
        b,
        w,
        y,
        v,
        E,
        k,
        C,
        S,
        I,
        N,
        T,
        A,
        j,
        P,
        _,
        U,
        M,
        D,
        R,
        q,
        L = (0, r.c)(88),
        {
          market: F,
          density: G,
          index: B,
          onNavigate: O,
          leading: z,
          trailing: $,
          isListItem: V,
          markStale: Q,
          wash: H,
          className: K,
        } = e,
        W = void 0 !== Q && Q,
        J = void 0 === H || H,
        { t: Y, i18n: Z } = (0, a.f)(),
        X = Z.language,
        ee = F.change24hPct;
      L[0] !== ee || L[1] !== W || L[2] !== F.markPx
        ? ((f =
            !W &&
            Number(F.markPx) > 0 &&
            null !== ee &&
            Number.isFinite(ee) &&
            0 !== ee),
          (L[0] = ee),
          (L[1] = W),
          (L[2] = F.markPx),
          (L[3] = f))
        : (f = L[3]);
      let et = f;
      L[4] !== ee || L[5] !== W || L[6] !== F.markPx || L[7] !== J
        ? ((p =
            J &&
            !W &&
            Number(F.markPx) > 0 &&
            null !== ee &&
            Number.isFinite(ee)),
          (L[4] = ee),
          (L[5] = W),
          (L[6] = F.markPx),
          (L[7] = J),
          (L[8] = p))
        : (p = L[8]);
      let er = p,
        el = F.followedHolders;
      L[9] !== G || L[10] !== el || L[11] !== F.coin
        ? ((h =
            el && el.holders.length > 0
              ? (0, t.jsx)(i.E, {
                  mint: F.coin,
                  followedHolders: el,
                  avatarSize: "terminal" === G ? "sm" : "rail",
                  interactive: !1,
                  className: "relative z-[2] ml-1",
                })
              : null),
          (L[9] = G),
          (L[10] = el),
          (L[11] = F.coin),
          (L[12] = h))
        : (h = L[12]);
      let ea = h,
        ei =
          F.ticker !== F.displayName
            ? `${F.ticker} — ${F.displayName}`
            : F.displayName,
        es = void 0 === V || V ? "listitem" : void 0,
        en = F.coin,
        eo = W ? "" : void 0,
        eu = s.w[G];
      (L[13] !== K || L[14] !== eu
        ? ((g = (0, m.c)(eu, K)), (L[13] = K), (L[14] = eu), (L[15] = g))
        : (g = L[15]),
        L[16] !== ee || L[17] !== er
          ? ((x = er
              ? (0, t.jsx)("span", {
                  "aria-hidden": !0,
                  "data-testid": "perp-market-row-wash",
                  "data-tone": ee < 0 ? "loss" : "gain",
                  className: (0, m.c)(
                    "pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent from-35%",
                    ee < 0 ? "to-loss/[0.12]" : "to-gain/[0.12]",
                  ),
                })
              : null),
            (L[16] = ee),
            (L[17] = er),
            (L[18] = x))
          : (x = L[18]),
        L[19] !== F.coin
          ? ((b = (0, d.o)(F.coin)), (L[19] = F.coin), (L[20] = b))
          : (b = L[20]),
        L[21] !== ei || L[22] !== O || L[23] !== b
          ? ((w = (0, t.jsx)(l.default, {
              href: b,
              prefetch: !1,
              "aria-label": ei,
              onClick: O,
              className: "absolute inset-0 z-[1] focus-inset",
            })),
            (L[21] = ei),
            (L[22] = O),
            (L[23] = b),
            (L[24] = w))
          : (w = L[24]),
        L[25] !== z
          ? ((y = z
              ? (0, t.jsx)("span", {
                  className: "relative z-[2] flex shrink-0 items-center",
                  children: z,
                })
              : null),
            (L[25] = z),
            (L[26] = y))
          : (y = L[26]));
      let ec = s.s[G];
      L[27] !== F || L[28] !== ec
        ? ((v = (0, t.jsx)(n.f, {
            market: F,
            size: ec,
            testIdPrefix: "perp-market-row",
          })),
          (L[27] = F),
          (L[28] = ec),
          (L[29] = v))
        : (v = L[29]);
      let ed = s.x[G],
        em = s.n[G];
      (L[30] !== em
        ? ((E = (0, m.c)(em, "truncate font-medium text-text-primary")),
          (L[30] = em),
          (L[31] = E))
        : (E = L[31]),
        L[32] !== F.ticker || L[33] !== E
          ? ((k = (0, t.jsx)("span", { className: E, children: F.ticker })),
            (L[32] = F.ticker),
            (L[33] = E),
            (L[34] = k))
          : (k = L[34]),
        L[35] !== F.maxLeverage || L[36] !== Y
          ? ((C = Y("web.screeners.perps_max_leverage", {
              value: F.maxLeverage,
            })),
            (L[35] = F.maxLeverage),
            (L[36] = Y),
            (L[37] = C))
          : (C = L[37]),
        L[38] !== G || L[39] !== C
          ? ((S = (0, t.jsx)(u.E, { density: G, children: C })),
            (L[38] = G),
            (L[39] = C),
            (L[40] = S))
          : (S = L[40]),
        L[41] !== ed || L[42] !== k || L[43] !== S
          ? ((I = (0, t.jsxs)("div", { className: ed, children: [k, S] })),
            (L[41] = ed),
            (L[42] = k),
            (L[43] = S),
            (L[44] = I))
          : (I = L[44]));
      let ef = s.B[G];
      (L[45] !== ef
        ? ((N = (0, m.c)(ef, "truncate")), (L[45] = ef), (L[46] = N))
        : (N = L[46]),
        L[47] !== F.displayName || L[48] !== N
          ? ((T = (0, t.jsx)("span", {
              className: N,
              children: F.displayName,
            })),
            (L[47] = F.displayName),
            (L[48] = N),
            (L[49] = T))
          : (T = L[49]),
        L[50] !== ea || L[51] !== T
          ? ((A = (0, t.jsxs)("span", {
              className: "flex min-w-0 items-center",
              children: [T, ea],
            })),
            (L[50] = ea),
            (L[51] = T),
            (L[52] = A))
          : (A = L[52]),
        L[53] !== I || L[54] !== A
          ? ((j = (0, t.jsxs)("div", {
              className: "flex min-w-0 flex-1 flex-col",
              children: [I, A],
            })),
            (L[53] = I),
            (L[54] = A),
            (L[55] = j))
          : (j = L[55]));
      let ep = s.e[G];
      return (
        L[56] !== X || L[57] !== W || L[58] !== F.markPx
          ? ((P = W ? "—" : (0, c.Q)({ px: F.markPx, locale: X })),
            (L[56] = X),
            (L[57] = W),
            (L[58] = F.markPx),
            (L[59] = P))
          : (P = L[59]),
        L[60] !== ep || L[61] !== P
          ? ((_ = (0, t.jsx)("span", {
              className: ep,
              "data-testid": "perp-market-row-price",
              children: P,
            })),
            (L[60] = ep),
            (L[61] = P),
            (L[62] = _))
          : (_ = L[62]),
        L[63] !== ee || L[64] !== G || L[65] !== et
          ? ((U = et
              ? (0, t.jsx)(o.f, {
                  changePercent: ee,
                  density: G,
                  variant: "text",
                  "data-testid": "perp-market-row-change",
                })
              : null),
            (L[63] = ee),
            (L[64] = G),
            (L[65] = et),
            (L[66] = U))
          : (U = L[66]),
        L[67] !== U
          ? ((M = (0, t.jsx)("span", { className: s.N, children: U })),
            (L[67] = U),
            (L[68] = M))
          : (M = L[68]),
        L[69] !== _ || L[70] !== M
          ? ((D = (0, t.jsxs)("div", {
              className: "flex shrink-0 flex-col items-end",
              children: [_, M],
            })),
            (L[69] = _),
            (L[70] = M),
            (L[71] = D))
          : (D = L[71]),
        L[72] !== $
          ? ((R = $
              ? (0, t.jsx)("span", {
                  className: "relative z-[2] flex shrink-0 items-center",
                  children: $,
                })
              : null),
            (L[72] = $),
            (L[73] = R))
          : (R = L[73]),
        L[74] !== G ||
        L[75] !== B ||
        L[76] !== F.coin ||
        L[77] !== g ||
        L[78] !== x ||
        L[79] !== w ||
        L[80] !== y ||
        L[81] !== v ||
        L[82] !== j ||
        L[83] !== D ||
        L[84] !== R ||
        L[85] !== es ||
        L[86] !== eo
          ? ((q = (0, t.jsxs)("div", {
              role: es,
              "data-testid": "perp-market-row",
              "data-density": G,
              "data-coin": en,
              "data-index": B,
              "data-mark-stale": eo,
              className: g,
              children: [x, w, y, v, j, D, R],
            })),
            (L[74] = G),
            (L[75] = B),
            (L[76] = F.coin),
            (L[77] = g),
            (L[78] = x),
            (L[79] = w),
            (L[80] = y),
            (L[81] = v),
            (L[82] = j),
            (L[83] = D),
            (L[84] = R),
            (L[85] = es),
            (L[86] = eo),
            (L[87] = q))
          : (q = L[87]),
        q
      );
    },
  ]);
};
