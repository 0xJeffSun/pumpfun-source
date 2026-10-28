// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(417672);
  let n = "0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00",
    i = `0x${"0".repeat(64)}`,
    r = [
      {
        type: "function",
        name: "execute",
        stateMutability: "payable",
        inputs: [
          {
            name: "signedBatchedCall",
            type: "tuple",
            components: [
              {
                name: "batchedCall",
                type: "tuple",
                components: [
                  {
                    name: "calls",
                    type: "tuple[]",
                    components: [
                      { name: "to", type: "address" },
                      { name: "value", type: "uint256" },
                      { name: "data", type: "bytes" },
                    ],
                  },
                  { name: "revertOnFailure", type: "bool" },
                ],
              },
              { name: "nonce", type: "uint256" },
              { name: "keyHash", type: "bytes32" },
              { name: "executor", type: "address" },
              { name: "deadline", type: "uint256" },
            ],
          },
          { name: "wrappedSignature", type: "bytes" },
        ],
        outputs: [],
      },
      {
        type: "function",
        name: "getSeq",
        stateMutability: "view",
        inputs: [{ name: "key", type: "uint256" }],
        outputs: [{ name: "", type: "uint256" }],
      },
    ];
  e.s([
    "c",
    0,
    r,
    "B",
    0,
    n,
    "q",
    0,
    {
      SignedBatchedCall: [
        { name: "batchedCall", type: "BatchedCall" },
        { name: "nonce", type: "uint256" },
        { name: "keyHash", type: "bytes32" },
        { name: "executor", type: "address" },
        { name: "deadline", type: "uint256" },
      ],
      BatchedCall: [
        { name: "calls", type: "Call[]" },
        { name: "revertOnFailure", type: "bool" },
      ],
      Call: [
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
        { name: "data", type: "bytes" },
      ],
    },
    "f",
    0,
    i,
    "s",
    0,
    "0x0000000000000000000000000000000000000000",
    "L",
    0,
    () => (0, t.g)(n, { dir: "left", size: 32 }),
  ]);
};
