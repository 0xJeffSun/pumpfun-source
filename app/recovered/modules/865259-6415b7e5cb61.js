// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) =>
      null == e || !Number.isFinite(e) || e < 0
        ? null
        : Math.min(Math.round(e), 1e4),
    r = (e) => (e / 1e4) * 100,
    n = ({ grossReceive: e, transferFeeBps: r }) => {
      let n = t(r);
      return null === n || 0 === n || !Number.isFinite(e) || e <= 0
        ? e
        : e * (1 - n / 1e4);
    },
    i = (e) => (e >= 30 ? "confirm" : e >= 10 ? "notice" : "info");
  e.s([
    "U",
    0,
    ({ rate: e, quotedReceive: t, quoteIsNet: l }) => {
      if (null === e || e.bps <= 0) return null;
      let a = r(e.bps);
      return {
        transferFeeBps: e.bps,
        taxPercent: a,
        source: e.source,
        netReceive: l ? t : n({ grossReceive: t, transferFeeBps: e.bps }),
        quoteIsNet: l,
        tier: i(a),
      };
    },
    "f",
    0,
    (e) => {
      let n = r(t(e) ?? 0)
        .toFixed(2)
        .replace(/\.?0+$/, "");
      return `${n}%`;
    },
    "v",
    0,
    (e) => "jupiter" === e,
    "q",
    0,
    n,
    "b",
    0,
    (e) => null !== e && "confirm" === e.tier,
    "L",
    0,
    ({ quoteBps: e, mintBps: r, coinBps: n }) => {
      let i = t(e);
      if (null !== i) return { bps: i, source: "quote" };
      let l = t(r);
      if (null !== l) return { bps: l, source: "mint" };
      let a = t(n);
      return null !== a ? { bps: a, source: "coin" } : null;
    },
    "l",
    0,
    r,
    "W",
    0,
    i,
  ]);
};
