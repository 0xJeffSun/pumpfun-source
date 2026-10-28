// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(761459),
    l = e.i(536925),
    a = e.i(759257);
  let i = (e) => void 0 !== e.wallet_label,
    s = (e) => e.userId?.trim() || e.address,
    n = async ({ searchTerm: e, offset: t, limit: r, signal: l }) =>
      (0, a.j)()("GET /users/search-v2", {
        query: {
          offset: t,
          limit: r,
          includeLabelledWallets: !0,
          searchTerm: e || void 0,
        },
        signal: l,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        throwHttpErrors: !1,
        hooks: {
          afterResponse: [
            (t, r, l) => {
              if (!l.ok)
                throw Error(`Failed to search users for the term: ${e}`);
            },
          ],
        },
      });
  function o(e) {
    return !i(e);
  }
  function u(e) {
    return !i(e);
  }
  function c(e) {
    let t = e.pages.flat(),
      r = new Set(),
      l = new Set(),
      a = [];
    for (let e of t) {
      if (i(e)) continue;
      let t = s(e);
      if (t) {
        if (r.has(t)) continue;
        r.add(t);
      }
      (e.address && l.add(e.address), a.push(e));
    }
    let n = [];
    for (let e of t) !i(e) || l.has(e.address) || (l.add(e.address), n.push(e));
    return [...a, ...n];
  }
  e.s([
    "B",
    0,
    2,
    "N",
    0,
    (e) => {
      let a,
        i,
        s,
        d,
        m,
        f,
        p,
        h,
        g = (0, t.c)(28),
        { searchTerm: x, enabled: b, pageSize: w } = e,
        y = void 0 === b || b,
        v = void 0 === w ? 20 : w;
      g[0] !== x ? ((a = x?.trim() ?? ""), (g[0] = x), (g[1] = a)) : (a = g[1]);
      let [E] = (0, l.r)(a, 500),
        k = y && E.length < 2;
      g[2] !== E || g[3] !== y || g[4] !== x
        ? ((i = y && (x?.trim() ?? "") !== E),
          (g[2] = E),
          (g[3] = y),
          (g[4] = x),
          (g[5] = i))
        : (i = g[5]);
      let C = i;
      (g[6] !== E || g[7] !== v
        ? ((s = ["users", "search-v2", E, v]),
          (d = (e) => {
            let { pageParam: t, signal: r } = e;
            return n({ searchTerm: E, offset: t, limit: v, signal: r });
          }),
          (g[6] = E),
          (g[7] = v),
          (g[8] = s),
          (g[9] = d))
        : ((s = g[8]), (d = g[9])),
        g[10] !== v
          ? ((m = (e, t) => {
              let r = (e ?? []).filter(o);
              if (r.length && !(r.length < v)) return t.flat().filter(u).length;
            }),
            (g[10] = v),
            (g[11] = m))
          : (m = g[11]));
      let S = y && !k;
      g[12] !== s || g[13] !== d || g[14] !== m || g[15] !== S
        ? ((f = {
            queryKey: s,
            queryFn: d,
            initialPageParam: 0,
            getNextPageParam: m,
            select: c,
            enabled: S,
            staleTime: 3e4,
            refetchOnWindowFocus: !1,
          }),
          (g[12] = s),
          (g[13] = d),
          (g[14] = m),
          (g[15] = S),
          (g[16] = f))
        : (f = g[16]);
      let I = (0, r.useInfiniteQuery)(f);
      return (
        g[17] !== I.data
          ? ((p = I.data ?? []), (g[17] = I.data), (g[18] = p))
          : (p = g[18]),
        g[19] !== C ||
        g[20] !== k ||
        g[21] !== I.error ||
        g[22] !== I.fetchNextPage ||
        g[23] !== I.hasNextPage ||
        g[24] !== I.isFetching ||
        g[25] !== I.isFetchingNextPage ||
        g[26] !== p
          ? ((h = {
              users: p,
              loading: I.isFetching,
              error: I.error,
              isSearchTermTooShort: k,
              isDebouncing: C,
              minSearchTermLength: 2,
              fetchNextPage: I.fetchNextPage,
              hasNextPage: I.hasNextPage,
              isFetchingNextPage: I.isFetchingNextPage,
            }),
            (g[19] = C),
            (g[20] = k),
            (g[21] = I.error),
            (g[22] = I.fetchNextPage),
            (g[23] = I.hasNextPage),
            (g[24] = I.isFetching),
            (g[25] = I.isFetchingNextPage),
            (g[26] = p),
            (g[27] = h))
          : (h = g[27]),
        h
      );
    },
  ]);
};
