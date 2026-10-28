// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(965690);
  let a = {
    INTERVALS: ["5m", "1h", "6h", "24h"],
    METRICS: ["numTxs", "volumeUSD", "numUsers", "priceChangePercent"],
    STALE_TIME: 3e5,
    CACHE_TIME: 6e5,
    POLLING_INTERVAL: 3e4,
    QUERY_KEY: "marketActivity",
    BATCH_SIZE: 50,
  };
  function i(e, t) {
    return !!e && !!t && !!e[t]?.["24h"];
  }
  e.s([
    "t",
    0,
    a,
    "$",
    0,
    function (e, t = a.BATCH_SIZE) {
      if (!e || 0 === e.length) return [];
      let i = Array.from(new Set(e)).filter(Boolean).sort(),
        l = [];
      for (let e = 0; e < i.length; e += t) l.push(i.slice(e, e + t));
      return l;
    },
    "P",
    0,
    function (e, t) {
      return t && 0 !== t.length ? t.filter((t) => !i(e, t)) : [];
    },
    "F",
    0,
    function (e, a) {
      return e && a
        ? ((0, t.r)({ activity: e[a], window: "24h", metric: "volumeUSD" }) ??
            0)
        : 0;
    },
    "G",
    0,
    i,
    "c",
    0,
    function (e, t) {
      if (e === t) return !0;
      if (!e || !t) return !1;
      let a = Object.keys(e),
        i = Object.keys(t);
      return (
        a.length === i.length &&
        a.every((a) => {
          let i = e[a],
            l = t[a];
          return (
            i === l ||
            (!!i &&
              !!l &&
              i["24h"]?.volumeUSD === l["24h"]?.volumeUSD &&
              i["24h"]?.priceChangePercent === l["24h"]?.priceChangePercent)
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
