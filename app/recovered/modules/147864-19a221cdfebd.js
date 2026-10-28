// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(156732),
    n = e.i(393048),
    r = e.i(927974);
  function i(e) {
    let t = Object.entries(e)
        .map(([e, t]) => (void 0 === t || !1 === t ? null : [e, t]))
        .filter(Boolean),
      n = t.reduce((e, [t]) => Math.max(e, t.length), 0);
    return t.map(([e, t]) => `  ${`${e}:`.padEnd(n + 1)}  ${t}`).join("\n");
  }
  r.f;
  class a extends r.f {
    constructor({ filledNonce: e, requestedNonce: t }) {
      super(
        "The filled transaction nonce does not match the requested nonce.",
        {
          metaMessages: [`Requested Nonce: ${t}`, `Filled Nonce: ${e}`],
          name: "FeePayerNonceMismatchError",
        },
      );
    }
  }
  class s extends r.f {
    constructor({ v: e }) {
      super(`Invalid \`v\` value "${e}". Expected 27 or 28.`, {
        name: "InvalidLegacyVError",
      });
    }
  }
  r.f;
  class o extends r.f {
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
  (r.f, r.f);
  class f extends r.f {
    constructor({ storageKey: e }) {
      super(
        `Size for storage key "${e}" is invalid. Expected 32 bytes. Got ${Math.floor((e.length - 2) / 2)} bytes.`,
        { name: "InvalidStorageKeySizeError" },
      );
    }
  }
  class c extends r.f {
    constructor(
      e,
      {
        account: r,
        docsPath: a,
        chain: s,
        data: o,
        gas: f,
        gasPrice: c,
        maxFeePerGas: u,
        maxPriorityFeePerGas: d,
        nonce: b,
        to: l,
        value: p,
      },
    ) {
      let h = i({
        chain: s && `${s?.name} (id: ${s?.id})`,
        from: r?.address,
        to: l,
        value:
          void 0 !== p &&
          `${(0, t.f)(p)} ${s?.nativeCurrency?.symbol || "ETH"}`,
        data: o,
        gas: f,
        gasPrice: void 0 !== c && `${(0, n.f)(c)} gwei`,
        maxFeePerGas: void 0 !== u && `${(0, n.f)(u)} gwei`,
        maxPriorityFeePerGas: void 0 !== d && `${(0, n.f)(d)} gwei`,
        nonce: b,
      });
      (super(e.shortMessage, {
        cause: e,
        docsPath: a,
        metaMessages: [
          ...(e.metaMessages ? [...e.metaMessages, " "] : []),
          "Request Arguments:",
          h,
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
  class u extends r.f {
    constructor({
      blockHash: e,
      blockNumber: t,
      blockTag: n,
      hash: r,
      index: i,
    }) {
      let a = "Transaction";
      (n &&
        void 0 !== i &&
        (a = `Transaction at block time "${n}" at index "${i}"`),
        e &&
          void 0 !== i &&
          (a = `Transaction at block hash "${e}" at index "${i}"`),
        t &&
          void 0 !== i &&
          (a = `Transaction at block number "${t}" at index "${i}"`),
        r && (a = `Transaction with hash "${r}"`),
        super(`${a} could not be found.`, {
          name: "TransactionNotFoundError",
        }));
    }
  }
  class d extends r.f {
    constructor({ hash: e }) {
      super(
        `Transaction receipt with hash "${e}" could not be found. The Transaction may not be processed on a block yet.`,
        { name: "TransactionReceiptNotFoundError" },
      );
    }
  }
  class b extends r.f {
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
  class l extends r.f {
    constructor({ hash: e }) {
      super(
        `Timed out while waiting for transaction with hash "${e}" to be confirmed.`,
        { name: "WaitForTransactionReceiptTimeoutError" },
      );
    }
  }
  e.s([
    "b",
    0,
    a,
    "t",
    0,
    s,
    "v",
    0,
    o,
    "J",
    0,
    f,
    "T",
    0,
    c,
    "z",
    0,
    u,
    "r",
    0,
    d,
    "E",
    0,
    b,
    "K",
    0,
    l,
    "P",
    0,
    i,
  ]);
};
