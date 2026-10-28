// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(867599);
  function n(e, t = 6, a = !1, i = !1) {
    let s = (parseFloat(e.toString()) / 1e9)
        .toFixed(t)
        .replace(/0+$/, "")
        .replace(/\.$/, ""),
      r = i ? "" : " SOL";
    return a ? `${s}${r}` : `${"0" === s ? "<0.001" : s}${r}`;
  }
  e.s([
    "a",
    0,
    function ({ amount: e, fee: a, tokenPrice: i, isUsdc: s }) {
      let r = BigInt(Math.floor(parseFloat(e) * 10 ** (s ? 6 : 9))),
        o = s ? r : r + a;
      return {
        fundingAmountInBaseUnit: r,
        fundingAmountInUsd: i ? (0, t.g)(r, i) : void 0,
        totalPriceInUsd: i ? (0, t.g)(o, i) : void 0,
        totalPriceInNativeCurrency: n(o),
        feePriceInNativeCurrency: n(a),
        feePriceInUsd: i ? (0, t.g)(a, i) : void 0,
      };
    },
    "g",
    0,
    n,
  ]);
};
