// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(862491),
    n = e.i(627617),
    r = e.i(429158),
    a = e.i(440519),
    i = e.i(616883),
    s = e.i(76019),
    o = e.i(694594),
    l = e.i(218552),
    c = e.i(410486);
  async function u(e, t) {
    return u.inner(l.f, e, t);
  }
  !(function (e) {
    async function t(t, n, r) {
      return await t(n, { ...r, ...e.call(n, r) });
    }
    async function n(t, n) {
      return (0, s.f)(t, { ...(0, c.N)(n), ...e.call(t, n) });
    }
    async function r(t, n) {
      return (0, o.f)(t, { ...(0, c.N)(n), ...e.call(t, n) });
    }
    ((e.inner = t),
      (e.call = function (e, t) {
        return (0, c.V)(
          (function (e, t) {
            let { amount: n, spender: r, token: i } = t,
              { address: s, decimals: o } = (0, c.M)(e, { token: i });
            return {
              abi: a.q,
              address: s,
              args: [r, (0, c.Z)(n, o)],
              functionName: "approve",
            };
          })(e, t),
        );
      }),
      (e.estimateGas = n),
      (e.simulate = r),
      (e.extractEvent = function (e) {
        let [t] = (0, i.f)({
          abi: a.q,
          logs: e,
          eventName: "Approval",
          strict: !0,
        });
        if (!t) throw Error("`Approval` event not found.");
        return t;
      }));
  })(u || (u = {}));
  var d = e.i(766409),
    p = e.i(717473),
    f = e.i(590847),
    h = e.i(927974),
    m = e.i(147864),
    y = e.i(459862),
    g = e.i(20570),
    w = e.i(850697),
    b = e.i(274573),
    v = e.i(723566),
    T = e.i(109340),
    A = e.i(586844),
    E = e.i(971816),
    k = e.i(41096),
    x = e.i(781401),
    P = e.i(947259),
    C = e.i(368447);
  let S = new E.f(128);
  async function _(e, t) {
    let n,
      {
        account: a = e.account,
        assertChainId: i = !0,
        chain: s = e.chain,
        accessList: o,
        authorizationList: l,
        blobs: c,
        data: u,
        dataSuffix: d = "string" == typeof e.dataSuffix
          ? e.dataSuffix
          : e.dataSuffix?.value,
        gas: E,
        gasPrice: _,
        maxFeePerBlobGas: I,
        maxFeePerGas: N,
        maxPriorityFeePerGas: M,
        nonce: R,
        pollingInterval: O,
        throwOnReceiptRevert: F,
        type: U,
        value: L,
        ...D
      } = t,
      B = t.timeout ?? Math.max((s?.blockTime ?? 0) * 3, 5e3);
    if (void 0 === a)
      throw new f.A({ docsPath: "/docs/actions/wallet/sendTransactionSync" });
    let W = a ? (0, p.f)(a) : null;
    try {
      (0, k.f)(t);
      let a = await (async () =>
        t.to
          ? t.to
          : null !== t.to && l && l.length > 0
            ? await (0, y.f)({ authorization: l[0] }).catch(() => {
                throw new h.f(
                  "`to` is required. Could not infer from `authorizationList`.",
                );
              })
            : void 0)();
      if (W?.type === "json-rpc" || null === W) {
        let t;
        null !== s &&
          ((t = await (0, A.f)(e, r.f, "getChainId")({})),
          i && (0, g.f)({ currentChainId: t, chain: s }));
        let n = e.chain?.formatters?.transactionRequest?.format,
          p = (n || T.F)(
            {
              ...(0, v.f)(D, { format: n }),
              accessList: o,
              account: W,
              authorizationList: l,
              blobs: c,
              chainId: t,
              data: d ? (0, w.w)([u ?? "0x", d]) : u,
              gas: E,
              gasPrice: _,
              maxFeePerBlobGas: I,
              maxFeePerGas: N,
              maxPriorityFeePerGas: M,
              nonce: R,
              to: a,
              type: U,
              value: L,
            },
            "sendTransaction",
          ),
          f = S.get(e.uid),
          h = f ? "wallet_sendTransaction" : "eth_sendTransaction",
          y = await (async () => {
            try {
              return await e.request(
                { method: h, params: [p] },
                { retryCount: 0 },
              );
            } catch (t) {
              if (!1 === f) throw t;
              if (
                "InvalidInputRpcError" === t.name ||
                "InvalidParamsRpcError" === t.name ||
                "MethodNotFoundRpcError" === t.name ||
                "MethodNotSupportedRpcError" === t.name
              )
                return await e
                  .request(
                    { method: "wallet_sendTransaction", params: [p] },
                    { retryCount: 0 },
                  )
                  .then((t) => (S.set(e.uid, !0), t))
                  .catch((n) => {
                    if (
                      "MethodNotFoundRpcError" === n.name ||
                      "MethodNotSupportedRpcError" === n.name
                    )
                      throw (S.set(e.uid, !1), t);
                    throw n;
                  });
              throw t;
            }
          })(),
          b = await (0, A.f)(
            e,
            x.f,
            "waitForTransactionReceipt",
          )({ checkReplacement: !1, hash: y, pollingInterval: O, timeout: B });
        if (F && "reverted" === b.status) throw new m.E({ receipt: b });
        return b;
      }
      if (W?.type === "local") {
        let r = (() => {
            if (!W.nonceManager || void 0 !== R) return W.nonceManager;
            let e = W.nonceManager;
            return {
              consume: (t) => (
                (n = { address: t.address, chainId: t.chainId }),
                e.consume(t)
              ),
              get: (t) => e.get(t),
              increment: (t) => e.increment(t),
              reset: (t) => e.reset(t),
            };
          })(),
          i = await (0, A.f)(
            e,
            P.i,
            "prepareTransactionRequest",
          )({
            account: W,
            accessList: o,
            authorizationList: l,
            blobs: c,
            chain: s,
            data: d ? (0, w.w)([u ?? "0x", d]) : u,
            gas: E,
            gasPrice: _,
            maxFeePerBlobGas: I,
            maxFeePerGas: N,
            maxPriorityFeePerGas: M,
            nonce: R,
            nonceManager: r,
            parameters: [...P.v, "sidecars"],
            type: U,
            value: L,
            ...D,
            to: a,
          }),
          p = s?.serializers?.transaction,
          f = await W.signTransaction(i, { serializer: p });
        return await (0, A.f)(
          e,
          C.f,
          "sendRawTransactionSync",
        )({
          serializedTransaction: f,
          throwOnReceiptRevert: F,
          timeout: t.timeout,
        });
      }
      if (W?.type === "smart")
        throw new f.c({
          metaMessages: [
            "Consider using the `sendUserOperation` Action instead.",
          ],
          docsPath: "/docs/actions/bundler/sendUserOperation",
          type: "smart",
        });
      throw new f.c({
        docsPath: "/docs/actions/wallet/sendTransactionSync",
        type: W?.type,
      });
    } catch (e) {
      if (e instanceof f.c) throw e;
      throw (
        !n || e instanceof m.E || W?.nonceManager?.reset(n),
        (0, b.f)(e, { ...t, account: W, chain: t.chain || void 0 })
      );
    }
  }
  async function I(e, t) {
    return l.f.internal(e, _, "sendTransactionSync", t);
  }
  async function N(e, t) {
    let { amount: n, token: r, throwOnReceiptRevert: a = !0 } = t,
      { decimals: i } = (0, c.M)(e, { token: r }),
      s = (0, c.Y)(n, i),
      o = await u.inner(I, e, { ...t, throwOnReceiptRevert: a }),
      { args: l } = u.extractEvent(o.logs);
    return {
      ...l,
      ...(void 0 === s ? {} : { decimals: s, formatted: (0, d.f)(l.value, s) }),
      receipt: o,
    };
  }
  async function M(e, t) {
    return M.inner(l.f, e, t);
  }
  async function R(e, t) {
    let { amount: n, token: r, throwOnReceiptRevert: a = !0 } = t,
      { decimals: i } = (0, c.M)(e, { token: r }),
      s = (0, c.Y)(n, i),
      o = await M.inner(I, e, { ...t, throwOnReceiptRevert: a }),
      { args: l } = M.extractEvent(o.logs);
    return {
      ...l,
      ...(void 0 === s ? {} : { decimals: s, formatted: (0, d.f)(l.value, s) }),
      receipt: o,
    };
  }
  !(function (e) {
    async function t(t, n, r) {
      return await t(n, { ...r, ...e.call(n, r) });
    }
    async function n(t, n) {
      return (0, s.f)(t, { ...(0, c.N)(n), ...e.call(t, n) });
    }
    async function r(t, n) {
      return (0, o.f)(t, { ...(0, c.N)(n), ...e.call(t, n) });
    }
    ((e.inner = t),
      (e.call = function (e, t) {
        return (0, c.V)(
          (function (e, t) {
            let { amount: n, from: r, to: i, token: s } = t,
              { address: o, decimals: l } = (0, c.M)(e, { token: s }),
              u = (0, c.Z)(n, l);
            return r
              ? {
                  abi: a.q,
                  address: o,
                  args: [r, i, u],
                  functionName: "transferFrom",
                }
              : {
                  abi: a.q,
                  address: o,
                  args: [i, u],
                  functionName: "transfer",
                };
          })(e, t),
        );
      }),
      (e.estimateGas = n),
      (e.simulate = r),
      (e.extractEvent = function (e) {
        let [t] = (0, i.f)({
          abi: a.q,
          logs: e,
          eventName: "Transfer",
          strict: !0,
        });
        if (!t) throw Error("`Transfer` event not found.");
        return t;
      }));
  })(M || (M = {}));
  var O = e.i(703114);
  async function F(e, { chain: t }) {
    let {
      id: n,
      name: r,
      nativeCurrency: a,
      rpcUrls: i,
      blockExplorers: s,
    } = t;
    await e.request(
      {
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: (0, O.N)(n),
            chainName: r,
            nativeCurrency: a,
            rpcUrls: i.default.http,
            blockExplorerUrls: s
              ? Object.values(s).map(({ url: e }) => e)
              : void 0,
          },
        ],
      },
      { dedupe: !0, retryCount: 0 },
    );
  }
  var U = e.i(259140),
    L = e.i(476831),
    D = e.i(389238);
  async function B(e) {
    return e.account?.type === "local"
      ? [e.account.address]
      : (await e.request({ method: "eth_accounts" }, { dedupe: !0 })).map((e) =>
          (0, D.b)(e),
        );
  }
  var W = e.i(612164),
    z = e.i(990963),
    j = e.i(339513),
    q = e.i(891487),
    H = e.i(214721),
    G = e.i(421957);
  let $ = "0x5792579257925792579257925792579257925792579257925792579257925792",
    V = (0, O.N)(0, { size: 32 });
  async function K(e, t) {
    let {
        account: n = e.account,
        chain: r = e.chain,
        experimental_fallback: a,
        experimental_fallbackDelay: i = 32,
        forceAtomic: s = !1,
        id: o,
        version: l = "2.0.0",
      } = t,
      c = n ? (0, p.f)(n) : null,
      u = t.capabilities;
    e.dataSuffix &&
      !t.capabilities?.dataSuffix &&
      (u =
        "string" == typeof e.dataSuffix
          ? {
              ...t.capabilities,
              dataSuffix: { value: e.dataSuffix, optional: !0 },
            }
          : {
              ...t.capabilities,
              dataSuffix: {
                value: e.dataSuffix.value,
                ...(e.dataSuffix.required ? {} : { optional: !0 }),
              },
            });
    let d = t.calls.map((e) => {
      let t = e.abi
        ? (0, G.f)({ abi: e.abi, functionName: e.functionName, args: e.args })
        : e.data;
      return {
        data: e.dataSuffix && t ? (0, w.w)([t, e.dataSuffix]) : t,
        to: e.to,
        value: e.value ? (0, O.N)(e.value) : void 0,
      };
    });
    try {
      let t = await e.request(
        {
          method: "wallet_sendCalls",
          params: [
            {
              atomicRequired: s,
              calls: d,
              capabilities: u,
              chainId: (0, O.N)(r.id),
              from: c?.address,
              id: o,
              version: l,
            },
          ],
        },
        { retryCount: 0 },
      );
      if ("string" == typeof t) return { id: t };
      return t;
    } catch (n) {
      if (
        a &&
        ("MethodNotFoundRpcError" === n.name ||
          "MethodNotSupportedRpcError" === n.name ||
          "UnknownRpcError" === n.name ||
          n.details
            .toLowerCase()
            .includes("does not exist / is not available") ||
          n.details.toLowerCase().includes("missing or invalid. request()") ||
          n.details
            .toLowerCase()
            .includes("did not match any variant of untagged enum") ||
          n.details
            .toLowerCase()
            .includes("account upgraded to unsupported contract") ||
          n.details.toLowerCase().includes("eip-7702 not supported") ||
          n.details.toLowerCase().includes("unsupported wc_ method") ||
          n.details.toLowerCase().includes("feature toggled misconfigured") ||
          n.details
            .toLowerCase()
            .includes(
              "jsonrpcengine: response has no error or result for request",
            ))
      ) {
        if (u && Object.values(u).some((e) => !e.optional)) {
          let e =
            "non-optional `capabilities` are not supported on fallback to `eth_sendTransaction`.";
          throw new H.E(new h.f(e, { details: e }));
        }
        if (s && d.length > 1) {
          let e =
            "`forceAtomic` is not supported on fallback to `eth_sendTransaction`.";
          throw new H.T(new h.f(e, { details: e }));
        }
        let t = [];
        for (let n of d) {
          try {
            let a = await (0, L.f)(e, {
              account: c,
              chain: r,
              data: n.data,
              to: n.to,
              value: n.value ? (0, j.K)(n.value) : void 0,
            });
            t.push({ status: "fulfilled", value: a });
          } catch (e) {
            t.push({ reason: e, status: "rejected" });
          }
          i > 0 && (await new Promise((e) => setTimeout(e, i)));
        }
        if (t.every((e) => "rejected" === e.status)) throw t[0].reason;
        let n = t.map((e) => ("fulfilled" === e.status ? e.value : V));
        return { id: (0, w.w)([...n, (0, O.N)(r.id, { size: 32 }), $]) };
      }
      throw (0, b.f)(n, { ...t, account: c, chain: t.chain });
    }
  }
  async function J(e, t) {
    let n;
    async function r(t) {
      if (t.endsWith($.slice(2))) {
        let n = (0, z.f)((0, W.n)(t, -64, -32)),
          r = (0, W.n)(t, 0, -64)
            .slice(2)
            .match(/.{1,64}/g),
          a = await Promise.all(
            r.map((t) =>
              V.slice(2) !== t
                ? e.request(
                    { method: "eth_getTransactionReceipt", params: [`0x${t}`] },
                    { dedupe: !0 },
                  )
                : void 0,
            ),
          ),
          i = a.some((e) => null === e)
            ? 100
            : a.every((e) => e?.status === "0x1")
              ? 200
              : a.every((e) => e?.status === "0x0")
                ? 500
                : 600;
        return {
          atomic: !1,
          chainId: (0, j.T)(n),
          receipts: a.filter(Boolean),
          status: i,
          version: "2.0.0",
        };
      }
      return e.request({ method: "wallet_getCallsStatus", params: [t] });
    }
    let {
        atomic: a = !1,
        chainId: i,
        receipts: s,
        version: o = "2.0.0",
        ...l
      } = await r(t.id),
      [c, u] =
        (n = l.status) >= 100 && n < 200
          ? ["pending", n]
          : n >= 200 && n < 300
            ? ["success", n]
            : n >= 300 && n < 700
              ? ["failure", n]
              : "CONFIRMED" === n
                ? ["success", 200]
                : "PENDING" === n
                  ? ["pending", 100]
                  : [void 0, n];
    return {
      ...l,
      atomic: a,
      chainId: i ? (0, j.T)(i) : void 0,
      receipts:
        s?.map((e) => ({
          ...e,
          blockNumber: (0, j.K)(e.blockNumber),
          gasUsed: (0, j.K)(e.gasUsed),
          status: q.b[e.status],
        })) ?? [],
      statusCode: u,
      status: c,
      version: o,
    };
  }
  async function X(e, t = {}) {
    let { account: n = e.account, chainId: r } = t,
      a = n ? (0, p.f)(n) : void 0,
      i = r ? [a?.address, [(0, O.N)(r)]] : [a?.address],
      s = await e.request({ method: "wallet_getCapabilities", params: i }),
      o = {};
    for (let [e, t] of Object.entries(s))
      for (let [n, r] of ((o[Number(e)] = {}), Object.entries(t)))
        ("addSubAccount" === n && (n = "unstable_addSubAccount"),
          (o[Number(e)][n] = r));
    return "number" == typeof r ? o[r] : o;
  }
  async function Y(e) {
    return await e.request({ method: "wallet_getPermissions" }, { dedupe: !0 });
  }
  var Z = e.i(954982),
    Q = e.i(204719);
  async function ee(e, t) {
    let { account: n = e.account, chainId: a, nonce: i } = t;
    if (!n) throw new f.A({ docsPath: "/docs/eip7702/prepareAuthorization" });
    let s = (0, p.f)(n),
      o = (() => {
        if (t.executor)
          return "self" === t.executor ? t.executor : (0, p.f)(t.executor);
      })(),
      l = { address: t.contractAddress ?? t.address, chainId: a, nonce: i };
    return (
      void 0 === l.chainId &&
        (l.chainId = e.chain?.id ?? (await (0, A.f)(e, r.f, "getChainId")({}))),
      void 0 === l.nonce &&
        ((l.nonce = await (0, A.f)(
          e,
          Q.f,
          "getTransactionCount",
        )({ address: s.address, blockTag: "pending" })),
        ("self" === o || (o?.address && (0, Z.f)(o.address, s.address))) &&
          (l.nonce += 1)),
      l
    );
  }
  async function et(e) {
    return (
      await e.request(
        { method: "eth_requestAccounts" },
        { dedupe: !0, retryCount: 0 },
      )
    ).map((e) => (0, D.A)(e));
  }
  async function en(e, t) {
    return e.request(
      { method: "wallet_requestPermissions", params: [t] },
      { retryCount: 0 },
    );
  }
  var er = h,
    ea = h;
  class ei extends ea.f {
    constructor(e) {
      (super(`Call bundle failed with status: ${e.statusCode}`, {
        name: "BundleFailedError",
      }),
        Object.defineProperty(this, "result", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        (this.result = e));
    }
  }
  var es = e.i(262548),
    eo = e.i(369155),
    el = e.i(966348),
    ec = e.i(591774),
    eu = e.i(225587);
  async function ed(e, t) {
    let n,
      {
        id: r,
        pollingInterval: a = e.pollingInterval,
        status: i = ({ statusCode: e }) => 200 === e || e >= 300,
        retryCount: s = 4,
        retryDelay: o = ({ count: e }) => 200 * ~~(1 << e),
        timeout: l = 6e4,
        throwOnFailure: c = !1,
      } = t,
      u = (0, eu.f)(["waitForCallsStatus", e.uid, r]),
      { promise: d, resolve: p, reject: f } = (0, el.f)(),
      h = (0, es.f)(u, { resolve: p, reject: f }, (t) => {
        let l = (0, eo.f)(
          async () => {
            let a = (e) => {
              (clearTimeout(n), l(), e(), h());
            };
            try {
              let n = await (0, ec.f)(
                async () => {
                  let t = await (0, A.f)(e, J, "getCallsStatus")({ id: r });
                  if (c && "failure" === t.status) throw new ei(t);
                  return t;
                },
                { retryCount: s, delay: o },
              );
              if (!i(n)) return;
              a(() => t.resolve(n));
            } catch (e) {
              a(() => t.reject(e));
            }
          },
          { interval: a, emitOnBegin: !0 },
        );
        return l;
      });
    return (
      (n = l
        ? setTimeout(() => {
            (h(), clearTimeout(n), f(new ep({ id: r })));
          }, l)
        : void 0),
      await d
    );
  }
  class ep extends er.f {
    constructor({ id: e }) {
      super(
        `Timed out while waiting for call bundle with id "${e}" to be confirmed.`,
        { name: "WaitForCallsStatusTimeoutError" },
      );
    }
  }
  async function ef(e, t) {
    let { chain: n = e.chain } = t,
      r = t.timeout ?? Math.max((n?.blockTime ?? 0) * 3, 5e3),
      a = await (0, A.f)(e, K, "sendCalls")(t);
    return await (0, A.f)(
      e,
      ed,
      "waitForCallsStatus",
    )({ ...t, id: a.id, timeout: r });
  }
  var eh = e.i(543510);
  async function em(e, t) {
    let { id: n } = t;
    await e.request({ method: "wallet_showCallsStatus", params: [n] });
  }
  async function ey(e, t) {
    let { account: n = e.account } = t;
    if (!n) throw new f.A({ docsPath: "/docs/eip7702/signAuthorization" });
    let r = (0, p.f)(n);
    if (!r.signAuthorization)
      throw new f.c({
        docsPath: "/docs/eip7702/signAuthorization",
        metaMessages: [
          "The `signAuthorization` Action does not support JSON-RPC Accounts.",
        ],
        type: r.type,
      });
    let a = await ee(e, t);
    return r.signAuthorization(a);
  }
  async function eg(e, { account: t = e.account, message: n }) {
    if (!t) throw new f.A({ docsPath: "/docs/actions/wallet/signMessage" });
    let r = (0, p.f)(t);
    if (r.signMessage) return r.signMessage({ message: n });
    let a =
      "string" == typeof n
        ? (0, O.B)(n)
        : n.raw instanceof Uint8Array
          ? (0, O.g)(n.raw)
          : n.raw;
    return e.request(
      { method: "personal_sign", params: [a, r.address] },
      { retryCount: 0 },
    );
  }
  async function ew(e, t) {
    let { account: n = e.account, chain: a = e.chain, ...i } = t;
    if (!n) throw new f.A({ docsPath: "/docs/actions/wallet/signTransaction" });
    let s = (0, p.f)(n);
    (0, k.f)({ account: s, ...t });
    let o = await (0, A.f)(e, r.f, "getChainId")({});
    null !== a && (0, g.f)({ currentChainId: o, chain: a });
    let l = a?.formatters || e.chain?.formatters,
      c = l?.transactionRequest?.format || T.F;
    return s.signTransaction
      ? s.signTransaction(
          { ...i, account: s, chainId: o },
          { serializer: e.chain?.serializers?.transaction },
        )
      : await e.request(
          {
            method: "eth_signTransaction",
            params: [
              {
                ...c({ ...i, account: s }, "signTransaction"),
                chainId: (0, O.N)(o),
                from: s.address,
              },
            ],
          },
          { retryCount: 0 },
        );
  }
  var eb = e.i(115178);
  async function ev(e, t) {
    let { account: n = e.account, domain: r, message: a, primaryType: i } = t;
    if (!n) throw new f.A({ docsPath: "/docs/actions/wallet/signTypedData" });
    let s = (0, p.f)(n),
      o = { EIP712Domain: (0, eb.m)({ domain: r }), ...t.types };
    if (
      ((0, eb.N)({ domain: r, message: a, primaryType: i, types: o }),
      s.signTypedData)
    )
      return s.signTypedData({
        domain: r,
        message: a,
        primaryType: i,
        types: o,
      });
    let l = (0, eb.f)({ domain: r, message: a, primaryType: i, types: o });
    return e.request(
      { method: "eth_signTypedData_v4", params: [s.address, l] },
      { retryCount: 0 },
    );
  }
  async function eT(e, { id: t }) {
    await e.request(
      {
        method: "wallet_switchEthereumChain",
        params: [{ chainId: (0, O.N)(t) }],
      },
      { retryCount: 0 },
    );
  }
  async function eA(e, t) {
    return await e.request(
      { method: "wallet_watchAsset", params: t },
      { retryCount: 0 },
    );
  }
  function eE(e) {
    return {
      addChain: (t) => F(e, t),
      deployContract: (t) =>
        (function (e, t) {
          let { abi: n, args: r, bytecode: a, ...i } = t,
            s = (0, U.f)({ abi: n, args: r, bytecode: a });
          return (0, L.f)(e, {
            ...i,
            ...(i.authorizationList ? { to: null } : {}),
            data: s,
          });
        })(e, t),
      fillTransaction: (t) => (0, n.f)(e, t),
      getAddresses: () => B(e),
      getCallsStatus: (t) => J(e, t),
      getCapabilities: (t) => X(e, t),
      getChainId: () => (0, r.f)(e),
      getPermissions: () => Y(e),
      prepareAuthorization: (t) => ee(e, t),
      prepareTransactionRequest: (t) => (0, P.i)(e, t),
      requestAddresses: () => et(e),
      requestPermissions: (t) => en(e, t),
      sendCalls: (t) => K(e, t),
      sendCallsSync: (t) => ef(e, t),
      sendRawTransaction: (t) => (0, eh.f)(e, t),
      sendRawTransactionSync: (t) => (0, C.f)(e, t),
      sendTransaction: (t) => (0, L.f)(e, t),
      sendTransactionSync: (t) => _(e, t),
      showCallsStatus: (t) => em(e, t),
      signAuthorization: (t) => ey(e, t),
      signMessage: (t) => eg(e, t),
      signTransaction: (t) => ew(e, t),
      signTypedData: (t) => ev(e, t),
      switchChain: (t) => eT(e, t),
      waitForCallsStatus: (t) => ed(e, t),
      watchAsset: (t) => eA(e, t),
      writeContract: (t) => (0, l.f)(e, t),
      writeContractSync: (t) => I(e, t),
      token: {
        approve: (0, t.y)(e, u),
        approveSync: (0, t.y)(e, N),
        transfer: (0, t.y)(e, M),
        transferSync: (0, t.y)(e, R),
      },
    };
  }
  e.s(
    [
      "f",
      0,
      function (e) {
        let { key: n = "wallet", name: r = "Wallet Client", transport: a } = e;
        return (0, t.g)({
          ...e,
          key: n,
          name: r,
          transport: a,
          type: "walletClient",
        }).extend(eE);
      },
    ],
    858959,
  );
};
