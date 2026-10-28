// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(690877),
    a = e.i(606933),
    i = e.i(352386),
    l = e.i(998243),
    r = e.i(372743),
    n = e.i(680930),
    o = e.i(849812);
  let s = new Map(),
    d = {},
    c = (e) => e.marketActivity,
    u = () => d;
  e.s([
    "f",
    0,
    (e, d = {}) => {
      let {
          shouldFetch: m = !0,
          enablePolling: p = !1,
          pollingInterval: h = n.t.POLLING_INTERVAL,
          readBack: f = !0,
        } = d,
        g = (0, r.f)(f ? c : u),
        y = (0, a.useQueryClient)(),
        v = (0, i.useMemo)(
          () => Array.from(new Set(e)).filter(Boolean).sort(),
          [e],
        ),
        b = v.join(","),
        I = (0, i.useRef)(0),
        {
          data: w,
          isLoading: C,
          refetch: k,
        } = (0, t.useQuery)({
          queryKey: [n.t.QUERY_KEY, b],
          queryFn: async ({ signal: e, queryKey: t }) => {
            if (0 === v.length) return {};
            let a = ++I.current,
              i =
                y.getQueryState(t)?.data === void 0
                  ? ((e, t) => {
                      let a = Date.now() - n.t.STALE_TIME,
                        i = new Map();
                      for (let l of e
                        .getQueryCache()
                        .findAll({ queryKey: [n.t.QUERY_KEY] })) {
                        let {
                          data: e,
                          dataUpdatedAt: r,
                          isInvalidated: n,
                        } = l.state;
                        if (e && !n && !(r < a))
                          for (let l of t) {
                            let t = e[l];
                            if (!t || (s.get(l) ?? 0) < a) continue;
                            let n = i.get(l);
                            (!n || n.updatedAt < r) &&
                              i.set(l, { activity: t, updatedAt: r });
                          }
                      }
                      let l = {};
                      for (let [e, { activity: t }] of i) l[e] = t;
                      return l;
                    })(y, v)
                  : {},
              l = v.filter((e) => !i[e]),
              d = (0, n.$)(l, n.t.BATCH_SIZE).map((t) =>
                (0, o.g)(t, {
                  intervals: n.t.INTERVALS,
                  metrics: n.t.METRICS,
                  signal: e,
                }),
              ),
              c = await Promise.all(d),
              u = {};
            c.forEach((e) => {
              e && "object" == typeof e && Object.assign(u, e);
            });
            let m = Date.now();
            for (let e of Object.keys(u)) s.set(e, m);
            return (
              a === I.current && Object.keys(u).length > 0 && (0, r.u)(u),
              { ...i, ...u }
            );
          },
          enabled: m && v.length > 0,
          staleTime: n.t.STALE_TIME,
          gcTime: n.t.CACHE_TIME,
          refetchInterval: !!p && h,
          refetchOnMount: !0,
          refetchOnWindowFocus: !1,
          refetchOnReconnect: !1,
        });
      (0, i.useEffect)(() => {
        w && (0, l.f)(() => (0, r.c)(w));
      }, [w]);
      let x = (0, i.useMemo)(() => {
          if (!v.length) return {};
          let e = {};
          return (
            v.forEach((t) => {
              let a = g[t];
              a && (e[t] = a);
            }),
            e
          );
        }, [v, g]),
        T = (0, i.useRef)({});
      return {
        marketActivity: (0, i.useMemo)(
          () =>
            (0, n.c)(x, T.current) ? T.current : ((T.current = { ...x }), x),
          [x],
        ),
        loading: C,
        refetchMints: (0, i.useCallback)(
          async (e) => {
            e?.length &&
              0 !== (0, n.P)(r.f.getState().marketActivity, e).length &&
              (await y.invalidateQueries({ queryKey: [n.t.QUERY_KEY, b] }),
              await k());
          },
          [y, b, k],
        ),
      };
    },
  ]);
};
