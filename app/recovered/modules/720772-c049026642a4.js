// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.i(541710);
  var t = e.i(646908),
    l = e.i(605587);
  let r = (e) => {
    if (
      !e ||
      (0, t.B)(e.chain_id) ||
      !(0, l.N)({ mint: e.mint, chainId: e.chain_id })
    )
      return null;
    let r = Number((0, l.w)(e.chain_id));
    return Number.isInteger(r) && r > 0 ? r : null;
  };
  e.s([
    "B",
    0,
    (e) =>
      !(
        null == e ||
        (0, t.B)(e.chain_id) ||
        (0, t._)(e.chain_id) ||
        (0, t.L)(e.chain_id)
      ) &&
      ((0, l.N)({ mint: e.mint, chainId: e.chain_id })
        ? null != r(e)
        : !!e.program),
    "X",
    0,
    r,
    "c",
    0,
    (e) => {
      let t = r(e);
      if (null == t)
        throw Error(
          `EVM coin ${e.mint} has no resolvable chain id (${e.chain_id})`,
        );
      return t;
    },
  ]);
};
