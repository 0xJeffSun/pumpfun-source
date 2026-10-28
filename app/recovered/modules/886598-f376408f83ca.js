// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(45417),
    f = e.i(52764),
    a = e.i(773933),
    n = e.i(515752),
    r = e.i(521567),
    i = e.i(178868),
    b = e.i(495325),
    s = e.i(408708),
    o = e.i(76373),
    c = e.i(532617),
    d = c;
  class u extends d.f {
    constructor({ address: e }) {
      super(`State for account "${e}" is set multiple times.`, {
        name: "AccountStateConflictError",
      });
    }
  }
  class l extends d.f {
    constructor() {
      super("state and stateDiff are set on the same account.", {
        name: "StateAssignmentConflictError",
      });
    }
  }
  function h(e) {
    return e.reduce(
      (e, { slot: t, value: f }) => `${e}        ${t}: ${f}
`,
      "",
    );
  }
  function p(e) {
    return e
      .reduce((e, { address: t, ...f }) => {
        let a = `${e}    ${t}:
`;
        return (
          f.nonce &&
            (a += `      nonce: ${f.nonce}
`),
          f.balance &&
            (a += `      balance: ${f.balance}
`),
          f.code &&
            (a += `      code: ${f.code}
`),
          f.state && ((a += "      state:\n"), (a += h(f.state))),
          f.stateDiff && ((a += "      stateDiff:\n"), (a += h(f.stateDiff))),
          a
        );
      }, "  State Override:\n")
      .slice(0, -1);
  }
  e.s(["n", 0, u, "_", 0, l, "O", 0, p], 374537);
  var g = e.i(534446),
    m = e.i(575663);
  class y extends c.f {
    constructor(
      e,
      {
        account: f,
        docsPath: a,
        chain: n,
        data: r,
        gas: i,
        gasPrice: o,
        maxFeePerGas: c,
        maxPriorityFeePerGas: d,
        nonce: u,
        to: l,
        value: h,
        stateOverride: m,
      },
    ) {
      let y = f ? (0, t.f)(f) : void 0,
        w = (0, g.P)({
          from: y?.address,
          to: l,
          value:
            void 0 !== h &&
            `${(0, b.f)(h)} ${n?.nativeCurrency?.symbol || "ETH"}`,
          data: r,
          gas: i,
          gasPrice: void 0 !== o && `${(0, s.f)(o)} gwei`,
          maxFeePerGas: void 0 !== c && `${(0, s.f)(c)} gwei`,
          maxPriorityFeePerGas: void 0 !== d && `${(0, s.f)(d)} gwei`,
          nonce: u,
        });
      (m &&
        (w += `
${p(m)}`),
        super(e.shortMessage, {
          cause: e,
          docsPath: a,
          metaMessages: [
            ...(e.metaMessages ? [...e.metaMessages, " "] : []),
            "Raw Call Arguments:",
            w,
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
  class w extends c.f {
    constructor(
      e,
      {
        abi: t,
        args: f,
        contractAddress: a,
        docsPath: b,
        functionName: s,
        sender: o,
      },
    ) {
      let c = (0, i.f)({ abi: t, args: f, name: s }),
        d = c
          ? (0, r.f)({
              abiItem: c,
              args: f,
              includeFunctionName: !1,
              includeName: !1,
            })
          : void 0,
        u = c ? (0, n.r)(c, { includeName: !0 }) : void 0,
        l = (0, g.P)({
          address: a && (0, m.l)(a),
          function: u,
          args:
            d &&
            "()" !== d &&
            `${[...Array(s?.length ?? 0).keys()].map(() => " ").join("")}${d}`,
          sender: o,
        });
      (super(
        e.shortMessage ||
          `An unknown error occurred while executing the contract function "${s}".`,
        {
          cause: e,
          docsPath: b,
          metaMessages: [
            ...(e.metaMessages ? [...e.metaMessages, " "] : []),
            l && "Contract Call:",
            l,
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
        (this.args = f),
        (this.cause = e),
        (this.contractAddress = a),
        (this.functionName = s),
        (this.sender = o));
    }
  }
  class v extends c.f {
    constructor({ abi: e, data: t, functionName: i, message: b }) {
      let s, c, d, u, l;
      if (t && "0x" !== t)
        try {
          let {
            abiItem: i,
            errorName: b,
            args: s,
          } = (c = (0, a.f)({ abi: e, data: t }));
          if ("Error" === b) u = s[0];
          else if ("Panic" === b) {
            let [e] = s;
            u = f.o[e];
          } else {
            let e = i ? (0, n.r)(i, { includeName: !0 }) : void 0,
              t =
                i && s
                  ? (0, r.f)({
                      abiItem: i,
                      args: s,
                      includeFunctionName: !1,
                      includeName: !1,
                    })
                  : void 0;
            d = [
              e ? `Error: ${e}` : "",
              t && "()" !== t
                ? `       ${[...Array(b?.length ?? 0).keys()].map(() => " ").join("")}${t}`
                : "",
            ];
          }
        } catch (e) {
          s = e;
        }
      else b && (u = b);
      (s instanceof o.J &&
        ((l = s.signature),
        (d = [
          `Unable to decode signature "${l}" as it was not found on the provided ABI.`,
          "Make sure you are using the correct ABI and that the error exists on it.",
          `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${l}.`,
        ])),
        super(
          (u && "execution reverted" !== u) || l
            ? [
                `The contract function "${i}" reverted with the following ${l ? "signature" : "reason"}:`,
                u || l,
              ].join("\n")
            : `The contract function "${i}" reverted.`,
          { cause: s, metaMessages: d, name: "ContractFunctionRevertedError" },
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
        (this.reason = u),
        (this.signature = l));
    }
  }
  class x extends c.f {
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
  class $ extends c.f {
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
  class P extends c.f {
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
    ["o", 0, y, "h", 0, w, "P", 0, v, "v", 0, x, "p", 0, $, "w", 0, P],
    886598,
  );
};
