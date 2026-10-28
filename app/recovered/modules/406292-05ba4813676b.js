// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(496194),
    n = e.i(499868),
    a = e.i(451993);
  let i = async ({ address: e, chain: i, rpcConfig: r, privyAppId: o }) => {
      try {
        let l = (0, t.f)({ chain: i, transport: (0, n.f)((0, a.a)(i, r, o)) }),
          [d, c] = await Promise.all([
            l.readContract({ abi: s, address: e, functionName: "symbol" }),
            l.readContract({ abi: s, address: e, functionName: "decimals" }),
          ]);
        return { decimals: c, symbol: d };
      } catch (e) {
        return (console.log(e), null);
      }
    },
    s = [
      {
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
    ];
  e.s(["g", 0, i]);
};
