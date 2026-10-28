// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(393048),
    n = e.i(927974);
  class r extends n.f {
    constructor({ cause: e, message: t } = {}) {
      let n = t
        ?.replace("execution reverted: ", "")
        ?.replace("execution reverted", "");
      super(
        `Execution reverted ${n ? `with reason: ${n}` : "for an unknown reason"}.`,
        { cause: e, name: "ExecutionRevertedError" },
      );
    }
  }
  (Object.defineProperty(r, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 3,
  }),
    Object.defineProperty(r, "nodeMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /execution reverted|gas required exceeds allowance/,
    }));
  class i extends n.f {
    constructor({ cause: e, maxFeePerGas: n } = {}) {
      super(
        `The fee cap (\`maxFeePerGas\`${n ? ` = ${(0, t.f)(n)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`,
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
    constructor({ cause: e, maxFeePerGas: n } = {}) {
      super(
        `The fee cap (\`maxFeePerGas\`${n ? ` = ${(0, t.f)(n)}` : ""} gwei) cannot be lower than the block base fee.`,
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
  class s extends n.f {
    constructor({ cause: e, nonce: t } = {}) {
      super(
        `Nonce provided for the transaction ${t ? `(${t}) ` : ""}is higher than the next one expected.`,
        { cause: e, name: "NonceTooHighError" },
      );
    }
  }
  Object.defineProperty(s, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /nonce too high/,
  });
  class o extends n.f {
    constructor({ cause: e, nonce: t } = {}) {
      super(
        `Nonce provided for the transaction ${t ? `(${t}) ` : ""}is lower than the current nonce of the account.
Try increasing the nonce or find the latest nonce with \`getTransactionCount\`.`,
        { cause: e, name: "NonceTooLowError" },
      );
    }
  }
  Object.defineProperty(o, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /nonce too low|transaction already imported|already known/,
  });
  class f extends n.f {
    constructor({ cause: e, nonce: t } = {}) {
      super(
        `Nonce provided for the transaction ${t ? `(${t}) ` : ""}exceeds the maximum allowed nonce.`,
        { cause: e, name: "NonceMaxValueError" },
      );
    }
  }
  Object.defineProperty(f, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /nonce has max value/,
  });
  class c extends n.f {
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
  Object.defineProperty(c, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /insufficient funds|exceeds transaction sender account balance/,
  });
  class u extends n.f {
    constructor({ cause: e, gas: t } = {}) {
      super(
        `The amount of gas ${t ? `(${t}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`,
        { cause: e, name: "IntrinsicGasTooHighError" },
      );
    }
  }
  Object.defineProperty(u, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /intrinsic gas too high|gas limit reached/,
  });
  class d extends n.f {
    constructor({ cause: e, gas: t } = {}) {
      super(
        `The amount of gas ${t ? `(${t}) ` : ""}provided for the transaction is too low.`,
        { cause: e, name: "IntrinsicGasTooLowError" },
      );
    }
  }
  Object.defineProperty(d, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /intrinsic gas too low/,
  });
  class b extends n.f {
    constructor({ cause: e }) {
      super("The transaction type is not supported for this chain.", {
        cause: e,
        name: "TransactionTypeNotSupportedError",
      });
    }
  }
  Object.defineProperty(b, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /transaction type not valid/,
  });
  class l extends n.f {
    constructor({ cause: e, maxPriorityFeePerGas: n, maxFeePerGas: r } = {}) {
      super(
        `The provided tip (\`maxPriorityFeePerGas\`${n ? ` = ${(0, t.f)(n)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${r ? ` = ${(0, t.f)(r)} gwei` : ""}).`,
        { cause: e, name: "TipAboveFeeCapError" },
      );
    }
  }
  Object.defineProperty(l, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value:
      /max priority fee per gas higher than max fee per gas|tip higher than fee cap/,
  });
  class p extends n.f {
    constructor({ cause: e }) {
      super(`An error occurred while executing: ${e?.shortMessage}`, {
        cause: e,
        name: "UnknownNodeError",
      });
    }
  }
  (e.s(
    [
      "s",
      0,
      r,
      "k",
      0,
      i,
      "L",
      0,
      a,
      "y",
      0,
      c,
      "D",
      0,
      u,
      "m",
      0,
      d,
      "G",
      0,
      f,
      "e",
      0,
      s,
      "q",
      0,
      o,
      "M",
      0,
      l,
      "N",
      0,
      b,
      "b",
      0,
      p,
    ],
    790336,
  ),
    e.s(
      [
        "f",
        0,
        function (e, t) {
          let h = (e.details || "").toLowerCase(),
            m = e instanceof n.f ? e.walk((e) => e?.code === r.code) : e;
          return m instanceof n.f
            ? new r({ cause: e, message: m.details })
            : r.nodeMessage.test(h)
              ? new r({ cause: e, message: e.details })
              : i.nodeMessage.test(h)
                ? new i({ cause: e, maxFeePerGas: t?.maxFeePerGas })
                : a.nodeMessage.test(h)
                  ? new a({ cause: e, maxFeePerGas: t?.maxFeePerGas })
                  : s.nodeMessage.test(h)
                    ? new s({ cause: e, nonce: t?.nonce })
                    : o.nodeMessage.test(h)
                      ? new o({ cause: e, nonce: t?.nonce })
                      : f.nodeMessage.test(h)
                        ? new f({ cause: e, nonce: t?.nonce })
                        : c.nodeMessage.test(h)
                          ? new c({ cause: e })
                          : u.nodeMessage.test(h)
                            ? new u({ cause: e, gas: t?.gas })
                            : d.nodeMessage.test(h)
                              ? new d({ cause: e, gas: t?.gas })
                              : b.nodeMessage.test(h)
                                ? new b({ cause: e })
                                : l.nodeMessage.test(h)
                                  ? new l({
                                      cause: e,
                                      maxFeePerGas: t?.maxFeePerGas,
                                      maxPriorityFeePerGas:
                                        t?.maxPriorityFeePerGas,
                                    })
                                  : new p({ cause: e });
        },
      ],
      197820,
    ));
};
