// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(34011),
    i = e.i(732486),
    a = e.i(445242),
    s = e.i(426091),
    n = e.i(529841),
    l = e.i(116830),
    r = e.i(924631);
  let c = { sm: 32, md: 40, lg: 48 },
    o = { sm: "text-sm", md: "text-sm", lg: "text-sm" },
    d = { sm: 14, md: 14, lg: 16 },
    h = { sm: "text-xs", md: "text-xs", lg: "text-[13px]" };
  (e.s(
    [
      "f",
      0,
      function (e) {
        let x,
          f,
          m,
          u,
          b,
          p,
          _,
          g,
          y,
          v,
          j,
          k,
          w,
          N,
          C,
          A,
          F,
          E,
          S,
          I,
          B,
          D,
          M,
          U = (0, a.c)(53);
        if (U[0] !== e) {
          let i,
            {
              size: a,
              columnRef: s,
              nameTrailing: n,
              symbolTrailing: l,
              subline: c,
              createdAt: o,
              isFresh: d,
              freshClassName: h,
              className: F,
              nameClassName: E,
              symbolClassName: S,
              symbolPrefix: I,
              coin: B,
              ...D
            } = e;
          ((u = s),
            (y = n),
            (C = l),
            (j = c),
            (b = o),
            (f = F),
            (g = E),
            (w = S),
            (m = B),
            (x = D),
            (v = void 0 === a ? "md" : a),
            (_ = void 0 !== d && d),
            (p = void 0 === h ? "text-text-primary" : h),
            (N = void 0 === I || I),
            U[17] !== m.symbol
              ? ((i = (0, r.W)(m.symbol)), (U[17] = m.symbol), (U[18] = i))
              : (i = U[18]),
            (k = i),
            (A = (0, t.resolveCoinAvatarSeal)(x)),
            (U[0] = e),
            (U[1] = x),
            (U[2] = f),
            (U[3] = m),
            (U[4] = u),
            (U[5] = b),
            (U[6] = p),
            (U[7] = _),
            (U[8] = g),
            (U[9] = y),
            (U[10] = v),
            (U[11] = j),
            (U[12] = k),
            (U[13] = w),
            (U[14] = N),
            (U[15] = C),
            (U[16] = A));
        } else
          ((x = U[1]),
            (f = U[2]),
            (m = U[3]),
            (u = U[4]),
            (b = U[5]),
            (p = U[6]),
            (_ = U[7]),
            (g = U[8]),
            (y = U[9]),
            (v = U[10]),
            (j = U[11]),
            (k = U[12]),
            (w = U[13]),
            (N = U[14]),
            (C = U[15]),
            (A = U[16]));
        let H = "name" === A;
        U[19] !== f
          ? ((F = (0, s.c)("flex min-w-0 items-center gap-3", f)),
            (U[19] = f),
            (U[20] = F))
          : (F = U[20]);
        let L = c[v];
        U[21] !== x || U[22] !== m || U[23] !== L
          ? ((E = (0, i.jsx)(t.CoinAvatar, { coin: m, size: L, ...x })),
            (U[21] = x),
            (U[22] = m),
            (U[23] = L),
            (U[24] = E))
          : (E = U[24]);
        let T = !!H && (x.verified ?? "lookup"),
          O = d[v],
          z = o[v];
        return (
          U[25] !== g || U[26] !== z
            ? ((S = (0, s.c)(z, g)), (U[25] = g), (U[26] = z), (U[27] = S))
            : (S = U[27]),
          U[28] !== x.testIdPrefix ||
          U[29] !== m ||
          U[30] !== y ||
          U[31] !== T ||
          U[32] !== O ||
          U[33] !== S
            ? ((I = (0, i.jsx)(l.f, {
                coin: m,
                verified: T,
                sealSize: O,
                nameClassName: S,
                trailing: y,
                testIdPrefix: x.testIdPrefix,
              })),
              (U[28] = x.testIdPrefix),
              (U[29] = m),
              (U[30] = y),
              (U[31] = T),
              (U[32] = O),
              (U[33] = S),
              (U[34] = I))
            : (I = U[34]),
          U[35] !== b ||
          U[36] !== p ||
          U[37] !== _ ||
          U[38] !== v ||
          U[39] !== j ||
          U[40] !== k ||
          U[41] !== w ||
          U[42] !== N ||
          U[43] !== C
            ? ((B =
                j ??
                (0, i.jsxs)("span", {
                  className: "flex min-w-0 items-center gap-2",
                  children: [
                    k
                      ? (0, i.jsx)("span", {
                          className: (0, s.c)(
                            "truncate text-text-tertiary",
                            h[v],
                            w,
                          ),
                          children: N ? `$${k}` : k,
                        })
                      : null,
                    b
                      ? (0, i.jsx)(n.f, {
                          timestamp: b,
                          suffix: !1,
                          className: (0, s.c)(
                            "shrink-0 tabular-nums",
                            h[v],
                            _ ? p : "text-text-tertiary",
                          ),
                        })
                      : null,
                    C,
                  ],
                })),
              (U[35] = b),
              (U[36] = p),
              (U[37] = _),
              (U[38] = v),
              (U[39] = j),
              (U[40] = k),
              (U[41] = w),
              (U[42] = N),
              (U[43] = C),
              (U[44] = B))
            : (B = U[44]),
          U[45] !== u || U[46] !== B || U[47] !== I
            ? ((D = (0, i.jsxs)("div", {
                ref: u,
                className: "flex min-w-0 flex-1 flex-col",
                children: [I, B],
              })),
              (U[45] = u),
              (U[46] = B),
              (U[47] = I),
              (U[48] = D))
            : (D = U[48]),
          U[49] !== D || U[50] !== F || U[51] !== E
            ? ((M = (0, i.jsxs)("div", { className: F, children: [E, D] })),
              (U[49] = D),
              (U[50] = F),
              (U[51] = E),
              (U[52] = M))
            : (M = U[52]),
          M
        );
      },
    ],
    41028,
  ),
    e.s([], 12641));
};
