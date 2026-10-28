// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(944410),
    i = e.i(761459),
    r = e.i(38279),
    a = e.i(711902),
    s = e.i(779106);
  function o(e) {
    return e.nextCursor ?? void 0;
  }
  e.s([
    "f",
    0,
    (e) => {
      let u,
        l,
        c = (0, t.c)(7),
        { limit: m, enabled: d } = void 0 === e ? {} : e,
        f = void 0 === d || d,
        b = (0, n.useLivestreamApiClient)(),
        p = (0, s.f)("bounty-submissions"),
        y = r.Q.MY_BOUNTY_SUBMISSIONS_INFINITE({ viewer: p, limit: m });
      return (
        c[0] !== b || c[1] !== m
          ? ((u = async (e) => {
              let { pageParam: t } = e,
                n = {};
              (null != m && (n.limit = String(m)),
                null != t && "" !== t && (n.cursor = t));
              let i = await b
                .get("bounties/tasks/me/submissions", { searchParams: n })
                .json();
              return a.j.parse(i);
            }),
            (c[0] = b),
            (c[1] = m),
            (c[2] = u))
          : (u = c[2]),
        c[3] !== f || c[4] !== y || c[5] !== u
          ? ((l = {
              enabled: f,
              queryKey: y,
              initialPageParam: void 0,
              queryFn: u,
              getNextPageParam: o,
            }),
            (c[3] = f),
            (c[4] = y),
            (c[5] = u),
            (c[6] = l))
          : (l = c[6]),
        (0, i.useInfiniteQuery)(l)
      );
    },
  ]);
};
