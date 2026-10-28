// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(526080),
    l = e.i(973374),
    r = e.i(605587);
  let a = (e) => "number" == typeof e && Number.isFinite(e) && e > 0;
  e.s([
    "f",
    0,
    ({ coin: e, row: i, basis: s }) => {
      let n = s?.codexSupply,
        o = (0, l.J)(e, { codexSupply: n });
      if (!i) return o;
      if (a(i.priceUsd)) return i.priceUsd;
      if (!a(i.usdMarketCap)) return o;
      if ((0, r.N)({ mint: e.mint, chainId: e.chain_id })) {
        if (i.isLiveData) return a(n) ? i.usdMarketCap / n : o;
        let t = (0, l.t)(e, n);
        return t > 0 ? i.usdMarketCap / t : o;
      }
      let d = !i.isLiveData && a(i.seedSupply) ? i.seedSupply : (0, t.B)(e);
      return d > 0 ? i.usdMarketCap / d : o;
    },
  ]);
};
