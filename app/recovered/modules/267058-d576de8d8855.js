// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(r) => {
  var e = r.i(496194),
    o = r.i(499868),
    i = r.i(451993);
  let a = async ({
      chain: r,
      address: a,
      appId: n,
      rpcConfig: l,
      erc20Address: c,
    }) => {
      let s = (0, e.f)({ chain: r, transport: (0, o.f)((0, i.a)(r, l, n)) });
      return {
        balance: await s
          .readContract({
            address: c,
            abi: t,
            functionName: "balanceOf",
            args: [a],
          })
          .catch(() => 0n),
        chain: r,
      };
    },
    t = [
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
  r.s(["g", 0, a]);
};
