// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(38279),
    l = e.i(505835);
  async function r(e) {
    let {
        coinAddress: r,
        chainId: a,
        fetchOptions: i,
        interval: s = t.v.COIN_CANDLES.INTERVAL,
        limit: n = t.v.COIN_CANDLES.LIMIT,
        to: o,
      } = e,
      d = (0, l.U)({ mint: r, chainId: a });
    if (!d) throw Error("Failed to fetch coin candles");
    return (
      await (0, l.Z)({
        chainId: d,
        address: r,
        interval: s,
        measure: "price_usd",
        count: n,
        beforeTs: void 0 !== o ? Math.floor(o) + 1 : void 0,
        init: i,
      })
    ).candles.map((e) => ({
      timestamp: e.timestamp,
      open: String(e.open),
      high: String(e.high),
      low: String(e.low),
      close: String(e.close),
      volume: String(e.volume),
    }));
  }
  e.s(["f", 0, r]);
};
