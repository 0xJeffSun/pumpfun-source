// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = ["5m", "1h", "6h", "24h"],
    r = (e) => "string" == typeof e && t.includes(e);
  function i({ activity: e, window: t, metric: r }) {
    let s = e?.[t];
    if (!s) return null;
    let n = s[r];
    return "number" == typeof n && Number.isFinite(n) ? n : null;
  }
  let s = ({ activity: e, window: r }) => {
      if (!e || e[r]) return !1;
      let i = t.indexOf(r),
        s = t.slice(0, i).every((t) => {
          let r = e[t];
          return !r || 0 === r.numTxs;
        }),
        n = t.slice(i + 1).some((t) => !!e[t]);
      return s && n;
    },
    n = { "5m": 3e5, "1h": 36e5, "6h": 216e5, "24h": 864e5 };
  function o({ activity: e, window: r, coinAgeMs: i }) {
    let s = e?.[r]?.priceChangePercent ?? null;
    if (null === i || i >= n[r] || (null !== s && 0 !== s)) return s;
    for (let r of t) {
      if (n[r] < i) continue;
      let t = e?.[r]?.priceChangePercent ?? null;
      if (null !== t && 0 !== t) return t;
    }
    return s;
  }
  e.s([
    "O",
    0,
    "1h",
    "D",
    0,
    t,
    "u",
    0,
    (e) => (r(e) ? e : "1h"),
    "r",
    0,
    i,
    "U",
    0,
    r,
    "o",
    0,
    (e) => {
      let t = o(e);
      return null === t && s(e) ? 0 : t;
    },
    "E",
    0,
    ({ activity: e, window: r, metric: o, coinAgeMs: a = null }) => {
      let l = i({ activity: e, window: r, metric: o });
      if (null !== l) return l;
      if (e?.[r]) return null;
      if (null !== a && a < n[r]) {
        for (let r of t) {
          if (n[r] < a) continue;
          let t = i({ activity: e, window: r, metric: o });
          if (null !== t) return t;
        }
        return null;
      }
      return s({ activity: e, window: r }) ? 0 : null;
    },
    "k",
    0,
    o,
  ]);
};
