// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(646908);
  e.s(
    [
      "f",
      0,
      ({ coinAddress: e, coinCreatedTimestamp: i, chainId: r }) =>
        !!e &&
        (!!(0, t.L)(r) ||
          ("number" == typeof i && Number.isFinite(i) && i > 0)),
    ],
    636882,
  );
  var i = e.i(349942),
    r = e.i(38279),
    s = e.i(505835),
    l = e.i(628731);
  async function a(e) {
    let {
        coinAddress: t,
        coinCreatedTimestamp: i,
        chainId: a,
        fetchOptions: n,
        timeframe: o = r.v.COIN_LINE_CHART.TIMEFRAME,
        width: c = r.v.COIN_LINE_CHART.WIDTH,
      } = e,
      d = (0, s.U)({ mint: t, chainId: a }),
      m = (0, l.b)({ createdTs: i, timeframe: o, width: c });
    if (!d || !m) throw Error(`Failed to fetch coin line chart: ${o}`);
    return (
      await (0, s.x)({
        chainId: d,
        address: t,
        ...m,
        measure: "price_usd",
        init: n,
      })
    ).points;
  }
  function n(e, t = Date.now()) {
    return !!Number.isFinite(e) && !(e <= 0) && 36e5 >= Math.max(0, t - e);
  }
  function o(e, t = Date.now()) {
    let i = Math.max(0, t - e);
    return i < 3e5
      ? { interval: "1s", limit: 300 }
      : i < 9e5
        ? { interval: "15s", limit: 65 }
        : i < 18e5
          ? { interval: "30s", limit: 65 }
          : { interval: "1m", limit: 65 };
  }
  function c(e, t = Date.now()) {
    return {
      timeframe: (function (e, t = Date.now()) {
        if (!Number.isFinite(e) || e <= 0) return r.v.COIN_LINE_CHART.TIMEFRAME;
        let i = Math.max(0, t - e);
        return i < 3e5
          ? "1m"
          : i < 9e5
            ? "5m"
            : i < 36e5
              ? "15m"
              : i < 216e5
                ? "30m"
                : i < 864e5
                  ? "6h"
                  : i < 1728e5
                    ? "24h"
                    : "1w";
      })(e, t),
      width: (function (e, t = Date.now()) {
        var i;
        return !Number.isFinite(e) || e <= 0
          ? r.v.COIN_LINE_CHART.WIDTH
          : (i = Math.max(0, t - e)) < 3e5
            ? 24
            : i < 9e5
              ? 28
              : i < 18e5
                ? 32
                : i < 36e5
                  ? 52
                  : i < 216e5
                    ? 64
                    : i < 864e5
                      ? 68
                      : i < 1728e5
                        ? 72
                        : r.v.COIN_LINE_CHART.WIDTH;
      })(e, t),
    };
  }
  async function d(e) {
    let {
      coinAddress: t,
      coinCreatedTimestamp: r,
      chainId: s,
      fetchOptions: l,
      timeframe: d,
      width: m,
      youngCoinSource: u = "candles",
    } = e;
    if ("candles" === u && n(r)) {
      let { interval: e, limit: a } = o(r),
        n = (0, i.f)({
          coinAddress: t,
          coinCreatedTimestamp: r,
          chainId: s,
          interval: e,
          limit: a,
          fetchOptions: l,
        });
      return (await n)
        .map((e) => ({ time: e.timestamp, price: Number(e.close) }))
        .filter(
          (e) =>
            Number.isFinite(e.time) && Number.isFinite(e.price) && e.price >= 0,
        );
    }
    let { timeframe: f, width: h } = c(r);
    return a({
      coinAddress: t,
      coinCreatedTimestamp: r,
      chainId: s,
      fetchOptions: l,
      timeframe: d ?? f,
      width: m ?? h,
    });
  }
  async function m(e) {
    let {
      coinAddress: t,
      coinCreatedTimestamp: r,
      chainId: s,
      fetchOptions: l,
      timeframe: d,
      width: m,
    } = e;
    if (n(r)) {
      var u;
      let { interval: e, limit: a } = o(r),
        n = (0, i.f)({
          coinAddress: t,
          coinCreatedTimestamp: r,
          chainId: s,
          interval: e,
          limit: a,
          fetchOptions: l,
        });
      return (
        (u = await n),
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
    let { timeframe: f, width: h } = c(r),
      x = a({
        coinAddress: t,
        coinCreatedTimestamp: r,
        chainId: s,
        fetchOptions: l,
        timeframe: d ?? f,
        width: m ?? h,
      });
    return (await x).map((e) => ({
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
  (e.s(["S", 0, o, "Y", 0, c, "a", 0, n], 693908),
    e.s(["u", 0, m, "B", 0, d], 997627));
};
