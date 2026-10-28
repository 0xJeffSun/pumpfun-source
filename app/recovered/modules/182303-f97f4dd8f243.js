// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    r = e.i(690877),
    l = e.i(85324),
    i = e.i(346431);
  let a = ["explore", "calls-stats"],
    n = async (e) => {
      let t = await fetch((0, i.L)({ window: e }), {
        cache: "no-store",
        credentials: "same-origin",
        headers: { accept: "application/json" },
      });
      if (!t.ok) throw Error(`explore calls stats answered ${t.status}`);
      let r = (0, i.r)(await t.json());
      if (null === r)
        throw Error("explore calls stats answered an unexpected body");
      return r;
    },
    s = (e) => {
      let i,
        s,
        c,
        o = (0, t.c)(10),
        { window: u, enabled: d, select: f } = e;
      (o[0] !== u ? ((i = [...a, u]), (o[0] = u), (o[1] = i)) : (i = o[1]),
        o[2] !== u ? ((s = () => n(u)), (o[2] = u), (o[3] = s)) : (s = o[3]));
      let m = (0, l.q)(6e4, d);
      return (
        o[4] !== d || o[5] !== f || o[6] !== i || o[7] !== s || o[8] !== m
          ? ((c = {
              queryKey: i,
              queryFn: s,
              staleTime: 6e4,
              refetchInterval: m,
              enabled: d,
              retry: 1,
              select: f,
            }),
            (o[4] = d),
            (o[5] = f),
            (o[6] = i),
            (o[7] = s),
            (o[8] = m),
            (o[9] = c))
          : (c = o[9]),
        (0, r.useQuery)(c)
      );
    };
  e.s(["f", 0, s], 482617);
  var c = e.i(759257),
    o = e.i(358893);
  let u = 70,
    d = ["explore", "live-count"],
    f = (e, t = u) => {
      if (void 0 !== e) return e >= t ? `${t}+` : String(e);
    },
    m = (e) => e.length;
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
      f,
      "n",
      0,
      (e) => {
        let a,
          n,
          p,
          E,
          k,
          S,
          w,
          x = (0, t.c)(19),
          { enabled: y } = e,
          g = (0, o.M)();
        x[0] !== g
          ? ((a = [...d, g]),
            (n = () =>
              (0, c.f)()("GET /coins/currently-live", {
                query: { limit: u, includeNsfw: g },
              })),
            (x[0] = g),
            (x[1] = a),
            (x[2] = n))
          : ((a = x[1]), (n = x[2]));
        let b = (0, l.q)(6e4, y);
        x[3] !== y || x[4] !== a || x[5] !== n || x[6] !== b
          ? ((p = {
              queryKey: a,
              queryFn: n,
              staleTime: 6e4,
              refetchInterval: b,
              enabled: y,
              retry: 1,
              select: m,
            }),
            (x[3] = y),
            (x[4] = a),
            (x[5] = n),
            (x[6] = b),
            (x[7] = p))
          : (p = x[7]);
        let { data: v } = (0, r.useQuery)(p);
        x[8] !== y
          ? ((E = { window: i.W, enabled: y, select: h }),
            (x[8] = y),
            (x[9] = E))
          : (E = x[9]);
        let { data: C } = s(E);
        return (
          x[10] !== v ? ((k = f(v)), (x[10] = v), (x[11] = k)) : (k = x[11]),
          x[12] !== C
            ? ((S = f(C, 99)), (x[12] = C), (x[13] = S))
            : (S = x[13]),
          x[14] !== C || x[15] !== v || x[16] !== k || x[17] !== S
            ? ((w = {
                liveCount: v,
                liveCountLabel: k,
                callsCount: C,
                callsCountLabel: S,
              }),
              (x[14] = C),
              (x[15] = v),
              (x[16] = k),
              (x[17] = S),
              (x[18] = w))
            : (w = x[18]),
          w
        );
      },
    ],
    182303,
  );
};
