// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(149502);
  var t = e.i(445242),
    l = e.i(254667),
    r = e.i(985526),
    n = e.i(755793),
    i = e.i(352386),
    a = e.i(159985),
    s = e.i(237237),
    o = e.i(987425),
    c = e.i(225233);
  e.s([
    "f",
    0,
    function (e) {
      let d,
        u,
        m,
        f,
        x,
        h,
        p,
        g,
        b,
        v = (0, t.c)(18),
        { mint: y, chainId: _, onTrade: j, isEnabled: w } = e,
        N = void 0 === w || w,
        k = (0, i.useRef)(j);
      (v[0] !== j
        ? ((d = () => {
            k.current = j;
          }),
          (u = [j]),
          (v[0] = j),
          (v[1] = d),
          (v[2] = u))
        : ((d = v[1]), (u = v[2])),
        (0, i.useEffect)(d, u),
        v[3] !== _ ? ((m = (0, o.f)(_)), (v[3] = _), (v[4] = m)) : (m = v[4]));
      let S = m;
      v[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((f = "wss://multichain-prod.nats.realtime.pump.fun".startsWith(
            "wss",
          )),
          (v[5] = f))
        : (f = v[5]);
      let C = !!f,
        M = N && !!S && C && !!y;
      (v[6] !== S || v[7] !== _ || v[8] !== N || v[9] !== y
        ? ((x = () => {
            N &&
              S &&
              !C &&
              l.y.warn(
                "[useMultichainTradeEventSubscription] NEXT_PUBLIC_MULTICHAIN_NATS_URL is unset — live EVM trades are disabled for this page",
                { mint: y, chainId: _ },
              );
          }),
          (h = [N, S, C, y, _]),
          (v[6] = S),
          (v[7] = _),
          (v[8] = N),
          (v[9] = y),
          (v[10] = x),
          (v[11] = h))
        : ((x = v[10]), (h = v[11])),
        (0, i.useEffect)(x, h),
        v[12] !== y
          ? ((p = (0, c.f)(y)), (v[12] = y), (v[13] = p))
          : (p = v[13]));
      let I = p,
        P = M ? `${s._}.${S}.${I}` : "";
      (v[14] !== y || v[15] !== P
        ? ((b = () => {
            if (!P) return;
            let e = (0, n.i)(r.N.Multichain, P, (e) => {
              e?.trade && k.current((0, a.Y)(e, y));
            });
            return () => {
              (0, n.V)(r.N.Multichain, e);
            };
          }),
          (g = [P, y]),
          (v[14] = y),
          (v[15] = P),
          (v[16] = g),
          (v[17] = b))
        : ((g = v[16]), (b = v[17])),
        (0, i.useEffect)(b, g));
    },
  ]);
};
