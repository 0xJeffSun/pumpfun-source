// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    n = e.i(85324),
    l = e.i(346431);
  let i = ["explore", "calls-stats"],
    u = async (e) => {
      let t = await fetch((0, l.L)({ window: e }), {
        cache: "no-store",
        credentials: "same-origin",
        headers: { accept: "application/json" },
      });
      if (!t.ok) throw Error(`explore calls stats answered ${t.status}`);
      let r = (0, l.r)(await t.json());
      if (null === r)
        throw Error("explore calls stats answered an unexpected body");
      return r;
    },
    a = (e) => {
      let l,
        a,
        s,
        o = (0, t.c)(10),
        { window: c, enabled: f, select: d } = e;
      (o[0] !== c ? ((l = [...i, c]), (o[0] = c), (o[1] = l)) : (l = o[1]),
        o[2] !== c ? ((a = () => u(c)), (o[2] = c), (o[3] = a)) : (a = o[3]));
      let h = (0, n.q)(6e4, f);
      return (
        o[4] !== f || o[5] !== d || o[6] !== l || o[7] !== a || o[8] !== h
          ? ((s = {
              queryKey: l,
              queryFn: a,
              staleTime: 6e4,
              refetchInterval: h,
              enabled: f,
              retry: 1,
              select: d,
            }),
            (o[4] = f),
            (o[5] = d),
            (o[6] = l),
            (o[7] = a),
            (o[8] = h),
            (o[9] = s))
          : (s = o[9]),
        (0, r.useQuery)(s)
      );
    };
  e.s(["f", 0, a], 482617);
  var s = e.i(759257),
    o = e.i(358893);
  let c = 70,
    f = ["explore", "live-count"],
    d = (e, t = c) => {
      if (void 0 !== e) return e >= t ? `${t}+` : String(e);
    },
    h = (e) => e.length;
  function E(e) {
    return e.totals.coins;
  }
  e.s(
    [
      "b",
      0,
      99,
      "i",
      0,
      6e4,
      "j",
      0,
      d,
      "n",
      0,
      (e) => {
        let i,
          u,
          y,
          m,
          g,
          S,
          p,
          w = (0, t.c)(19),
          { enabled: k } = e,
          b = (0, o.M)();
        w[0] !== b
          ? ((i = [...f, b]),
            (u = () =>
              (0, s.f)()("GET /coins/currently-live", {
                query: { limit: c, includeNsfw: b },
              })),
            (w[0] = b),
            (w[1] = i),
            (w[2] = u))
          : ((i = w[1]), (u = w[2]));
        let T = (0, n.q)(6e4, k);
        w[3] !== k || w[4] !== i || w[5] !== u || w[6] !== T
          ? ((y = {
              queryKey: i,
              queryFn: u,
              staleTime: 6e4,
              refetchInterval: T,
              enabled: k,
              retry: 1,
              select: h,
            }),
            (w[3] = k),
            (w[4] = i),
            (w[5] = u),
            (w[6] = T),
            (w[7] = y))
          : (y = w[7]);
        let { data: v } = (0, r.useQuery)(y);
        w[8] !== k
          ? ((m = { window: l.W, enabled: k, select: E }),
            (w[8] = k),
            (w[9] = m))
          : (m = w[9]);
        let { data: C } = a(m);
        return (
          w[10] !== v ? ((g = d(v)), (w[10] = v), (w[11] = g)) : (g = w[11]),
          w[12] !== C
            ? ((S = d(C, 99)), (w[12] = C), (w[13] = S))
            : (S = w[13]),
          w[14] !== C || w[15] !== v || w[16] !== g || w[17] !== S
            ? ((p = {
                liveCount: v,
                liveCountLabel: g,
                callsCount: C,
                callsCountLabel: S,
              }),
              (w[14] = C),
              (w[15] = v),
              (w[16] = g),
              (w[17] = S),
              (w[18] = p))
            : (p = w[18]),
          p
        );
      },
    ],
    182303,
  );
};
