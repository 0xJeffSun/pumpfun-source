// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(732486),
    r = e.i(445242),
    i = e.i(322315),
    l = e.i(254010),
    a = e.i(453706),
    n = e.i(352386),
    o = e.i(78436),
    s = e.i(510757),
    c = e.i(329017);
  let d = (0, a.default)(
      () => e.A(643435).then((e) => e.UapiCoinHeaderSource),
      { loadableGenerated: { modules: [979895] }, ssr: !1 },
    ),
    u = (0, n.createContext)(null),
    m = (0, n.createContext)(null),
    p = m.Provider;
  function h() {
    let e = (0, n.useContext)(u);
    if (!e)
      throw Error("useCoinPageStatic must be used inside CoinPageProviders");
    return e;
  }
  e.s([
    "I",
    0,
    function (e) {
      let a,
        n,
        o = (0, r.c)(7),
        { value: s, children: c } = e,
        m = (0, l.k)(i.D.UAPI_STREAM_HEADER);
      return (
        o[0] !== m || o[1] !== s
          ? ((a =
              m && s.coin.mint
                ? (0, t.jsx)(d, { mint: s.coin.mint, chain: s.coin.chain_id })
                : null),
            (o[0] = m),
            (o[1] = s),
            (o[2] = a))
          : (a = o[2]),
        o[3] !== c || o[4] !== a || o[5] !== s
          ? ((n = (0, t.jsxs)(u.Provider, { value: s, children: [a, c] })),
            (o[3] = c),
            (o[4] = a),
            (o[5] = s),
            (o[6] = n))
          : (n = o[6]),
        n
      );
    },
    "Y",
    0,
    p,
    "i",
    0,
    (e = {}) =>
      (0, s.f)(() => ({
        selectedTab: "holders",
        showOverlay: !1,
        isOpen: !1,
        tradeSheetHeight: 0,
        ...e,
      })),
    "u",
    0,
    function () {
      let e,
        t = (0, r.c)(4),
        { coin: i, liveUsdMarketCap: l, liveWholeTokenSupply: a } = h();
      return (
        t[0] !== i || t[1] !== l || t[2] !== a
          ? ((e = { coin: i, liveUsdMarketCap: l, liveWholeTokenSupply: a }),
            (t[0] = i),
            (t[1] = l),
            (t[2] = a),
            (t[3] = e))
          : (e = t[3]),
        (0, c.n)(e)
      );
    },
    "Z",
    0,
    h,
    "a",
    0,
    function () {
      return (0, n.useContext)(u);
    },
    "V",
    0,
    function (e) {
      let t = (0, n.useContext)(m);
      if (!t)
        throw Error("useCoinPageUi must be used inside CoinPageProviders");
      return (0, o.f)(t, e);
    },
  ]);
};
