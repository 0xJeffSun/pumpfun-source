// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(428296),
    n = e.i(986316),
    r = e.i(717473),
    i = e.i(440519),
    a = e.i(974914),
    s = e.i(271948),
    o = e.i(927974),
    f = e.i(64989),
    c = e.i(815727),
    u = e.i(690651),
    d = e.i(620016),
    b = e.i(259140),
    l = e.i(421957),
    p = e.i(954982),
    h = e.i(698174),
    m = e.i(803085),
    y = e.i(236310),
    g = e.i(723566),
    v = e.i(109340),
    w = e.i(20655),
    x = e.i(667351),
    $ = e.i(41096);
  async function P(i, d) {
    let {
        account: l = i.account,
        authorizationList: m,
        batch: w = !!i.batch?.multicall,
        blockHash: P,
        blockNumber: E,
        blockTag: M = i.experimental_blockTag ?? "latest",
        requireCanonical: N,
        accessList: B,
        blobs: j,
        blockOverrides: I,
        code: z,
        data: R,
        factory: C,
        factoryData: F,
        gas: S,
        gasPrice: k,
        maxFeePerBlobGas: L,
        maxFeePerGas: D,
        maxPriorityFeePerGas: U,
        nonce: G,
        requestOptions: V,
        to: q,
        value: H,
        stateOverride: _,
        ...W
      } = d,
      Y = l ? (0, r.f)(l) : void 0;
    if (z && (C || F))
      throw new o.f(
        "Cannot provide both `code` & `factory`/`factoryData` as parameters.",
      );
    if (z && q)
      throw new o.f("Cannot provide both `code` & `to` as parameters.");
    let J = z && R,
      K = C && F && q && R,
      X = J || K,
      Z = J
        ? T({ code: z, data: R })
        : K
          ? (function (e) {
              let { data: n, factory: r, factoryData: i, to: a } = e;
              return (0, b.f)({
                abi: (0, t.f)(["constructor(address, bytes, address, bytes)"]),
                bytecode: s.G,
                args: [a, n, r, i],
              });
            })({ data: R, factory: C, factoryData: F, to: q })
          : R;
    try {
      let e;
      (0, $.f)(d);
      let t = (0, h.f)({
          blockHash: P,
          blockNumber: E,
          blockTag: M,
          requireCanonical: N,
        }),
        r = I ? n.f(I) : void 0,
        s = (0, x.f)(_),
        o = i.chain?.formatters?.transactionRequest?.format,
        c = (o || v.F)(
          {
            ...(0, g.f)(W, { format: o }),
            accessList: B,
            account: Y,
            authorizationList: m,
            blobs: j,
            data: Z,
            gas: S,
            gasPrice: k,
            maxFeePerBlobGas: L,
            maxFeePerGas: D,
            maxPriorityFeePerGas: U,
            nonce: G,
            to: X ? void 0 : q,
            value: H,
          },
          "call",
        );
      if (
        w &&
        (function ({ request: e }) {
          let { data: t, to: n, ...r } = e;
          return (
            !(!t || t.startsWith(a.f)) &&
            !!n &&
            !(Object.values(r).filter((e) => void 0 !== e).length > 0)
          );
        })({ request: c }) &&
        !r &&
        void 0 === P
      )
        try {
          var Q, ee;
          let { deployless: e = !1 } =
              "object" == typeof i.batch?.multicall ? i.batch.multicall : {},
            t = O(i, { blockNumber: E, deployless: e });
          if (
            !t ||
            ((Q = s),
            (ee = t),
            !(Q && Object.keys(Q).some((e) => (0, p.f)(e, ee))))
          )
            return await A(i, {
              ...c,
              blockHash: P,
              blockNumber: E,
              blockTag: M,
              multicallAddress: t,
              requestOptions: V,
              requireCanonical: N,
              rpcStateOverride: s,
            });
        } catch (e) {
          if (!(e instanceof f.L) && !(e instanceof f.m)) throw e;
        }
      let u =
          ((e = [c, t]),
          s && r ? [...e, s, r] : s ? [...e, s] : r ? [...e, {}, r] : e),
        b = await i.request({ method: "eth_call", params: u }, V);
      if ("0x" === b) return { data: void 0 };
      return { data: b };
    } catch (a) {
      if (V?.signal?.aborted) throw (0, u.l)(V.signal);
      if ((0, u.c)(a)) throw a;
      let t = (function (e) {
          if (!(e instanceof o.f)) return;
          let t = e.walk();
          return "object" == typeof t?.data ? t.data?.data : t.data;
        })(a),
        { offchainLookup: n, offchainLookupSignature: r } = await e.A(613100);
      if (!1 !== i.ccipRead && t?.slice(0, 10) === r && q)
        return { data: await n(i, { data: t, requestOptions: V, to: q }) };
      if (X && t?.slice(0, 10) === "0x101bb98d") throw new c.p({ factory: C });
      throw (0, y.f)(a, { ...d, account: Y, chain: i.chain });
    }
  }
  let E = 0,
    M = new WeakMap();
  async function A(e, t) {
    let {
        batchSize: n = 1024,
        deployless: r = !1,
        wait: a = 0,
      } = "object" == typeof e.batch?.multicall ? e.batch.multicall : {},
      {
        blockHash: o,
        blockNumber: f,
        blockTag: u = e.experimental_blockTag ?? "latest",
        requireCanonical: b,
        data: p,
        multicallAddress: m,
        requestOptions: y,
        rpcStateOverride: g,
        to: v,
      } = t,
      x = void 0 !== m ? m : O(e, { blockNumber: f, deployless: r }),
      $ = (0, h.f)({
        blockHash: o,
        blockNumber: f,
        blockTag: u,
        requireCanonical: b,
      }),
      P = "string" == typeof $ ? $ : JSON.stringify($),
      A = g ? `.${JSON.stringify(g)}` : "",
      { schedule: N } = (0, w.f)({
        id: `${e.uid}.${P}.${(function (e) {
          if (!e) return "default";
          let t = M.get(e);
          if (void 0 !== t) return t;
          let n = E++;
          return (M.set(e, n), n);
        })(y)}${A}`,
        wait: a,
        shouldSplitBatch: (e) =>
          e.reduce((e, { data: t }) => e + (t.length - 2), 0) > 2 * n,
        fn: async (t) => {
          let n = t.map((e) => ({
              allowFailure: !0,
              callData: e.data,
              target: e.to,
            })),
            r = (0, l.f)({ abi: i.v, args: [n], functionName: "aggregate3" }),
            a = {
              ...(null === x
                ? { data: T({ code: s.c, data: r }) }
                : { to: x, data: r }),
            },
            o = await e.request(
              { method: "eth_call", params: g ? [a, $, g] : [a, $] },
              y,
            );
          return (0, d.f)({
            abi: i.v,
            args: [n],
            functionName: "aggregate3",
            data: o || "0x",
          });
        },
      }),
      [{ returnData: B, success: j }] = await N({ data: p, to: v });
    if (!j) throw new c.w({ data: B });
    return "0x" === B ? { data: void 0 } : { data: B };
  }
  function O(e, t) {
    let { blockNumber: n, deployless: r } = t;
    if (r) return null;
    if (e.chain)
      return (0, m.f)({
        blockNumber: n,
        chain: e.chain,
        contract: "multicall3",
      });
    throw new f.L();
  }
  function T(e) {
    let { code: n, data: r } = e;
    return (0, b.f)({
      abi: (0, t.f)(["constructor(bytes, bytes)"]),
      bytecode: s.I,
      args: [n, r],
    });
  }
  e.s(["f", 0, P]);
};
