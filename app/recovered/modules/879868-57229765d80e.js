// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(136636),
    i = e.i(526960);
  async function n(e) {
    let { domain: n, message: r, primaryType: s, signature: o, types: a } = e;
    return (0, i.f)({
      hash: (0, t.f)({ domain: n, message: r, primaryType: s, types: a }),
      signature: o,
    });
  }
  e.s(["f", 0, n]);
};
