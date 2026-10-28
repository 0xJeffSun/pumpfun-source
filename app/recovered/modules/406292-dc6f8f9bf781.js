// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(496194),
    n = e.i(499868),
    a = e.i(451993);
  let i = async ({ address: e, chain: i, rpcConfig: o, privyAppId: d }) => {
      try {
        let l = (0, t.f)({ chain: i, transport: (0, n.f)((0, a.a)(i, o, d)) }),
          [s, c] = await Promise.all([
            l.readContract({ abi: r, address: e, functionName: "symbol" }),
            l.readContract({ abi: r, address: e, functionName: "decimals" }),
          ]);
        return { decimals: c, symbol: s };
      } catch (e) {
        return (console.log(e), null);
      }
    },
    r = [
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
