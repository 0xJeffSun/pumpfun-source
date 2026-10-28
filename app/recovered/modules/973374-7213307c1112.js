// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(526080),
    i = e.i(605587);
  let a = (e) => "number" == typeof e && Number.isFinite(e) && e > 0;
  function l(e, l) {
    return !(0, i.N)({ mint: e.mint, chainId: e.chain_id }) || (0, t.u)(e)
      ? (0, t.B)(e)
      : a(l)
        ? l
        : 0;
  }
  function r(e, t = {}) {
    let i = l(e, t.codexSupply);
    if (!Number.isFinite(i) || i <= 0) return 0;
    let a = e.usd_market_cap ?? 0;
    return !Number.isFinite(a) || a <= 0 ? 0 : a / i;
  }
  e.s([
    "J",
    0,
    r,
    "s",
    0,
    function ({ coin: e, livePriceUsd: t, codexSupply: i }) {
      return a(t) ? t : r(e, { codexSupply: i });
    },
    "t",
    0,
    l,
  ]);
};
