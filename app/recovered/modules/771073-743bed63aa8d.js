// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(759257),
    r = e.i(890088),
    a = e.i(271517),
    i = e.i(21617);
  let s = ["1m", "5m", "15m", "1h", "4h", "1d"],
    n = 300,
    o = (e) => {
      let t = Number(e);
      return Number.isFinite(t) && t > 0 ? t : null;
    },
    l = (e) => {
      let t = o(e.open),
        r = o(e.high),
        a = o(e.low),
        i = o(e.close);
      return null !== t &&
        null !== r &&
        null !== a &&
        null !== i &&
        Number.isFinite(e.openTimeMs)
        ? {
            timestamp: e.openTimeMs,
            open: t,
            high: r,
            low: a,
            close: i,
            volume: Number(e.volumeUsd) || 0,
          }
        : null;
    },
    m = async ({
      coin: e,
      interval: r,
      beforeTs: a,
      count: s = n,
      signal: o,
    }) => {
      let m = await (0, t.j)()("GET /candles/{chainId}/{address}", {
        params: { chainId: i.g, address: e },
        query: {
          res: r,
          measure: "price_usd",
          count: Math.min(s, n),
          ...(void 0 !== a ? { to: Math.floor(a) - 1 } : {}),
        },
        signal: o,
      });
      return {
        candles: m.candles
          .flatMap((e) => {
            let t = l(e);
            return t ? [t] : [];
          })
          .sort((e, t) => e.timestamp - t.timestamp),
        hasOlder: m.hasOlder,
      };
    };
  e.s([
    "b",
    0,
    "5m",
    "C",
    0,
    {
      "1m": "4h",
      "5m": "1d",
      "15m": "1d",
      "1h": "1w",
      "4h": "1mo",
      "1d": "1mo",
    },
    "s",
    0,
    1e8,
    "H",
    0,
    ["1", "5", "15", "60", "240", "1D"],
    "k",
    0,
    { "4h": "1m", "1d": "5m", "1w": "1h", "1mo": "4h" },
    "T",
    0,
    { "4h": 14400, "1d": 86400, "1w": 604800, "1mo": 2592e3 },
    "m",
    0,
    m,
    "i",
    0,
    ({ value: e, decimals: t, locale: a }) =>
      Number.isFinite(e)
        ? `$${(0, r.R)(a, { minimumFractionDigits: t, maximumFractionDigits: t }).format(e)}`
        : "—",
    "d",
    0,
    (e) => s.includes(e),
    "A",
    0,
    ({ szDecimals: e, samplePrice: t }) =>
      void 0 !== e
        ? (0, a.V)(e)
        : void 0 !== t && Number.isFinite(t) && t > 0
          ? Math.min(8, Math.max(0, 4 - Math.floor(Math.log10(t))))
          : 2,
    "Z",
    0,
    l,
  ]);
};
