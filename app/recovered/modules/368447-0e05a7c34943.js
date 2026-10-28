// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(147864),
    r = e.i(891487);
  async function n(
    e,
    { serializedTransaction: i, throwOnReceiptRevert: a, timeout: s },
  ) {
    let o = await e.request(
        { method: "eth_sendRawTransactionSync", params: s ? [i, s] : [i] },
        { retryCount: 0 },
      ),
      u = (e.chain?.formatters?.transactionReceipt?.format || r.L)(o);
    if ("reverted" === u.status && a) throw new t.E({ receipt: u });
    return u;
  }
  e.s(["f", 0, n]);
};
