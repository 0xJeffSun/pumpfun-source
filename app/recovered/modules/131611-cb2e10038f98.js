// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    l = e.i(761459),
    n = e.i(795663),
    i = e.i(406920),
    a = e.i(759257),
    r = e.i(541710),
    s = e.i(646908),
    o = e.i(720772),
    d = e.i(605587);
  let u = ({ mint: e, authorAddress: t }) => [
    "callouts",
    "author-trades",
    e,
    t,
  ];
  function c(e) {
    return e.pagination.hasMore && e.pagination.nextCursor
      ? e.pagination.nextCursor
      : void 0;
  }
  e.s([
    "H",
    0,
    u,
    "Q",
    0,
    function (e) {
      let m,
        f,
        p,
        h,
        g,
        x,
        b,
        y,
        w,
        v = (0, t.c)(40),
        {
          coin: _,
          authorAddress: I,
          enabled: N,
          includeTransfers: j,
          pageSize: k,
        } = e,
        M = void 0 === N || N,
        C = void 0 !== j && j,
        U = void 0 === k ? 20 : k;
      v[0] !== _
        ? ((m = _ && (0, d.N)({ mint: _.mint, chainId: _.chain_id })),
          (v[0] = _),
          (v[1] = m))
        : (m = v[1]);
      let S = !!m,
        P = !!(_ && (0, s.e)(_)),
        A = (0, r.l)(),
        F = !!(_ && (0, s.a)(_) && (0, r.M)(A)),
        T = P ? s.J : F ? s.d : void 0;
      v[2] !== I || v[3] !== S
        ? ((f = S && !!I && !(0, d.h)(I)), (v[2] = I), (v[3] = S), (v[4] = f))
        : (f = v[4]);
      let z = f,
        W = M && z;
      v[5] !== I || v[6] !== W
        ? ((p = { solAddress: I, enabled: W }),
          (v[5] = I),
          (v[6] = W),
          (v[7] = p))
        : (p = v[7]);
      let D = (0, n.O)(p),
        E = z ? (D.data ?? null) : (I ?? null),
        B = z && D.isPending,
        L = z && D.isError && null == D.data,
        O = z && D.isSuccess && null == D.data;
      v[8] !== I ||
      v[9] !== _?.mint ||
      v[10] !== E ||
      v[11] !== C ||
      v[12] !== S ||
      v[13] !== T ||
      v[14] !== U
        ? ((h = [
            ...u({ mint: _?.mint ?? null, authorAddress: I ?? null }),
            S ? E : null,
            T ?? null,
            C,
            U,
          ]),
          (v[8] = I),
          (v[9] = _?.mint),
          (v[10] = E),
          (v[11] = C),
          (v[12] = S),
          (v[13] = T),
          (v[14] = U),
          (v[15] = h))
        : (h = v[15]);
      let H = h,
        $ = !!(_ && I && M) && !B && !L && !O;
      (v[16] !== I ||
      v[17] !== _ ||
      v[18] !== E ||
      v[19] !== C ||
      v[20] !== S ||
      v[21] !== T ||
      v[22] !== U
        ? ((g = async (e) => {
            let { pageParam: t, signal: l } = e;
            if (!_ || !I)
              throw Error("Missing coin or author for trade history");
            let n = S ? (0, o.c)(_) : void 0,
              r = await (0, a.j)()("GET /user-trades/{id}", {
                params: { id: E ?? I },
                query: {
                  mint: _.mint,
                  limit: U,
                  cursor: t,
                  types: C && !T ? ["trades", "transfers"] : void 0,
                  chainId: n,
                  chain: T,
                },
                signal: l,
              });
            return {
              trades: (r.trades ?? []).map((e) => ({
                ...(0, i.r)(e, { program: _.program }),
                kind: e.kind,
              })),
              pagination: {
                hasMore: !!r.nextCursor,
                nextCursor: r.nextCursor ?? void 0,
              },
            };
          }),
          (v[16] = I),
          (v[17] = _),
          (v[18] = E),
          (v[19] = C),
          (v[20] = S),
          (v[21] = T),
          (v[22] = U),
          (v[23] = g))
        : (g = v[23]),
        v[24] !== g || v[25] !== H || v[26] !== $
          ? ((x = {
              queryKey: H,
              enabled: $,
              initialPageParam: void 0,
              queryFn: g,
              getNextPageParam: c,
              staleTime: 3e4,
            }),
            (v[24] = g),
            (v[25] = H),
            (v[26] = $),
            (v[27] = x))
          : (x = v[27]));
      let R = (0, l.useInfiniteQuery)(x);
      if (v[28] !== R.data?.pages) {
        let e = new Map();
        for (let t of R.data?.pages ?? [])
          for (let l of t.trades) {
            let t = `${l.tx}:${l.kind ?? "trade"}`;
            e.has(t) || e.set(t, l);
          }
        ((b = Array.from(e.values())), (v[28] = R.data?.pages), (v[29] = b));
      } else b = v[29];
      let V = b,
        q = R.isLoading || B,
        K = R.isError || L,
        Q = !!R.hasNextPage;
      return (
        v[30] !== R
          ? ((y = () => {
              R.hasNextPage && !R.isFetchingNextPage && R.fetchNextPage();
            }),
            (v[30] = R),
            (v[31] = y))
          : (y = v[31]),
        v[32] !== E ||
        v[33] !== R.isFetchingNextPage ||
        v[34] !== q ||
        v[35] !== K ||
        v[36] !== Q ||
        v[37] !== y ||
        v[38] !== V
          ? ((w = {
              trades: V,
              actorAddress: E,
              isLoading: q,
              isError: K,
              hasNextPage: Q,
              isFetchingNextPage: R.isFetchingNextPage,
              fetchNextPage: y,
            }),
            (v[32] = E),
            (v[33] = R.isFetchingNextPage),
            (v[34] = q),
            (v[35] = K),
            (v[36] = Q),
            (v[37] = y),
            (v[38] = V),
            (v[39] = w))
          : (w = v[39]),
        w
      );
    },
  ]);
};
