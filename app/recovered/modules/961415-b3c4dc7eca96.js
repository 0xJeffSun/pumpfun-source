// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(944410),
    l = e.i(690877),
    i = e.i(85324),
    a = e.i(639287),
    n = e.i(779106);
  e.s(
    [
      "f",
      0,
      (e) => {
        let s,
          o,
          d,
          u,
          c = (0, t.c)(17),
          { idOrSlug: m, isVisible: p } = e,
          h = (0, r.useClientServerContract)(),
          f = (0, n.f)("competitions"),
          g = null !== m,
          y = (0, i.q)(15e3, g && p);
        (c[0] !== m || c[1] !== f
          ? ((s = a.f.detail(m ?? "", f)), (c[0] = m), (c[1] = f), (c[2] = s))
          : (s = c[2]),
          c[3] !== h || c[4] !== m
            ? ((o = (e) => {
                let { signal: t } = e;
                return h("GET /competitions/{idOrSlug}", {
                  params: { idOrSlug: m ?? "" },
                  signal: t,
                });
              }),
              (c[3] = h),
              (c[4] = m),
              (c[5] = o))
            : (o = c[5]),
          c[6] !== g || c[7] !== y || c[8] !== s || c[9] !== o
            ? ((d = {
                queryKey: s,
                queryFn: o,
                enabled: g,
                staleTime: 5e3,
                refetchInterval: y,
              }),
              (c[6] = g),
              (c[7] = y),
              (c[8] = s),
              (c[9] = o),
              (c[10] = d))
            : (d = c[10]));
        let b = (0, l.useQuery)(d),
          v = g ? b.data : void 0,
          w = g && b.isLoading;
        return (
          c[11] !== b.isError ||
          c[12] !== b.isRefetching ||
          c[13] !== b.refetch ||
          c[14] !== v ||
          c[15] !== w
            ? ((u = {
                data: v,
                isLoading: w,
                isError: b.isError,
                isRefetching: b.isRefetching,
                refetch: b.refetch,
              }),
              (c[11] = b.isError),
              (c[12] = b.isRefetching),
              (c[13] = b.refetch),
              (c[14] = v),
              (c[15] = w),
              (c[16] = u))
            : (u = c[16]),
          u
        );
      },
    ],
    961415,
  );
  var s = e.i(662610),
    o = e.i(560328),
    d = e.i(989582);
  e.s(
    [
      "f",
      0,
      (e) => {
        let i,
          a,
          n,
          u,
          c,
          m,
          p,
          h,
          f,
          g,
          y,
          b = (0, t.c)(38),
          { groupId: v, period: w, enabled: x } = e,
          C = (0, r.useClientServerContract)(),
          I = (0, s.f)(),
          A = v ?? "",
          k = !!v && I && (void 0 === x || x),
          _ = "1d" !== w;
        (b[0] !== A
          ? ((i = d.f.portfolio(A)), (b[0] = A), (b[1] = i))
          : (i = b[1]),
          b[2] !== C || b[3] !== A
            ? ((a = (e) => {
                let { signal: t } = e;
                return (0, o.u)({ api: C, groupId: A, signal: t });
              }),
              (b[2] = C),
              (b[3] = A),
              (b[4] = a))
            : (a = b[4]),
          b[5] !== k || b[6] !== i || b[7] !== a
            ? ((n = {
                queryKey: i,
                enabled: k,
                staleTime: 3e4,
                refetchInterval: 6e4,
                queryFn: a,
              }),
              (b[5] = k),
              (b[6] = i),
              (b[7] = a),
              (b[8] = n))
            : (n = b[8]));
        let U = (0, l.useQuery)(n);
        (b[9] !== A || b[10] !== w
          ? ((u = d.f.windowedPnl(A, w)), (b[9] = A), (b[10] = w), (b[11] = u))
          : (u = b[11]),
          b[12] !== C || b[13] !== A || b[14] !== w
            ? ((c = (e) => {
                let { signal: t } = e;
                return (0, o.b)({ api: C, groupId: A, period: w, signal: t });
              }),
              (b[12] = C),
              (b[13] = A),
              (b[14] = w),
              (b[15] = c))
            : (c = b[15]),
          b[16] !== k || b[17] !== u || b[18] !== c
            ? ((m = {
                queryKey: u,
                enabled: k,
                staleTime: 3e4,
                refetchInterval: 3e4,
                queryFn: c,
              }),
              (b[16] = k),
              (b[17] = u),
              (b[18] = c),
              (b[19] = m))
            : (m = b[19]));
        let E = (0, l.useQuery)(m);
        b[20] !== A
          ? ((p = d.f.windowedPnl(A, "1d")), (b[20] = A), (b[21] = p))
          : (p = b[21]);
        let j = k && _;
        (b[22] !== C || b[23] !== A
          ? ((h = (e) => {
              let { signal: t } = e;
              return (0, o.b)({ api: C, groupId: A, period: "1d", signal: t });
            }),
            (b[22] = C),
            (b[23] = A),
            (b[24] = h))
          : (h = b[24]),
          b[25] !== h || b[26] !== p || b[27] !== j
            ? ((f = {
                queryKey: p,
                enabled: j,
                staleTime: 3e4,
                refetchInterval: 3e4,
                queryFn: h,
              }),
              (b[25] = h),
              (b[26] = p),
              (b[27] = j),
              (b[28] = f))
            : (f = b[28]));
        let N = (0, l.useQuery)(f),
          S = _ ? N : E,
          T = E.data?.pnlUsd ?? null,
          P = E.data?.pnlPercentage ?? null,
          V = U.data?.positionCount ?? null,
          M = S.data?.totalValueUsd ?? null;
        b[29] !== T || b[30] !== P || b[31] !== V || b[32] !== M
          ? ((g = {
              pnlUsd: T,
              pnlPercentage: P,
              positionCount: V,
              totalValueUsd: M,
            }),
            (b[29] = T),
            (b[30] = P),
            (b[31] = V),
            (b[32] = M),
            (b[33] = g))
          : (g = b[33]);
        let B = g,
          F = U.isLoading || E.isLoading || (_ && N.isLoading),
          D = U.isError || E.isError || (_ && N.isError);
        return (
          b[34] !== B || b[35] !== F || b[36] !== D
            ? ((y = { data: B, isLoading: F, isError: D }),
              (b[34] = B),
              (b[35] = F),
              (b[36] = D),
              (b[37] = y))
            : (y = b[37]),
          y
        );
      },
    ],
    626540,
  );
};
