// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(545063),
    i = e.i(690877),
    a = e.i(85324),
    s = e.i(361308),
    n = e.i(76991);
  let l = {
    all: (e) => e,
    ...Object.fromEntries(
      e.i(21617).o.map((e) => {
        let t;
        return [
          e,
          Object.assign((e) => e.filter((e) => e.category === t), {
            category: (t = e),
          }),
        ];
      }),
    ),
  };
  function o(e, t) {
    return t?.queryKey.at(-1) === null ? e : void 0;
  }
  e.s([
    "f",
    0,
    (e) => {
      let c,
        d,
        u,
        m,
        p = (0, t.c)(12);
      p[0] !== e
        ? ((c = void 0 === e ? {} : e), (p[0] = e), (p[1] = c))
        : (c = p[1]);
      let { category: f, enabled: x } = c,
        g = void 0 === x || x,
        h = (0, a.q)(3e4, g),
        b = (0, r._)(),
        y = null !== b;
      (p[2] !== b ? ((d = s.f.markets(b)), (p[2] = b), (p[3] = d)) : (d = p[3]),
        p[4] !== y
          ? ((u = (e) => {
              let { signal: t } = e;
              return (0, n.P)({ includeFollowedHolders: y, signal: t });
            }),
            (p[4] = y),
            (p[5] = u))
          : (u = p[5]));
      let v = l[void 0 === f ? "all" : f];
      return (
        p[6] !== g || p[7] !== h || p[8] !== d || p[9] !== u || p[10] !== v
          ? ((m = {
              queryKey: d,
              queryFn: u,
              select: v,
              enabled: g,
              staleTime: 3e4,
              refetchInterval: h,
              refetchIntervalInBackground: !1,
              placeholderData: o,
            }),
            (p[6] = g),
            (p[7] = h),
            (p[8] = d),
            (p[9] = u),
            (p[10] = v),
            (p[11] = m))
          : (m = p[11]),
        (0, i.useQuery)(m)
      );
    },
  ]);
};
