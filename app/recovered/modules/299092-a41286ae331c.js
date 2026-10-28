// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(913719),
    n = e.i(84976);
  let i = ({
      paymentAsset: e,
      usdcBalanceUi: t,
      solBalanceLamports: n,
      buyInputUnit: i,
      solUsdPrice: a,
      skimReserveUi: r,
      sharePercent: s,
    }) => {
      let l = Math.min(Math.max(s, 0), 100) / 100;
      if ("usdc" === e)
        return null === t
          ? null
          : (Math.floor(Math.max(t - r, 0) * l * 100) / 100).toFixed(2);
      let o = Math.max(n / 1e9 - 0.005 - r, 0) * l;
      return "usd" === i ? (o * a).toFixed(2) : o.toFixed(4);
    },
    a = (e) => i({ ...e, sharePercent: 100 }),
    r = ({ value: e, paymentAsset: i, buyInputUnit: a, solUsdPrice: r }) => {
      if ("usdc" === i) return (0, t.v)(e, (0, n.q)(i));
      if ("usd" === a) {
        let i = Number(e);
        return !Number.isFinite(i) || i <= 0 || r <= 0
          ? null
          : (0, t.v)((i / r).toFixed(9), n.f);
      }
      return (0, t.v)(e, n.f);
    };
  e.s([
    "Z",
    0,
    1e9,
    "D",
    0,
    0.005,
    "W",
    0,
    r,
    "I",
    0,
    ({ paymentAsset: e, atomicAmount: t }) => {
      if (null === t || t <= BigInt(0)) return null;
      let n = t.toString();
      return "usdc" === e
        ? { kind: "usdc", amountIn: n }
        : { kind: "sol", lamports: n };
    },
    "m",
    0,
    i,
    "j",
    0,
    (e) => {
      let t = a(e);
      return null === t
        ? null
        : (r({
            value: t,
            paymentAsset: e.paymentAsset,
            buyInputUnit: e.buyInputUnit,
            solUsdPrice: e.solUsdPrice,
          }) ?? BigInt(0));
    },
    "q",
    0,
    a,
  ]);
};
