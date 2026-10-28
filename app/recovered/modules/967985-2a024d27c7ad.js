// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  var e = t.i(352386),
    r = t.i(213618),
    a = t.i(241175),
    s = t.i(606933),
    n = t.i(921489),
    i = t.i(389623),
    o = t.i(324062),
    l = (t) => {
      let e = t.staleTime;
      t.suspense &&
        ((t.staleTime =
          "function" == typeof e
            ? (...t) => Math.max(e(...t), 1e3)
            : Math.max(e ?? 1e3, 1e3)),
        "number" == typeof t.gcTime && (t.gcTime = Math.max(t.gcTime, 1e3)));
    },
    u = (t, e) => t.isLoading && t.isFetching && !e,
    d = (t, e) => t?.suspense && e.isPending,
    c = (t, e, r) =>
      e.fetchOptimistic(t).catch(() => {
        r.clearReset();
      });
  t.s(["p", 0, l, "X", 0, c, "Q", 0, d, "t", 0, u], 485881);
  var h = t.i(667669);
  t.s(
    [
      "f",
      0,
      function (t, f, p) {
        let m = (0, s.useQueryClient)(p),
          y = (0, o.f)(),
          v = (0, n.f)(),
          g = m.defaultQueryOptions(t);
        (m.getDefaultOptions().queries?._experimental_beforeQuery?.(g),
          (g._optimisticResults = y ? "isRestoring" : "optimistic"),
          l(g),
          (0, i.l)(g, v),
          (0, i.E)(v));
        let b = !m.getQueryCache().get(g.queryHash),
          [w] = e.useState(() => new f(m, g)),
          x = w.getOptimisticResult(g),
          R = !y && !1 !== t.subscribed;
        if (
          (e.useSyncExternalStore(
            e.useCallback(
              (t) => {
                let e = R ? w.subscribe(a.f.batchCalls(t)) : h.z;
                return (w.updateResult(), e);
              },
              [w, R],
            ),
            () => w.getCurrentResult(),
            () => w.getCurrentResult(),
          ),
          e.useEffect(() => {
            w.setOptions(g, { listeners: !1 });
          }, [g, w]),
          d(g, x))
        )
          throw c(g, w, v);
        if (
          (0, i.P)({
            result: x,
            errorResetBoundary: v,
            throwOnError: g.throwOnError,
            query: m.getQueryCache().get(g.queryHash),
            suspense: g.suspense,
          })
        )
          throw x.error;
        if (
          (m.getDefaultOptions().queries?._experimental_afterQuery?.(g, x),
          g.experimental_prefetchInRender && !r.l && u(x, y))
        ) {
          let t = b ? c(g, w, v) : m.getQueryCache().get(g.queryHash)?.promise;
          t?.catch(h.z).finally(() => {
            w.updateResult();
          });
        }
        return g.notifyOnChangeProps ? x : w.trackResult(x);
      },
    ],
    967985,
  );
};
