// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(149502);
  var t = e.i(445242),
    r = e.i(254667),
    l = e.i(985526),
    o = e.i(755793),
    i = e.i(352386),
    a = e.i(159985),
    n = e.i(237237),
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
        b,
        h,
        y,
        f,
        g,
        v = (0, t.c)(18),
        { mint: x, chainId: w, onTrade: C, isEnabled: k } = e,
        S = void 0 === k || k,
        N = (0, i.useRef)(C);
      (v[0] !== C
        ? ((d = () => {
            N.current = C;
          }),
          (u = [C]),
          (v[0] = C),
          (v[1] = d),
          (v[2] = u))
        : ((d = v[1]), (u = v[2])),
        (0, i.useEffect)(d, u),
        v[3] !== w ? ((m = (0, s.f)(w)), (v[3] = w), (v[4] = m)) : (m = v[4]));
      let P = m;
      v[5] === Symbol.for("react.memo_cache_sentinel")
        ? ((p = "wss://multichain-prod.nats.realtime.pump.fun".startsWith(
            "wss",
          )),
          (v[5] = p))
        : (p = v[5]);
      let j = !!p,
        T = S && !!P && j && !!x;
      (v[6] !== P || v[7] !== w || v[8] !== S || v[9] !== x
        ? ((b = () => {
            S &&
              P &&
              !j &&
              r.y.warn(
                "[useMultichainTradeEventSubscription] NEXT_PUBLIC_MULTICHAIN_NATS_URL is unset — live EVM trades are disabled for this page",
                { mint: x, chainId: w },
              );
          }),
          (h = [S, P, j, x, w]),
          (v[6] = P),
          (v[7] = w),
          (v[8] = S),
          (v[9] = x),
          (v[10] = b),
          (v[11] = h))
        : ((b = v[10]), (h = v[11])),
        (0, i.useEffect)(b, h),
        v[12] !== x
          ? ((y = (0, c.f)(x)), (v[12] = x), (v[13] = y))
          : (y = v[13]));
      let A = y,
        _ = T ? `${n._}.${P}.${A}` : "";
      (v[14] !== x || v[15] !== _
        ? ((g = () => {
            if (!_) return;
            let e = (0, o.i)(l.N.Multichain, _, (e) => {
              e?.trade && N.current((0, a.Y)(e, x));
            });
            return () => {
              (0, o.V)(l.N.Multichain, e);
            };
          }),
          (f = [_, x]),
          (v[14] = x),
          (v[15] = _),
          (v[16] = f),
          (v[17] = g))
        : ((f = v[16]), (g = v[17])),
        (0, i.useEffect)(g, f));
    },
  ]);
};
