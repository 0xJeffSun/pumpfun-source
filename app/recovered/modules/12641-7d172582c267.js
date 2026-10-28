// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(34011),
    r = e.i(732486),
    n = e.i(445242),
    a = e.i(426091),
    i = e.i(529841),
    l = e.i(116830),
    o = e.i(924631);
  let s = { sm: 32, md: 40, lg: 48 },
    d = { sm: "text-sm", md: "text-sm", lg: "text-sm" },
    c = { sm: 14, md: 14, lg: 16 },
    f = { sm: "text-xs", md: "text-xs", lg: "text-[13px]" };
  (e.s(
    [
      "f",
      0,
      function (e) {
        let u,
          m,
          p,
          x,
          h,
          y,
          g,
          v,
          w,
          b,
          j,
          N,
          C,
          P,
          S,
          R,
          _,
          E,
          F,
          $,
          A,
          T,
          O,
          U = (0, n.c)(53);
        if (U[0] !== e) {
          let r,
            {
              size: n,
              columnRef: a,
              nameTrailing: i,
              symbolTrailing: l,
              subline: s,
              createdAt: d,
              isFresh: c,
              freshClassName: f,
              className: _,
              nameClassName: E,
              symbolClassName: F,
              symbolPrefix: $,
              coin: A,
              ...T
            } = e;
          ((x = a),
            (w = i),
            (S = l),
            (j = s),
            (h = d),
            (m = _),
            (v = E),
            (C = F),
            (p = A),
            (u = T),
            (b = void 0 === n ? "md" : n),
            (g = void 0 !== c && c),
            (y = void 0 === f ? "text-text-primary" : f),
            (P = void 0 === $ || $),
            U[17] !== p.symbol
              ? ((r = (0, o.W)(p.symbol)), (U[17] = p.symbol), (U[18] = r))
              : (r = U[18]),
            (N = r),
            (R = (0, t.resolveCoinAvatarSeal)(u)),
            (U[0] = e),
            (U[1] = u),
            (U[2] = m),
            (U[3] = p),
            (U[4] = x),
            (U[5] = h),
            (U[6] = y),
            (U[7] = g),
            (U[8] = v),
            (U[9] = w),
            (U[10] = b),
            (U[11] = j),
            (U[12] = N),
            (U[13] = C),
            (U[14] = P),
            (U[15] = S),
            (U[16] = R));
        } else
          ((u = U[1]),
            (m = U[2]),
            (p = U[3]),
            (x = U[4]),
            (h = U[5]),
            (y = U[6]),
            (g = U[7]),
            (v = U[8]),
            (w = U[9]),
            (b = U[10]),
            (j = U[11]),
            (N = U[12]),
            (C = U[13]),
            (P = U[14]),
            (S = U[15]),
            (R = U[16]));
        let I = "name" === R;
        U[19] !== m
          ? ((_ = (0, a.c)("flex min-w-0 items-center gap-3", m)),
            (U[19] = m),
            (U[20] = _))
          : (_ = U[20]);
        let k = s[b];
        U[21] !== u || U[22] !== p || U[23] !== k
          ? ((E = (0, r.jsx)(t.CoinAvatar, { coin: p, size: k, ...u })),
            (U[21] = u),
            (U[22] = p),
            (U[23] = k),
            (U[24] = E))
          : (E = U[24]);
        let D = !!I && (u.verified ?? "lookup"),
          z = c[b],
          L = d[b];
        return (
          U[25] !== v || U[26] !== L
            ? ((F = (0, a.c)(L, v)), (U[25] = v), (U[26] = L), (U[27] = F))
            : (F = U[27]),
          U[28] !== u.testIdPrefix ||
          U[29] !== p ||
          U[30] !== w ||
          U[31] !== D ||
          U[32] !== z ||
          U[33] !== F
            ? (($ = (0, r.jsx)(l.f, {
                coin: p,
                verified: D,
                sealSize: z,
                nameClassName: F,
                trailing: w,
                testIdPrefix: u.testIdPrefix,
              })),
              (U[28] = u.testIdPrefix),
              (U[29] = p),
              (U[30] = w),
              (U[31] = D),
              (U[32] = z),
              (U[33] = F),
              (U[34] = $))
            : ($ = U[34]),
          U[35] !== h ||
          U[36] !== y ||
          U[37] !== g ||
          U[38] !== b ||
          U[39] !== j ||
          U[40] !== N ||
          U[41] !== C ||
          U[42] !== P ||
          U[43] !== S
            ? ((A =
                j ??
                (0, r.jsxs)("span", {
                  className: "flex min-w-0 items-center gap-2",
                  children: [
                    N
                      ? (0, r.jsx)("span", {
                          className: (0, a.c)(
                            "truncate text-text-tertiary",
                            f[b],
                            C,
                          ),
                          children: P ? `$${N}` : N,
                        })
                      : null,
                    h
                      ? (0, r.jsx)(i.f, {
                          timestamp: h,
                          suffix: !1,
                          className: (0, a.c)(
                            "shrink-0 tabular-nums",
                            f[b],
                            g ? y : "text-text-tertiary",
                          ),
                        })
                      : null,
                    S,
                  ],
                })),
              (U[35] = h),
              (U[36] = y),
              (U[37] = g),
              (U[38] = b),
              (U[39] = j),
              (U[40] = N),
              (U[41] = C),
              (U[42] = P),
              (U[43] = S),
              (U[44] = A))
            : (A = U[44]),
          U[45] !== x || U[46] !== A || U[47] !== $
            ? ((T = (0, r.jsxs)("div", {
                ref: x,
                className: "flex min-w-0 flex-1 flex-col",
                children: [$, A],
              })),
              (U[45] = x),
              (U[46] = A),
              (U[47] = $),
              (U[48] = T))
            : (T = U[48]),
          U[49] !== T || U[50] !== _ || U[51] !== E
            ? ((O = (0, r.jsxs)("div", { className: _, children: [E, T] })),
              (U[49] = T),
              (U[50] = _),
              (U[51] = E),
              (U[52] = O))
            : (O = U[52]),
          O
        );
      },
    ],
    41028,
  ),
    e.s([], 12641));
};
