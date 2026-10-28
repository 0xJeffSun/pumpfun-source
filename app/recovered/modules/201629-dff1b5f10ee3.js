// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(690877),
    r = e.i(606933),
    a = e.i(352386),
    i = e.i(998243),
    n = e.i(372743),
    l = e.i(680930),
    s = e.i(849812);
  let o = new Map(),
    d = {},
    u = (e) => e.marketActivity,
    c = () => d;
  e.s([
    "f",
    0,
    (e, d = {}) => {
      let {
          shouldFetch: m = !0,
          enablePolling: p = !1,
          pollingInterval: h = l.t.POLLING_INTERVAL,
          readBack: f = !0,
        } = d,
        g = (0, n.f)(f ? u : c),
        b = (0, r.useQueryClient)(),
        y = (0, a.useMemo)(
          () => Array.from(new Set(e)).filter(Boolean).sort(),
          [e],
        ),
        v = y.join(","),
        w = (0, a.useRef)(0),
        {
          data: k,
          isLoading: C,
          refetch: x,
        } = (0, t.useQuery)({
          queryKey: [l.t.QUERY_KEY, v],
          queryFn: async ({ signal: e, queryKey: t }) => {
            if (0 === y.length) return {};
            let r = ++w.current,
              a =
                b.getQueryState(t)?.data === void 0
                  ? ((e, t) => {
                      let r = Date.now() - l.t.STALE_TIME,
                        a = new Map();
                      for (let i of e
                        .getQueryCache()
                        .findAll({ queryKey: [l.t.QUERY_KEY] })) {
                        let {
                          data: e,
                          dataUpdatedAt: n,
                          isInvalidated: l,
                        } = i.state;
                        if (e && !l && !(n < r))
                          for (let i of t) {
                            let t = e[i];
                            if (!t || (o.get(i) ?? 0) < r) continue;
                            let l = a.get(i);
                            (!l || l.updatedAt < n) &&
                              a.set(i, { activity: t, updatedAt: n });
                          }
                      }
                      let i = {};
                      for (let [e, { activity: t }] of a) i[e] = t;
                      return i;
                    })(b, y)
                  : {},
              i = y.filter((e) => !a[e]),
              d = (0, l.$)(i, l.t.BATCH_SIZE).map((t) =>
                (0, s.g)(t, {
                  intervals: l.t.INTERVALS,
                  metrics: l.t.METRICS,
                  signal: e,
                }),
              ),
              u = await Promise.all(d),
              c = {};
            u.forEach((e) => {
              e && "object" == typeof e && Object.assign(c, e);
            });
            let m = Date.now();
            for (let e of Object.keys(c)) o.set(e, m);
            return (
              r === w.current && Object.keys(c).length > 0 && (0, n.u)(c),
              { ...a, ...c }
            );
          },
          enabled: m && y.length > 0,
          staleTime: l.t.STALE_TIME,
          gcTime: l.t.CACHE_TIME,
          refetchInterval: !!p && h,
          refetchOnMount: !0,
          refetchOnWindowFocus: !1,
          refetchOnReconnect: !1,
        });
      (0, a.useEffect)(() => {
        k && (0, i.f)(() => (0, n.c)(k));
      }, [k]);
      let I = (0, a.useMemo)(() => {
          if (!y.length) return {};
          let e = {};
          return (
            y.forEach((t) => {
              let r = g[t];
              r && (e[t] = r);
            }),
            e
          );
        }, [y, g]),
        _ = (0, a.useRef)({});
      return {
        marketActivity: (0, a.useMemo)(
          () =>
            (0, l.c)(I, _.current) ? _.current : ((_.current = { ...I }), I),
          [I],
        ),
        loading: C,
        refetchMints: (0, a.useCallback)(
          async (e) => {
            e?.length &&
              0 !== (0, l.P)(n.f.getState().marketActivity, e).length &&
              (await b.invalidateQueries({ queryKey: [l.t.QUERY_KEY, v] }),
              await x());
          },
          [b, v, x],
        ),
      };
    },
  ]);
};
