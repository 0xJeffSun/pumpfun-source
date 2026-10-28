// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(526080),
    l = e.i(605587);
  let i = (e) => "number" == typeof e && Number.isFinite(e) && e > 0;
  function r(e, r) {
    return !(0, l.N)({ mint: e.mint, chainId: e.chain_id }) || (0, t.u)(e)
      ? (0, t.B)(e)
      : i(r)
        ? r
        : 0;
  }
  function s(e, t = {}) {
    let l = r(e, t.codexSupply);
    if (!Number.isFinite(l) || l <= 0) return 0;
    let i = e.usd_market_cap ?? 0;
    return !Number.isFinite(i) || i <= 0 ? 0 : i / l;
  }
  e.s([
    "J",
    0,
    s,
    "s",
    0,
    function ({ coin: e, livePriceUsd: t, codexSupply: l }) {
      return i(t) ? t : s(e, { codexSupply: l });
    },
    "t",
    0,
    r,
  ]);
};
