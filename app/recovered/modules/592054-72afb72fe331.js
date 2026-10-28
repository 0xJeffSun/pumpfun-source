// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(90832);
  e.s([
    "G",
    0,
    function ({ solBalanceUi: e }) {
      return !Number.isFinite(e) || e <= 0 ? 0 : e;
    },
    "I",
    0,
    (e) => (e ?? "token").replace(/^\$/, ""),
    "C",
    0,
    function ({ value: e, symbol: n }) {
      return "SOL" === n || "USDC" === n
        ? `${(0, t.m)(e, 4)} ${n}`
        : `${(0, t.p)(e, 4)} ${n}`;
    },
    "N",
    0,
    function (e) {
      return Number.isFinite(e) ? `${Number((e / 100).toFixed(2))}%` : "0%";
    },
    "g",
    0,
    function (e) {
      return !Number.isFinite(e) || e <= 0
        ? "0%"
        : e < 0.01
          ? "<0.01%"
          : e < 10
            ? `${e.toFixed(2)}%`
            : `${e.toFixed(1)}%`;
    },
    "n",
    0,
    function ({
      quoteTarget: e,
      paymentPerToken: t,
      balanceAtomic: n,
      tokenDecimals: l,
      balanceUi: i,
      displayDecimals: a,
    }) {
      if (!Number.isFinite(e) || e <= 0 || !Number.isFinite(t) || t <= 0)
        return null;
      let r = e / t;
      if (!Number.isFinite(r) || r <= 0) return null;
      if (null === n || n <= BigInt(0))
        return { tokensUi: r, atomicAmount: null, isSellAll: !1 };
      let s = i * t,
        o = Math.max(10 ** -a, 0.001 * s),
        u = s > 0 && Math.abs(e - s) <= o,
        c = BigInt(Math.floor(r * 10 ** l));
      return u || c === n
        ? { tokensUi: i, atomicAmount: n, isSellAll: !0 }
        : { tokensUi: r, atomicAmount: null, isSellAll: !1 };
    },
    "P",
    0,
    function (e) {
      return Number.isFinite(e) ? Math.min(Math.max(1 - e / 100, 0), 1) : 1;
    },
  ]);
};
