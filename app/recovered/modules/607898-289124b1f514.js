// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    n = e.i(759257),
    l = e.i(639374);
  function i(e, t, r) {
    if (!r.ok)
      throw Error(`Failed to fetch holder count: ${r.status} ${r.statusText}`);
  }
  function a(e) {
    return ["token-holder-count", e];
  }
  e.s([
    "U",
    0,
    function (e) {
      let s,
        o,
        u,
        d,
        c = (0, t.c)(10),
        { enabled: m, mint: f } = e,
        p = void 0 === m || m;
      c[0] !== p || c[1] !== f
        ? ((s = p && !!f && (0, l.f)(f)), (c[0] = p), (c[1] = f), (c[2] = s))
        : (s = c[2]);
      let h = s;
      return (
        c[3] !== f
          ? ((o = async () =>
              (0, n.j)()("GET /token-holders/{mint}/count", {
                params: { mint: f },
                query: {},
                throwHttpErrors: !1,
                hooks: { afterResponse: [i] },
              })),
            (u = a(f)),
            (c[3] = f),
            (c[4] = o),
            (c[5] = u))
          : ((o = c[4]), (u = c[5])),
        c[6] !== h || c[7] !== o || c[8] !== u
          ? ((d = {
              enabled: h,
              gcTime: 3e5,
              queryFn: o,
              queryKey: u,
              refetchInterval: 6e4,
              staleTime: 6e4,
            }),
            (c[6] = h),
            (c[7] = o),
            (c[8] = u),
            (c[9] = d))
          : (d = c[9]),
        (0, r.useQuery)(d)
      );
    },
    "F",
    0,
    a,
  ]);
};
