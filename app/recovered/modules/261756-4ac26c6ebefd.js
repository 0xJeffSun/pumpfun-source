// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    i = e.i(759257);
  let n = (e) => ["userPortfolioDustFloor", e];
  async function s(e) {
    let t,
      { signal: r } = e;
    return "number" ==
      typeof (t = (
        await (0, i.j)()("GET /user-portfolio/dust-floor", {
          credentials: "include",
          signal: r,
          throwHttpErrors: !1,
          hooks: { afterResponse: [l] },
        })
      ).dustFloorUsd) && t > 0
      ? t
      : null;
  }
  function l(e, t, r) {
    if (!r.ok) throw Error(`Failed to fetch dust floor: ${r.status}`);
  }
  e.s(
    [
      "l",
      0,
      n,
      "$",
      0,
      function (e) {
        let i,
          l,
          a = (0, t.c)(5),
          { address: o, enabled: u } = e;
        a[0] !== o ? ((i = n(o)), (a[0] = o), (a[1] = i)) : (i = a[1]);
        let c = !!o && u;
        return (
          a[2] !== i || a[3] !== c
            ? ((l = { queryKey: i, enabled: c, staleTime: 6e4, queryFn: s }),
              (a[2] = i),
              (a[3] = c),
              (a[4] = l))
            : (l = a[4]),
          (0, r.useQuery)(l)
        );
      },
    ],
    261756,
  );
  var a = e.i(132838),
    o = e.i(606933),
    u = e.i(768359);
  async function c(e) {
    await (0, i.j)()("POST /user-portfolio/dust-floor", {
      body: { valueUsd: e },
      credentials: "include",
      parseJson: f,
      throwHttpErrors: !1,
      hooks: { afterResponse: [d] },
    });
  }
  function d(e, t, r) {
    if (!r.ok) throw Error(`Failed to set dust floor: ${r.status}`);
  }
  function f() {}
  e.s(
    [
      "f",
      0,
      function (e) {
        let r,
          i,
          s,
          l = (0, t.c)(9),
          { address: d, onSuccess: f, onError: h } = e,
          m = (0, o.useQueryClient)();
        return (
          l[0] !== d || l[1] !== f || l[2] !== m
            ? ((r = (e, t) => {
                (d &&
                  (m.setQueryData(n(d), t),
                  m.invalidateQueries({
                    queryKey: u.m.subject(d),
                    refetchType: "none",
                  })),
                  f?.(t));
              }),
              (l[0] = d),
              (l[1] = f),
              (l[2] = m),
              (l[3] = r))
            : (r = l[3]),
          l[4] !== h
            ? ((i = (e, t) => h?.(t)), (l[4] = h), (l[5] = i))
            : (i = l[5]),
          l[6] !== r || l[7] !== i
            ? ((s = { mutationFn: c, onSuccess: r, onError: i }),
              (l[6] = r),
              (l[7] = i),
              (l[8] = s))
            : (s = l[8]),
          (0, a.f)(s)
        );
      },
    ],
    670607,
  );
};
