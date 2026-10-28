// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(34011),
    a = e.i(732486),
    i = e.i(445242),
    n = e.i(426091),
    r = e.i(529841),
    l = e.i(116830),
    s = e.i(924631);
  let o = { sm: 32, md: 40, lg: 48 },
    c = { sm: "text-sm", md: "text-sm", lg: "text-sm" },
    d = { sm: 14, md: 14, lg: 16 },
    m = { sm: "text-xs", md: "text-xs", lg: "text-[13px]" };
  (e.s(
    [
      "f",
      0,
      function (e) {
        let u,
          h,
          p,
          f,
          x,
          _,
          g,
          y,
          v,
          b,
          j,
          k,
          w,
          N,
          C,
          S,
          A,
          M,
          T,
          I,
          P,
          z,
          D,
          F = (0, i.c)(53);
        if (F[0] !== e) {
          let a,
            {
              size: i,
              columnRef: n,
              nameTrailing: r,
              symbolTrailing: l,
              subline: o,
              createdAt: c,
              isFresh: d,
              freshClassName: m,
              className: A,
              nameClassName: M,
              symbolClassName: T,
              symbolPrefix: I,
              coin: P,
              ...z
            } = e;
          ((f = n),
            (v = r),
            (C = l),
            (j = o),
            (x = c),
            (h = A),
            (y = M),
            (w = T),
            (p = P),
            (u = z),
            (b = void 0 === i ? "md" : i),
            (g = void 0 !== d && d),
            (_ = void 0 === m ? "text-text-primary" : m),
            (N = void 0 === I || I),
            F[17] !== p.symbol
              ? ((a = (0, s.W)(p.symbol)), (F[17] = p.symbol), (F[18] = a))
              : (a = F[18]),
            (k = a),
            (S = (0, t.resolveCoinAvatarSeal)(u)),
            (F[0] = e),
            (F[1] = u),
            (F[2] = h),
            (F[3] = p),
            (F[4] = f),
            (F[5] = x),
            (F[6] = _),
            (F[7] = g),
            (F[8] = y),
            (F[9] = v),
            (F[10] = b),
            (F[11] = j),
            (F[12] = k),
            (F[13] = w),
            (F[14] = N),
            (F[15] = C),
            (F[16] = S));
        } else
          ((u = F[1]),
            (h = F[2]),
            (p = F[3]),
            (f = F[4]),
            (x = F[5]),
            (_ = F[6]),
            (g = F[7]),
            (y = F[8]),
            (v = F[9]),
            (b = F[10]),
            (j = F[11]),
            (k = F[12]),
            (w = F[13]),
            (N = F[14]),
            (C = F[15]),
            (S = F[16]));
        let L = "name" === S;
        F[19] !== h
          ? ((A = (0, n.c)("flex min-w-0 items-center gap-3", h)),
            (F[19] = h),
            (F[20] = A))
          : (A = F[20]);
        let q = o[b];
        F[21] !== u || F[22] !== p || F[23] !== q
          ? ((M = (0, a.jsx)(t.CoinAvatar, { coin: p, size: q, ...u })),
            (F[21] = u),
            (F[22] = p),
            (F[23] = q),
            (F[24] = M))
          : (M = F[24]);
        let B = !!L && (u.verified ?? "lookup"),
          O = d[b],
          Q = c[b];
        return (
          F[25] !== y || F[26] !== Q
            ? ((T = (0, n.c)(Q, y)), (F[25] = y), (F[26] = Q), (F[27] = T))
            : (T = F[27]),
          F[28] !== u.testIdPrefix ||
          F[29] !== p ||
          F[30] !== v ||
          F[31] !== B ||
          F[32] !== O ||
          F[33] !== T
            ? ((I = (0, a.jsx)(l.f, {
                coin: p,
                verified: B,
                sealSize: O,
                nameClassName: T,
                trailing: v,
                testIdPrefix: u.testIdPrefix,
              })),
              (F[28] = u.testIdPrefix),
              (F[29] = p),
              (F[30] = v),
              (F[31] = B),
              (F[32] = O),
              (F[33] = T),
              (F[34] = I))
            : (I = F[34]),
          F[35] !== x ||
          F[36] !== _ ||
          F[37] !== g ||
          F[38] !== b ||
          F[39] !== j ||
          F[40] !== k ||
          F[41] !== w ||
          F[42] !== N ||
          F[43] !== C
            ? ((P =
                j ??
                (0, a.jsxs)("span", {
                  className: "flex min-w-0 items-center gap-2",
                  children: [
                    k
                      ? (0, a.jsx)("span", {
                          className: (0, n.c)(
                            "truncate text-text-tertiary",
                            m[b],
                            w,
                          ),
                          children: N ? `$${k}` : k,
                        })
                      : null,
                    x
                      ? (0, a.jsx)(r.f, {
                          timestamp: x,
                          suffix: !1,
                          className: (0, n.c)(
                            "shrink-0 tabular-nums",
                            m[b],
                            g ? _ : "text-text-tertiary",
                          ),
                        })
                      : null,
                    C,
                  ],
                })),
              (F[35] = x),
              (F[36] = _),
              (F[37] = g),
              (F[38] = b),
              (F[39] = j),
              (F[40] = k),
              (F[41] = w),
              (F[42] = N),
              (F[43] = C),
              (F[44] = P))
            : (P = F[44]),
          F[45] !== f || F[46] !== P || F[47] !== I
            ? ((z = (0, a.jsxs)("div", {
                ref: f,
                className: "flex min-w-0 flex-1 flex-col",
                children: [I, P],
              })),
              (F[45] = f),
              (F[46] = P),
              (F[47] = I),
              (F[48] = z))
            : (z = F[48]),
          F[49] !== z || F[50] !== A || F[51] !== M
            ? ((D = (0, a.jsxs)("div", { className: A, children: [M, z] })),
              (F[49] = z),
              (F[50] = A),
              (F[51] = M),
              (F[52] = D))
            : (D = F[52]),
          D
        );
      },
    ],
    41028,
  ),
    e.s([], 12641));
};
