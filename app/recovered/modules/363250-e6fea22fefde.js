// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    n = e.i(38279),
    i = e.i(60326);
  function o() {
    return (0, i.f)({});
  }
  e.s([
    "f",
    0,
    function (e) {
      let i,
        a = (0, t.c)(2),
        { queryOptions: s } = e;
      return (
        a[0] !== s
          ? ((i = {
              queryFn: o,
              queryKey: n.Q.SOL_PRICE,
              refetchInterval: 12e4,
              staleTime: 6e4,
              ...s,
            }),
            (a[0] = s),
            (a[1] = i))
          : (i = a[1]),
        (0, r.useQuery)(i)
      );
    },
  ]);
};
