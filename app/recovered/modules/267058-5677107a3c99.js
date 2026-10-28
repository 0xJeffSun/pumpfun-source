// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(496194),
    i = r.i(499868),
    o = r.i(451993);
  let t = async ({
      chain: r,
      address: t,
      appId: n,
      rpcConfig: l,
      erc20Address: s,
    }) => {
      let c = (0, e.f)({ chain: r, transport: (0, i.f)((0, o.a)(r, l, n)) });
      return {
        balance: await c
          .readContract({
            address: s,
            abi: a,
            functionName: "balanceOf",
            args: [t],
          })
          .catch(() => 0n),
        chain: r,
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
  r.s(["g", 0, t]);
};
