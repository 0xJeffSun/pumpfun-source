// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["s", () => o, "S", () => s]);
  var t = e.i(445242),
    n = e.i(350741),
    r = e.i(690877),
    i = e.i(11124),
    l = e.i(646908);
  let a = new Set([
    "ethereum",
    "bsc",
    "base",
    "monad",
    "robinhood",
    "hyperevm",
    "ink",
    "arc",
    "megaeth",
    "xlayer",
    "polygon",
    "arbitrum",
  ]);
  function o({ address: e, chain: t, sessionAddress: n }) {
    return ["tokenSecurity", e?.toLowerCase() ?? null, t, n];
  }
  function s(e) {
    let s,
      u,
      d,
      c,
      f,
      m = (0, t.c)(17),
      { address: p, chainId: h, enabled: y } = e,
      g = (0, n.s)(),
      v = (0, l.U)(h);
    m[0] !== p
      ? ((s = !!p && /^0x[0-9a-fA-F]{40}$/.test(p)), (m[0] = p), (m[1] = s))
      : (s = m[1]);
    let b = s,
      w = !!v && a.has(v) && b;
    m[2] !== p || m[3] !== h
      ? ((u = { address: p, chainId: h }), (m[2] = p), (m[3] = h), (m[4] = u))
      : (u = m[4]);
    let k = (0, i.e)(u),
      S = o({ address: p, chain: v, sessionAddress: g?.address ?? null }),
      C = (void 0 === y || y) && w,
      A = C && !k.isSettled,
      x = C && k.isSettled;
    (m[5] !== p || m[6] !== v || m[7] !== S
      ? ((d = async (e) => {
          let { signal: t, client: n } = e;
          if (!p || !v) return null;
          let r = (0, i.l)({ client: n, address: p, chain: v, servedKey: S });
          if (r?.legs.security === "ok" && r.security) return r.security;
          if (r?.legs.security === "absent") return null;
          let l = await fetch(
            `/api/relay/rpc/tokens/${encodeURIComponent(p)}/security?chain=${v}`,
            { signal: t },
          );
          if (404 === l.status) return null;
          if (!l.ok) throw Error(`token security lookup failed: ${l.status}`);
          return await l.json();
        }),
        (m[5] = p),
        (m[6] = v),
        (m[7] = S),
        (m[8] = d))
      : (d = m[8]),
      m[9] !== S || m[10] !== x || m[11] !== d
        ? ((c = {
            queryKey: S,
            enabled: x,
            staleTime: 6e5,
            retry: !1,
            queryFn: d,
          }),
          (m[9] = S),
          (m[10] = x),
          (m[11] = d),
          (m[12] = c))
        : (c = m[12]));
    let M = (0, r.useQuery)(c),
      _ = M.isPending || A,
      T = M.isLoading || A;
    return (
      m[13] !== M || m[14] !== _ || m[15] !== T
        ? ((f = { ...M, isPending: _, isLoading: T }),
          (m[13] = M),
          (m[14] = _),
          (m[15] = T),
          (m[16] = f))
        : (f = m[16]),
      f
    );
  }
};
