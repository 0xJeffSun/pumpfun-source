// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(462024);
  let r = t.i.SOL.mint,
    n = t.i.USDC.mint,
    i = (e, t, i) => {
      if ("number" == typeof t) return t;
      let a = i?.find((t) => t.mintAddress === e)?.decimalsSnapshot;
      return "number" == typeof a ? a : e === r ? 9 : 6 * (e === n);
    };
  e.s([
    "f",
    0,
    r,
    "n",
    0,
    n,
    "i",
    0,
    (e, t) => {
      if (!e || !/^\d+$/.test(e)) return 0;
      if (t <= 0) {
        let t = Number(e);
        return Number.isFinite(t) ? t : 0;
      }
      let r = e.padStart(t + 1, "0"),
        n = r.slice(0, r.length - t),
        i = r.slice(r.length - t),
        a = Number(`${n}.${i}`);
      return Number.isFinite(a) ? a : 0;
    },
    "Q",
    0,
    (e) =>
      e.mintAddress
        ? i(e.mintAddress, e.decimalsSnapshot)
        : "number" == typeof e.decimalsSnapshot
          ? e.decimalsSnapshot
          : 0,
    "K",
    0,
    i,
    "t",
    0,
    (e, t) =>
      t && t.length > 0
        ? t
        : e.rewardLegSnapshots && e.rewardLegSnapshots.length > 0
          ? e.rewardLegSnapshots
          : (t ?? []),
  ]);
};
