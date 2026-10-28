// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(254667),
    n = e.i(975982),
    l = e.i(132838),
    i = e.i(935258),
    u = e.i(606933),
    a = e.i(796654),
    s = e.i(503630),
    o = e.i(605587),
    c = e.i(26077),
    f = e.i(680930);
  let d = (e) => (0, n.k)(e) || (0, o.h)(e);
  async function h(e, t) {
    let n = (e ?? []).filter(d);
    if (0 === n.length) return {};
    let l = t?.intervals || f.t.INTERVALS,
      i = t?.metrics || f.t.METRICS;
    try {
      let e = await (0, a.f)(`${(0, s.V)()}/coins/market-activity/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addresses: n, intervals: l, metrics: i }),
        signal: t?.signal,
      });
      if (!e.ok)
        throw Error(`Failed to fetch batch market activity: ${e.status}`);
      return (0, c.f)(await e.json());
    } catch (e) {
      return (
        r.y.warn("Error fetching market activity", {
          error: e,
          mintCount: n.length,
        }),
        {}
      );
    }
  }
  function E(e) {
    return e.data;
  }
  function y(e) {
    return e.isPending;
  }
  function m(e) {
    return e.error;
  }
  function g(e) {
    return { data: e.map(E), pending: e.some(y), error: e.find(m)?.error };
  }
  e.s([
    "g",
    0,
    h,
    "l",
    0,
    d,
    "b",
    0,
    (e, r) => {
      let n,
        a,
        s,
        o,
        c,
        E,
        y,
        m,
        S,
        p = (0, t.c)(31);
      p[0] !== r
        ? ((n = void 0 === r ? {} : r), (p[0] = r), (p[1] = n))
        : (n = p[1]);
      let { shouldFetch: w, enablePolling: k, pollingInterval: b } = n,
        T = void 0 === w || w,
        v = void 0 !== k && k,
        C = void 0 === b ? f.t.POLLING_INTERVAL : b,
        A = (0, u.useQueryClient)();
      p[2] !== e
        ? ((a = (0, f.$)(e.filter(d), f.t.BATCH_SIZE)), (p[2] = e), (p[3] = a))
        : (a = p[3]);
      let R = a;
      if (p[4] !== v || p[5] !== R || p[6] !== C || p[7] !== T) {
        let e;
        (p[9] !== v || p[10] !== C || p[11] !== T
          ? ((e = (e) => ({
              queryKey: [f.t.QUERY_KEY, e.join(",")],
              queryFn: () =>
                h(e, { intervals: f.t.INTERVALS, metrics: f.t.METRICS }),
              enabled: T && e.length > 0,
              staleTime: f.t.STALE_TIME,
              gcTime: f.t.CACHE_TIME,
              refetchOnMount: !1,
              refetchOnWindowFocus: !1,
              refetchOnReconnect: !1,
              retry: !1,
              refetchInterval: !!v && C,
            })),
            (p[9] = v),
            (p[10] = C),
            (p[11] = T),
            (p[12] = e))
          : (e = p[12]),
          (s = R.map(e)),
          (p[4] = v),
          (p[5] = R),
          (p[6] = C),
          (p[7] = T),
          (p[8] = s));
      } else s = p[8];
      let I = s;
      p[13] !== I
        ? ((o = { queries: I, combine: g }), (p[13] = I), (p[14] = o))
        : (o = p[14]);
      let O = (0, i.f)(o);
      p[15] !== A
        ? ((c = {
            mutationFn: async (e) => {
              let t = await h(e, {
                intervals: f.t.INTERVALS,
                metrics: f.t.METRICS,
              });
              return (A.setQueryData([f.t.QUERY_KEY, e.join(",")], t), t);
            },
          }),
          (p[15] = A),
          (p[16] = c))
        : (c = p[16]);
      let { mutate: M } = (0, l.f)(c);
      p[17] !== R || p[18] !== M
        ? ((E = (e) => {
            if (!e.length) return;
            let t = Array.from(new Set(e));
            R.filter((e) => e.some((e) => t.includes(e))).forEach((e) => M(e));
          }),
          (p[17] = R),
          (p[18] = M),
          (p[19] = E))
        : (E = p[19]);
      let L = E;
      p[20] !== O.data
        ? ((y = (0, f.d)(O.data)), (p[20] = O.data), (p[21] = y))
        : (y = p[21]);
      let N = y,
        j = O.pending,
        D = O.error;
      p[22] !== R || p[23] !== A
        ? ((m = () => {
            R.length &&
              R.forEach((e) => {
                A.invalidateQueries({ queryKey: [f.t.QUERY_KEY, e.join(",")] });
              });
          }),
          (p[22] = R),
          (p[23] = A),
          (p[24] = m))
        : (m = p[24]);
      let P = m;
      return (
        p[25] !== D || p[26] !== P || p[27] !== j || p[28] !== N || p[29] !== L
          ? ((S = {
              marketActivity: N,
              loading: j,
              error: D,
              refetchMints: L,
              invalidateCache: P,
            }),
            (p[25] = D),
            (p[26] = P),
            (p[27] = j),
            (p[28] = N),
            (p[29] = L),
            (p[30] = S))
          : (S = p[30]),
        S
      );
    },
  ]);
};
