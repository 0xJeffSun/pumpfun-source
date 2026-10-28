// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(136636),
    n = e.i(526960);
  async function i(e) {
    let { domain: i, message: r, primaryType: s, signature: o, types: a } = e;
    return (0, n.f)({
      hash: (0, t.f)({ domain: i, message: r, primaryType: s, types: a }),
      signature: o,
    });
  }
  e.s(["f", 0, i]);
};
