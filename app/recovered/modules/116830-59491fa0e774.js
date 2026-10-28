// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    n = e.i(445242),
    r = e.i(426091),
    i = e.i(667876),
    l = e.i(725776),
    a = e.i(924631);
  e.s([
    "f",
    0,
    function (e) {
      let o,
        s,
        u,
        d,
        c,
        f,
        m = (0, n.c)(20),
        {
          coin: p,
          verified: h,
          sealSize: y,
          trailing: g,
          children: v,
          className: b,
          nameClassName: w,
          testIdPrefix: k,
        } = e,
        S = void 0 === h ? "lookup" : h,
        C = void 0 === y ? 14 : y;
      m[0] !== p || m[1] !== C || m[2] !== k || m[3] !== S
        ? ((o =
            !1 === S
              ? null
              : !0 === S
                ? (0, t.jsx)("span", {
                    "data-testid": k ? `${k}-verified` : void 0,
                    className: "flex shrink-0",
                    children: (0, t.jsx)(l.f, { size: C }),
                  })
                : (0, t.jsx)(i.f, {
                    mint: p.mint,
                    chainId: "string" == typeof p.chain_id ? p.chain_id : null,
                    size: C,
                  })),
          (m[0] = p),
          (m[1] = C),
          (m[2] = k),
          (m[3] = S),
          (m[4] = o))
        : (o = m[4]);
      let A = o;
      return (
        m[5] !== b
          ? ((s = (0, r.c)("flex min-w-0 items-center gap-1", b)),
            (m[5] = b),
            (m[6] = s))
          : (s = m[6]),
        m[7] !== w
          ? ((u = (0, r.c)("truncate font-medium text-text-primary", w)),
            (m[7] = w),
            (m[8] = u))
          : (u = m[8]),
        m[9] !== v || m[10] !== p
          ? ((d = v ?? (0, a.D)(p)), (m[9] = v), (m[10] = p), (m[11] = d))
          : (d = m[11]),
        m[12] !== u || m[13] !== d
          ? ((c = (0, t.jsx)("span", { className: u, children: d })),
            (m[12] = u),
            (m[13] = d),
            (m[14] = c))
          : (c = m[14]),
        m[15] !== A || m[16] !== s || m[17] !== c || m[18] !== g
          ? ((f = (0, t.jsxs)("span", { className: s, children: [c, A, g] })),
            (m[15] = A),
            (m[16] = s),
            (m[17] = c),
            (m[18] = g),
            (m[19] = f))
          : (f = m[19]),
        f
      );
    },
  ]);
};
