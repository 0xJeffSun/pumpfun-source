// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(38279),
    r = e.i(505835);
  async function a(e) {
    let {
        coinAddress: a,
        chainId: i,
        fetchOptions: l,
        interval: n = t.v.COIN_CANDLES.INTERVAL,
        limit: o = t.v.COIN_CANDLES.LIMIT,
        to: s,
      } = e,
      d = (0, r.U)({ mint: a, chainId: i });
    if (!d) throw Error("Failed to fetch coin candles");
    return (
      await (0, r.Z)({
        chainId: d,
        address: a,
        interval: n,
        measure: "price_usd",
        count: o,
        beforeTs: void 0 !== s ? Math.floor(s) + 1 : void 0,
        init: l,
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
  e.s(["f", 0, a]);
};
