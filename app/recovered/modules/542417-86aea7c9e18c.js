// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    a = e.i(545063),
    i = e.i(690877),
    l = e.i(85324),
    r = e.i(361308),
    n = e.i(76991);
  let o = {
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
  function s(e, t) {
    return t?.queryKey.at(-1) === null ? e : void 0;
  }
  e.s([
    "f",
    0,
    (e) => {
      let d,
        c,
        u,
        m,
        p = (0, t.c)(12);
      p[0] !== e
        ? ((d = void 0 === e ? {} : e), (p[0] = e), (p[1] = d))
        : (d = p[1]);
      let { category: h, enabled: f } = d,
        g = void 0 === f || f,
        y = (0, l.q)(3e4, g),
        v = (0, a._)(),
        b = null !== v;
      (p[2] !== v ? ((c = r.f.markets(v)), (p[2] = v), (p[3] = c)) : (c = p[3]),
        p[4] !== b
          ? ((u = (e) => {
              let { signal: t } = e;
              return (0, n.P)({ includeFollowedHolders: b, signal: t });
            }),
            (p[4] = b),
            (p[5] = u))
          : (u = p[5]));
      let I = o[void 0 === h ? "all" : h];
      return (
        p[6] !== g || p[7] !== y || p[8] !== c || p[9] !== u || p[10] !== I
          ? ((m = {
              queryKey: c,
              queryFn: u,
              select: I,
              enabled: g,
              staleTime: 3e4,
              refetchInterval: y,
              refetchIntervalInBackground: !1,
              placeholderData: s,
            }),
            (p[6] = g),
            (p[7] = y),
            (p[8] = c),
            (p[9] = u),
            (p[10] = I),
            (p[11] = m))
          : (m = p[11]),
        (0, i.useQuery)(m)
      );
    },
  ]);
};
