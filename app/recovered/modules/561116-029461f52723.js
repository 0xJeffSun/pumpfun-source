// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(541710),
    l = e.i(646908),
    r = e.i(605587);
  let n = (e) => {
    let t = e.base_decimals;
    return "number" == typeof t && Number.isInteger(t) && t > 0 ? t : null;
  };
  e.s([
    "e",
    0,
    (e) => (0, l.e)(e) && null !== n(e),
    "W",
    0,
    (e) =>
      !(0, r.N)({ mint: e.mint, chainId: e.chain_id }) &&
      !(0, l.e)(e) &&
      null == (0, t.T)(e.chain_id),
    "I",
    0,
    n,
  ]);
};
