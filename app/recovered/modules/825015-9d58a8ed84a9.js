// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(53479);
  e.s([
    "q",
    0,
    (e) =>
      Math.min(
        Math.round(100 * (Number.isFinite(e) && e >= 0 ? e : t.V)),
        9999,
      ),
    "i",
    0,
    (e) =>
      (({
        frontRunningProtection: e,
        tipAmount: n,
        defaultTip: i = t.Z,
        sendDefaultTipExplicitly: a,
      }) => {
        if (!e) return 0;
        let s = Number.isFinite(n) && n > 0 ? n : i;
        if (s !== i || a) return Math.min(Math.floor(1e9 * s), 5e6);
      })({ ...e, sendDefaultTipExplicitly: !1 }),
  ]);
};
