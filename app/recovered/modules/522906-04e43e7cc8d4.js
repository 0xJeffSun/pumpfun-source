// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    l = e.i(458310);
  e.i(12692);
  var i = e.i(398902),
    a = e.i(337689),
    n = e.i(951425),
    s = e.i(691471),
    c = e.i(392968),
    o = e.i(908163),
    u = e.i(243719),
    d = e.i(499141),
    f = e.i(338319);
  e.s([
    "f",
    0,
    function (e) {
      let m,
        h,
        p,
        E,
        k,
        S,
        w,
        x,
        y,
        g,
        b,
        v,
        C,
        N,
        T,
        R,
        A,
        P,
        L,
        j,
        I,
        D,
        O,
        q,
        M,
        $ = (0, r.c)(88),
        {
          market: F,
          density: U,
          index: G,
          onNavigate: _,
          leading: z,
          trailing: K,
          isListItem: H,
          markStale: W,
          wash: B,
          className: J,
        } = e,
        Y = void 0 !== W && W,
        Q = void 0 === B || B,
        { t: V, i18n: X } = (0, i.f)(),
        Z = X.language,
        ee = F.change24hPct;
      $[0] !== ee || $[1] !== Y || $[2] !== F.markPx
        ? ((m =
            !Y &&
            Number(F.markPx) > 0 &&
            null !== ee &&
            Number.isFinite(ee) &&
            0 !== ee),
          ($[0] = ee),
          ($[1] = Y),
          ($[2] = F.markPx),
          ($[3] = m))
        : (m = $[3]);
      let et = m;
      $[4] !== ee || $[5] !== Y || $[6] !== F.markPx || $[7] !== Q
        ? ((h =
            Q &&
            !Y &&
            Number(F.markPx) > 0 &&
            null !== ee &&
            Number.isFinite(ee)),
          ($[4] = ee),
          ($[5] = Y),
          ($[6] = F.markPx),
          ($[7] = Q),
          ($[8] = h))
        : (h = $[8]);
      let er = h,
        el = F.followedHolders;
      $[9] !== U || $[10] !== el || $[11] !== F.coin
        ? ((p =
            el && el.holders.length > 0
              ? (0, t.jsx)(a.E, {
                  mint: F.coin,
                  followedHolders: el,
                  avatarSize: "terminal" === U ? "sm" : "rail",
                  interactive: !1,
                  className: "relative z-[2] ml-1",
                })
              : null),
          ($[9] = U),
          ($[10] = el),
          ($[11] = F.coin),
          ($[12] = p))
        : (p = $[12]);
      let ei = p,
        ea =
          F.ticker !== F.displayName
            ? `${F.ticker} — ${F.displayName}`
            : F.displayName,
        en = void 0 === H || H ? "listitem" : void 0,
        es = F.coin,
        ec = Y ? "" : void 0,
        eo = n.w[U];
      ($[13] !== J || $[14] !== eo
        ? ((E = (0, f.c)(eo, J)), ($[13] = J), ($[14] = eo), ($[15] = E))
        : (E = $[15]),
        $[16] !== ee || $[17] !== er
          ? ((k = er
              ? (0, t.jsx)("span", {
                  "aria-hidden": !0,
                  "data-testid": "perp-market-row-wash",
                  "data-tone": ee < 0 ? "loss" : "gain",
                  className: (0, f.c)(
                    "pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent from-35%",
                    ee < 0 ? "to-loss/[0.12]" : "to-gain/[0.12]",
                  ),
                })
              : null),
            ($[16] = ee),
            ($[17] = er),
            ($[18] = k))
          : (k = $[18]),
        $[19] !== F.coin
          ? ((S = (0, d.o)(F.coin)), ($[19] = F.coin), ($[20] = S))
          : (S = $[20]),
        $[21] !== ea || $[22] !== _ || $[23] !== S
          ? ((w = (0, t.jsx)(l.default, {
              href: S,
              prefetch: !1,
              "aria-label": ea,
              onClick: _,
              className: "absolute inset-0 z-[1] focus-inset",
            })),
            ($[21] = ea),
            ($[22] = _),
            ($[23] = S),
            ($[24] = w))
          : (w = $[24]),
        $[25] !== z
          ? ((x = z
              ? (0, t.jsx)("span", {
                  className: "relative z-[2] flex shrink-0 items-center",
                  children: z,
                })
              : null),
            ($[25] = z),
            ($[26] = x))
          : (x = $[26]));
      let eu = n.s[U];
      $[27] !== F || $[28] !== eu
        ? ((y = (0, t.jsx)(s.f, {
            market: F,
            size: eu,
            testIdPrefix: "perp-market-row",
          })),
          ($[27] = F),
          ($[28] = eu),
          ($[29] = y))
        : (y = $[29]);
      let ed = n.x[U],
        ef = n.n[U];
      ($[30] !== ef
        ? ((g = (0, f.c)(ef, "truncate font-medium text-text-primary")),
          ($[30] = ef),
          ($[31] = g))
        : (g = $[31]),
        $[32] !== F.ticker || $[33] !== g
          ? ((b = (0, t.jsx)("span", { className: g, children: F.ticker })),
            ($[32] = F.ticker),
            ($[33] = g),
            ($[34] = b))
          : (b = $[34]),
        $[35] !== F.maxLeverage || $[36] !== V
          ? ((v = V("web.screeners.perps_max_leverage", {
              value: F.maxLeverage,
            })),
            ($[35] = F.maxLeverage),
            ($[36] = V),
            ($[37] = v))
          : (v = $[37]),
        $[38] !== U || $[39] !== v
          ? ((C = (0, t.jsx)(o.E, { density: U, children: v })),
            ($[38] = U),
            ($[39] = v),
            ($[40] = C))
          : (C = $[40]),
        $[41] !== ed || $[42] !== b || $[43] !== C
          ? ((N = (0, t.jsxs)("div", { className: ed, children: [b, C] })),
            ($[41] = ed),
            ($[42] = b),
            ($[43] = C),
            ($[44] = N))
          : (N = $[44]));
      let em = n.B[U];
      ($[45] !== em
        ? ((T = (0, f.c)(em, "truncate")), ($[45] = em), ($[46] = T))
        : (T = $[46]),
        $[47] !== F.displayName || $[48] !== T
          ? ((R = (0, t.jsx)("span", {
              className: T,
              children: F.displayName,
            })),
            ($[47] = F.displayName),
            ($[48] = T),
            ($[49] = R))
          : (R = $[49]),
        $[50] !== ei || $[51] !== R
          ? ((A = (0, t.jsxs)("span", {
              className: "flex min-w-0 items-center",
              children: [R, ei],
            })),
            ($[50] = ei),
            ($[51] = R),
            ($[52] = A))
          : (A = $[52]),
        $[53] !== N || $[54] !== A
          ? ((P = (0, t.jsxs)("div", {
              className: "flex min-w-0 flex-1 flex-col",
              children: [N, A],
            })),
            ($[53] = N),
            ($[54] = A),
            ($[55] = P))
          : (P = $[55]));
      let eh = n.e[U];
      return (
        $[56] !== Z || $[57] !== Y || $[58] !== F.markPx
          ? ((L = Y ? "—" : (0, u.Q)({ px: F.markPx, locale: Z })),
            ($[56] = Z),
            ($[57] = Y),
            ($[58] = F.markPx),
            ($[59] = L))
          : (L = $[59]),
        $[60] !== eh || $[61] !== L
          ? ((j = (0, t.jsx)("span", {
              className: eh,
              "data-testid": "perp-market-row-price",
              children: L,
            })),
            ($[60] = eh),
            ($[61] = L),
            ($[62] = j))
          : (j = $[62]),
        $[63] !== ee || $[64] !== U || $[65] !== et
          ? ((I = et
              ? (0, t.jsx)(c.f, {
                  changePercent: ee,
                  density: U,
                  variant: "text",
                  "data-testid": "perp-market-row-change",
                })
              : null),
            ($[63] = ee),
            ($[64] = U),
            ($[65] = et),
            ($[66] = I))
          : (I = $[66]),
        $[67] !== I
          ? ((D = (0, t.jsx)("span", { className: n.N, children: I })),
            ($[67] = I),
            ($[68] = D))
          : (D = $[68]),
        $[69] !== j || $[70] !== D
          ? ((O = (0, t.jsxs)("div", {
              className: "flex shrink-0 flex-col items-end",
              children: [j, D],
            })),
            ($[69] = j),
            ($[70] = D),
            ($[71] = O))
          : (O = $[71]),
        $[72] !== K
          ? ((q = K
              ? (0, t.jsx)("span", {
                  className: "relative z-[2] flex shrink-0 items-center",
                  children: K,
                })
              : null),
            ($[72] = K),
            ($[73] = q))
          : (q = $[73]),
        $[74] !== U ||
        $[75] !== G ||
        $[76] !== F.coin ||
        $[77] !== E ||
        $[78] !== k ||
        $[79] !== w ||
        $[80] !== x ||
        $[81] !== y ||
        $[82] !== P ||
        $[83] !== O ||
        $[84] !== q ||
        $[85] !== en ||
        $[86] !== ec
          ? ((M = (0, t.jsxs)("div", {
              role: en,
              "data-testid": "perp-market-row",
              "data-density": U,
              "data-coin": es,
              "data-index": G,
              "data-mark-stale": ec,
              className: E,
              children: [k, w, x, y, P, O, q],
            })),
            ($[74] = U),
            ($[75] = G),
            ($[76] = F.coin),
            ($[77] = E),
            ($[78] = k),
            ($[79] = w),
            ($[80] = x),
            ($[81] = y),
            ($[82] = P),
            ($[83] = O),
            ($[84] = q),
            ($[85] = en),
            ($[86] = ec),
            ($[87] = M))
          : (M = $[87]),
        M
      );
    },
  ]);
};
