// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(570635),
    n = e.i(586903),
    r = e.i(346818),
    a = e.i(793136),
    i = e.i(914921),
    s = e.i(256309),
    o = e.i(548801),
    f = e.i(218438),
    c = e.i(822336),
    u = e.i(311486),
    l = e.i(803149),
    d = e.i(387060),
    b = e.i(101416),
    p = e.i(310191),
    h = e.i(972364),
    m = o;
  class y extends m.f {
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
  (Object.defineProperty(y, "code", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: 3,
  }),
    Object.defineProperty(y, "nodeMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: /execution reverted|gas required exceeds allowance/,
    }));
  class g extends m.f {
    constructor({ cause: e, maxFeePerGas: t } = {}) {
      super(
        `The fee cap (\`maxFeePerGas\`${t ? ` = ${(0, h.f)(t)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`,
        { cause: e, name: "FeeCapTooHighError" },
      );
    }
  }
  Object.defineProperty(g, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/,
  });
  class v extends m.f {
    constructor({ cause: e, maxFeePerGas: t } = {}) {
      super(
        `The fee cap (\`maxFeePerGas\`${t ? ` = ${(0, h.f)(t)}` : ""} gwei) cannot be lower than the block base fee.`,
        { cause: e, name: "FeeCapTooLowError" },
      );
    }
  }
  Object.defineProperty(v, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value:
      /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/,
  });
  class w extends m.f {
    constructor({ cause: e, nonce: t } = {}) {
      super(
        `Nonce provided for the transaction ${t ? `(${t}) ` : ""}is higher than the next one expected.`,
        { cause: e, name: "NonceTooHighError" },
      );
    }
  }
  Object.defineProperty(w, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /nonce too high/,
  });
  class $ extends m.f {
    constructor({ cause: e, nonce: t } = {}) {
      super(
        `Nonce provided for the transaction ${t ? `(${t}) ` : ""}is lower than the current nonce of the account.
Try increasing the nonce or find the latest nonce with \`getTransactionCount\`.`,
        { cause: e, name: "NonceTooLowError" },
      );
    }
  }
  Object.defineProperty($, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /nonce too low|transaction already imported|already known/,
  });
  class x extends m.f {
    constructor({ cause: e, nonce: t } = {}) {
      super(
        `Nonce provided for the transaction ${t ? `(${t}) ` : ""}exceeds the maximum allowed nonce.`,
        { cause: e, name: "NonceMaxValueError" },
      );
    }
  }
  Object.defineProperty(x, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /nonce has max value/,
  });
  class P extends m.f {
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
  Object.defineProperty(P, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /insufficient funds|exceeds transaction sender account balance/,
  });
  class A extends m.f {
    constructor({ cause: e, gas: t } = {}) {
      super(
        `The amount of gas ${t ? `(${t}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`,
        { cause: e, name: "IntrinsicGasTooHighError" },
      );
    }
  }
  Object.defineProperty(A, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /intrinsic gas too high|gas limit reached/,
  });
  class M extends m.f {
    constructor({ cause: e, gas: t } = {}) {
      super(
        `The amount of gas ${t ? `(${t}) ` : ""}provided for the transaction is too low.`,
        { cause: e, name: "IntrinsicGasTooLowError" },
      );
    }
  }
  Object.defineProperty(M, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /intrinsic gas too low/,
  });
  class E extends m.f {
    constructor({ cause: e }) {
      super("The transaction type is not supported for this chain.", {
        cause: e,
        name: "TransactionTypeNotSupportedError",
      });
    }
  }
  Object.defineProperty(E, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: /transaction type not valid/,
  });
  class z extends m.f {
    constructor({ cause: e, maxPriorityFeePerGas: t, maxFeePerGas: n } = {}) {
      super(
        `The provided tip (\`maxPriorityFeePerGas\`${t ? ` = ${(0, h.f)(t)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${n ? ` = ${(0, h.f)(n)} gwei` : ""}).`,
        { cause: e, name: "TipAboveFeeCapError" },
      );
    }
  }
  Object.defineProperty(z, "nodeMessage", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value:
      /max priority fee per gas higher than max fee per gas|tip higher than fee cap/,
  });
  class I extends m.f {
    constructor({ cause: e }) {
      super(`An error occurred while executing: ${e?.shortMessage}`, {
        cause: e,
        name: "UnknownNodeError",
      });
    }
  }
  function O(e, t) {
    let n = (e.details || "").toLowerCase(),
      r = e instanceof o.f ? e.walk((e) => e?.code === y.code) : e;
    return r instanceof o.f
      ? new y({ cause: e, message: r.details })
      : y.nodeMessage.test(n)
        ? new y({ cause: e, message: e.details })
        : g.nodeMessage.test(n)
          ? new g({ cause: e, maxFeePerGas: t?.maxFeePerGas })
          : v.nodeMessage.test(n)
            ? new v({ cause: e, maxFeePerGas: t?.maxFeePerGas })
            : w.nodeMessage.test(n)
              ? new w({ cause: e, nonce: t?.nonce })
              : $.nodeMessage.test(n)
                ? new $({ cause: e, nonce: t?.nonce })
                : x.nodeMessage.test(n)
                  ? new x({ cause: e, nonce: t?.nonce })
                  : P.nodeMessage.test(n)
                    ? new P({ cause: e })
                    : A.nodeMessage.test(n)
                      ? new A({ cause: e, gas: t?.gas })
                      : M.nodeMessage.test(n)
                        ? new M({ cause: e, gas: t?.gas })
                        : E.nodeMessage.test(n)
                          ? new E({ cause: e })
                          : z.nodeMessage.test(n)
                            ? new z({
                                cause: e,
                                maxFeePerGas: t?.maxFeePerGas,
                                maxPriorityFeePerGas: t?.maxPriorityFeePerGas,
                              })
                            : new I({ cause: e });
  }
  function j(e, { docsPath: t, ...n }) {
    let r,
      a = (r = O(e, n)) instanceof I ? e : r;
    return new c.o(a, { docsPath: t, ...n });
  }
  function B(e, { format: t }) {
    if (!t) return {};
    let n = {};
    return (
      !(function t(r) {
        for (let a of Object.keys(r))
          (a in e && (n[a] = e[a]),
            r[a] && "object" == typeof r[a] && !Array.isArray(r[a]) && t(r[a]));
      })(t(e || {})),
      n
    );
  }
  function T(e, t) {
    return ({ exclude: n, format: r }) => ({
      exclude: n,
      format: (e, a) => {
        let i = t(e, a);
        if (n) for (let e of n) delete i[e];
        return { ...i, ...r(e, a) };
      },
      type: e,
    });
  }
  (e.s(
    [
      "s",
      0,
      y,
      "k",
      0,
      g,
      "L",
      0,
      v,
      "y",
      0,
      P,
      "D",
      0,
      A,
      "m",
      0,
      M,
      "G",
      0,
      x,
      "e",
      0,
      w,
      "q",
      0,
      $,
      "M",
      0,
      z,
      "N",
      0,
      E,
      "b",
      0,
      I,
    ],
    956160,
  ),
    e.s(["f", 0, O], 675101),
    e.s(["f", 0, j], 875271),
    e.s(["f", 0, B], 593460),
    e.s(["f", 0, T], 143484));
  let N = {
    legacy: "0x0",
    eip2930: "0x1",
    eip1559: "0x2",
    eip4844: "0x3",
    eip7702: "0x4",
  };
  function S(e, t) {
    let n = {};
    return (
      void 0 !== e.authorizationList &&
        (n.authorizationList = e.authorizationList.map((e) => ({
          address: e.address,
          r: e.r ? (0, p.N)(BigInt(e.r)) : e.r,
          s: e.s ? (0, p.N)(BigInt(e.s)) : e.s,
          chainId: (0, p.N)(e.chainId),
          nonce: (0, p.N)(e.nonce),
          ...(void 0 !== e.yParity ? { yParity: (0, p.N)(e.yParity) } : {}),
          ...(void 0 !== e.v && void 0 === e.yParity
            ? { v: (0, p.N)(e.v) }
            : {}),
        }))),
      void 0 !== e.accessList && (n.accessList = e.accessList),
      void 0 !== e.blobVersionedHashes &&
        (n.blobVersionedHashes = e.blobVersionedHashes),
      void 0 !== e.blobs &&
        ("string" != typeof e.blobs[0]
          ? (n.blobs = e.blobs.map((e) => (0, p.v)(e)))
          : (n.blobs = e.blobs)),
      void 0 !== e.data && (n.data = e.data),
      e.account && (n.from = e.account.address),
      void 0 !== e.from && (n.from = e.from),
      void 0 !== e.gas && (n.gas = (0, p.N)(e.gas)),
      void 0 !== e.gasPrice && (n.gasPrice = (0, p.N)(e.gasPrice)),
      void 0 !== e.maxFeePerBlobGas &&
        (n.maxFeePerBlobGas = (0, p.N)(e.maxFeePerBlobGas)),
      void 0 !== e.maxFeePerGas && (n.maxFeePerGas = (0, p.N)(e.maxFeePerGas)),
      void 0 !== e.maxPriorityFeePerGas &&
        (n.maxPriorityFeePerGas = (0, p.N)(e.maxPriorityFeePerGas)),
      void 0 !== e.nonce && (n.nonce = (0, p.N)(e.nonce)),
      void 0 !== e.to && (n.to = e.to),
      void 0 !== e.type && (n.type = N[e.type]),
      void 0 !== e.value && (n.value = (0, p.N)(e.value)),
      n
    );
  }
  let C = T("transactionRequest", S);
  function F() {
    let e = () => void 0,
      t = () => void 0;
    return {
      promise: new Promise((n, r) => {
        ((e = n), (t = r));
      }),
      resolve: e,
      reject: t,
    };
  }
  (e.s(["V", 0, C, "F", 0, S], 271598), e.s(["f", 0, F], 6473));
  let k = new Map();
  function R({ fn: e, id: t, shouldSplitBatch: n, wait: r = 0, sort: a }) {
    let i = async () => {
        let t = o();
        s();
        let n = t.map(({ args: e }) => e);
        0 !== n.length &&
          e(n)
            .then((e) => {
              a && Array.isArray(e) && e.sort(a);
              for (let n = 0; n < t.length; n++) {
                let { resolve: r } = t[n];
                r?.([e[n], e]);
              }
            })
            .catch((e) => {
              for (let n = 0; n < t.length; n++) {
                let { reject: r } = t[n];
                r?.(e);
              }
            });
      },
      s = () => k.delete(t),
      o = () => k.get(t) || [],
      f = (e) => k.set(t, [...o(), e]);
    return {
      flush: s,
      async schedule(e) {
        let { promise: t, resolve: a, reject: s } = F();
        return (
          (n?.([...o().map(({ args: e }) => e), e]) && i(), o().length > 0)
            ? f({ args: e, resolve: a, reject: s })
            : (f({ args: e, resolve: a, reject: s }), setTimeout(i, r)),
          t
        );
      },
    };
  }
  e.s(["f", 0, R], 914332);
  var U = e.i(572659),
    D = e.i(920107),
    L = e.i(473125),
    G = e.i(821292);
  function _(e) {
    if (e && 0 !== e.length)
      return e.reduce((e, { slot: t, value: n }) => {
        if (66 !== t.length)
          throw new D.i({ size: t.length, targetSize: 66, type: "hex" });
        if (66 !== n.length)
          throw new D.i({ size: n.length, targetSize: 66, type: "hex" });
        return ((e[t] = n), e);
      }, {});
  }
  function V(e) {
    if (!e) return;
    let t = {};
    for (let { address: n, ...r } of e) {
      if (!(0, G.f)(n, { strict: !1 })) throw new U.f({ address: n });
      if (t[n]) throw new L.n({ address: n });
      t[n] = (function (e) {
        let { balance: t, nonce: n, state: r, stateDiff: a, code: i } = e,
          s = {};
        if (
          (void 0 !== i && (s.code = i),
          void 0 !== t && (s.balance = (0, p.N)(t)),
          void 0 !== n && (s.nonce = (0, p.N)(n)),
          void 0 !== r && (s.state = _(r)),
          void 0 !== a)
        ) {
          if (s.state) throw new L._();
          s.stateDiff = _(a);
        }
        return s;
      })(r);
    }
    return t;
  }
  e.s(["f", 0, V], 987563);
  let q = 2n ** 256n - 1n;
  function H(e) {
    let { account: t, maxFeePerGas: n, maxPriorityFeePerGas: a, to: i } = e,
      s = t ? (0, r.f)(t) : void 0;
    if (s && !(0, G.f)(s.address)) throw new U.f({ address: s.address });
    if (i && !(0, G.f)(i)) throw new U.f({ address: i });
    if (n && n > q) throw new g({ maxFeePerGas: n });
    if (a && n && a > n)
      throw new z({ maxFeePerGas: n, maxPriorityFeePerGas: a });
  }
  async function W(a, u) {
    let {
        account: d = a.account,
        authorizationList: b,
        batch: h = !!a.batch?.multicall,
        blockNumber: m,
        blockTag: y = a.experimental_blockTag ?? "latest",
        accessList: g,
        blobs: v,
        blockOverrides: w,
        code: $,
        data: x,
        factory: P,
        factoryData: A,
        gas: M,
        gasPrice: E,
        maxFeePerBlobGas: z,
        maxFeePerGas: I,
        maxPriorityFeePerGas: O,
        nonce: T,
        to: N,
        value: C,
        stateOverride: F,
        ...k
      } = u,
      R = d ? (0, r.f)(d) : void 0;
    if ($ && (P || A))
      throw new o.f(
        "Cannot provide both `code` & `factory`/`factoryData` as parameters.",
      );
    if ($ && N)
      throw new o.f("Cannot provide both `code` & `to` as parameters.");
    let U = $ && x,
      D = P && A && N && x,
      L = U || D,
      G = U
        ? J({ code: $, data: x })
        : D
          ? (function (e) {
              let { data: n, factory: r, factoryData: a, to: i } = e;
              return (0, l.f)({
                abi: (0, t.f)(["constructor(address, bytes, address, bytes)"]),
                bytecode: s.G,
                args: [i, n, r, a],
              });
            })({ data: x, factory: P, factoryData: A, to: N })
          : x;
    try {
      let e;
      H(u);
      let t = ("bigint" == typeof m ? (0, p.N)(m) : void 0) || y,
        r = w ? n.f(w) : void 0,
        s = V(F),
        o = a.chain?.formatters?.transactionRequest?.format,
        c = (o || S)(
          {
            ...B(k, { format: o }),
            accessList: g,
            account: R,
            authorizationList: b,
            blobs: v,
            data: G,
            gas: M,
            gasPrice: E,
            maxFeePerBlobGas: z,
            maxFeePerGas: I,
            maxPriorityFeePerGas: O,
            nonce: T,
            to: L ? void 0 : N,
            value: C,
          },
          "call",
        );
      if (
        h &&
        (function ({ request: e }) {
          let { data: t, to: n, ...r } = e;
          return (
            !(!t || t.startsWith(i.f)) &&
            !!n &&
            !(Object.values(r).filter((e) => void 0 !== e).length > 0)
          );
        })({ request: c }) &&
        !s &&
        !r
      )
        try {
          return await Z(a, { ...c, blockNumber: m, blockTag: y });
        } catch (e) {
          if (!(e instanceof f.L) && !(e instanceof f.m)) throw e;
        }
      let l =
          ((e = [c, t]),
          s && r ? [...e, s, r] : s ? [...e, s] : r ? [...e, {}, r] : e),
        d = await a.request({ method: "eth_call", params: l });
      if ("0x" === d) return { data: void 0 };
      return { data: d };
    } catch (i) {
      let t = (function (e) {
          if (!(e instanceof o.f)) return;
          let t = e.walk();
          return "object" == typeof t?.data ? t.data?.data : t.data;
        })(i),
        { offchainLookup: n, offchainLookupSignature: r } = await e.A(837045);
      if (!1 !== a.ccipRead && t?.slice(0, 10) === r && N)
        return { data: await n(a, { data: t, to: N }) };
      if (L && t?.slice(0, 10) === "0x101bb98d") throw new c.p({ factory: P });
      throw j(i, { ...u, account: R, chain: a.chain });
    }
  }
  async function Z(e, t) {
    let {
        batchSize: n = 1024,
        deployless: r = !1,
        wait: i = 0,
      } = "object" == typeof e.batch?.multicall ? e.batch.multicall : {},
      {
        blockNumber: o,
        blockTag: l = e.experimental_blockTag ?? "latest",
        data: h,
        to: m,
      } = t,
      y = (() => {
        if (r) return null;
        if (t.multicallAddress) return t.multicallAddress;
        if (e.chain)
          return (0, b.f)({
            blockNumber: o,
            chain: e.chain,
            contract: "multicall3",
          });
        throw new f.L();
      })(),
      g = ("bigint" == typeof o ? (0, p.N)(o) : void 0) || l,
      { schedule: v } = R({
        id: `${e.uid}.${g}`,
        wait: i,
        shouldSplitBatch: (e) =>
          e.reduce((e, { data: t }) => e + (t.length - 2), 0) > 2 * n,
        fn: async (t) => {
          let n = t.map((e) => ({
              allowFailure: !0,
              callData: e.data,
              target: e.to,
            })),
            r = (0, d.f)({ abi: a.v, args: [n], functionName: "aggregate3" }),
            i = await e.request({
              method: "eth_call",
              params: [
                {
                  ...(null === y
                    ? { data: J({ code: s.c, data: r }) }
                    : { to: y, data: r }),
                },
                g,
              ],
            });
          return (0, u.f)({
            abi: a.v,
            args: [n],
            functionName: "aggregate3",
            data: i || "0x",
          });
        },
      }),
      [{ returnData: w, success: $ }] = await v({ data: h, to: m });
    if (!$) throw new c.w({ data: w });
    return "0x" === w ? { data: void 0 } : { data: w };
  }
  function J(e) {
    let { code: n, data: r } = e;
    return (0, l.f)({
      abi: (0, t.f)(["constructor(bytes, bytes)"]),
      bytecode: s.I,
      args: [n, r],
    });
  }
  (e.s(["x", 0, 2n ** 16n - 1n, "_", 0, q], 686971),
    e.s(["f", 0, H], 180014),
    e.s(["f", 0, W], 350001));
};
