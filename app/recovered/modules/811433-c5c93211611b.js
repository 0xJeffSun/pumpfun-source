// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(445242),
    n = e.i(292686),
    l = e.i(352386),
    i = e.i(595673),
    a = e.i(569526);
  function r(e) {
    return (0, i.Lw)({ source: "tradebox", screen: n.Ae.COIN_DETAILS });
  }
  (e.s(
    [
      "U",
      0,
      function (e) {
        let n,
          r = (0, t.c)(6),
          { mint: s, chainId: o, side: u, isFullScreen: c } = e,
          { lastClickImpression: d } = (0, a.y)(),
          m = (0, l.useRef)(null);
        return (
          r[0] !== o || r[1] !== c || r[2] !== d || r[3] !== s || r[4] !== u
            ? ((n = () => {
                if (m.current === s) return;
                m.current = s;
                let e = d?.mint === s ? d.impression : void 0;
                (0, i.lG)({
                  mint: s,
                  tradeDirection: u,
                  isFullScreen: c,
                  recommendationId: e?.rec_id,
                  calloutId: e?.calloutId,
                  chain: (0, i.i9)(s, o),
                });
              }),
              (r[0] = o),
              (r[1] = c),
              (r[2] = d),
              (r[3] = s),
              (r[4] = u),
              (r[5] = n))
            : (n = r[5]),
          n
        );
      },
      "R",
      0,
      function () {
        let e,
          n = (0, t.c)(1);
        return (
          n[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = { trackConnectWalletPress: r }), (n[0] = e))
            : (e = n[0]),
          e
        );
      },
    ],
    811433,
  ),
    e.i(550675));
  var s = e.i(547562),
    o = e.i(881324);
  function u(e) {
    let n,
      l,
      i,
      a = (0, t.c)(10),
      { id: r, defaults: o, clamp: u } = e,
      [c, d] = (0, s.l)(r);
    a[0] !== u || a[1] !== d
      ? ((n = (e, t) => {
          d((n) => {
            let l = [...n];
            return ((l[e] = u(t)), l);
          });
        }),
        (a[0] = u),
        (a[1] = d),
        (a[2] = n))
      : (n = a[2]);
    let m = n;
    a[3] !== o || a[4] !== d
      ? ((l = () => d(o)), (a[3] = o), (a[4] = d), (a[5] = l))
      : (l = a[5]);
    let b = l;
    return (
      a[6] !== b || a[7] !== m || a[8] !== c
        ? ((i = { values: c, setValue: m, reset: b }),
          (a[6] = b),
          (a[7] = m),
          (a[8] = c),
          (a[9] = i))
        : (i = a[9]),
      i
    );
  }
  e.s(
    [
      "N",
      0,
      function () {
        let e,
          n = (0, t.c)(1);
        return (
          n[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = { id: "trading.amountChips", defaults: o.t, clamp: o.G }),
              (n[0] = e))
            : (e = n[0]),
          u(e)
        );
      },
      "d",
      0,
      function () {
        let e,
          n = (0, t.c)(1);
        return (
          n[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = {
                id: "trading.quickBuy.presets.sol",
                defaults: o.P,
                clamp: o.v,
              }),
              (n[0] = e))
            : (e = n[0]),
          u(e)
        );
      },
      "o",
      0,
      function () {
        let e,
          n = (0, t.c)(1);
        return (
          n[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = {
                id: "trading.quickBuy.presets.usd",
                defaults: o.w,
                clamp: o.m,
              }),
              (n[0] = e))
            : (e = n[0]),
          u(e)
        );
      },
      "k",
      0,
      function () {
        let e,
          n = (0, t.c)(1);
        return (
          n[0] === Symbol.for("react.memo_cache_sentinel")
            ? ((e = {
                id: "trading.quickSell.presets",
                defaults: o.W,
                clamp: o.k,
              }),
              (n[0] = e))
            : (e = n[0]),
          u(e)
        );
      },
    ],
    858133,
  );
};
