// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(34011),
    r = e.i(732486),
    l = e.i(445242),
    a = e.i(426091),
    i = e.i(529841),
    s = e.i(116830),
    n = e.i(924631);
  let o = { sm: 32, md: 40, lg: 48 },
    u = { sm: "text-sm", md: "text-sm", lg: "text-sm" },
    c = { sm: 14, md: 14, lg: 16 },
    d = { sm: "text-xs", md: "text-xs", lg: "text-[13px]" };
  (e.s(
    [
      "f",
      0,
      function (e) {
        let m,
          f,
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
          D = (0, l.c)(53);
        if (D[0] !== e) {
          let r,
            {
              size: l,
              columnRef: a,
              nameTrailing: i,
              symbolTrailing: s,
              subline: o,
              createdAt: u,
              isFresh: c,
              freshClassName: d,
              className: T,
              nameClassName: A,
              symbolClassName: j,
              symbolPrefix: P,
              coin: _,
              ...U
            } = e;
          ((h = a),
            (y = i),
            (I = s),
            (E = o),
            (g = u),
            (f = T),
            (w = A),
            (C = j),
            (p = _),
            (m = U),
            (v = void 0 === l ? "md" : l),
            (b = void 0 !== c && c),
            (x = void 0 === d ? "text-text-primary" : d),
            (S = void 0 === P || P),
            D[17] !== p.symbol
              ? ((r = (0, n.W)(p.symbol)), (D[17] = p.symbol), (D[18] = r))
              : (r = D[18]),
            (k = r),
            (N = (0, t.resolveCoinAvatarSeal)(m)),
            (D[0] = e),
            (D[1] = m),
            (D[2] = f),
            (D[3] = p),
            (D[4] = h),
            (D[5] = g),
            (D[6] = x),
            (D[7] = b),
            (D[8] = w),
            (D[9] = y),
            (D[10] = v),
            (D[11] = E),
            (D[12] = k),
            (D[13] = C),
            (D[14] = S),
            (D[15] = I),
            (D[16] = N));
        } else
          ((m = D[1]),
            (f = D[2]),
            (p = D[3]),
            (h = D[4]),
            (g = D[5]),
            (x = D[6]),
            (b = D[7]),
            (w = D[8]),
            (y = D[9]),
            (v = D[10]),
            (E = D[11]),
            (k = D[12]),
            (C = D[13]),
            (S = D[14]),
            (I = D[15]),
            (N = D[16]));
        let R = "name" === N;
        D[19] !== f
          ? ((T = (0, a.c)("flex min-w-0 items-center gap-3", f)),
            (D[19] = f),
            (D[20] = T))
          : (T = D[20]);
        let q = o[v];
        D[21] !== m || D[22] !== p || D[23] !== q
          ? ((A = (0, r.jsx)(t.CoinAvatar, { coin: p, size: q, ...m })),
            (D[21] = m),
            (D[22] = p),
            (D[23] = q),
            (D[24] = A))
          : (A = D[24]);
        let L = !!R && (m.verified ?? "lookup"),
          F = c[v],
          G = u[v];
        return (
          D[25] !== w || D[26] !== G
            ? ((j = (0, a.c)(G, w)), (D[25] = w), (D[26] = G), (D[27] = j))
            : (j = D[27]),
          D[28] !== m.testIdPrefix ||
          D[29] !== p ||
          D[30] !== y ||
          D[31] !== L ||
          D[32] !== F ||
          D[33] !== j
            ? ((P = (0, r.jsx)(s.f, {
                coin: p,
                verified: L,
                sealSize: F,
                nameClassName: j,
                trailing: y,
                testIdPrefix: m.testIdPrefix,
              })),
              (D[28] = m.testIdPrefix),
              (D[29] = p),
              (D[30] = y),
              (D[31] = L),
              (D[32] = F),
              (D[33] = j),
              (D[34] = P))
            : (P = D[34]),
          D[35] !== g ||
          D[36] !== x ||
          D[37] !== b ||
          D[38] !== v ||
          D[39] !== E ||
          D[40] !== k ||
          D[41] !== C ||
          D[42] !== S ||
          D[43] !== I
            ? ((_ =
                E ??
                (0, r.jsxs)("span", {
                  className: "flex min-w-0 items-center gap-2",
                  children: [
                    k
                      ? (0, r.jsx)("span", {
                          className: (0, a.c)(
                            "truncate text-text-tertiary",
                            d[v],
                            C,
                          ),
                          children: S ? `$${k}` : k,
                        })
                      : null,
                    g
                      ? (0, r.jsx)(i.f, {
                          timestamp: g,
                          suffix: !1,
                          className: (0, a.c)(
                            "shrink-0 tabular-nums",
                            d[v],
                            b ? x : "text-text-tertiary",
                          ),
                        })
                      : null,
                    I,
                  ],
                })),
              (D[35] = g),
              (D[36] = x),
              (D[37] = b),
              (D[38] = v),
              (D[39] = E),
              (D[40] = k),
              (D[41] = C),
              (D[42] = S),
              (D[43] = I),
              (D[44] = _))
            : (_ = D[44]),
          D[45] !== h || D[46] !== _ || D[47] !== P
            ? ((U = (0, r.jsxs)("div", {
                ref: h,
                className: "flex min-w-0 flex-1 flex-col",
                children: [P, _],
              })),
              (D[45] = h),
              (D[46] = _),
              (D[47] = P),
              (D[48] = U))
            : (U = D[48]),
          D[49] !== U || D[50] !== T || D[51] !== A
            ? ((M = (0, r.jsxs)("div", { className: T, children: [A, U] })),
              (D[49] = U),
              (D[50] = T),
              (D[51] = A),
              (D[52] = M))
            : (M = D[52]),
          M
        );
      },
    ],
    41028,
  ),
    e.s([], 12641));
};
