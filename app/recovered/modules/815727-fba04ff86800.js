// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(717473),
    n = e.i(741947),
    r = e.i(959615),
    i = e.i(730755),
    a = e.i(369483),
    s = e.i(923148),
    o = e.i(156732),
    f = e.i(393048),
    c = e.i(641802),
    u = e.i(927974),
    d = e.i(401169),
    b = e.i(147864);
  let l = (e) => e;
  e.s(
    [
      "l",
      0,
      function (e) {
        if (e?.reason) return e.reason;
        if ("function" == typeof DOMException)
          return new DOMException("This operation was aborted", "AbortError");
        let t = Error("This operation was aborted");
        return ((t.name = "AbortError"), t);
      },
      "m",
      0,
      l,
      "p",
      0,
      (e) => {
        try {
          let t = new URL(e);
          if (!t.username && !t.password) return e;
          return ((t.username = ""), (t.password = ""), t.toString());
        } catch {
          return e;
        }
      },
      "c",
      0,
      function (e) {
        return (
          "object" == typeof e &&
          null !== e &&
          "name" in e &&
          "AbortError" === e.name
        );
      },
    ],
    690651,
  );
  class p extends u.f {
    constructor(
      e,
      {
        account: n,
        docsPath: r,
        chain: i,
        data: a,
        gas: s,
        gasPrice: c,
        maxFeePerGas: u,
        maxPriorityFeePerGas: l,
        nonce: p,
        to: h,
        value: m,
        stateOverride: y,
      },
    ) {
      let g = n ? (0, t.f)(n) : void 0,
        v = (0, b.P)({
          from: g?.address,
          to: h,
          value:
            void 0 !== m &&
            `${(0, o.f)(m)} ${i?.nativeCurrency?.symbol || "ETH"}`,
          data: a,
          gas: s,
          gasPrice: void 0 !== c && `${(0, f.f)(c)} gwei`,
          maxFeePerGas: void 0 !== u && `${(0, f.f)(u)} gwei`,
          maxPriorityFeePerGas: void 0 !== l && `${(0, f.f)(l)} gwei`,
          nonce: p,
        });
      (y &&
        (v += `
${(0, d.O)(y)}`),
        super(e.shortMessage, {
          cause: e,
          docsPath: r,
          metaMessages: [
            ...(e.metaMessages ? [...e.metaMessages, " "] : []),
            "Raw Call Arguments:",
            v,
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
  class h extends u.f {
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
        d = u
          ? (0, a.f)({
              abiItem: u,
              args: n,
              includeFunctionName: !1,
              includeName: !1,
            })
          : void 0,
        p = u ? (0, i.r)(u, { includeName: !0 }) : void 0,
        h = (0, b.P)({
          address: r && l(r),
          function: p,
          args:
            d &&
            "()" !== d &&
            `${[...Array(f?.length ?? 0).keys()].map(() => " ").join("")}${d}`,
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
            h && "Contract Call:",
            h,
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
  class m extends u.f {
    constructor({ abi: e, data: t, functionName: s, message: o, cause: f }) {
      let u, d, b, l, p;
      if (t && "0x" !== t)
        try {
          let {
            abiItem: s,
            errorName: o,
            args: c,
          } = (d = (0, r.f)({ abi: e, data: t, cause: f }));
          if ("Error" === o) l = c[0];
          else if ("Panic" === o) {
            let [e] = c;
            l = n.o[e];
          } else {
            let e = s ? (0, i.r)(s, { includeName: !0 }) : void 0,
              t =
                s && c
                  ? (0, a.f)({
                      abiItem: s,
                      args: c,
                      includeFunctionName: !1,
                      includeName: !1,
                    })
                  : void 0;
            b = [
              e ? `Error: ${e}` : "",
              t && "()" !== t
                ? `       ${[...Array(o?.length ?? 0).keys()].map(() => " ").join("")}${t}`
                : "",
            ];
          }
        } catch (e) {
          u = e;
        }
      else o && (l = o);
      (u instanceof c.J &&
        ((p = u.signature),
        (b = [
          `Unable to decode signature "${p}" as it was not found on the provided ABI.`,
          "Make sure you are using the correct ABI and that the error exists on it.",
          `You can look up the decoded signature here: https://4byte.sourcify.dev/?q=${p}.`,
        ])),
        super(
          (l && "execution reverted" !== l) || p
            ? [
                `The contract function "${s}" reverted with the following ${p ? "signature" : "reason"}:`,
                l || p,
              ].join("\n")
            : `The contract function "${s}" reverted.`,
          {
            cause: u ?? f,
            metaMessages: b,
            name: "ContractFunctionRevertedError",
          },
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
        (this.data = d),
        (this.raw = t),
        (this.reason = l),
        (this.signature = p));
    }
  }
  class y extends u.f {
    constructor({ functionName: e, cause: t }) {
      super(`The contract function "${e}" returned no data ("0x").`, {
        metaMessages: [
          "This could be due to any of the following:",
          `  - The contract does not have the function "${e}",`,
          "  - The parameters passed to the contract function may be invalid, or",
          "  - The address is not a contract.",
        ],
        name: "ContractFunctionZeroDataError",
        cause: t,
      });
    }
  }
  class g extends u.f {
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
  class v extends u.f {
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
    ["o", 0, p, "h", 0, h, "P", 0, m, "v", 0, y, "p", 0, g, "w", 0, v],
    815727,
  );
};
