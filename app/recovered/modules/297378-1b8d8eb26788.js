// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(732486),
    t = e.i(445242);
  e.i(12692);
  var l = e.i(398902),
    a = e.i(735666);
  function o(e) {
    if (null == e || "" === e) return "—";
    let r = "string" == typeof e ? Number(e) : e;
    return Number.isNaN(r) ? String(e) : `${r.toFixed(3)}%`;
  }
  e.s([
    "default",
    0,
    function (e) {
      let s,
        i,
        d,
        c,
        n,
        f,
        u,
        m,
        b,
        x,
        p,
        N,
        h,
        y,
        j = (0, t.c)(36),
        { data: F, unit: w } = e,
        $ = void 0 === w ? "SOL" : w,
        { t: g } = (0, l.f)();
      if (
        (j[0] !== g
          ? ((s = g("web.common.market_cap")), (j[0] = g), (j[1] = s))
          : (s = j[1]),
        j[2] !== s
          ? ((i = (0, r.jsx)(a.U, { children: s })), (j[2] = s), (j[3] = i))
          : (i = j[3]),
        j[4] !== g
          ? ((d = g("web.fees.creator_fee")), (j[4] = g), (j[5] = d))
          : (d = j[5]),
        j[6] !== d
          ? ((c = (0, r.jsx)(a.U, { children: d })), (j[6] = d), (j[7] = c))
          : (c = j[7]),
        j[8] !== g
          ? ((n = g("web.fees.protocol_fee")), (j[8] = g), (j[9] = n))
          : (n = j[9]),
        j[10] !== n
          ? ((f = (0, r.jsx)(a.U, { children: n })), (j[10] = n), (j[11] = f))
          : (f = j[11]),
        j[12] !== g
          ? ((u = g("web.fees.lp_fee")), (j[12] = g), (j[13] = u))
          : (u = j[13]),
        j[14] !== u
          ? ((m = (0, r.jsx)(a.U, { children: u })), (j[14] = u), (j[15] = m))
          : (m = j[15]),
        j[16] !== g
          ? ((b = g("web.fees.total_fees")), (j[16] = g), (j[17] = b))
          : (b = j[17]),
        j[18] !== b
          ? ((x = (0, r.jsx)(a.U, { children: b })), (j[18] = b), (j[19] = x))
          : (x = j[19]),
        j[20] !== x || j[21] !== i || j[22] !== c || j[23] !== f || j[24] !== m
          ? ((p = (0, r.jsx)(a.E, {
              children: (0, r.jsxs)(a.N, { children: [i, c, f, m, x] }),
            })),
            (j[20] = x),
            (j[21] = i),
            (j[22] = c),
            (j[23] = f),
            (j[24] = m),
            (j[25] = p))
          : (p = j[25]),
        j[26] !== F || j[27] !== $)
      ) {
        let e;
        (j[29] !== $
          ? ((e = (e, t) => {
              var l, s, i;
              let d, c, n, f, u;
              return (0, r.jsxs)(
                a.N,
                {
                  children: [
                    (0, r.jsx)(a.d, {
                      children:
                        ((l = e.conditionalStateMin ?? null),
                        (s = e.conditionalStateMax ?? null),
                        (i = { unit: $ }),
                        (d = (e) =>
                          i?.currency
                            ? e >= 1e9
                              ? `$${(e / 1e9).toFixed(2)}B`
                              : e >= 1e6
                                ? `$${(e / 1e6).toFixed(2)}M`
                                : e >= 1e3
                                  ? `$${(e / 1e3).toFixed(2)}K`
                                  : `$${e}`
                            : `${e}`),
                        (c = i?.unit ? ` ${i.unit}` : ""),
                        null == l && null == s
                          ? "—"
                          : null != l && null == s
                            ? `${d(l)}${c} and up`
                            : null == l && null != s
                              ? `≤ ${d(s)}${c}`
                              : l === s
                                ? `${d(l)}${c}`
                                : `${d(l)} – ${d(s)}${c}`),
                    }),
                    (0, r.jsx)(a.d, { children: o(e.creatorFee) }),
                    (0, r.jsx)(a.d, { children: o(e.protocolFee) }),
                    (0, r.jsx)(a.d, { children: o(e.lpFee) }),
                    (0, r.jsx)(a.d, {
                      children: o(
                        ((n =
                          "number" == typeof e.creatorFee
                            ? e.creatorFee
                            : "string" == typeof e.creatorFee
                              ? Number(e.creatorFee)
                              : 0),
                        (f =
                          "number" == typeof e.protocolFee
                            ? e.protocolFee
                            : "string" == typeof e.protocolFee
                              ? Number(e.protocolFee)
                              : 0),
                        (u =
                          "number" == typeof e.lpFee
                            ? e.lpFee
                            : "string" == typeof e.lpFee
                              ? Number(e.lpFee)
                              : 0),
                        Number.isNaN(n) || Number.isNaN(f) || Number.isNaN(u)
                          ? null
                          : n + f + u),
                      ),
                    }),
                  ],
                },
                t,
              );
            }),
            (j[29] = $),
            (j[30] = e))
          : (e = j[30]),
          (N = F.map(e)),
          (j[26] = F),
          (j[27] = $),
          (j[28] = N));
      } else N = j[28];
      return (
        j[31] !== N
          ? ((h = (0, r.jsx)(a.z, { children: N })), (j[31] = N), (j[32] = h))
          : (h = j[32]),
        j[33] !== p || j[34] !== h
          ? ((y = (0, r.jsx)("div", {
              className: "mt-10 text-white",
              children: (0, r.jsxs)(a.s, { children: [p, h] }),
            })),
            (j[33] = p),
            (j[34] = h),
            (j[35] = y))
          : (y = j[35]),
        y
      );
    },
  ]);
};
