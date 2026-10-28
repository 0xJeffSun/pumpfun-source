// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(149502);
  var t = e.i(445242),
    i = e.i(254667),
    s = e.i(985526),
    a = e.i(755793),
    r = e.i(352386),
    n = e.i(159985),
    l = e.i(237237),
    o = e.i(987425),
    c = e.i(225233);
  e.s([
    "f",
    0,
    function (e) {
      let d,
        x,
        h,
        u,
        f,
        b,
        p,
        m,
        y,
        v = (0, t.c)(18),
        { mint: g, chainId: w, onTrade: _, isEnabled: N } = e,
        A = void 0 === N || N,
        I = (0, r.useRef)(_);
      (v[0] !== _
        ? ((d = () => {
            I.current = _;
          }),
          (x = [_]),
          (v[0] = _),
          (v[1] = d),
          (v[2] = x))
        : ((d = v[1]), (x = v[2])),
        (0, r.useEffect)(d, x),
        v[3] !== w ? ((h = (0, o.f)(w)), (v[3] = w), (v[4] = h)) : (h = v[4]));
      let k = h;
      v[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((u = "wss://multichain-prod.nats.realtime.pump.fun".startsWith(
            "wss",
          )),
          (v[5] = u))
        : (u = v[5]);
      let j = !!u,
        S = A && !!k && j && !!g;
      (v[6] !== k || v[7] !== w || v[8] !== A || v[9] !== g
        ? ((f = () => {
            A &&
              k &&
              !j &&
              i.y.warn(
                "[useMultichainTradeEventSubscription] NEXT_PUBLIC_MULTICHAIN_NATS_URL is unset — live EVM trades are disabled for this page",
                { mint: g, chainId: w },
              );
          }),
          (b = [A, k, j, g, w]),
          (v[6] = k),
          (v[7] = w),
          (v[8] = A),
          (v[9] = g),
          (v[10] = f),
          (v[11] = b))
        : ((f = v[10]), (b = v[11])),
        (0, r.useEffect)(f, b),
        v[12] !== g
          ? ((p = (0, c.f)(g)), (v[12] = g), (v[13] = p))
          : (p = v[13]));
      let $ = p,
        C = S ? `${l._}.${k}.${$}` : "";
      (v[14] !== g || v[15] !== C
        ? ((y = () => {
            if (!C) return;
            let e = (0, a.i)(s.N.Multichain, C, (e) => {
              e?.trade && I.current((0, n.Y)(e, g));
            });
            return () => {
              (0, a.V)(s.N.Multichain, e);
            };
          }),
          (m = [C, g]),
          (v[14] = g),
          (v[15] = C),
          (v[16] = m),
          (v[17] = y))
        : ((m = v[16]), (y = v[17])),
        (0, r.useEffect)(y, m));
    },
  ]);
};
