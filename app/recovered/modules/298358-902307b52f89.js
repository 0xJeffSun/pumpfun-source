// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    n = e.i(38279),
    i = e.i(759257);
  async function l(e) {
    let { fetchOptions: t } = e;
    return (0, i.j)()("GET /referral/me", {
      query: {},
      credentials: "include",
      ...t,
      hooks: {
        afterResponse: [
          (e, t, r) => {
            if (!r.ok)
              throw Error(`Failed to fetch referral state (${r.status})`);
          },
        ],
      },
    });
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let i,
          a,
          o,
          s = (0, t.c)(8),
          { queryOptions: u, userAddress: d } = e,
          c = !!d;
        return (
          s[0] !== d
            ? ((i = () => l({ userAddress: d })),
              (a = n.Q.REFERRAL_ME({ userAddress: d })),
              (s[0] = d),
              (s[1] = i),
              (s[2] = a))
            : ((i = s[1]), (a = s[2])),
          s[3] !== u || s[4] !== c || s[5] !== i || s[6] !== a
            ? ((o = {
                enabled: c,
                queryFn: i,
                queryKey: a,
                staleTime: 3e5,
                ...u,
              }),
              (s[3] = u),
              (s[4] = c),
              (s[5] = i),
              (s[6] = a),
              (s[7] = o))
            : (o = s[7]),
          (0, r.useQuery)(o)
        );
      },
    ],
    298358,
  );
};
