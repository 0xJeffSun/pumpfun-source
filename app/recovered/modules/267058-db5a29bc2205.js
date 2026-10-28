// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(496194),
    i = e.i(499868),
    n = e.i(451993);
  let r = async ({
      chain: e,
      address: r,
      appId: s,
      rpcConfig: o,
      erc20Address: l,
    }) => {
      let d = (0, t.f)({ chain: e, transport: (0, i.f)((0, n.a)(e, o, s)) });
      return {
        balance: await d
          .readContract({
            address: l,
            abi: a,
            functionName: "balanceOf",
            args: [r],
          })
          .catch(() => 0n),
        chain: e,
      };
    },
    a = [
      {
        constant: !0,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        payable: !1,
        stateMutability: "view",
        type: "function",
      },
    ];
  e.s(["g", 0, r]);
};
