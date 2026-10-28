// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(526080),
    l = e.i(605587);
  let r = (e) => "number" == typeof e && Number.isFinite(e) && e > 0;
  function i(e, i) {
    return !(0, l.N)({ mint: e.mint, chainId: e.chain_id }) || (0, t.u)(e)
      ? (0, t.B)(e)
      : r(i)
        ? i
        : 0;
  }
  function a(e, t = {}) {
    let l = i(e, t.codexSupply);
    if (!Number.isFinite(l) || l <= 0) return 0;
    let r = e.usd_market_cap ?? 0;
    return !Number.isFinite(r) || r <= 0 ? 0 : r / l;
  }
  e.s([
    "J",
    0,
    a,
    "s",
    0,
    function ({ coin: e, livePriceUsd: t, codexSupply: l }) {
      return r(t) ? t : a(e, { codexSupply: l });
    },
    "t",
    0,
    i,
  ]);
};
