// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  e.s(
    [
      "f",
      0,
      function (e) {
        return "string" == typeof e ? { address: e, type: "json-rpc" } : e;
      },
    ],
    346818,
  );
  let t = [
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
    r = [
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
    a = [
      ...r,
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
    i = [
      ...r,
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
  e.s(
    [
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
      t,
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
      a,
      "$",
      0,
      i,
    ],
    793136,
  );
};
