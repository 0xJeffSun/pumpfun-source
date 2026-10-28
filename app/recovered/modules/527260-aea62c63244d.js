// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(526080),
    l = e.i(973374),
    r = e.i(605587);
  let i = (e) => "number" == typeof e && Number.isFinite(e) && e > 0;
  e.s([
    "f",
    0,
    ({ coin: e, row: a, basis: s }) => {
      let n = s?.codexSupply,
        o = (0, l.J)(e, { codexSupply: n });
      if (!a) return o;
      if (i(a.priceUsd)) return a.priceUsd;
      if (!i(a.usdMarketCap)) return o;
      if ((0, r.N)({ mint: e.mint, chainId: e.chain_id })) {
        if (a.isLiveData) return i(n) ? a.usdMarketCap / n : o;
        let t = (0, l.t)(e, n);
        return t > 0 ? a.usdMarketCap / t : o;
      }
      let d = !a.isLiveData && i(a.seedSupply) ? a.seedSupply : (0, t.B)(e);
      return d > 0 ? a.usdMarketCap / d : o;
    },
  ]);
};
