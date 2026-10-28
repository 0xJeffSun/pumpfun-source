// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(586844),
    r = e.i(274994),
    n = e.i(897161);
  async function i(e, { hash: a, transactionReceipt: s }) {
    let [o, u] = await Promise.all([
        (0, t.f)(e, r.f, "getBlockNumber")({}),
        a ? (0, t.f)(e, n.f, "getTransaction")({ hash: a }) : void 0,
      ]),
      l = s?.blockNumber || u?.blockNumber;
    return l ? o - l + 1n : 0n;
  }
  e.s(["f", 0, i]);
};
