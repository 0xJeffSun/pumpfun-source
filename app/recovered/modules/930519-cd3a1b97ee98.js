// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(149502);
  var t = e.i(445242),
    i = e.i(254667),
    r = e.i(985526),
    a = e.i(755793),
    n = e.i(352386),
    l = e.i(159985),
    o = e.i(237237),
    s = e.i(987425),
    c = e.i(225233);
  e.s([
    "f",
    0,
    function (e) {
      let d,
        m,
        x,
        u,
        p,
        b,
        f,
        h,
        g,
        y = (0, t.c)(18),
        { mint: v, chainId: _, onTrade: w, isEnabled: N } = e,
        k = void 0 === N || N,
        j = (0, n.useRef)(w);
      (y[0] !== w
        ? ((d = () => {
            j.current = w;
          }),
          (m = [w]),
          (y[0] = w),
          (y[1] = d),
          (y[2] = m))
        : ((d = y[1]), (m = y[2])),
        (0, n.useEffect)(d, m),
        y[3] !== _ ? ((x = (0, s.f)(_)), (y[3] = _), (y[4] = x)) : (x = y[4]));
      let S = x;
      y[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((u = "wss://multichain-prod.nats.realtime.pump.fun".startsWith(
            "wss",
          )),
          (y[5] = u))
        : (u = y[5]);
      let C = !!u,
        z = k && !!S && C && !!v;
      (y[6] !== S || y[7] !== _ || y[8] !== k || y[9] !== v
        ? ((p = () => {
            k &&
              S &&
              !C &&
              i.y.warn(
                "[useMultichainTradeEventSubscription] NEXT_PUBLIC_MULTICHAIN_NATS_URL is unset — live EVM trades are disabled for this page",
                { mint: v, chainId: _ },
              );
          }),
          (b = [k, S, C, v, _]),
          (y[6] = S),
          (y[7] = _),
          (y[8] = k),
          (y[9] = v),
          (y[10] = p),
          (y[11] = b))
        : ((p = y[10]), (b = y[11])),
        (0, n.useEffect)(p, b),
        y[12] !== v
          ? ((f = (0, c.f)(v)), (y[12] = v), (y[13] = f))
          : (f = y[13]));
      let $ = f,
        F = z ? `${o._}.${S}.${$}` : "";
      (y[14] !== v || y[15] !== F
        ? ((g = () => {
            if (!F) return;
            let e = (0, a.i)(r.N.Multichain, F, (e) => {
              e?.trade && j.current((0, l.Y)(e, v));
            });
            return () => {
              (0, a.V)(r.N.Multichain, e);
            };
          }),
          (h = [F, v]),
          (y[14] = v),
          (y[15] = F),
          (y[16] = h),
          (y[17] = g))
        : ((h = y[16]), (g = y[17])),
        (0, n.useEffect)(g, h));
    },
  ]);
};
