// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(149502);
  var t = e.i(445242),
    r = e.i(254667),
    i = e.i(985526),
    l = e.i(755793),
    a = e.i(352386),
    n = e.i(159985),
    o = e.i(237237),
    s = e.i(987425),
    c = e.i(225233);
  e.s([
    "f",
    0,
    function (e) {
      let d,
        u,
        m,
        p,
        h,
        f,
        y,
        b,
        v,
        g = (0, t.c)(18),
        { mint: x, chainId: C, onTrade: k, isEnabled: w } = e,
        S = void 0 === w || w,
        _ = (0, a.useRef)(k);
      (g[0] !== k
        ? ((d = () => {
            _.current = k;
          }),
          (u = [k]),
          (g[0] = k),
          (g[1] = d),
          (g[2] = u))
        : ((d = g[1]), (u = g[2])),
        (0, a.useEffect)(d, u),
        g[3] !== C ? ((m = (0, s.f)(C)), (g[3] = C), (g[4] = m)) : (m = g[4]));
      let P = m;
      g[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((p = "wss://multichain-prod.nats.realtime.pump.fun".startsWith(
            "wss",
          )),
          (g[5] = p))
        : (p = g[5]);
      let N = !!p,
        T = S && !!P && N && !!x;
      (g[6] !== P || g[7] !== C || g[8] !== S || g[9] !== x
        ? ((h = () => {
            S &&
              P &&
              !N &&
              r.y.warn(
                "[useMultichainTradeEventSubscription] NEXT_PUBLIC_MULTICHAIN_NATS_URL is unset — live EVM trades are disabled for this page",
                { mint: x, chainId: C },
              );
          }),
          (f = [S, P, N, x, C]),
          (g[6] = P),
          (g[7] = C),
          (g[8] = S),
          (g[9] = x),
          (g[10] = h),
          (g[11] = f))
        : ((h = g[10]), (f = g[11])),
        (0, a.useEffect)(h, f),
        g[12] !== x
          ? ((y = (0, c.f)(x)), (g[12] = x), (g[13] = y))
          : (y = g[13]));
      let M = y,
        j = T ? `${o._}.${P}.${M}` : "";
      (g[14] !== x || g[15] !== j
        ? ((v = () => {
            if (!j) return;
            let e = (0, l.i)(i.N.Multichain, j, (e) => {
              e?.trade && _.current((0, n.Y)(e, x));
            });
            return () => {
              (0, l.V)(i.N.Multichain, e);
            };
          }),
          (b = [j, x]),
          (g[14] = x),
          (g[15] = j),
          (g[16] = b),
          (g[17] = v))
        : ((b = g[16]), (v = g[17])),
        (0, a.useEffect)(v, b));
    },
  ]);
};
