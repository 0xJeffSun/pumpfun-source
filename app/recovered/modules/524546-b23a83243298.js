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
      let l = e
        .map((e) => e.timestamp)
        .filter((e) => Number.isFinite(e))
        .sort((e, t) => e - t);
      if (0 === l.length) return null;
      let a = t(r),
        o = l[Math.max(0, l.length - a)],
        i = l[l.length - 1];
      return o === i
        ? null
        : { from: Math.floor(o / 1e3), to: Math.floor(i / 1e3) };
    },
  ]);
};
