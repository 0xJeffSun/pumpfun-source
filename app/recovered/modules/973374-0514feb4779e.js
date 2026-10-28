// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(526080),
    i = e.i(605587);
  let l = (e) => "number" == typeof e && Number.isFinite(e) && e > 0;
  function r(e, r) {
    return !(0, i.N)({ mint: e.mint, chainId: e.chain_id }) || (0, t.u)(e)
      ? (0, t.B)(e)
      : l(r)
        ? r
        : 0;
  }
  function a(e, t = {}) {
    let i = r(e, t.codexSupply);
    if (!Number.isFinite(i) || i <= 0) return 0;
    let l = e.usd_market_cap ?? 0;
    return !Number.isFinite(l) || l <= 0 ? 0 : l / i;
  }
  e.s([
    "J",
    0,
    a,
    "s",
    0,
    function ({ coin: e, livePriceUsd: t, codexSupply: i }) {
      return l(t) ? t : a(e, { codexSupply: i });
    },
    "t",
    0,
    r,
  ]);
};
