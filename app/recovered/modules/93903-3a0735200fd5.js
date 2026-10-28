// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(449597);
  let r = (e) => (/^\d+$/.test(e) && /[1-9]/.test(e) ? e : void 0),
    n = new Set(),
    i = new Map(),
    o = (e, t) => {
      try {
        e(t);
      } catch {}
    };
  e.s([
    "U",
    0,
    "tp-sl-auto-cancel",
    "K",
    0,
    (e) => {
      for (let t of i.values()) (t.push(e), t.length > 20 && t.shift());
      for (let t of n) o(t, e);
    },
    "s",
    0,
    (e) => {
      i.has(e) || i.set(e, []);
    },
    "p",
    0,
    (e, t = {}) => {
      if ((n.add(e), void 0 !== t.replayChannel)) {
        let r = i.get(t.replayChannel);
        for (let n of (i.delete(t.replayChannel), r ?? [])) o(e, n);
      }
      return () => {
        n.delete(e);
      };
    },
    "Q",
    0,
    ({
      boughtAtomic: e,
      quoteSpentAtomic: n,
      quoteMint: i,
      quoteDecimals: o,
      solUsdPrice: a,
      tokenDecimals: s,
    }) => ({
      boughtAtomic: r(e),
      quoteSpentAtomic: r(n),
      quoteMint: i ?? void 0,
      quoteDecimals: (0, t.x)(i, o),
      quoteUsd: (0, t.y)(i)
        ? 1
        : (0, t.Q)(i) && "number" == typeof a && Number.isFinite(a) && a > 0
          ? a
          : void 0,
      tokenDecimals: s ?? void 0,
    }),
  ]);
};
