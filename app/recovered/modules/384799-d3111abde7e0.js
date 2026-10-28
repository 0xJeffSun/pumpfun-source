// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(867599);
  function n(e, t = 6, a = !1, r = !1) {
    let i = (parseFloat(e.toString()) / 1e9)
        .toFixed(t)
        .replace(/0+$/, "")
        .replace(/\.$/, ""),
      o = r ? "" : " SOL";
    return a ? `${i}${o}` : `${"0" === i ? "<0.001" : i}${o}`;
  }
  e.s([
    "a",
    0,
    function ({ amount: e, fee: a, tokenPrice: r, isUsdc: i }) {
      let o = BigInt(Math.floor(parseFloat(e) * 10 ** (i ? 6 : 9))),
        s = i ? o : o + a;
      return {
        fundingAmountInBaseUnit: o,
        fundingAmountInUsd: r ? (0, t.g)(o, r) : void 0,
        totalPriceInUsd: r ? (0, t.g)(s, r) : void 0,
        totalPriceInNativeCurrency: n(s),
        feePriceInNativeCurrency: n(a),
        feePriceInUsd: r ? (0, t.g)(a, r) : void 0,
      };
    },
    "g",
    0,
    n,
  ]);
};
