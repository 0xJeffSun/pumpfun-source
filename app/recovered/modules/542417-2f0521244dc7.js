// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(545063),
    a = e.i(690877),
    i = e.i(85324),
    n = e.i(361308),
    l = e.i(76991);
  let s = {
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
      let d,
        u,
        c,
        m,
        p = (0, t.c)(12);
      p[0] !== e
        ? ((d = void 0 === e ? {} : e), (p[0] = e), (p[1] = d))
        : (d = p[1]);
      let { category: h, enabled: f } = d,
        g = void 0 === f || f,
        b = (0, i.q)(3e4, g),
        y = (0, r._)(),
        v = null !== y;
      (p[2] !== y ? ((u = n.f.markets(y)), (p[2] = y), (p[3] = u)) : (u = p[3]),
        p[4] !== v
          ? ((c = (e) => {
              let { signal: t } = e;
              return (0, l.P)({ includeFollowedHolders: v, signal: t });
            }),
            (p[4] = v),
            (p[5] = c))
          : (c = p[5]));
      let w = s[void 0 === h ? "all" : h];
      return (
        p[6] !== g || p[7] !== b || p[8] !== u || p[9] !== c || p[10] !== w
          ? ((m = {
              queryKey: u,
              queryFn: c,
              select: w,
              enabled: g,
              staleTime: 3e4,
              refetchInterval: b,
              refetchIntervalInBackground: !1,
              placeholderData: o,
            }),
            (p[6] = g),
            (p[7] = b),
            (p[8] = u),
            (p[9] = c),
            (p[10] = w),
            (p[11] = m))
          : (m = p[11]),
        (0, a.useQuery)(m)
      );
    },
  ]);
};
