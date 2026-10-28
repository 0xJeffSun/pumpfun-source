// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    n = e.i(606933),
    i = e.i(695705);
  let l = (e) => (e?.some((e) => (0, i.z)(e.status)) ? 1e4 : 6e4);
  e.s(
    [
      "f",
      0,
      {
        staleTime: 5e3,
        refetchInterval: (e) => l(e.state.data),
        refetchIntervalInBackground: !1,
        refetchOnWindowFocus: !0,
      },
      "I",
      0,
      l,
    ],
    897453,
  );
  var a = e.i(85324),
    o = e.i(339179),
    s = e.i(485759);
  e.s(
    [
      "T",
      0,
      5e3,
      "s",
      0,
      (e) => {
        let i,
          u,
          d,
          c,
          p,
          f,
          m = (0, t.c)(14),
          { owner: g, enabled: h } = e,
          y = void 0 === h || h,
          _ = (0, n.useQueryClient)();
        m[0] !== y || m[1] !== g || m[2] !== _
          ? ((u = s.f.byOwner(g ?? "")),
            (i = y && !!g),
            (d = a.q),
            (c = l(_.getQueryData(u))),
            (m[0] = y),
            (m[1] = g),
            (m[2] = _),
            (m[3] = i),
            (m[4] = u),
            (m[5] = d),
            (m[6] = c))
          : ((i = m[3]), (u = m[4]), (d = m[5]), (c = m[6]));
        let v = d(c, i);
        return (
          m[7] !== g
            ? ((p = () => (0, o.n)({ owner: g ?? "" })), (m[7] = g), (m[8] = p))
            : (p = m[8]),
          m[9] !== i || m[10] !== u || m[11] !== v || m[12] !== p
            ? ((f = {
                queryKey: u,
                queryFn: p,
                enabled: i,
                staleTime: 5e3,
                retry: !1,
                refetchInterval: v,
                refetchIntervalInBackground: !1,
                refetchOnWindowFocus: !0,
              }),
              (m[9] = i),
              (m[10] = u),
              (m[11] = v),
              (m[12] = p),
              (m[13] = f))
            : (f = m[13]),
          (0, r.useQuery)(f)
        );
      },
    ],
    280740,
  );
};
