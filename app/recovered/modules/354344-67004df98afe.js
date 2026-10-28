// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(944410),
    i = e.i(690877),
    r = e.i(38279),
    a = e.i(711902);
  e.s([
    "f",
    0,
    (e) => {
      let s,
        o,
        u,
        l,
        c = (0, t.c)(11);
      c[0] !== e
        ? ((s = void 0 === e ? {} : e), (c[0] = e), (c[1] = s))
        : (s = c[1]);
      let { walletAddress: m, enabled: d, queryOptions: f } = s,
        b = (0, n.useLivestreamApiClient)(),
        p = (void 0 === d || d) && !!m;
      return (
        c[2] !== m
          ? ((o = r.Q.BOUNTY_RECOVERABLE(m ?? void 0)), (c[2] = m), (c[3] = o))
          : (o = c[3]),
        c[4] !== b
          ? ((u = async () => {
              let e = await b.get("bounties/tasks/me/recoverable").json();
              return a.h.parse(e);
            }),
            (c[4] = b),
            (c[5] = u))
          : (u = c[5]),
        c[6] !== f || c[7] !== p || c[8] !== o || c[9] !== u
          ? ((l = { enabled: p, queryKey: o, queryFn: u, ...f }),
            (c[6] = f),
            (c[7] = p),
            (c[8] = o),
            (c[9] = u),
            (c[10] = l))
          : (l = c[10]),
        (0, i.useQuery)(l)
      );
    },
  ]);
};
