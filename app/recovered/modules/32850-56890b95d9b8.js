// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(462024);
  let n = t.i.SOL.mint,
    r = t.i.USDC.mint,
    i = (e, t, i) => {
      if ("number" == typeof t) return t;
      let s = i?.find((t) => t.mintAddress === e)?.decimalsSnapshot;
      return "number" == typeof s ? s : e === n ? 9 : 6 * (e === r);
    };
  e.s([
    "f",
    0,
    n,
    "n",
    0,
    r,
    "i",
    0,
    (e, t) => {
      if (!e || !/^\d+$/.test(e)) return 0;
      if (t <= 0) {
        let t = Number(e);
        return Number.isFinite(t) ? t : 0;
      }
      let n = e.padStart(t + 1, "0"),
        r = n.slice(0, n.length - t),
        i = n.slice(n.length - t),
        s = Number(`${r}.${i}`);
      return Number.isFinite(s) ? s : 0;
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
