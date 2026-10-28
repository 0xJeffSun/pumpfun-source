// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(690877),
    s = e.i(58904),
    i = e.i(4911),
    r = e.i(399015),
    a = e.i(460261);
  let l = (e, t, n) => ["evmTokenBalance", e, t, n];
  async function u(t, n, i) {
    let { getEvmPublicClient: a } = await e.A(489759),
      l = a(n);
    if ((0, r.G)(t))
      return {
        balanceRaw: await l.getBalance({ address: i }),
        decimals: (0, r.Q)(n),
      };
    let [u, o] = await Promise.all([
      l.readContract({
        address: t,
        abi: s.q,
        functionName: "balanceOf",
        args: [i],
      }),
      l.readContract({ address: t, abi: s.q, functionName: "decimals" }),
    ]);
    return { balanceRaw: u, decimals: Number(o) };
  }
  e.s([
    "r",
    0,
    l,
    "t",
    0,
    u,
    "R",
    0,
    function (e) {
      let s,
        r,
        o,
        d,
        p,
        c,
        m = (0, t.c)(15),
        { mint: y, chainId: f, walletAddress: b } = e;
      return (
        m[0] !== f || m[1] !== y || m[2] !== b
          ? ((s = !!(
              (r = (0, a.b)(f)) &&
              b &&
              (0, i.f)(y) &&
              (0, i.f)(b ?? "")
            )),
            (d = n.useQuery),
            (o = l(y, r, b)),
            (m[0] = f),
            (m[1] = y),
            (m[2] = b),
            (m[3] = s),
            (m[4] = r),
            (m[5] = o),
            (m[6] = d))
          : ((s = m[3]), (r = m[4]), (o = m[5]), (d = m[6])),
        m[7] !== y || m[8] !== r || m[9] !== b
          ? ((p = () => u(y, r, b)),
            (m[7] = y),
            (m[8] = r),
            (m[9] = b),
            (m[10] = p))
          : (p = m[10]),
        m[11] !== s || m[12] !== o || m[13] !== p
          ? ((c = {
              queryKey: o,
              queryFn: p,
              enabled: s,
              refetchInterval: 15e3,
              staleTime: 5e3,
              retry: 1,
            }),
            (m[11] = s),
            (m[12] = o),
            (m[13] = p),
            (m[14] = c))
          : (c = m[14]),
        d(c)
      );
    },
  ]);
};
