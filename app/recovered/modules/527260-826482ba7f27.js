// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(526080),
    l = e.i(973374),
    i = e.i(605587);
  let r = (e) => "number" == typeof e && Number.isFinite(e) && e > 0;
  e.s([
    "f",
    0,
    ({ coin: e, row: s, basis: a }) => {
      let n = a?.codexSupply,
        o = (0, l.J)(e, { codexSupply: n });
      if (!s) return o;
      if (r(s.priceUsd)) return s.priceUsd;
      if (!r(s.usdMarketCap)) return o;
      if ((0, i.N)({ mint: e.mint, chainId: e.chain_id })) {
        if (s.isLiveData) return r(n) ? s.usdMarketCap / n : o;
        let t = (0, l.t)(e, n);
        return t > 0 ? s.usdMarketCap / t : o;
      }
      let d = !s.isLiveData && r(s.seedSupply) ? s.seedSupply : (0, t.B)(e);
      return d > 0 ? s.usdMarketCap / d : o;
    },
  ]);
};
