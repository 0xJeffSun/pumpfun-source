// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(526960),
    r = e.i(965142);
  async function s(e) {
    let { authorization: s, signature: n } = e;
    return (0, t.f)({ hash: (0, r.f)(s), signature: n ?? s });
  }
  e.s(["f", 0, s]);
};
