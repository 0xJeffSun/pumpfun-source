// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(641802),
    r = e.i(927974),
    n = e.i(815727),
    i = e.i(982405),
    a = r;
  class s extends a.f {
    constructor(
      e,
      { code: t, docsPath: r, metaMessages: n, name: a, shortMessage: s },
    ) {
      (super(s, {
        cause: e,
        docsPath: r,
        metaMessages: n || e?.metaMessages,
        name: a || "RpcError",
      }),
        Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.name = a || e.name),
        (this.code = e instanceof i.V ? e.code : (t ?? -1)));
    }
  }
  class o extends s {
    constructor(e, t) {
      (super(e, t),
        Object.defineProperty(this, "data", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.data = t.data));
    }
  }
  class u extends s {
    constructor(e) {
      super(e, {
        code: u.code,
        name: "ParseRpcError",
        shortMessage:
          "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.",
      });
    }
  }
  Object.defineProperty(u, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32700,
  });
  class l extends s {
    constructor(e) {
      super(e, {
        code: l.code,
        name: "InvalidRequestRpcError",
        shortMessage: "JSON is not a valid request object.",
      });
    }
  }
  Object.defineProperty(l, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32600,
  });
  class c extends s {
    constructor(e, { method: t } = {}) {
      super(e, {
        code: c.code,
        name: "MethodNotFoundRpcError",
        shortMessage: `The method${t ? ` "${t}"` : ""} does not exist / is not available.`,
      });
    }
  }
  Object.defineProperty(c, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32601,
  });
  class f extends s {
    constructor(e) {
      super(e, {
        code: f.code,
        name: "InvalidParamsRpcError",
        shortMessage:
          "Invalid parameters were provided to the RPC method.\nDouble check you have provided the correct parameters.",
      });
    }
  }
  Object.defineProperty(f, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32602,
  });
  class d extends s {
    constructor(e) {
      super(e, {
        code: d.code,
        name: "InternalRpcError",
        shortMessage: "An internal error was received.",
      });
    }
  }
  Object.defineProperty(d, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32603,
  });
  class p extends s {
    constructor(e) {
      super(e, {
        code: p.code,
        name: "InvalidInputRpcError",
        shortMessage:
          "Missing or invalid parameters.\nDouble check you have provided the correct parameters.",
      });
    }
  }
  Object.defineProperty(p, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32e3,
  });
  class y extends s {
    constructor(e) {
      (super(e, {
        code: y.code,
        name: "ResourceNotFoundRpcError",
        shortMessage: "Requested resource not found.",
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "ResourceNotFoundRpcError",
        }));
    }
  }
  Object.defineProperty(y, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32001,
  });
  class h extends s {
    constructor(e) {
      super(e, {
        code: h.code,
        name: "ResourceUnavailableRpcError",
        shortMessage: "Requested resource not available.",
      });
    }
  }
  Object.defineProperty(h, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32002,
  });
  class m extends s {
    constructor(e) {
      super(e, {
        code: m.code,
        name: "TransactionRejectedRpcError",
        shortMessage: "Transaction creation failed.",
      });
    }
  }
  Object.defineProperty(m, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32003,
  });
  class g extends s {
    constructor(e, { method: t } = {}) {
      super(e, {
        code: g.code,
        name: "MethodNotSupportedRpcError",
        shortMessage: `Method${t ? ` "${t}"` : ""} is not supported.`,
      });
    }
  }
  Object.defineProperty(g, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32004,
  });
  class b extends s {
    constructor(e) {
      super(e, {
        code: b.code,
        name: "LimitExceededRpcError",
        shortMessage: "Request exceeds defined limit.",
      });
    }
  }
  Object.defineProperty(b, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32005,
  });
  class w extends s {
    constructor(e) {
      super(e, {
        code: w.code,
        name: "JsonRpcVersionUnsupportedError",
        shortMessage: "Version of JSON-RPC protocol is not supported.",
      });
    }
  }
  Object.defineProperty(w, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32006,
  });
  class v extends o {
    constructor(e) {
      super(e, {
        code: v.code,
        name: "UserRejectedRequestError",
        shortMessage: "User rejected the request.",
      });
    }
  }
  Object.defineProperty(v, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4001,
  });
  class x extends o {
    constructor(e) {
      super(e, {
        code: x.code,
        name: "UnauthorizedProviderError",
        shortMessage:
          "The requested method and/or account has not been authorized by the user.",
      });
    }
  }
  Object.defineProperty(x, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4100,
  });
  class P extends o {
    constructor(e, { method: t } = {}) {
      super(e, {
        code: P.code,
        name: "UnsupportedProviderMethodError",
        shortMessage: `The Provider does not support the requested method${t ? ` " ${t}"` : ""}.`,
      });
    }
  }
  Object.defineProperty(P, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4200,
  });
  class k extends o {
    constructor(e) {
      super(e, {
        code: k.code,
        name: "ProviderDisconnectedError",
        shortMessage: "The Provider is disconnected from all chains.",
      });
    }
  }
  Object.defineProperty(k, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4900,
  });
  class A extends o {
    constructor(e) {
      super(e, {
        code: A.code,
        name: "ChainDisconnectedError",
        shortMessage: "The Provider is not connected to the requested chain.",
      });
    }
  }
  Object.defineProperty(A, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4901,
  });
  class I extends o {
    constructor(e) {
      super(e, {
        code: I.code,
        name: "SwitchChainError",
        shortMessage: "An error occurred when attempting to switch chain.",
      });
    }
  }
  Object.defineProperty(I, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4902,
  });
  class B extends o {
    constructor(e) {
      super(e, {
        code: B.code,
        name: "UnsupportedNonOptionalCapabilityError",
        shortMessage:
          "This Wallet does not support a capability that was not marked as optional.",
      });
    }
  }
  Object.defineProperty(B, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 5700,
  });
  class E extends o {
    constructor(e) {
      super(e, {
        code: E.code,
        name: "UnsupportedChainIdError",
        shortMessage: "This Wallet does not support the requested chain ID.",
      });
    }
  }
  Object.defineProperty(E, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 5710,
  });
  class N extends o {
    constructor(e) {
      super(e, {
        code: N.code,
        name: "DuplicateIdError",
        shortMessage: "There is already a bundle submitted with this ID.",
      });
    }
  }
  Object.defineProperty(N, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 5720,
  });
  class T extends o {
    constructor(e) {
      super(e, {
        code: T.code,
        name: "UnknownBundleIdError",
        shortMessage: "This bundle id is unknown / has not been submitted",
      });
    }
  }
  Object.defineProperty(T, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 5730,
  });
  class S extends o {
    constructor(e) {
      super(e, {
        code: S.code,
        name: "BundleTooLargeError",
        shortMessage: "The call bundle is too large for the Wallet to process.",
      });
    }
  }
  Object.defineProperty(S, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 5740,
  });
  class M extends o {
    constructor(e) {
      super(e, {
        code: M.code,
        name: "AtomicReadyWalletRejectedUpgradeError",
        shortMessage:
          "The Wallet can support atomicity after an upgrade, but the user rejected the upgrade.",
      });
    }
  }
  Object.defineProperty(M, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 5750,
  });
  class z extends o {
    constructor(e) {
      super(e, {
        code: z.code,
        name: "AtomicityNotSupportedError",
        shortMessage:
          "The wallet does not support atomic execution but the request requires it.",
      });
    }
  }
  Object.defineProperty(z, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 5760,
  });
  class U extends o {
    constructor(e) {
      super(e, {
        code: U.code,
        name: "WalletConnectSessionSettlementError",
        shortMessage: "WalletConnect session settlement failed.",
      });
    }
  }
  (Object.defineProperty(U, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 7e3,
  }),
    e.s(
      [
        "Z",
        0,
        M,
        "T",
        0,
        z,
        "Y",
        0,
        S,
        "r",
        0,
        A,
        "a",
        0,
        N,
        "D",
        0,
        d,
        "L",
        0,
        p,
        "u",
        0,
        f,
        "P",
        0,
        l,
        "J",
        0,
        w,
        "H",
        0,
        b,
        "X",
        0,
        c,
        "b",
        0,
        g,
        "Q",
        0,
        u,
        "p",
        0,
        k,
        "V",
        0,
        y,
        "j",
        0,
        h,
        "S",
        0,
        I,
        "g",
        0,
        m,
        "$",
        0,
        x,
        "s",
        0,
        T,
        "U",
        0,
        class extends s {
          constructor(e) {
            super(e, {
              name: "UnknownRpcError",
              shortMessage: "An unknown RPC error occurred.",
            });
          }
        },
        "d",
        0,
        E,
        "E",
        0,
        B,
        "q",
        0,
        P,
        "k",
        0,
        v,
        "B",
        0,
        U,
      ],
      214721,
    ),
    e.s(
      [
        "f",
        0,
        function (
          e,
          {
            abi: a,
            address: s,
            args: o,
            docsPath: u,
            functionName: l,
            sender: c,
          },
        ) {
          let f =
              e instanceof n.w
                ? e
                : e instanceof r.f
                  ? e.walk((e) => "data" in e) || e.walk()
                  : {},
            { code: y, data: h, details: m, message: g, shortMessage: b } = f,
            w =
              e instanceof t.g
                ? new n.v({ functionName: l, cause: e })
                : ([3, d.code].includes(y) && (h || m || g || b)) ||
                    (y === p.code && "execution reverted" === m && h)
                  ? new n.P({
                      abi: a,
                      data: "object" == typeof h ? h.data : h,
                      functionName: l,
                      message: f instanceof i.V ? m : (b ?? g),
                      cause: e,
                    })
                  : e;
          return new n.h(w, {
            abi: a,
            args: o,
            contractAddress: s,
            docsPath: u,
            functionName: l,
            sender: c,
          });
        },
      ],
      286533,
    ));
};
