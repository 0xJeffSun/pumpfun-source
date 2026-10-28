// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(867599);
  function n(e, t = 6, a = !1, i = !1) {
    let r = (parseFloat(e.toString()) / 1e9)
        .toFixed(t)
        .replace(/0+$/, "")
        .replace(/\.$/, ""),
      o = i ? "" : " SOL";
    return a ? `${r}${o}` : `${"0" === r ? "<0.001" : r}${o}`;
  }
  e.s([
    "a",
    0,
    function ({ amount: e, fee: a, tokenPrice: i, isUsdc: r }) {
      let o = BigInt(Math.floor(parseFloat(e) * 10 ** (r ? 6 : 9))),
        s = r ? o : o + a;
      return {
        fundingAmountInBaseUnit: o,
        fundingAmountInUsd: i ? (0, t.g)(o, i) : void 0,
        totalPriceInUsd: i ? (0, t.g)(s, i) : void 0,
        totalPriceInNativeCurrency: n(s),
        feePriceInNativeCurrency: n(a),
        feePriceInUsd: i ? (0, t.g)(a, i) : void 0,
      };
    },
    "g",
    0,
    n,
  ]);
};
