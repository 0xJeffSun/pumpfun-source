// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(449597);
  let n = (e) => (/^\d+$/.test(e) && /[1-9]/.test(e) ? e : void 0),
    r = new Set(),
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
      for (let t of r) o(t, e);
    },
    "s",
    0,
    (e) => {
      i.has(e) || i.set(e, []);
    },
    "p",
    0,
    (e, t = {}) => {
      if ((r.add(e), void 0 !== t.replayChannel)) {
        let n = i.get(t.replayChannel);
        for (let r of (i.delete(t.replayChannel), n ?? [])) o(e, r);
      }
      return () => {
        r.delete(e);
      };
    },
    "Q",
    0,
    ({
      boughtAtomic: e,
      quoteSpentAtomic: r,
      quoteMint: i,
      quoteDecimals: o,
      solUsdPrice: s,
      tokenDecimals: a,
    }) => ({
      boughtAtomic: n(e),
      quoteSpentAtomic: n(r),
      quoteMint: i ?? void 0,
      quoteDecimals: (0, t.x)(i, o),
      quoteUsd: (0, t.y)(i)
        ? 1
        : (0, t.Q)(i) && "number" == typeof s && Number.isFinite(s) && s > 0
          ? s
          : void 0,
      tokenDecimals: a ?? void 0,
    }),
  ]);
};
