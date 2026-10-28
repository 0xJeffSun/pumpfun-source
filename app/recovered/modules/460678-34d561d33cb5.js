// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(526960),
    n = e.i(965142);
  async function i(e) {
    let { authorization: i, signature: r } = e;
    return (0, t.f)({ hash: (0, n.f)(i), signature: r ?? i });
  }
  e.s(["f", 0, i]);
};
