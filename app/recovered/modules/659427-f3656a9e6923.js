// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(944410),
    a = e.i(213618),
    i = e.i(690877),
    n = e.i(85324),
    l = e.i(662610),
    s = e.i(560328),
    o = e.i(956683),
    d = e.i(989582);
  e.s([
    "f",
    0,
    (e) => {
      let u,
        c,
        m,
        p,
        h = (0, t.c)(19),
        { period: f, sort: g, enabled: b, refetchIntervalMs: y } = e,
        v = (0, r.useClientServerContract)(),
        w = (0, l.f)(),
        k = w && (void 0 === b || b),
        C = (0, n.q)(y, k);
      (h[0] !== f || h[1] !== g
        ? ((u = d.f.leaderboard(f, g, o.H)), (h[0] = f), (h[1] = g), (h[2] = u))
        : (u = h[2]),
        h[3] !== v || h[4] !== f || h[5] !== g
          ? ((c = (e) => {
              let { signal: t } = e;
              return (0, s.j)({
                api: v,
                period: f,
                sort: g,
                limit: o.H,
                signal: t,
              });
            }),
            (h[3] = v),
            (h[4] = f),
            (h[5] = g),
            (h[6] = c))
          : (c = h[6]),
        h[7] !== k || h[8] !== C || h[9] !== u || h[10] !== c
          ? ((m = {
              queryKey: u,
              queryFn: c,
              enabled: k,
              staleTime: 6e4,
              refetchInterval: C,
              placeholderData: a.y,
            }),
            (h[7] = k),
            (h[8] = C),
            (h[9] = u),
            (h[10] = c),
            (h[11] = m))
          : (m = h[11]));
      let x = (0, i.useQuery)(m),
        I = w ? x.data : void 0;
      return (
        h[12] !== x.isError ||
        h[13] !== x.isFetching ||
        h[14] !== x.isPending ||
        h[15] !== x.isPlaceholderData ||
        h[16] !== x.refetch ||
        h[17] !== I
          ? ((p = {
              data: I,
              isPending: x.isPending,
              isPlaceholderData: x.isPlaceholderData,
              isError: x.isError,
              isFetching: x.isFetching,
              refetch: x.refetch,
            }),
            (h[12] = x.isError),
            (h[13] = x.isFetching),
            (h[14] = x.isPending),
            (h[15] = x.isPlaceholderData),
            (h[16] = x.refetch),
            (h[17] = I),
            (h[18] = p))
          : (p = h[18]),
        p
      );
    },
  ]);
};
