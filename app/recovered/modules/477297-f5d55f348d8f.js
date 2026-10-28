// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(440519),
    r = e.i(620016),
    n = e.i(421957),
    i = e.i(698174),
    a = e.i(586844),
    s = e.i(859095);
  async function o(
    e,
    {
      address: u,
      blockHash: l,
      blockNumber: c,
      blockTag: f = e.experimental_blockTag ?? "latest",
      requireCanonical: d,
    },
  ) {
    let p = (0, i.f)({
      blockHash: l,
      blockNumber: c,
      blockTag: f,
      requireCanonical: d,
    });
    if (e.batch?.multicall && e.chain?.contracts?.multicall3) {
      let i = e.chain.contracts.multicall3.address,
        o = (0, n.f)({ abi: t.v, functionName: "getEthBalance", args: [u] }),
        { data: p } = await (0, a.f)(
          e,
          s.f,
          "call",
        )({
          to: i,
          data: o,
          blockHash: l,
          blockNumber: c,
          blockTag: f,
          requireCanonical: d,
        });
      return (0, r.f)({
        abi: t.v,
        functionName: "getEthBalance",
        args: [u],
        data: p || "0x",
      });
    }
    return BigInt(
      await e.request({ method: "eth_getBalance", params: [u, p] }),
    );
  }
  async function u(e) {
    return BigInt(await e.request({ method: "eth_blobBaseFee" }));
  }
  (e.s(["f", 0, o], 477297), e.s(["f", 0, u], 658738));
};
