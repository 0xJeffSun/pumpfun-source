// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(339513),
    r = e.i(743699);
  let n = {
    "0x0": "legacy",
    "0x1": "eip2930",
    "0x2": "eip1559",
    "0x3": "eip4844",
    "0x4": "eip7702",
  };
  function i(e, r) {
    let i = {
      ...e,
      blockHash: e.blockHash ? e.blockHash : null,
      blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
      ...(null != e.blockTimestamp && {
        blockTimestamp: BigInt(e.blockTimestamp),
      }),
      chainId: e.chainId ? (0, t.T)(e.chainId) : void 0,
      gas: e.gas ? BigInt(e.gas) : void 0,
      gasPrice: e.gasPrice ? BigInt(e.gasPrice) : void 0,
      maxFeePerBlobGas: e.maxFeePerBlobGas
        ? BigInt(e.maxFeePerBlobGas)
        : void 0,
      maxFeePerGas: e.maxFeePerGas ? BigInt(e.maxFeePerGas) : void 0,
      maxPriorityFeePerGas: e.maxPriorityFeePerGas
        ? BigInt(e.maxPriorityFeePerGas)
        : void 0,
      nonce: e.nonce ? (0, t.T)(e.nonce) : void 0,
      to: e.to ? e.to : null,
      transactionIndex: e.transactionIndex ? Number(e.transactionIndex) : null,
      type: e.type ? n[e.type] : void 0,
      typeHex: e.type ? e.type : void 0,
      value: e.value ? BigInt(e.value) : void 0,
      v: e.v ? BigInt(e.v) : void 0,
    };
    return (
      e.authorizationList &&
        (i.authorizationList = e.authorizationList.map((e) => ({
          address: e.address,
          chainId: Number(e.chainId),
          nonce: Number(e.nonce),
          r: e.r,
          s: e.s,
          yParity: Number(e.yParity),
        }))),
      (i.yParity = (() => {
        if (e.yParity) return Number(e.yParity);
        if ("bigint" == typeof i.v) {
          if (0n === i.v || 27n === i.v) return 0;
          if (1n === i.v || 28n === i.v) return 1;
          if (i.v >= 35n) return +(i.v % 2n === 0n);
        }
      })()),
      "legacy" === i.type &&
        (delete i.accessList,
        delete i.maxFeePerBlobGas,
        delete i.maxFeePerGas,
        delete i.maxPriorityFeePerGas,
        delete i.yParity),
      "eip2930" === i.type &&
        (delete i.maxFeePerBlobGas,
        delete i.maxFeePerGas,
        delete i.maxPriorityFeePerGas),
      "eip1559" === i.type && delete i.maxFeePerBlobGas,
      i
    );
  }
  let a = (0, r.f)("transaction", i);
  e.s(["K", 0, a, "F", 0, i, "g", 0, n]);
};
