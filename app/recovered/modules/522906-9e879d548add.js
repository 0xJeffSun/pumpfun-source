// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    a = e.i(445242),
    i = e.i(458310);
  e.i(12692);
  var l = e.i(398902),
    r = e.i(337689),
    n = e.i(951425),
    o = e.i(691471),
    s = e.i(392968),
    d = e.i(908163),
    c = e.i(243719),
    u = e.i(499141),
    m = e.i(338319);
  e.s([
    "f",
    0,
    function (e) {
      let p,
        h,
        f,
        g,
        y,
        v,
        b,
        I,
        w,
        C,
        k,
        x,
        T,
        _,
        E,
        N,
        S,
        M,
        P,
        U,
        A,
        j,
        V,
        L,
        $,
        O = (0, a.c)(88),
        {
          market: q,
          density: F,
          index: D,
          onNavigate: B,
          leading: R,
          trailing: z,
          isListItem: G,
          markStale: Q,
          wash: W,
          className: K,
        } = e,
        H = void 0 !== Q && Q,
        J = void 0 === W || W,
        { t: Y, i18n: Z } = (0, l.f)(),
        X = Z.language,
        ee = q.change24hPct;
      O[0] !== ee || O[1] !== H || O[2] !== q.markPx
        ? ((p =
            !H &&
            Number(q.markPx) > 0 &&
            null !== ee &&
            Number.isFinite(ee) &&
            0 !== ee),
          (O[0] = ee),
          (O[1] = H),
          (O[2] = q.markPx),
          (O[3] = p))
        : (p = O[3]);
      let et = p;
      O[4] !== ee || O[5] !== H || O[6] !== q.markPx || O[7] !== J
        ? ((h =
            J &&
            !H &&
            Number(q.markPx) > 0 &&
            null !== ee &&
            Number.isFinite(ee)),
          (O[4] = ee),
          (O[5] = H),
          (O[6] = q.markPx),
          (O[7] = J),
          (O[8] = h))
        : (h = O[8]);
      let ea = h,
        ei = q.followedHolders;
      O[9] !== F || O[10] !== ei || O[11] !== q.coin
        ? ((f =
            ei && ei.holders.length > 0
              ? (0, t.jsx)(r.E, {
                  mint: q.coin,
                  followedHolders: ei,
                  avatarSize: "terminal" === F ? "sm" : "rail",
                  interactive: !1,
                  className: "relative z-[2] ml-1",
                })
              : null),
          (O[9] = F),
          (O[10] = ei),
          (O[11] = q.coin),
          (O[12] = f))
        : (f = O[12]);
      let el = f,
        er =
          q.ticker !== q.displayName
            ? `${q.ticker} — ${q.displayName}`
            : q.displayName,
        en = void 0 === G || G ? "listitem" : void 0,
        eo = q.coin,
        es = H ? "" : void 0,
        ed = n.w[F];
      (O[13] !== K || O[14] !== ed
        ? ((g = (0, m.c)(ed, K)), (O[13] = K), (O[14] = ed), (O[15] = g))
        : (g = O[15]),
        O[16] !== ee || O[17] !== ea
          ? ((y = ea
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
            (O[16] = ee),
            (O[17] = ea),
            (O[18] = y))
          : (y = O[18]),
        O[19] !== q.coin
          ? ((v = (0, u.o)(q.coin)), (O[19] = q.coin), (O[20] = v))
          : (v = O[20]),
        O[21] !== er || O[22] !== B || O[23] !== v
          ? ((b = (0, t.jsx)(i.default, {
              href: v,
              prefetch: !1,
              "aria-label": er,
              onClick: B,
              className: "absolute inset-0 z-[1] focus-inset",
            })),
            (O[21] = er),
            (O[22] = B),
            (O[23] = v),
            (O[24] = b))
          : (b = O[24]),
        O[25] !== R
          ? ((I = R
              ? (0, t.jsx)("span", {
                  className: "relative z-[2] flex shrink-0 items-center",
                  children: R,
                })
              : null),
            (O[25] = R),
            (O[26] = I))
          : (I = O[26]));
      let ec = n.s[F];
      O[27] !== q || O[28] !== ec
        ? ((w = (0, t.jsx)(o.f, {
            market: q,
            size: ec,
            testIdPrefix: "perp-market-row",
          })),
          (O[27] = q),
          (O[28] = ec),
          (O[29] = w))
        : (w = O[29]);
      let eu = n.x[F],
        em = n.n[F];
      (O[30] !== em
        ? ((C = (0, m.c)(em, "truncate font-medium text-text-primary")),
          (O[30] = em),
          (O[31] = C))
        : (C = O[31]),
        O[32] !== q.ticker || O[33] !== C
          ? ((k = (0, t.jsx)("span", { className: C, children: q.ticker })),
            (O[32] = q.ticker),
            (O[33] = C),
            (O[34] = k))
          : (k = O[34]),
        O[35] !== q.maxLeverage || O[36] !== Y
          ? ((x = Y("web.screeners.perps_max_leverage", {
              value: q.maxLeverage,
            })),
            (O[35] = q.maxLeverage),
            (O[36] = Y),
            (O[37] = x))
          : (x = O[37]),
        O[38] !== F || O[39] !== x
          ? ((T = (0, t.jsx)(d.E, { density: F, children: x })),
            (O[38] = F),
            (O[39] = x),
            (O[40] = T))
          : (T = O[40]),
        O[41] !== eu || O[42] !== k || O[43] !== T
          ? ((_ = (0, t.jsxs)("div", { className: eu, children: [k, T] })),
            (O[41] = eu),
            (O[42] = k),
            (O[43] = T),
            (O[44] = _))
          : (_ = O[44]));
      let ep = n.B[F];
      (O[45] !== ep
        ? ((E = (0, m.c)(ep, "truncate")), (O[45] = ep), (O[46] = E))
        : (E = O[46]),
        O[47] !== q.displayName || O[48] !== E
          ? ((N = (0, t.jsx)("span", {
              className: E,
              children: q.displayName,
            })),
            (O[47] = q.displayName),
            (O[48] = E),
            (O[49] = N))
          : (N = O[49]),
        O[50] !== el || O[51] !== N
          ? ((S = (0, t.jsxs)("span", {
              className: "flex min-w-0 items-center",
              children: [N, el],
            })),
            (O[50] = el),
            (O[51] = N),
            (O[52] = S))
          : (S = O[52]),
        O[53] !== _ || O[54] !== S
          ? ((M = (0, t.jsxs)("div", {
              className: "flex min-w-0 flex-1 flex-col",
              children: [_, S],
            })),
            (O[53] = _),
            (O[54] = S),
            (O[55] = M))
          : (M = O[55]));
      let eh = n.e[F];
      return (
        O[56] !== X || O[57] !== H || O[58] !== q.markPx
          ? ((P = H ? "—" : (0, c.Q)({ px: q.markPx, locale: X })),
            (O[56] = X),
            (O[57] = H),
            (O[58] = q.markPx),
            (O[59] = P))
          : (P = O[59]),
        O[60] !== eh || O[61] !== P
          ? ((U = (0, t.jsx)("span", {
              className: eh,
              "data-testid": "perp-market-row-price",
              children: P,
            })),
            (O[60] = eh),
            (O[61] = P),
            (O[62] = U))
          : (U = O[62]),
        O[63] !== ee || O[64] !== F || O[65] !== et
          ? ((A = et
              ? (0, t.jsx)(s.f, {
                  changePercent: ee,
                  density: F,
                  variant: "text",
                  "data-testid": "perp-market-row-change",
                })
              : null),
            (O[63] = ee),
            (O[64] = F),
            (O[65] = et),
            (O[66] = A))
          : (A = O[66]),
        O[67] !== A
          ? ((j = (0, t.jsx)("span", { className: n.N, children: A })),
            (O[67] = A),
            (O[68] = j))
          : (j = O[68]),
        O[69] !== U || O[70] !== j
          ? ((V = (0, t.jsxs)("div", {
              className: "flex shrink-0 flex-col items-end",
              children: [U, j],
            })),
            (O[69] = U),
            (O[70] = j),
            (O[71] = V))
          : (V = O[71]),
        O[72] !== z
          ? ((L = z
              ? (0, t.jsx)("span", {
                  className: "relative z-[2] flex shrink-0 items-center",
                  children: z,
                })
              : null),
            (O[72] = z),
            (O[73] = L))
          : (L = O[73]),
        O[74] !== F ||
        O[75] !== D ||
        O[76] !== q.coin ||
        O[77] !== g ||
        O[78] !== y ||
        O[79] !== b ||
        O[80] !== I ||
        O[81] !== w ||
        O[82] !== M ||
        O[83] !== V ||
        O[84] !== L ||
        O[85] !== en ||
        O[86] !== es
          ? (($ = (0, t.jsxs)("div", {
              role: en,
              "data-testid": "perp-market-row",
              "data-density": F,
              "data-coin": eo,
              "data-index": D,
              "data-mark-stale": es,
              className: g,
              children: [y, b, I, w, M, V, L],
            })),
            (O[74] = F),
            (O[75] = D),
            (O[76] = q.coin),
            (O[77] = g),
            (O[78] = y),
            (O[79] = b),
            (O[80] = I),
            (O[81] = w),
            (O[82] = M),
            (O[83] = V),
            (O[84] = L),
            (O[85] = en),
            (O[86] = es),
            (O[87] = $))
          : ($ = O[87]),
        $
      );
    },
  ]);
};
