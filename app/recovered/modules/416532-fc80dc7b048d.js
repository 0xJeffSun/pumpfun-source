// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(532617),
    r = e.i(503725);
  class n extends t.f {
    constructor(
      e,
      { code: t, docsPath: n, metaMessages: a, name: i, shortMessage: s },
    ) {
      (super(s, {
        cause: e,
        docsPath: n,
        metaMessages: a || e?.metaMessages,
        name: i || "RpcError",
      }),
        Object.defineProperty(this, "code", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.name = i || e.name),
        (this.code = e instanceof r.V ? e.code : (t ?? -1)));
    }
  }
  class a extends n {
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
  class i extends n {
    constructor(e) {
      super(e, {
        code: i.code,
        name: "ParseRpcError",
        shortMessage:
          "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.",
      });
    }
  }
  Object.defineProperty(i, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32700,
  });
  class s extends n {
    constructor(e) {
      super(e, {
        code: s.code,
        name: "InvalidRequestRpcError",
        shortMessage: "JSON is not a valid request object.",
      });
    }
  }
  Object.defineProperty(s, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32600,
  });
  class o extends n {
    constructor(e, { method: t } = {}) {
      super(e, {
        code: o.code,
        name: "MethodNotFoundRpcError",
        shortMessage: `The method${t ? ` "${t}"` : ""} does not exist / is not available.`,
      });
    }
  }
  Object.defineProperty(o, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32601,
  });
  class c extends n {
    constructor(e) {
      super(e, {
        code: c.code,
        name: "InvalidParamsRpcError",
        shortMessage:
          "Invalid parameters were provided to the RPC method.\nDouble check you have provided the correct parameters.",
      });
    }
  }
  Object.defineProperty(c, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32602,
  });
  class l extends n {
    constructor(e) {
      super(e, {
        code: l.code,
        name: "InternalRpcError",
        shortMessage: "An internal error was received.",
      });
    }
  }
  Object.defineProperty(l, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32603,
  });
  class u extends n {
    constructor(e) {
      super(e, {
        code: u.code,
        name: "InvalidInputRpcError",
        shortMessage:
          "Missing or invalid parameters.\nDouble check you have provided the correct parameters.",
      });
    }
  }
  Object.defineProperty(u, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32e3,
  });
  class f extends n {
    constructor(e) {
      (super(e, {
        code: f.code,
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
  Object.defineProperty(f, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32001,
  });
  class d extends n {
    constructor(e) {
      super(e, {
        code: d.code,
        name: "ResourceUnavailableRpcError",
        shortMessage: "Requested resource not available.",
      });
    }
  }
  Object.defineProperty(d, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32002,
  });
  class p extends n {
    constructor(e) {
      super(e, {
        code: p.code,
        name: "TransactionRejectedRpcError",
        shortMessage: "Transaction creation failed.",
      });
    }
  }
  Object.defineProperty(p, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32003,
  });
  class h extends n {
    constructor(e, { method: t } = {}) {
      super(e, {
        code: h.code,
        name: "MethodNotSupportedRpcError",
        shortMessage: `Method${t ? ` "${t}"` : ""} is not supported.`,
      });
    }
  }
  Object.defineProperty(h, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32004,
  });
  class m extends n {
    constructor(e) {
      super(e, {
        code: m.code,
        name: "LimitExceededRpcError",
        shortMessage: "Request exceeds defined limit.",
      });
    }
  }
  Object.defineProperty(m, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32005,
  });
  class y extends n {
    constructor(e) {
      super(e, {
        code: y.code,
        name: "JsonRpcVersionUnsupportedError",
        shortMessage: "Version of JSON-RPC protocol is not supported.",
      });
    }
  }
  Object.defineProperty(y, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: -32006,
  });
  class b extends a {
    constructor(e) {
      super(e, {
        code: b.code,
        name: "UserRejectedRequestError",
        shortMessage: "User rejected the request.",
      });
    }
  }
  Object.defineProperty(b, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4001,
  });
  class g extends a {
    constructor(e) {
      super(e, {
        code: g.code,
        name: "UnauthorizedProviderError",
        shortMessage:
          "The requested method and/or account has not been authorized by the user.",
      });
    }
  }
  Object.defineProperty(g, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4100,
  });
  class w extends a {
    constructor(e, { method: t } = {}) {
      super(e, {
        code: w.code,
        name: "UnsupportedProviderMethodError",
        shortMessage: `The Provider does not support the requested method${t ? ` " ${t}"` : ""}.`,
      });
    }
  }
  Object.defineProperty(w, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4200,
  });
  class v extends a {
    constructor(e) {
      super(e, {
        code: v.code,
        name: "ProviderDisconnectedError",
        shortMessage: "The Provider is disconnected from all chains.",
      });
    }
  }
  Object.defineProperty(v, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4900,
  });
  class P extends a {
    constructor(e) {
      super(e, {
        code: P.code,
        name: "ChainDisconnectedError",
        shortMessage: "The Provider is not connected to the requested chain.",
      });
    }
  }
  Object.defineProperty(P, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4901,
  });
  class x extends a {
    constructor(e) {
      super(e, {
        code: x.code,
        name: "SwitchChainError",
        shortMessage: "An error occurred when attempting to switch chain.",
      });
    }
  }
  Object.defineProperty(x, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 4902,
  });
  class B extends a {
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
  class A extends a {
    constructor(e) {
      super(e, {
        code: A.code,
        name: "UnsupportedChainIdError",
        shortMessage: "This Wallet does not support the requested chain ID.",
      });
    }
  }
  Object.defineProperty(A, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 5710,
  });
  class N extends a {
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
  class k extends a {
    constructor(e) {
      super(e, {
        code: k.code,
        name: "UnknownBundleIdError",
        shortMessage: "This bundle id is unknown / has not been submitted",
      });
    }
  }
  Object.defineProperty(k, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 5730,
  });
  class E extends a {
    constructor(e) {
      super(e, {
        code: E.code,
        name: "BundleTooLargeError",
        shortMessage: "The call bundle is too large for the Wallet to process.",
      });
    }
  }
  Object.defineProperty(E, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 5740,
  });
  class T extends a {
    constructor(e) {
      super(e, {
        code: T.code,
        name: "AtomicReadyWalletRejectedUpgradeError",
        shortMessage:
          "The Wallet can support atomicity after an upgrade, but the user rejected the upgrade.",
      });
    }
  }
  Object.defineProperty(T, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 5750,
  });
  class R extends a {
    constructor(e) {
      super(e, {
        code: R.code,
        name: "AtomicityNotSupportedError",
        shortMessage:
          "The wallet does not support atomic execution but the request requires it.",
      });
    }
  }
  async function I(e) {
    return new Promise((t) => setTimeout(t, e));
  }
  (Object.defineProperty(R, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 5760,
  }),
    e.s(
      [
        "Z",
        0,
        T,
        "T",
        0,
        R,
        "Y",
        0,
        E,
        "r",
        0,
        P,
        "a",
        0,
        N,
        "D",
        0,
        l,
        "L",
        0,
        u,
        "u",
        0,
        c,
        "P",
        0,
        s,
        "J",
        0,
        y,
        "H",
        0,
        m,
        "X",
        0,
        o,
        "b",
        0,
        h,
        "Q",
        0,
        i,
        "p",
        0,
        v,
        "V",
        0,
        f,
        "j",
        0,
        d,
        "S",
        0,
        x,
        "g",
        0,
        p,
        "$",
        0,
        g,
        "s",
        0,
        k,
        "U",
        0,
        class extends n {
          constructor(e) {
            super(e, {
              name: "UnknownRpcError",
              shortMessage: "An unknown RPC error occurred.",
            });
          }
        },
        "d",
        0,
        A,
        "E",
        0,
        B,
        "q",
        0,
        w,
        "k",
        0,
        b,
      ],
      416532,
    ),
    e.s(["f", 0, I], 631777));
};
