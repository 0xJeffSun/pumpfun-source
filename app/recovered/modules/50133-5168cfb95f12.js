// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(352386),
    r = e.i(518664),
    n = e.i(427140),
    u = e.i(653805);
  let l = (e, t) =>
    e.tokenUsdPrice === t.tokenUsdPrice &&
    e.observedAtMs === t.observedAtMs &&
    e.source === t.source;
  e.s([
    "f",
    0,
    (e) => {
      let i = (0, t.useCallback)((t) => (0, n.f)(e, t.coins[e.mint]), [e]);
      return (0, r.f)(u.x, i, { isEqual: l });
    },
  ]);
};
