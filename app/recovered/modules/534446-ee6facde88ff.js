// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(24533),
    r = e.i(263965);
  function n(e, s = "wei") {
    return (0, r.f)(e, t.t[s]);
  }
  e.s(["f", 0, n], 495325);
  var s = e.i(408708),
    o = e.i(532617);
  function i(e) {
    let t = Object.entries(e)
        .map(([e, t]) => (void 0 === t || !1 === t ? null : [e, t]))
        .filter(Boolean),
      r = t.reduce((e, [t]) => Math.max(e, t.length), 0);
    return t.map(([e, t]) => `  ${`${e}:`.padEnd(r + 1)}  ${t}`).join("\n");
  }
  o.f;
  class a extends o.f {
    constructor({ v: e }) {
      super(`Invalid \`v\` value "${e}". Expected 27 or 28.`, {
        name: "InvalidLegacyVError",
      });
    }
  }
  class c extends o.f {
    constructor({ transaction: e }) {
      super("Cannot infer a transaction type from provided transaction.", {
        metaMessages: [
          "Provided Transaction:",
          "{",
          i(e),
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
  (o.f, o.f);
  class u extends o.f {
    constructor({ storageKey: e }) {
      super(
        `Size for storage key "${e}" is invalid. Expected 32 bytes. Got ${Math.floor((e.length - 2) / 2)} bytes.`,
        { name: "InvalidStorageKeySizeError" },
      );
    }
  }
  class l extends o.f {
    constructor(
      e,
      {
        account: t,
        docsPath: r,
        chain: o,
        data: a,
        gas: c,
        gasPrice: u,
        maxFeePerGas: l,
        maxPriorityFeePerGas: d,
        nonce: f,
        to: h,
        value: p,
      },
    ) {
      let b = i({
        chain: o && `${o?.name} (id: ${o?.id})`,
        from: t?.address,
        to: h,
        value: void 0 !== p && `${n(p)} ${o?.nativeCurrency?.symbol || "ETH"}`,
        data: a,
        gas: c,
        gasPrice: void 0 !== u && `${(0, s.f)(u)} gwei`,
        maxFeePerGas: void 0 !== l && `${(0, s.f)(l)} gwei`,
        maxPriorityFeePerGas: void 0 !== d && `${(0, s.f)(d)} gwei`,
        nonce: f,
      });
      (super(e.shortMessage, {
        cause: e,
        docsPath: r,
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
  class d extends o.f {
    constructor({
      blockHash: e,
      blockNumber: t,
      blockTag: r,
      hash: n,
      index: s,
    }) {
      let o = "Transaction";
      (r &&
        void 0 !== s &&
        (o = `Transaction at block time "${r}" at index "${s}"`),
        e &&
          void 0 !== s &&
          (o = `Transaction at block hash "${e}" at index "${s}"`),
        t &&
          void 0 !== s &&
          (o = `Transaction at block number "${t}" at index "${s}"`),
        n && (o = `Transaction with hash "${n}"`),
        super(`${o} could not be found.`, {
          name: "TransactionNotFoundError",
        }));
    }
  }
  class f extends o.f {
    constructor({ hash: e }) {
      super(
        `Transaction receipt with hash "${e}" could not be found. The Transaction may not be processed on a block yet.`,
        { name: "TransactionReceiptNotFoundError" },
      );
    }
  }
  class h extends o.f {
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
  class p extends o.f {
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
      c,
      "J",
      0,
      u,
      "T",
      0,
      l,
      "z",
      0,
      d,
      "r",
      0,
      f,
      "E",
      0,
      h,
      "K",
      0,
      p,
      "P",
      0,
      i,
    ],
    534446,
  ),
    e.s(["f", 0, 2n ** 256n - 1n], 315857));
};
