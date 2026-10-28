// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(965690);
  let r = {
    INTERVALS: ["5m", "1h", "6h", "24h"],
    METRICS: ["numTxs", "volumeUSD", "numUsers", "priceChangePercent"],
    STALE_TIME: 3e5,
    CACHE_TIME: 6e5,
    POLLING_INTERVAL: 3e4,
    QUERY_KEY: "marketActivity",
    BATCH_SIZE: 50,
  };
  function a(e, t) {
    return !!e && !!t && !!e[t]?.["24h"];
  }
  e.s([
    "t",
    0,
    r,
    "$",
    0,
    function (e, t = r.BATCH_SIZE) {
      if (!e || 0 === e.length) return [];
      let a = Array.from(new Set(e)).filter(Boolean).sort(),
        i = [];
      for (let e = 0; e < a.length; e += t) i.push(a.slice(e, e + t));
      return i;
    },
    "P",
    0,
    function (e, t) {
      return t && 0 !== t.length ? t.filter((t) => !a(e, t)) : [];
    },
    "F",
    0,
    function (e, r) {
      return e && r
        ? ((0, t.r)({ activity: e[r], window: "24h", metric: "volumeUSD" }) ??
            0)
        : 0;
    },
    "G",
    0,
    a,
    "c",
    0,
    function (e, t) {
      if (e === t) return !0;
      if (!e || !t) return !1;
      let r = Object.keys(e),
        a = Object.keys(t);
      return (
        r.length === a.length &&
        r.every((r) => {
          let a = e[r],
            i = t[r];
          return (
            a === i ||
            (!!a &&
              !!i &&
              a["24h"]?.volumeUSD === i["24h"]?.volumeUSD &&
              a["24h"]?.priceChangePercent === i["24h"]?.priceChangePercent)
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
