// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(34011),
    r = e.i(732486),
    a = e.i(445242),
    i = e.i(426091),
    s = e.i(529841),
    l = e.i(116830),
    o = e.i(924631);
  let n = { sm: 32, md: 40, lg: 48 },
    d = { sm: "text-sm", md: "text-sm", lg: "text-sm" },
    u = { sm: 14, md: 14, lg: 16 },
    c = { sm: "text-xs", md: "text-xs", lg: "text-[13px]" };
  (e.s(
    [
      "f",
      0,
      function (e) {
        let f,
          m,
          p,
          v,
          h,
          y,
          x,
          g,
          w,
          b,
          N,
          j,
          R,
          S,
          C,
          A,
          F,
          _,
          k,
          M,
          T,
          E,
          I,
          D = (0, a.c)(53);
        if (D[0] !== e) {
          let r,
            {
              size: a,
              columnRef: i,
              nameTrailing: s,
              symbolTrailing: l,
              subline: n,
              createdAt: d,
              isFresh: u,
              freshClassName: c,
              className: F,
              nameClassName: _,
              symbolClassName: k,
              symbolPrefix: M,
              coin: T,
              ...E
            } = e;
          ((v = i),
            (w = s),
            (C = l),
            (N = n),
            (h = d),
            (m = F),
            (g = _),
            (R = k),
            (p = T),
            (f = E),
            (b = void 0 === a ? "md" : a),
            (x = void 0 !== u && u),
            (y = void 0 === c ? "text-text-primary" : c),
            (S = void 0 === M || M),
            D[17] !== p.symbol
              ? ((r = (0, o.W)(p.symbol)), (D[17] = p.symbol), (D[18] = r))
              : (r = D[18]),
            (j = r),
            (A = (0, t.resolveCoinAvatarSeal)(f)),
            (D[0] = e),
            (D[1] = f),
            (D[2] = m),
            (D[3] = p),
            (D[4] = v),
            (D[5] = h),
            (D[6] = y),
            (D[7] = x),
            (D[8] = g),
            (D[9] = w),
            (D[10] = b),
            (D[11] = N),
            (D[12] = j),
            (D[13] = R),
            (D[14] = S),
            (D[15] = C),
            (D[16] = A));
        } else
          ((f = D[1]),
            (m = D[2]),
            (p = D[3]),
            (v = D[4]),
            (h = D[5]),
            (y = D[6]),
            (x = D[7]),
            (g = D[8]),
            (w = D[9]),
            (b = D[10]),
            (N = D[11]),
            (j = D[12]),
            (R = D[13]),
            (S = D[14]),
            (C = D[15]),
            (A = D[16]));
        let L = "name" === A;
        D[19] !== m
          ? ((F = (0, i.c)("flex min-w-0 items-center gap-3", m)),
            (D[19] = m),
            (D[20] = F))
          : (F = D[20]);
        let P = n[b];
        D[21] !== f || D[22] !== p || D[23] !== P
          ? ((_ = (0, r.jsx)(t.CoinAvatar, { coin: p, size: P, ...f })),
            (D[21] = f),
            (D[22] = p),
            (D[23] = P),
            (D[24] = _))
          : (_ = D[24]);
        let z = !!L && (f.verified ?? "lookup"),
          O = u[b],
          B = d[b];
        return (
          D[25] !== g || D[26] !== B
            ? ((k = (0, i.c)(B, g)), (D[25] = g), (D[26] = B), (D[27] = k))
            : (k = D[27]),
          D[28] !== f.testIdPrefix ||
          D[29] !== p ||
          D[30] !== w ||
          D[31] !== z ||
          D[32] !== O ||
          D[33] !== k
            ? ((M = (0, r.jsx)(l.f, {
                coin: p,
                verified: z,
                sealSize: O,
                nameClassName: k,
                trailing: w,
                testIdPrefix: f.testIdPrefix,
              })),
              (D[28] = f.testIdPrefix),
              (D[29] = p),
              (D[30] = w),
              (D[31] = z),
              (D[32] = O),
              (D[33] = k),
              (D[34] = M))
            : (M = D[34]),
          D[35] !== h ||
          D[36] !== y ||
          D[37] !== x ||
          D[38] !== b ||
          D[39] !== N ||
          D[40] !== j ||
          D[41] !== R ||
          D[42] !== S ||
          D[43] !== C
            ? ((T =
                N ??
                (0, r.jsxs)("span", {
                  className: "flex min-w-0 items-center gap-2",
                  children: [
                    j
                      ? (0, r.jsx)("span", {
                          className: (0, i.c)(
                            "truncate text-text-tertiary",
                            c[b],
                            R,
                          ),
                          children: S ? `$${j}` : j,
                        })
                      : null,
                    h
                      ? (0, r.jsx)(s.f, {
                          timestamp: h,
                          suffix: !1,
                          className: (0, i.c)(
                            "shrink-0 tabular-nums",
                            c[b],
                            x ? y : "text-text-tertiary",
                          ),
                        })
                      : null,
                    C,
                  ],
                })),
              (D[35] = h),
              (D[36] = y),
              (D[37] = x),
              (D[38] = b),
              (D[39] = N),
              (D[40] = j),
              (D[41] = R),
              (D[42] = S),
              (D[43] = C),
              (D[44] = T))
            : (T = D[44]),
          D[45] !== v || D[46] !== T || D[47] !== M
            ? ((E = (0, r.jsxs)("div", {
                ref: v,
                className: "flex min-w-0 flex-1 flex-col",
                children: [M, T],
              })),
              (D[45] = v),
              (D[46] = T),
              (D[47] = M),
              (D[48] = E))
            : (E = D[48]),
          D[49] !== E || D[50] !== F || D[51] !== _
            ? ((I = (0, r.jsxs)("div", { className: F, children: [_, E] })),
              (D[49] = E),
              (D[50] = F),
              (D[51] = _),
              (D[52] = I))
            : (I = D[52]),
          I
        );
      },
    ],
    41028,
  ),
    e.s([], 12641));
};
