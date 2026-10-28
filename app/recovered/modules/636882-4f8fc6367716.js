// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(646908);
  e.s(
    [
      "f",
      0,
      ({ coinAddress: e, coinCreatedTimestamp: r, chainId: i }) =>
        !!e &&
        (!!(0, t.L)(i) ||
          ("number" == typeof r && Number.isFinite(r) && r > 0)),
    ],
    636882,
  );
  var r = e.i(349942),
    i = e.i(38279),
    a = e.i(505835),
    n = e.i(628731);
  async function s(e) {
    let {
        coinAddress: t,
        coinCreatedTimestamp: r,
        chainId: s,
        fetchOptions: l,
        timeframe: o = i.v.COIN_LINE_CHART.TIMEFRAME,
        width: c = i.v.COIN_LINE_CHART.WIDTH,
      } = e,
      m = (0, a.U)({ mint: t, chainId: s }),
      d = (0, n.b)({ createdTs: r, timeframe: o, width: c });
    if (!m || !d) throw Error(`Failed to fetch coin line chart: ${o}`);
    return (
      await (0, a.x)({
        chainId: m,
        address: t,
        ...d,
        measure: "price_usd",
        init: l,
      })
    ).points;
  }
  function l(e, t = Date.now()) {
    return !!Number.isFinite(e) && !(e <= 0) && 36e5 >= Math.max(0, t - e);
  }
  function o(e, t = Date.now()) {
    let r = Math.max(0, t - e);
    return r < 3e5
      ? { interval: "1s", limit: 300 }
      : r < 9e5
        ? { interval: "15s", limit: 65 }
        : r < 18e5
          ? { interval: "30s", limit: 65 }
          : { interval: "1m", limit: 65 };
  }
  function c(e, t = Date.now()) {
    return {
      timeframe: (function (e, t = Date.now()) {
        if (!Number.isFinite(e) || e <= 0) return i.v.COIN_LINE_CHART.TIMEFRAME;
        let r = Math.max(0, t - e);
        return r < 3e5
          ? "1m"
          : r < 9e5
            ? "5m"
            : r < 36e5
              ? "15m"
              : r < 216e5
                ? "30m"
                : r < 864e5
                  ? "6h"
                  : r < 1728e5
                    ? "24h"
                    : "1w";
      })(e, t),
      width: (function (e, t = Date.now()) {
        var r;
        return !Number.isFinite(e) || e <= 0
          ? i.v.COIN_LINE_CHART.WIDTH
          : (r = Math.max(0, t - e)) < 3e5
            ? 24
            : r < 9e5
              ? 28
              : r < 18e5
                ? 32
                : r < 36e5
                  ? 52
                  : r < 216e5
                    ? 64
                    : r < 864e5
                      ? 68
                      : r < 1728e5
                        ? 72
                        : i.v.COIN_LINE_CHART.WIDTH;
      })(e, t),
    };
  }
  async function m(e) {
    let {
      coinAddress: t,
      coinCreatedTimestamp: i,
      chainId: a,
      fetchOptions: n,
      timeframe: m,
      width: d,
      youngCoinSource: u = "candles",
    } = e;
    if ("candles" === u && l(i)) {
      let { interval: e, limit: s } = o(i),
        l = (0, r.f)({
          coinAddress: t,
          coinCreatedTimestamp: i,
          chainId: a,
          interval: e,
          limit: s,
          fetchOptions: n,
        });
      return (await l)
        .map((e) => ({ time: e.timestamp, price: Number(e.close) }))
        .filter(
          (e) =>
            Number.isFinite(e.time) && Number.isFinite(e.price) && e.price >= 0,
        );
    }
    let { timeframe: h, width: x } = c(i);
    return s({
      coinAddress: t,
      coinCreatedTimestamp: i,
      chainId: a,
      fetchOptions: n,
      timeframe: m ?? h,
      width: d ?? x,
    });
  }
  async function d(e) {
    let {
      coinAddress: t,
      coinCreatedTimestamp: i,
      chainId: a,
      fetchOptions: n,
      timeframe: m,
      width: d,
    } = e;
    if (l(i)) {
      var u;
      let { interval: e, limit: s } = o(i),
        l = (0, r.f)({
          coinAddress: t,
          coinCreatedTimestamp: i,
          chainId: a,
          interval: e,
          limit: s,
          fetchOptions: n,
        });
      return (
        (u = await l),
        u
          .map((e) => ({
            close: Number(e.close),
            high: Number(e.high),
            low: Number(e.low),
            mint: t,
            open: Number(e.open),
            time: e.timestamp,
            timestamp: e.timestamp,
            volume: Number(e.volume),
          }))
          .filter(
            (e) =>
              Number.isFinite(e.timestamp) &&
              Number.isFinite(e.close) &&
              Number.isFinite(e.open),
          )
      );
    }
    let { timeframe: h, width: x } = c(i),
      f = s({
        coinAddress: t,
        coinCreatedTimestamp: i,
        chainId: a,
        fetchOptions: n,
        timeframe: m ?? h,
        width: d ?? x,
      });
    return (await f).map((e) => ({
      close: e.price,
      high: e.price,
      low: e.price,
      mint: t,
      open: e.price,
      time: e.time,
      timestamp: e.time,
      volume: 0,
    }));
  }
  (e.s(["S", 0, o, "Y", 0, c, "a", 0, l], 693908),
    e.s(["u", 0, d, "B", 0, m], 997627));
};
