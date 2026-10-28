// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(934429),
    r = e.i(703114);
  e.i(743699);
  var n = e.i(943343);
  function i(e, t) {
    let r = (e.transactions ?? []).map((e) =>
      "string" == typeof e ? e : (0, n.F)(e),
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
      transactions: r,
      totalDifficulty: e.totalDifficulty ? BigInt(e.totalDifficulty) : null,
    };
  }
  async function a(
    e,
    {
      blockHash: n,
      blockNumber: s,
      blockTag: o = e.experimental_blockTag ?? "latest",
      includeTransactions: u,
    } = {},
  ) {
    let l = u ?? !1,
      c = void 0 !== s ? (0, r.N)(s) : void 0,
      f = null;
    if (
      !(f = n
        ? await e.request(
            { method: "eth_getBlockByHash", params: [n, l] },
            { dedupe: !0 },
          )
        : await e.request(
            { method: "eth_getBlockByNumber", params: [c || o, l] },
            { dedupe: !!c },
          ))
    )
      throw new t.f({ blockHash: n, blockNumber: s });
    return (e.chain?.formatters?.block?.format || i)(f, "getBlock");
  }
  (e.s(["f", 0, i], 970358), e.s(["f", 0, a], 95285));
};
