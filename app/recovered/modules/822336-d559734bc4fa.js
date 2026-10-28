// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(346818),
    n = e.i(602484),
    r = e.i(120110),
    a = e.i(1619),
    i = e.i(80495),
    s = e.i(917342);
  let o = { gwei: 9, wei: 18 },
    f = { ether: -9, wei: 9 };
  function c(e, t) {
    let n = e.toString(),
      r = n.startsWith("-");
    r && (n = n.slice(1));
    let [a, i] = [
      (n = n.padStart(t, "0")).slice(0, n.length - t),
      n.slice(n.length - t),
    ];
    return (
      (i = i.replace(/(0+)$/, "")),
      `${r ? "-" : ""}${a || "0"}${i ? `.${i}` : ""}`
    );
  }
  function u(e, t = "wei") {
    return c(e, o[t]);
  }
  function l(e, t = "wei") {
    return c(e, f[t]);
  }
  (e.s(["f", 0, u], 494566), e.s(["f", 0, l], 972364));
  var d = e.i(490831),
    b = e.i(548801),
    p = b;
  class h extends p.f {
    constructor({ address: e }) {
      super(`State for account "${e}" is set multiple times.`, {
        name: "AccountStateConflictError",
      });
    }
  }
  class m extends p.f {
    constructor() {
      super("state and stateDiff are set on the same account.", {
        name: "StateAssignmentConflictError",
      });
    }
  }
  function y(e) {
    return e.reduce(
      (e, { slot: t, value: n }) => `${e}        ${t}: ${n}
`,
      "",
    );
  }
  function g(e) {
    return e
      .reduce((e, { address: t, ...n }) => {
        let r = `${e}    ${t}:
`;
        return (
          n.nonce &&
            (r += `      nonce: ${n.nonce}
`),
          n.balance &&
            (r += `      balance: ${n.balance}
`),
          n.code &&
            (r += `      code: ${n.code}
`),
          n.state && ((r += "      state:\n"), (r += y(n.state))),
          n.stateDiff && ((r += "      stateDiff:\n"), (r += y(n.stateDiff))),
          r
        );
      }, "  State Override:\n")
      .slice(0, -1);
  }
  e.s(["n", 0, h, "_", 0, m, "O", 0, g], 473125);
  var v = b;
  function w(e) {
    let t = Object.entries(e)
        .map(([e, t]) => (void 0 === t || !1 === t ? null : [e, t]))
        .filter(Boolean),
      n = t.reduce((e, [t]) => Math.max(e, t.length), 0);
    return t.map(([e, t]) => `  ${`${e}:`.padEnd(n + 1)}  ${t}`).join("\n");
  }
  v.f;
  class $ extends v.f {
    constructor({ v: e }) {
      super(`Invalid \`v\` value "${e}". Expected 27 or 28.`, {
        name: "InvalidLegacyVError",
      });
    }
  }
  class x extends v.f {
    constructor({ transaction: e }) {
      super("Cannot infer a transaction type from provided transaction.", {
        metaMessages: [
          "Provided Transaction:",
          "{",
          w(e),
          "}",
          "",
          "To infer the type, either provide:",
          "- a `type` to the Transaction, or",
          "- an EIP-1559 Transaction with `maxFeePerGas`, or",
          "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or",
          "- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or",
          "- an EIP-7702 Transaction with `authorizationList`, or",
          "- a Legacy Transaction with `gasPrice`",
        ],
        name: "InvalidSerializableTransactionError",
      });
    }
  }
  (v.f, v.f);
  class P extends v.f {
    constructor({ storageKey: e }) {
      super(
        `Size for storage key "${e}" is invalid. Expected 32 bytes. Got ${Math.floor((e.length - 2) / 2)} bytes.`,
        { name: "InvalidStorageKeySizeError" },
      );
    }
  }
  class A extends v.f {
    constructor(
      e,
      {
        account: t,
        docsPath: n,
        chain: r,
        data: a,
        gas: i,
        gasPrice: s,
        maxFeePerGas: o,
        maxPriorityFeePerGas: f,
        nonce: c,
        to: d,
        value: b,
      },
    ) {
      let p = w({
        chain: r && `${r?.name} (id: ${r?.id})`,
        from: t?.address,
        to: d,
        value: void 0 !== b && `${u(b)} ${r?.nativeCurrency?.symbol || "ETH"}`,
        data: a,
        gas: i,
        gasPrice: void 0 !== s && `${l(s)} gwei`,
        maxFeePerGas: void 0 !== o && `${l(o)} gwei`,
        maxPriorityFeePerGas: void 0 !== f && `${l(f)} gwei`,
        nonce: c,
      });
      (super(e.shortMessage, {
        cause: e,
        docsPath: n,
        metaMessages: [
          ...(e.metaMessages ? [...e.metaMessages, " "] : []),
          "Request Arguments:",
          p,
        ].filter(Boolean),
        name: "TransactionExecutionError",
      }),
        Object.defineProperty(this, "cause", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.cause = e));
    }
  }
  class M extends v.f {
    constructor({
      blockHash: e,
      blockNumber: t,
      blockTag: n,
      hash: r,
      index: a,
    }) {
      let i = "Transaction";
      (n &&
        void 0 !== a &&
        (i = `Transaction at block time "${n}" at index "${a}"`),
        e &&
          void 0 !== a &&
          (i = `Transaction at block hash "${e}" at index "${a}"`),
        t &&
          void 0 !== a &&
          (i = `Transaction at block number "${t}" at index "${a}"`),
        r && (i = `Transaction with hash "${r}"`),
        super(`${i} could not be found.`, {
          name: "TransactionNotFoundError",
        }));
    }
  }
  class E extends v.f {
    constructor({ hash: e }) {
      super(
        `Transaction receipt with hash "${e}" could not be found. The Transaction may not be processed on a block yet.`,
        { name: "TransactionReceiptNotFoundError" },
      );
    }
  }
  class z extends v.f {
    constructor({ receipt: e }) {
      (super(`Transaction with hash "${e.transactionHash}" reverted.`, {
        metaMessages: [
          'The receipt marked the transaction as "reverted". This could mean that the function on the contract you are trying to call threw an error.',
          " ",
          "You can attempt to extract the revert reason by:",
          "- calling the `simulateContract` or `simulateCalls` Action with the `abi` and `functionName` of the contract",
          "- using the `call` Action with raw `data`",
        ],
        name: "TransactionReceiptRevertedError",
      }),
        Object.defineProperty(this, "receipt", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.receipt = e));
    }
  }
  class I extends v.f {
    constructor({ hash: e }) {
      super(
        `Timed out while waiting for transaction with hash "${e}" to be confirmed.`,
        { name: "WaitForTransactionReceiptTimeoutError" },
      );
    }
  }
  e.s(
    [
      "t",
      0,
      $,
      "v",
      0,
      x,
      "J",
      0,
      P,
      "T",
      0,
      A,
      "z",
      0,
      M,
      "r",
      0,
      E,
      "E",
      0,
      z,
      "K",
      0,
      I,
      "P",
      0,
      w,
    ],
    633794,
  );
  let O = (e) => e;
  e.s(["l", 0, O, "p", 0, (e) => e], 746685);
  class j extends b.f {
    constructor(
      e,
      {
        account: n,
        docsPath: r,
        chain: a,
        data: i,
        gas: s,
        gasPrice: o,
        maxFeePerGas: f,
        maxPriorityFeePerGas: c,
        nonce: d,
        to: b,
        value: p,
        stateOverride: h,
      },
    ) {
      let m = n ? (0, t.f)(n) : void 0,
        y = w({
          from: m?.address,
          to: b,
          value:
            void 0 !== p && `${u(p)} ${a?.nativeCurrency?.symbol || "ETH"}`,
          data: i,
          gas: s,
          gasPrice: void 0 !== o && `${l(o)} gwei`,
          maxFeePerGas: void 0 !== f && `${l(f)} gwei`,
          maxPriorityFeePerGas: void 0 !== c && `${l(c)} gwei`,
          nonce: d,
        });
      (h &&
        (y += `
${g(h)}`),
        super(e.shortMessage, {
          cause: e,
          docsPath: r,
          metaMessages: [
            ...(e.metaMessages ? [...e.metaMessages, " "] : []),
            "Raw Call Arguments:",
            y,
          ].filter(Boolean),
          name: "CallExecutionError",
        }),
        Object.defineProperty(this, "cause", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.cause = e));
    }
  }
  class B extends b.f {
    constructor(
      e,
      {
        abi: t,
        args: n,
        contractAddress: r,
        docsPath: o,
        functionName: f,
        sender: c,
      },
    ) {
      let u = (0, s.f)({ abi: t, args: n, name: f }),
        l = u
          ? (0, i.f)({
              abiItem: u,
              args: n,
              includeFunctionName: !1,
              includeName: !1,
            })
          : void 0,
        d = u ? (0, a.r)(u, { includeName: !0 }) : void 0,
        b = w({
          address: r && O(r),
          function: d,
          args:
            l &&
            "()" !== l &&
            `${[...Array(f?.length ?? 0).keys()].map(() => " ").join("")}${l}`,
          sender: c,
        });
      (super(
        e.shortMessage ||
          `An unknown error occurred while executing the contract function "${f}".`,
        {
          cause: e,
          docsPath: o,
          metaMessages: [
            ...(e.metaMessages ? [...e.metaMessages, " "] : []),
            b && "Contract Call:",
            b,
          ].filter(Boolean),
          name: "ContractFunctionExecutionError",
        },
      ),
        Object.defineProperty(this, "abi", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "args", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "cause", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "contractAddress", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "formattedArgs", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "functionName", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "sender", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.abi = t),
        (this.args = n),
        (this.cause = e),
        (this.contractAddress = r),
        (this.functionName = f),
        (this.sender = c));
    }
  }
  class T extends b.f {
    constructor({ abi: e, data: t, functionName: s, message: o }) {
      let f, c, u, l, b;
      if (t && "0x" !== t)
        try {
          let {
            abiItem: s,
            errorName: o,
            args: f,
          } = (c = (0, r.f)({ abi: e, data: t }));
          if ("Error" === o) l = f[0];
          else if ("Panic" === o) {
            let [e] = f;
            l = n.o[e];
          } else {
            let e = s ? (0, a.r)(s, { includeName: !0 }) : void 0,
              t =
                s && f
                  ? (0, i.f)({
                      abiItem: s,
                      args: f,
                      includeFunctionName: !1,
                      includeName: !1,
                    })
                  : void 0;
            u = [
              e ? `Error: ${e}` : "",
              t && "()" !== t
                ? `       ${[...Array(o?.length ?? 0).keys()].map(() => " ").join("")}${t}`
                : "",
            ];
          }
        } catch (e) {
          f = e;
        }
      else o && (l = o);
      (f instanceof d.J &&
        ((b = f.signature),
        (u = [
          `Unable to decode signature "${b}" as it was not found on the provided ABI.`,
          "Make sure you are using the correct ABI and that the error exists on it.",
          `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${b}.`,
        ])),
        super(
          (l && "execution reverted" !== l) || b
            ? [
                `The contract function "${s}" reverted with the following ${b ? "signature" : "reason"}:`,
                l || b,
              ].join("\n")
            : `The contract function "${s}" reverted.`,
          { cause: f, metaMessages: u, name: "ContractFunctionRevertedError" },
        ),
        Object.defineProperty(this, "data", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "raw", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "reason", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "signature", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.data = c),
        (this.raw = t),
        (this.reason = l),
        (this.signature = b));
    }
  }
  class N extends b.f {
    constructor({ functionName: e }) {
      super(`The contract function "${e}" returned no data ("0x").`, {
        metaMessages: [
          "This could be due to any of the following:",
          `  - The contract does not have the function "${e}",`,
          "  - The parameters passed to the contract function may be invalid, or",
          "  - The address is not a contract.",
        ],
        name: "ContractFunctionZeroDataError",
      });
    }
  }
  class S extends b.f {
    constructor({ factory: e }) {
      super(
        `Deployment for counterfactual contract call failed${e ? ` for factory "${e}".` : ""}`,
        {
          metaMessages: [
            "Please ensure:",
            "- The `factory` is a valid contract deployment factory (ie. Create2 Factory, ERC-4337 Factory, etc).",
            "- The `factoryData` is a valid encoded function call for contract deployment function on the factory.",
          ],
          name: "CounterfactualDeploymentFailedError",
        },
      );
    }
  }
  class C extends b.f {
    constructor({ data: e, message: t }) {
      (super(t || "", { name: "RawContractError" }),
        Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: 3,
        }),
        Object.defineProperty(this, "data", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.data = e));
    }
  }
  e.s(
    ["o", 0, j, "h", 0, B, "P", 0, T, "v", 0, N, "p", 0, S, "w", 0, C],
    822336,
  );
};
