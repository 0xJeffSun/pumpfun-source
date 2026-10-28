// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(339513),
    r = e.i(743699),
    n = e.i(548291),
    i = e.i(943343);
  let a = { "0x0": "reverted", "0x1": "success" };
  function s(e, r) {
    let s = {
      ...e,
      blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
      contractAddress: e.contractAddress ? e.contractAddress : null,
      cumulativeGasUsed: e.cumulativeGasUsed
        ? BigInt(e.cumulativeGasUsed)
        : null,
      effectiveGasPrice: e.effectiveGasPrice
        ? BigInt(e.effectiveGasPrice)
        : null,
      gasUsed: e.gasUsed ? BigInt(e.gasUsed) : null,
      logs: e.logs ? e.logs.map((e) => (0, n.f)(e)) : null,
      to: e.to ? e.to : null,
      transactionIndex: e.transactionIndex
        ? (0, t.T)(e.transactionIndex)
        : null,
      status: e.status ? a[e.status] : null,
      type: e.type ? i.g[e.type] || e.type : null,
    };
    return (
      e.blobGasPrice && (s.blobGasPrice = BigInt(e.blobGasPrice)),
      e.blobGasUsed && (s.blobGasUsed = BigInt(e.blobGasUsed)),
      s
    );
  }
  let o = (0, r.f)("transactionReceipt", s);
  e.s(["l", 0, o, "L", 0, s, "b", 0, a]);
};
