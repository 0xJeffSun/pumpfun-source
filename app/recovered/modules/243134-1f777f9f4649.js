// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(352386),
    r = e.i(547562),
    i = e.i(595673);
  function l(e) {
    (0, i.L9)({ action: "pane-filter", columnType: "trending", detail: e });
  }
  e.s([
    "f",
    0,
    function (e, i, a) {
      let o,
        s,
        u,
        c,
        d,
        m,
        f = (0, t.c)(19);
      f[0] !== a
        ? ((o = void 0 === a ? {} : a), (f[0] = a), (f[1] = o))
        : (o = f[1]);
      let { routeBoard: p, routePick: h, onRoutePick: g } = o,
        y = (0, r.o)("feed.trending.board"),
        v = (0, r.o)("feed.trending.window");
      f[2] !== e ? ((s = () => e ?? {}), (f[2] = e), (f[3] = s)) : (s = f[3]);
      let [b, w] = (0, n.useState)(s),
        [x, k] = (0, n.useState)(),
        M = g ? h : x,
        C = g ?? k,
        I = i ? e : b,
        S = void 0 === p ? (I?.board ?? y) : M?.route === p ? M.board : p,
        N = I?.window ?? v;
      f[4] !== i
        ? ((u = (e, t) => {
            (i ? i(e) : w((t) => ({ ...t, ...e })), l(t));
          }),
          (f[4] = i),
          (f[5] = u))
        : (u = f[5]);
      let A = u;
      f[6] !== S || f[7] !== A || f[8] !== p || f[9] !== C
        ? ((c = (e) => {
            if (e !== S) {
              if (void 0 === p) return void A({ board: e }, `board=${e}`);
              (C({ route: p, board: e }), l(`board=${e}`));
            }
          }),
          (f[6] = S),
          (f[7] = A),
          (f[8] = p),
          (f[9] = C),
          (f[10] = c))
        : (c = f[10]);
      let j = c;
      f[11] !== A || f[12] !== N
        ? ((d = (e) => {
            e !== N && A({ window: e }, `window=${e}`);
          }),
          (f[11] = A),
          (f[12] = N),
          (f[13] = d))
        : (d = f[13]);
      let _ = d;
      return (
        f[14] !== S || f[15] !== j || f[16] !== _ || f[17] !== N
          ? ((m = { board: S, window: N, setBoard: j, setWindow: _ }),
            (f[14] = S),
            (f[15] = j),
            (f[16] = _),
            (f[17] = N),
            (f[18] = m))
          : (m = f[18]),
        m
      );
    },
  ]);
};
