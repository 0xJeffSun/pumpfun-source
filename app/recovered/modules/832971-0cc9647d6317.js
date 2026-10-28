// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(889451),
    n = e.i(674801),
    s = e.i(639374);
  let i = (e) =>
    "number" == typeof e && Number.isFinite(e) && e > 0 ? e : null;
  e.s([
    "f",
    0,
    0.001,
    "P",
    0,
    (e) => {
      if (
        !(e.chainId === n.S || (null == e.chainId && (0, s.f)(e.coinMint))) ||
        !0 === e.hasTransfers ||
        !e.walletAddress ||
        !(0, s.f)(e.walletAddress)
      )
        return !1;
      let t = i(e.costBasisAmount);
      return (
        null != t &&
        (Number.isFinite(e.amountHeld) ? e.amountHeld : 0) < 0.999 * t
      );
    },
    "N",
    0,
    (e, n) => {
      let s = i(n);
      if (null == s) return e;
      let r = Number.isFinite(e.amountHeld) ? e.amountHeld : 0;
      if (Math.abs(s - r) <= 0.001 * s) return e;
      let a = i(e.valueUsd),
        l = i(e.tokenPriceUsd) ?? (null != a && r > 0 ? a / r : null);
      if (null == l) return e;
      let u = s * l,
        o = e.realizedPnlUsd,
        d = e.costBasisUsd,
        p =
          "number" == typeof o &&
          Number.isFinite(o) &&
          "number" == typeof d &&
          Number.isFinite(d),
        c = p ? o + u - d : e.pnlUsd,
        m =
          (p && null != c ? (0, t.i)(c, { ...e, isExited: !1 }) : null) ??
          e.pnlPercentage;
      return {
        ...e,
        amountHeld: s,
        valueUsd: u,
        pnlUsd: c,
        pnlPercentage: m,
        isExited: !1,
        heldFromChain: !0,
      };
    },
  ]);
};
