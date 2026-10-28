// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(149502);
  var t = e.i(445242),
    r = e.i(254667),
    n = e.i(985526),
    i = e.i(755793),
    l = e.i(352386),
    a = e.i(159985),
    s = e.i(237237),
    o = e.i(987425),
    c = e.i(225233);
  e.s([
    "f",
    0,
    function (e) {
      let u,
        d,
        m,
        f,
        h,
        p,
        g,
        b,
        x,
        v = (0, t.c)(18),
        { mint: y, chainId: w, onTrade: j, isEnabled: N } = e,
        C = void 0 === N || N,
        _ = (0, l.useRef)(j);
      (v[0] !== j
        ? ((u = () => {
            _.current = j;
          }),
          (d = [j]),
          (v[0] = j),
          (v[1] = u),
          (v[2] = d))
        : ((u = v[1]), (d = v[2])),
        (0, l.useEffect)(u, d),
        v[3] !== w ? ((m = (0, o.f)(w)), (v[3] = w), (v[4] = m)) : (m = v[4]));
      let k = m;
      v[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((f = "wss://multichain-prod.nats.realtime.pump.fun".startsWith(
            "wss",
          )),
          (v[5] = f))
        : (f = v[5]);
      let S = !!f,
        A = C && !!k && S && !!y;
      (v[6] !== k || v[7] !== w || v[8] !== C || v[9] !== y
        ? ((h = () => {
            C &&
              k &&
              !S &&
              r.y.warn(
                "[useMultichainTradeEventSubscription] NEXT_PUBLIC_MULTICHAIN_NATS_URL is unset — live EVM trades are disabled for this page",
                { mint: y, chainId: w },
              );
          }),
          (p = [C, k, S, y, w]),
          (v[6] = k),
          (v[7] = w),
          (v[8] = C),
          (v[9] = y),
          (v[10] = h),
          (v[11] = p))
        : ((h = v[10]), (p = v[11])),
        (0, l.useEffect)(h, p),
        v[12] !== y
          ? ((g = (0, c.f)(y)), (v[12] = y), (v[13] = g))
          : (g = v[13]));
      let U = g,
        $ = A ? `${s._}.${k}.${U}` : "";
      (v[14] !== y || v[15] !== $
        ? ((x = () => {
            if (!$) return;
            let e = (0, i.i)(n.N.Multichain, $, (e) => {
              e?.trade && _.current((0, a.Y)(e, y));
            });
            return () => {
              (0, i.V)(n.N.Multichain, e);
            };
          }),
          (b = [$, y]),
          (v[14] = y),
          (v[15] = $),
          (v[16] = b),
          (v[17] = x))
        : ((b = v[16]), (x = v[17])),
        (0, l.useEffect)(x, b));
    },
  ]);
};
