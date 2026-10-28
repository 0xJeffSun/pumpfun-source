// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(944410),
    n = e.i(690877),
    i = e.i(38279),
    s = e.i(711902);
  function a() {
    return Date.now();
  }
  (e.s(
    [
      "f",
      0,
      (e) => {
        let o,
          l,
          u = (0, t.c)(10),
          {
            limit: d,
            enabled: c,
            initialData: f,
            queryOptions: m,
          } = void 0 === e ? {} : e,
          p = void 0 === c || c,
          w = (0, r.useLivestreamApiClient)(),
          g = i.Q.BOUNTY_TRENDING_FEED({ limit: d }),
          b = f ? a : void 0;
        return (
          u[0] !== w || u[1] !== d
            ? ((o = async () => {
                let e = {};
                null != d && (e.limit = String(d));
                let t = await w
                  .get("bounties/feed/trending", { searchParams: e })
                  .json();
                return s.T.parse(t);
              }),
              (u[0] = w),
              (u[1] = d),
              (u[2] = o))
            : (o = u[2]),
          u[3] !== p ||
          u[4] !== f ||
          u[5] !== m ||
          u[6] !== g ||
          u[7] !== b ||
          u[8] !== o
            ? ((l = {
                enabled: p,
                queryKey: g,
                staleTime: 3e4,
                refetchOnWindowFocus: !1,
                initialData: f,
                initialDataUpdatedAt: b,
                queryFn: o,
                ...m,
              }),
              (u[3] = p),
              (u[4] = f),
              (u[5] = m),
              (u[6] = g),
              (u[7] = b),
              (u[8] = o),
              (u[9] = l))
            : (l = u[9]),
          (0, n.useQuery)(l)
        );
      },
    ],
    574914,
  ),
    e.s(
      [
        "f",
        0,
        function (e) {
          let { filter: t, view: r } = e;
          return (
            ("bounty" !== t || "mine" !== r) &&
            ("bounty" !== t || "drafts" !== r) &&
            ("submission" !== t || "mine" !== r)
          );
        },
      ],
      65996,
    ));
};
