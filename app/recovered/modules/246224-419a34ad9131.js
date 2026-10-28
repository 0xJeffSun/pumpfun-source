// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["H", () => a, "s", () => o]);
  var t = e.i(445242),
    n = e.i(350741),
    r = e.i(690877),
    i = e.i(11124),
    l = e.i(896291);
  function a({
    poolAddress: e,
    chain: t,
    tokenAddress: n,
    sessionAddress: r,
    servesFromDetail: o = !1,
  }) {
    let s = ["multiChainPool", t, e.toLowerCase(), n.toLowerCase(), r];
    return {
      queryKey: s,
      staleTime: 5e3,
      retry: (e, t) => e < 1 && (0, l.t)(t),
      retryDelay: 400,
      queryFn: async ({ signal: r, client: a }) => {
        let u =
          o && a
            ? (0, i.l)({ client: a, address: n, chain: t, servedKey: s })
            : null;
        if (
          u?.legs.pool === "ok" &&
          u.pool &&
          u.token.poolAddress?.toLowerCase() === e.toLowerCase()
        )
          return u.pool;
        let d = `/api/relay/rpc/tokens/pool/${encodeURIComponent(e)}?chain=${t}&tokenAddress=${encodeURIComponent(n)}`,
          c = await fetch(d, { signal: r }).catch((e) => {
            throw (0, l.T)(e);
          });
        if (!c.ok) throw await (0, l.k)(c);
        return await c.json();
      },
    };
  }
  function o(e) {
    let i,
      l,
      o,
      s,
      u,
      d = (0, t.c)(18),
      { poolAddress: c, chain: f, tokenAddress: m, enabled: p } = e,
      h = (0, n.s)(),
      y = !!c && !!f,
      g = c ?? "",
      v = f ?? "solana",
      b = h?.address ?? null;
    d[0] !== g || d[1] !== v || d[2] !== b || d[3] !== m
      ? ((i = a({
          poolAddress: g,
          chain: v,
          tokenAddress: m,
          sessionAddress: b,
          servesFromDetail: !0,
        })),
        (d[0] = g),
        (d[1] = v),
        (d[2] = b),
        (d[3] = m),
        (d[4] = i))
      : (i = d[4]);
    let w = f ?? null;
    (d[5] !== c
      ? ((l = c?.toLowerCase() ?? null), (d[5] = c), (d[6] = l))
      : (l = d[6]),
      d[7] !== m
        ? ((o = m.toLowerCase()), (d[7] = m), (d[8] = o))
        : (o = d[8]));
    let k = h?.address ?? null;
    d[9] !== w || d[10] !== l || d[11] !== o || d[12] !== k
      ? ((s = ["multiChainPool", w, l, o, k]),
        (d[9] = w),
        (d[10] = l),
        (d[11] = o),
        (d[12] = k),
        (d[13] = s))
      : (s = d[13]);
    let S = (void 0 === p || p) && y;
    return (
      d[14] !== s || d[15] !== S || d[16] !== i
        ? ((u = { ...i, queryKey: s, enabled: S }),
          (d[14] = s),
          (d[15] = S),
          (d[16] = i),
          (d[17] = u))
        : (u = d[17]),
      (0, r.useQuery)(u)
    );
  }
};
