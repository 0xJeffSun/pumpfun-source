// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(646908);
  e.s(
    [
      "f",
      0,
      ({ coinAddress: e, coinCreatedTimestamp: r, chainId: a }) =>
        !!e &&
        (!!(0, t.L)(a) ||
          ("number" == typeof r && Number.isFinite(r) && r > 0)),
    ],
    636882,
  );
  var r = e.i(349942),
    a = e.i(38279),
    i = e.i(505835),
    n = e.i(628731);
  async function l(e) {
    let {
        coinAddress: t,
        coinCreatedTimestamp: r,
        chainId: l,
        fetchOptions: s,
        timeframe: o = a.v.COIN_LINE_CHART.TIMEFRAME,
        width: c = a.v.COIN_LINE_CHART.WIDTH,
      } = e,
      d = (0, i.U)({ mint: t, chainId: l }),
      m = (0, n.b)({ createdTs: r, timeframe: o, width: c });
    if (!d || !m) throw Error(`Failed to fetch coin line chart: ${o}`);
    return (
      await (0, i.x)({
        chainId: d,
        address: t,
        ...m,
        measure: "price_usd",
        init: s,
      })
    ).points;
  }
  function s(e, t = Date.now()) {
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
        if (!Number.isFinite(e) || e <= 0) return a.v.COIN_LINE_CHART.TIMEFRAME;
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
          ? a.v.COIN_LINE_CHART.WIDTH
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
                        : a.v.COIN_LINE_CHART.WIDTH;
      })(e, t),
    };
  }
  async function d(e) {
    let {
      coinAddress: t,
      coinCreatedTimestamp: a,
      chainId: i,
      fetchOptions: n,
      timeframe: d,
      width: m,
      youngCoinSource: u = "candles",
    } = e;
    if ("candles" === u && s(a)) {
      let { interval: e, limit: l } = o(a),
        s = (0, r.f)({
          coinAddress: t,
          coinCreatedTimestamp: a,
          chainId: i,
          interval: e,
          limit: l,
          fetchOptions: n,
        });
      return (await s)
        .map((e) => ({ time: e.timestamp, price: Number(e.close) }))
        .filter(
          (e) =>
            Number.isFinite(e.time) && Number.isFinite(e.price) && e.price >= 0,
        );
    }
    let { timeframe: f, width: h } = c(a);
    return l({
      coinAddress: t,
      coinCreatedTimestamp: a,
      chainId: i,
      fetchOptions: n,
      timeframe: d ?? f,
      width: m ?? h,
    });
  }
  async function m(e) {
    let {
      coinAddress: t,
      coinCreatedTimestamp: a,
      chainId: i,
      fetchOptions: n,
      timeframe: d,
      width: m,
    } = e;
    if (s(a)) {
      var u;
      let { interval: e, limit: l } = o(a),
        s = (0, r.f)({
          coinAddress: t,
          coinCreatedTimestamp: a,
          chainId: i,
          interval: e,
          limit: l,
          fetchOptions: n,
        });
      return (
        (u = await s),
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
    let { timeframe: f, width: h } = c(a),
      p = l({
        coinAddress: t,
        coinCreatedTimestamp: a,
        chainId: i,
        fetchOptions: n,
        timeframe: d ?? f,
        width: m ?? h,
      });
    return (await p).map((e) => ({
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
  (e.s(["S", 0, o, "Y", 0, c, "a", 0, s], 693908),
    e.s(["u", 0, m, "B", 0, d], 997627));
};
