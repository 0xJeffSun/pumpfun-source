// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(944410),
    n = e.i(690877),
    i = e.i(38279),
    s = e.i(711902),
    a = e.i(779106);
  (e.s(
    [
      "f",
      0,
      (e) => {
        let o,
          l,
          u = (0, t.c)(9),
          {
            limit: d,
            cursor: c,
            enabled: f,
            queryOptions: m,
          } = void 0 === e ? {} : e,
          p = void 0 === f || f,
          w = (0, r.useLivestreamApiClient)(),
          g = (0, a.f)("bounty-drafts"),
          b = i.Q.BOUNTY_MY_DRAFTS({ viewer: g, limit: d, cursor: c });
        return (
          u[0] !== w || u[1] !== c || u[2] !== d
            ? ((o = async () => {
                let e = {};
                (null != d && (e.limit = String(d)),
                  null != c && "" !== c && (e.cursor = c));
                let t = await w
                  .get("bounties/tasks/me/drafts", { searchParams: e })
                  .json();
                return s.I.parse(t);
              }),
              (u[0] = w),
              (u[1] = c),
              (u[2] = d),
              (u[3] = o))
            : (o = u[3]),
          u[4] !== p || u[5] !== m || u[6] !== b || u[7] !== o
            ? ((l = { enabled: p, queryKey: b, queryFn: o, ...m }),
              (u[4] = p),
              (u[5] = m),
              (u[6] = b),
              (u[7] = o),
              (u[8] = l))
            : (l = u[8]),
          (0, n.useQuery)(l)
        );
      },
    ],
    117571,
  ),
    e.s(
      [
        "f",
        0,
        (e) => {
          let o,
            l,
            u = (0, t.c)(9),
            {
              limit: d,
              cursor: c,
              enabled: f,
              queryOptions: m,
            } = void 0 === e ? {} : e,
            p = void 0 === f || f,
            w = (0, r.useLivestreamApiClient)(),
            g = (0, a.f)("bounty-submissions"),
            b = i.Q.MY_BOUNTY_SUBMISSIONS({ viewer: g, limit: d, cursor: c });
          return (
            u[0] !== w || u[1] !== c || u[2] !== d
              ? ((o = async () => {
                  let e = {};
                  (null != d && (e.limit = String(d)),
                    null != c && "" !== c && (e.cursor = c));
                  let t = await w
                    .get("bounties/tasks/me/submissions", { searchParams: e })
                    .json();
                  return s.j.parse(t);
                }),
                (u[0] = w),
                (u[1] = c),
                (u[2] = d),
                (u[3] = o))
              : (o = u[3]),
            u[4] !== p || u[5] !== m || u[6] !== b || u[7] !== o
              ? ((l = { enabled: p, queryKey: b, queryFn: o, ...m }),
                (u[4] = p),
                (u[5] = m),
                (u[6] = b),
                (u[7] = o),
                (u[8] = l))
              : (l = u[8]),
            (0, n.useQuery)(l)
          );
        },
      ],
      384236,
    ));
};
