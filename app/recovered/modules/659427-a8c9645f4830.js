// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    a = e.i(944410),
    i = e.i(213618),
    l = e.i(690877),
    r = e.i(85324),
    n = e.i(662610),
    o = e.i(560328),
    s = e.i(956683),
    d = e.i(989582);
  e.s([
    "f",
    0,
    (e) => {
      let c,
        u,
        m,
        p,
        h = (0, t.c)(19),
        { period: f, sort: g, enabled: y, refetchIntervalMs: v } = e,
        b = (0, a.useClientServerContract)(),
        I = (0, n.f)(),
        w = I && (void 0 === y || y),
        C = (0, r.q)(v, w);
      (h[0] !== f || h[1] !== g
        ? ((c = d.f.leaderboard(f, g, s.H)), (h[0] = f), (h[1] = g), (h[2] = c))
        : (c = h[2]),
        h[3] !== b || h[4] !== f || h[5] !== g
          ? ((u = (e) => {
              let { signal: t } = e;
              return (0, o.j)({
                api: b,
                period: f,
                sort: g,
                limit: s.H,
                signal: t,
              });
            }),
            (h[3] = b),
            (h[4] = f),
            (h[5] = g),
            (h[6] = u))
          : (u = h[6]),
        h[7] !== w || h[8] !== C || h[9] !== c || h[10] !== u
          ? ((m = {
              queryKey: c,
              queryFn: u,
              enabled: w,
              staleTime: 6e4,
              refetchInterval: C,
              placeholderData: i.y,
            }),
            (h[7] = w),
            (h[8] = C),
            (h[9] = c),
            (h[10] = u),
            (h[11] = m))
          : (m = h[11]));
      let k = (0, l.useQuery)(m),
        x = I ? k.data : void 0;
      return (
        h[12] !== k.isError ||
        h[13] !== k.isFetching ||
        h[14] !== k.isPending ||
        h[15] !== k.isPlaceholderData ||
        h[16] !== k.refetch ||
        h[17] !== x
          ? ((p = {
              data: x,
              isPending: k.isPending,
              isPlaceholderData: k.isPlaceholderData,
              isError: k.isError,
              isFetching: k.isFetching,
              refetch: k.refetch,
            }),
            (h[12] = k.isError),
            (h[13] = k.isFetching),
            (h[14] = k.isPending),
            (h[15] = k.isPlaceholderData),
            (h[16] = k.refetch),
            (h[17] = x),
            (h[18] = p))
          : (p = h[18]),
        p
      );
    },
  ]);
};
