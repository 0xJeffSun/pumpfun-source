// Recovered Turbopack factory. Requires original runtime/import IDs; not a standalone source module.
(e) => {
  (e.s(["f", () => S], 842599), e.s(["v", () => B, "i", () => T], 947259));
  var t = e.i(717473),
    r = e.i(421957),
    n = e.i(286533),
    i = e.i(586844),
    a = e.i(927974),
    s = e.i(459862),
    o = e.i(703114),
    u = e.i(517662),
    l = e.i(723566),
    c = e.i(109340),
    f = e.i(667351),
    d = e.i(41096),
    p = e.i(767630),
    y = e.i(95285),
    h = e.i(204719),
    m = e.i(980987),
    g = e.i(147864),
    b = e.i(177008),
    w = e.i(927749),
    v = e.i(663903),
    x = e.i(512753),
    P = e.i(971816),
    k = e.i(629173),
    A = e.i(627617),
    I = e.i(429158);
  let B = ["blobVersionedHashes", "chainId", "fees", "gas", "nonce", "type"],
    E = new Map(),
    N = new P.f(128);
  async function T(e, r) {
    let n,
      a,
      s = r;
    ((s.account ??= e.account), (s.parameters ??= B));
    let { account: o, chain: u = e.chain, nonceManager: l, parameters: c } = s,
      f =
        "function" == typeof u?.prepareTransactionRequest
          ? {
              fn: u.prepareTransactionRequest,
              runAt: ["beforeFillTransaction"],
            }
          : Array.isArray(u?.prepareTransactionRequest)
            ? {
                fn: u.prepareTransactionRequest[0],
                runAt: u.prepareTransactionRequest[1].runAt,
              }
            : void 0;
    async function P() {
      return (
        n ||
        (void 0 !== s.chainId
          ? s.chainId
          : u
            ? u.id
            : (n = await (0, i.f)(e, I.f, "getChainId")({})))
      );
    }
    let T = o ? (0, t.f)(o) : o,
      M = s.nonce;
    if (f?.fn && f.runAt?.includes("beforeFillTransaction")) {
      ((s = await f.fn(
        { ...s, chain: u },
        { client: e, phase: "beforeFillTransaction" },
      )),
        (M ??= s.nonce));
      let r = s.account ?? s.from;
      T = r ? (0, t.f)(r) : void 0;
    }
    if (c.includes("nonce") && void 0 === M && T && l) {
      let t = await P();
      M = await l.consume({ address: T.address, chainId: t, client: e });
    }
    let z =
      (!(c.includes("blobVersionedHashes") || c.includes("sidecars")) ||
        !s.kzg ||
        !s.blobs) &&
      ((c.length > 0 &&
        "feePayer" in s &&
        s.feePayer &&
        (!("feePayerSignature" in s) || !s.feePayerSignature)) ||
        (!1 !== N.get(e.uid) &&
          ["fees", "gas"].some((e) => c.includes(e)) &&
          ((c.includes("chainId") && "number" != typeof s.chainId) ||
            (c.includes("nonce") && "number" != typeof M) ||
            (c.includes("fees") &&
              "bigint" != typeof s.gasPrice &&
              ("bigint" != typeof s.maxFeePerGas ||
                "bigint" != typeof s.maxPriorityFeePerGas)) ||
            (c.includes("gas") && "bigint" != typeof s.gas))))
        ? await (0, i.f)(
            e,
            A.f,
            "fillTransaction",
          )({ ...s, nonce: M })
            .then((t) => {
              let {
                  chainId: r,
                  from: n,
                  gas: i,
                  gasPrice: a,
                  nonce: o,
                  maxFeePerBlobGas: u,
                  maxFeePerGas: l,
                  maxPriorityFeePerGas: c,
                  type: f,
                  ...d
                } = t.transaction,
                p = "feeToken" in d ? d.feeToken : void 0,
                y =
                  "feePayerSignature" in d &&
                  null !== d.feePayerSignature &&
                  void 0 !== d.feePayerSignature,
                h = null != p && (!("feeToken" in s) || y);
              return (
                N.set(e.uid, !0),
                {
                  ...s,
                  ...(n ? { from: n } : {}),
                  ...(f && !s.type ? { type: f } : {}),
                  ...(void 0 !== r ? { chainId: r } : {}),
                  ...(void 0 !== i ? { gas: i } : {}),
                  ...(void 0 !== a ? { gasPrice: a } : {}),
                  ...(void 0 !== o ? { nonce: o } : {}),
                  ...(void 0 !== u &&
                  "legacy" !== s.type &&
                  "eip2930" !== s.type
                    ? { maxFeePerBlobGas: u }
                    : {}),
                  ...(void 0 !== l &&
                  "legacy" !== s.type &&
                  "eip2930" !== s.type
                    ? { maxFeePerGas: l }
                    : {}),
                  ...(void 0 !== c &&
                  "legacy" !== s.type &&
                  "eip2930" !== s.type
                    ? { maxPriorityFeePerGas: c }
                    : {}),
                  ...("nonceKey" in d && void 0 !== d.nonceKey
                    ? { nonceKey: d.nonceKey }
                    : {}),
                  ...("keyAuthorization" in d &&
                  void 0 !== d.keyAuthorization &&
                  null !== d.keyAuthorization &&
                  !("keyAuthorization" in s)
                    ? { keyAuthorization: d.keyAuthorization }
                    : {}),
                  ...("feePayerSignature" in d &&
                  void 0 !== d.feePayerSignature &&
                  null !== d.feePayerSignature
                    ? { feePayerSignature: d.feePayerSignature }
                    : {}),
                  ...(h ? { feeToken: p } : {}),
                  ...(t.capabilities ? { _capabilities: t.capabilities } : {}),
                }
              );
            })
            .catch((t) => {
              if ("TransactionExecutionError" !== t.name) return s;
              if (
                t.walk?.((e) => e instanceof g.b) ||
                t.walk?.((e) => "ExecutionRevertedError" === e.name)
              )
                throw t;
              return (
                t.walk?.(
                  (e) =>
                    "MethodNotFoundRpcError" === e.name ||
                    "MethodNotSupportedRpcError" === e.name ||
                    e.message?.includes("eth_fillTransaction is not available"),
                ) && N.set(e.uid, !1),
                s
              );
            })
        : s;
    M ??= z.nonce;
    let {
      blobs: U,
      gas: C,
      kzg: R,
      type: F,
    } = (s = {
      ...z,
      ...(T ? { from: T?.address } : {}),
      ...(void 0 !== M ? { nonce: M } : {}),
    });
    async function O() {
      return (
        a || (a = await (0, i.f)(e, y.f, "getBlock")({ blockTag: "latest" }))
      );
    }
    if (
      (f?.fn &&
        f.runAt?.includes("beforeFillParameters") &&
        (s = await f.fn(
          { ...s, chain: u },
          { client: e, phase: "beforeFillParameters" },
        )),
      c.includes("nonce") &&
        void 0 === M &&
        T &&
        !l &&
        (s.nonce = await (0, i.f)(
          e,
          h.f,
          "getTransactionCount",
        )({ address: T.address, blockTag: "pending" })),
      (c.includes("blobVersionedHashes") || c.includes("sidecars")) && U && R)
    ) {
      let e = (0, b.f)({ blobs: U, kzg: R });
      if (c.includes("blobVersionedHashes")) {
        let t = (0, v.f)({ commitments: e, to: "hex" });
        s.blobVersionedHashes = t;
      }
      if (c.includes("sidecars")) {
        let t = (0, w.f)({ blobs: U, commitments: e, kzg: R }),
          r = (0, x.f)({ blobs: U, commitments: e, proofs: t, to: "hex" });
        s.sidecars = r;
      }
    }
    if (
      (c.includes("chainId") && (s.chainId = await P()),
      (c.includes("fees") || c.includes("type")) && void 0 === F)
    )
      try {
        s.type = (0, k.f)(s);
      } catch {
        let t = E.get(e.uid);
        if (void 0 === t) {
          let r = await O();
          ((t = "bigint" == typeof r?.baseFeePerGas), E.set(e.uid, t));
        }
        s.type = t ? "eip1559" : "legacy";
      }
    if (c.includes("fees"))
      if ("legacy" !== s.type && "eip2930" !== s.type) {
        if (void 0 === s.maxFeePerGas || void 0 === s.maxPriorityFeePerGas) {
          let t = await O(),
            { maxFeePerGas: r, maxPriorityFeePerGas: n } = await (0, p.p)(e, {
              block: t,
              chain: u,
              request: s,
            });
          if (
            void 0 === s.maxPriorityFeePerGas &&
            s.maxFeePerGas &&
            s.maxFeePerGas < n
          )
            throw new m.C({ maxPriorityFeePerGas: n });
          ((s.maxPriorityFeePerGas = n), (s.maxFeePerGas = r));
        }
      } else {
        if (void 0 !== s.maxFeePerGas || void 0 !== s.maxPriorityFeePerGas)
          throw new m.D();
        if (void 0 === s.gasPrice) {
          let t = await O(),
            { gasPrice: r } = await (0, p.p)(e, {
              block: t,
              chain: u,
              request: s,
              type: "legacy",
            });
          s.gasPrice = r;
        }
      }
    return (
      c.includes("gas") &&
        void 0 === C &&
        (s.gas = await (0, i.f)(
          e,
          S,
          "estimateGas",
        )({
          ...s,
          account: T,
          prepare: T?.type === "local" ? [] : ["blobVersionedHashes"],
        })),
      f?.fn &&
        f.runAt?.includes("afterFillParameters") &&
        (s = await f.fn(
          { ...s, chain: u },
          { client: e, phase: "afterFillParameters" },
        )),
      (0, d.f)(s),
      delete s.parameters,
      s
    );
  }
  async function S(e, r) {
    let { account: n = e.account, prepare: i = !0 } = r,
      p = n ? (0, t.f)(n) : void 0,
      y = Array.isArray(i)
        ? i
        : p?.type !== "local"
          ? ["blobVersionedHashes"]
          : void 0;
    try {
      let t = await (async () =>
          r.to
            ? r.to
            : r.authorizationList && r.authorizationList.length > 0
              ? await (0, s.f)({ authorization: r.authorizationList[0] }).catch(
                  () => {
                    throw new a.f(
                      "`to` is required. Could not infer from `authorizationList`",
                    );
                  },
                )
              : void 0)(),
        {
          accessList: n,
          authorizationList: u,
          blobs: h,
          blobVersionedHashes: m,
          blockNumber: g,
          blockTag: b,
          data: w,
          gas: v,
          gasPrice: x,
          maxFeePerBlobGas: P,
          maxFeePerGas: k,
          maxPriorityFeePerGas: A,
          nonce: I,
          value: B,
          stateOverride: E,
          ...N
        } = i ? await T(e, { ...r, parameters: y, to: t }) : r;
      if (v && r.gas !== v) return v;
      let S = ("bigint" == typeof g ? (0, o.N)(g) : void 0) || b,
        M = (0, f.f)(E);
      (0, d.f)(r);
      let z = e.chain?.formatters?.transactionRequest?.format,
        U = (z || c.F)(
          {
            ...(0, l.f)(N, { format: z }),
            account: p,
            accessList: n,
            authorizationList: u,
            blobs: h,
            blobVersionedHashes: m,
            data: w,
            gasPrice: x,
            maxFeePerBlobGas: P,
            maxFeePerGas: k,
            maxPriorityFeePerGas: A,
            nonce: I,
            to: t,
            value: B,
          },
          "estimateGas",
        );
      return BigInt(
        await e.request({
          method: "eth_estimateGas",
          params: M
            ? [U, S ?? e.experimental_blockTag ?? "latest", M]
            : S
              ? [U, S]
              : [U],
        }),
      );
    } catch (t) {
      throw (0, u.f)(t, { ...r, account: p, chain: e.chain });
    }
  }
  async function M(e, a) {
    let {
        abi: s,
        address: o,
        args: u,
        functionName: l,
        dataSuffix: c = "string" == typeof e.dataSuffix
          ? e.dataSuffix
          : e.dataSuffix?.value,
        ...f
      } = a,
      d = (0, r.f)({ abi: s, args: u, functionName: l });
    try {
      return await (0, i.f)(
        e,
        S,
        "estimateGas",
      )({ data: `${d}${c ? c.replace("0x", "") : ""}`, to: o, ...f });
    } catch (r) {
      let e = f.account ? (0, t.f)(f.account) : void 0;
      throw (0, n.f)(r, {
        abi: s,
        address: o,
        args: u,
        docsPath: "/docs/contract/estimateContractGas",
        functionName: l,
        sender: e?.address,
      });
    }
  }
  e.s(["f", 0, M], 76019);
};
