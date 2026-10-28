// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = (e) =>
    e && Number.isFinite(e) && !(e <= 0)
      ? Math.min(240, Math.max(60, Math.floor(e / 5)))
      : 240;
  e.s([
    "Z",
    0,
    2,
    "N",
    0,
    400,
    "v",
    0,
    6,
    "q",
    0,
    t,
    "O",
    0,
    ({ candles: e, paneWidthPx: r }) => {
      if (!e?.length) return null;
      let i = e
        .map((e) => e.timestamp)
        .filter((e) => Number.isFinite(e))
        .sort((e, t) => e - t);
      if (0 === i.length) return null;
      let l = t(r),
        a = i[Math.max(0, i.length - l)],
        n = i[i.length - 1];
      return a === n
        ? null
        : { from: Math.floor(a / 1e3), to: Math.floor(n / 1e3) };
    },
  ]);
};
