// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(761459),
    a = e.i(536925),
    i = e.i(759257);
  let n = (e) => void 0 !== e.wallet_label,
    l = (e) => e.userId?.trim() || e.address,
    s = async ({ searchTerm: e, offset: t, limit: r, signal: a }) =>
      (0, i.j)()("GET /users/search-v2", {
        query: {
          offset: t,
          limit: r,
          includeLabelledWallets: !0,
          searchTerm: e || void 0,
        },
        signal: a,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        throwHttpErrors: !1,
        hooks: {
          afterResponse: [
            (t, r, a) => {
              if (!a.ok)
                throw Error(`Failed to search users for the term: ${e}`);
            },
          ],
        },
      });
  function o(e) {
    return !n(e);
  }
  function d(e) {
    return !n(e);
  }
  function u(e) {
    let t = e.pages.flat(),
      r = new Set(),
      a = new Set(),
      i = [];
    for (let e of t) {
      if (n(e)) continue;
      let t = l(e);
      if (t) {
        if (r.has(t)) continue;
        r.add(t);
      }
      (e.address && a.add(e.address), i.push(e));
    }
    let s = [];
    for (let e of t) !n(e) || a.has(e.address) || (a.add(e.address), s.push(e));
    return [...i, ...s];
  }
  e.s([
    "B",
    0,
    2,
    "N",
    0,
    (e) => {
      let i,
        n,
        l,
        c,
        m,
        p,
        h,
        f,
        g = (0, t.c)(28),
        { searchTerm: b, enabled: y, pageSize: v } = e,
        w = void 0 === y || y,
        k = void 0 === v ? 20 : v;
      g[0] !== b ? ((i = b?.trim() ?? ""), (g[0] = b), (g[1] = i)) : (i = g[1]);
      let [C] = (0, a.r)(i, 500),
        x = w && C.length < 2;
      g[2] !== C || g[3] !== w || g[4] !== b
        ? ((n = w && (b?.trim() ?? "") !== C),
          (g[2] = C),
          (g[3] = w),
          (g[4] = b),
          (g[5] = n))
        : (n = g[5]);
      let I = n;
      (g[6] !== C || g[7] !== k
        ? ((l = ["users", "search-v2", C, k]),
          (c = (e) => {
            let { pageParam: t, signal: r } = e;
            return s({ searchTerm: C, offset: t, limit: k, signal: r });
          }),
          (g[6] = C),
          (g[7] = k),
          (g[8] = l),
          (g[9] = c))
        : ((l = g[8]), (c = g[9])),
        g[10] !== k
          ? ((m = (e, t) => {
              let r = (e ?? []).filter(o);
              if (r.length && !(r.length < k)) return t.flat().filter(d).length;
            }),
            (g[10] = k),
            (g[11] = m))
          : (m = g[11]));
      let _ = w && !x;
      g[12] !== l || g[13] !== c || g[14] !== m || g[15] !== _
        ? ((p = {
            queryKey: l,
            queryFn: c,
            initialPageParam: 0,
            getNextPageParam: m,
            select: u,
            enabled: _,
            staleTime: 3e4,
            refetchOnWindowFocus: !1,
          }),
          (g[12] = l),
          (g[13] = c),
          (g[14] = m),
          (g[15] = _),
          (g[16] = p))
        : (p = g[16]);
      let T = (0, r.useInfiniteQuery)(p);
      return (
        g[17] !== T.data
          ? ((h = T.data ?? []), (g[17] = T.data), (g[18] = h))
          : (h = g[18]),
        g[19] !== I ||
        g[20] !== x ||
        g[21] !== T.error ||
        g[22] !== T.fetchNextPage ||
        g[23] !== T.hasNextPage ||
        g[24] !== T.isFetching ||
        g[25] !== T.isFetchingNextPage ||
        g[26] !== h
          ? ((f = {
              users: h,
              loading: T.isFetching,
              error: T.error,
              isSearchTermTooShort: x,
              isDebouncing: I,
              minSearchTermLength: 2,
              fetchNextPage: T.fetchNextPage,
              hasNextPage: T.hasNextPage,
              isFetchingNextPage: T.isFetchingNextPage,
            }),
            (g[19] = I),
            (g[20] = x),
            (g[21] = T.error),
            (g[22] = T.fetchNextPage),
            (g[23] = T.hasNextPage),
            (g[24] = T.isFetching),
            (g[25] = T.isFetchingNextPage),
            (g[26] = h),
            (g[27] = f))
          : (f = g[27]),
        f
      );
    },
  ]);
};
