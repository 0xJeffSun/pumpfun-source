// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(370917),
    s = e.i(382772);
  let i = {
    "0x0": "legacy",
    "0x1": "eip2930",
    "0x2": "eip1559",
    "0x3": "eip4844",
    "0x4": "eip7702",
  };
  function r(e, t) {
    let r = {
      ...e,
      blockHash: e.blockHash ? e.blockHash : null,
      blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
      chainId: e.chainId ? (0, s.T)(e.chainId) : void 0,
      gas: e.gas ? BigInt(e.gas) : void 0,
      gasPrice: e.gasPrice ? BigInt(e.gasPrice) : void 0,
      maxFeePerBlobGas: e.maxFeePerBlobGas
        ? BigInt(e.maxFeePerBlobGas)
        : void 0,
      maxFeePerGas: e.maxFeePerGas ? BigInt(e.maxFeePerGas) : void 0,
      maxPriorityFeePerGas: e.maxPriorityFeePerGas
        ? BigInt(e.maxPriorityFeePerGas)
        : void 0,
      nonce: e.nonce ? (0, s.T)(e.nonce) : void 0,
      to: e.to ? e.to : null,
      transactionIndex: e.transactionIndex ? Number(e.transactionIndex) : null,
      type: e.type ? i[e.type] : void 0,
      typeHex: e.type ? e.type : void 0,
      value: e.value ? BigInt(e.value) : void 0,
      v: e.v ? BigInt(e.v) : void 0,
    };
    return (
      e.authorizationList &&
        (r.authorizationList = e.authorizationList.map((e) => ({
          address: e.address,
          chainId: Number(e.chainId),
          nonce: Number(e.nonce),
          r: e.r,
          s: e.s,
          yParity: Number(e.yParity),
        }))),
      (r.yParity = (() => {
        if (e.yParity) return Number(e.yParity);
        if ("bigint" == typeof r.v) {
          if (0n === r.v || 27n === r.v) return 0;
          if (1n === r.v || 28n === r.v) return 1;
          if (r.v >= 35n) return +(r.v % 2n === 0n);
        }
      })()),
      "legacy" === r.type &&
        (delete r.accessList,
        delete r.maxFeePerBlobGas,
        delete r.maxFeePerGas,
        delete r.maxPriorityFeePerGas,
        delete r.yParity),
      "eip2930" === r.type &&
        (delete r.maxFeePerBlobGas,
        delete r.maxFeePerGas,
        delete r.maxPriorityFeePerGas),
      "eip1559" === r.type && delete r.maxFeePerBlobGas,
      r
    );
  }
  let n = (0, t.f)("transaction", r);
  function a(e, t) {
    let s = (e.transactions ?? []).map((e) =>
      "string" == typeof e ? e : r(e),
    );
    return {
      ...e,
      baseFeePerGas: e.baseFeePerGas ? BigInt(e.baseFeePerGas) : null,
      blobGasUsed: e.blobGasUsed ? BigInt(e.blobGasUsed) : void 0,
      difficulty: e.difficulty ? BigInt(e.difficulty) : void 0,
      excessBlobGas: e.excessBlobGas ? BigInt(e.excessBlobGas) : void 0,
      gasLimit: e.gasLimit ? BigInt(e.gasLimit) : void 0,
      gasUsed: e.gasUsed ? BigInt(e.gasUsed) : void 0,
      hash: e.hash ? e.hash : null,
      logsBloom: e.logsBloom ? e.logsBloom : null,
      nonce: e.nonce ? e.nonce : null,
      number: e.number ? BigInt(e.number) : null,
      size: e.size ? BigInt(e.size) : void 0,
      timestamp: e.timestamp ? BigInt(e.timestamp) : void 0,
      transactions: s,
      totalDifficulty: e.totalDifficulty ? BigInt(e.totalDifficulty) : null,
    };
  }
  e.s(["K", 0, n, "F", 0, r, "g", 0, i], 787821);
  let o = (0, t.f)("block", a);
  function l(e, { args: t, eventName: s } = {}) {
    return {
      ...e,
      blockHash: e.blockHash ? e.blockHash : null,
      blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
      blockTimestamp: e.blockTimestamp
        ? BigInt(e.blockTimestamp)
        : null === e.blockTimestamp
          ? null
          : void 0,
      logIndex: e.logIndex ? Number(e.logIndex) : null,
      transactionHash: e.transactionHash ? e.transactionHash : null,
      transactionIndex: e.transactionIndex ? Number(e.transactionIndex) : null,
      ...(s ? { args: t, eventName: s } : {}),
    };
  }
  (e.s(["B", 0, o, "K", 0, a], 694810), e.s(["f", 0, l], 564099));
  let c = { "0x0": "reverted", "0x1": "success" };
  function d(e, t) {
    let r = {
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
      logs: e.logs ? e.logs.map((e) => l(e)) : null,
      to: e.to ? e.to : null,
      transactionIndex: e.transactionIndex
        ? (0, s.T)(e.transactionIndex)
        : null,
      status: e.status ? c[e.status] : null,
      type: e.type ? i[e.type] || e.type : null,
    };
    return (
      e.blobGasPrice && (r.blobGasPrice = BigInt(e.blobGasPrice)),
      e.blobGasUsed && (r.blobGasUsed = BigInt(e.blobGasUsed)),
      r
    );
  }
  let u = (0, t.f)("transactionReceipt", d);
  e.s(["l", 0, u, "L", 0, d, "b", 0, c], 767924);
};
