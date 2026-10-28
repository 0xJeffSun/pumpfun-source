// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = { ether: -9, wei: 9 };
  e.s(["t", 0, { gwei: 9, wei: 18 }, "C", 0, t], 24533);
  var r = e.i(263965);
  function s(e, n = "wei") {
    return (0, r.f)(e, t[n]);
  }
  e.s(["f", 0, s], 408708);
  var n = e.i(532617);
  class o extends n.f {
    constructor({ cause: e, message: t } = {}) {
      let r = t
        ?.replace("execution reverted: ", "")
        ?.replace("execution reverted", "");
      super(
        `Execution reverted ${r ? `with reason: ${r}` : "for an unknown reason"}.`,
        { cause: e, name: "ExecutionRevertedError" },
      );
    }
  }
  (Object.defineProperty(o, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 3,
  }),
    Object.defineProperty(o, "nodeMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /execution reverted|gas required exceeds allowance/,
    }));
  class i extends n.f {
    constructor({ cause: e, maxFeePerGas: t } = {}) {
      super(
        `The fee cap (\`maxFeePerGas\`${t ? ` = ${s(t)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`,
        { cause: e, name: "FeeCapTooHighError" },
      );
    }
  }
  Object.defineProperty(i, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/,
  });
  class a extends n.f {
    constructor({ cause: e, maxFeePerGas: t } = {}) {
      super(
        `The fee cap (\`maxFeePerGas\`${t ? ` = ${s(t)}` : ""} gwei) cannot be lower than the block base fee.`,
        { cause: e, name: "FeeCapTooLowError" },
      );
    }
  }
  Object.defineProperty(a, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value:
      /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/,
  });
  class c extends n.f {
    constructor({ cause: e, nonce: t } = {}) {
      super(
        `Nonce provided for the transaction ${t ? `(${t}) ` : ""}is higher than the next one expected.`,
        { cause: e, name: "NonceTooHighError" },
      );
    }
  }
  Object.defineProperty(c, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /nonce too high/,
  });
  class l extends n.f {
    constructor({ cause: e, nonce: t } = {}) {
      super(
        `Nonce provided for the transaction ${t ? `(${t}) ` : ""}is lower than the current nonce of the account.
Try increasing the nonce or find the latest nonce with \`getTransactionCount\`.`,
        { cause: e, name: "NonceTooLowError" },
      );
    }
  }
  Object.defineProperty(l, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /nonce too low|transaction already imported|already known/,
  });
  class u extends n.f {
    constructor({ cause: e, nonce: t } = {}) {
      super(
        `Nonce provided for the transaction ${t ? `(${t}) ` : ""}exceeds the maximum allowed nonce.`,
        { cause: e, name: "NonceMaxValueError" },
      );
    }
  }
  Object.defineProperty(u, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /nonce has max value/,
  });
  class h extends n.f {
    constructor({ cause: e } = {}) {
      super(
        "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account.",
        {
          cause: e,
          metaMessages: [
            "This error could arise when the account does not have enough funds to:",
            " - pay for the total gas fee,",
            " - pay for the value to send.",
            " ",
            "The cost of the transaction is calculated as `gas * gas fee + value`, where:",
            " - `gas` is the amount of gas needed for transaction to execute,",
            " - `gas fee` is the gas fee,",
            " - `value` is the amount of ether to send to the recipient.",
          ],
          name: "InsufficientFundsError",
        },
      );
    }
  }
  Object.defineProperty(h, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /insufficient funds|exceeds transaction sender account balance/,
  });
  class d extends n.f {
    constructor({ cause: e, gas: t } = {}) {
      super(
        `The amount of gas ${t ? `(${t}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`,
        { cause: e, name: "IntrinsicGasTooHighError" },
      );
    }
  }
  Object.defineProperty(d, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /intrinsic gas too high|gas limit reached/,
  });
  class f extends n.f {
    constructor({ cause: e, gas: t } = {}) {
      super(
        `The amount of gas ${t ? `(${t}) ` : ""}provided for the transaction is too low.`,
        { cause: e, name: "IntrinsicGasTooLowError" },
      );
    }
  }
  Object.defineProperty(f, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /intrinsic gas too low/,
  });
  class p extends n.f {
    constructor({ cause: e }) {
      super("The transaction type is not supported for this chain.", {
        cause: e,
        name: "TransactionTypeNotSupportedError",
      });
    }
  }
  Object.defineProperty(p, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /transaction type not valid/,
  });
  class g extends n.f {
    constructor({ cause: e, maxPriorityFeePerGas: t, maxFeePerGas: r } = {}) {
      super(
        `The provided tip (\`maxPriorityFeePerGas\`${t ? ` = ${s(t)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${r ? ` = ${s(r)} gwei` : ""}).`,
        { cause: e, name: "TipAboveFeeCapError" },
      );
    }
  }
  Object.defineProperty(g, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value:
      /max priority fee per gas higher than max fee per gas|tip higher than fee cap/,
  });
  class m extends n.f {
    constructor({ cause: e }) {
      super(`An error occurred while executing: ${e?.shortMessage}`, {
        cause: e,
        name: "UnknownNodeError",
      });
    }
  }
  e.s(
    [
      "s",
      0,
      o,
      "k",
      0,
      i,
      "L",
      0,
      a,
      "y",
      0,
      h,
      "D",
      0,
      d,
      "m",
      0,
      f,
      "G",
      0,
      u,
      "e",
      0,
      c,
      "q",
      0,
      l,
      "M",
      0,
      g,
      "N",
      0,
      p,
      "b",
      0,
      m,
    ],
    960872,
  );
};
