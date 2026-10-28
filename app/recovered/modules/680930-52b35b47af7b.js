// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(965690);
  let i = {
    INTERVALS: ["5m", "1h", "6h", "24h"],
    METRICS: ["numTxs", "volumeUSD", "numUsers", "priceChangePercent"],
    STALE_TIME: 3e5,
    CACHE_TIME: 6e5,
    POLLING_INTERVAL: 3e4,
    QUERY_KEY: "marketActivity",
    BATCH_SIZE: 50,
  };
  function l(e, t) {
    return !!e && !!t && !!e[t]?.["24h"];
  }
  e.s([
    "t",
    0,
    i,
    "$",
    0,
    function (e, t = i.BATCH_SIZE) {
      if (!e || 0 === e.length) return [];
      let l = Array.from(new Set(e)).filter(Boolean).sort(),
        r = [];
      for (let e = 0; e < l.length; e += t) r.push(l.slice(e, e + t));
      return r;
    },
    "P",
    0,
    function (e, t) {
      return t && 0 !== t.length ? t.filter((t) => !l(e, t)) : [];
    },
    "F",
    0,
    function (e, i) {
      return e && i
        ? ((0, t.r)({ activity: e[i], window: "24h", metric: "volumeUSD" }) ??
            0)
        : 0;
    },
    "G",
    0,
    l,
    "c",
    0,
    function (e, t) {
      if (e === t) return !0;
      if (!e || !t) return !1;
      let i = Object.keys(e),
        l = Object.keys(t);
      return (
        i.length === l.length &&
        i.every((i) => {
          let l = e[i],
            r = t[i];
          return (
            l === r ||
            (!!l &&
              !!r &&
              l["24h"]?.volumeUSD === r["24h"]?.volumeUSD &&
              l["24h"]?.priceChangePercent === r["24h"]?.priceChangePercent)
          );
        })
      );
    },
    "d",
    0,
    function (e) {
      if (!e || 0 === e.length) return {};
      let t = {};
      return (
        e.forEach((e) => {
          e && "object" == typeof e && Object.assign(t, e);
        }),
        t
      );
    },
  ]);
};
