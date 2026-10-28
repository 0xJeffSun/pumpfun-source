// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  let t = { ether: -9, wei: 9 };
  e.s(["t", 0, { gwei: 9, wei: 18 }, "C", 0, t], 24533);
  var r = e.i(263965);
  function o(e, a = "wei") {
    return (0, r.f)(e, t[a]);
  }
  e.s(["f", 0, o], 408708);
  var a = e.i(532617);
  class s extends a.f {
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
  (Object.defineProperty(s, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 3,
  }),
    Object.defineProperty(s, "nodeMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /execution reverted|gas required exceeds allowance/,
    }));
  class n extends a.f {
    constructor({ cause: e, maxFeePerGas: t } = {}) {
      super(
        `The fee cap (\`maxFeePerGas\`${t ? ` = ${o(t)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`,
        { cause: e, name: "FeeCapTooHighError" },
      );
    }
  }
  Object.defineProperty(n, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/,
  });
  class i extends a.f {
    constructor({ cause: e, maxFeePerGas: t } = {}) {
      super(
        `The fee cap (\`maxFeePerGas\`${t ? ` = ${o(t)}` : ""} gwei) cannot be lower than the block base fee.`,
        { cause: e, name: "FeeCapTooLowError" },
      );
    }
  }
  Object.defineProperty(i, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value:
      /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/,
  });
  class c extends a.f {
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
  class l extends a.f {
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
  class u extends a.f {
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
  class d extends a.f {
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
  Object.defineProperty(d, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /insufficient funds|exceeds transaction sender account balance/,
  });
  class f extends a.f {
    constructor({ cause: e, gas: t } = {}) {
      super(
        `The amount of gas ${t ? `(${t}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`,
        { cause: e, name: "IntrinsicGasTooHighError" },
      );
    }
  }
  Object.defineProperty(f, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /intrinsic gas too high|gas limit reached/,
  });
  class b extends a.f {
    constructor({ cause: e, gas: t } = {}) {
      super(
        `The amount of gas ${t ? `(${t}) ` : ""}provided for the transaction is too low.`,
        { cause: e, name: "IntrinsicGasTooLowError" },
      );
    }
  }
  Object.defineProperty(b, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /intrinsic gas too low/,
  });
  class h extends a.f {
    constructor({ cause: e }) {
      super("The transaction type is not supported for this chain.", {
        cause: e,
        name: "TransactionTypeNotSupportedError",
      });
    }
  }
  Object.defineProperty(h, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /transaction type not valid/,
  });
  class p extends a.f {
    constructor({ cause: e, maxPriorityFeePerGas: t, maxFeePerGas: r } = {}) {
      super(
        `The provided tip (\`maxPriorityFeePerGas\`${t ? ` = ${o(t)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${r ? ` = ${o(r)} gwei` : ""}).`,
        { cause: e, name: "TipAboveFeeCapError" },
      );
    }
  }
  Object.defineProperty(p, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value:
      /max priority fee per gas higher than max fee per gas|tip higher than fee cap/,
  });
  class m extends a.f {
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
      s,
      "k",
      0,
      n,
      "L",
      0,
      i,
      "y",
      0,
      d,
      "D",
      0,
      f,
      "m",
      0,
      b,
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
      p,
      "N",
      0,
      h,
      "b",
      0,
      m,
    ],
    960872,
  );
};
