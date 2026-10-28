// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(541710),
    r = e.i(646908),
    a = e.i(605587);
  let i = (e) => {
    let t = e.base_decimals;
    return "number" == typeof t && Number.isInteger(t) && t > 0 ? t : null;
  };
  e.s([
    "e",
    0,
    (e) => (0, r.e)(e) && null !== i(e),
    "W",
    0,
    (e) =>
      !(0, a.N)({ mint: e.mint, chainId: e.chain_id }) &&
      !(0, r.e)(e) &&
      null == (0, t.T)(e.chain_id),
    "I",
    0,
    i,
  ]);
};
