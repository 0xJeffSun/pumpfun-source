// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(690877),
    r = e.i(606933),
    n = e.i(352386),
    l = e.i(998243),
    i = e.i(372743),
    u = e.i(680930),
    a = e.i(849812);
  let s = new Map(),
    o = {},
    c = (e) => e.marketActivity,
    f = () => o;
  e.s([
    "f",
    0,
    (e, o = {}) => {
      let {
          shouldFetch: d = !0,
          enablePolling: h = !1,
          pollingInterval: E = u.t.POLLING_INTERVAL,
          readBack: y = !0,
        } = o,
        m = (0, i.f)(y ? c : f),
        g = (0, r.useQueryClient)(),
        S = (0, n.useMemo)(
          () => Array.from(new Set(e)).filter(Boolean).sort(),
          [e],
        ),
        p = S.join(","),
        w = (0, n.useRef)(0),
        {
          data: k,
          isLoading: b,
          refetch: T,
        } = (0, t.useQuery)({
          queryKey: [u.t.QUERY_KEY, p],
          queryFn: async ({ signal: e, queryKey: t }) => {
            if (0 === S.length) return {};
            let r = ++w.current,
              n =
                g.getQueryState(t)?.data === void 0
                  ? ((e, t) => {
                      let r = Date.now() - u.t.STALE_TIME,
                        n = new Map();
                      for (let l of e
                        .getQueryCache()
                        .findAll({ queryKey: [u.t.QUERY_KEY] })) {
                        let {
                          data: e,
                          dataUpdatedAt: i,
                          isInvalidated: u,
                        } = l.state;
                        if (e && !u && !(i < r))
                          for (let l of t) {
                            let t = e[l];
                            if (!t || (s.get(l) ?? 0) < r) continue;
                            let u = n.get(l);
                            (!u || u.updatedAt < i) &&
                              n.set(l, { activity: t, updatedAt: i });
                          }
                      }
                      let l = {};
                      for (let [e, { activity: t }] of n) l[e] = t;
                      return l;
                    })(g, S)
                  : {},
              l = S.filter((e) => !n[e]),
              o = (0, u.$)(l, u.t.BATCH_SIZE).map((t) =>
                (0, a.g)(t, {
                  intervals: u.t.INTERVALS,
                  metrics: u.t.METRICS,
                  signal: e,
                }),
              ),
              c = await Promise.all(o),
              f = {};
            c.forEach((e) => {
              e && "object" == typeof e && Object.assign(f, e);
            });
            let d = Date.now();
            for (let e of Object.keys(f)) s.set(e, d);
            return (
              r === w.current && Object.keys(f).length > 0 && (0, i.u)(f),
              { ...n, ...f }
            );
          },
          enabled: d && S.length > 0,
          staleTime: u.t.STALE_TIME,
          gcTime: u.t.CACHE_TIME,
          refetchInterval: !!h && E,
          refetchOnMount: !0,
          refetchOnWindowFocus: !1,
          refetchOnReconnect: !1,
        });
      (0, n.useEffect)(() => {
        k && (0, l.f)(() => (0, i.c)(k));
      }, [k]);
      let v = (0, n.useMemo)(() => {
          if (!S.length) return {};
          let e = {};
          return (
            S.forEach((t) => {
              let r = m[t];
              r && (e[t] = r);
            }),
            e
          );
        }, [S, m]),
        C = (0, n.useRef)({});
      return {
        marketActivity: (0, n.useMemo)(
          () =>
            (0, u.c)(v, C.current) ? C.current : ((C.current = { ...v }), v),
          [v],
        ),
        loading: b,
        refetchMints: (0, n.useCallback)(
          async (e) => {
            e?.length &&
              0 !== (0, u.P)(i.f.getState().marketActivity, e).length &&
              (await g.invalidateQueries({ queryKey: [u.t.QUERY_KEY, p] }),
              await T());
          },
          [g, p, T],
        ),
      };
    },
  ]);
};
