// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    a = e.i(761459),
    i = e.i(536925),
    l = e.i(759257);
  let r = (e) => void 0 !== e.wallet_label,
    n = (e) => e.userId?.trim() || e.address,
    o = async ({ searchTerm: e, offset: t, limit: a, signal: i }) =>
      (0, l.j)()("GET /users/search-v2", {
        query: {
          offset: t,
          limit: a,
          includeLabelledWallets: !0,
          searchTerm: e || void 0,
        },
        signal: i,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        throwHttpErrors: !1,
        hooks: {
          afterResponse: [
            (t, a, i) => {
              if (!i.ok)
                throw Error(`Failed to search users for the term: ${e}`);
            },
          ],
        },
      });
  function s(e) {
    return !r(e);
  }
  function d(e) {
    return !r(e);
  }
  function c(e) {
    let t = e.pages.flat(),
      a = new Set(),
      i = new Set(),
      l = [];
    for (let e of t) {
      if (r(e)) continue;
      let t = n(e);
      if (t) {
        if (a.has(t)) continue;
        a.add(t);
      }
      (e.address && i.add(e.address), l.push(e));
    }
    let o = [];
    for (let e of t) !r(e) || i.has(e.address) || (i.add(e.address), o.push(e));
    return [...l, ...o];
  }
  e.s([
    "B",
    0,
    2,
    "N",
    0,
    (e) => {
      let l,
        r,
        n,
        u,
        m,
        p,
        h,
        f,
        g = (0, t.c)(28),
        { searchTerm: y, enabled: v, pageSize: b } = e,
        I = void 0 === v || v,
        w = void 0 === b ? 20 : b;
      g[0] !== y ? ((l = y?.trim() ?? ""), (g[0] = y), (g[1] = l)) : (l = g[1]);
      let [C] = (0, i.r)(l, 500),
        k = I && C.length < 2;
      g[2] !== C || g[3] !== I || g[4] !== y
        ? ((r = I && (y?.trim() ?? "") !== C),
          (g[2] = C),
          (g[3] = I),
          (g[4] = y),
          (g[5] = r))
        : (r = g[5]);
      let x = r;
      (g[6] !== C || g[7] !== w
        ? ((n = ["users", "search-v2", C, w]),
          (u = (e) => {
            let { pageParam: t, signal: a } = e;
            return o({ searchTerm: C, offset: t, limit: w, signal: a });
          }),
          (g[6] = C),
          (g[7] = w),
          (g[8] = n),
          (g[9] = u))
        : ((n = g[8]), (u = g[9])),
        g[10] !== w
          ? ((m = (e, t) => {
              let a = (e ?? []).filter(s);
              if (a.length && !(a.length < w)) return t.flat().filter(d).length;
            }),
            (g[10] = w),
            (g[11] = m))
          : (m = g[11]));
      let T = I && !k;
      g[12] !== n || g[13] !== u || g[14] !== m || g[15] !== T
        ? ((p = {
            queryKey: n,
            queryFn: u,
            initialPageParam: 0,
            getNextPageParam: m,
            select: c,
            enabled: T,
            staleTime: 3e4,
            refetchOnWindowFocus: !1,
          }),
          (g[12] = n),
          (g[13] = u),
          (g[14] = m),
          (g[15] = T),
          (g[16] = p))
        : (p = g[16]);
      let _ = (0, a.useInfiniteQuery)(p);
      return (
        g[17] !== _.data
          ? ((h = _.data ?? []), (g[17] = _.data), (g[18] = h))
          : (h = g[18]),
        g[19] !== x ||
        g[20] !== k ||
        g[21] !== _.error ||
        g[22] !== _.fetchNextPage ||
        g[23] !== _.hasNextPage ||
        g[24] !== _.isFetching ||
        g[25] !== _.isFetchingNextPage ||
        g[26] !== h
          ? ((f = {
              users: h,
              loading: _.isFetching,
              error: _.error,
              isSearchTermTooShort: k,
              isDebouncing: x,
              minSearchTermLength: 2,
              fetchNextPage: _.fetchNextPage,
              hasNextPage: _.hasNextPage,
              isFetchingNextPage: _.isFetchingNextPage,
            }),
            (g[19] = x),
            (g[20] = k),
            (g[21] = _.error),
            (g[22] = _.fetchNextPage),
            (g[23] = _.hasNextPage),
            (g[24] = _.isFetching),
            (g[25] = _.isFetchingNextPage),
            (g[26] = h),
            (g[27] = f))
          : (f = g[27]),
        f
      );
    },
  ]);
};
