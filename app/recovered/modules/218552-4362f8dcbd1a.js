// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  var t = e.i(717473),
    r = e.i(590847),
    n = e.i(421957),
    i = e.i(286533),
    a = e.i(586844),
    s = e.i(927974),
    o = e.i(459862),
    u = e.i(20570),
    l = e.i(850697),
    c = e.i(274573),
    f = e.i(723566),
    d = e.i(109340),
    p = e.i(971816),
    y = e.i(41096),
    h = e.i(429158),
    m = e.i(947259),
    g = e.i(543510);
  let b = new p.f(128);
  async function w(e, n) {
    let i,
      {
        account: p = e.account,
        assertChainId: w = !0,
        chain: v = e.chain,
        accessList: x,
        authorizationList: P,
        blobs: k,
        data: A,
        dataSuffix: I = "string" == typeof e.dataSuffix
          ? e.dataSuffix
          : e.dataSuffix?.value,
        gas: B,
        gasPrice: E,
        maxFeePerBlobGas: N,
        maxFeePerGas: T,
        maxPriorityFeePerGas: S,
        nonce: M,
        type: z,
        value: U,
        ...C
      } = n;
    if (void 0 === p)
      throw new r.A({ docsPath: "/docs/actions/wallet/sendTransaction" });
    let R = p ? (0, t.f)(p) : null;
    try {
      (0, y.f)(n);
      let t = await (async () =>
        n.to
          ? n.to
          : null !== n.to && P && P.length > 0
            ? await (0, o.f)({ authorization: P[0] }).catch(() => {
                throw new s.f(
                  "`to` is required. Could not infer from `authorizationList`.",
                );
              })
            : void 0)();
      if (R?.type === "json-rpc" || null === R) {
        let r;
        null !== v &&
          ((r = await (0, a.f)(e, h.f, "getChainId")({})),
          w && (0, u.f)({ currentChainId: r, chain: v }));
        let n = e.chain?.formatters?.transactionRequest?.format,
          i = (n || d.F)(
            {
              ...(0, f.f)(C, { format: n }),
              accessList: x,
              account: R,
              authorizationList: P,
              blobs: k,
              chainId: r,
              data: I ? (0, l.w)([A ?? "0x", I]) : A,
              gas: B,
              gasPrice: E,
              maxFeePerBlobGas: N,
              maxFeePerGas: T,
              maxPriorityFeePerGas: S,
              nonce: M,
              to: t,
              type: z,
              value: U,
            },
            "sendTransaction",
          ),
          s = b.get(e.uid);
        try {
          return await e.request(
            {
              method: s ? "wallet_sendTransaction" : "eth_sendTransaction",
              params: [i],
            },
            { retryCount: 0 },
          );
        } catch (t) {
          if (!1 === s) throw t;
          if (
            "InvalidInputRpcError" === t.name ||
            "InvalidParamsRpcError" === t.name ||
            "MethodNotFoundRpcError" === t.name ||
            "MethodNotSupportedRpcError" === t.name
          )
            return await e
              .request(
                { method: "wallet_sendTransaction", params: [i] },
                { retryCount: 0 },
              )
              .then((t) => (b.set(e.uid, !0), t))
              .catch((r) => {
                if (
                  "MethodNotFoundRpcError" === r.name ||
                  "MethodNotSupportedRpcError" === r.name
                )
                  throw (b.set(e.uid, !1), t);
                throw r;
              });
          throw t;
        }
      }
      if (R?.type === "local") {
        let r = (() => {
            if (!R.nonceManager || void 0 !== M) return R.nonceManager;
            let e = R.nonceManager;
            return {
              consume: (t) => (
                (i = { address: t.address, chainId: t.chainId }),
                e.consume(t)
              ),
              get: (t) => e.get(t),
              increment: (t) => e.increment(t),
              reset: (t) => e.reset(t),
            };
          })(),
          n = await (0, a.f)(
            e,
            m.i,
            "prepareTransactionRequest",
          )({
            account: R,
            accessList: x,
            authorizationList: P,
            blobs: k,
            chain: v,
            data: I ? (0, l.w)([A ?? "0x", I]) : A,
            gas: B,
            gasPrice: E,
            maxFeePerBlobGas: N,
            maxFeePerGas: T,
            maxPriorityFeePerGas: S,
            nonce: M,
            nonceManager: r,
            parameters: [...m.v, "sidecars"],
            type: z,
            value: U,
            ...C,
            to: t,
          }),
          s = v?.serializers?.transaction,
          o = await R.signTransaction(n, { serializer: s });
        return await (0, a.f)(
          e,
          g.f,
          "sendRawTransaction",
        )({ serializedTransaction: o });
      }
      if (R?.type === "smart")
        throw new r.c({
          metaMessages: [
            "Consider using the `sendUserOperation` Action instead.",
          ],
          docsPath: "/docs/actions/bundler/sendUserOperation",
          type: "smart",
        });
      throw new r.c({
        docsPath: "/docs/actions/wallet/sendTransaction",
        type: R?.type,
      });
    } catch (e) {
      if (e instanceof r.c) throw e;
      throw (
        i && R?.nonceManager?.reset(i),
        (0, c.f)(e, { ...n, account: R, chain: n.chain || void 0 })
      );
    }
  }
  async function v(e, t) {
    return v.internal(e, w, "sendTransaction", t);
  }
  (e.s(["f", 0, w], 476831),
    ((v || (v = {})).internal = async function (e, s, o, u) {
      let {
        abi: l,
        account: c = e.account,
        address: f,
        args: d,
        functionName: p,
        ...y
      } = u;
      if (void 0 === c)
        throw new r.A({ docsPath: "/docs/contract/writeContract" });
      let h = c ? (0, t.f)(c) : null,
        m = (0, n.f)({ abi: l, args: d, functionName: p });
      try {
        return await (0, a.f)(e, s, o)({ data: m, to: f, account: h, ...y });
      } catch (e) {
        throw (0, i.f)(e, {
          abi: l,
          address: f,
          args: d,
          docsPath: "/docs/contract/writeContract",
          functionName: p,
          sender: h?.address,
        });
      }
    }),
    e.s(["f", 0, v], 218552));
};
