// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["D", () => d, "C", () => c]);
  var t = e.i(445242),
    n = e.i(357500),
    r = e.i(574472),
    i = e.i(690877),
    l = e.i(85324),
    a = e.i(11124),
    o = e.i(646908),
    s = e.i(605587);
  let u = (e) => {
    if ("string" != typeof e || !e) return null;
    let t = e.trim().toLowerCase();
    return (0, n.findChainBySlug)(t)?.slug ?? t;
  };
  function d({ mint: e, chainId: t, viewer: n }) {
    return ["evm-top-holders", e.toLowerCase(), u(t), n ?? null];
  }
  function c(e) {
    let n,
      c,
      f,
      m,
      p,
      h,
      y,
      g = (0, t.c)(27),
      { coin: v, enabled: b } = e,
      { address: w } = (0, r.F)(),
      k = "string" == typeof v.chain_id ? v.chain_id : null;
    g[0] !== k || g[1] !== v.mint
      ? ((n = (0, s.N)({ mint: v.mint, chainId: k })),
        (g[0] = k),
        (g[1] = v.mint),
        (g[2] = n))
      : (n = g[2]);
    let S = n;
    g[3] !== k ? ((c = u(k)), (g[3] = k), (g[4] = c)) : (c = g[4]);
    let C = c,
      A = (void 0 === b || b) && S && !!C && !!w;
    g[5] !== k || g[6] !== v.mint
      ? ((f = { address: v.mint, chainId: k }),
        (g[5] = k),
        (g[6] = v.mint),
        (g[7] = f))
      : (f = g[7]);
    let x = (0, a.e)(f),
      M = A && x.isSettled,
      _ = (0, l.q)(3e4, M);
    g[8] !== k || g[9] !== v.mint || g[10] !== w
      ? ((m = d({ mint: v.mint, chainId: k, viewer: w })),
        (g[8] = k),
        (g[9] = v.mint),
        (g[10] = w),
        (g[11] = m))
      : (m = g[11]);
    let T = m;
    (g[12] !== C || g[13] !== k || g[14] !== v.mint || g[15] !== T
      ? ((p = async (e) => {
          let { signal: t, client: n } = e,
            r =
              void 0 === n.getQueryData(T)
                ? (0, a.l)({
                    client: n,
                    address: v.mint,
                    chain: (0, o.U)(k),
                    servedKey: T,
                  })
                : null;
          if (r?.legs.holders === "ok" && r.holders) return r.holders;
          let i = await fetch(
            `/api/relay/rpc/tokens/${encodeURIComponent(v.mint)}/holders?chain=${encodeURIComponent(C ?? "")}&limit=75`,
            { signal: t },
          );
          if (!i.ok) throw Error(`EVM holders lookup failed: ${i.status}`);
          let l = await i.json();
          return Array.isArray(l) ? { holders: l } : l;
        }),
        (g[12] = C),
        (g[13] = k),
        (g[14] = v.mint),
        (g[15] = T),
        (g[16] = p))
      : (p = g[16]),
      g[17] !== M || g[18] !== T || g[19] !== _ || g[20] !== p
        ? ((h = {
            queryKey: T,
            enabled: M,
            staleTime: 3e4,
            refetchInterval: _,
            refetchIntervalInBackground: !1,
            retry: !1,
            queryFn: p,
          }),
          (g[17] = M),
          (g[18] = T),
          (g[19] = _),
          (g[20] = p),
          (g[21] = h))
        : (h = g[21]));
    let D = (0, i.useQuery)(h),
      P = A && !x.isSettled,
      j = D.isPending || P,
      L = D.isLoading || P;
    return (
      g[22] !== A || g[23] !== D || g[24] !== j || g[25] !== L
        ? ((y = { ...D, isPending: j, isLoading: L, available: A }),
          (g[22] = A),
          (g[23] = D),
          (g[24] = j),
          (g[25] = L),
          (g[26] = y))
        : (y = g[26]),
      y
    );
  }
};
