// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(t) => {
  let e = [
      {
        inputs: [
          {
            components: [
              { name: "target", type: "address" },
              { name: "allowFailure", type: "bool" },
              { name: "callData", type: "bytes" },
            ],
            name: "calls",
            type: "tuple[]",
          },
        ],
        name: "aggregate3",
        outputs: [
          {
            components: [
              { name: "success", type: "bool" },
              { name: "returnData", type: "bytes" },
            ],
            name: "returnData",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getCurrentBlockTimestamp",
        outputs: [
          { internalType: "uint256", name: "timestamp", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    n = [
      {
        name: "query",
        type: "function",
        stateMutability: "view",
        inputs: [
          {
            type: "tuple[]",
            name: "queries",
            components: [
              { type: "address", name: "sender" },
              { type: "string[]", name: "urls" },
              { type: "bytes", name: "data" },
            ],
          },
        ],
        outputs: [
          { type: "bool[]", name: "failures" },
          { type: "bytes[]", name: "responses" },
        ],
      },
      {
        name: "HttpError",
        type: "error",
        inputs: [
          { type: "uint16", name: "status" },
          { type: "string", name: "message" },
        ],
      },
    ],
    i = [
      {
        inputs: [{ name: "dns", type: "bytes" }],
        name: "DNSDecodingFailed",
        type: "error",
      },
      {
        inputs: [{ name: "ens", type: "string" }],
        name: "DNSEncodingFailed",
        type: "error",
      },
      { inputs: [], name: "EmptyAddress", type: "error" },
      {
        inputs: [
          { name: "status", type: "uint16" },
          { name: "message", type: "string" },
        ],
        name: "HttpError",
        type: "error",
      },
      { inputs: [], name: "InvalidBatchGatewayResponse", type: "error" },
      {
        inputs: [{ name: "errorData", type: "bytes" }],
        name: "ResolverError",
        type: "error",
      },
      {
        inputs: [
          { name: "name", type: "bytes" },
          { name: "resolver", type: "address" },
        ],
        name: "ResolverNotContract",
        type: "error",
      },
      {
        inputs: [{ name: "name", type: "bytes" }],
        name: "ResolverNotFound",
        type: "error",
      },
      {
        inputs: [
          { name: "primary", type: "string" },
          { name: "primaryAddress", type: "bytes" },
        ],
        name: "ReverseAddressMismatch",
        type: "error",
      },
      {
        inputs: [{ internalType: "bytes4", name: "selector", type: "bytes4" }],
        name: "UnsupportedResolverProfile",
        type: "error",
      },
    ],
    s = [
      ...i,
      {
        name: "resolveWithGateways",
        type: "function",
        stateMutability: "view",
        inputs: [
          { name: "name", type: "bytes" },
          { name: "data", type: "bytes" },
          { name: "gateways", type: "string[]" },
        ],
        outputs: [
          { name: "", type: "bytes" },
          { name: "address", type: "address" },
        ],
      },
    ],
    r = [
      ...i,
      {
        name: "reverseWithGateways",
        type: "function",
        stateMutability: "view",
        inputs: [
          { type: "bytes", name: "reverseName" },
          { type: "uint256", name: "coinType" },
          { type: "string[]", name: "gateways" },
        ],
        outputs: [
          { type: "string", name: "resolvedName" },
          { type: "address", name: "resolver" },
          { type: "address", name: "reverseResolver" },
        ],
      },
    ];
  t.s([
    "_",
    0,
    [
      {
        name: "addr",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "name", type: "bytes32" }],
        outputs: [{ name: "", type: "address" }],
      },
      {
        name: "addr",
        type: "function",
        stateMutability: "view",
        inputs: [
          { name: "name", type: "bytes32" },
          { name: "coinType", type: "uint256" },
        ],
        outputs: [{ name: "", type: "bytes" }],
      },
    ],
    "p",
    0,
    n,
    "w",
    0,
    [
      {
        name: "isValidSignature",
        type: "function",
        stateMutability: "view",
        inputs: [
          { name: "hash", type: "bytes32" },
          { name: "signature", type: "bytes" },
        ],
        outputs: [{ name: "", type: "bytes4" }],
      },
    ],
    "q",
    0,
    [
      {
        type: "event",
        name: "Approval",
        inputs: [
          { indexed: !0, name: "owner", type: "address" },
          { indexed: !0, name: "spender", type: "address" },
          { indexed: !1, name: "value", type: "uint256" },
        ],
      },
      {
        type: "event",
        name: "Transfer",
        inputs: [
          { indexed: !0, name: "from", type: "address" },
          { indexed: !0, name: "to", type: "address" },
          { indexed: !1, name: "value", type: "uint256" },
        ],
      },
      {
        type: "function",
        name: "allowance",
        stateMutability: "view",
        inputs: [
          { name: "owner", type: "address" },
          { name: "spender", type: "address" },
        ],
        outputs: [{ type: "uint256" }],
      },
      {
        type: "function",
        name: "approve",
        stateMutability: "nonpayable",
        inputs: [
          { name: "spender", type: "address" },
          { name: "amount", type: "uint256" },
        ],
        outputs: [{ type: "bool" }],
      },
      {
        type: "function",
        name: "balanceOf",
        stateMutability: "view",
        inputs: [{ name: "account", type: "address" }],
        outputs: [{ type: "uint256" }],
      },
      {
        type: "function",
        name: "decimals",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "uint8" }],
      },
      {
        type: "function",
        name: "name",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "string" }],
      },
      {
        type: "function",
        name: "symbol",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "string" }],
      },
      {
        type: "function",
        name: "totalSupply",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "uint256" }],
      },
      {
        type: "function",
        name: "transfer",
        stateMutability: "nonpayable",
        inputs: [
          { name: "recipient", type: "address" },
          { name: "amount", type: "uint256" },
        ],
        outputs: [{ type: "bool" }],
      },
      {
        type: "function",
        name: "transferFrom",
        stateMutability: "nonpayable",
        inputs: [
          { name: "sender", type: "address" },
          { name: "recipient", type: "address" },
          { name: "amount", type: "uint256" },
        ],
        outputs: [{ type: "bool" }],
      },
    ],
    "m",
    0,
    [
      {
        inputs: [
          { name: "_signer", type: "address" },
          { name: "_hash", type: "bytes32" },
          { name: "_signature", type: "bytes" },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [
          { name: "_signer", type: "address" },
          { name: "_hash", type: "bytes32" },
          { name: "_signature", type: "bytes" },
        ],
        outputs: [{ type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
        name: "isValidSig",
      },
    ],
    "v",
    0,
    e,
    "N",
    0,
    [
      {
        name: "text",
        type: "function",
        stateMutability: "view",
        inputs: [
          { name: "name", type: "bytes32" },
          { name: "key", type: "string" },
        ],
        outputs: [{ name: "", type: "string" }],
      },
    ],
    "i",
    0,
    s,
    "$",
    0,
    r,
  ]);
};
