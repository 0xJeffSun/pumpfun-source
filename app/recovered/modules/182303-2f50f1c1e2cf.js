// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    l = e.i(85324),
    a = e.i(346431);
  let i = ["explore", "calls-stats"],
    s = async (e) => {
      let t = await fetch((0, a.L)({ window: e }), {
        cache: "no-store",
        credentials: "same-origin",
        headers: { accept: "application/json" },
      });
      if (!t.ok) throw Error(`explore calls stats answered ${t.status}`);
      let r = (0, a.r)(await t.json());
      if (null === r)
        throw Error("explore calls stats answered an unexpected body");
      return r;
    },
    n = (e) => {
      let a,
        n,
        o,
        u = (0, t.c)(10),
        { window: c, enabled: d, select: m } = e;
      (u[0] !== c ? ((a = [...i, c]), (u[0] = c), (u[1] = a)) : (a = u[1]),
        u[2] !== c ? ((n = () => s(c)), (u[2] = c), (u[3] = n)) : (n = u[3]));
      let f = (0, l.q)(6e4, d);
      return (
        u[4] !== d || u[5] !== m || u[6] !== a || u[7] !== n || u[8] !== f
          ? ((o = {
              queryKey: a,
              queryFn: n,
              staleTime: 6e4,
              refetchInterval: f,
              enabled: d,
              retry: 1,
              select: m,
            }),
            (u[4] = d),
            (u[5] = m),
            (u[6] = a),
            (u[7] = n),
            (u[8] = f),
            (u[9] = o))
          : (o = u[9]),
        (0, r.useQuery)(o)
      );
    };
  e.s(["f", 0, n], 482617);
  var o = e.i(759257),
    u = e.i(358893);
  let c = 70,
    d = ["explore", "live-count"],
    m = (e, t = c) => {
      if (void 0 !== e) return e >= t ? `${t}+` : String(e);
    },
    f = (e) => e.length;
  function p(e) {
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
      m,
      "n",
      0,
      (e) => {
        let i,
          s,
          h,
          g,
          x,
          b,
          w,
          y = (0, t.c)(19),
          { enabled: v } = e,
          E = (0, u.M)();
        y[0] !== E
          ? ((i = [...d, E]),
            (s = () =>
              (0, o.f)()("GET /coins/currently-live", {
                query: { limit: c, includeNsfw: E },
              })),
            (y[0] = E),
            (y[1] = i),
            (y[2] = s))
          : ((i = y[1]), (s = y[2]));
        let k = (0, l.q)(6e4, v);
        y[3] !== v || y[4] !== i || y[5] !== s || y[6] !== k
          ? ((h = {
              queryKey: i,
              queryFn: s,
              staleTime: 6e4,
              refetchInterval: k,
              enabled: v,
              retry: 1,
              select: f,
            }),
            (y[3] = v),
            (y[4] = i),
            (y[5] = s),
            (y[6] = k),
            (y[7] = h))
          : (h = y[7]);
        let { data: C } = (0, r.useQuery)(h);
        y[8] !== v
          ? ((g = { window: a.W, enabled: v, select: p }),
            (y[8] = v),
            (y[9] = g))
          : (g = y[9]);
        let { data: S } = n(g);
        return (
          y[10] !== C ? ((x = m(C)), (y[10] = C), (y[11] = x)) : (x = y[11]),
          y[12] !== S
            ? ((b = m(S, 99)), (y[12] = S), (y[13] = b))
            : (b = y[13]),
          y[14] !== S || y[15] !== C || y[16] !== x || y[17] !== b
            ? ((w = {
                liveCount: C,
                liveCountLabel: x,
                callsCount: S,
                callsCountLabel: b,
              }),
              (y[14] = S),
              (y[15] = C),
              (y[16] = x),
              (y[17] = b),
              (y[18] = w))
            : (w = y[18]),
          w
        );
      },
    ],
    182303,
  );
};
