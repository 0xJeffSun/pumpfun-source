// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(["l", () => p, "e", () => h]);
  var t = e.i(445242),
    n = e.i(574472),
    r = e.i(350741),
    i = e.i(690877),
    l = e.i(606933),
    a = e.i(246224),
    o = e.i(620268),
    s = e.i(517182),
    u = e.i(326023),
    d = e.i(170450),
    c = e.i(646908),
    f = e.i(896291),
    m = e.i(605587);
  function p({ client: e, address: t, chain: n, servedKey: r }) {
    if (!n) return null;
    let i = e
        .getQueryCache()
        .findAll({
          queryKey: ["evmTokenDetail", t.toLowerCase(), n],
          exact: !1,
        }),
      l = null;
    for (let e of i) {
      let { status: t, data: n, dataUpdatedAt: r } = e.state;
      !("success" !== t || void 0 === n || Date.now() - r > 3e4) &&
        ((l && l.updatedAt >= r) || (l = { data: n, updatedAt: r }));
    }
    return l && (e.getQueryState(r)?.dataUpdatedAt ?? 0) <= l.updatedAt
      ? l.data
      : null;
  }
  function h(e) {
    let p,
      h,
      v,
      b,
      w,
      k,
      S,
      C,
      A = (0, t.c)(23),
      { address: x, chainId: M } = e,
      _ = (0, r.s)(),
      { address: T } = (0, n.F)(),
      D = (0, l.useQueryClient)(),
      P = (0, d.f)(),
      j = _?.address ?? null;
    (A[0] !== x || A[1] !== M || A[2] !== P || A[3] !== j
      ? ((p = (0, c.U)(M)),
        (h = (v = (0, m.h)(x) && null !== p) && P && null !== j),
        (w = i.useQuery),
        (b = (function ({ address: e, chain: t, sessionAddress: n }) {
          return ["evmTokenDetail", e.toLowerCase(), t, n];
        })({ address: x ?? "", chain: p, sessionAddress: j })),
        (A[0] = x),
        (A[1] = M),
        (A[2] = P),
        (A[3] = j),
        (A[4] = p),
        (A[5] = h),
        (A[6] = v),
        (A[7] = b),
        (A[8] = w))
      : ((p = A[4]), (h = A[5]), (v = A[6]), (b = A[7]), (w = A[8])),
      A[9] !== x ||
      A[10] !== p ||
      A[11] !== M ||
      A[12] !== D ||
      A[13] !== j ||
      A[14] !== T
        ? ((k = async (e) => {
            let { signal: t } = e;
            if (!x || !M || !p || !j)
              throw Error("EVM token detail read ran without its inputs");
            let n = await fetch(
              `/api/relay/rpc/tokens/${encodeURIComponent(x)}/detail?chain=${p}`,
              { signal: t },
            ).catch(y);
            if (!n.ok) throw await (0, f.k)(n);
            let r = await n.json();
            return (
              !(function ({
                queryClient: e,
                detail: t,
                address: n,
                chainId: r,
                chain: i,
                sessionAddress: l,
                viewer: d,
              }) {
                let { token: c, legs: f } = t;
                (e.setQueryData(
                  (0, o.t)({ addresses: [n], chain: i }),
                  new Map([[c.address.toLowerCase(), c]]),
                ),
                  "ok" === f.pool &&
                    t.pool &&
                    c.poolAddress &&
                    e.setQueryData(
                      (0, a.H)({
                        poolAddress: c.poolAddress,
                        chain: i,
                        tokenAddress: n,
                        sessionAddress: l,
                      }).queryKey,
                      t.pool,
                    ));
                let m = (0, s.s)({ address: n, chain: i, sessionAddress: l });
                "ok" === f.security && t.security
                  ? e.setQueryData(m, t.security)
                  : "absent" === f.security && e.setQueryData(m, null);
                let p = (0, u.D)({ mint: n, chainId: r, viewer: d });
                "ok" === f.holders &&
                  t.holders &&
                  d &&
                  void 0 === e.getQueryData(p) &&
                  e.setQueryData(p, t.holders);
              })({
                queryClient: D,
                detail: r,
                address: x,
                chainId: M,
                chain: p,
                sessionAddress: j,
                viewer: T,
              }),
              r
            );
          }),
          (A[9] = x),
          (A[10] = p),
          (A[11] = M),
          (A[12] = D),
          (A[13] = j),
          (A[14] = T),
          (A[15] = k))
        : (k = A[15]),
      A[16] !== h || A[17] !== b || A[18] !== k
        ? ((S = {
            queryKey: b,
            enabled: h,
            staleTime: 3e4,
            refetchOnWindowFocus: !1,
            refetchOnReconnect: !1,
            retry: g,
            retryDelay: 400,
            queryFn: k,
          }),
          (A[16] = h),
          (A[17] = b),
          (A[18] = k),
          (A[19] = S))
        : (S = A[19]));
    let L = w(S),
      F = !v || (P && (null === j || (L.isFetched && !L.isFetching)));
    return (
      A[20] !== L.data || A[21] !== F
        ? ((C = { data: L.data, isSettled: F }),
          (A[20] = L.data),
          (A[21] = F),
          (A[22] = C))
        : (C = A[22]),
      C
    );
  }
  function y(e) {
    throw (0, f.T)(e);
  }
  function g(e, t) {
    return e < 1 && (0, f.t)(t);
  }
};
