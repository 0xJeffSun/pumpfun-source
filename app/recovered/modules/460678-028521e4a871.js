// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(526960),
    n = e.i(965142);
  async function r(e) {
    let { authorization: r, signature: s } = e;
    return (0, t.f)({ hash: (0, n.f)(r), signature: s ?? r });
  }
  e.s(["f", 0, r]);
};
