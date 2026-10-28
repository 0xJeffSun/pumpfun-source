// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(428296),
    f = e.i(690095),
    a = e.i(45417),
    n = e.i(58904),
    r = e.i(212719),
    i = e.i(896675),
    b = e.i(532617),
    s = e.i(246666),
    o = e.i(886598),
    c = e.i(774279),
    d = e.i(729323),
    u = e.i(293341),
    l = e.i(20425),
    h = e.i(19648),
    p = e.i(960872);
  function g(e, t) {
    let f = (e.details || "").toLowerCase(),
      a = e instanceof b.f ? e.walk((e) => e?.code === p.s.code) : e;
    return a instanceof b.f
      ? new p.s({ cause: e, message: a.details })
      : p.s.nodeMessage.test(f)
        ? new p.s({ cause: e, message: e.details })
        : p.k.nodeMessage.test(f)
          ? new p.k({ cause: e, maxFeePerGas: t?.maxFeePerGas })
          : p.L.nodeMessage.test(f)
            ? new p.L({ cause: e, maxFeePerGas: t?.maxFeePerGas })
            : p.e.nodeMessage.test(f)
              ? new p.e({ cause: e, nonce: t?.nonce })
              : p.q.nodeMessage.test(f)
                ? new p.q({ cause: e, nonce: t?.nonce })
                : p.G.nodeMessage.test(f)
                  ? new p.G({ cause: e, nonce: t?.nonce })
                  : p.y.nodeMessage.test(f)
                    ? new p.y({ cause: e })
                    : p.D.nodeMessage.test(f)
                      ? new p.D({ cause: e, gas: t?.gas })
                      : p.m.nodeMessage.test(f)
                        ? new p.m({ cause: e, gas: t?.gas })
                        : p.N.nodeMessage.test(f)
                          ? new p.N({ cause: e })
                          : p.M.nodeMessage.test(f)
                            ? new p.M({
                                cause: e,
                                maxFeePerGas: t?.maxFeePerGas,
                                maxPriorityFeePerGas: t?.maxPriorityFeePerGas,
                              })
                            : new p.b({ cause: e });
  }
  function m(e, { docsPath: t, ...f }) {
    let a,
      n = (a = g(e, f)) instanceof p.b ? e : a;
    return new o.o(n, { docsPath: t, ...f });
  }
  function y(e, { format: t }) {
    if (!t) return {};
    let f = {};
    return (
      !(function t(a) {
        for (let n of Object.keys(a))
          (n in e && (f[n] = e[n]),
            a[n] && "object" == typeof a[n] && !Array.isArray(a[n]) && t(a[n]));
      })(t(e || {})),
      f
    );
  }
  (e.s(["f", 0, g], 938910),
    e.s(["f", 0, m], 836970),
    e.s(["f", 0, y], 691806),
    e.i(370917));
  let w = {
    legacy: "0x0",
    eip2930: "0x1",
    eip1559: "0x2",
    eip4844: "0x3",
    eip7702: "0x4",
  };
  function v(e, t) {
    let f = {};
    return (
      void 0 !== e.authorizationList &&
        (f.authorizationList = e.authorizationList.map((e) => ({
          address: e.address,
          r: e.r ? (0, h.N)(BigInt(e.r)) : e.r,
          s: e.s ? (0, h.N)(BigInt(e.s)) : e.s,
          chainId: (0, h.N)(e.chainId),
          nonce: (0, h.N)(e.nonce),
          ...(void 0 !== e.yParity ? { yParity: (0, h.N)(e.yParity) } : {}),
          ...(void 0 !== e.v && void 0 === e.yParity
            ? { v: (0, h.N)(e.v) }
            : {}),
        }))),
      void 0 !== e.accessList && (f.accessList = e.accessList),
      void 0 !== e.blobVersionedHashes &&
        (f.blobVersionedHashes = e.blobVersionedHashes),
      void 0 !== e.blobs &&
        ("string" != typeof e.blobs[0]
          ? (f.blobs = e.blobs.map((e) => (0, h.v)(e)))
          : (f.blobs = e.blobs)),
      void 0 !== e.data && (f.data = e.data),
      e.account && (f.from = e.account.address),
      void 0 !== e.from && (f.from = e.from),
      void 0 !== e.gas && (f.gas = (0, h.N)(e.gas)),
      void 0 !== e.gasPrice && (f.gasPrice = (0, h.N)(e.gasPrice)),
      void 0 !== e.maxFeePerBlobGas &&
        (f.maxFeePerBlobGas = (0, h.N)(e.maxFeePerBlobGas)),
      void 0 !== e.maxFeePerGas && (f.maxFeePerGas = (0, h.N)(e.maxFeePerGas)),
      void 0 !== e.maxPriorityFeePerGas &&
        (f.maxPriorityFeePerGas = (0, h.N)(e.maxPriorityFeePerGas)),
      void 0 !== e.nonce && (f.nonce = (0, h.N)(e.nonce)),
      void 0 !== e.to && (f.to = e.to),
      void 0 !== e.type && (f.type = w[e.type]),
      void 0 !== e.value && (f.value = (0, h.N)(e.value)),
      f
    );
  }
  e.s(["f", 0, v], 54003);
  var x = e.i(343213),
    $ = e.i(296006),
    P = e.i(702737),
    O = e.i(374537),
    j = e.i(4911);
  function N(e) {
    if (e && 0 !== e.length)
      return e.reduce((e, { slot: t, value: f }) => {
        if (66 !== t.length)
          throw new P.i({ size: t.length, targetSize: 66, type: "hex" });
        if (66 !== f.length)
          throw new P.i({ size: f.length, targetSize: 66, type: "hex" });
        return ((e[t] = f), e);
      }, {});
  }
  function A(e) {
    if (!e) return;
    let t = {};
    for (let { address: f, ...a } of e) {
      if (!(0, j.f)(f, { strict: !1 })) throw new $.f({ address: f });
      if (t[f]) throw new O.n({ address: f });
      t[f] = (function (e) {
        let { balance: t, nonce: f, state: a, stateDiff: n, code: r } = e,
          i = {};
        if (
          (void 0 !== r && (i.code = r),
          void 0 !== t && (i.balance = (0, h.N)(t)),
          void 0 !== f && (i.nonce = (0, h.N)(f)),
          void 0 !== a && (i.state = N(a)),
          void 0 !== n)
        ) {
          if (i.state) throw new O._();
          i.stateDiff = N(n);
        }
        return i;
      })(a);
    }
    return t;
  }
  e.s(["f", 0, A], 323836);
  var M = e.i(315857);
  function F(e) {
    let { account: t, maxFeePerGas: f, maxPriorityFeePerGas: n, to: r } = e,
      i = t ? (0, a.f)(t) : void 0;
    if (i && !(0, j.f)(i.address)) throw new $.f({ address: i.address });
    if (r && !(0, j.f)(r)) throw new $.f({ address: r });
    if (f && f > M.f) throw new p.k({ maxFeePerGas: f });
    if (n && f && n > f)
      throw new p.M({ maxFeePerGas: f, maxPriorityFeePerGas: n });
  }
  async function E(n, c) {
    let {
        account: u = n.account,
        authorizationList: l,
        batch: p = !!n.batch?.multicall,
        blockNumber: g,
        blockTag: w = n.experimental_blockTag ?? "latest",
        accessList: x,
        blobs: $,
        blockOverrides: P,
        code: O,
        data: j,
        factory: N,
        factoryData: M,
        gas: E,
        gasPrice: G,
        maxFeePerBlobGas: C,
        maxFeePerGas: B,
        maxPriorityFeePerGas: I,
        nonce: k,
        to: R,
        value: T,
        stateOverride: H,
        ...L
      } = c,
      D = u ? (0, a.f)(u) : void 0;
    if (O && (N || M))
      throw new b.f(
        "Cannot provide both `code` & `factory`/`factoryData` as parameters.",
      );
    if (O && R)
      throw new b.f("Cannot provide both `code` & `to` as parameters.");
    let V = O && j,
      _ = N && M && R && j,
      q = V || _,
      U = V
        ? S({ code: O, data: j })
        : _
          ? (function (e) {
              let { data: f, factory: a, factoryData: n, to: r } = e;
              return (0, d.f)({
                abi: (0, t.f)(["constructor(address, bytes, address, bytes)"]),
                bytecode: i.G,
                args: [r, f, a, n],
              });
            })({ data: j, factory: N, factoryData: M, to: R })
          : j;
    try {
      let e;
      F(c);
      let t = ("bigint" == typeof g ? (0, h.N)(g) : void 0) || w,
        a = P ? f.f(P) : void 0,
        i = A(H),
        b = n.chain?.formatters?.transactionRequest?.format,
        o = (b || v)(
          {
            ...y(L, { format: b }),
            accessList: x,
            account: D,
            authorizationList: l,
            blobs: $,
            data: U,
            gas: E,
            gasPrice: G,
            maxFeePerBlobGas: C,
            maxFeePerGas: B,
            maxPriorityFeePerGas: I,
            nonce: k,
            to: q ? void 0 : R,
            value: T,
          },
          "call",
        );
      if (
        p &&
        (function ({ request: e }) {
          let { data: t, to: f, ...a } = e;
          return (
            !(!t || t.startsWith(r.f)) &&
            !!f &&
            !(Object.values(a).filter((e) => void 0 !== e).length > 0)
          );
        })({ request: o }) &&
        !i &&
        !a
      )
        try {
          return await z(n, { ...o, blockNumber: g, blockTag: w });
        } catch (e) {
          if (!(e instanceof s.L) && !(e instanceof s.m)) throw e;
        }
      let d =
          ((e = [o, t]),
          i && a ? [...e, i, a] : i ? [...e, i] : a ? [...e, {}, a] : e),
        u = await n.request({ method: "eth_call", params: d });
      if ("0x" === u) return { data: void 0 };
      return { data: u };
    } catch (r) {
      let t = (function (e) {
          if (!(e instanceof b.f)) return;
          let t = e.walk();
          return "object" == typeof t?.data ? t.data?.data : t.data;
        })(r),
        { offchainLookup: f, offchainLookupSignature: a } = await e.A(119881);
      if (!1 !== n.ccipRead && t?.slice(0, 10) === a && R)
        return { data: await f(n, { data: t, to: R }) };
      if (q && t?.slice(0, 10) === "0x101bb98d") throw new o.p({ factory: N });
      throw m(r, { ...c, account: D, chain: n.chain });
    }
  }
  async function z(e, t) {
    let {
        batchSize: f = 1024,
        deployless: a = !1,
        wait: r = 0,
      } = "object" == typeof e.batch?.multicall ? e.batch.multicall : {},
      {
        blockNumber: b,
        blockTag: d = e.experimental_blockTag ?? "latest",
        data: p,
        to: g,
      } = t,
      m = (() => {
        if (a) return null;
        if (t.multicallAddress) return t.multicallAddress;
        if (e.chain)
          return (0, l.f)({
            blockNumber: b,
            chain: e.chain,
            contract: "multicall3",
          });
        throw new s.L();
      })(),
      y = ("bigint" == typeof b ? (0, h.N)(b) : void 0) || d,
      { schedule: w } = (0, x.f)({
        id: `${e.uid}.${y}`,
        wait: r,
        shouldSplitBatch: (e) =>
          e.reduce((e, { data: t }) => e + (t.length - 2), 0) > 2 * f,
        fn: async (t) => {
          let f = t.map((e) => ({
              allowFailure: !0,
              callData: e.data,
              target: e.to,
            })),
            a = (0, u.f)({ abi: n.v, args: [f], functionName: "aggregate3" }),
            r = await e.request({
              method: "eth_call",
              params: [
                {
                  ...(null === m
                    ? { data: S({ code: i.c, data: a }) }
                    : { to: m, data: a }),
                },
                y,
              ],
            });
          return (0, c.f)({
            abi: n.v,
            args: [f],
            functionName: "aggregate3",
            data: r || "0x",
          });
        },
      }),
      [{ returnData: v, success: $ }] = await w({ data: p, to: g });
    if (!$) throw new o.w({ data: v });
    return "0x" === v ? { data: void 0 } : { data: v };
  }
  function S(e) {
    let { code: f, data: a } = e;
    return (0, d.f)({
      abi: (0, t.f)(["constructor(bytes, bytes)"]),
      bytecode: i.I,
      args: [f, a],
    });
  }
  (e.s(["f", 0, F], 272903), e.s(["f", 0, E], 432526));
};
