// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    a = e.i(254667),
    i = e.i(975982),
    l = e.i(132838),
    r = e.i(935258),
    n = e.i(606933),
    o = e.i(796654),
    s = e.i(503630),
    d = e.i(605587),
    c = e.i(26077),
    u = e.i(680930);
  let m = (e) => (0, i.k)(e) || (0, d.h)(e);
  async function p(e, t) {
    let i = (e ?? []).filter(m);
    if (0 === i.length) return {};
    let l = t?.intervals || u.t.INTERVALS,
      r = t?.metrics || u.t.METRICS;
    try {
      let e = await (0, o.f)(`${(0, s.V)()}/coins/market-activity/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addresses: i, intervals: l, metrics: r }),
        signal: t?.signal,
      });
      if (!e.ok)
        throw Error(`Failed to fetch batch market activity: ${e.status}`);
      return (0, c.f)(await e.json());
    } catch (e) {
      return (
        a.y.warn("Error fetching market activity", {
          error: e,
          mintCount: i.length,
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
  function y(e) {
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
    (e, a) => {
      let i,
        o,
        s,
        d,
        c,
        h,
        f,
        g,
        v,
        b = (0, t.c)(31);
      b[0] !== a
        ? ((i = void 0 === a ? {} : a), (b[0] = a), (b[1] = i))
        : (i = b[1]);
      let { shouldFetch: I, enablePolling: w, pollingInterval: C } = i,
        k = void 0 === I || I,
        x = void 0 !== w && w,
        T = void 0 === C ? u.t.POLLING_INTERVAL : C,
        _ = (0, n.useQueryClient)();
      b[2] !== e
        ? ((o = (0, u.$)(e.filter(m), u.t.BATCH_SIZE)), (b[2] = e), (b[3] = o))
        : (o = b[3]);
      let E = o;
      if (b[4] !== x || b[5] !== E || b[6] !== T || b[7] !== k) {
        let e;
        (b[9] !== x || b[10] !== T || b[11] !== k
          ? ((e = (e) => ({
              queryKey: [u.t.QUERY_KEY, e.join(",")],
              queryFn: () =>
                p(e, { intervals: u.t.INTERVALS, metrics: u.t.METRICS }),
              enabled: k && e.length > 0,
              staleTime: u.t.STALE_TIME,
              gcTime: u.t.CACHE_TIME,
              refetchOnMount: !1,
              refetchOnWindowFocus: !1,
              refetchOnReconnect: !1,
              retry: !1,
              refetchInterval: !!x && T,
            })),
            (b[9] = x),
            (b[10] = T),
            (b[11] = k),
            (b[12] = e))
          : (e = b[12]),
          (s = E.map(e)),
          (b[4] = x),
          (b[5] = E),
          (b[6] = T),
          (b[7] = k),
          (b[8] = s));
      } else s = b[8];
      let N = s;
      b[13] !== N
        ? ((d = { queries: N, combine: y }), (b[13] = N), (b[14] = d))
        : (d = b[14]);
      let S = (0, r.f)(d);
      b[15] !== _
        ? ((c = {
            mutationFn: async (e) => {
              let t = await p(e, {
                intervals: u.t.INTERVALS,
                metrics: u.t.METRICS,
              });
              return (_.setQueryData([u.t.QUERY_KEY, e.join(",")], t), t);
            },
          }),
          (b[15] = _),
          (b[16] = c))
        : (c = b[16]);
      let { mutate: M } = (0, l.f)(c);
      b[17] !== E || b[18] !== M
        ? ((h = (e) => {
            if (!e.length) return;
            let t = Array.from(new Set(e));
            E.filter((e) => e.some((e) => t.includes(e))).forEach((e) => M(e));
          }),
          (b[17] = E),
          (b[18] = M),
          (b[19] = h))
        : (h = b[19]);
      let P = h;
      b[20] !== S.data
        ? ((f = (0, u.d)(S.data)), (b[20] = S.data), (b[21] = f))
        : (f = b[21]);
      let U = f,
        A = S.pending,
        j = S.error;
      b[22] !== E || b[23] !== _
        ? ((g = () => {
            E.length &&
              E.forEach((e) => {
                _.invalidateQueries({ queryKey: [u.t.QUERY_KEY, e.join(",")] });
              });
          }),
          (b[22] = E),
          (b[23] = _),
          (b[24] = g))
        : (g = b[24]);
      let V = g;
      return (
        b[25] !== j || b[26] !== V || b[27] !== A || b[28] !== U || b[29] !== P
          ? ((v = {
              marketActivity: U,
              loading: A,
              error: j,
              refetchMints: P,
              invalidateCache: V,
            }),
            (b[25] = j),
            (b[26] = V),
            (b[27] = A),
            (b[28] = U),
            (b[29] = P),
            (b[30] = v))
          : (v = b[30]),
        v
      );
    },
  ]);
};
