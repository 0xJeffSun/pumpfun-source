// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(526080),
    i = e.i(973374),
    r = e.i(605587);
  let l = (e) => "number" == typeof e && Number.isFinite(e) && e > 0;
  e.s([
    "f",
    0,
    ({ coin: e, row: a, basis: n }) => {
      let s = n?.codexSupply,
        o = (0, i.J)(e, { codexSupply: s });
      if (!a) return o;
      if (l(a.priceUsd)) return a.priceUsd;
      if (!l(a.usdMarketCap)) return o;
      if ((0, r.N)({ mint: e.mint, chainId: e.chain_id })) {
        if (a.isLiveData) return l(s) ? a.usdMarketCap / s : o;
        let t = (0, i.t)(e, s);
        return t > 0 ? a.usdMarketCap / t : o;
      }
      let d = !a.isLiveData && l(a.seedSupply) ? a.seedSupply : (0, t.B)(e);
      return d > 0 ? a.usdMarketCap / d : o;
    },
  ]);
};
