// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(867599);
  function o(r, e = 6, i = !1, a = !1) {
    let t = (parseFloat(r.toString()) / 1e9)
        .toFixed(e)
        .replace(/0+$/, "")
        .replace(/\.$/, ""),
      n = a ? "" : " SOL";
    return i ? `${t}${n}` : `${"0" === t ? "<0.001" : t}${n}`;
  }
  r.s([
    "a",
    0,
    function ({ amount: r, fee: i, tokenPrice: a, isUsdc: t }) {
      let n = BigInt(Math.floor(parseFloat(r) * 10 ** (t ? 6 : 9))),
        l = t ? n : n + i;
      return {
        fundingAmountInBaseUnit: n,
        fundingAmountInUsd: a ? (0, e.g)(n, a) : void 0,
        totalPriceInUsd: a ? (0, e.g)(l, a) : void 0,
        totalPriceInNativeCurrency: o(l),
        feePriceInNativeCurrency: o(i),
        feePriceInUsd: a ? (0, e.g)(i, a) : void 0,
      };
    },
    "g",
    0,
    o,
  ]);
};
