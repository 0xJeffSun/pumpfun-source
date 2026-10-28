// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    i = e.i(759257),
    n = e.i(582453);
  let s = (e) => ["userPortfolioSpamMints", e],
    l = (e) => new Set(e);
  function a(e) {
    return (0, n.f)(e.coinMint);
  }
  function o(e, t, r) {
    if (!r.ok) throw Error(`Failed to fetch spam positions: ${r.status}`);
  }
  e.s([
    "F",
    0,
    s,
    "m",
    0,
    (e, t) => e?.includes((0, n.f)(t)) ?? !1,
    "y",
    0,
    function (e) {
      let n,
        u,
        c,
        d = (0, t.c)(8),
        { address: f, enabled: h } = e;
      d[0] !== f ? ((n = s(f)), (d[0] = f), (d[1] = n)) : (n = d[1]);
      let m = !!f && h;
      return (
        d[2] !== f
          ? ((u = async (e) => {
              let { signal: t } = e;
              return [
                ...new Set(
                  (
                    await (0, i.j)()("GET /user-portfolio/{userId}", {
                      params: { userId: f ?? "" },
                      query: {
                        filter: "open",
                        spamOnly: !0,
                        sortBy: "POSITION_SIZE",
                        page: 0,
                        pageSize: 200,
                      },
                      credentials: "include",
                      signal: t,
                      throwHttpErrors: !1,
                      hooks: { afterResponse: [o] },
                    })
                  ).positions.map(a),
                ),
              ].sort();
            }),
            (d[2] = f),
            (d[3] = u))
          : (u = d[3]),
        d[4] !== n || d[5] !== m || d[6] !== u
          ? ((c = {
              queryKey: n,
              enabled: m,
              staleTime: 3e4,
              queryFn: u,
              select: l,
            }),
            (d[4] = n),
            (d[5] = m),
            (d[6] = u),
            (d[7] = c))
          : (c = d[7]),
        (0, r.useQuery)(c)
      );
    },
    "r",
    0,
    (e, t) => {
      let r = (0, n.f)(t);
      return e?.includes(r) ? e : [...(e ?? []), r];
    },
    "Y",
    0,
    (e, t) => {
      let r = (0, n.f)(t);
      return e?.includes(r) ? e.filter((e) => e !== r) : e;
    },
  ]);
};
