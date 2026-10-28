// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    l = e.i(85324),
    n = e.i(346431);
  let i = ["explore", "calls-stats"],
    s = async (e) => {
      let t = await fetch((0, n.L)({ window: e }), {
        cache: "no-store",
        credentials: "same-origin",
        headers: { accept: "application/json" },
      });
      if (!t.ok) throw Error(`explore calls stats answered ${t.status}`);
      let r = (0, n.r)(await t.json());
      if (null === r)
        throw Error("explore calls stats answered an unexpected body");
      return r;
    },
    a = (e) => {
      let n,
        a,
        o,
        u = (0, t.c)(10),
        { window: c, enabled: f, select: d } = e;
      (u[0] !== c ? ((n = [...i, c]), (u[0] = c), (u[1] = n)) : (n = u[1]),
        u[2] !== c ? ((a = () => s(c)), (u[2] = c), (u[3] = a)) : (a = u[3]));
      let E = (0, l.q)(6e4, f);
      return (
        u[4] !== f || u[5] !== d || u[6] !== n || u[7] !== a || u[8] !== E
          ? ((o = {
              queryKey: n,
              queryFn: a,
              staleTime: 6e4,
              refetchInterval: E,
              enabled: f,
              retry: 1,
              select: d,
            }),
            (u[4] = f),
            (u[5] = d),
            (u[6] = n),
            (u[7] = a),
            (u[8] = E),
            (u[9] = o))
          : (o = u[9]),
        (0, r.useQuery)(o)
      );
    };
  e.s(["f", 0, a], 482617);
  var o = e.i(759257),
    u = e.i(358893);
  let c = 70,
    f = ["explore", "live-count"],
    d = (e, t = c) => {
      if (void 0 !== e) return e >= t ? `${t}+` : String(e);
    },
    E = (e) => e.length;
  function h(e) {
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
          s,
          m,
          y,
          p,
          S,
          w,
          g = (0, t.c)(19),
          { enabled: k } = e,
          b = (0, u.M)();
        g[0] !== b
          ? ((i = [...f, b]),
            (s = () =>
              (0, o.f)()("GET /coins/currently-live", {
                query: { limit: c, includeNsfw: b },
              })),
            (g[0] = b),
            (g[1] = i),
            (g[2] = s))
          : ((i = g[1]), (s = g[2]));
        let T = (0, l.q)(6e4, k);
        g[3] !== k || g[4] !== i || g[5] !== s || g[6] !== T
          ? ((m = {
              queryKey: i,
              queryFn: s,
              staleTime: 6e4,
              refetchInterval: T,
              enabled: k,
              retry: 1,
              select: E,
            }),
            (g[3] = k),
            (g[4] = i),
            (g[5] = s),
            (g[6] = T),
            (g[7] = m))
          : (m = g[7]);
        let { data: C } = (0, r.useQuery)(m);
        g[8] !== k
          ? ((y = { window: n.W, enabled: k, select: h }),
            (g[8] = k),
            (g[9] = y))
          : (y = g[9]);
        let { data: R } = a(y);
        return (
          g[10] !== C ? ((p = d(C)), (g[10] = C), (g[11] = p)) : (p = g[11]),
          g[12] !== R
            ? ((S = d(R, 99)), (g[12] = R), (g[13] = S))
            : (S = g[13]),
          g[14] !== R || g[15] !== C || g[16] !== p || g[17] !== S
            ? ((w = {
                liveCount: C,
                liveCountLabel: p,
                callsCount: R,
                callsCountLabel: S,
              }),
              (g[14] = R),
              (g[15] = C),
              (g[16] = p),
              (g[17] = S),
              (g[18] = w))
            : (w = g[18]),
          w
        );
      },
    ],
    182303,
  );
};
