// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(24533),
    n = e.i(263965);
  function r(e, i = "wei") {
    return (0, n.f)(e, t.t[i]);
  }
  e.s(["f", 0, r], 495325);
  var i = e.i(408708),
    s = e.i(532617);
  function o(e) {
    let t = Object.entries(e)
        .map(([e, t]) => (void 0 === t || !1 === t ? null : [e, t]))
        .filter(Boolean),
      n = t.reduce((e, [t]) => Math.max(e, t.length), 0);
    return t.map(([e, t]) => `  ${`${e}:`.padEnd(n + 1)}  ${t}`).join("\n");
  }
  s.f;
  class a extends s.f {
    constructor({ v: e }) {
      super(`Invalid \`v\` value "${e}". Expected 27 or 28.`, {
        name: "InvalidLegacyVError",
      });
    }
  }
  class f extends s.f {
    constructor({ transaction: e }) {
      super("Cannot infer a transaction type from provided transaction.", {
        metaMessages: [
          "Provided Transaction:",
          "{",
          o(e),
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
  (s.f, s.f);
  class c extends s.f {
    constructor({ storageKey: e }) {
      super(
        `Size for storage key "${e}" is invalid. Expected 32 bytes. Got ${Math.floor((e.length - 2) / 2)} bytes.`,
        { name: "InvalidStorageKeySizeError" },
      );
    }
  }
  class u extends s.f {
    constructor(
      e,
      {
        account: t,
        docsPath: n,
        chain: s,
        data: a,
        gas: f,
        gasPrice: c,
        maxFeePerGas: u,
        maxPriorityFeePerGas: l,
        nonce: d,
        to: h,
        value: p,
      },
    ) {
      let b = o({
        chain: s && `${s?.name} (id: ${s?.id})`,
        from: t?.address,
        to: h,
        value: void 0 !== p && `${r(p)} ${s?.nativeCurrency?.symbol || "ETH"}`,
        data: a,
        gas: f,
        gasPrice: void 0 !== c && `${(0, i.f)(c)} gwei`,
        maxFeePerGas: void 0 !== u && `${(0, i.f)(u)} gwei`,
        maxPriorityFeePerGas: void 0 !== l && `${(0, i.f)(l)} gwei`,
        nonce: d,
      });
      (super(e.shortMessage, {
        cause: e,
        docsPath: n,
        metaMessages: [
          ...(e.metaMessages ? [...e.metaMessages, " "] : []),
          "Request Arguments:",
          b,
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
  class l extends s.f {
    constructor({
      blockHash: e,
      blockNumber: t,
      blockTag: n,
      hash: r,
      index: i,
    }) {
      let s = "Transaction";
      (n &&
        void 0 !== i &&
        (s = `Transaction at block time "${n}" at index "${i}"`),
        e &&
          void 0 !== i &&
          (s = `Transaction at block hash "${e}" at index "${i}"`),
        t &&
          void 0 !== i &&
          (s = `Transaction at block number "${t}" at index "${i}"`),
        r && (s = `Transaction with hash "${r}"`),
        super(`${s} could not be found.`, {
          name: "TransactionNotFoundError",
        }));
    }
  }
  class d extends s.f {
    constructor({ hash: e }) {
      super(
        `Transaction receipt with hash "${e}" could not be found. The Transaction may not be processed on a block yet.`,
        { name: "TransactionReceiptNotFoundError" },
      );
    }
  }
  class h extends s.f {
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
  class p extends s.f {
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
      a,
      "v",
      0,
      f,
      "J",
      0,
      c,
      "T",
      0,
      u,
      "z",
      0,
      l,
      "r",
      0,
      d,
      "E",
      0,
      h,
      "K",
      0,
      p,
      "P",
      0,
      o,
    ],
    534446,
  ),
    e.s(["f", 0, 2n ** 256n - 1n], 315857));
};
