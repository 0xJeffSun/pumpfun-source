// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(34011),
    i = e.i(732486),
    r = e.i(445242),
    a = e.i(426091),
    n = e.i(529841),
    l = e.i(116830),
    o = e.i(924631);
  let s = { sm: 32, md: 40, lg: 48 },
    c = { sm: "text-sm", md: "text-sm", lg: "text-sm" },
    d = { sm: 14, md: 14, lg: 16 },
    m = { sm: "text-xs", md: "text-xs", lg: "text-[13px]" };
  (e.s(
    [
      "f",
      0,
      function (e) {
        let x,
          u,
          p,
          b,
          f,
          h,
          g,
          y,
          v,
          _,
          w,
          N,
          k,
          j,
          S,
          C,
          z,
          $,
          F,
          E,
          P,
          T,
          A,
          L = (0, r.c)(53);
        if (L[0] !== e) {
          let i,
            {
              size: r,
              columnRef: a,
              nameTrailing: n,
              symbolTrailing: l,
              subline: s,
              createdAt: c,
              isFresh: d,
              freshClassName: m,
              className: z,
              nameClassName: $,
              symbolClassName: F,
              symbolPrefix: E,
              coin: P,
              ...T
            } = e;
          ((b = a),
            (v = n),
            (S = l),
            (w = s),
            (f = c),
            (u = z),
            (y = $),
            (k = F),
            (p = P),
            (x = T),
            (_ = void 0 === r ? "md" : r),
            (g = void 0 !== d && d),
            (h = void 0 === m ? "text-text-primary" : m),
            (j = void 0 === E || E),
            L[17] !== p.symbol
              ? ((i = (0, o.W)(p.symbol)), (L[17] = p.symbol), (L[18] = i))
              : (i = L[18]),
            (N = i),
            (C = (0, t.resolveCoinAvatarSeal)(x)),
            (L[0] = e),
            (L[1] = x),
            (L[2] = u),
            (L[3] = p),
            (L[4] = b),
            (L[5] = f),
            (L[6] = h),
            (L[7] = g),
            (L[8] = y),
            (L[9] = v),
            (L[10] = _),
            (L[11] = w),
            (L[12] = N),
            (L[13] = k),
            (L[14] = j),
            (L[15] = S),
            (L[16] = C));
        } else
          ((x = L[1]),
            (u = L[2]),
            (p = L[3]),
            (b = L[4]),
            (f = L[5]),
            (h = L[6]),
            (g = L[7]),
            (y = L[8]),
            (v = L[9]),
            (_ = L[10]),
            (w = L[11]),
            (N = L[12]),
            (k = L[13]),
            (j = L[14]),
            (S = L[15]),
            (C = L[16]));
        let M = "name" === C;
        L[19] !== u
          ? ((z = (0, a.c)("flex min-w-0 items-center gap-3", u)),
            (L[19] = u),
            (L[20] = z))
          : (z = L[20]);
        let I = s[_];
        L[21] !== x || L[22] !== p || L[23] !== I
          ? (($ = (0, i.jsx)(t.CoinAvatar, { coin: p, size: I, ...x })),
            (L[21] = x),
            (L[22] = p),
            (L[23] = I),
            (L[24] = $))
          : ($ = L[24]);
        let q = !!M && (x.verified ?? "lookup"),
          U = d[_],
          D = c[_];
        return (
          L[25] !== y || L[26] !== D
            ? ((F = (0, a.c)(D, y)), (L[25] = y), (L[26] = D), (L[27] = F))
            : (F = L[27]),
          L[28] !== x.testIdPrefix ||
          L[29] !== p ||
          L[30] !== v ||
          L[31] !== q ||
          L[32] !== U ||
          L[33] !== F
            ? ((E = (0, i.jsx)(l.f, {
                coin: p,
                verified: q,
                sealSize: U,
                nameClassName: F,
                trailing: v,
                testIdPrefix: x.testIdPrefix,
              })),
              (L[28] = x.testIdPrefix),
              (L[29] = p),
              (L[30] = v),
              (L[31] = q),
              (L[32] = U),
              (L[33] = F),
              (L[34] = E))
            : (E = L[34]),
          L[35] !== f ||
          L[36] !== h ||
          L[37] !== g ||
          L[38] !== _ ||
          L[39] !== w ||
          L[40] !== N ||
          L[41] !== k ||
          L[42] !== j ||
          L[43] !== S
            ? ((P =
                w ??
                (0, i.jsxs)("span", {
                  className: "flex min-w-0 items-center gap-2",
                  children: [
                    N
                      ? (0, i.jsx)("span", {
                          className: (0, a.c)(
                            "truncate text-text-tertiary",
                            m[_],
                            k,
                          ),
                          children: j ? `$${N}` : N,
                        })
                      : null,
                    f
                      ? (0, i.jsx)(n.f, {
                          timestamp: f,
                          suffix: !1,
                          className: (0, a.c)(
                            "shrink-0 tabular-nums",
                            m[_],
                            g ? h : "text-text-tertiary",
                          ),
                        })
                      : null,
                    S,
                  ],
                })),
              (L[35] = f),
              (L[36] = h),
              (L[37] = g),
              (L[38] = _),
              (L[39] = w),
              (L[40] = N),
              (L[41] = k),
              (L[42] = j),
              (L[43] = S),
              (L[44] = P))
            : (P = L[44]),
          L[45] !== b || L[46] !== P || L[47] !== E
            ? ((T = (0, i.jsxs)("div", {
                ref: b,
                className: "flex min-w-0 flex-1 flex-col",
                children: [E, P],
              })),
              (L[45] = b),
              (L[46] = P),
              (L[47] = E),
              (L[48] = T))
            : (T = L[48]),
          L[49] !== T || L[50] !== z || L[51] !== $
            ? ((A = (0, i.jsxs)("div", { className: z, children: [$, T] })),
              (L[49] = T),
              (L[50] = z),
              (L[51] = $),
              (L[52] = A))
            : (A = L[52]),
          A
        );
      },
    ],
    41028,
  ),
    e.s([], 12641));
};
