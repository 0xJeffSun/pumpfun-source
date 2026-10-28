// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var r = e.i(867599);
  function o(e, r = 6, i = !1, a = !1) {
    let n = (parseFloat(e.toString()) / 1e9)
        .toFixed(r)
        .replace(/0+$/, "")
        .replace(/\.$/, ""),
      t = a ? "" : " SOL";
    return i ? `${n}${t}` : `${"0" === n ? "<0.001" : n}${t}`;
  }
  e.s([
    "a",
    0,
    function ({ amount: e, fee: i, tokenPrice: a, isUsdc: n }) {
      let t = BigInt(Math.floor(parseFloat(e) * 10 ** (n ? 6 : 9))),
        l = n ? t : t + i;
      return {
        fundingAmountInBaseUnit: t,
        fundingAmountInUsd: a ? (0, r.g)(t, a) : void 0,
        totalPriceInUsd: a ? (0, r.g)(l, a) : void 0,
        totalPriceInNativeCurrency: o(l),
        feePriceInNativeCurrency: o(i),
        feePriceInUsd: a ? (0, r.g)(i, a) : void 0,
      };
    },
    "g",
    0,
    o,
  ]);
};
