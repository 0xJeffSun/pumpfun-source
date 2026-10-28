// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    i = e.i(528600),
    r = e.i(690877),
    n = e.i(759257),
    a = e.i(779106);
  let o = (e) => ["viewer-following", e],
    s = (e) => ({
      queryKey: o(e),
      queryFn: async ({ signal: t }) => {
        if (!e) return [];
        let r = await (0, n.j)()("GET /following/v3/following/{userId}", {
          params: { userId: e },
          query: { limit: 1e3 },
          signal: t,
          throwHttpErrors: !1,
          hooks: {
            afterResponse: [
              async (e, t, r) => {
                if (!r.ok)
                  throw Error(
                    `Failed to fetch viewer following list: ${r.status}`,
                  );
                if (!(await r.clone().text()).trim())
                  throw new i.M({ reason: "empty_body" });
              },
            ],
          },
          parseJson: (e) => {
            let t;
            try {
              t = JSON.parse(e);
            } catch {
              throw new i.M({ reason: "invalid_json" });
            }
            if (!Array.isArray(t)) throw new i.M({ reason: "invalid_shape" });
            return t;
          },
        });
        if (null === r) throw new i.M({ reason: "invalid_shape" });
        return r;
      },
      staleTime: 6e4,
      gcTime: 3e5,
      refetchOnWindowFocus: (e) => "error" === e.state.status,
    }),
    l = (e) => {
      let t = new Set();
      for (let i of e ?? []) {
        "string" == typeof i?.address &&
          i.address &&
          t.add(i.address.toLowerCase());
        let e = i?.user_id ?? i?.userId;
        "string" == typeof e && e && t.add(e.toLowerCase());
      }
      return t;
    };
  e.s([
    "G",
    0,
    function (e) {
      let i,
        n,
        o,
        u,
        c = (0, t.c)(9),
        d = (0, a.f)("viewer-following");
      (c[0] !== d ? ((i = s(d)), (c[0] = d), (c[1] = i)) : (i = c[1]),
        c[2] !== i
          ? ((n = { ...i, enabled: !1 }), (c[2] = i), (c[3] = n))
          : (n = c[3]));
      let f = (0, r.useQuery)(n);
      c[4] !== f.data
        ? ((o = l(f.data)), (c[4] = f.data), (c[5] = o))
        : (o = c[5]);
      let m = o;
      if (d && e && f.isSuccess)
        return (
          c[6] !== m || c[7] !== e
            ? ((u = m.has(e.toLowerCase())), (c[6] = m), (c[7] = e), (c[8] = u))
            : (u = c[8]),
          u
        );
    },
    "o",
    0,
    function (e) {
      let i,
        n,
        o,
        u,
        c,
        d = (0, t.c)(15),
        f = (0, a.f)("viewer-following"),
        m = (e?.enabled ?? !0) && !!f;
      (d[0] !== f ? ((i = s(f)), (d[0] = f), (d[1] = i)) : (i = d[1]),
        d[2] !== m || d[3] !== i
          ? ((n = { ...i, enabled: m }), (d[2] = m), (d[3] = i), (d[4] = n))
          : (n = d[4]));
      let h = (0, r.useQuery)(n);
      d[5] !== h.data
        ? ((o = l(h.data)), (d[5] = h.data), (d[6] = o))
        : (o = d[6]);
      let p = o,
        E = m && h.isSuccess,
        v = h.isError;
      return (
        d[7] !== p || d[8] !== E
          ? ((u = (e) => {
              if (E && e) return p.has(e.toLowerCase());
            }),
            (d[7] = p),
            (d[8] = E),
            (d[9] = u))
          : (u = d[9]),
        d[10] !== p || d[11] !== v || d[12] !== E || d[13] !== u
          ? ((c = { ready: E, isError: v, followingSet: p, isFollowing: u }),
            (d[10] = p),
            (d[11] = v),
            (d[12] = E),
            (d[13] = u),
            (d[14] = c))
          : (c = d[14]),
        c
      );
    },
    "j",
    0,
    o,
    "Q",
    0,
    s,
  ]);
};
