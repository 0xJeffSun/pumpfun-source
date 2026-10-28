// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    l = e.i(445242),
    i = e.i(458310);
  e.i(12692);
  var r = e.i(398902),
    a = e.i(337689),
    s = e.i(951425),
    n = e.i(691471),
    o = e.i(392968),
    d = e.i(908163),
    m = e.i(243719),
    c = e.i(499141),
    u = e.i(338319);
  e.s([
    "f",
    0,
    function (e) {
      let f,
        x,
        h,
        p,
        v,
        b,
        g,
        w,
        y,
        j,
        N,
        k,
        S,
        _,
        C,
        F,
        A,
        D,
        P,
        I,
        U,
        $,
        z,
        M,
        E,
        T = (0, l.c)(88),
        {
          market: q,
          density: H,
          index: L,
          onNavigate: B,
          leading: O,
          trailing: R,
          isListItem: V,
          markStale: Q,
          wash: K,
          className: J,
        } = e,
        X = void 0 !== Q && Q,
        G = void 0 === K || K,
        { t: W, i18n: Y } = (0, r.f)(),
        Z = Y.language,
        ee = q.change24hPct;
      T[0] !== ee || T[1] !== X || T[2] !== q.markPx
        ? ((f =
            !X &&
            Number(q.markPx) > 0 &&
            null !== ee &&
            Number.isFinite(ee) &&
            0 !== ee),
          (T[0] = ee),
          (T[1] = X),
          (T[2] = q.markPx),
          (T[3] = f))
        : (f = T[3]);
      let et = f;
      T[4] !== ee || T[5] !== X || T[6] !== q.markPx || T[7] !== G
        ? ((x =
            G &&
            !X &&
            Number(q.markPx) > 0 &&
            null !== ee &&
            Number.isFinite(ee)),
          (T[4] = ee),
          (T[5] = X),
          (T[6] = q.markPx),
          (T[7] = G),
          (T[8] = x))
        : (x = T[8]);
      let el = x,
        ei = q.followedHolders;
      T[9] !== H || T[10] !== ei || T[11] !== q.coin
        ? ((h =
            ei && ei.holders.length > 0
              ? (0, t.jsx)(a.E, {
                  mint: q.coin,
                  followedHolders: ei,
                  avatarSize: "terminal" === H ? "sm" : "rail",
                  interactive: !1,
                  className: "relative z-[2] ml-1",
                })
              : null),
          (T[9] = H),
          (T[10] = ei),
          (T[11] = q.coin),
          (T[12] = h))
        : (h = T[12]);
      let er = h,
        ea =
          q.ticker !== q.displayName
            ? `${q.ticker} — ${q.displayName}`
            : q.displayName,
        es = void 0 === V || V ? "listitem" : void 0,
        en = q.coin,
        eo = X ? "" : void 0,
        ed = s.w[H];
      (T[13] !== J || T[14] !== ed
        ? ((p = (0, u.c)(ed, J)), (T[13] = J), (T[14] = ed), (T[15] = p))
        : (p = T[15]),
        T[16] !== ee || T[17] !== el
          ? ((v = el
              ? (0, t.jsx)("span", {
                  "aria-hidden": !0,
                  "data-testid": "perp-market-row-wash",
                  "data-tone": ee < 0 ? "loss" : "gain",
                  className: (0, u.c)(
                    "pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent from-35%",
                    ee < 0 ? "to-loss/[0.12]" : "to-gain/[0.12]",
                  ),
                })
              : null),
            (T[16] = ee),
            (T[17] = el),
            (T[18] = v))
          : (v = T[18]),
        T[19] !== q.coin
          ? ((b = (0, c.o)(q.coin)), (T[19] = q.coin), (T[20] = b))
          : (b = T[20]),
        T[21] !== ea || T[22] !== B || T[23] !== b
          ? ((g = (0, t.jsx)(i.default, {
              href: b,
              prefetch: !1,
              "aria-label": ea,
              onClick: B,
              className: "absolute inset-0 z-[1] focus-inset",
            })),
            (T[21] = ea),
            (T[22] = B),
            (T[23] = b),
            (T[24] = g))
          : (g = T[24]),
        T[25] !== O
          ? ((w = O
              ? (0, t.jsx)("span", {
                  className: "relative z-[2] flex shrink-0 items-center",
                  children: O,
                })
              : null),
            (T[25] = O),
            (T[26] = w))
          : (w = T[26]));
      let em = s.s[H];
      T[27] !== q || T[28] !== em
        ? ((y = (0, t.jsx)(n.f, {
            market: q,
            size: em,
            testIdPrefix: "perp-market-row",
          })),
          (T[27] = q),
          (T[28] = em),
          (T[29] = y))
        : (y = T[29]);
      let ec = s.x[H],
        eu = s.n[H];
      (T[30] !== eu
        ? ((j = (0, u.c)(eu, "truncate font-medium text-text-primary")),
          (T[30] = eu),
          (T[31] = j))
        : (j = T[31]),
        T[32] !== q.ticker || T[33] !== j
          ? ((N = (0, t.jsx)("span", { className: j, children: q.ticker })),
            (T[32] = q.ticker),
            (T[33] = j),
            (T[34] = N))
          : (N = T[34]),
        T[35] !== q.maxLeverage || T[36] !== W
          ? ((k = W("web.screeners.perps_max_leverage", {
              value: q.maxLeverage,
            })),
            (T[35] = q.maxLeverage),
            (T[36] = W),
            (T[37] = k))
          : (k = T[37]),
        T[38] !== H || T[39] !== k
          ? ((S = (0, t.jsx)(d.E, { density: H, children: k })),
            (T[38] = H),
            (T[39] = k),
            (T[40] = S))
          : (S = T[40]),
        T[41] !== ec || T[42] !== N || T[43] !== S
          ? ((_ = (0, t.jsxs)("div", { className: ec, children: [N, S] })),
            (T[41] = ec),
            (T[42] = N),
            (T[43] = S),
            (T[44] = _))
          : (_ = T[44]));
      let ef = s.B[H];
      (T[45] !== ef
        ? ((C = (0, u.c)(ef, "truncate")), (T[45] = ef), (T[46] = C))
        : (C = T[46]),
        T[47] !== q.displayName || T[48] !== C
          ? ((F = (0, t.jsx)("span", {
              className: C,
              children: q.displayName,
            })),
            (T[47] = q.displayName),
            (T[48] = C),
            (T[49] = F))
          : (F = T[49]),
        T[50] !== er || T[51] !== F
          ? ((A = (0, t.jsxs)("span", {
              className: "flex min-w-0 items-center",
              children: [F, er],
            })),
            (T[50] = er),
            (T[51] = F),
            (T[52] = A))
          : (A = T[52]),
        T[53] !== _ || T[54] !== A
          ? ((D = (0, t.jsxs)("div", {
              className: "flex min-w-0 flex-1 flex-col",
              children: [_, A],
            })),
            (T[53] = _),
            (T[54] = A),
            (T[55] = D))
          : (D = T[55]));
      let ex = s.e[H];
      return (
        T[56] !== Z || T[57] !== X || T[58] !== q.markPx
          ? ((P = X ? "—" : (0, m.Q)({ px: q.markPx, locale: Z })),
            (T[56] = Z),
            (T[57] = X),
            (T[58] = q.markPx),
            (T[59] = P))
          : (P = T[59]),
        T[60] !== ex || T[61] !== P
          ? ((I = (0, t.jsx)("span", {
              className: ex,
              "data-testid": "perp-market-row-price",
              children: P,
            })),
            (T[60] = ex),
            (T[61] = P),
            (T[62] = I))
          : (I = T[62]),
        T[63] !== ee || T[64] !== H || T[65] !== et
          ? ((U = et
              ? (0, t.jsx)(o.f, {
                  changePercent: ee,
                  density: H,
                  variant: "text",
                  "data-testid": "perp-market-row-change",
                })
              : null),
            (T[63] = ee),
            (T[64] = H),
            (T[65] = et),
            (T[66] = U))
          : (U = T[66]),
        T[67] !== U
          ? (($ = (0, t.jsx)("span", { className: s.N, children: U })),
            (T[67] = U),
            (T[68] = $))
          : ($ = T[68]),
        T[69] !== I || T[70] !== $
          ? ((z = (0, t.jsxs)("div", {
              className: "flex shrink-0 flex-col items-end",
              children: [I, $],
            })),
            (T[69] = I),
            (T[70] = $),
            (T[71] = z))
          : (z = T[71]),
        T[72] !== R
          ? ((M = R
              ? (0, t.jsx)("span", {
                  className: "relative z-[2] flex shrink-0 items-center",
                  children: R,
                })
              : null),
            (T[72] = R),
            (T[73] = M))
          : (M = T[73]),
        T[74] !== H ||
        T[75] !== L ||
        T[76] !== q.coin ||
        T[77] !== p ||
        T[78] !== v ||
        T[79] !== g ||
        T[80] !== w ||
        T[81] !== y ||
        T[82] !== D ||
        T[83] !== z ||
        T[84] !== M ||
        T[85] !== es ||
        T[86] !== eo
          ? ((E = (0, t.jsxs)("div", {
              role: es,
              "data-testid": "perp-market-row",
              "data-density": H,
              "data-coin": en,
              "data-index": L,
              "data-mark-stale": eo,
              className: p,
              children: [v, g, w, y, D, z, M],
            })),
            (T[74] = H),
            (T[75] = L),
            (T[76] = q.coin),
            (T[77] = p),
            (T[78] = v),
            (T[79] = g),
            (T[80] = w),
            (T[81] = y),
            (T[82] = D),
            (T[83] = z),
            (T[84] = M),
            (T[85] = es),
            (T[86] = eo),
            (T[87] = E))
          : (E = T[87]),
        E
      );
    },
  ]);
};
