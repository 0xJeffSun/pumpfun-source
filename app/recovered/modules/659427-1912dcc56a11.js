// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(944410),
    l = e.i(213618),
    i = e.i(690877),
    a = e.i(85324),
    n = e.i(662610),
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
        { period: f, sort: g, enabled: y, refetchIntervalMs: b } = e,
        v = (0, r.useClientServerContract)(),
        w = (0, n.f)(),
        x = w && (void 0 === y || y),
        C = (0, a.q)(b, x);
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
        h[7] !== x || h[8] !== C || h[9] !== u || h[10] !== c
          ? ((m = {
              queryKey: u,
              queryFn: c,
              enabled: x,
              staleTime: 6e4,
              refetchInterval: C,
              placeholderData: l.y,
            }),
            (h[7] = x),
            (h[8] = C),
            (h[9] = u),
            (h[10] = c),
            (h[11] = m))
          : (m = h[11]));
      let I = (0, i.useQuery)(m),
        A = w ? I.data : void 0;
      return (
        h[12] !== I.isError ||
        h[13] !== I.isFetching ||
        h[14] !== I.isPending ||
        h[15] !== I.isPlaceholderData ||
        h[16] !== I.refetch ||
        h[17] !== A
          ? ((p = {
              data: A,
              isPending: I.isPending,
              isPlaceholderData: I.isPlaceholderData,
              isError: I.isError,
              isFetching: I.isFetching,
              refetch: I.refetch,
            }),
            (h[12] = I.isError),
            (h[13] = I.isFetching),
            (h[14] = I.isPending),
            (h[15] = I.isPlaceholderData),
            (h[16] = I.refetch),
            (h[17] = A),
            (h[18] = p))
          : (p = h[18]),
        p
      );
    },
  ]);
};
