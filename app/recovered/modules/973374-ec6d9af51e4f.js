// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(526080),
    i = e.i(605587);
  let r = (e) => "number" == typeof e && Number.isFinite(e) && e > 0;
  function l(e, l) {
    return !(0, i.N)({ mint: e.mint, chainId: e.chain_id }) || (0, t.u)(e)
      ? (0, t.B)(e)
      : r(l)
        ? l
        : 0;
  }
  function a(e, t = {}) {
    let i = l(e, t.codexSupply);
    if (!Number.isFinite(i) || i <= 0) return 0;
    let r = e.usd_market_cap ?? 0;
    return !Number.isFinite(r) || r <= 0 ? 0 : r / i;
  }
  e.s([
    "J",
    0,
    a,
    "s",
    0,
    function ({ coin: e, livePriceUsd: t, codexSupply: i }) {
      return r(t) ? t : a(e, { codexSupply: i });
    },
    "t",
    0,
    l,
  ]);
};
