// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(254667),
    a = e.i(975982),
    i = e.i(132838),
    n = e.i(935258),
    l = e.i(606933),
    s = e.i(796654),
    o = e.i(503630),
    d = e.i(605587),
    u = e.i(26077),
    c = e.i(680930);
  let m = (e) => (0, a.k)(e) || (0, d.h)(e);
  async function p(e, t) {
    let a = (e ?? []).filter(m);
    if (0 === a.length) return {};
    let i = t?.intervals || c.t.INTERVALS,
      n = t?.metrics || c.t.METRICS;
    try {
      let e = await (0, s.f)(`${(0, o.V)()}/coins/market-activity/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addresses: a, intervals: i, metrics: n }),
        signal: t?.signal,
      });
      if (!e.ok)
        throw Error(`Failed to fetch batch market activity: ${e.status}`);
      return (0, u.f)(await e.json());
    } catch (e) {
      return (
        r.y.warn("Error fetching market activity", {
          error: e,
          mintCount: a.length,
        }),
        {}
      );
    }
  }
  function h(e) {
    return e.data;
  }
  function f(e) {
    return e.isPending;
  }
  function g(e) {
    return e.error;
  }
  function b(e) {
    return { data: e.map(h), pending: e.some(f), error: e.find(g)?.error };
  }
  e.s([
    "g",
    0,
    p,
    "l",
    0,
    m,
    "b",
    0,
    (e, r) => {
      let a,
        s,
        o,
        d,
        u,
        h,
        f,
        g,
        y,
        v = (0, t.c)(31);
      v[0] !== r
        ? ((a = void 0 === r ? {} : r), (v[0] = r), (v[1] = a))
        : (a = v[1]);
      let { shouldFetch: w, enablePolling: k, pollingInterval: C } = a,
        x = void 0 === w || w,
        I = void 0 !== k && k,
        _ = void 0 === C ? c.t.POLLING_INTERVAL : C,
        T = (0, l.useQueryClient)();
      v[2] !== e
        ? ((s = (0, c.$)(e.filter(m), c.t.BATCH_SIZE)), (v[2] = e), (v[3] = s))
        : (s = v[3]);
      let E = s;
      if (v[4] !== I || v[5] !== E || v[6] !== _ || v[7] !== x) {
        let e;
        (v[9] !== I || v[10] !== _ || v[11] !== x
          ? ((e = (e) => ({
              queryKey: [c.t.QUERY_KEY, e.join(",")],
              queryFn: () =>
                p(e, { intervals: c.t.INTERVALS, metrics: c.t.METRICS }),
              enabled: x && e.length > 0,
              staleTime: c.t.STALE_TIME,
              gcTime: c.t.CACHE_TIME,
              refetchOnMount: !1,
              refetchOnWindowFocus: !1,
              refetchOnReconnect: !1,
              retry: !1,
              refetchInterval: !!I && _,
            })),
            (v[9] = I),
            (v[10] = _),
            (v[11] = x),
            (v[12] = e))
          : (e = v[12]),
          (o = E.map(e)),
          (v[4] = I),
          (v[5] = E),
          (v[6] = _),
          (v[7] = x),
          (v[8] = o));
      } else o = v[8];
      let S = o;
      v[13] !== S
        ? ((d = { queries: S, combine: b }), (v[13] = S), (v[14] = d))
        : (d = v[14]);
      let A = (0, n.f)(d);
      v[15] !== T
        ? ((u = {
            mutationFn: async (e) => {
              let t = await p(e, {
                intervals: c.t.INTERVALS,
                metrics: c.t.METRICS,
              });
              return (T.setQueryData([c.t.QUERY_KEY, e.join(",")], t), t);
            },
          }),
          (v[15] = T),
          (v[16] = u))
        : (u = v[16]);
      let { mutate: V } = (0, i.f)(u);
      v[17] !== E || v[18] !== V
        ? ((h = (e) => {
            if (!e.length) return;
            let t = Array.from(new Set(e));
            E.filter((e) => e.some((e) => t.includes(e))).forEach((e) => V(e));
          }),
          (v[17] = E),
          (v[18] = V),
          (v[19] = h))
        : (h = v[19]);
      let L = h;
      v[20] !== A.data
        ? ((f = (0, c.d)(A.data)), (v[20] = A.data), (v[21] = f))
        : (f = v[21]);
      let P = f,
        j = A.pending,
        N = A.error;
      v[22] !== E || v[23] !== T
        ? ((g = () => {
            E.length &&
              E.forEach((e) => {
                T.invalidateQueries({ queryKey: [c.t.QUERY_KEY, e.join(",")] });
              });
          }),
          (v[22] = E),
          (v[23] = T),
          (v[24] = g))
        : (g = v[24]);
      let U = g;
      return (
        v[25] !== N || v[26] !== U || v[27] !== j || v[28] !== P || v[29] !== L
          ? ((y = {
              marketActivity: P,
              loading: j,
              error: N,
              refetchMints: L,
              invalidateCache: U,
            }),
            (v[25] = N),
            (v[26] = U),
            (v[27] = j),
            (v[28] = P),
            (v[29] = L),
            (v[30] = y))
          : (y = v[30]),
        y
      );
    },
  ]);
};
