// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(944410),
    r = e.i(690877);
  let s = {
    base: ["coins-raw-batch"],
    batch: (e) => [...s.base, [...e].sort()],
  };
  e.s(
    [
      "f",
      0,
      (e) => {
        var l;
        let a,
          n,
          o,
          c,
          d,
          m,
          u,
          f,
          h,
          x,
          p,
          v,
          g = (0, t.c)(7);
        g[0] !== e
          ? (({ mints: a, ...n } = e), (g[0] = e), (g[1] = a), (g[2] = n))
          : ((a = g[1]), (n = g[2]));
        let b = (0, i.useClientServerApiClient)();
        return (
          g[3] !== b || g[4] !== a || g[5] !== n
            ? ((o = { mints: a, clientServerApi: b, ...n }),
              (g[3] = b),
              (g[4] = a),
              (g[5] = n),
              (g[6] = o))
            : (o = g[6]),
          (l = o),
          (v = (0, t.c)(15))[0] !== l
            ? (({ mints: d, clientServerApi: c, ...m } = l),
              (v[0] = l),
              (v[1] = c),
              (v[2] = d),
              (v[3] = m))
            : ((c = v[1]), (d = v[2]), (m = v[3])),
          v[4] !== d
            ? ((u = [...d].sort()),
              (h = r.useQuery),
              (f = s.batch(u)),
              (v[4] = d),
              (v[5] = u),
              (v[6] = f),
              (v[7] = h))
            : ((u = v[5]), (f = v[6]), (h = v[7])),
          v[8] !== c || v[9] !== u
            ? ((x = async () =>
                0 === u.length
                  ? []
                  : await c
                      .post("coins/raw/batch", { json: { mints: u } })
                      .json()),
              (v[8] = c),
              (v[9] = u),
              (v[10] = x))
            : (x = v[10]),
          v[11] !== m || v[12] !== f || v[13] !== x
            ? ((p = { queryKey: f, queryFn: x, ...m }),
              (v[11] = m),
              (v[12] = f),
              (v[13] = x),
              (v[14] = p))
            : (p = v[14]),
          h(p)
        );
      },
    ],
    458013,
  );
};
