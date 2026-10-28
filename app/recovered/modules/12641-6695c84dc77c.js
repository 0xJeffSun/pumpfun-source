// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(34011),
    r = e.i(732486),
    i = e.i(445242),
    a = e.i(426091),
    s = e.i(529841),
    n = e.i(116830),
    l = e.i(924631);
  let o = { sm: 32, md: 40, lg: 48 },
    c = { sm: "text-sm", md: "text-sm", lg: "text-sm" },
    d = { sm: 14, md: 14, lg: 16 },
    u = { sm: "text-xs", md: "text-xs", lg: "text-[13px]" };
  (e.s(
    [
      "f",
      0,
      function (e) {
        let m,
          p,
          f,
          x,
          g,
          h,
          b,
          y,
          v,
          w,
          N,
          j,
          k,
          C,
          P,
          _,
          S,
          I,
          F,
          A,
          E,
          R,
          T,
          $ = (0, i.c)(53);
        if ($[0] !== e) {
          let r,
            {
              size: i,
              columnRef: a,
              nameTrailing: s,
              symbolTrailing: n,
              subline: o,
              createdAt: c,
              isFresh: d,
              freshClassName: u,
              className: S,
              nameClassName: I,
              symbolClassName: F,
              symbolPrefix: A,
              coin: E,
              ...R
            } = e;
          ((x = a),
            (v = s),
            (P = n),
            (N = o),
            (g = c),
            (p = S),
            (y = I),
            (k = F),
            (f = E),
            (m = R),
            (w = void 0 === i ? "md" : i),
            (b = void 0 !== d && d),
            (h = void 0 === u ? "text-text-primary" : u),
            (C = void 0 === A || A),
            $[17] !== f.symbol
              ? ((r = (0, l.W)(f.symbol)), ($[17] = f.symbol), ($[18] = r))
              : (r = $[18]),
            (j = r),
            (_ = (0, t.resolveCoinAvatarSeal)(m)),
            ($[0] = e),
            ($[1] = m),
            ($[2] = p),
            ($[3] = f),
            ($[4] = x),
            ($[5] = g),
            ($[6] = h),
            ($[7] = b),
            ($[8] = y),
            ($[9] = v),
            ($[10] = w),
            ($[11] = N),
            ($[12] = j),
            ($[13] = k),
            ($[14] = C),
            ($[15] = P),
            ($[16] = _));
        } else
          ((m = $[1]),
            (p = $[2]),
            (f = $[3]),
            (x = $[4]),
            (g = $[5]),
            (h = $[6]),
            (b = $[7]),
            (y = $[8]),
            (v = $[9]),
            (w = $[10]),
            (N = $[11]),
            (j = $[12]),
            (k = $[13]),
            (C = $[14]),
            (P = $[15]),
            (_ = $[16]));
        let q = "name" === _;
        $[19] !== p
          ? ((S = (0, a.c)("flex min-w-0 items-center gap-3", p)),
            ($[19] = p),
            ($[20] = S))
          : (S = $[20]);
        let D = o[w];
        $[21] !== m || $[22] !== f || $[23] !== D
          ? ((I = (0, r.jsx)(t.CoinAvatar, { coin: f, size: D, ...m })),
            ($[21] = m),
            ($[22] = f),
            ($[23] = D),
            ($[24] = I))
          : (I = $[24]);
        let U = !!q && (m.verified ?? "lookup"),
          O = d[w],
          z = c[w];
        return (
          $[25] !== y || $[26] !== z
            ? ((F = (0, a.c)(z, y)), ($[25] = y), ($[26] = z), ($[27] = F))
            : (F = $[27]),
          $[28] !== m.testIdPrefix ||
          $[29] !== f ||
          $[30] !== v ||
          $[31] !== U ||
          $[32] !== O ||
          $[33] !== F
            ? ((A = (0, r.jsx)(n.f, {
                coin: f,
                verified: U,
                sealSize: O,
                nameClassName: F,
                trailing: v,
                testIdPrefix: m.testIdPrefix,
              })),
              ($[28] = m.testIdPrefix),
              ($[29] = f),
              ($[30] = v),
              ($[31] = U),
              ($[32] = O),
              ($[33] = F),
              ($[34] = A))
            : (A = $[34]),
          $[35] !== g ||
          $[36] !== h ||
          $[37] !== b ||
          $[38] !== w ||
          $[39] !== N ||
          $[40] !== j ||
          $[41] !== k ||
          $[42] !== C ||
          $[43] !== P
            ? ((E =
                N ??
                (0, r.jsxs)("span", {
                  className: "flex min-w-0 items-center gap-2",
                  children: [
                    j
                      ? (0, r.jsx)("span", {
                          className: (0, a.c)(
                            "truncate text-text-tertiary",
                            u[w],
                            k,
                          ),
                          children: C ? `$${j}` : j,
                        })
                      : null,
                    g
                      ? (0, r.jsx)(s.f, {
                          timestamp: g,
                          suffix: !1,
                          className: (0, a.c)(
                            "shrink-0 tabular-nums",
                            u[w],
                            b ? h : "text-text-tertiary",
                          ),
                        })
                      : null,
                    P,
                  ],
                })),
              ($[35] = g),
              ($[36] = h),
              ($[37] = b),
              ($[38] = w),
              ($[39] = N),
              ($[40] = j),
              ($[41] = k),
              ($[42] = C),
              ($[43] = P),
              ($[44] = E))
            : (E = $[44]),
          $[45] !== x || $[46] !== E || $[47] !== A
            ? ((R = (0, r.jsxs)("div", {
                ref: x,
                className: "flex min-w-0 flex-1 flex-col",
                children: [A, E],
              })),
              ($[45] = x),
              ($[46] = E),
              ($[47] = A),
              ($[48] = R))
            : (R = $[48]),
          $[49] !== R || $[50] !== S || $[51] !== I
            ? ((T = (0, r.jsxs)("div", { className: S, children: [I, R] })),
              ($[49] = R),
              ($[50] = S),
              ($[51] = I),
              ($[52] = T))
            : (T = $[52]),
          T
        );
      },
    ],
    41028,
  ),
    e.s([], 12641));
};
