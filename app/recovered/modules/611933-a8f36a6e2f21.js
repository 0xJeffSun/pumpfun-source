// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(147864),
    r = e.i(891487);
  async function n(e, { hash: i }) {
    let a = await e.request(
      { method: "eth_getTransactionReceipt", params: [i] },
      { dedupe: !0 },
    );
    if (!a) throw new t.r({ hash: i });
    return (e.chain?.formatters?.transactionReceipt?.format || r.L)(
      a,
      "getTransactionReceipt",
    );
  }
  e.s(["f", 0, n]);
};
