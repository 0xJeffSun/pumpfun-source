// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    n = e.i(759257);
  e.s([
    "f",
    0,
    (e, i) => {
      let a,
        l,
        s,
        o = (0, t.c)(8);
      o[0] !== e
        ? ((a = ["users", "username-exists", e]), (o[0] = e), (o[1] = a))
        : (a = o[1]);
      let c = a;
      o[2] !== e
        ? ((l = async (t) => {
            let { signal: r } = t;
            return (
              await (0, n.j)()("GET /users/username-exists/{username}", {
                params: { username: e },
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                signal: r,
              })
            ).exists_flag;
          }),
          (o[2] = e),
          (o[3] = l))
        : (l = o[3]);
      let u = i && e.length > 0;
      return (
        o[4] !== c || o[5] !== l || o[6] !== u
          ? ((s = {
              queryKey: c,
              queryFn: l,
              enabled: u,
              retry: 1,
              staleTime: 6e4,
            }),
            (o[4] = c),
            (o[5] = l),
            (o[6] = u),
            (o[7] = s))
          : (s = o[7]),
        (0, r.useQuery)(s)
      );
    },
  ]);
};
