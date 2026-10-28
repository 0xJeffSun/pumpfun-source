// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(92245),
    i = e.i(545063),
    n = e.i(761459),
    s = e.i(116458),
    l = e.i(735821);
  function a(e) {
    return e.coinMint;
  }
  function o(e) {
    var t = e.pages;
    let r = new Set(),
      i = [];
    for (let e of t)
      for (let t of e.callouts)
        r.has(t.calloutId) || (r.add(t.calloutId), i.push(t));
    return i;
  }
  function u(e, t, r) {
    return e.next && e.next !== r ? e.next : void 0;
  }
  e.s([
    "f",
    0,
    function (e) {
      let c,
        d,
        f,
        h,
        m,
        p,
        b,
        g = (0, t.c)(40),
        {
          userId: y,
          limit: v,
          sortBy: w,
          sortOrder: _,
          includeMembers: x,
          window: E,
          enabled: N,
        } = e,
        S = void 0 === v ? 30 : v,
        R = void 0 === w ? "TIMESTAMP" : w,
        T = void 0 === _ ? "DESC" : _,
        C = void 0 !== x && x,
        P = (void 0 === N || N) && !!y,
        k = y ?? null,
        F = E ?? null;
      g[0] !== C ||
      g[1] !== S ||
      g[2] !== R ||
      g[3] !== T ||
      g[4] !== k ||
      g[5] !== F
        ? ((c = ["callouts", "by-user", k, S, R, T, C, F]),
          (g[0] = C),
          (g[1] = S),
          (g[2] = R),
          (g[3] = T),
          (g[4] = k),
          (g[5] = F),
          (g[6] = c))
        : (c = g[6]);
      let M = c;
      (g[7] !== C ||
      g[8] !== S ||
      g[9] !== E ||
      g[10] !== R ||
      g[11] !== T ||
      g[12] !== y
        ? ((d = async (e) => {
            let { pageParam: t, signal: r } = e;
            if (!y) throw Error("userId is required");
            let i = await (0, l.H)({
                userId: y,
                limit: S,
                sortBy: R,
                sortOrder: T,
                pageToken: t,
                includeMembers: C,
                window: E,
                signal: r,
              }),
              n = i.callouts ?? [],
              s = i.nextPageToken && n.length >= S ? i.nextPageToken : void 0;
            return { callouts: n, next: s };
          }),
          (g[7] = C),
          (g[8] = S),
          (g[9] = E),
          (g[10] = R),
          (g[11] = T),
          (g[12] = y),
          (g[13] = d))
        : (d = g[13]),
        g[14] !== d || g[15] !== P || g[16] !== M
          ? ((f = {
              enabled: P,
              queryKey: M,
              queryFn: d,
              initialPageParam: void 0,
              getNextPageParam: u,
              staleTime: 6e4,
              gcTime: 3e5,
              refetchOnWindowFocus: !1,
              select: o,
            }),
            (g[14] = d),
            (g[15] = P),
            (g[16] = M),
            (g[17] = f))
          : (f = g[17]));
      let j = (0, n.useInfiniteQuery)(f),
        I = (0, i.U)();
      g[18] !== I ? ((h = (0, r.$)(I)), (g[18] = I), (g[19] = h)) : (h = g[19]);
      let O = h;
      g[20] !== I || g[21] !== y
        ? ((m = (0, r.Z)(I, y)), (g[20] = I), (g[21] = y), (g[22] = m))
        : (m = g[22]);
      let Q = m;
      if (g[23] !== Q || g[24] !== j.data || g[25] !== O) {
        e: {
          let e,
            t = j.data ?? [];
          if (!O || !Q) {
            p = t;
            break e;
          }
          let r = (0, s.L)(O);
          if (0 === r.length) {
            p = t;
            break e;
          }
          let i = new Set(t.map(a));
          g[27] !== i
            ? ((e = (e) => !i.has(e.coinMint)), (g[27] = i), (g[28] = e))
            : (e = g[28]);
          let n = r.filter(e);
          p = 0 === n.length ? t : [...n, ...t];
        }
        ((g[23] = Q), (g[24] = j.data), (g[25] = O), (g[26] = p));
      } else p = g[26];
      let A = p,
        U = j.isLoading,
        q = j.isFetching,
        B = j.isFetchingNextPage,
        L = !!j.hasNextPage;
      return (
        g[29] !== A ||
        g[30] !== j.error ||
        g[31] !== j.fetchNextPage ||
        g[32] !== j.isError ||
        g[33] !== j.isFetchNextPageError ||
        g[34] !== j.isFetching ||
        g[35] !== j.isFetchingNextPage ||
        g[36] !== j.isLoading ||
        g[37] !== j.refetch ||
        g[38] !== L
          ? ((b = {
              callouts: A,
              isLoading: U,
              isFetching: q,
              isFetchingNextPage: B,
              hasNextPage: L,
              fetchNextPage: j.fetchNextPage,
              isError: j.isError,
              isFetchNextPageError: j.isFetchNextPageError,
              error: j.error,
              refetch: j.refetch,
            }),
            (g[29] = A),
            (g[30] = j.error),
            (g[31] = j.fetchNextPage),
            (g[32] = j.isError),
            (g[33] = j.isFetchNextPageError),
            (g[34] = j.isFetching),
            (g[35] = j.isFetchingNextPage),
            (g[36] = j.isLoading),
            (g[37] = j.refetch),
            (g[38] = L),
            (g[39] = b))
          : (b = g[39]),
        b
      );
    },
  ]);
};
