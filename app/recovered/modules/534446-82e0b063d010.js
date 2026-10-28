// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(24533),
    s = e.i(263965);
  function i(e, r = "wei") {
    return (0, s.f)(e, t.t[r]);
  }
  e.s(["f", 0, i], 495325);
  var r = e.i(408708),
    n = e.i(532617);
  function a(e) {
    let t = Object.entries(e)
        .map(([e, t]) => (void 0 === t || !1 === t ? null : [e, t]))
        .filter(Boolean),
      s = t.reduce((e, [t]) => Math.max(e, t.length), 0);
    return t.map(([e, t]) => `  ${`${e}:`.padEnd(s + 1)}  ${t}`).join("\n");
  }
  n.f;
  class o extends n.f {
    constructor({ v: e }) {
      super(`Invalid \`v\` value "${e}". Expected 27 or 28.`, {
        name: "InvalidLegacyVError",
      });
    }
  }
  class l extends n.f {
    constructor({ transaction: e }) {
      super("Cannot infer a transaction type from provided transaction.", {
        metaMessages: [
          "Provided Transaction:",
          "{",
          a(e),
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
  (n.f, n.f);
  class c extends n.f {
    constructor({ storageKey: e }) {
      super(
        `Size for storage key "${e}" is invalid. Expected 32 bytes. Got ${Math.floor((e.length - 2) / 2)} bytes.`,
        { name: "InvalidStorageKeySizeError" },
      );
    }
  }
  class d extends n.f {
    constructor(
      e,
      {
        account: t,
        docsPath: s,
        chain: n,
        data: o,
        gas: l,
        gasPrice: c,
        maxFeePerGas: d,
        maxPriorityFeePerGas: u,
        nonce: h,
        to: f,
        value: p,
      },
    ) {
      let m = a({
        chain: n && `${n?.name} (id: ${n?.id})`,
        from: t?.address,
        to: f,
        value: void 0 !== p && `${i(p)} ${n?.nativeCurrency?.symbol || "ETH"}`,
        data: o,
        gas: l,
        gasPrice: void 0 !== c && `${(0, r.f)(c)} gwei`,
        maxFeePerGas: void 0 !== d && `${(0, r.f)(d)} gwei`,
        maxPriorityFeePerGas: void 0 !== u && `${(0, r.f)(u)} gwei`,
        nonce: h,
      });
      (super(e.shortMessage, {
        cause: e,
        docsPath: s,
        metaMessages: [
          ...(e.metaMessages ? [...e.metaMessages, " "] : []),
          "Request Arguments:",
          m,
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
  class u extends n.f {
    constructor({
      blockHash: e,
      blockNumber: t,
      blockTag: s,
      hash: i,
      index: r,
    }) {
      let n = "Transaction";
      (s &&
        void 0 !== r &&
        (n = `Transaction at block time "${s}" at index "${r}"`),
        e &&
          void 0 !== r &&
          (n = `Transaction at block hash "${e}" at index "${r}"`),
        t &&
          void 0 !== r &&
          (n = `Transaction at block number "${t}" at index "${r}"`),
        i && (n = `Transaction with hash "${i}"`),
        super(`${n} could not be found.`, {
          name: "TransactionNotFoundError",
        }));
    }
  }
  class h extends n.f {
    constructor({ hash: e }) {
      super(
        `Transaction receipt with hash "${e}" could not be found. The Transaction may not be processed on a block yet.`,
        { name: "TransactionReceiptNotFoundError" },
      );
    }
  }
  class f extends n.f {
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
  class p extends n.f {
    constructor({ hash: e }) {
      super(
        `Timed out while waiting for transaction with hash "${e}" to be confirmed.`,
        { name: "WaitForTransactionReceiptTimeoutError" },
      );
    }
  }
  (e.s(
    [
      "t",
      0,
      o,
      "v",
      0,
      l,
      "J",
      0,
      c,
      "T",
      0,
      d,
      "z",
      0,
      u,
      "r",
      0,
      h,
      "E",
      0,
      f,
      "K",
      0,
      p,
      "P",
      0,
      a,
    ],
    534446,
  ),
    e.s(["f", 0, 2n ** 256n - 1n], 315857));
};
