// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = {
      refreshMs: 3e4,
      maxAgeMs: 4e4,
      maxOpenMs: 3e5,
      debounceMs: 500,
      markBandBps: 25,
      solPriceDriftBps: 50,
      tapWaitMs: 1500,
    },
    r = new Set([
      "presign_disabled",
      "hl_unavailable",
      "perps_disabled",
      "REGION_RESTRICTED",
      "RATE_LIMITED",
      "bridge_held",
      "recipient_refused",
      "region_restricted",
    ]),
    i = new Map(),
    a = 0,
    s = (e) => {
      for (let t of i.values()) if (t.key === e) return t;
      return null;
    },
    n = (e, r = Date.now()) => r - e.requestedAt > t.maxAgeMs,
    o = (e, t, r) =>
      null !== e &&
      e > 0 &&
      null != t &&
      t > 0 &&
      1e4 * Math.abs(t / e - 1) > r,
    d = (e, { markPx: r, solPriceUsd: i }) =>
      o(e.markPx, r, t.markBandBps) || o(e.solPriceUsd, i, t.solPriceDriftBps);
  e.s([
    "i",
    0,
    r,
    "s",
    0,
    3e3,
    "t",
    0,
    t,
    "a",
    0,
    () => a,
    "D",
    0,
    s,
    "_",
    0,
    d,
    "q",
    0,
    n,
    "b",
    0,
    (e, { markPx: t, solPriceUsd: r, now: a = Date.now() }) => {
      if (0 === i.size) return { miss: "none" };
      let o = s(e);
      return null === o
        ? { miss: "key" }
        : o.consumed
          ? { miss: "consumed" }
          : n(o, a)
            ? { miss: "expired" }
            : d(o, { markPx: t, solPriceUsd: r })
              ? { miss: "price" }
              : ((o.consumed = !0), { hit: o });
    },
    "x",
    0,
    () => {
      ((a += 1), i.clear());
    },
    "O",
    0,
    (e) => {
      e.epoch === a && i.set(e.coin, e);
    },
  ]);
};
