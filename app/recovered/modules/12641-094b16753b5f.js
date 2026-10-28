// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var a = e.i(34011),
    t = e.i(732486),
    r = e.i(445242),
    s = e.i(426091),
    l = e.i(529841),
    i = e.i(116830),
    n = e.i(924631);
  let o = { sm: 32, md: 40, lg: 48 },
    d = { sm: "text-sm", md: "text-sm", lg: "text-sm" },
    u = { sm: 14, md: 14, lg: 16 },
    c = { sm: "text-xs", md: "text-xs", lg: "text-[13px]" };
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
          v,
          w,
          y,
          b,
          j,
          N,
          _,
          A,
          k,
          I,
          C,
          E,
          F,
          P,
          S,
          T,
          U,
          L = (0, r.c)(53);
        if (L[0] !== e) {
          let t,
            {
              size: r,
              columnRef: s,
              nameTrailing: l,
              symbolTrailing: i,
              subline: o,
              createdAt: d,
              isFresh: u,
              freshClassName: c,
              className: C,
              nameClassName: E,
              symbolClassName: F,
              symbolPrefix: P,
              coin: S,
              ...T
            } = e;
          ((h = s),
            (y = l),
            (k = i),
            (j = o),
            (g = d),
            (f = C),
            (w = E),
            (_ = F),
            (p = S),
            (m = T),
            (b = void 0 === r ? "md" : r),
            (v = void 0 !== u && u),
            (x = void 0 === c ? "text-text-primary" : c),
            (A = void 0 === P || P),
            L[17] !== p.symbol
              ? ((t = (0, n.W)(p.symbol)), (L[17] = p.symbol), (L[18] = t))
              : (t = L[18]),
            (N = t),
            (I = (0, a.resolveCoinAvatarSeal)(m)),
            (L[0] = e),
            (L[1] = m),
            (L[2] = f),
            (L[3] = p),
            (L[4] = h),
            (L[5] = g),
            (L[6] = x),
            (L[7] = v),
            (L[8] = w),
            (L[9] = y),
            (L[10] = b),
            (L[11] = j),
            (L[12] = N),
            (L[13] = _),
            (L[14] = A),
            (L[15] = k),
            (L[16] = I));
        } else
          ((m = L[1]),
            (f = L[2]),
            (p = L[3]),
            (h = L[4]),
            (g = L[5]),
            (x = L[6]),
            (v = L[7]),
            (w = L[8]),
            (y = L[9]),
            (b = L[10]),
            (j = L[11]),
            (N = L[12]),
            (_ = L[13]),
            (A = L[14]),
            (k = L[15]),
            (I = L[16]));
        let M = "name" === I;
        L[19] !== f
          ? ((C = (0, s.c)("flex min-w-0 items-center gap-3", f)),
            (L[19] = f),
            (L[20] = C))
          : (C = L[20]);
        let z = o[b];
        L[21] !== m || L[22] !== p || L[23] !== z
          ? ((E = (0, t.jsx)(a.CoinAvatar, { coin: p, size: z, ...m })),
            (L[21] = m),
            (L[22] = p),
            (L[23] = z),
            (L[24] = E))
          : (E = L[24]);
        let R = !!M && (m.verified ?? "lookup"),
          B = u[b],
          K = d[b];
        return (
          L[25] !== w || L[26] !== K
            ? ((F = (0, s.c)(K, w)), (L[25] = w), (L[26] = K), (L[27] = F))
            : (F = L[27]),
          L[28] !== m.testIdPrefix ||
          L[29] !== p ||
          L[30] !== y ||
          L[31] !== R ||
          L[32] !== B ||
          L[33] !== F
            ? ((P = (0, t.jsx)(i.f, {
                coin: p,
                verified: R,
                sealSize: B,
                nameClassName: F,
                trailing: y,
                testIdPrefix: m.testIdPrefix,
              })),
              (L[28] = m.testIdPrefix),
              (L[29] = p),
              (L[30] = y),
              (L[31] = R),
              (L[32] = B),
              (L[33] = F),
              (L[34] = P))
            : (P = L[34]),
          L[35] !== g ||
          L[36] !== x ||
          L[37] !== v ||
          L[38] !== b ||
          L[39] !== j ||
          L[40] !== N ||
          L[41] !== _ ||
          L[42] !== A ||
          L[43] !== k
            ? ((S =
                j ??
                (0, t.jsxs)("span", {
                  className: "flex min-w-0 items-center gap-2",
                  children: [
                    N
                      ? (0, t.jsx)("span", {
                          className: (0, s.c)(
                            "truncate text-text-tertiary",
                            c[b],
                            _,
                          ),
                          children: A ? `$${N}` : N,
                        })
                      : null,
                    g
                      ? (0, t.jsx)(l.f, {
                          timestamp: g,
                          suffix: !1,
                          className: (0, s.c)(
                            "shrink-0 tabular-nums",
                            c[b],
                            v ? x : "text-text-tertiary",
                          ),
                        })
                      : null,
                    k,
                  ],
                })),
              (L[35] = g),
              (L[36] = x),
              (L[37] = v),
              (L[38] = b),
              (L[39] = j),
              (L[40] = N),
              (L[41] = _),
              (L[42] = A),
              (L[43] = k),
              (L[44] = S))
            : (S = L[44]),
          L[45] !== h || L[46] !== S || L[47] !== P
            ? ((T = (0, t.jsxs)("div", {
                ref: h,
                className: "flex min-w-0 flex-1 flex-col",
                children: [P, S],
              })),
              (L[45] = h),
              (L[46] = S),
              (L[47] = P),
              (L[48] = T))
            : (T = L[48]),
          L[49] !== T || L[50] !== C || L[51] !== E
            ? ((U = (0, t.jsxs)("div", { className: C, children: [E, T] })),
              (L[49] = T),
              (L[50] = C),
              (L[51] = E),
              (L[52] = U))
            : (U = L[52]),
          U
        );
      },
    ],
    41028,
  ),
    e.s([], 12641));
};
