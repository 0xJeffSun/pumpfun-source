// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(944410),
    r = e.i(254667),
    n = e.i(761459),
    i = e.i(352386),
    a = e.i(85324),
    l = e.i(291313),
    s = e.i(126965),
    o = e.i(234761),
    c = e.i(779106);
  e.s([
    "f",
    0,
    ({ enabled: u = !0, filter: d = "inbox", poll: f = !1 } = {}) => {
      let m = (0, t.useClientServerContract)(),
        p = (0, c.f)("dm-inbox"),
        h = "inbox" === d,
        g = (0, a.q)(3e4, f),
        x = (0, n.useInfiniteQuery)({
          queryKey: (0, s.i)(p, d, o.f),
          enabled: u && null !== p,
          refetchInterval: g,
          initialPageParam: void 0,
          queryFn: async ({ pageParam: t, signal: r }) => {
            let { fetchDmInbox: n } = await e.A(844767);
            return n(m, { limit: o.f, cursor: t, filter: d, signal: r });
          },
          getNextPageParam: (e) => e.nextCursor ?? void 0,
          select: (e) => {
            let t = new Set(),
              r = e.pages
                .flatMap((e) => e.entries)
                .filter(
                  (e) =>
                    !t.has(e.conversationId) && (t.add(e.conversationId), !0),
                );
            return h ? (0, l.f)(r) : r;
          },
        }),
        v = x.error;
      return (
        (0, i.useEffect)(() => {
          v &&
            r.y.error("[useDmInbox] Failed to fetch", {
              filter: d,
              error: v.message,
            });
        }, [v, d]),
        {
          entries: x.data,
          isLoading: x.isLoading,
          isError: x.isError,
          hasNextPage: x.hasNextPage,
          isFetchingNextPage: x.isFetchingNextPage,
          fetchNextPage: x.fetchNextPage,
          refetch: x.refetch,
        }
      );
    },
  ]);
};
